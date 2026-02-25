<template>
  <q-page class="q-pa-lg">
    <!-- Welcome Header -->
    <div class="row items-center justify-between q-mb-xl">
      <div>
        <h1 class="text-h4 text-weight-bolder text-gold-gradient q-my-none">
          Good Morning, Admin! <span class="text-h4">👋</span>
        </h1>
        <p class="text-grey-5 text-subtitle1 q-mt-sm q-mb-none font-medium">
          Managing your DigyNex Ecosystem from <span class="text-white">Sweden HQ</span>.
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
          color="secondary"
          icon="add"
          label="New Student"
          no-caps
          to="/students"
          class="q-px-lg q-py-sm shadow-1 hover-scale"
        />
      </div>
    </div>

    <!-- Modern Stats Grid -->
    <div class="row q-col-gutter-lg q-mb-xl">
      <div class="col-12 col-sm-6 col-md-3" v-for="(stat, index) in stats" :key="index">
        <q-card
          class="stats-card no-shadow border-radius-lg overflow-hidden hover-card full-height"
        >
          <q-card-section class="q-pa-md relative-position">
            <div class="row items-center justify-between q-mb-md">
              <div
                class="q-pa-md rounded-borders-15 shadow-2"
                :class="`bg-${stat.color}-1 text-${stat.color}-9`"
                style="
                  width: 50px;
                  height: 50px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <q-icon :name="stat.icon" size="22px" />
              </div>

              <div class="text-right">
                <div class="text-h4 text-weight-bolder">
                  <span v-if="stat.currency" class="text-h6 text-grey-5 q-mr-xs">{{
                    stat.currency
                  }}</span>
                  {{ stat.value }}
                </div>
              </div>
            </div>

            <div class="row items-center justify-between">
              <div class="text-subtitle2 text-grey-7 font-medium text-uppercase tracking-wide">
                {{ stat.label }}
              </div>
              <div class="flex items-center">
                <span
                  class="text-weight-bold q-mr-xs"
                  :class="stat.trend > 0 ? 'text-green-5' : 'text-red-5'"
                >
                  {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
                </span>
                <span class="text-caption text-grey-6">vs last month</span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="row q-col-gutter-xl">
      <!-- Left Column: Activity & Charts -->
      <div class="col-12 col-lg-8">
        <!-- Quick Actions Grid -->
        <div class="row q-col-gutter-md q-mb-lg">
          <div class="col-6 col-md-3" v-for="action in quickActions" :key="action.label">
            <q-card
              class="stats-card no-shadow border-radius-lg cursor-pointer hover-border text-center full-height"
              v-ripple
              @click="$router.push(action.route)"
            >
              <q-card-section>
                <q-avatar
                  size="48px"
                  :color="action.color + '-1'"
                  :text-color="action.color + '-9'"
                  class="q-mb-sm"
                >
                  <q-icon :name="action.icon" size="22px" />
                </q-avatar>
                <div class="text-weight-bold">{{ action.label }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- Performance Analytics Chart -->
        <q-card class="no-shadow border-radius-lg q-mb-lg overflow-hidden">
          <q-card-section class="q-pa-lg">
            <div class="row items-center justify-between q-mb-md">
              <div>
                <div class="text-h6 text-weight-bold">Performance Overview</div>
                <div class="text-caption text-grey-7">Revenue and enrollment growth over time</div>
              </div>
              <q-btn-toggle
                v-model="chartTab"
                spread
                no-caps
                rounded
                unelevated
                toggle-color="primary"
                color="grey-2"
                text-color="grey-9"
                :options="[
                  { label: 'Revenue', value: 'revenue' },
                  { label: 'Enrollments', value: 'enrollments' },
                ]"
                class="border-radius-lg"
              />
            </div>

            <div v-if="chartTab === 'revenue'" class="q-mt-md">
              <apexchart
                type="area"
                height="350"
                :options="revenueOptions"
                :series="revenueSeries"
              ></apexchart>
            </div>
            <div v-else class="q-mt-md">
              <apexchart
                type="bar"
                height="350"
                :options="enrollmentOptions"
                :series="enrollmentSeries"
              ></apexchart>
            </div>
          </q-card-section>
        </q-card>

        <!-- Recent Enrollments Table -->
        <q-card class="no-shadow border-radius-lg q-mt-lg bg-dark-card border-glass">
          <q-card-section class="row items-center justify-between q-pa-lg">
            <div>
              <div class="text-h6 text-weight-bold text-white">Recent Enrollments</div>
              <div class="text-caption text-grey-5">Latest students joined this month</div>
            </div>
            <q-btn
              flat
              no-caps
              color="secondary"
              label="View All Students"
              icon-right="arrow_forward"
              to="/students"
            />
          </q-card-section>

          <q-separator dark class="opacity-10" />

          <q-card-section class="q-pa-none">
            <q-table
              :rows="recentStudents"
              :columns="studentColumns"
              row-key="id"
              flat
              hide-pagination
              :rows-per-page-options="[0]"
              card-class="bg-transparent text-white"
              table-header-class="text-grey-5"
            >
              <template v-slot:body-cell-name="props">
                <q-td :props="props">
                  <div class="row items-center">
                    <q-avatar
                      size="36px"
                      class="bg-gold-gradient text-white q-mr-md font-bold text-subtitle2"
                    >
                      {{ props.row.name.charAt(0) }}
                    </q-avatar>
                    <div>
                      <div class="text-weight-bold">{{ props.row.name }}</div>
                      <div class="text-caption text-grey-5 text-mono">{{ props.row.id }}</div>
                    </div>
                  </div>
                </q-td>
              </template>
              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <q-badge
                    :color="props.row.status === 'Paid' ? 'green-9' : 'orange-9'"
                    :text-color="props.row.status === 'Paid' ? 'green-2' : 'orange-2'"
                    class="q-px-md q-py-xs rounded-full font-bold border-glass"
                  >
                    {{ props.row.status }}
                  </q-badge>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>

        <!-- Marketing & Social Nexus Section -->
        <div class="text-h6 text-weight-bold q-mt-xl q-mb-md text-white row items-center">
          <q-icon name="rocket_launch" color="gold" class="q-mr-sm" />
          Marketing & Social Nexus
        </div>
        <div class="row q-col-gutter-lg q-mb-xl">
          <div class="col-12 col-md-4" v-for="mStat in marketingStats" :key="mStat.label">
            <q-card class="bg-dark-card border-glass border-radius-lg hover-card">
              <q-card-section class="q-pa-md">
                <div class="row items-center justify-between no-wrap">
                  <div>
                    <div class="text-caption text-grey-5 text-uppercase tracking-widest">
                      {{ mStat.label }}
                    </div>
                    <div class="text-h5 text-weight-bolder text-white q-mt-xs">
                      {{ mStat.value }}
                    </div>
                  </div>
                  <q-icon :name="mStat.icon" :color="mStat.color" size="32px" class="opacity-30" />
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12">
            <q-card class="bg-dark-card border-glass border-radius-lg overflow-hidden">
              <q-card-section class="q-pa-lg">
                <div class="row items-center justify-between q-mb-md">
                  <div class="text-weight-bold text-white uppercase tracking-wide">
                    Live Automation Logs (n8n)
                  </div>
                  <q-badge color="secondary" class="glow-pulse">Systems Healthy</q-badge>
                </div>
                <div
                  class="bg-black-opacity q-pa-md rounded-borders font-mono text-caption text-emerald overflow-auto"
                  style="max-height: 200px"
                >
                  <div v-for="(log, idx) in marketingLogs" :key="idx" class="q-mb-xs">
                    <span class="text-grey-6">[{{ log.time }}]</span>
                    <span :class="log.type === 'error' ? 'text-red-4' : 'text-emerald'">
                      {{ log.msg }}</span
                    >
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Right Column: Schedule & Summary -->
      <div class="col-12 col-lg-4">
        <!-- Next Class Card (Featured) -->
        <q-card
          class="no-shadow border-radius-lg bg-dark text-white q-mb-lg relative-position overflow-hidden border-secondary-left"
        >
          <!-- Decorative Circles (Darker for subtle effect) -->

          <div
            class="absolute-bottom-left bg-white opacity-5 rounded-full"
            style="width: 100px; height: 100px; left: -20px; bottom: -20px"
          ></div>

          <q-card-section class="q-pa-lg relative-position" style="z-index: 10">
            <div class="row items-center justify-between q-mb-md">
              <q-badge
                color="secondary"
                text-color="white"
                class="q-px-sm q-py-xs text-weight-bold shadow-1"
              >
                Upcoming Class
              </q-badge>
              <q-btn flat round dense icon="more_horiz" class="text-secondary opacity-80">
                <q-menu auto-close>
                  <q-list style="min-width: 150px">
                    <q-item clickable>
                      <q-item-section>View Details</q-item-section>
                    </q-item>
                    <q-item clickable class="text-red">
                      <q-item-section>Cancel Class</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>

            <div class="text-h4 text-weight-bolder q-mb-xs text-secondary">Physics 101</div>
            <div class="text-subtitle1 opacity-90 q-mb-lg font-medium text-grey-4">
              Dr. S. Perera • Hall A
            </div>

            <div class="row items-end justify-between">
              <div>
                <div class="text-h3 font-mono text-weight-bold">{{ formattedTime12 }}</div>
                <div class="text-subtitle2 opacity-80 text-secondary">{{ currentPeriod }}</div>
              </div>
              <q-btn
                round
                color="secondary"
                text-color="white"
                icon="arrow_forward"
                unelevated
                class="shadow-2"
                to="/classes"
              />
            </div>
          </q-card-section>
        </q-card>

        <!-- Calendar / Timeline -->
        <q-card class="no-shadow border-radius-lg">
          <q-card-section class="q-pa-lg">
            <div class="text-h6 text-weight-bold q-mb-md">Today's Schedule</div>

            <q-timeline color="primary" class="q-ml-sm">
              <q-timeline-entry icon="access_time">
                <template v-slot:title>
                  <div class="text-weight-bold">Mathematics Revision</div>
                </template>
                <template v-slot:subtitle> 08:00 AM - 10:00 AM </template>
                <div class="text-caption text-grey-5">Grade 11 • Mr. Kamal</div>
              </q-timeline-entry>

              <q-timeline-entry icon="access_time" color="orange">
                <template v-slot:title>
                  <div class="text-weight-bold">Physics Theory</div>
                </template>
                <template v-slot:subtitle> 10:30 AM - 12:30 PM </template>
                <div class="text-caption text-grey-5">Grade 12 • Dr. Perera</div>
              </q-timeline-entry>

              <q-timeline-entry icon="access_time" color="teal">
                <template v-slot:title>
                  <div class="text-weight-bold">Chemistry Lab</div>
                </template>
                <template v-slot:subtitle> 02:00 PM - 04:00 PM </template>
                <div class="text-caption text-grey-5">Grade 13 • Ms. Silva</div>
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

const $q = useQuasar()

const now = ref(new Date())
let timeInterval

const updateTime = () => {
  now.value = new Date()
}

onMounted(() => {
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval)
})

