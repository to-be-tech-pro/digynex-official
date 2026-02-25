<template>
  <q-page class="q-pa-lg">
    <!-- Header -->
    <div class="row items-center justify-between q-mb-xl">
      <div>
        <h1 class="text-h4 text-weight-bolder q-my-none row items-center">
          <span class="text-emerald-gradient">Financial Intelligence</span>
          <q-icon name="payments" size="md" class="q-ml-md text-emerald" />
        </h1>
        <p class="text-grey-5 text-subtitle1 q-mt-sm q-mb-none font-medium text-emerald-light">
          Real-time analytics and revenue performance monitoring.
        </p>
      </div>
      <div class="row q-gutter-md">
        <q-btn
          outline
          rounded
          color="emerald"
          icon="calendar_month"
          :label="dateRange"
          no-caps
          class="q-px-lg shadow-1 hover-scale bg-dark-card border-glass"
        >
          <q-menu dark class="border-glass bg-dark-card">
            <q-list style="min-width: 150px">
              <q-item
                clickable
                v-for="opt in ['Last 7 Days', 'Last 30 Days', 'This Year']"
                :key="opt"
                v-close-popup
                @click="dateRange = opt"
              >
                <q-item-section>{{ opt }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn
          unelevated
          rounded
          class="bg-emerald-gradient text-white q-px-lg shadow-2 hover-scale"
          icon="download"
          label="Financial Report"
          no-caps
          @click="downloadReport"
        />
      </div>
    </div>

    <!-- Revenue Summary Grid -->
    <div class="row q-col-gutter-lg q-mb-xl">
      <div
        class="col-12 col-md-4 fade-in-up"
        v-for="(stat, index) in revenueStats"
        :key="stat.label"
        :style="`animation-delay: ${0.1 + index * 0.1}s`"
      >
        <q-card
          class="bg-dark-card border-glass border-radius-lg overflow-hidden position-relative hover-scale"
        >
          <div
            class="absolute-top-right q-pa-md ripple-bg row items-center justify-center"
            :class="'bg-' + stat.color + '-opacity'"
            style="width: 50px; height: 50px; border-bottom-left-radius: 20px"
          >
            <q-icon :name="stat.icon" :color="stat.color" size="20px" />
          </div>
          <q-card-section class="q-pa-xl">
            <div class="text-caption text-grey-5 text-uppercase tracking-widest font-bold q-mb-sm">
              {{ stat.label }}
            </div>
            <div class="text-h3 text-weight-bolder text-white">
              <span v-if="loading"><q-skeleton type="text" width="60%" class="bg-grey-9" /></span>
              <span v-else>{{ stat.value }}</span>
            </div>
            <div class="row items-center q-mt-md" v-if="!loading">
              <q-icon
                :name="stat.trend > 0 ? 'trending_up' : 'trending_down'"
                :color="stat.trend > 0 ? 'emerald' : 'red'"
              />
              <span
                class="q-ml-xs text-weight-bold"
                :class="stat.trend > 0 ? 'text-emerald' : 'text-red'"
              >
                {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
              </span>
              <span class="text-grey-6 q-ml-sm">vs last period</span>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Analytics Section -->
    <div class="row q-col-gutter-lg q-mb-xl">
      <!-- Main Chart -->
      <div class="col-12 col-lg-8 fade-in-up" style="animation-delay: 0.4s">
        <q-card class="bg-dark-card border-glass border-radius-lg q-pa-lg full-height">
          <div class="row items-center justify-between q-mb-lg">
            <div class="text-h6 text-weight-bold text-white uppercase tracking-wider">
              Revenue Momentum
            </div>
            <q-btn-toggle
              v-model="chartPeriod"
              flat
              toggle-color="emerald"
              color="grey-7"
              :options="[
                { label: 'Weekly', value: 'weekly' },
                { label: 'Monthly', value: 'monthly' },
                { label: 'Yearly', value: 'yearly' },
              ]"
              no-caps
              class="bg-black-opacity rounded-borders-md"
            />
          </div>
          <div class="q-mt-md">
            <div v-if="loading" class="flex flex-center" style="height: 350px">
              <q-spinner-dots color="emerald" size="40px" />
            </div>
            <apexchart
              v-else
              type="area"
              height="350"
              :options="chartOptions"
              :series="chartSeries"
            />
          </div>
        </q-card>
      </div>

      <!-- Donut Chart & Breakdown -->
      <div class="col-12 col-lg-4 fade-in-up" style="animation-delay: 0.5s">
        <q-card class="bg-dark-card border-glass border-radius-lg q-pa-lg full-height">
          <div class="text-h6 text-weight-bold text-white q-mb-lg uppercase tracking-wider">
            Source Attribution
          </div>
          <div class="flex flex-center" v-if="!loading">
            <apexchart type="donut" width="300" :options="donutOptions" :series="donutSeries" />
          </div>
          <div v-else class="flex flex-center" style="height: 200px">
            <q-spinner-pie color="emerald" size="40px" />
          </div>
          <q-list dark separator class="q-mt-xl">
            <q-item v-for="(val, idx) in donutSeries" :key="idx" class="q-py-md">
              <q-item-section avatar>
                <q-icon name="circle" :color="sourceColors[idx]" size="12px" />
              </q-item-section>
              <q-item-section>
                <div class="text-weight-bold text-white">{{ donutOptions.labels[idx] }}</div>
                <div class="text-caption text-grey-5">{{ val }}% of total volume</div>
              </q-item-section>
              <q-item-section side>
                <div class="text-white text-weight-bold">
                  {{ currencyStore.format((val * (totalAmount || 125000)) / 100) }}
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>

    <!-- Recent Transactions -->
    <q-card
      class="bg-dark-card border-glass border-radius-lg overflow-hidden fade-in-up"
      style="animation-delay: 0.6s"
    >
      <div class="q-pa-lg border-bottom-light row justify-between items-center">
        <div class="text-h6 text-weight-bold text-white uppercase tracking-wider">
          Stream Activity
        </div>
        <q-btn flat color="emerald" label="View Full Ledger" no-caps icon-right="chevron_right" />
      </div>
      <q-table
        :rows="transactions"
        :columns="txColumns"
        row-key="id"
        flat
        dark
        class="bg-transparent"
        hide-pagination
        :loading="loading"
      >
        <template v-slot:body-cell-client="props">
          <q-td :props="props">
            <div class="text-weight-bold text-white">{{ props.row.client }}</div>
            <div class="text-caption text-grey-6">{{ props.row.date }}</div>
          </q-td>
        </template>
        <template v-slot:body-cell-amount="props">
          <q-td
            :props="props"
            class="text-right text-weight-bolder"
            :class="props.row.amount > 0 ? 'text-emerald' : 'text-red'"
          >
            {{ props.row.amount > 0 ? '+' : '' }}{{ currencyStore.format(props.row.amount) }}
          </q-td>
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props" align="center">
            <q-badge
              rounded
              :color="props.row.status === 'Completed' ? 'emerald' : 'orange'"
              class="q-px-md q-py-xs font-bold text-dark no-shadow"
            >
              {{ props.row.status }}
            </q-badge>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCurrencyStore } from 'stores/currency'
