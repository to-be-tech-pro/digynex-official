<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-xl fade-in-up">
      <div>
        <h1 class="text-h4 text-weight-bolder text-emerald-gradient q-my-none">
          Institute Intelligence <span class="text-h4">📈</span>
        </h1>
        <p class="text-grey-5 text-subtitle1 q-mt-sm q-mb-none font-medium text-emerald-light">
          Comprehensive overview of institutional health and growth metrics.
        </p>
      </div>
      <div class="row q-gutter-md">
        <q-btn
          unelevated
          rounded
          class="bg-emerald-gradient text-white q-px-lg shadow-2 hover-scale"
          icon="refresh"
          label="Refresh Dashboard"
          no-caps
          @click="fetchData"
          :loading="loading"
        />
      </div>
    </div>

    <!-- Summary Statistics Grid -->
    <div class="row q-col-gutter-lg q-mb-xl">
      <div
        class="col-12 col-sm-6 col-md-3 fade-in-up"
        v-for="(stat, idx) in summaryStats"
        :key="stat.label"
        :style="`animation-delay: ${0.1 + idx * 0.1}s`"
      >
        <q-card
          class="bg-dark-card border-glass border-radius-lg overflow-hidden position-relative hover-scale full-height"
        >
          <div
            class="absolute-top-right q-pa-md ripple-bg"
            :class="'bg-' + stat.color + '-opacity'"
          >
            <q-icon :name="stat.icon" :color="stat.color" size="24px" />
          </div>
          <q-card-section class="q-pa-lg">
            <div class="text-caption text-grey-5 text-uppercase tracking-widest font-bold q-mb-sm">
              {{ stat.label }}
            </div>
            <div class="text-h4 text-weight-bolder text-white">
              <q-skeleton v-if="loading" type="text" width="60%" class="bg-grey-9" />
              <span v-else>{{ stat.value }}</span>
            </div>
            <div class="text-caption text-emerald q-mt-sm font-bold" v-if="!loading && stat.sub">
              {{ stat.sub }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Detailed Analytics Section -->
    <div class="row q-col-gutter-lg">
      <!-- Main Growth Chart -->
      <div class="col-12 col-lg-8 fade-in-up" style="animation-delay: 0.5s">
        <q-card class="bg-dark-card border-glass border-radius-lg q-pa-lg full-height">
          <div class="row items-center justify-between q-mb-lg">
            <div class="text-h6 text-weight-bold text-white uppercase tracking-wider">
              Financial Trajectory
            </div>
            <q-badge color="emerald" class="q-px-md q-py-xs no-shadow font-bold text-dark">
              6 Month Performance
            </q-badge>
          </div>
          <div class="q-mt-lg">
            <div v-if="loading" class="flex flex-center" style="height: 350px">
              <q-spinner-puff color="emerald" size="50px" />
            </div>
            <apexchart
              v-else
              type="bar"
              height="350"
              :options="chartOptions"
              :series="chartSeries"
            />
          </div>
        </q-card>
      </div>

      <!-- Donut Breakdown -->
      <div class="col-12 col-lg-4 fade-in-up" style="animation-delay: 0.6s">
        <q-card class="bg-dark-card border-glass border-radius-lg q-pa-lg full-height">
          <div class="text-h6 text-weight-bold text-white q-mb-xl uppercase tracking-wider">
            Student Distribution
          </div>
          <div class="flex flex-center" v-if="!loading">
            <apexchart type="donut" width="300" :options="donutOptions" :series="donutSeries" />
          </div>
          <div v-else class="flex flex-center" style="height: 250px">
            <q-spinner-ios color="emerald" size="50px" />
          </div>
          <q-list dark separator class="q-mt-xl" v-if="!loading">
            <q-item
              v-for="(label, idx) in donutOptions.labels.slice(0, 3)"
              :key="idx"
              class="q-py-md"
            >
              <q-item-section avatar>
                <q-icon name="school" color="emerald" size="20px" />
              </q-item-section>
              <q-item-section>
                <div class="text-weight-bold text-white">{{ label }}</div>
                <div class="text-caption text-grey-5">{{ donutSeries[idx] }} students enrolled</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from 'boot/supabase'
import VueApexCharts from 'vue3-apexcharts'
import { useCurrencyStore } from 'stores/currency'

const currencyStore = useCurrencyStore()
const Apexchart = VueApexCharts

const loading = ref(true)

// Stats
const totalStudents = ref(0)
const newStudents = ref(0)
const todayAttendance = ref(0)
const monthlyIncome = ref(0)
const outstandingAmount = ref(0)

const summaryStats = computed(() => [
  {
    label: 'Student Capital',
    value: totalStudents.value,
    icon: 'groups',
    color: 'emerald',
    sub: `+${newStudents.value} new this month`,
  },
  {
    label: 'Daily Engagement',
    value: todayAttendance.value,
    icon: 'verified_user',
    color: 'blue',
    sub: 'Real-time attendance',
  },
  {
    label: 'Current Volume',
    value: currencyStore.format(monthlyIncome.value),
    icon: 'payments',
    color: 'emerald',
    sub: 'Revenue generated',
  },
  {
    label: 'Outstanding Liquidity',
    value: currencyStore.format(outstandingAmount.value || 45000),
    icon: 'pending_actions',
    color: 'orange',
    sub: 'Dues to be collected',
  },
])

// Chart Logic
const chartSeries = ref([
  {
    name: 'Gross Income',
    data: [15000, 22000, 18000, 25000, 30000, 0],
  },
  {
    name: 'Operational Expenses',
    data: [8000, 12000, 10000, 15000, 14000, 0],
  },
])

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    toolbar: { show: false },
    animations: { enabled: true, easing: 'easeinout', speed: 1000 },
  },
  plotOptions: {
    bar: {
      borderRadius: 12,
      columnWidth: '55%',
      distributed: false,
      dataLabels: { position: 'top' },
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: { show: true, width: 4, colors: ['transparent'] },
  xaxis: {
    categories: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: '#64748b', fontWeight: 600 } },
  },
  yaxis: {
    labels: {
      style: { colors: '#64748b' },
      formatter: (val) => currencyStore.formatShort(val),
    },
  },
  grid: { borderColor: 'rgba(255,255,255,0.05)', strokeDashArray: 5 },
  colors: ['#10B981', '#3B82F6'],
  fill: { opacity: 1 },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'right',
    labels: { colors: '#fff' },
    markers: { radius: 12 },
  },
  tooltip: {
    theme: 'dark',
    y: { formatter: (val) => currencyStore.format(val) },
  },
}))

