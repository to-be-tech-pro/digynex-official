<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-xl fade-in-up">
      <div class="col">
        <h1 class="text-h4 text-weight-bolder q-my-none row items-center">
          <span class="text-emerald-gradient">Deal Pipeline</span>
          <q-icon name="handshake" size="md" class="q-ml-md text-emerald" />
        </h1>
        <p class="text-grey-5 text-subtitle1 q-mt-sm q-mb-none font-medium text-emerald-light">
          Global liquidity stream and conversion velocity tracking.
        </p>
      </div>
      <div class="col-auto">
        <q-btn
          unelevated
          rounded
          class="bg-emerald-gradient text-white q-px-lg shadow-2 hover-scale"
          icon="add"
          label="Initialize Deal"
          no-caps
          @click="openDealDialog"
        />
      </div>
    </div>

    <!-- Pipeline Stages -->
    <div
      class="row no-wrap q-gutter-x-lg overflow-auto q-pb-xl fade-in-up"
      style="min-height: 70vh; animation-delay: 0.2s"
    >
      <div
        v-for="stage in stages"
        :key="stage"
        class="col-12 col-sm-4 col-md-3"
        style="min-width: 320px"
      >
        <div class="row items-center justify-between q-mb-lg q-px-xs">
          <div
            class="text-subtitle1 text-weight-bolder text-white uppercase tracking-widest flex items-center"
          >
            {{ stage }}
            <q-badge color="emerald" class="q-ml-sm no-shadow text-dark font-bold">{{
              getDealsByStage(stage).length
            }}</q-badge>
          </div>
          <div class="text-caption text-emerald font-bold">
            {{ currencyStore.formatShort(getStageTotal(stage)) }}
          </div>
        </div>

        <!-- Stage Column -->
        <q-card
          class="bg-dark-card border-glass border-radius-lg full-height q-pa-md shadow-2"
          style="background: rgba(15, 23, 42, 0.4) !important"
        >
          <draggable
            v-model="dealsByStage[stage]"
            group="deals"
            @change="onDragChange($event, stage)"
            item-key="id"
            class="q-gutter-y-md"
          >
            <template #item="{ element }">
              <q-card
                class="bg-dark border-glass no-shadow border-radius-lg cursor-pointer hover-scale q-mb-md overflow-hidden"
                :class="{ 'glow-border-emerald': element.probability >= 80 }"
              >
                <q-card-section class="q-pa-lg">
                  <div class="row items-start justify-between q-mb-md no-wrap">
                    <div class="text-weight-bolder text-white text-subtitle1 leading-tight">
                      {{ element.title }}
                    </div>
                    <q-btn flat round dense icon="more_vert" color="grey-7" size="sm" @click.stop />
                  </div>

                  <div class="row items-center q-gutter-x-sm q-mb-lg">
                    <q-badge
                      outline
                      :color="getProbabilityColor(element.probability)"
                      class="q-px-md q-py-xs font-bold"
                    >
                      {{ element.probability }}% TRACE
                    </q-badge>
                    <div class="text-subtitle2 text-emerald font-bold">
                      {{ currencyStore.format(element.value) }}
                    </div>
                  </div>

                  <div class="row items-center justify-between no-wrap">
                    <div
                      class="row items-center q-gutter-x-xs text-grey-5 font-bold text-caption uppercase tracking-wider"
                    >
                      <q-icon name="hub" size="14px" color="emerald" />
                      <span class="ellipsis max-width-100">{{
                        element.lead_name || 'DIRECT'
                      }}</span>
                    </div>
                    <div
                      v-if="element.expected_close_date"
                      class="row items-center q-gutter-x-xs text-grey-6 text-caption"
                    >
                      <q-icon name="calendar_month" size="14px" />
                      <span>{{ formatDateShort(element.expected_close_date) }}</span>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </template>
          </draggable>

          <div
            v-if="getDealsByStage(stage).length === 0"
            class="text-center q-pa-xl text-grey-8 dashed-border rounded-borders-lg"
          >
            <q-icon name="inventory_2" size="48px" class="q-mb-md opacity-20" />
            <div class="text-caption uppercase tracking-widest font-bold opacity-30">
              Void Chamber
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <!-- Dialog -->
    <q-dialog v-model="dealDialog" backdrop-filter="blur(10px)">
      <q-card
        style="min-width: 500px; border-radius: 24px"
        class="bg-dark-card border-glass text-white"
      >
        <q-card-section class="q-px-xl q-py-lg">
          <div class="row items-center q-mb-xl">
            <div class="text-h5 text-weight-bolder">Deal Genesis Protocol</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup color="grey-5" />
          </div>

          <div class="row q-col-gutter-lg">
            <div class="col-12">
              <q-input
                dark
                filled
                v-model="dealForm.title"
                label="Deal Identifier"
                dense
                class="q-mb-md"
              />
            </div>

            <div class="col-12">
              <q-select
                dark
                filled
                v-model="dealForm.lead_id"
                label="Asset Association"
                :options="leadOptions"
                option-label="name"
                option-value="id"
                map-options
                emit-value
                dense
                class="q-mb-md"
              />
            </div>

            <div class="col-6">
              <q-select
                dark
                filled
                v-model="dealForm.stage"
                label="Genesis Stage"
                :options="stages"
                dense
                class="q-mb-md"
              />
            </div>
            <div class="col-6">
              <q-input
                dark
                filled
                v-model.number="dealForm.value"
                :label="`Liquidity Volume (${currencyStore.symbol})`"
                type="number"
                dense
                class="q-mb-md"
              />
            </div>

            <div class="col-12 q-mb-lg">
              <div class="row justify-between items-center q-mb-sm">
                <div class="text-caption text-grey-6 font-bold uppercase tracking-widest">
                  Closure Probability
                </div>
                <div class="text-h6 font-bold text-emerald">{{ dealForm.probability }}%</div>
              </div>
              <q-slider v-model="dealForm.probability" :min="0" :max="100" color="emerald" dark />
            </div>

            <div class="col-12">
              <q-input
                dark
                filled
                v-model="dealForm.expected_close_date"
                label="Anticipated Closure"
                mask="date"
                dense
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer" color="emerald">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="dealForm.expected_close_date" dark color="emerald" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-px-xl q-pb-xl">
          <q-btn flat label="Abort" v-close-popup color="grey-7" no-caps />
          <q-btn
            unelevated
            rounded
            label="Initialize Deal"
            class="bg-emerald-gradient text-white q-px-xl font-bold"
            @click="saveDeal"
            :loading="saving"
            no-caps
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'
import draggable from 'vuedraggable'
import { useCurrencyStore } from 'stores/currency'