import { supabase } from 'boot/supabase'
import VueApexCharts from 'vue3-apexcharts'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const Apexchart = VueApexCharts
const currencyStore = useCurrencyStore()

// State
const loading = ref(true)
const dateRange = ref('Last 30 Days')
const chartPeriod = ref('monthly')
const totalAmount = ref(0)
const transactions = ref([])

// Stats Definition
const revenueStats = computed(() => [
  {
    label: 'Total Revenue',
    value: currencyStore.format(totalAmount.value || 842500),
    icon: 'payments',
    color: 'emerald',
    trend: 14.5,
  },
  {
    label: 'Forecasted Income',
    value: currencyStore.format((totalAmount.value || 842500) * 1.4),
    icon: 'query_stats',
    color: 'blue',
    trend: 8.2,
  },
  {
    label: 'Unpaid Invoices',
    value: currencyStore.format(58000),
    icon: 'pending_actions',
    color: 'orange',
    trend: -2.4,
  },
])

// Data Fetching
const downloadReport = () => {
  $q.notify({
    type: 'positive',
    message: 'Compiling financial ledger... Transmission starting.',
    icon: 'downloading',
    timeout: 2000,
  })
  // Mock download trigger
  setTimeout(() => {
    $q.notify({ type: 'positive', message: 'Nexus Financial Report (PDF) exported successfully.' })
  }, 2500)
}

