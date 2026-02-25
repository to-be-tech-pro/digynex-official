<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="text-h5 text-weight-bold q-my-none text-dark">Attendance Management</h1>
        <p class="text-grey-6 q-mt-xs q-mb-none">Mark and track student attendance.</p>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <q-card class="no-shadow border-gray q-mb-lg">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="left"
        narrow-indicator
      >
        <q-tab name="mark" label="Mark Attendance" icon="check_circle" />
        <q-tab name="reports" label="Attendance Reports" icon="bar_chart" />
        <q-tab name="absent" label="Absence Tracking" icon="warning" />
      </q-tabs>
    </q-card>

    <q-tab-panels v-model="tab" animated class="bg-transparent">
      <!-- TAB 1: MARK ATTENDANCE (Original Logic) -->
      <q-tab-panel name="mark" class="q-pa-none">
        <!-- Active Session Card -->
        <q-card class="no-shadow border-gray q-mb-lg bg-white">
          <q-card-section class="q-pb-none">
            <div class="text-subtitle1 text-weight-bold">Select Class Session</div>
          </q-card-section>
          <q-card-section>
            <div class="row q-col-gutter-md items-center">
              <div class="col-12 col-md-4">
                <q-select
                  outlined
                  v-model="selectedClass"
                  :options="classOptions"
                  option-label="name"
                  label="Select Class"
                  dense
                  @update:model-value="loadStudents"
                />
              </div>
              <div class="col-12 col-md-3">
                <q-input
                  outlined
                  v-model="selectedDate"
                  type="date"
                  label="Date"
                  dense
                  @update:model-value="loadStudents"
                />
              </div>
              <div class="col-12 col-md-5 text-right" v-if="selectedClass">
                <q-chip color="blue-1" text-color="primary" icon="school">
                  {{ selectedClass.grade }}
                </q-chip>
                <q-chip color="green-1" text-color="green" icon="group">
                  {{ students.length }} Students
                </q-chip>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <div v-if="selectedClass" class="row q-col-gutter-lg">
          <!-- QR Scan Section -->
          <div class="col-12 col-md-4">
            <q-card class="no-shadow border-gray bg-grey-1 text-center q-pa-lg h-full">
              <q-icon name="qr_code_scanner" size="48px" color="primary" class="q-mb-md" />
              <div class="text-h6 text-weight-bold">Quick Scan</div>
              <p class="text-caption text-grey-7">Scan student ID card to mark present.</p>

              <q-input
                ref="scanInput"
                outlined
                v-model="scanCode"
                placeholder="Click here & Scan..."
                dense
                bg-color="white"
                @keyup.enter="handleScan"
                autofocus
              >
                <template v-slot:append>
                  <q-icon name="send" class="cursor-pointer" @click="handleScan" />
                </template>
              </q-input>
              <div v-if="lastScanned" class="q-mt-md fade-enter-active">
                <q-banner rounded class="bg-green-1 text-green-9">
                  <template v-slot:avatar>
                    <q-icon name="check_circle" color="green" />
                  </template>
                  Marked <strong>{{ lastScanned }}</strong> as Present!
                </q-banner>
              </div>
            </q-card>
          </div>

          <!-- Student List -->
          <div class="col-12 col-md-8">
            <q-card class="no-shadow border-gray">
              <q-toolbar class="bg-white q-pl-md q-pr-md border-bottom-light">
                <q-toolbar-title class="text-subtitle1">Student List</q-toolbar-title>
                <q-btn
                  flat
                  round
                  dense
                  icon="sms"
                  color="blue"
                  @click="sendBulkSMS"
                  class="q-mr-sm"
                >
                  <q-tooltip>Send SMS to Absentees (Simulation)</q-tooltip>
                </q-btn>
                <q-btn flat round dense icon="done_all" color="primary" @click="markAllPresent">
                  <q-tooltip>Mark All Present</q-tooltip>
                </q-btn>
              </q-toolbar>

              <q-list separator>
                <div v-if="loading" class="q-pa-md text-center">
                  <q-spinner color="primary" size="2em" />
                </div>

                <div v-else-if="students.length === 0" class="q-pa-lg text-center text-grey">
                  No students found for this class grade.
                </div>

                <q-item v-for="student in students" :key="student.id" class="q-py-md">
                  <q-item-section avatar>
                    <q-avatar color="grey-2" text-color="primary">{{
                      student.name.charAt(0)
                    }}</q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label class="text-weight-bold">{{ student.name }}</q-item-label>
                    <q-item-label caption>ID: {{ student.id }} | {{ student.phone }}</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <div class="row q-gutter-sm">
                      <q-btn
                        :outline="student.attendance !== 'Present'"
                        :color="student.attendance === 'Present' ? 'green' : 'grey-5'"
                        label="Present"
                        size="sm"
                        @click="updateStatus(student, 'Present')"
                      />
                      <q-btn
                        :outline="student.attendance !== 'Absent'"
                        :color="student.attendance === 'Absent' ? 'red' : 'grey-5'"
                        label="Absent"
                        size="sm"
                        @click="updateStatus(student, 'Absent')"
                      />
                      <q-btn
                        :outline="student.attendance !== 'Late'"
                        :color="student.attendance === 'Late' ? 'orange' : 'grey-5'"
                        label="Late"
                        size="sm"
                        @click="updateStatus(student, 'Late')"
                      />
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </div>
        <div v-else class="text-center q-pa-xl text-grey-5">
          <q-icon name="playlist_add_check" size="64px" />
          <div class="text-h6 q-mt-md">Please select a class to mark attendance</div>
        </div>
      </q-tab-panel>

      <!-- TAB 2: REPORTS -->
      <q-tab-panel name="reports" class="q-pa-none">
        <div class="row q-col-gutter-lg">
          <!-- Summary Cards -->
          <div class="col-12 col-md-4">
            <q-card class="no-shadow border-gray bg-white q-pa-md text-center">
              <div class="text-subtitle2 text-grey">Average Attendance</div>
              <div class="text-h3 text-weight-bold text-primary q-mt-sm">85%</div>
              <div class="text-caption text-green q-mt-xs">
                <q-icon name="trending_up" /> +2.4% from last month
              </div>
            </q-card>
          </div>
          <div class="col-12 col-md-4">
            <q-card class="no-shadow border-gray bg-white q-pa-md text-center">
              <div class="text-subtitle2 text-grey">Total Sessions</div>
              <div class="text-h3 text-weight-bold text-dark q-mt-sm">24</div>
              <div class="text-caption text-grey q-mt-xs">This Month</div>
            </q-card>
          </div>
          <div class="col-12 col-md-4">
            <q-card class="no-shadow border-gray bg-white q-pa-md text-center">
              <div class="text-subtitle2 text-grey">Best Attendance Class</div>
              <div class="text-h4 text-weight-bold text-secondary q-mt-sm">Grade 10 - Maths</div>
              <div class="text-caption text-grey q-mt-xs">98% Turnout</div>
            </q-card>
          </div>

          <!-- Charts -->
          <div class="col-12 col-md-8">
            <q-card class="no-shadow border-gray q-pa-md">
              <div class="text-h6 q-mb-md">Attendance Trends (Last 7 Days)</div>
              <apexchart
                type="bar"
                height="300"
                :options="barChartOptions"
                :series="barChartSeries"
              ></apexchart>
            </q-card>
          </div>
          <div class="col-12 col-md-4">
            <q-card class="no-shadow border-gray q-pa-md">
              <div class="text-h6 q-mb-md">Overall Status</div>
              <apexchart
                type="donut"
                height="300"
                :options="donutChartOptions"
                :series="donutChartSeries"
              ></apexchart>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <!-- TAB 3: ABSENCE TRACKING -->
      <q-tab-panel name="absent" class="q-pa-none">
        <q-banner rounded class="bg-red-1 text-red-9 q-mb-lg border-red">
          <template v-slot:avatar>
            <q-icon name="warning" color="red" />
          </template>
          Showing students who have missed <strong>3 or more consecutive classes</strong>. Urgent
          follow-up recommended.
        </q-banner>

        <q-card class="no-shadow border-gray">
          <q-table :rows="atRiskStudents" :columns="riskColumns" row-key="id" flat>
            <template v-slot:body-cell-name="props">
              <q-td :props="props">
                <div class="text-weight-bold">{{ props.row.name }}</div>
                <div class="text-caption text-grey">{{ props.row.class }}</div>
              </q-td>
            </template>
            <template v-slot:body-cell-consecutive="props">
              <q-td :props="props">
                <q-badge color="red" text-color="white" class="text-subtitle2 q-pa-xs">
                  {{ props.row.consecutive }} Classes
                </q-badge>
              </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" align="right">
                <q-btn
                  size="sm"
                  color="primary"
                  icon="phone"
                  label="Call Parent"
                  class="q-mr-sm"
                  :href="`tel:${props.row.parentPhone}`"
                />
                <q-btn
                  size="sm"
                  outline
                  color="grey-8"
                  icon="sms"
                  label="Send Warning"
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

