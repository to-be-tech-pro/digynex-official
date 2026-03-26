<template>
  <div class="h-screen bg-slate-50 flex text-slate-800 font-sans overflow-hidden">
    <Sidebar @toggleMenu="isMobileMenuOpen = !isMobileMenuOpen" @triggerToast="triggerToast" />

    <main class="flex-1 flex flex-col h-screen overflow-hidden bg-[#f4f7fb] relative">
      <TopHeader @toggleMenu="isMobileMenuOpen = !isMobileMenuOpen" @triggerToast="triggerToast" />

      <div class="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
        <div class="mb-8">
            <h1 class="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Activity class="w-6 h-6 text-indigo-500" /> Operational Efficiency
            </h1>
            <p class="text-sm font-medium text-slate-500 mt-1">Real-time monitoring of business workflow and performance throughput.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div v-for="op in ops_metrics" :key="op.label" class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm group">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{{ op.label }}</p>
                <div class="flex items-end justify-between">
                    <h3 class="text-2xl font-black text-slate-900">{{ op.value }}</h3>
                    <div :class="`text-[10px] font-black px-2 py-0.5 rounded-full ${op.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`">
                        {{ op.percent }}%
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
             <div class="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                <div class="flex items-center justify-between mb-8">
                    <h3 class="font-black text-slate-900 uppercase tracking-widest text-[11px] flex items-center gap-2">
                        <Activity class="w-4 h-4 text-primary" /> Load Throughput (24H)
                    </h3>
                    <div class="flex gap-1">
                        <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        <span class="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                        <span class="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                    </div>
                </div>
                <div class="h-[300px]">
                    <apexchart type="area" height="100%" :options="chartOptions" :series="chartSeries"></apexchart>
                </div>
             </div>

             <div class="bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                 <div class="absolute -right-10 -bottom-10 bg-primary/20 w-48 h-48 rounded-full blur-[80px]"></div>
                 <div class="relative z-10">
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Automated Optimization</p>
                    <h2 class="text-2xl font-black tracking-tight mb-4">AI Efficiency Recommendation</h2>
                    <p class="text-slate-400 text-sm leading-relaxed mb-8">System detects a <span class="text-emerald-400">12% latency</span> in Lead Response during peak weekend hours. Recommending auto-balancing n8n workers.</p>
                 </div>
                 <button @click="triggerToast('Executing AI Load Balancing Protocol...')" class="w-full py-3.5 bg-white text-slate-900 rounded-2xl font-black text-sm transition-all hover:bg-slate-100 active:scale-95 shadow-lg relative z-10">
                    Apply Optimization
                 </button>
             </div>
        </div>
      </div>
    </main>

    <transition name="toast-slide">
      <div v-if="toastState.show" class="fixed bottom-10 right-10 z-[100] bg-slate-900 text-white px-5 py-4 rounded-xl shadow-2xl flex items-start gap-4 ring-1 ring-white/10">
        <p class="text-xs font-bold leading-relaxed">{{ toastState.message }}</p>
        <button @click="toastState.show = false"><X class="w-4 h-4"/></button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Activity, X } from 'lucide-vue-next'
import Sidebar from '../components/dashboard/Sidebar.vue'
import TopHeader from '../components/dashboard/TopHeader.vue'

const isMobileMenuOpen = ref(false)
const toastState = ref({ show: false, message: '' })

const triggerToast = (msg) => {
  toastState.value = { show: true, message: msg }
  setTimeout(() => { toastState.value.show = false }, 3000)
}

const ops_metrics = [
    { label: 'Platform Uptime', value: '99.98%', percent: '0.02', trend: 'up' },
    { label: 'Lead Response Time', value: '4.2m', percent: '14', trend: 'down' },
    { label: 'Workload Density', value: '84%', percent: '2.1', trend: 'up' },
    { label: 'System Saturation', value: '12.8ms', percent: '5', trend: 'down' }
]

const chartSeries = [{
    name: 'Throughput',
    data: [31, 40, 28, 51, 42, 109, 100, 120, 80, 95]
}]

const chartOptions = {
    chart: { toolbar: { show: false }, sparkline: { enabled: false } },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3, colors: ['#6366f1'] },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05 } },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { show: false } },
    grid: { show: false },
    tooltip: { theme: 'dark' }
}
</script>

<style scoped>
.toast-slide-enter-active, .toast-slide-leave-active { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.toast-slide-enter-from, .toast-slide-leave-to { opacity: 0; transform: translateY(20px) scale(0.95); }
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
</style>
