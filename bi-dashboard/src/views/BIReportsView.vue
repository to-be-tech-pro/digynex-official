<script setup>
import { ref } from 'vue'
import { 
    Brain, 
    FileText, 
    Download, 
    Clock, 
    X, 
    Bell, 
    Zap, 
    Database, 
    Activity, 
    Archive, 
    ArrowUpRight, 
    Cpu, 
    Calendar, 
    ShieldCheck, 
    Network, 
    Globe, 
    Sparkles, 
    TrendingUp, 
    Layers, 
    Fingerprint,
    Search,
    Bot
} from 'lucide-vue-next'
import Sidebar from '../components/dashboard/Sidebar.vue'
import TopHeader from '../components/dashboard/TopHeader.vue'
import DrilldownModal from '../components/dashboard/DrilldownModal.vue'

const isMobileMenuOpen = ref(false)
const toastState = ref({ show: false, message: '' })
const isProcessing = ref(false)
const processingStep = ref('')
const processingProgress = ref(0)
const includeAI = ref(true)

// Drilldown State
const isDrilldownOpen = ref(false)
const drilldownCategory = ref('')

const openDrilldown = (cat) => {
    drilldownCategory.value = cat;
    isDrilldownOpen.value = true;
}

const triggerToast = (msg) => {
  toastState.value = { show: true, message: msg }
  setTimeout(() => { toastState.value.show = false }, 4000)
}

const generateReport = () => {
    isProcessing.value = true
    processingProgress.value = 5
    processingStep.value = "Establishing n8n Secure Tunnel..."
    
    let interval = setInterval(() => {
        if (processingProgress.value < 90) {
            processingProgress.value += Math.random() * 8;
            if (processingProgress.value > 25) processingStep.value = "Parsing Social Intelligence Hub Data...";
            if (processingProgress.value > 55) processingStep.value = "Executing AI Neural Synthesis...";
            if (processingProgress.value > 82) processingStep.value = "Signing Forensic Governance Protocol...";
        }
    }, 300);

    setTimeout(() => {
        clearInterval(interval);
        processingProgress.value = 100;
        setTimeout(() => {
            isProcessing.value = false;
            triggerToast("✓ Elite Executive Manifest 'DigyNex_BOS_V2.2_Intelligence.pdf' generated.");
            processingProgress.value = 0;
            
            // Simulating actual download
            const a = document.createElement('a');
            a.href = '#';
            a.download = 'DigyNex_BOS_Intelligence_Q1.pdf';
            a.click();
        }, 600);
    }, 4500)
}

const toggleAI = () => {
    includeAI.value = !includeAI.value;
    triggerToast(`AI Context Injection: ${includeAI.value ? 'Synchronized' : 'Bypassed'}`);
}

const biMetrics = [
    { label: 'Intelligence Sync', value: 'Live 99.9%', icon: Cpu, color: 'bg-indigo-50 text-indigo-600', drilldown: 'Database Architecture Sync' },
    { label: 'n8n Orchestration', value: '24 Active Nodes', icon: Zap, color: 'bg-emerald-50 text-emerald-600', drilldown: 'Automation Pipeline' },
    { label: 'Managed Data', value: '8.4M Points', icon: Activity, color: 'bg-purple-50 text-purple-600', drilldown: 'Social Reach Audit' }
]

const toggleScheduleStatus = (report) => {
    report.active = !report.active;
    triggerToast(`Automation Flow '${report.name}' is now ${report.active ? 'Active' : 'Paused'}.`);
}

