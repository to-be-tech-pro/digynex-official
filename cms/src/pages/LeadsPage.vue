<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-xl fade-in-up">
      <div class="col">
        <h1 class="text-h4 text-weight-bolder q-my-none row items-center">
          <span class="text-emerald-gradient">Lead Orchestration</span>
          <q-icon name="gps_fixed" size="md" class="q-ml-md text-emerald" />
        </h1>
        <p class="text-grey-5 text-subtitle1 q-mt-sm q-mb-none font-medium text-emerald-light">
          Identifying and managing high-value business opportunities.
        </p>
      </div>
      <div class="col-auto">
        <q-btn
          unelevated
          rounded
          class="bg-emerald-gradient text-white q-px-lg shadow-2 hover-scale"
          icon="add"
          label="Initialize Lead"
          no-caps
          @click="openLeadDialog"
        />
      </div>
    </div>

    <!-- Leads Table -->
    <q-card
      class="bg-dark-card border-glass border-radius-lg overflow-hidden fade-in-up"
      style="animation-delay: 0.2s"
    >
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="id"
        flat
        dark
        class="bg-transparent"
        :loading="loading"
        :pagination="{ rowsPerPage: 10 }"
      >
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <div class="text-weight-bolder text-white">{{ props.row.name }}</div>
            <div class="text-caption text-grey-6">{{ props.row.email }}</div>
          </q-td>
        </template>

        <template v-slot:body-cell-score="props">
          <q-td :props="props">
            <div class="row items-center no-wrap q-gutter-x-sm">
              <q-linear-progress
                :value="props.row.lead_score / 100"
                :color="getScoreColor(props.row.lead_score)"
                rounded
                class="col"
                style="height: 6px; background: rgba(255, 255, 255, 0.05)"
              />
              <span
                class="text-caption font-bold"
                :class="`text-${getScoreColor(props.row.lead_score)}`"
                style="min-width: 35px"
              >
                {{ props.row.lead_score }}%
              </span>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props" align="center">
            <q-badge
              rounded
              :color="getStatusColor(props.row.status)"
              :class="getStatusColor(props.row.status) === 'emerald' ? 'text-dark' : 'text-white'"
              class="q-px-md q-py-xs font-bold no-shadow"
            >
              {{ props.row.status }}
            </q-badge>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" align="right" class="q-gutter-x-sm">
            <q-btn
              flat
              round
              dense
              icon="auto_awesome"
              color="emerald"
              @click="analyzeLead(props.row)"
              class="hover-scale"
            >
              <q-tooltip>AI Signal Analysis</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              dense
              icon="edit"
              color="grey-5"
              @click="editLead(props.row)"
              class="hover-scale"
            />
            <q-btn
              flat
              round
              dense
              icon="delete"
              color="red"
              @click="confirmDelete(props.row)"
              class="hover-scale"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Dialog -->
    <q-dialog v-model="leadDialog" backdrop-filter="blur(8px)">
      <q-card
        style="min-width: 550px; border-radius: 24px"
        class="bg-dark-card border-glass text-white"
      >
        <q-card-section class="q-px-xl q-py-lg">
          <div class="row items-center q-mb-xl">
            <div class="text-h5 text-weight-bolder">Lead Configuration Protocol</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup color="grey-5" />
          </div>

          <div class="row q-col-gutter-lg">
            <div class="col-8">
              <q-input
                dark
                filled
                v-model="form.name"
                label="Opportunity Identifier"
                dense
                class="q-mb-md"
              />
            </div>
            <div class="col-4">
              <q-select
                dark
                filled
                v-model="form.status"
                label="State"
                :options="['New', 'Qualified', 'In Progress', 'Lost', 'Converted']"
                dense
                class="q-mb-md"
              />
            </div>

            <div class="col-6">
              <q-input
                dark
                filled
                v-model="form.email"
                label="Signal Contact (Email)"
                dense
                class="q-mb-md"
              />
            </div>
            <div class="col-6">
              <q-input
                dark
                filled
                v-model="form.phone"
                label="Audio Line (Phone)"
                dense
                class="q-mb-md"
              />
            </div>

            <div class="col-6">
              <q-select
                dark
                filled
                v-model="form.source"
                label="Inbound Vector"
                :options="['Website', 'LinkedIn', 'Referral', 'Facebook', 'Cold Outreach']"
                dense
                class="q-mb-md"
              />
            </div>
            <div class="col-6">
              <q-input
                dark
                filled
                v-model.number="form.estimated_value"
                :label="`Est. Value (${currencyStore.symbol})`"
                type="number"
                dense
                class="q-mb-md"
              />
            </div>
          </div>

          <q-separator dark class="q-my-lg bg-grey-9" />

          <div class="row items-center justify-between q-mb-md">
            <div class="text-caption text-grey-6 text-uppercase tracking-widest font-bold">
              Discovery & Analytics
            </div>
            <q-btn
              unelevated
              rounded
              color="emerald"
              icon="bolt"
              label="Neural Scan"
              class="text-dark font-bold"
              no-caps
              @click="smartAnalyze"
              :loading="analyzing"
            />
          </div>

          <q-input
            dark
            filled
            v-model="form.notes"
            type="textarea"
            placeholder="Input discovery signals, pain points, and strategic requirements..."
            rows="3"
            class="q-mb-lg"
          />

          <div>
            <div class="row justify-between items-center q-mb-sm">
              <div class="text-caption text-grey-6 font-bold uppercase tracking-wide">
                Signal strength (Lead Score)
              </div>
              <div class="text-h6 font-bold" :class="`text-${getScoreColor(form.lead_score)}`">
                {{ form.lead_score }}%
              </div>
            </div>
            <q-slider
              v-model="form.lead_score"
              :min="0"
              :max="100"
              :color="getScoreColor(form.lead_score)"
              dark
            />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-px-xl q-pb-xl">
          <q-btn flat label="Abort" v-close-popup color="grey-7" no-caps />
          <q-btn
            unelevated
            rounded
            label="Commit Opportunity"
            class="bg-emerald-gradient text-white q-px-xl font-bold"
            no-caps
            :loading="saving"
            @click="saveLead"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'