const fetchRealData = async () => {
  try {
    loading.value = true
    const { data: payments, error } = await supabase
      .from('payments')
      .select('*')
      .order('payment_date', { ascending: false })
      .limit(10)

    if (error) throw error

    if (payments && payments.length > 0) {
      totalAmount.value = payments.reduce((acc, curr) => acc + Number(curr.amount), 0)
      transactions.value = payments.map((p) => ({
        id: p.id,
        client: p.receipt_number || 'Internal Transfer',
        type: p.payment_method || 'Payment',
        date: new Date(p.payment_date).toLocaleDateString(),
        amount: Number(p.amount),
        status: 'Completed',
      }))
    } else {
      // Fallback to mocks
      transactions.value = [
        {
          id: 1,
          client: 'Starlight Corp',
          type: 'SaaS License',
          date: '2026-02-23',
          amount: 12500,
          status: 'Completed',
        },
        {
          id: 2,
          client: 'Nordic Logistics',
          type: 'Integration Fee',
          date: '2026-02-22',
          amount: 45000,
          status: 'Completed',
        },
        {
          id: 3,
          client: 'Bjorn Gustaf',
          type: 'Advisory',
          date: '2026-02-21',
          amount: 890,
          status: 'Pending',
        },
        {
          id: 4,
          client: 'Svea Finance',
          type: 'Consulting',
          date: '2026-02-20',
          amount: 25800,
          status: 'Completed',
        },
        {
          id: 5,
          client: 'Peak Performance',
          type: 'Platform Fee',
          date: '2026-02-18',
          amount: 5400,
          status: 'Completed',
        },
      ]
    }
  } catch (err) {
    console.error('Data fetch error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchRealData()
})

// Chart Configuration
const chartSeries = [
  {
    name: 'Actual Revenue',
    data: [42000, 58000, 45000, 82000, 75000, 105000, 94000],
  },
  {
    name: 'Target Revenue',
    data: [40000, 50000, 60000, 70000, 80000, 90000, 100000],
  },
]

const chartOptions = {
  chart: {
    type: 'area',
    toolbar: { show: false },
    zoom: { enabled: false },
    sparkline: { enabled: false },
    animations: { enabled: true, easing: 'easeinout', speed: 800 },
  },
  colors: ['#10b981', 'rgba(16, 185, 129, 0.2)'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: [3, 2], dashArray: [0, 5] },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [20, 100, 100],
    },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: '#64748b', fontSize: '12px' } },
  },
  yaxis: {
    labels: {
      style: { colors: '#64748b', fontSize: '12px' },
      formatter: (val) => currencyStore.formatShort(val),
    },
  },
  grid: {
    borderColor: 'rgba(255,255,255,0.03)',
    strokeDashArray: 4,
    padding: { left: 20, right: 20 },
  },
  tooltip: {
    theme: 'dark',
    x: { show: true },
    y: {
      formatter: (val) => currencyStore.format(val),
    },
  },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'right',
    labels: { colors: '#fff' },
    markers: { radius: 12 },
  },
}

const donutSeries = [45, 25, 18, 12]
const donutOptions = {
  labels: ['Direct Sales', 'Enterprise', 'Partner', 'Other'],
  colors: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'],
  plotOptions: {
    pie: {
      donut: {
        size: '80%',
        background: 'transparent',
        labels: {
          show: true,
          name: { show: true, fontSize: '12px', color: '#64748b', offsetY: -10 },
          value: {
            show: true,
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#fff',
            offsetY: 10,
            formatter: (val) => val + '%',
          },
          total: {
            show: true,
            label: 'Dominant',
            fontSize: '12px',
            color: '#64748b',
            formatter: () => 'Direct',
          },
        },
      },
    },
  },
  dataLabels: { enabled: false },
  legend: { show: false },
  stroke: { show: true, width: 2, colors: ['#0f172a'] },
  tooltip: { theme: 'dark' },
}
const sourceColors = ['emerald', 'blue-5', 'orange-8', 'indigo-5']

const txColumns = [
  { name: 'client', label: 'Client / Reference', align: 'left', field: 'client' },
  { name: 'type', label: 'Type', align: 'left', field: 'type' },
  { name: 'status', label: 'Status', align: 'center', field: 'status' },
  { name: 'amount', label: 'Amount', align: 'right', field: 'amount' },
]
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
.bg-black-opacity {
  background: rgba(0, 0, 0, 0.2);
}
.ripple-bg {
  border-bottom-left-radius: 50px;
}
.hover-scale:hover {
  transform: scale(1.02);
  transition: transform 0.3s ease;
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