const schedules = ref([
    { name: 'n8n Social Lead Flow Audit', freq: 'Real-time', next: 'Synchronizing...', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', active: true, lastRun: 'Live' },
    { name: 'Weekly Market Nexus Pivot', freq: 'Weekly', next: 'Monday, 8:00 AM', color: 'bg-indigo-50 text-indigo-600 border-indigo-100', active: true, lastRun: 'Success (Mar 30)' },
    { name: 'Social Viral Reach Projection', freq: 'Daily', next: 'Tonight, 12:00 PM', color: 'bg-purple-50 text-purple-600 border-purple-100', active: true, lastRun: 'Live Sync' }
])

const archives = [
    { name: 'Q1 AI Intelligence Hub Consolidation', date: 'Mar 30, 2026', size: '5.8 MB', status: 'Verifying' },
    { name: 'n8n Automation ROI Manifest', date: 'Mar 28, 2026', size: '2.4 MB', status: 'Signed' },
    { name: 'Social Lead Conversion Matrix', date: 'Mar 25, 2026', size: '3.1 MB', status: 'Signed' },
    { name: 'Global Operational Synergy Report', date: 'Mar 20, 2026', size: '1.2 MB', status: 'Signed' }
]
</script>

<template>
    <div class="h-screen bg-white flex text-slate-800 font-sans overflow-hidden">
        <Sidebar @toggleMenu="isMobileMenuOpen = !isMobileMenuOpen" @triggerToast="triggerToast" />

        <main class="flex-1 flex flex-col h-screen overflow-hidden bg-[#f8fafc] relative">
            <TopHeader @toggleMenu="isMobileMenuOpen = !isMobileMenuOpen" @triggerToast="triggerToast" />

            <div class="flex-1 overflow-y-auto p-4 lg:p-10 custom-scrollbar relative z-10">
                
                <!-- REFINED HEADER -->
                <div class="max-w-7xl mx-auto space-y-12 animate-[fadeIn_0.5s_ease-out]">
                    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-slate-200/60 pb-10">
                        <div class="flex items-center gap-6 text-left">
                            <Brain class="w-10 h-10 text-indigo-600 animate-pulse flex-shrink-0" />
                            <div class="flex flex-col">
                                <h1 class="text-3xl font-black tracking-tighter uppercase italic text-slate-900 leading-none">BI Intelligence Reports</h1>
                                <p class="text-slate-400 text-[10px] font-black tracking-[0.4em] uppercase mt-2 flex items-center gap-2 italic leading-none opacity-60">
                                    <Globe class="w-3.5 h-3.5" /> High-Density Enterprise Orchestration Hub
                                </p>
                            </div>
                        </div>

                        <div class="flex items-center gap-2">
                            <div class="px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm italic">
                                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                n8n Automation Engine: 100% Operational
                            </div>
                        </div>
                    </div>

                    <!-- BI FORENSIC METRICS -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div 
                          v-for="card in biMetrics" 
                          :key="card.label" 
                          @click="openDrilldown(card.drilldown)"
                          class="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-700 cursor-pointer group relative overflow-hidden"
                        >
                            <div class="absolute -right-6 -top-6 w-32 h-32 bg-slate-50 rounded-full group-hover:scale-125 transition-all duration-1000 opacity-40"></div>
                            <div class="relative z-10 flex items-center justify-between mb-6">
                              <div :class="card.color" class="p-4 rounded-2xl shadow-inner group-hover:rotate-12 transition-transform duration-700 font-black">
                                  <component :is="card.icon" class="w-6 h-6" />
                              </div>
                              <ArrowUpRight class="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                            </div>
                            <div class="relative z-10 text-left">
                              <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2 italic">{{ card.label }}</p>
                              <h3 class="text-3xl font-black text-slate-900 tracking-tighter italic">{{ card.value }}</h3>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        
                        <!-- REPORT CONTEXT BUILDER (FULL PAPARE) -->
                        <div class="lg:col-span-8 bg-white rounded-[3.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col relative group">
                            
                            <div v-if="isProcessing" class="absolute inset-0 bg-white/80 backdrop-blur-2xl z-20 flex flex-col items-center justify-center animate-[fadeIn_0.3s_ease] p-20 text-center">
                                <div class="relative w-32 h-32 mb-10">
                                    <div class="absolute inset-0 border-4 border-slate-100 rounded-[2.5rem]"></div>
                                    <div class="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-[2.5rem] animate-spin"></div>
                                    <div class="absolute inset-0 flex items-center justify-center">
                                        <Cpu class="w-10 h-10 text-indigo-600 animate-pulse" />
                                    </div>
                                </div>
                                
                                <div class="w-full max-w-sm space-y-6">
                                    <div class="flex justify-between items-end">
                                        <p class="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em] font-mono leading-none italic">{{ processingStep }}</p>
                                        <span class="text-xl font-black text-slate-900 font-mono leading-none">{{ Math.floor(processingProgress) }}%</span>
                                    </div>
                                    <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50 shadow-inner">
                                        <div class="h-full bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all duration-300" :style="{ width: `${processingProgress}%` }"></div>
                                    </div>
                                    <div class="flex items-center justify-center gap-3 opacity-60">
                                         <Fingerprint class="w-4 h-4 text-emerald-500" />
                                         <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Encrypted n8n Stream: Secure</span>
                                    </div>
                                </div>
                            </div>

                            <div class="p-12 border-b border-slate-100 bg-slate-50/20 text-left">
                                <h3 class="font-black text-slate-900 uppercase tracking-[0.4em] text-[10px] mb-8 flex items-center gap-3 italic">
                                    <Database class="w-4 h-4 text-indigo-500" /> Deep Context Manifest Compiler
                                </h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div class="space-y-3">
                                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Intelligence Domain</label>
                                        <select class="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-[13px] font-black text-slate-800 outline-none hover:border-indigo-200 focus:ring-8 focus:ring-indigo-600/5 transition-all cursor-pointer shadow-sm italic">
                                            <option>AI Social Viral Reach Audit</option>
                                            <option>n8n Logic Performance Pivot</option>
                                            <option>Consolidated Revenue Clusters</option>
                                            <option>Operational Synergy Index</option>
                                        </select>
                                    </div>
                                    <div class="space-y-3">
                                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Time Compression</label>
                                        <select class="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-[13px] font-black text-slate-800 outline-none hover:border-indigo-200 focus:ring-8 focus:ring-indigo-600/5 transition-all cursor-pointer shadow-sm italic">
                                            <option>Live Cycle (Last 24h)</option>
                                            <option>Current Fiscal Burst (Q1)</option>
                                            <option>Year-to-Date Manifest</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="p-12 flex-1 flex flex-col justify-between text-left">
                                <div class="flex items-center justify-between p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 group-hover:bg-white group-hover:shadow-xl transition-all duration-700">
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner group-hover:rotate-12 transition-transform duration-700"><Sparkles class="w-6 h-6"/></div>
                                        <div>
                                            <p class="text-[13px] font-black text-slate-800 uppercase italic leading-none mb-1.5">Neural Synthesis Protocol</p>
                                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Inject AI-Driven Strategic Summaries</p>
                                        </div>
                                    </div>
                                    <div @click="toggleAI" :class="includeAI ? 'bg-indigo-600' : 'bg-slate-200'" class="w-14 h-7 rounded-full relative cursor-pointer transition-all duration-500 shadow-inner">
                                        <div :class="includeAI ? 'translate-x-[28px]' : 'translate-x-0'" class="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-500"></div>
                                    </div>
                                </div>

                                <div class="grid grid-cols-2 gap-10 mt-10">
                                    <div class="space-y-4">
                                        <div class="flex items-center justify-between">
                                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest italic leading-none">Neural Confidence</p>
                                            <span class="text-[10px] font-black text-emerald-500 italic">99.8% ACCURACY</span>
                                        </div>
                                        <div class="flex items-end gap-1.5 h-10 w-full overflow-hidden opacity-50">
                                            <div v-for="i in 15" :key="i" :style="{ height: `${Math.random() * 80 + 20}%` }" class="flex-1 bg-indigo-600/20 rounded-t-sm"></div>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-6 justify-end">
                                        <div class="text-right">
                                            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Payload Path</p>
                                            <p class="text-[13px] font-black text-slate-900 italic uppercase">n8n_Cloud_Sync</p>
                                        </div>
                                        <div class="w-1.5 h-12 bg-slate-100 rounded-full"></div>
                                        <div class="text-right">
                                            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Signature</p>
                                            <p class="text-[13px] font-black text-indigo-600 italic uppercase">AI_SIGNED</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-12">
                                    <button @click="generateReport" class="w-full py-6 bg-slate-900 rounded-[2.5rem] text-[12px] font-black text-white uppercase tracking-[0.4em] hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-700 flex items-center justify-center gap-4 italic group/btn relative overflow-hidden shadow-2xl shadow-slate-900/20 border border-white/5">
                                         <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-800 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-1000"></div>
                                        <FileText class="w-5 h-5 text-indigo-400 relative z-10 group-hover/btn:scale-110 transition-transform" /> 
                                        <span class="relative z-10">GENERATE ELITE MANIFEST</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- AUTOMATION HUB (RIGHT) -->
                        <div class="lg:col-span-4 flex flex-col gap-8">
                            <div class="bg-white rounded-[3rem] border border-slate-200 shadow-sm p-10 flex flex-col flex-1 relative overflow-hidden">
                                <h3 class="font-black text-slate-900 uppercase tracking-[0.4em] text-[10px] mb-8 flex items-center gap-3 italic text-left">
                                    <Zap class="w-4 h-4 text-indigo-500" /> n8n Automation Engine
                                </h3>
                                <div class="space-y-5 flex-1 text-left">
                                    <div 
                                        v-for="report in schedules" 
                                        :key="report.name" 
                                        @click="toggleScheduleStatus(report)"
                                        class="p-6 rounded-[2.5rem] bg-white border border-slate-100 transition-all cursor-pointer shadow-sm relative group overflow-hidden hover:border-indigo-100 hover:bg-slate-50"
                                        :class="!report.active && 'opacity-60 grayscale-[0.8]'"
                                    >
                                        <div class="flex items-center justify-between mb-4">
                                            <span :class="report.color" class="text-[8px] font-black px-3 py-1 rounded-lg border uppercase tracking-[0.2em] italic">{{ report.freq }}</span>
                                            <div class="flex items-center gap-2">
                                                <div :class="report.active ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-300'" class="w-2 h-2 rounded-full animate-pulse"></div>
                                            </div>
                                        </div>
                                        <p class="text-[13px] font-black text-slate-800 group-hover:text-indigo-600 leading-tight italic uppercase tracking-tight">{{ report.name }}</p>
                                        <div class="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                                             <div class="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                                                <Calendar class="w-3.5 h-3.5 opacity-40" /> {{ report.next }}
                                             </div>
                                        </div>
                                    </div>
                                </div>
                                <button @click="triggerToast('Cloud Automation Logic is restricted to Level 4 Admins.')" class="w-full mt-10 py-5 border-2 border-dashed border-slate-200 text-slate-400 rounded-[2.5rem] text-[10px] font-black uppercase tracking-[0.3em] hover:border-indigo-400/30 hover:text-indigo-600 transition-all duration-700 italic active:scale-95">
                                    + Register New n8n Node
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- ARCHIVE GRID -->
                    <div class="bg-white rounded-[4rem] border border-slate-200 shadow-sm overflow-hidden mb-12 relative">
                         <div class="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h3 class="font-black text-slate-900 uppercase tracking-[0.4em] text-[10px] flex items-center gap-3 italic">
                               <Archive class="w-4 h-4 text-indigo-500" /> Intelligence Manifest Warehouse
                            </h3>
                            <button class="text-[9px] font-black text-slate-300 hover:text-red-500 uppercase tracking-widest transition-colors italic">Wipe Database History</button>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full text-left">
                                <thead class="bg-slate-50/30 border-b border-slate-50">
                                    <tr class="italic">
                                        <th class="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Compiler Reference</th>
                                        <th class="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Matrix Sync Date</th>
                                        <th class="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Payload Size</th>
                                        <th class="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Commit</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-50">
                                    <tr v-for="archive in archives" :key="archive.name" class="hover:bg-slate-50/50 transition-all duration-500 group cursor-pointer">
                                        <td class="px-10 py-7">
                                            <div class="flex items-center gap-5">
                                                <div class="w-12 h-12 bg-indigo-600/5 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-[11px] border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm italic uppercase tracking-tighter shadow-inner">PDF</div>
                                                <div>
                                                    <p class="text-[14px] font-black text-slate-800 italic uppercase leading-none mb-1.5">{{ archive.name }}</p>
                                                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none flex items-center gap-2">
                                                        <ShieldCheck class="w-3 h-3 text-emerald-500" /> AUTHENTICATED BY NEURAL CORE
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-10 py-7 text-[12px] font-black text-slate-500 uppercase italic">{{ archive.date }}</td>
                                        <td class="px-10 py-7 text-[12px] font-black text-slate-400 uppercase text-center font-mono italic">{{ archive.size }}</td>
                                        <td class="px-10 py-7 text-right">
                                            <button @click="generateReport" class="p-4 bg-slate-50 text-slate-400 hover:text-indigo-600 transition-all hover:bg-indigo-50 rounded-2xl border border-slate-100 group-hover:shadow-md"><Download class="w-5 h-5" /></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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

        <!-- ELITE TOAST SYSTEM -->
        <transition name="toast-slide">
          <div v-if="toastState.show" class="fixed bottom-12 right-12 z-[3000] bg-slate-900 text-white px-8 py-5 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/10 flex items-center gap-5 backdrop-blur-3xl ring-1 ring-white/20">
            <div class="p-2.5 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-600/20"><Bell class="w-5 h-5 animate-bounce"/></div>
            <div>
              <p class="text-[11px] font-black text-white uppercase tracking-[0.2em] italic leading-none mb-1">Intelligence Relay</p>
              <p class="text-[13px] font-black text-slate-400 italic leading-none">{{ toastState.message }}</p>
            </div>
            <button @click="toastState.show = false" class="ml-4 text-slate-500 hover:text-white transition-colors"><X class="w-5 h-5"/></button>
          </div>
        </transition>

    </div>
</template>

<style scoped>
.toast-slide-enter-active, .toast-slide-leave-active { transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
.toast-slide-enter-from { opacity: 0; transform: translateY(40px) scale(0.9); }
.toast-slide-leave-to { opacity: 0; transform: translateY(-40px) scale(0.9); }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }

.status-glow { box-shadow: 0 0 15px rgba(16, 185, 129, 0.4); }
</style>