const currencyStore = useCurrencyStore()
const $q = useQuasar()

const loading = ref(false)
const saving = ref(false)
const dealDialog = ref(false)
const leads = ref([])

const stages = ['Discovery', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']
const dealForm = ref({
  title: '',
  lead_id: null,
  stage: 'Discovery',
  value: 0,
  probability: 50,
  expected_close_date: new Date().toISOString().split('T')[0].replace(/-/g, '/'),
})

const dealsByStage = ref({
  Discovery: [],
  Proposal: [],
  Negotiation: [],
  'Closed Won': [],
  'Closed Lost': [],
})
const leadOptions = computed(() => leads.value)
const getDealsByStage = (s) => dealsByStage.value[s] || []
const getStageTotal = (s) => getDealsByStage(s).reduce((sum, d) => sum + Number(d.value), 0)

const fetchData = async () => {
  loading.value = true
  const { data: dealsData } = await supabase.from('deals').select('*, leads(name)')
  const { data: leadsData } = await supabase.from('leads').select('id, name')
  if (leadsData) leads.value = leadsData
  if (dealsData) {
    stages.forEach((s) => {
      dealsByStage.value[s] = dealsData
        .filter((d) => d.stage === s)
        .map((d) => ({ ...d, lead_name: d.leads?.name }))
    })
  }
  loading.value = false
}

const openDealDialog = () => {
  dealForm.value = {
    title: '',
    lead_id: null,
    stage: 'Discovery',
    value: 0,
    probability: 50,
    expected_close_date: new Date().toISOString().split('T')[0].replace(/-/g, '/'),
  }
  dealDialog.value = true
}

const saveDeal = async () => {
  saving.value = true
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const { error } = await supabase.from('deals').insert({ ...dealForm.value, user_id: user.id })
    if (error) throw error
    $q.notify({ type: 'positive', message: 'Deal genesis complete.' })
    dealDialog.value = false
    fetchData()
  } catch (err) {
    $q.notify({ type: 'negative', message: 'Initialization failed: ' + err.message })
  }
  saving.value = false
}

const onDragChange = async (evt, stage) => {
  if (evt.added) {
    const deal = evt.added.element
    await supabase.from('deals').update({ stage: stage }).eq('id', deal.id)
    $q.notify({ type: 'positive', message: `Deal shifted to ${stage}`, timeout: 800 })
  }
}

const getProbabilityColor = (p) =>
  p >= 80 ? 'emerald' : p >= 50 ? 'blue' : p >= 25 ? 'orange' : 'red'
const formatDateShort = (s) =>
  s ? new Date(s).toLocaleDateString([], { month: 'short', day: 'numeric' }) : ''

onMounted(() => fetchData())
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
.rounded-borders-lg {
  border-radius: 20px;
}
.text-emerald-gradient {
  background: linear-gradient(to right, #10b981, #34d399);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.text-emerald {
  color: #10b981 !important;
}
.bg-emerald-gradient {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}
.dashed-border {
  border: 2px dashed rgba(255, 255, 255, 0.05);
}
.glow-border-emerald {
  border: 1px solid rgba(16, 185, 129, 0.3) !important;
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.05);
}
.hover-scale:hover {
  transform: scale(1.02);
  transition: transform 0.2s ease;
}
.max-width-100 {
  max-width: 120px;
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
