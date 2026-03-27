<template>
  <div class="h-screen bg-slate-50 flex text-slate-800 font-sans overflow-hidden">
    
    <Sidebar @toggleMenu="isMobileMenuOpen = !isMobileMenuOpen" @triggerToast="triggerToast" />

    <main class="flex-1 flex flex-col min-h-0 bg-[#f4f7fb] relative overflow-hidden">
      
      <TopHeader @toggleMenu="isMobileMenuOpen = !isMobileMenuOpen" @triggerToast="triggerToast" />

      <!-- GLOBAL ALERT SYSTEM -->
      <div v-show="showAlert" class="bg-red-50 border-b border-red-100 flex-shrink-0 px-4 sm:px-8 py-2.5 flex items-center justify-between z-0 animate-[slideDown_0.4s_ease-out]">
        <div class="flex items-center gap-2.5 text-red-700 text-[13px] font-bold">
          <AlertTriangle class="w-4 h-4 animate-pulse shrink-0" />
          <span class="hidden sm:inline">System Alert: Software category revenue dropped by 12% WoW.</span>
          <span class="sm:hidden">Alert: Software revenue -12% WoW.</span>
        </div>
        <button @click="handleNodeClick('anomaly_detection')" class="text-red-700 hover:text-red-900 text-xs font-black uppercase tracking-wider bg-red-100/50 hover:bg-red-200 px-3 py-1 rounded transition-colors whitespace-nowrap">Investigate</button>
      </div>

      <div class="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
        
        <!-- DASHBOARD PERSONALIZATION CONTROLS -->
        <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
           <div>
              <div class="flex items-center gap-3">
                 <h2 class="text-xl font-black text-slate-900 tracking-tight">{{ brandingStore.labels.dashboardTitle }}</h2>
                 <div class="group relative">
                    <span class="px-2 py-0.5 bg-primary/10 text-primary rounded-md text-[9px] font-black uppercase tracking-widest border border-primary/20 cursor-help">
                      {{ brandingStore.planTier }} Plan
                    </span>
                    <!-- Strategic Tooltip -->
                    <div class="invisible group-hover:visible absolute left-0 top-full mt-2 w-48 p-3 bg-slate-900 text-white text-[10px] rounded-xl shadow-2xl z-[60] border border-slate-700 animate-in fade-in slide-in-from-top-1">
                       <p class="font-bold mb-1 text-primary">Enterprise Node Status</p>
                       <p class="text-slate-400 leading-relaxed">Your organization is currently on the <span class="text-white">{{ brandingStore.planTier }}</span> track with high-priority AI processing and unlimited strategic nodes enabled.</p>
                       <div class="mt-2 pt-2 border-t border-slate-700 flex items-center justify-between">
                          <span class="text-emerald-400 font-bold uppercase">Active</span>
                          <span class="text-slate-500">v2.4.0</span>
                       </div>
                    </div>
                 </div>
              </div>
              <p class="text-[11px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">{{ brandingStore.labels.insight }} Viewport</p>
           </div>
           
           <div class="flex items-center gap-2">
              <div v-if="isCustomizing" class="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm animate-in fade-in slide-in-from-right-4">
                 <button 
                  v-for="(val, key) in layoutConfig" 
                  :key="key"
                  @click="layoutConfig[key] = !layoutConfig[key]"
                  :class="val ? 'bg-primary/10 text-primary border-primary/20' : 'bg-slate-50 text-slate-400 border-slate-100'"
                  class="text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all uppercase tracking-tight"
                 >
                    {{ key.replace(/([A-Z])/g, ' $1').trim() }}
                 </button>
              </div>
              <button 
                @click="isCustomizing = !isCustomizing" 
                :class="isCustomizing ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'"
                class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                 <Settings2 class="w-4 h-4" />
                 {{ isCustomizing ? 'Lock Layout' : 'Personalize View' }}
              </button>
           </div>
        </div>

        <div v-if="isLoading" class="flex items-center justify-center h-64 flex-col gap-4">
           <div class="w-8 h-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
           <p class="text-sm font-bold text-slate-400 uppercase tracking-widest">Syncing AI Data Pipeline...</p>
        </div>

        <div v-else class="space-y-6">
          <KPICards v-if="layoutConfig.kpiCards" :kpis="dashboardData.kpis" @triggerToast="triggerToast" @drillDown="handleNodeClick" />

          <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
            <MainChart v-if="layoutConfig.mainChart" :chartData="dashboardData.charts" @nodeClicked="handleNodeClick" @triggerToast="triggerToast" />
            <AIInsights v-if="layoutConfig.aiInsights" :insights="dashboardData.insights" @triggerToast="triggerToast" @drillDown="handleNodeClick" />
          </div>

          <TargetBar v-if="layoutConfig.targetBar" :progress="dashboardData.kpis.targetProgress" @triggerToast="triggerToast" @drillDown="handleNodeClick" />
          
          <!-- Empty State when all hidden -->
          <div v-if="!Object.values(layoutConfig).some(v => v)" class="bg-white rounded-3xl border border-slate-200 border-dashed p-20 flex flex-col items-center justify-center gap-4 text-center">
             <div class="p-4 bg-slate-50 rounded-full text-slate-300">
                <Layout class="w-12 h-12" />
             </div>
             <div class="max-w-xs">
                <p class="text-sm font-bold text-slate-900">Your workspace is empty.</p>
                <p class="text-xs text-slate-500 mt-1">Use the personalization tool to add widgets and modules back to your board.</p>
             </div>
             <button @click="isCustomizing = true" class="mt-2 text-primary text-xs font-black uppercase tracking-widest hover:underline">Configure Now</button>
          </div>
        </div>

      </div>

    </main>

    <!-- DRILL DOWN MODAL  -->
    <DrilldownModal 
      :isOpen="isDrilldownOpen" 
      :category="drilldownCategory" 
      @close="isDrilldownOpen = false" 
      @triggerToast="triggerToast"
    />

    <!-- PREMIUM CUSTOM TOAST NOTIFICATION -->
    <transition name="toast-slide">
      <div v-if="toastState.show" class="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100] bg-slate-900 text-white px-5 py-4 rounded-xl shadow-2xl border border-slate-700 max-w-sm flex items-start gap-4 ring-1 ring-white/10">
        <div class="mt-0.5 p-1.5 bg-primary/20 rounded-md text-primary ring-1 ring-primary/30"><Bell class="w-4 h-4"/></div>
        <div class="flex-1">
          <h4 class="font-bold text-sm mb-0.5 text-white tracking-wide uppercase">System Triggered</h4>
          <p class="text-[12px] text-slate-300 font-medium leading-relaxed">{{ toastState.message }}</p>
        </div>
        <button @click="toastState.show = false" class="ml-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-1 rounded transition-colors"><X class="w-4 h-4"/></button>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { AlertTriangle, Bell, X, Settings2, Layout } from 'lucide-vue-next'

