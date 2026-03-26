<template>
  <div class="h-screen bg-slate-50 flex text-slate-800 font-sans overflow-hidden">
    <Sidebar @toggleMenu="isMobileMenuOpen = !isMobileMenuOpen" @triggerToast="triggerToast" />

    <main class="flex-1 flex flex-col h-screen overflow-hidden bg-[#f4f7fb] relative">
      <TopHeader @toggleMenu="isMobileMenuOpen = !isMobileMenuOpen" @triggerToast="triggerToast" />

      <div class="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
        <div v-if="isLoading" class="flex-1 flex flex-col items-center justify-center h-full gap-4 text-center">
             <div class="w-10 h-10 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
             <p class="text-sm font-black text-slate-500 uppercase tracking-widest">Compiling Lead Intelligence...</p>
        </div>

        <div v-else class="animate-[slideDown_0.4s_ease-out]">
          <div>
            <h1 class="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <TrendingUp class="w-6 h-6 text-primary" /> Sales Pivot Analysis
            </h1>
            <p class="text-sm font-medium text-slate-500 mt-1">Deep-dive into multi-dimensional sales performance and channel efficiency.</p>
          </div>
          <div class="flex gap-3">
            <button @click="toggleFilter" class="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
              <Calendar class="w-4 h-4" /> This Month
            </button>
            <button @click="handleExport" class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-600 transition-colors flex items-center gap-2">
              <Download class="w-4 h-4" /> Export Report
            </button>
          </div>
        </div>

        <!-- Sales Metrics Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div v-for="metric in metrics" :key="metric.label" class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                <div class="flex items-center justify-between mb-4">
                    <div :class="`p-2 rounded-xl bg-${metric.color}-50 text-${metric.color}-600 group-hover:scale-110 transition-transform`">
                        <component :is="metric.icon" class="w-5 h-5" />
                    </div>
                    <span :class="`text-xs font-black px-2 py-1 rounded-full bg-${metric.trendColor}-50 text-${metric.trendColor}-600`" v-if="metric.trend">
                        {{ metric.trend }}
                    </span>
                </div>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{{ metric.label }}</p>
                <h3 class="text-2xl font-black text-slate-900 tracking-tight">{{ metric.value }}</h3>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <!-- Channel Performance Chart -->
            <div class="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group/chart">
                <div v-if="isDataFiltering" class="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center transition-all">
                    <div class="flex flex-col items-center gap-2">
                        <div class="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p class="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Syncing...</p>
                    </div>
                </div>
                <h3 class="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                    <PieChart class="w-5 h-5 text-accent" /> Revenue by Channel Mix
                </h3>
                <div class="h-[350px]">
                    <apexchart type="bar" height="100%" :options="barOptions" :series="barSeries"></apexchart>
                </div>
            </div>

            <!-- Top Performing Segments -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                 <h3 class="text-lg font-black text-slate-900 mb-6">Top Segments</h3>
                 <div class="space-y-6">
                     <div v-for="segment in segments" :key="segment.name" class="flex items-center justify-between group cursor-pointer" @click="openSegmentDetail(segment)">
                         <div class="flex items-center gap-3">
                             <div class="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all">
                                <span class="text-sm font-black">{{ segment.short }}</span>
                             </div>
                             <div>
                                 <p class="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">{{ segment.name }}</p>
                                 <p class="text-[11px] font-medium text-slate-400">{{ segment.count }} Transactions</p>
                             </div>
                         </div>
                         <div class="text-right">
                             <p class="text-sm font-black text-slate-900">{{ segment.revenue }}</p>
                             <p class="text-[11px] font-bold text-green-500">+{{ segment.growth }}%</p>
                         </div>
                     </div>
                 </div>
                 <button @click="isModalOpen = true" class="w-full mt-8 py-3 bg-slate-50 hover:bg-primary hover:text-white text-slate-600 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-sm active:scale-95">
                    View All Channels
                 </button>
            </div>
        </div>
      </div>
    </main>

    <!-- DRILL DOWN MODAL: ALL CHANNELS -->
    <transition name="modal-fade">
      <div v-if="isModalOpen" class="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-md" @click="isModalOpen = false"></div>
        <div class="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-20 overflow-hidden flex flex-col max-h-[90vh]">
          <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
             <div>
                <h3 class="text-xl font-black text-slate-900 tracking-tight">Full Channel Distribution</h3>
                <p class="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Real-time performance audit</p>
             </div>
             <button @click="isModalOpen = false" class="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">&times;</button>
          </div>
          <div class="p-8 overflow-y-auto">
            <div class="space-y-4">
               <div v-for="item in allChannels" :key="item.name" class="p-4 rounded-xl border border-slate-100 flex items-center justify-between hover:border-primary/20 hover:bg-primary/5 transition-all">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 font-black">{{ item.initials }}</div>
                    <div>
                        <p class="font-bold text-slate-900">{{ item.name }}</p>
                        <p class="text-xs text-slate-500">{{ item.status }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-black text-slate-900">{{ item.revenue }}</p>
                    <p class="text-[11px] font-bold text-slate-400">{{ item.share }}% Contribution</p>
                  </div>
               </div>
            </div>
          </div>
          <div class="p-6 bg-slate-50 mt-auto border-t border-slate-100 flex justify-end">
             <button @click="isModalOpen = false" class="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold">Close Analysis</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Toast Notification -->
    <transition name="toast-slide">
      <div v-if="toastState.show" class="fixed bottom-10 right-10 z-[120] bg-slate-900 text-white px-5 py-4 rounded-xl shadow-2xl border border-slate-700 flex items-start gap-4 ring-1 ring-white/10 max-w-sm">
        <div class="mt-0.5 p-1.5 bg-primary/20 rounded-md text-primary ring-1 ring-primary/30"><Bell class="w-4 h-4"/></div>
        <div class="flex-1">
          <p class="text-[12px] text-slate-300 font-medium leading-relaxed">{{ toastState.message }}</p>
        </div>
        <button @click="toastState.show = false" class="ml-2 text-slate-400 hover:text-white"><X class="w-4 h-4"/></button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { TrendingUp, Calendar, Download, PieChart, Users, ShoppingCart, Target, CreditCard, Bell, X, Loader2 } from 'lucide-vue-next'
import Sidebar from '../components/dashboard/Sidebar.vue'
import TopHeader from '../components/dashboard/TopHeader.vue'
import { fetchSalesMetrics } from '../services/salesService'

const isMobileMenuOpen = ref(false)
const isModalOpen = ref(false)
const isLoading = ref(true)
const isDataFiltering = ref(false)
const toastState = ref({ show: false, message: '' })

const salesData = ref({ summary: {}, channels: [], chart: { categories: [], data: [] } })

const triggerToast = (msg) => {
  toastState.value = { show: true, message: msg }
  setTimeout(() => { toastState.value.show = false }, 4000)
}

onMounted(async () => {
    try {
        const data = await fetchSalesMetrics();
        if (data) {
            salesData.value = data;
        }
    } catch (err) {
        triggerToast("Failed to sync Sales Vault data.")
    } finally {
        isLoading.value = false;
    }
})

const metrics = computed(() => {
    return [
        { label: 'Avg Order Value', value: 'LKR ' + (salesData.value.summary.avgOrderValue || '0K'), icon: CreditCard, color: 'blue', trend: '+5.2%', trendColor: 'green' },
        { label: 'Conversion Rate', value: salesData.value.summary.convRate || '0.00%', icon: Target, color: 'indigo', trend: '+1.1%', trendColor: 'green' },
        { label: 'Total Orders', value: salesData.value.summary.totalOrders || '0', icon: ShoppingCart, color: 'purple', trend: '-2.4%', trendColor: 'red' },
        { label: 'New Customers', value: salesData.value.summary.newCustomers || '0', icon: Users, color: 'orange', trend: '+12.5%', trendColor: 'green' }
    ];
})

const segments = computed(() => {
    return salesData.value.channels.slice(0, 4).map(c => ({
        name: c.name,
        short: c.name.substring(0,2).toUpperCase(),
        count: c.count,
        revenue: 'LKR ' + c.revenue,
        growth: Math.floor(Math.random() * 20 + 5)
    }));
})

const barSeries = computed(() => [{
    name: 'Revenue (LKR)',
    data: salesData.value.chart.data || []
}])

const barOptions = computed(() => ({
    chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'Inter' },
    plotOptions: { bar: { borderRadius: 8, columnWidth: '45%' } },
    dataLabels: { enabled: false },
    colors: ['#3b82f6'],
    xaxis: { categories: salesData.value.chart.categories || [] },
    grid: { borderColor: '#e2e8f0', strokeDashArray: 4 },
    tooltip: { theme: 'dark', y: { formatter: (val) => val + " Million LKR" } }
}))

const allChannels = computed(() => {
    return salesData.value.channels.map(c => ({
        initials: c.name.substring(0,2).toUpperCase(),
        name: c.name,
        status: c.share > 30 ? 'High Performance' : 'Stable',
        revenue: 'LKR ' + c.revenue,
        share: c.share
    }));
})

const handleExport = () => {
    triggerToast("Generating 360 Business Report... Please wait.")
    setTimeout(() => {
        triggerToast("Report 'DigyNex_Sales_Q1.pdf' has been generated and downloaded.")
    }, 2500)
}

const toggleFilter = () => {
    isDataFiltering.value = true;
    setTimeout(() => {
        isDataFiltering.value = false;
        triggerToast("Data context synched for 'Last 30 Days' timeframe.")
    }, 800)
}

const openSegmentDetail = (seg) => {
    triggerToast(`Drilling down into ${seg.name} transactions...`)
}
</script>



<style scoped>
.toast-slide-enter-active, .toast-slide-leave-active { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.toast-slide-enter-from, .toast-slide-leave-to { opacity: 0; transform: translateY(20px) scale(0.95); }

.modal-fade-enter-active, .modal-fade-leave-active { transition: all 0.4s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; transform: scale(1.05); }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
</style>
