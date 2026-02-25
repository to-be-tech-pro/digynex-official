<template>
  <q-page class="q-pa-lg">
    <!-- Welcome Header -->
    <div class="row items-center justify-between q-mb-xl fade-in-up">
      <div>
        <h1 class="text-h4 text-weight-bolder q-my-none row items-center">
          <span class="text-emerald-gradient">Nexus Analytics</span>
          <q-icon name="query_stats" size="md" class="q-ml-md text-emerald" />
        </h1>
        <p class="text-grey-5 text-subtitle1 q-mt-sm q-mb-none font-medium text-emerald-light">
          Lead Orchestration & Revenue Intelligence active for
          <span class="text-white">{{ activeLocation }}</span
          >.
        </p>
      </div>
      <div class="row q-gutter-md">
        <q-btn
          unelevated
          rounded
          class="bg-emerald-gradient text-white q-px-lg shadow-2 hover-scale"
          icon="insights"
          label="Intelligence Deep-dive"
          no-caps
          to="/cms/portal/revenue"
        />
        <q-btn
          outline
          rounded
          color="emerald"
          icon="add"
          label="New Lead Protocol"
          no-caps
          class="q-px-lg q-py-sm shadow-1 hover-scale bg-dark-card border-glass"
          to="/cms/portal/leads"
        />
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="row q-col-gutter-lg q-mb-xl">
      <div
        class="col-12 col-sm-6 col-md-3 fade-in-up"
        v-for="(stat, index) in stats"
        :key="index"
        :style="`animation-delay: ${0.1 + index * 0.1}s`"
      >
        <q-card
          class="bg-dark-card border-glass no-shadow border-radius-lg overflow-hidden hover-scale full-height"
        >
          <q-card-section class="q-pa-lg relative-position">
            <div class="row items-center justify-between q-mb-md">
              <div
                class="q-pa-md rounded-borders-md shadow-2"
                :class="`bg-${stat.color}-opacity text-${stat.color}`"
              >
                <q-icon :name="stat.icon" size="24px" />
              </div>
              <div class="text-h4 text-weight-bolder text-white">
                {{ index === 3 ? currencyStore.formatShort(stat.value) : stat.value }}
              </div>
            </div>
            <div class="row items-center justify-between">
              <div class="text-caption text-grey-5 font-bold text-uppercase tracking-widest">
                {{ stat.label }}
              </div>
              <div class="text-emerald font-bold text-caption">+{{ stat.trend }}%</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Main Content -->
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-lg-8 fade-in-up" style="animation-delay: 0.5s">
        <!-- Chart -->
        <q-card
          class="bg-dark-card border-glass no-shadow border-radius-lg q-mb-lg overflow-hidden"
        >
          <q-card-section class="q-pa-lg">
            <div class="row items-center justify-between q-mb-lg">
              <div class="text-h6 text-weight-bold text-white uppercase tracking-wider">
                Conversion Pipeline
              </div>
              <q-badge color="emerald" class="q-px-md q-py-xs no-shadow font-bold text-dark"
                >Real-time Expansion</q-badge
              >
            </div>
            <div class="q-mt-md">
              <apexchart
                type="area"
                height="350"
                :options="chartOptions"
                :series="chartSeries"
              ></apexchart>
            </div>
          </q-card-section>
        </q-card>

        <!-- Automation Logs -->
        <q-card class="bg-dark-card border-glass border-radius-lg">
          <q-card-section class="q-pa-lg">
            <div class="row items-center justify-between q-mb-md">
              <div class="text-weight-bold text-white uppercase tracking-widest text-caption">
                Nexus Automation Engine (n8n)
              </div>
              <q-btn
                flat
                dense
                color="emerald"
                label="LIVE CORE"
                class="glow-pulse"
                to="/cms/portal/nexus"
              />
            </div>
            <div
              class="bg-black-opacity q-pa-md rounded-borders font-mono text-caption text-emerald overflow-auto border-glass"
              style="max-height: 250px"
            >
              <div v-for="(log, idx) in logs" :key="idx" class="q-mb-xs">
                <span class="text-grey-7">[{{ log.time }}]</span>
                <span class="text-emerald-light"> {{ log.msg }}</span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-lg-4 fade-in-up" style="animation-delay: 0.6s">
        <!-- Strategic Insights -->
        <q-card
          class="bg-emerald-gradient border-glass border-radius-lg q-mb-lg overflow-hidden shadow-2"
        >
          <q-card-section class="q-pa-xl">
            <div class="row items-center q-mb-md">
              <q-icon name="auto_awesome" color="white" size="32px" class="q-mr-sm" />
              <div class="text-h6 text-weight-bold text-white">Strategic Forecast</div>
            </div>
            <p class="text-white opacity-90 text-subtitle2 leading-relaxed font-medium">
              Lead velocity has increased by 18% in the EMEA region. Projection suggests a 14%
              surplus in quarterly revenue targets.
            </p>
            <q-btn
              flat
              rounded
              dense
              label="Deep Analysis"
              no-caps
              class="text-white bg-black-opacity q-px-xl q-py-sm q-mt-lg font-bold"
              @click="runDeepAnalysis"
              :loading="analyzing"
            />
          </q-card-section>
        </q-card>

        <!-- Recent Deals -->
        <q-card class="bg-dark-card border-glass border-radius-lg">
          <q-card-section class="q-pa-lg">
            <div class="text-h6 text-weight-bold text-white q-mb-lg uppercase tracking-wider">
              Recent Closures
            </div>
            <q-list separator dark class="bg-transparent">
              <q-item v-for="deal in recentDeals" :key="deal.company" class="q-py-md hover-bg">
                <q-item-section avatar>
                  <q-avatar size="42px" class="border-glass">
                    <span class="text-emerald font-bold">{{ deal.company.charAt(0) }}</span>
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bolder text-white">{{
                    deal.company
                  }}</q-item-label>
                  <q-item-label caption class="text-grey-6"
                    >{{ currencyStore.format(deal.value) }} • {{ deal.status }}</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
            <q-btn
              flat
              color="emerald"
              label="Audit Full Pipeline"
              class="full-width q-mt-md font-bold"
              to="/cms/portal/sales"
              no-caps
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCurrencyStore } from 'stores/currency'
import { useQuasar } from 'quasar'
import VueApexCharts from 'vue3-apexcharts'