import Sidebar from '../components/dashboard/Sidebar.vue'
import TopHeader from '../components/dashboard/TopHeader.vue'
import KPICards from '../components/dashboard/KPICards.vue'
import MainChart from '../components/dashboard/MainChart.vue'
import AIInsights from '../components/dashboard/AIInsights.vue'
import TargetBar from '../components/dashboard/TargetBar.vue'
import DrilldownModal from '../components/dashboard/DrilldownModal.vue'


import { brandingStore } from '../services/brandingService'
import { fetchDashboardMetrics } from '../services/dashboardService'


const showAlert = ref(false)
const isLoading = ref(true)
const dashboardData = ref({ kpis: {}, charts: {}, insights: [] })
const isMobileMenuOpen = ref(false)

const isDrilldownOpen = ref(false)
const drilldownCategory = ref('')

const isCustomizing = ref(false)
const layoutConfig = reactive({
  kpiCards: true,
  mainChart: true,
  aiInsights: true,
  targetBar: true
})


// Toast State Management
const toastState = ref({ show: false, message: '' })
let toastTimer = null;
const triggerToast = (msg) => {
  if(toastTimer) clearTimeout(toastTimer);
  toastState.value = { show: true, message: msg };
  toastTimer = setTimeout(() => { toastState.value.show = false }, 4000);
}

onMounted(async () => {
  const data = await fetchDashboardMetrics()
  const targetKpis = data.kpis;
  
  dashboardData.value.kpis = { revenue: 0, profit: 0, cashFlow: 0, expenses: 0, targetProgress: 0 };
  dashboardData.value.charts = data.charts;
  dashboardData.value.insights = data.insights;
  isLoading.value = false;

  setTimeout(() => { showAlert.value = true }, 600)

  const duration = 1200;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); 
    
    dashboardData.value.kpis.revenue = (ease * targetKpis.revenue);
    dashboardData.value.kpis.profit = (ease * targetKpis.profit);
    dashboardData.value.kpis.cashFlow = (ease * targetKpis.cashFlow);
    dashboardData.value.kpis.expenses = (ease * targetKpis.expenses);
    dashboardData.value.kpis.targetProgress = (ease * targetKpis.targetProgress);
    
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
})

const handleNodeClick = (category) => {
  drilldownCategory.value = category;
  isDrilldownOpen.value = true;
}
</script>

<style>
@keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes slideUp { from { transform: translateY(10px); opacity: 0; scale: 0.98; } to { transform: translateY(0); opacity: 1; scale: 1; } }
@keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }

.toast-slide-enter-active, .toast-slide-leave-active { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.toast-slide-enter-from, .toast-slide-leave-to { opacity: 0; transform: translateY(20px) scale(0.95); }

.custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>
