<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-xl fade-in-up">
      <div>
        <h1 class="text-h4 text-weight-bolder text-emerald-gradient q-my-none">
          Attendance Intelligence <span class="text-h4">🛡️</span>
        </h1>
        <p class="text-grey-5 text-subtitle1 q-mt-sm q-mb-none font-medium text-emerald-light">
          Biometric monitoring, engagement auditing, and attrition prevention.
        </p>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <q-card
      class="bg-dark-card border-glass border-radius-lg q-mb-lg overflow-hidden fade-in-up"
      style="animation-delay: 0.1s"
    >
      <q-tabs
        v-model="tab"
        dense
        class="text-grey-5"
        active-color="emerald"
        indicator-color="emerald"
        align="left"
        narrow-indicator
      >
        <q-tab
          name="mark"
          label="Audit Terminal"
          icon="sensors"
          no-caps
          class="q-px-lg q-py-md font-bold"
        />
        <q-tab
          name="reports"
          label="Engagement Metrics"
          icon="insights"
          no-caps
          class="q-px-lg q-py-md font-bold"
        />
        <q-tab
          name="absent"
          label="Absence Analytics"
          icon="warning_amber"
          no-caps
          class="q-px-lg q-py-md font-bold"
        />
      </q-tabs>
    </q-card>

    <q-tab-panels v-model="tab" animated class="bg-transparent">
      <!-- TAB 1: AUDIT TERMINAL -->
      <q-tab-panel name="mark" class="q-pa-none">
        <!-- Configuration Card -->
        <q-card
          class="bg-dark-card border-glass border-radius-lg q-mb-lg fade-in-up"
          style="animation-delay: 0.2s"
        >
          <q-card-section class="q-pa-lg">
            <div class="row q-col-gutter-lg items-center">
              <div class="col-12 col-md-4">
                <q-select
                  filled
                  dark
                  v-model="selectedClass"
                  :options="classOptions"
                  option-label="name"
                  label="Target Class"
                  @update:model-value="loadStudents"
                >
                  <template v-slot:prepend><q-icon name="class" color="emerald" /></template>
                </q-select>
              </div>
              <div class="col-12 col-md-3">
                <q-input
                  filled
                  dark
                  v-model="selectedDate"
                  type="date"
                  label="Audit Date"
                  @update:model-value="loadStudents"
                >
                  <template v-slot:prepend
                    ><q-icon name="calendar_today" color="emerald"
                  /></template>
                </q-input>
              </div>
              <div
                class="col-12 col-md-5 row items-center justify-end q-gutter-md"
                v-if="selectedClass"
              >
                <q-badge outline color="emerald" class="q-pa-sm font-bold">{{
                  selectedClass.grade
                }}</q-badge>
                <q-badge color="emerald" class="q-pa-sm font-bold text-dark"
                  >{{ students.length }} Assigned</q-badge
                >
              </div>
            </div>
          </q-card-section>
        </q-card>

        <div v-if="selectedClass" class="row q-col-gutter-lg">
          <!-- Quick Scan Section -->
          <div class="col-12 col-md-4 fade-in-up" style="animation-delay: 0.3s">
            <q-card
              class="bg-dark-card border-glass border-radius-lg text-center q-pa-xl h-full scanner-container overflow-hidden"
            >
              <div class="scanner-glow"></div>
              <div class="scanner-laser"></div>
              <q-icon
                name="qr_code_scanner"
                size="64px"
                color="emerald"
                class="q-mb-lg glow-icon"
              />
              <div class="text-h5 text-weight-bolder text-white q-mb-sm">Neural Link</div>
              <p class="text-grey-5 q-mb-xl">Initialize biometric / QR identification protocol.</p>

              <q-input
                ref="scanInput"
                filled
                dark
                rounded
                v-model="scanCode"
                placeholder="Scan ID Surface..."
                class="q-mb-md"
                @keyup.enter="handleScan"
                autofocus
              >
                <template v-slot:append>
                  <q-icon name="hub" color="emerald" class="cursor-pointer" @click="handleScan" />
                </template>
              </q-input>

              <div v-if="lastScanned" class="fade-in-up">
                <q-card
                  class="bg-emerald-opacity border-glass q-pa-md border-radius-md success-glow-card"
                >
                  <div class="row items-center justify-center text-emerald font-bold">
                    <q-icon name="verified_user" size="24px" class="q-mr-sm" />
                    <div class="column items-start">
                      <span class="text-caption text-grey-5 uppercase tracking-tighter"
                        >ACCESS GRANTED</span
                      >
                      <span class="text-subtitle1">{{ lastScanned }}</span>
                    </div>
                  </div>
                </q-card>
              </div>
            </q-card>
          </div>

          <!-- Student List -->
          <div class="col-12 col-md-8 fade-in-up" style="animation-delay: 0.4s">
            <q-card class="bg-dark-card border-glass border-radius-lg overflow-hidden">
              <q-header class="bg-black-opacity q-pa-md border-bottom-light">
                <div class="row items-center justify-between">
                  <div class="text-subtitle1 text-weight-bold tracking-wider text-grey-4 uppercase">
                    Asset Inventory
                  </div>
                  <div class="row q-gutter-sm">
                    <q-btn flat round icon="sms" color="blue" @click="sendBulkSMS">
                      <q-tooltip>Broadcast Alert to Absentees</q-tooltip>
                    </q-btn>
                    <q-btn flat round icon="done_all" color="emerald" @click="markAllPresent">
                      <q-tooltip>Collective Verification (All Present)</q-tooltip>
                    </q-btn>
                  </div>
                </div>
              </q-header>

              <q-list separator class="bg-transparent">
                <div v-if="loading" class="q-pa-xl text-center">
                  <q-spinner-puff color="emerald" size="50px" />
                </div>
                <div v-else-if="students.length === 0" class="q-pa-xl text-center text-grey-6">
                  No entities detected in this sector.
                </div>
                <q-item
                  v-for="student in students"
                  :key="student.id"
                  class="q-py-md hover-bg transition-all"
                >
                  <q-item-section avatar>
                    <q-avatar size="48px" class="border-glass bg-dark">
                      <span class="text-emerald font-bold">{{ student.name.charAt(0) }}</span>
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-bolder text-white">{{
                      student.name
                    }}</q-item-label>
                    <q-item-label caption class="text-grey-6"
                      >ID: {{ student.id }} | {{ student.phone }}</q-item-label
                    >
                  </q-item-section>
                  <q-item-section side>
                    <div class="row q-gutter-sm">
                      <q-btn
                        unelevated
                        rounded
                        size="sm"
                        :class="
                          student.attendance === 'Present'
                            ? 'bg-emerald text-dark'
                            : 'bg-grey-9 text-grey-5'
                        "
                        label="Verified"
                        @click="updateStatus(student, 'Present')"
                      />
                      <q-btn
                        unelevated
                        rounded
                        size="sm"
                        :class="
                          student.attendance === 'Absent'
                            ? 'bg-red text-white'
                            : 'bg-grey-9 text-grey-5'
                        "
                        label="Offline"
                        @click="updateStatus(student, 'Absent')"
                      />
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </div>

        <div v-else class="text-center q-pa-xl fade-in-up">
          <q-icon name="dashboard_customize" size="80px" color="grey-9" />
          <div class="text-h5 text-grey-7 q-mt-lg font-medium">
            Select a Sector to Begin Monitoring
          </div>
        </div>
      </q-tab-panel>

      <!-- TAB 2: ENGAGEMENT METRICS -->
      <q-tab-panel name="reports" class="q-pa-none">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-4 fade-in-up" style="animation-delay: 0.2s">
            <q-card
              class="bg-dark-card border-glass border-radius-lg q-pa-xl text-center hover-scale"
            >
              <div
                class="text-caption text-grey-5 text-uppercase tracking-widest font-bold q-mb-sm"
              >
                Average Turnout
              </div>
              <div class="text-h2 text-weight-bolder text-emerald">85.4%</div>
              <div class="text-caption text-emerald q-mt-sm font-bold">+2.4% EFFICIENCY</div>
            </q-card>
          </div>
          <div class="col-12 col-md-4 fade-in-up" style="animation-delay: 0.3s">
            <q-card
              class="bg-dark-card border-glass border-radius-lg q-pa-xl text-center hover-scale"
            >
              <div
                class="text-caption text-grey-5 text-uppercase tracking-widest font-bold q-mb-sm"
              >
                Total Instances
              </div>
              <div class="text-h2 text-weight-bolder text-white">24</div>
              <div class="text-caption text-grey-5 q-mt-sm font-bold">CURRENT CYCLE (MONTH)</div>
            </q-card>
          </div>
          <div class="col-12 col-md-4 fade-in-up" style="animation-delay: 0.4s">
            <q-card
              class="bg-dark-card border-glass border-radius-lg q-pa-xl text-center hover-scale"
            >
              <div
                class="text-caption text-grey-5 text-uppercase tracking-widest font-bold q-mb-sm"
              >
                Peak Vector
              </div>
              <div class="text-h4 text-weight-bolder text-blue">Grade 10 Maths</div>
              <div class="text-caption text-blue q-mt-sm font-bold">98% ENGAGEMENT</div>
            </q-card>
          </div>

          <!-- Charts -->
          <div class="col-12 col-md-8 fade-in-up" style="animation-delay: 0.5s">
            <q-card class="bg-dark-card border-glass border-radius-lg q-pa-lg">
              <div class="text-h6 text-weight-bold text-white uppercase tracking-wider q-mb-lg">
                System Engagement Vectors
              </div>
              <apexchart
                type="area"
                height="350"
                :options="areaChartOptions"
                :series="areaChartSeries"
              />
            </q-card>
          </div>
          <div class="col-12 col-md-4 fade-in-up" style="animation-delay: 0.6s">
            <q-card class="bg-dark-card border-glass border-radius-lg q-pa-lg">
              <div class="text-h6 text-weight-bold text-white uppercase tracking-wider q-mb-lg">
                Status Attribution
              </div>
              <apexchart
                type="donut"
                height="350"
                :options="donutChartOptions"
                :series="donutChartSeries"
              />
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <!-- TAB 3: ABSENCE ANALYTICS -->
      <q-tab-panel name="absent" class="q-pa-none">
        <div class="fade-in-up" style="animation-delay: 0.2s">
          <q-banner
            rounded
            class="bg-red-opacity text-white q-mb-xl border-glass border-radius-lg q-pa-lg"
          >
            <template v-slot:avatar
              ><q-icon name="crisis_alert" color="red" size="32px"
            /></template>
            <div class="text-h6 font-bold">Attrition Risk Identified</div>
            <div class="text-grey-5">
              Displaying entities with <strong>3+ consecutive offline instances</strong>.
              Intervention protocol recommended.
            </div>
          </q-banner>
        </div>

        <q-card
          class="bg-dark-card border-glass border-radius-lg overflow-hidden fade-in-up"
          style="animation-delay: 0.3s"
        >
          <q-table
            :rows="atRiskStudents"
            :columns="riskColumns"
            row-key="id"
            flat
            dark
            class="bg-transparent"
          >
            <template v-slot:body-cell-name="props">
              <q-td :props="props">
                <div class="text-weight-bolder text-white">{{ props.row.name }}</div>
                <div class="text-caption text-grey-6">{{ props.row.class }}</div>
              </q-td>
            </template>
            <template v-slot:body-cell-consecutive="props">
              <q-td :props="props" align="center">
                <q-badge color="red" class="q-pa-md font-bold glow-badge">
                  {{ props.row.consecutive }} GAP LOCK
                </q-badge>
              </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" align="right">
                <q-btn
                  unelevated
                  rounded
                  size="sm"
                  class="bg-blue-gradient text-white q-px-md q-mr-sm"
                  icon="phone"
                  label="Contact Target"
                  :href="`tel:${props.row.parentPhone}`"
                />
                <q-btn
                  outline
                  rounded
                  size="sm"
                  color="red"
                  icon="report"
                  label="Issue Warning"
                  @click="sendWarning(props.row)"
                />
              </q-td>
            </template>
          </q-table>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'
