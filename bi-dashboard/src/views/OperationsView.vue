<template>
  <div class="h-screen bg-slate-50 flex text-slate-800 font-sans overflow-hidden">
    <Sidebar @toggleMenu="isMobileMenuOpen = !isMobileMenuOpen" @triggerToast="triggerToast" />

    <main class="flex-1 flex flex-col h-screen overflow-hidden bg-[#f4f7fb] relative">
      <TopHeader @toggleMenu="isMobileMenuOpen = !isMobileMenuOpen" @triggerToast="triggerToast" />

      <div class="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
        <div class="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 class="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2 uppercase">
                  <Cpu class="w-6 h-6 text-primary" /> Operations Tactical Command
                </h1>
                <p class="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest italic leading-relaxed">
                   Live Forensic Diagnostics & AI Inbound Processing Engine
                </p>
            </div>
            <div class="flex items-center gap-3 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
                <button 
                    v-for="t in ['AI Matching Agent', 'Daily Operation Log']" :key="t"
                    @click="activeTab = t"
                    :class="activeTab === t ? 'bg-slate-900 text-white shadow-xl scale-100 rotate-0' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50 scale-95'"
                    class="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 transform whitespace-nowrap"
                >
                    {{ t }}
                </button>
            </div>
        </div>

        <!-- AI MATCHING AGENT TAB (PRIMARY) -->
        <div v-show="activeTab === 'AI Matching Agent'" class="animate-[slideIn_0.4s_ease-out] space-y-8">
             <div class="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
                <div class="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/20 px-8">
                    <h3 class="font-black text-slate-800 uppercase tracking-widest text-[11px] flex items-center gap-2 italic">
                        <ActivityIcon class="w-4 h-4 text-primary" /> Forensic Discrepancy Pulse (Inbound vs Ledger)
                    </h3>
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-1.5 bg-slate-900/5 px-3 py-1.5 rounded-lg">
                            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-[ping_1.5s_infinite]"></span>
                            <span class="text-[9px] font-black text-slate-900 uppercase tracking-widest italic">AI Core: Tactical Mode</span>
                        </div>
                    </div>
                </div>
                <div class="p-8">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-separate border-spacing-y-3">
                            <thead>
                                <tr class="text-[10px] font-black text-slate-400 uppercase tracking-[.25em]">
                                    <th class="pb-4 px-4 whitespace-nowrap">Context ID</th>
                                    <th class="pb-4 px-4 whitespace-nowrap">Entity Identifier</th>
                                    <th class="pb-4 px-4 whitespace-nowrap">Matching Docs</th>
                                    <th class="pb-4 px-4">AI Confidence</th>
                                    <th class="pb-4 px-4 text-right">Action State</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="match in poMatches" :key="match.id" class="group bg-slate-50/30 hover:bg-white hover:border-primary/20 hover:shadow-xl transition-all duration-300 border border-transparent rounded-2xl">
                                    <td class="py-5 px-4 rounded-l-2xl border-y border-l border-slate-100 transition-all font-black text-[11px] text-slate-900 italic group-hover:text-primary">
                                        {{ match.po_number }}
                                    </td>
                                    <td class="py-5 px-4 border-y border-slate-100 font-bold text-xs text-slate-700">
                                        {{ match.vendor }}
                                    </td>
                                    <td class="py-5 px-4 border-y border-slate-100">
                                        <div class="flex items-center gap-2">
                                            <span class="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[9px] font-black italic">{{ match.inv_number }}</span>
                                        </div>
                                    </td>
                                    <td class="py-5 px-4 border-y border-slate-100">
                                        <div class="flex items-center gap-3">
                                            <div class="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden flex-shrink-0">
                                                <div class="h-full bg-primary transition-all duration-700 shadow-[0_0_10px_rgba(255,107,0,0.3)]" :style="{ width: `${match.confidence}%` }"></div>
                                            </div>
                                            <span class="text-[10px] font-black text-slate-900 italic">{{ match.confidence }}%</span>
                                        </div>
                                    </td>
                                    <td class="py-5 px-4 rounded-r-2xl border-y border-r border-slate-100 text-right">
                                        <button v-if="match.status === 'pending'" @click="selectedMatch = match" class="px-4 py-2 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">Resolve Inbound</button>
                                        <span v-else :class="match.status === 'matched' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'" class="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
                                            {{ match.status }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- DAILY OPERATION LOG TAB -->
        <div v-show="activeTab === 'Daily Operation Log'" class="animate-[slideIn_0.4s_ease-out] space-y-8">
            <div class="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-12 min-h-[500px] flex items-center justify-center">
                <div class="text-center space-y-6 max-w-sm">
                    <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300 border border-slate-100 shadow-inner group-hover:scale-110 transition-transform"><ListChecks class="w-10 h-10 opacity-30 animate-pulse" /></div>
                    <div class="space-y-2">
                        <h3 class="text-lg font-black text-slate-900 uppercase italic tracking-tighter">Unified Operational Stream</h3>
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Aggregating live events from all tactical nodes. AI is calibrating real-time activity metrics for the 24H cycle.</p>
                    </div>
                    <button class="px-8 py-3 bg-slate-50 border border-slate-200 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">Initialize Stream Analytics</button>
                </div>
            </div>
        </div>
      </div>
    </main>

    <!-- DRILL DOWN MODAL  -->
    <DrilldownModal :isOpen="isDrilldownOpen" :category="drilldownCategory" @close="isDrilldownOpen = false" @triggerToast="triggerToast" />

    <!-- AI FORENSIC MATCH DETAIL MODAL (MOVED HERE FOR CLEANER HIERARCHY) -->
    <div v-if="selectedMatch" class="fixed inset-0 z-[2500] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md">
        <div class="bg-white w-full max-w-4xl rounded-[3rem] shadow-3xl overflow-hidden animate-[modalSlide_0.3s_ease-out] border border-white/20">
            <div class="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
                <div class="flex items-center gap-6">
                    <div class="w-16 h-16 rounded-[1.5rem] bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_20px_rgba(255,107,0,0.2)]">
                        <ZoomIn class="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h2 class="text-2xl font-black italic uppercase tracking-tighter">Forensic Inbound Analysis</h2>
                        <p class="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Comparing Active Ledger to Inbound Claim: {{ selectedMatch.po_number }}</p>
                    </div>
                </div>
                <button @click="selectedMatch = null" class="p-3 hover:bg-white/10 rounded-full transition-colors font-black">X</button>
            </div>

            <div class="p-12 space-y-10">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <!-- PO CONTEXT (ORIGINAL BUDGET SOURCE) -->
                    <div class="space-y-6">
                        <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic border-b border-slate-100 pb-3">Internal Ledger Record</h4>
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 font-mono">
                            <div class="flex justify-between text-xs font-black"><span>Description</span><span>Value</span></div>
                            <div class="w-full h-px bg-slate-200"></div>
                            <div class="flex justify-between text-xs"><span>Structural Grade 42</span><span>850.00</span></div>
                            <div class="flex justify-between text-xs font-black text-slate-900 pt-2 border-t border-slate-200"><span>TOTAL</span><span>850.00</span></div>
                        </div>
                    </div>

                    <!-- INBOUND DOC CONTEXT (THE CLAIM) -->
                    <div class="space-y-6">
                        <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic border-b border-slate-100 pb-3 text-primary">Inbound Technical Manifest</h4>
                        <div class="p-6 bg-slate-900 text-white rounded-2xl space-y-4 font-mono">
                            <div class="flex justify-between text-xs font-black text-slate-500"><span>Line Item Claim</span><span>Value</span></div>
                            <div class="w-full h-px bg-white/10"></div>
                            <div class="flex justify-between text-xs text-red-400"><span>Structural Grade 42 (Adjusted)</span><span>980.00</span></div>
                            <div class="flex justify-between text-xs font-black text-white pt-2 border-t border-white/20"><span>TOTAL CLAIM</span><span>980.00</span></div>
                        </div>
                    </div>
                </div>

                <div class="bg-red-50 p-6 rounded-3xl border border-red-100 flex items-start gap-4">
                    <ShieldAlert class="w-6 h-6 text-red-500 mt-1" />
                    <p class="text-xs font-bold text-red-800 leading-relaxed uppercase tracking-tighter">
                        <span class="font-black">Forensic Discrepancy Found:</span> The Inbound Claim exceeds the internal ledger by <span class="underline">15.2%</span>. AI matching suggests this is due to "Technical Grade Escalation". Human Authorization Required.
                    </p>
                </div>

                <div class="flex gap-4">
                    <button @click="selectedMatch = null" class="flex-1 py-5 bg-slate-50 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-slate-200">Abort Analysis</button>
                    <button @click="triggerToast('Requesting Vendor Rectification...')" class="flex-1 py-5 bg-amber-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-amber-500/20">Request Correction</button>
                    <button @click="triggerToast('Ledger Adjusted & Posted.')" class="flex-2 py-5 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl">Authorize Discrepancy</button>
                </div>
            </div>
        </div>
    </div>

    <!-- PREMIUM CUSTOM TOAST NOTIFICATION -->
    <transition name="toast-slide">
      <div v-if="toastState.show" class="fixed bottom-10 right-10 z-[3000] bg-slate-900 text-white px-5 py-4 rounded-xl shadow-3xl border border-slate-700 flex items-start gap-4 ring-1 ring-white/10 max-w-sm">
        <div class="mt-0.5 p-1.5 bg-primary/20 rounded-md text-primary ring-1 ring-primary/30"><Bell class="w-4 h-4"/></div>
        <div class="flex-1"><p class="text-[12px] text-slate-300 font-medium leading-relaxed uppercase tracking-tight">{{ toastState.message }}</p></div>
        <button @click="toastState.show = false" class="ml-2 text-slate-400 hover:text-white p-1 hover:bg-white/10 rounded transition-colors font-black">X</button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Activity as ActivityIcon, Cpu, Zap, Users, RefreshCw, Layers, Database, Bell, Loader2, Workflow, TrendingUp, Plus, ShieldAlert, CheckCircle2, ZoomIn, Brain, Clock, ListChecks } from 'lucide-vue-next'
