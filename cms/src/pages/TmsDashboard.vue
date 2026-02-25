<template>
  <q-page class="q-pa-lg">
    <!-- Welcome Header -->
    <div class="row items-center justify-between q-mb-xl fade-in-up">
      <div>
        <h1 class="text-h4 text-weight-bolder text-gold-gradient q-my-none">
          Morning, Architect! <span class="text-h4">🏛️</span>
        </h1>
        <p class="text-grey-5 text-subtitle1 q-mt-sm q-mb-none font-medium text-gold-light">
          Global operations dashboard active for
          <span class="text-white">{{ activeLocation }}</span
          >.
        </p>
      </div>
      <div class="row q-gutter-md">
        <q-btn
          unelevated
          rounded
          class="bg-gold-gradient text-white q-px-lg shadow-2 hover-scale"
          icon="auto_awesome"
          label="Nexus Flow"
          no-caps
          @click="triggerMarketingFlow"
        />
        <q-btn
          outline
          rounded
          color="gold"
          icon="add"
          label="Enroll Asset"
          no-caps
          class="q-px-lg q-py-sm shadow-1 hover-scale bg-dark-card border-glass"
          to="/tms/portal/students"
        />
      </div>
    </div>

    <!-- Modern Stats Grid -->
    <div class="row q-col-gutter-lg q-mb-xl">
      <div
        class="col-12 col-sm-6 col-md-3 fade-in-up"
        v-for="(stat, index) in stats"
        :key="index"
        :style="`animation-delay: ${0.1 + index * 0.1}s`"
      >
        <q-card
          class="bg-dark-card border-glass no-shadow border-radius-lg overflow-hidden hover-scale full-height shadow-2"
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
                <span v-if="stat.currency" class="text-caption text-grey-6 q-mr-xs">{{
                  stat.currency
                }}</span>
                {{ stat.value }}
              </div>
            </div>
            <div class="row items-center justify-between">
              <div class="text-caption text-grey-5 font-bold text-uppercase tracking-widest">
                {{ stat.label }}
              </div>
              <div class="text-gold font-bold text-caption">
                {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}% EFFICIENCY
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-lg-8">
        <!-- Quick Actions Grid -->
        <div class="row q-col-gutter-lg q-mb-lg fade-in-up" style="animation-delay: 0.5s">
          <div class="col-6 col-md-3" v-for="action in quickActions" :key="action.label">
            <q-card
              class="bg-dark-card border-glass no-shadow border-radius-lg cursor-pointer hover-scale text-center full-height overflow-hidden"
              v-ripple
              @click="$router.push(action.route)"
            >
              <q-card-section class="q-py-xl">
                <q-avatar
                  size="56px"
                  :class="`bg-${action.color}-opacity text-${action.color}`"
                  class="q-mb-md border-glass"
                >
                  <q-icon :name="action.icon" size="28px" />
                </q-avatar>
                <div class="text-weight-bold text-white text-uppercase tracking-wider text-caption">
                  {{ action.label }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- Performance Analytics Chart -->
        <q-card
          class="bg-dark-card border-glass no-shadow border-radius-lg q-mb-lg overflow-hidden fade-in-up"
          style="animation-delay: 0.6s"
        >
          <q-card-section class="q-pa-lg">
            <div class="row items-center justify-between q-mb-lg">
              <div>
                <div class="text-h6 text-weight-bold text-white uppercase tracking-wider">
                  Control Analytics
                </div>
                <div class="text-caption text-grey-6">Revenue and recruitment velocity vectors</div>
              </div>
              <q-btn-toggle
                v-model="chartTab"
                no-caps
                rounded
                unelevated
                toggle-color="gold"
                color="black-opacity"
                text-color="grey-5"
                toggle-text-color="dark"
                :options="[
                  { label: 'Liquidity', value: 'revenue' },
                  { label: 'Enrollment', value: 'enrollments' },
                ]"
                class="border-glass rounded-borders-md"
              />
            </div>

            <div v-if="chartTab === 'revenue'" class="q-mt-md">
              <apexchart
                type="area"
                height="350"
                :options="revenueOptions"
                :series="revenueSeries"
              />
            </div>
            <div v-else class="q-mt-md">
              <apexchart
                type="bar"
                height="350"
                :options="enrollmentOptions"
                :series="enrollmentSeries"
              />
            </div>
          </q-card-section>
        </q-card>

        <!-- Recent Enrollments Table -->
        <q-card
          class="bg-dark-card border-glass border-radius-lg q-mt-lg fade-in-up"
          style="animation-delay: 0.7s"
        >
          <q-card-section class="row items-center justify-between q-pa-lg border-bottom-light">
            <div class="text-h6 text-weight-bold text-white uppercase tracking-wider">
              Active Stream (Joiners)
            </div>
            <q-btn
              flat
              no-caps
              color="gold"
              label="Audit All Assets"
              icon-right="arrow_forward"
              to="/tms/portal/students"
            />
          </q-card-section>
          <q-card-section class="q-pa-none">
            <q-table
              :rows="recentStudents"
              :columns="studentColumns"
              row-key="id"
              flat
              dark
              class="bg-transparent"
              hide-pagination
            >
              <template v-slot:body-cell-name="props">
                <q-td :props="props">
                  <div class="row items-center">
                    <q-avatar
                      size="36px"
                      class="bg-gold-gradient text-dark q-mr-md font-bold text-subtitle2"
                    >
                      {{ props.row.name.charAt(0) }}
                    </q-avatar>
                    <div>
                      <div class="text-weight-bold text-white">{{ props.row.name }}</div>
                      <div class="text-caption text-grey-6 text-mono">{{ props.row.id }}</div>
                    </div>
                  </div>
                </q-td>
              </template>
              <template v-slot:body-cell-status="props">
                <q-td :props="props" align="right">
                  <q-badge
                    :color="props.row.status === 'Paid' ? 'gold' : 'grey-9'"
                    :class="props.row.status === 'Paid' ? 'text-dark' : 'text-grey-5'"
                    class="q-px-md q-py-xs font-bold no-shadow"
                  >
                    {{ props.row.status }}
                  </q-badge>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>

      <!-- Right Column -->
      <div class="col-12 col-lg-4">
        <!-- Next Class Card -->
        <q-card
          class="bg-dark-card border-glass border-radius-lg overflow-hidden relative-position q-mb-lg fade-in-up shadow-2"
          style="animation-delay: 0.8s"
        >
          <div class="bg-gold-opacity absolute-full" style="opacity: 0.05"></div>
          <q-card-section class="q-pa-xl">
            <div class="row items-center justify-between q-mb-lg">
              <q-badge color="gold" text-color="dark" class="q-px-md q-py-xs font-bold no-shadow"
                >LIVE SESSION</q-badge
              >
            </div>
            <div class="text-h4 text-weight-bolder text-gold q-mb-sm">Physics Matrix</div>
            <div class="text-subtitle1 text-grey-5 q-mb-xl">Hall A • Sector Alpha</div>

            <div class="row items-end justify-between">
              <div>
                <div class="text-h2 text-white font-mono text-weight-bold">
                  {{ formattedTime12 }}
                </div>
                <div class="text-caption text-gold font-bold tracking-widest uppercase">
                  {{ currentPeriod }}
                </div>
              </div>
              <q-btn
                round
                color="gold"
                text-color="dark"
                icon="arrow_forward"
                unelevated
                class="shadow-2 hover-scale"
                to="/tms/portal/classes"
              />
            </div>
          </q-card-section>
        </q-card>

        <!-- Schedule -->
        <q-card
          class="bg-dark-card border-glass border-radius-lg fade-in-up"
          style="animation-delay: 0.9s"
        >
          <q-card-section class="q-pa-lg">
            <div class="text-h6 text-weight-bold text-white uppercase tracking-wider q-mb-xl">
              Mission Schedule
            </div>
            <q-timeline color="gold" dark class="q-ml-sm">
              <q-timeline-entry icon="history_edu">
                <template v-slot:title
                  ><div class="text-white font-bold">Math Synthesis</div></template
                >
                <template v-slot:subtitle
                  ><div class="text-grey-6 font-bold">08:00 - 10:00</div></template
                >
              </q-timeline-entry>
              <q-timeline-entry icon="biotech" color="orange">
                <template v-slot:title
                  ><div class="text-white font-bold">Physics Core</div></template
                >
                <template v-slot:subtitle
                  ><div class="text-grey-6 font-bold">10:30 - 12:30</div></template
                >
              </q-timeline-entry>
            </q-timeline>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useCurrencyStore } from 'stores/currency'