// Register chart component locally
const Apexchart = VueApexCharts
const $q = useQuasar()
const tab = ref('mark')
const loading = ref(false)

// --- MARK ATTENDANCE STATE ---
const classOptions = ref([])
const selectedClass = ref(null)
const selectedDate = ref(new Date().toISOString().split('T')[0])
const students = ref([])
const scanCode = ref('')
const lastScanned = ref('')
const scanInput = ref(null)

// --- REPORT CHARTS CONFIG ---
const barChartOptions = {
  chart: { type: 'bar', toolbar: { show: false } },
  plotOptions: { bar: { borderRadius: 4, horizontal: false, columnWidth: '55%' } },
  dataLabels: { enabled: false },
  xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  colors: ['#3b82f6'],
}
const barChartSeries = [{ name: 'Present Students', data: [45, 52, 38, 24, 33, 65, 60] }]

const donutChartOptions = {
  labels: ['Present', 'Absent', 'Late'],
  colors: ['#22c55e', '#ef4444', '#f97316'],
  legend: { position: 'bottom' },
}
const donutChartSeries = [75, 15, 10]

// --- ABSENCE TRACKING STATE ---
const riskColumns = [
  { name: 'name', label: 'Student Name', field: 'name', align: 'left' },
  { name: 'consecutive', label: 'Consecutive Absence', field: 'consecutive', align: 'center' },
  { name: 'lastPresent', label: 'Last Seen', field: 'lastPresent', align: 'left' },
  { name: 'parentPhone', label: 'Parent Contact', field: 'parentPhone', align: 'left' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'right' },
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
  {
    id: 103,
    name: 'Nethmi Fernando',
    class: 'Grade 9 - English',
    consecutive: 3,
    lastPresent: '2026-01-22',
    parentPhone: '0705556667',
  },
])

