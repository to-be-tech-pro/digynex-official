<template>
  <div class="h-screen bg-slate-50 flex text-slate-800 font-sans overflow-hidden">
    <Sidebar @toggleMenu="isMobileMenuOpen = !isMobileMenuOpen" @triggerToast="triggerToast" />

    <main class="flex-1 flex flex-col h-screen overflow-hidden bg-[#f4f7fb] relative">
      <TopHeader @toggleMenu="isMobileMenuOpen = !isMobileMenuOpen" @triggerToast="triggerToast" />

      <div class="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
        <div class="mb-8 flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Brain class="w-6 h-6 text-purple-600" /> BI Intelligence Reports
            </h1>
            <p class="text-sm font-medium text-slate-500 mt-1">Generate and schedule automated business intelligence exports.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <!-- Report Generator Card -->
            <div class="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div class="p-8 border-b border-slate-50 bg-slate-50/30">
                    <h3 class="font-black text-slate-900 uppercase tracking-widest text-[11px] mb-6">Custom Report Builder</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label class="text-[11px] font-black text-slate-400 uppercase tracking-wider">Metric Context</label>
                            <select class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                                <option>Revenue Analytics</option>
                                <option>Expense Tracking</option>
                                <option>Customer Growth</option>
                                <option>Operational Efficiency</option>
                            </select>
                        </div>
                        <div class="space-y-2">
                            <label class="text-[11px] font-black text-slate-400 uppercase tracking-wider">Time Horizon</label>
                            <select class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                                <option>Last 30 Days</option>
                                <option>Last Quarter (Q1)</option>
                                <option>Year to Date</option>
                                <option>Custom Range</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="p-8 flex-1">
                    <div class="flex items-center justify-between mb-8">
                        <div>
                            <p class="text-sm font-bold text-slate-800">Automated AI Summary</p>
                            <p class="text-xs text-slate-500">Include executive breakdown in the export</p>
                        </div>
                        <div class="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
                            <div class="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        </div>
                    </div>
                    <button @click="generateReport" class="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-sm tracking-wide transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] flex items-center justify-center gap-3">
                        <FileText class="w-5 h-5" /> Compile Executive Report
                    </button>
                    <p class="text-[10px] text-center text-slate-400 font-bold uppercase tracking-[0.2em] mt-4">Security Protocol: AES-256 Encrypted PDF</p>
                </div>
            </div>

            <!-- Scheduled Reports -->
            <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                <h3 class="font-black text-slate-900 uppercase tracking-widest text-[11px] mb-6">Scheduled Exports</h3>
                <div class="space-y-6">
                    <div v-for="report in schedules" :key="report.name" class="p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-primary/20 transition-all">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-[10px] font-black px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-500 uppercase">{{ report.freq }}</span>
                            <Clock class="w-3.5 h-3.5 text-slate-300" />
                        </div>
                        <p class="text-sm font-bold text-slate-800">{{ report.name }}</p>
                        <p class="text-[11px] text-slate-400 mt-1">Next: {{ report.next }}</p>
                    </div>
                </div>
                <button @click="triggerToast('Schedule Engine is in Read-Only mode.')" class="w-full mt-8 py-3 border-2 border-dashed border-slate-200 text-slate-400 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:border-primary/20 hover:text-primary transition-all">
                    + Add New Schedule
                </button>
            </div>
        </div>

        <!-- Recent Downloads -->
        <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-slate-50 flex items-center justify-between">
                <h3 class="font-black text-slate-800 uppercase tracking-widest text-[11px]">Recent Manifests</h3>
                <button class="text-[11px] font-black text-primary uppercase">Clear History</button>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-slate-50/50">
                        <tr class="text-left border-b border-slate-100">
                            <th class="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Report Name</th>
                            <th class="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Generated</th>
                            <th class="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Size</th>
                            <th class="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Download</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                        <tr v-for="archive in archives" :key="archive.name" class="hover:bg-slate-50/50 transition-colors">
                            <td class="px-8 py-5">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center font-black text-[10px]">PDF</div>
                                    <span class="text-sm font-bold text-slate-800">{{ archive.name }}</span>
                                </div>
                            </td>
                            <td class="px-8 py-5 text-xs font-bold text-slate-500">{{ archive.date }}</td>
                            <td class="px-8 py-5 text-xs font-bold text-slate-400 uppercase">{{ archive.size }}</td>
                            <td class="px-8 py-5 text-right">
                                <button @click="generateReport" class="p-2 text-slate-400 hover:text-primary transition-colors"><Download class="w-4 h-4" /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </main>

    <transition name="toast-slide">
      <div v-if="toastState.show" class="fixed bottom-10 right-10 z-[100] bg-slate-900 text-white px-5 py-4 rounded-xl shadow-2xl flex items-start gap-4">
        <p class="text-xs font-bold">{{ toastState.message }}</p>
        <button @click="toastState.show = false"><X class="w-4 h-4"/></button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Brain, FileText, Download, Clock, X } from 'lucide-vue-next'
import Sidebar from '../components/dashboard/Sidebar.vue'
import TopHeader from '../components/dashboard/TopHeader.vue'

const isMobileMenuOpen = ref(false)
const toastState = ref({ show: false, message: '' })

const triggerToast = (msg) => {
  toastState.value = { show: true, message: msg }
  setTimeout(() => { toastState.value.show = false }, 3000)
}

const generateReport = () => {
    triggerToast("System compiling high-fidelity data manifest...")
    setTimeout(() => {
        triggerToast("Report 'DigyNex_360_Vault_Q1.pdf' has been dispatched for download.")
    }, 2500)
}

const schedules = [
    { name: 'Monthly Financial Audit', freq: 'Monthly', next: 'Apr 01, 2026' },
    { name: 'Weekly Performance Pivot', freq: 'Weekly', next: 'Monday, 8:00 AM' }
]

const archives = [
    { name: 'Q1 Performance Summary - Consolidated', date: 'Mar 24, 2026', size: '4.2 MB' },
    { name: 'Marketing ROI Analysis v2.1', date: 'Mar 22, 2026', size: '1.8 MB' },
    { name: 'Regional Revenue Distribution', date: 'Mar 15, 2026', size: '2.5 MB' }
]
</script>

<style scoped>
.toast-slide-enter-active, .toast-slide-leave-active { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.toast-slide-enter-from, .toast-slide-leave-to { opacity: 0; transform: translateY(20px) scale(0.95); }
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
</style>