const currentPeriod = computed(() => {
  // Simple check for AM/PM display if desired, or just "Today"
  // User had "AM Today". Let's try to match 12h format if that was the intent,
  // But standard digital clocks are often 24h or User preference.
  // The design showed "10:30" and "AM Today".
  // Let's stick to 12h format for the big numbers and AM/PM below.
  const hour = now.value.getHours()
  const ampm = hour >= 12 ? 'PM' : 'AM'
  return `${ampm} Today`
})

// Update currentTime logic to return 12h format numbers without AM/PM
const formattedTime12 = computed(() => {
  let hours = now.value.getHours()
  const minutes = now.value.getMinutes().toString().padStart(2, '0')
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  return `${hours}:${minutes}`
})
// Override previous computed to use this one for the template
// Renaming strictly for the ReplacementChunk to match variable names

import { useCurrencyStore } from 'stores/currency'

const currencyStore = useCurrencyStore()

const stats = computed(() => [
  { label: 'Total Students', value: '1,240', icon: 'school', color: 'blue', trend: 12 },
  { label: 'Total Tutors', value: '45', icon: 'person', color: 'purple', trend: 5 },
  {
    label: 'Monthly Revenue',
    value: '425k', // Just the number
    currency: currencyStore.currency, // Separate currency for styling
    icon: 'payments',
    color: 'green',
    trend: 8,
  },
  { label: 'New Inquiries', value: '18', icon: 'pending_actions', color: 'orange', trend: -2 },
])

