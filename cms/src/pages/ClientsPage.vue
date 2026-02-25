<template>
  <q-page class="q-pa-lg">
    <!-- Header -->
    <div class="row items-center justify-between q-mb-xl">
      <div>
        <h1 class="text-h4 text-weight-bolder q-my-none row items-center">
          <span class="text-emerald-gradient">Client Portfolio</span>
          <q-icon name="business_center" size="md" class="q-ml-md text-emerald" />
        </h1>
        <p class="text-grey-5 text-subtitle1 q-mt-sm q-mb-none font-medium text-emerald-light">
          Strategic Management of your most valued business partnerships.
        </p>
      </div>
      <div class="row q-gutter-md">
        <q-btn
          unelevated
          rounded
          class="bg-emerald-gradient text-white q-px-lg shadow-2 hover-scale"
          icon="add"
          label="Onboard New Client"
          no-caps
          @click="openClientDialog"
        />
        <q-btn
          outline
          rounded
          color="emerald"
          icon="file_download"
          label="Export Portfolio"
          no-caps
          class="q-px-lg shadow-1 hover-scale bg-dark-card border-glass"
          @click="exportPortfolio"
        />
      </div>
    </div>

    <!-- Stats Row -->
    <div class="row q-col-gutter-lg q-mb-xl">
      <div class="col-12 col-md-3" v-for="stat in clientStats" :key="stat.label">
        <q-card class="bg-dark-card border-glass border-radius-lg hover-card">
          <q-card-section class="q-pa-md">
            <div class="row items-center justify-between no-wrap">
              <div>
                <div class="text-caption text-grey-5 text-uppercase tracking-widest font-bold">
                  {{ stat.label }}
                </div>
                <div class="text-h4 text-weight-bolder text-white q-mt-xs">
                  {{ stat.value }}
                </div>
              </div>
              <q-icon :name="stat.icon" color="emerald" size="32px" class="opacity-20" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Clients Table -->
    <q-card class="bg-dark-card border-glass border-radius-lg overflow-hidden">
      <q-table
        :rows="clients"
        :columns="columns"
        row-key="id"
        flat
        dark
        class="bg-transparent"
        :loading="loading"
        :pagination="{ rowsPerPage: 10 }"
      >
        <template v-slot:body-cell-client="props">
          <q-td :props="props">
            <div class="row items-center no-wrap">
              <q-avatar size="40px" class="bg-emerald-gradient text-dark text-weight-bolder">
                {{ props.row.name.charAt(0) }}
              </q-avatar>
              <div class="q-ml-md">
                <div class="text-weight-bold text-white">{{ props.row.name }}</div>
                <div class="text-caption text-grey-5">{{ props.row.industry }}</div>
              </div>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props" align="center">
            <q-chip
              dense
              :color="getStatusColor(props.row.status)"
              text-color="white"
              class="text-weight-bold tracking-wide"
            >
              {{ props.row.status }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-revenue="props">
          <q-td :props="props" class="text-weight-bolder text-emerald">
            {{ currencyStore.format(props.row.revenue) }}
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" align="right" class="q-gutter-x-sm">
            <q-btn flat round dense icon="visibility" color="grey-5" />
            <q-btn flat round dense icon="edit" color="emerald" @click="editClient(props.row)" />
            <q-btn flat round dense icon="delete" color="red" @click="confirmDelete(props.row)" />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Client Dialog (Placeholder) -->
    <q-dialog v-model="clientDialog" persistent>
      <q-card
        style="min-width: 550px; border-radius: 24px"
        class="bg-dark-card border-glass text-white"
      >
        <q-card-section class="q-px-xl q-py-lg">
          <div class="row items-center q-mb-xl">
            <div class="text-h5 text-weight-bolder">Onboard Strategic Client</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup color="grey-5" />
          </div>
        </q-card-section>

        <q-card-section class="q-px-xl q-py-lg">
          <q-input
            v-model="clientForm.name"
            label="Company Name"
            dark
            filled
            dense
            class="q-mb-md"
          />
          <q-input
            v-model="clientForm.person"
            label="Key Contact Person"
            dark
            filled
            dense
            class="q-mb-md"
          />
          <div class="row q-col-gutter-lg">
            <div class="col-6">
              <q-select
                v-model="clientForm.industry"
                :options="['Tech', 'Logistics', 'Finance', 'Healthcare', 'Manufacturing']"
                label="Industry"
                dark
                filled
                dense
                class="q-mb-md"
              />
            </div>
            <div class="col-6">
              <q-select
                v-model="clientForm.status"
                :options="['Active', 'Onboarding', 'Dormant']"
                label="Initial Status"
                dark
                filled
                dense
                class="q-mb-md"
              />
            </div>
            <div class="col-12">
              <q-input
                v-model.number="clientForm.revenue"
                :label="`Revenue Channel (${currencyStore.symbol})`"
                type="number"
                dark
                filled
                dense
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-px-xl q-pb-xl">
          <q-btn flat label="Cancel" v-close-popup color="grey-6" no-caps />
          <q-btn
            unelevated
            label="Establish Client"
            class="bg-emerald-gradient text-dark q-px-xl font-bold rounded-borders"
            no-caps
            @click="saveClient"
            :loading="saving"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCurrencyStore } from 'stores/currency'