import { useCurrencyStore } from 'stores/currency'

const $q = useQuasar()
const currencyStore = useCurrencyStore()

const loading = ref(false)
const saving = ref(false)
const analyzing = ref(false)
const leadDialog = ref(false)
const rows = ref([])

const form = ref({
  name: '',
  email: '',
  phone: '',
  source: 'Website',
  status: 'New',
  estimated_value: 0,
  lead_score: 50,
  notes: '',
})

const columns = [
  { name: 'name', label: 'Signal Identifier', field: 'name', align: 'left', sortable: true },
  { name: 'score', label: 'Signal Strength', field: 'lead_score', align: 'center', sortable: true },
  { name: 'source', label: 'Vector', field: 'source', align: 'left' },
  { name: 'status', label: 'State', field: 'status', align: 'center', sortable: true },
  {
    name: 'value',
    label: 'Volume',
    field: 'estimated_value',
    align: 'right',
    format: (val) => currencyStore.format(val),
  },
  { name: 'actions', label: 'Intervention', field: 'actions', align: 'right' },
]

const getScoreColor = (s) => (s >= 80 ? 'emerald' : s >= 50 ? 'blue' : s >= 25 ? 'orange' : 'red')
const getStatusColor = (s) => {
  if (s === 'New') return 'blue'
  if (s === 'Qualified') return 'orange'
  if (s === 'In Progress') return 'indigo'
  if (s === 'Lost') return 'red'
  if (s === 'Converted') return 'emerald'
  return 'grey'
}

const smartAnalyze = async () => {
  if (!form.value.notes)
    return $q.notify({ type: 'warning', message: 'Nodes empty - input signal notes.' })
  analyzing.value = true
  // Mocking AI response for local demo robustness
  setTimeout(() => {
    form.value.lead_score = Math.floor(Math.random() * 40) + 60
    $q.notify({ type: 'positive', message: 'Neural scan complete. Score adjusted.' })
    analyzing.value = false
  }, 1500)
}

const fetchLeads = async () => {
  loading.value = true
  const { data } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
  rows.value = data || []
  loading.value = false
}

const openLeadDialog = () => {
  form.value = {
    name: '',
    email: '',
    phone: '',
    source: 'Website',
    status: 'New',
    estimated_value: 0,
    lead_score: 50,
    notes: '',
  }
  leadDialog.value = true
}

const editLead = (row) => {
  form.value = { ...row }
  leadDialog.value = true
}

const saveLead = async () => {
  if (!form.value.name) return
  saving.value = true
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const payload = { ...form.value, user_id: user?.id }
    const { error } = form.value.id
      ? await supabase.from('leads').update(payload).eq('id', form.value.id)
      : await supabase.from('leads').insert(payload)
    if (error) throw error
    $q.notify({ type: 'positive', message: 'Opportunity committed to ledger.' })
    leadDialog.value = false
    fetchLeads()
  } catch (err) {
    $q.notify({ type: 'negative', message: 'Transmission error: ' + err.message })
  }
  saving.value = false
}

const confirmDelete = (row) => {
  $q.dialog({
    title: 'Purge Signal',
    message: `Purge ${row.name} from ledger?`,
    cancel: true,
    dark: true,
  }).onOk(async () => {
    await supabase.from('leads').delete().eq('id', row.id)
    fetchLeads()
  })
}

onMounted(() => fetchLeads())
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
  color: #10b981 !important;
}
.bg-emerald {
  background: #10b981 !important;
}
.bg-emerald-gradient {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}
.border-bottom-light {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.hover-scale:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}

/* Animations */
.fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