const quickActions = [
  { label: 'Add Student', icon: 'person_add', color: 'blue', route: '/students' },
  { label: 'Marketing', icon: 'auto_awesome', color: 'gold', route: '/dashboard' },
  { label: 'Create Class', icon: 'class', color: 'purple', route: '/classes' },
  { label: 'Finance', icon: 'payments', color: 'green', route: '/payments' },
]

const marketingStats = [
  { label: 'Social Reach', value: '42.5k', icon: 'public', color: 'gold' },
  { label: 'Daily Posts', value: '04', icon: 'post_add', color: 'secondary' },
  { label: 'Automation Score', value: '98%', icon: 'bolt', color: 'blue' },
]

const marketingLogs = ref([
  { time: '21:40:12', msg: 'Gemini AI: Trend analysis completed for @DigyNex.', type: 'info' },
  {
    time: '21:42:05',
    msg: 'Cloud-Sync: Image assets generated and uploaded to bucket.',
    type: 'info',
  },
  {
    time: '21:45:30',
    msg: 'Webhook Sent: Waiting for human approval via Telegram...',
    type: 'info',
  },
  { time: '21:50:00', msg: 'ERROR: LinkedIn API Token expired. Retrying in 60s.', type: 'error' },
])

const triggerMarketingFlow = () => {
  $q.notify({
    type: 'positive',
    message: 'Nexus Flow Triggered! Check your Telegram for approval.',
    icon: 'rocket_launch',
  })
  marketingLogs.value.unshift({
    time: new Date().toLocaleTimeString(),
    msg: 'Manual Trigger: Starting Nexus Content Pipeline...',
    type: 'info',
  })
}