import { supabase } from 'boot/supabase'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const currencyStore = useCurrencyStore()
const loading = ref(false)
const saving = ref(false)
const clientDialog = ref(false)

const clientForm = ref({
  name: '',
  person: '',
  industry: 'Tech',
  status: 'Onboarding',
  revenue: 0,
})

const clientStats = computed(() => [
  { label: 'Total Clients', value: clients.value.length, icon: 'business', color: 'emerald' },
  {
    label: 'Active Projects',
    value: clients.value.filter((c) => c.status === 'Active').length,
    icon: 'rocket_launch',
    color: 'emerald',
  },
  { label: 'Client Retention', value: '98.2%', icon: 'favorite', color: 'emerald' },
  {
    label: 'Avg Customer Value',
    value: currencyStore.format(
      clients.value.reduce((acc, c) => acc + (c.revenue || 0), 0) / (clients.value.length || 1),
    ),
    icon: 'payments',
    color: 'emerald',
  },
])

const columns = [
  { name: 'client', label: 'Client / Company', align: 'left', field: 'name', sortable: true },
  { name: 'person', label: 'Contact Person', align: 'left', field: 'person' },
  { name: 'industry', label: 'Industry', align: 'left', field: 'industry', sortable: true },
  { name: 'revenue', label: 'Total Revenue', align: 'right', field: 'revenue', sortable: true },
  { name: 'status', label: 'Status', align: 'center', field: 'status', sortable: true },
  { name: 'actions', label: 'Actions', align: 'right' },
]

const clients = ref([
  {
    id: 1,
    name: 'Starlight Corp',
    person: 'Sarah Jensen',
    industry: 'Logistics',
    revenue: 125000,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Nordic Logistics',
    person: 'Bjorn Ironside',
    industry: 'Shipping',
    revenue: 82000,
    status: 'Active',
  },
  {
    id: 3,
    name: 'Svea Finance',
    person: 'Emma Andersson',
    industry: 'Finance',
    revenue: 250000,
    status: 'Onboarding',
  },
  {
    id: 4,
    name: 'Peak Performance',
    person: 'Marcus Aurelius',
    industry: 'Retail',
    revenue: 43000,
    status: 'Active',
  },
  {
    id: 5,
    name: 'Nexus Tech',
    person: 'Linus Torvalds',
    industry: 'Open Source',
    revenue: 12000,
    status: 'Dormant',
  },
])

const getStatusColor = (status) => {
  switch (status) {
    case 'Active':
      return 'emerald'
    case 'Onboarding':
      return 'blue'
    case 'Dormant':
      return 'orange'
    default:
      return 'grey'
  }
}

const exportPortfolio = () => {
  $q.notify({
    type: 'positive',
    message: 'Generating client portfolio ledger...',
    icon: 'downloading',
    timeout: 1500,
  })
  setTimeout(() => {
    $q.notify({ type: 'positive', message: 'Strategic Assets Export complete (XLSX).' })
  }, 2000)
}

const fetchClients = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    if (data) {
      clients.value = data
    }
  } catch (err) {
    console.warn('Clients table fetch error - verify schema', err)
  }
  loading.value = false
}

const saveClient = async () => {
  if (!clientForm.value.name) return
  saving.value = true
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const payload = { ...clientForm.value, user_id: user?.id }

    const { error } = clientForm.value.id
      ? await supabase.from('clients').update(payload).eq('id', clientForm.value.id)
      : await supabase.from('clients').insert(payload)

    if (error) throw error

    $q.notify({ type: 'positive', message: 'Strategic alliance committed to ledger.' })
    clientDialog.value = false
    fetchClients()
  } catch (err) {
    $q.notify({ type: 'negative', message: 'Transmission error: ' + err.message })
  }
  saving.value = false
}

const editClient = (row) => {
  clientForm.value = { ...row }
  clientDialog.value = true
}

const confirmDelete = (row) => {
  $q.dialog({
    title: 'Dissolve Alliance',
    message: `Remove ${row.name} from active portfolio?`,
    cancel: true,
    dark: true,
  }).onOk(async () => {
    await supabase.from('clients').delete().eq('id', row.id)
    fetchClients()
  })
}

const openClientDialog = () => {
  clientForm.value = {
    name: '',
    person: '',
    industry: 'Tech',
    status: 'Onboarding',
    revenue: 0,
  }
  clientDialog.value = true
}

onMounted(() => fetchClients())
</script>

<style scoped>
.bg-dark-card {
  background: #0f172a !important;
}
.border-glass {
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
}
.border-radius-lg {
  border-radius: 16px;
}
.text-emerald-gradient {
  background: linear-gradient(to right, #10b981, #34d399);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.text-emerald-light {
  color: rgba(16, 185, 129, 0.7);
}
.text-emerald {
  color: #10b981;
}
.bg-emerald-gradient {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}
.hover-card:hover {
  transform: translateY(-5px);
  border-color: rgba(16, 185, 129, 0.2) !important;
}
.hover-scale {
  transition: transform 0.2s ease;
}
.hover-scale:hover {
  transform: scale(1.02);
}
.font-bold {
  font-weight: 700;
}
</style>