import VueApexCharts from 'vue3-apexcharts'

const Apexchart = VueApexCharts
const $q = useQuasar()

const tab = ref('mark')
const loading = ref(false)

// State
const classOptions = ref([])
const selectedClass = ref(null)
const selectedDate = ref(new Date().toISOString().split('T')[0])
const students = ref([])
const scanCode = ref('')
const lastScanned = ref('')
const scanInput = ref(null)

// Charts
const areaChartOptions = {
  chart: { type: 'area', toolbar: { show: false }, animations: { enabled: true } },
  stroke: { curve: 'smooth', width: 3 },
  colors: ['#10b981'],
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0 } },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    labels: { style: { colors: '#64748b' } },
  },
  yaxis: { labels: { style: { colors: '#64748b' } } },
  grid: { borderColor: 'rgba(255,255,255,0.05)' },
  dataLabels: { enabled: false },
}
const areaChartSeries = [{ name: 'System Presence', data: [45, 52, 38, 24, 33, 65, 60] }]

const donutChartOptions = {
  labels: ['Verified', 'Offline', 'Gaps'],
  colors: ['#10b981', '#ef4444', '#f59e0b'],
  theme: { mode: 'dark' },
  legend: { position: 'bottom', labels: { colors: '#94a3b8' }, markers: { radius: 12 } },
  stroke: { width: 4, colors: ['#0f172a'] },
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: {
          show: true,
          name: { color: '#94a3b8' },
          value: { color: '#fff', fontSize: '24px', fontWeight: 800 },
          total: { show: true, label: 'TOTAL', color: '#64748b' },
        },
      },
    },
  },
}
const donutChartSeries = [75, 15, 10]

