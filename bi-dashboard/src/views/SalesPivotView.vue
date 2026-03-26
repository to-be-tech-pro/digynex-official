<template>
  <div class="h-screen bg-slate-50 flex text-slate-800 font-sans overflow-hidden">
    <Sidebar @toggleMenu="isMobileMenuOpen = !isMobileMenuOpen" @triggerToast="triggerToast" />

    <main class="flex-1 flex flex-col h-screen overflow-hidden bg-[#f4f7fb] relative">
      <TopHeader @toggleMenu="isMobileMenuOpen = !isMobileMenuOpen" @triggerToast="triggerToast" />

      <div class="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
        <div class="mb-8 flex items-center justify-between">
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
import { ref } from 'vue'
import { TrendingUp, Calendar, Download, PieChart, Users, ShoppingCart, Target, CreditCard, Bell, X } from 'lucide-vue-next'
import Sidebar from '../components/dashboard/Sidebar.vue'
import TopHeader from '../components/dashboard/TopHeader.vue'

const isMobileMenuOpen = ref(false)
const isModalOpen = ref(false)
const isDataFiltering = ref(false)
const toastState = ref({ show: false, message: '' })

const triggerToast = (msg) => {
  toastState.value = { show: true, message: msg }
  setTimeout(() => { toastState.value.show = false }, 4000)
}

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

const metrics = [
    { label: 'Avg Order Value', value: 'LKR 42.5K', icon: CreditCard, color: 'blue', trend: '+5.2%', trendColor: 'green' },
    { label: 'Conversion Rate', value: '3.82%', icon: Target, color: 'indigo', trend: '+1.1%', trendColor: 'green' },
    { label: 'Total Orders', value: '2,840', icon: ShoppingCart, color: 'purple', trend: '-2.4%', trendColor: 'red' },
    { label: 'New Customers', value: '412', icon: Users, color: 'orange', trend: '+12.5%', trendColor: 'green' }
]

const segments = [
    { name: 'Corporate SaaS', short: 'CS', count: 124, revenue: 'LKR 8.2M', growth: 14 },
    { name: 'Standard Course', short: 'SC', count: 840, revenue: 'LKR 4.5M', growth: 8 },
    { name: 'Advanced Batch', short: 'AB', count: 320, revenue: 'LKR 3.8M', growth: 22 },
    { name: 'Consulting', short: 'CO', count: 18, revenue: 'LKR 2.1M', growth: 5 }
]

const allChannels = [
    { initials: 'FB', name: 'Facebook Ads Nexus', status: 'High Performance', revenue: 'LKR 4.2M', share: 45 },
    { initials: 'WA', name: 'WhatsApp Automations', status: 'Stable', revenue: 'LKR 1.8M', share: 18 },
    { initials: 'LI', name: 'LinkedIn Lead Gen', status: 'Enterprise Scale', revenue: 'LKR 2.4M', share: 22 },
    { initials: 'DR', name: 'Direct Referrals', status: 'Organic', revenue: 'LKR 1.2M', share: 15 }
]

const barSeries = [{
    name: 'Revenue (LKR)',
    data: [4.2, 5.8, 3.9, 8.4, 2.1, 5.2, 7.1]
}]

const barOptions = {
    chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'Inter' },
    plotOptions: { bar: { borderRadius: 8, columnWidth: '45%' } },
    dataLabels: { enabled: false },
    colors: ['#3b82f6'],
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] },
    grid: { borderColor: '#e2e8f0', strokeDashArray: 4 },
    tooltip: { theme: 'dark', y: { formatter: (val) => val + " Million LKR" } }
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