import VueApexCharts from 'vue3-apexcharts'

const Apexchart = VueApexCharts
const $q = useQuasar()
const currencyStore = useCurrencyStore()

const now = ref(new Date())
let timeInterval
onMounted(() => {
  timeInterval = setInterval(() => (now.value = new Date()), 1000)
})
onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval)
})

const currentPeriod = computed(() =>
  now.value.getHours() >= 12 ? 'Post Meridian' : 'Ante Meridian',
)
const formattedTime12 = computed(() => {
  let h = now.value.getHours() % 12 || 12
  let m = now.value.getMinutes().toString().padStart(2, '0')
  return `${h}:${m}`
})

const activeLocation = computed(() =>
  currencyStore.countryCode === 'SE' ? 'Stockholm HQ' : 'Sri Lanka Regional',
)

const stats = computed(() => [
  { label: 'Active Assets', value: '1,240', icon: 'school', color: 'blue', trend: 12 },
  {
    label: 'Revenue Momentum',
    value: currencyStore.countryCode === 'SE' ? '425k' : '8.5M',
    currency: currencyStore.currency,
    icon: 'payments',
    color: 'gold',
    trend: 8,
  },
  { label: 'New Signal', value: '18', icon: 'pending_actions', color: 'orange', trend: -2 },
  { label: 'Facilitators', value: '45', icon: 'person', color: 'purple', trend: 5 },
])