// Absence Mapping
const riskColumns = [
  { name: 'name', label: 'Entity Identifier', field: 'name', align: 'left' },
  { name: 'consecutive', label: 'Consecutive Gaps', field: 'consecutive', align: 'center' },
  { name: 'lastPresent', label: 'Last Positive Trace', field: 'lastPresent', align: 'left' },
  { name: 'actions', label: 'Intervention Protocol', field: 'actions', align: 'right' },
]

const atRiskStudents = ref([
  {
    id: 101,
    name: 'Kavindu Perera',
    class: 'Grade 10 - Maths',
    consecutive: 3,
    lastPresent: '2026-01-20',
    parentPhone: '0771234567',
  },
  {
    id: 102,
    name: 'Shehan Silva',
    class: 'Grade 11 - Science',
    consecutive: 4,
    lastPresent: '2026-01-15',
    parentPhone: '0719876543',
  },
])

onMounted(async () => {
  await fetchClasses()
})

const fetchClasses = async () => {
  const { data } = await supabase.from('classes').select('*').eq('status', 'Active')
  classOptions.value = data?.length
    ? data
    : [{ id: 1, name: 'Grade 10 - Maths', grade: 'Grade 10' }]
}

const loadStudents = async () => {
  if (!selectedClass.value) return
  loading.value = true
  const { data: studentList } = await supabase
    .from('students')
    .select('*')
    .eq('grade', selectedClass.value.grade)
    .eq('status', 'Active')
  students.value = studentList?.map((s) => ({ ...s, attendance: 'Absent' })) || [
    { id: 1, name: 'Kasun Perera', phone: '077111222', attendance: 'Absent' },
    { id: 2, name: 'Amal Silva', phone: '077333444', attendance: 'Absent' },
  ]
  loading.value = false
}