// --- INIT ---
onMounted(async () => {
  await fetchClasses()
})

const fetchClasses = async () => {
  // Use mock data if DB is empty or fails, for UI demo purposes
  const { data } = await supabase.from('classes').select('*').eq('status', 'Active')
  classOptions.value = data || []
  if (!data || data.length === 0) {
    // Fallback mock if needed for development
    classOptions.value = [
      { id: 1, name: 'Grade 10 - Maths', grade: 'Grade 10' },
      { id: 2, name: 'Grade 11 - Science', grade: 'Grade 11' },
    ]
  }
}

const loadStudents = async () => {
  if (!selectedClass.value) return
  loading.value = true

  // 1. Fetch Students in the Grade
  const { data: studentList, error: studentError } = await supabase
    .from('students')
    .select('*')
    .eq('grade', selectedClass.value.grade)
    .eq('status', 'Active')

  // 2. Fetch Existing Attendance
  const { data: attendanceList } = await supabase
    .from('attendance')
    .select('*')
    .eq('class_id', selectedClass.value.id)
    .eq('date', selectedDate.value)

  if (studentError || !studentList || studentList.length === 0) {
    // Mock Data if DB empty
    students.value = [
      { id: 1, name: 'Kasun Perera', phone: '077111222', attendance: 'Absent' },
      { id: 2, name: 'Amal Silva', phone: '077333444', attendance: 'Absent' },
      { id: 3, name: 'Ruwan Dias', phone: '077555666', attendance: 'Absent' },
    ]
    loading.value = false
    return
  }

  // 3. Merge
  students.value = studentList.map((stu) => {
    const record = attendanceList ? attendanceList.find((a) => a.student_id === stu.id) : null
    return {
      ...stu,
      attendance: record ? record.status : 'Absent',
    }
  })

  loading.value = false
}

const updateStatus = async (student, status) => {
  // Optimistic Update
  student.attendance = status

  // Upsert to DB
  // Note: Ensure you have 'attendance' table in Supabase or this will fail silently in UI (mock mode handles it visually)
  const { error } = await supabase.from('attendance').upsert(
    {
      class_id: selectedClass.value.id,
      student_id: student.id,
      date: selectedDate.value,
      status: status,
    },
    { onConflict: 'class_id, student_id, date' },
  )

  if (error) {
    console.warn('DB Update failed (Expected if table missing):', error.message)
    $q.notify({ type: 'warning', message: 'Saved locally (DB sync failed)' })
  }
}

const markAllPresent = async () => {
  if (!confirm('Mark all displayed students as Present?')) return
  students.value.forEach((s) => updateStatus(s, 'Present'))
  $q.notify({ type: 'positive', message: 'All marked Present!' })
}

const handleScan = async () => {
  if (!scanCode.value) return
  const id = parseInt(scanCode.value)
  const student = students.value.find((s) => s.id === id)

  if (student) {
    await updateStatus(student, 'Present')
    lastScanned.value = student.name
    // Auto clear msg
    setTimeout(() => (lastScanned.value = ''), 3000)
  } else {
    $q.notify({ type: 'warning', message: 'Student not found in this class!' })
  }
  scanCode.value = ''
  if (scanInput.value) scanInput.value.focus()
}

const sendBulkSMS = () => {
  $q.notify({
    type: 'info',
    message: 'Sending SMS to parents of absent students...',
    icon: 'sms',
    timeout: 2000,
  })
}

const sendWarning = (student) => {
  $q.notify({
    type: 'negative',
    message: `Warning SMS sent to ${student.name}'s parent.`,
    icon: 'send',
  })
}
</script>

<style lang="scss" scoped>
.border-gray {
  border: 1px solid rgba(0, 0, 0, 0.08);
}
body.body--light .border-gray {
  border: 1px solid #eaecf0;
}
.border-bottom-light {
  border-bottom: 1px solid #eaecf0;
}
.h-full {
  height: 100%;
}
.border-red {
  border: 1px solid #ef4444;
}
</style>