const quickActions = [
  { label: 'Recruit', icon: 'person_add', color: 'blue', route: '/tms/portal/students' },
  { label: 'Sync', icon: 'auto_awesome', color: 'gold', route: '/tms/portal/dashboard' },
  { label: 'Audit', icon: 'payments', color: 'emerald', route: '/tms/portal/payments' },
  { label: 'Configure', icon: 'settings', color: 'purple', route: '/tms/portal/settings' },
]

const recentStudents = [
  { id: '#ST-001', name: 'Kasun Perera', status: 'Paid' },
  { id: '#ST-002', name: 'Nimali Silva', status: 'Pending' },
  { id: '#ST-003', name: 'Amal De Silva', status: 'Paid' },
]

const studentColumns = [
  { name: 'name', label: 'ENTITY', align: 'left', field: 'name' },
  { name: 'status', label: 'STATUS', align: 'right', field: 'status' },
]

const chartTab = ref('revenue')
const revenueSeries = [
  { name: 'Inflow', data: [31, 40, 28, 51, 42, 109, 100] },
  { name: 'Outflow', data: [11, 32, 45, 32, 34, 52, 41] },
]
const revenueOptions = {
  chart: { toolbar: { show: false }, type: 'area' },
  colors: ['#bf953f', '#3b82f6'],
  stroke: { curve: 'smooth', width: 3 },
  xaxis: {
    categories: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    labels: { style: { colors: '#64748b' } },
  },
  yaxis: { labels: { style: { colors: '#64748b' } } },
  grid: { borderColor: 'rgba(255,255,255,0.05)' },
  fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0 } },
}

const enrollmentSeries = [{ name: 'New Joiners', data: [44, 55, 57, 56, 61, 58, 63] }]
const enrollmentOptions = {
  chart: { toolbar: { show: false }, type: 'bar' },
  colors: ['#bf953f'],
  plotOptions: { bar: { borderRadius: 10, columnWidth: '50%' } },
  xaxis: {
    categories: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    labels: { style: { colors: '#64748b' } },
  },
}

const triggerMarketingFlow = () =>
  $q.notify({ type: 'positive', message: 'Nexus Flow protocol active' })
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
.text-gold-gradient {
  background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.text-gold {
  color: #bf953f;
}
.text-gold-light {
  color: rgba(191, 149, 63, 0.7);
}
.bg-gold-gradient {
  background: linear-gradient(135deg, #bf953f 0%, #b38728 100%);
}
.bg-gold-opacity {
  background: rgba(191, 149, 63, 0.1);
}
.bg-blue-opacity {
  background: rgba(59, 130, 246, 0.1);
}
.bg-orange-opacity {
  background: rgba(245, 158, 11, 0.1);
}
.bg-purple-opacity {
  background: rgba(168, 85, 247, 0.1);
}
.bg-emerald-opacity {
  background: rgba(16, 185, 129, 0.1);
}
.bg-black-opacity {
  background: rgba(0, 0, 0, 0.3);
}

.hover-scale {
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.02);
  }
}
.border-bottom-light {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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