const $q = useQuasar()
const Apexchart = VueApexCharts
const currencyStore = useCurrencyStore()

const analyzing = ref(false)

const activeLocation = computed(() => {
  if (currencyStore.countryCode === 'SE') return 'Stockholm Hub'
  if (currencyStore.countryCode === 'LK') return 'Colombo Regional'
  return 'Global Infrastructure'
})

const stats = computed(() => [
  { label: 'Signal Pipeline', value: '412', icon: 'scuba_diving', color: 'emerald', trend: 12 },
  { label: 'Active Streams', value: '89', icon: 'hub', color: 'emerald', trend: 8 },
  { label: 'Secured Deals', value: '24', icon: 'verified', color: 'emerald', trend: 15 },
  {
    label: 'Fluid Revenue',
    value: currencyStore.countryCode === 'SE' ? 84000 : 4900,
    icon: 'payments',
    color: 'emerald',
    trend: 22,
  },
])

const recentDeals = [
  { company: 'Starlight Corp', value: 12500, status: 'Closed' },
  { company: 'Nordic Logistics', value: 8200, status: 'Processing' },
  { company: 'Svea Finance', value: 25000, status: 'Negotiation' },
  { company: 'Peak Performance', value: 4300, status: 'Closed' },
]

const runDeepAnalysis = () => {
  analyzing.value = true
  $q.notify({
    message: 'Initializing Nexus AI Neural Analysis...',
    icon: 'psychology',
    color: 'white',
    textColor: 'emerald',
    timeout: 2000,
  })

  setTimeout(() => {
    analyzing.value = false
    $q.notify({
      type: 'positive',
      message:
        'Analysis Complete: Market expansion set to +18.4%. Recommendations synced to Leads.',
      icon: 'insights',
    })
  }, 3500)
}

const logs = ref([
  { time: '23:10:05', msg: 'Lead Scraper: 12 new prospects detected in sector LinkedIn.' },
  { time: '23:12:40', msg: 'AI Core: Dispatched 5 personalized follow-up protocols.' },
  { time: '23:15:22', msg: 'Cloud-Sync: Lead synchronization to CRM complete.' },
  { time: '23:20:00', msg: 'Signal Alert: New inquiry from Web-Interface Nexus.' },
])

const chartSeries = [
  { name: 'Lead Velocity', data: [31, 40, 28, 51, 42, 109, 100] },
  { name: 'Closure Rate', data: [11, 32, 45, 32, 34, 52, 41] },
]

const chartOptions = {
  chart: { toolbar: { show: false }, type: 'area', animations: { enabled: true } },
  colors: ['#10b981', '#34d399'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 3 },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    labels: { style: { colors: '#64748b' } },
  },
  yaxis: { labels: { style: { colors: '#64748b' } } },
  grid: { borderColor: 'rgba(255,255,255,0.05)' },
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0 } },
}
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
.bg-blue-opacity {
  background: rgba(59, 130, 246, 0.1);
}
.bg-purple-opacity {
  background: rgba(168, 85, 247, 0.1);
}
.bg-emerald-opacity {
  background: rgba(16, 185, 129, 0.1);
}
.bg-orange-opacity {
  background: rgba(245, 158, 11, 0.1);
}
.bg-black-opacity {
  background: rgba(0, 0, 0, 0.3);
}

.glow-pulse {
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  animation: pulse-green 2s infinite;
}
@keyframes pulse-green {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

.hover-bg:hover {
  background: rgba(255, 255, 255, 0.02);
}
.hover-scale:hover {
  transform: scale(1.02);
  transition: transform 0.3s ease;
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