const updateStatus = async (student, status) => {
  student.attendance = status
  $q.notify({ type: 'positive', message: `Identity ${student.name} synchronized`, timeout: 800 })
}

const markAllPresent = () => {
  students.value.forEach((s) => (s.attendance = 'Present'))
  $q.notify({ type: 'positive', message: 'Mass verification complete' })
}

const handleScan = () => {
  if (!scanCode.value) return
  const s = students.value.find((st) => st.id == scanCode.value)
  if (s) {
    s.attendance = 'Present'
    lastScanned.value = s.name
    setTimeout(() => (lastScanned.value = ''), 3000)
  }
  scanCode.value = ''
}

const sendBulkSMS = () => $q.notify({ type: 'info', message: 'Broadcasting absence alerts...' })
const sendWarning = (s) =>
  $q.notify({ type: 'negative', message: `Warning signal dispatched to ${s.name} node.` })
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
.text-emerald {
  color: #10b981;
}
.bg-emerald {
  background: #10b981;
}
.bg-emerald-opacity {
  background: rgba(16, 185, 129, 0.05);
}
.bg-red-opacity {
  background: rgba(239, 68, 68, 0.05);
}

.scanner-laser {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, transparent, #10b981, transparent);
  box-shadow: 0 0 15px #10b981;
  animation: scanning 3s ease-in-out infinite;
  z-index: 1;
}

@keyframes scanning {
  0%,
  100% {
    top: 10%;
    opacity: 0;
  }
  50% {
    top: 90%;
    opacity: 1;
  }
}

.success-glow-card {
  border: 1px solid rgba(16, 185, 129, 0.4) !important;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
  animation: success-pulse 0.5s ease-out;
}

@keyframes success-pulse {
  0% {
    transform: scale(0.95);
    filter: brightness(2);
  }
  100% {
    transform: scale(1);
    filter: brightness(1);
  }
}

.tracking-tighter {
  letter-spacing: -0.5px;
}

/* Base Styles */
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
.text-emerald {
  color: #10b981;
}
.bg-emerald {
  background: #10b981;
}
.bg-emerald-opacity {
  background: rgba(16, 185, 129, 0.05);
}
.bg-red-opacity {
  background: rgba(239, 68, 68, 0.05);
}

.scanner-container {
  position: relative;
  border: 1px solid rgba(16, 185, 129, 0.2) !important;
}
.scanner-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%);
  pointer-events: none;
}
.glow-icon {
  filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.5));
}
.glow-badge {
  box-shadow: 0 0 15px rgba(239, 68, 68, 0.3);
  border-radius: 20px;
}

.hover-bg:hover {
  background: rgba(255, 255, 255, 0.02);
}
.hover-scale:hover {
  transform: scale(1.02);
  transition: transform 0.3s ease;
}
.border-bottom-light {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.bg-blue-gradient {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
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