import Sidebar from '../components/dashboard/Sidebar.vue'
import TopHeader from '../components/dashboard/TopHeader.vue'
import DrilldownModal from '../components/dashboard/DrilldownModal.vue'
import { brandingStore } from '../services/brandingService'
import { authStore } from '../services/authService'

const isMobileMenuOpen = ref(false)
const activeTab = ref('AI Matching Agent')
const toastState = ref({ show: false, message: '' })
const isDrilldownOpen = ref(false)
const drilldownCategory = ref('')
const selectedMatch = ref(null)

const poMatches = ref([
    { id: 1, po_number: 'PO-2026-001', vendor: 'Global Logistics', inv_number: 'INV-782', confidence: 98, status: 'matched' },
    { id: 2, po_number: 'PO-2026-039', vendor: 'Axis Infrastructure', inv_number: 'INV-901', confidence: 42, status: 'pending' },
    { id: 3, po_number: 'PO-2026-112', vendor: 'Concrete Systems', inv_number: 'INV-112', confidence: 99, status: 'matched' },
    { id: 4, po_number: 'PO-2026-005', vendor: 'Apex Group', inv_number: 'INV-404', confidence: 15, status: 'pending' }
])

const triggerToast = (message) => {
  toastState.value.message = message
  toastState.value.show = true
  setTimeout(() => { toastState.value.show = false }, 3000)
}

const openDrilldown = (cat) => {
    drilldownCategory.value = cat
    isDrilldownOpen.value = true
}

onMounted(() => {
    // Analytics init
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.toast-slide-enter-active, .toast-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-slide-enter-from {
  transform: translateY(100px) scale(0.9);
  opacity: 0;
}
.toast-slide-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
</style>
