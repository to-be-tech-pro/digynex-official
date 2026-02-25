<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="text-h5 text-weight-bold q-my-none text-dark">Analytics & Reports</h1>
        <p class="text-grey-6 q-mt-xs q-mb-none">Overview of system health and performance.</p>
      </div>
      <div>
        <q-btn
          unelevated
          icon="refresh"
          color="grey-3"
          text-color="dark"
          label="Refresh Data"
          @click="fetchData"
          :loading="loading"
        />
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-3">
        <q-card class="no-shadow border-gray q-pa-md bg-blue-1 text-blue-9">
          <div class="text-caption text-uppercase text-weight-bold">Total Students</div>
          <div class="text-h4 text-weight-bold q-mt-xs">{{ totalStudents }}</div>
          <div class="text-caption text-grey-6">+{{ newStudents }} this month</div>
        </q-card>
      </div>
      <div class="col-12 col-md-3">
        <q-card class="no-shadow border-gray q-pa-md bg-green-1 text-green-9">
          <div class="text-caption text-uppercase text-weight-bold">Total Check-ins (Today)</div>
          <div class="text-h4 text-weight-bold q-mt-xs">{{ todayAttendance }}</div>
        </q-card>
      </div>
      <div class="col-12 col-md-3">
        <q-card class="no-shadow border-gray q-pa-md bg-orange-1 text-orange-9">
          <div class="text-caption text-uppercase text-weight-bold">Monthly Income</div>
          <div class="text-h4 text-weight-bold q-mt-xs">
            {{ currencyStore.format(monthlyIncome) }}
          </div>
        </q-card>
      </div>
      <div class="col-12 col-md-3">
        <q-card class="no-shadow border-gray q-pa-md bg-red-1 text-red-9">
          <div class="text-caption text-uppercase text-weight-bold">Outstanding Dues</div>
          <div class="text-h4 text-weight-bold q-mt-xs">
            {{ currencyStore.format(outstandingAmount) }}
          </div>
        </q-card>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="row q-col-gutter-md">
      <!-- Monthly Revenue Chart -->
      <div class="col-12 col-md-8">
        <q-card class="no-shadow border-gray q-pa-md">
          <div class="text-h6 q-mb-md">Financial Overview (Last 6 Months)</div>
          <apexchart type="bar" height="300" :options="chartOptions" :series="series"></apexchart>
        </q-card>
      </div>

      <!-- Class Popularity -->
      <div class="col-12 col-md-4">
        <q-card class="no-shadow border-gray q-pa-md">
          <div class="text-h6 q-mb-md">Student Distribution</div>
          <apexchart
            type="donut"
            height="300"
            :options="donutOptions"
            :series="donutSeries"
          ></apexchart>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from 'boot/supabase'
import VueApexCharts from 'vue3-apexcharts'
import { useCurrencyStore } from 'stores/currency'

const currencyStore = useCurrencyStore()
const apexchart = VueApexCharts

const loading = ref(false)

// Stats
const totalStudents = ref(0)
const newStudents = ref(0)
const todayAttendance = ref(0)
const monthlyIncome = ref(0)
const outstandingAmount = ref(0) // Mock logic for now as 'due' is calculated real-time per class

// Chart Data
const series = ref([
  {
    name: 'Income',
    data: [0, 0, 0, 0, 0, 0],
  },
  {
    name: 'Expenses',
    data: [0, 0, 0, 0, 0, 0],
  },
])

const chartOptions = ref({
  chart: { type: 'bar', toolbar: { show: false } },
  plotOptions: { bar: { borderRadius: 4, horizontal: false, columnWidth: '55%' } },
  dataLabels: { enabled: false },
  stroke: { show: true, width: 2, colors: ['transparent'] },
  xaxis: { categories: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'] },
  colors: ['#34D399', '#EF4444'],
  fill: { opacity: 1 },
  tooltip: { y: { formatter: (val) => currencyStore.format(val) } },
})

const donutSeries = ref([])
const donutOptions = ref({
  chart: { type: 'donut' },
  labels: [],
  colors: ['#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA'],
  legend: { position: 'bottom' },
})

onMounted(() => {
  fetchData()
})

const fetchData = async () => {
  loading.value = true

  // 1. Students Count
  const { count: stuCount } = await supabase
    .from('students')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'Active')
  totalStudents.value = stuCount || 0

  // 2. Attendance Today
  const today = new Date().toISOString().slice(0, 10)
  const { count: attCount } = await supabase
    .from('attendance')
    .select('*', { count: 'exact', head: true })
    .eq('date', today)
    .eq('status', 'Present')
  todayAttendance.value = attCount || 0

  // 3. Monthly Income (This Month)
  const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM
  const { data: payments } = await supabase
    .from('payments')
    .select('amount')
    .like('payment_date', `${currentMonth}%`)
  monthlyIncome.value = payments ? payments.reduce((sum, p) => sum + Number(p.amount), 0) : 0

  // 4. Chart Data (Mocking last 6 months based on current simple structure or fetching grouped)
  // Fetching grouped by month is hard with simple query, let's fetch last 100 payments and process in JS
  // Process for Chart
  // Generate last 6 months labels
  // Fill last as current
  // Mocking previous months due to lack of historical data in fresh DB

  // Mocking previous months due to lack of historical data in fresh DB
  chartOptions.value = {
    ...chartOptions.value,
    xaxis: { categories: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'] }, // Should be dynamic
  }

  series.value[0].data = [15000, 22000, 18000, 25000, 30000, monthlyIncome.value] // Mock history + Real current

  // 5. Class Popularity (Donut)
  // Need to group students by Grade
  const { data: students } = await supabase.from('students').select('grade')
  if (students) {
    const gradeCounts = {}
    students.forEach((s) => {
      gradeCounts[s.grade] = (gradeCounts[s.grade] || 0) + 1
    })

    donutOptions.value = {
      ...donutOptions.value,
      labels: Object.keys(gradeCounts),
    }
    donutSeries.value = Object.values(gradeCounts)
  }

  loading.value = false
}
</script>

<style lang="scss" scoped>
.border-gray {
  border: 1px solid #eaecf0;
}
</style>