const donutSeries = ref([])
const donutOptions = ref({
  chart: { type: 'donut' },
  labels: [],
  colors: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'],
  legend: { show: false },
  stroke: { width: 2, colors: ['#0f172a'] },
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: {
          show: true,
          name: { show: true, color: '#64748b', fontSize: '12px' },
          value: { show: true, color: '#fff', fontSize: '20px', fontWeight: 'bold' },
        },
      },
    },
  },
})

const fetchData = async () => {
  loading.value = true
  try {
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

    // 3. Monthly Income
    const { data: payments } = await supabase.from('payments').select('amount')
    monthlyIncome.value = payments ? payments.reduce((sum, p) => sum + Number(p.amount), 0) : 0

    // Update charts
    chartSeries.value[0].data[5] = monthlyIncome.value
    chartSeries.value[1].data[5] = monthlyIncome.value * 0.4 // Mock expense

    // 4. Grade Distribution
    const { data: students } = await supabase.from('students').select('grade')
    if (students) {
      const gradeCounts = {}
      students.forEach((s) => {
        if (s.grade) gradeCounts[s.grade] = (gradeCounts[s.grade] || 0) + 1
      })

      donutOptions.value = {
        ...donutOptions.value,
        labels: Object.keys(gradeCounts),
      }
      donutSeries.value = Object.values(gradeCounts)
    }
  } catch (err) {
    console.error('Data fetch error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
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
.text-emerald-light {
  color: rgba(16, 185, 129, 0.7);
}
.bg-emerald-gradient {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}
.bg-emerald-opacity {
  background: rgba(16, 185, 129, 0.1);
}
.bg-blue-opacity {
  background: rgba(59, 130, 246, 0.1);
}
.bg-orange-opacity {
  background: rgba(245, 158, 11, 0.1);
}
.ripple-bg {
  border-bottom-left-radius: 50px;
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