const studentColumns = [
  { name: 'name', label: 'Student Name', align: 'left', field: 'name' },
  { name: 'subject', label: 'Subject', align: 'left', field: 'subject' },
  { name: 'date', label: 'Date', align: 'right', field: 'date' },
  { name: 'status', label: 'Status', align: 'right', field: 'status' },
]

const recentStudents = [
  { id: '#ST-001', name: 'Kasun Perera', subject: 'Mathematics', date: 'Oct 24', status: 'Paid' },
  { id: '#ST-002', name: 'Nimali Silva', subject: 'Science', date: 'Oct 23', status: 'Pending' },
  { id: '#ST-003', name: 'Amal De Silva', subject: 'History', date: 'Oct 22', status: 'Paid' },
  { id: '#ST-004', name: 'Rohan Jay', subject: 'Physics', date: 'Oct 21', status: 'Paid' },
]

// --- Charts Data ---
const chartTab = ref('revenue')

const revenueSeries = ref([
  {
    name: 'Income',
    data: [31000, 40000, 28000, 51000, 42000, 109000, 100000],
  },
  {
    name: 'Expenses',
    data: [11000, 32000, 45000, 32000, 34000, 52000, 41000],
  },
])

const revenueOptions = ref({
  chart: {
    fontFamily: 'Roboto, sans-serif',
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  colors: ['#1976D2', '#FF9800'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 3 },
  xaxis: {
    categories: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: {
      formatter: (val) => `${currencyStore.currency} ${val / 1000}k`,
    },
  },
  tooltip: {
    theme: 'dark',
    y: {
      formatter: (val) => currencyStore.format(val),
    },
  },
  grid: {
    borderColor: 'rgba(0,0,0,0.05)',
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.2,
      stops: [0, 90, 100],
    },
  },
})

const enrollmentSeries = ref([
  {
    name: 'New Students',
    data: [44, 55, 57, 56, 61, 58, 63],
  },
])

const enrollmentOptions = ref({
  chart: {
    fontFamily: 'Roboto, sans-serif',
    toolbar: { show: false },
  },
  colors: ['#1976D2'],
  plotOptions: {
    bar: {
      columnWidth: '50%',
      borderRadius: 8,
    },
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  tooltip: {
    theme: 'dark',
  },
  grid: {
    borderColor: 'rgba(0,0,0,0.05)',
  },
})
</script>

<style lang="scss" scoped>
.font-medium {
  font-weight: 500;
}
.font-bold {
  font-weight: 600;
}
.tracking-wide {
  letter-spacing: 0.05em;
}
.border-radius-lg {
  border-radius: 16px;
}
.rounded-borders-md {
  border-radius: 12px;
}
.opacity-5 {
  opacity: 0.05;
}

.opacity-10 {
  opacity: 0.1;
}
.opacity-80 {
  opacity: 0.8;
}
.opacity-90 {
  opacity: 0.9;
}
.stats-card {
  background: white;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.hover-scale {
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.02);
  }
}
.hover-card {
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow:
      0 10px 25px -5px rgba(0, 0, 0, 0.1),
      0 8px 10px -6px rgba(0, 0, 0, 0.1);
  }
}
.hover-border {
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
  border: 1px solid transparent;
  background: white; /* Default light */
}

.hover-border:hover {
  border-color: var(--q-primary);
  transform: translateY(-2px);
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
}

.rounded-full {
  border-radius: 9999px;
}
.font-mono {
  font-family: 'Roboto Mono', monospace;
}

.border-secondary-left {
  border-left: 4px solid #10b981;
}

/* Premium Dark/Gold Styles */
.text-gold-gradient {
  background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #bf953f;
}

.bg-gold-gradient {
  background: linear-gradient(135deg, #bf953f 0%, #b38728 100%);
}

.bg-dark-card {
  background: #0f172a !important; /* Nordic Deep Blue / Slate */
}

.border-glass {
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
}

.bg-black-opacity {
  background: rgba(0, 0, 0, 0.3);
}

.text-emerald {
  color: #10b981;
}

.glow-pulse {
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  animation: pulse-emerald 2s infinite;
}

@keyframes pulse-emerald {
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

.text-mono {
  font-family: 'Roboto Mono', monospace;
}
</style>
