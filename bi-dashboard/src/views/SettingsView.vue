<template>
  <div class="h-screen bg-slate-50 flex text-slate-800 font-sans overflow-hidden">
    <Sidebar @toggleMenu="isMobileMenuOpen = !isMobileMenuOpen" @triggerToast="triggerToast" />

    <main class="flex-1 flex flex-col h-screen overflow-hidden bg-[#f4f7fb] relative">
      <TopHeader @toggleMenu="isMobileMenuOpen = !isMobileMenuOpen" @triggerToast="triggerToast" />

      <div class="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
        <div class="mb-8">
            <h1 class="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Settings class="w-6 h-6 text-slate-400" /> Organization Settings
            </h1>
            <p class="text-sm font-medium text-slate-500 mt-1">Configure global business rules, tenant security, and audit protocols.</p>
        </div>

        <div class="max-w-4xl space-y-8 mb-8">
            <!-- Basic Config -->
            <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 group">
                <h3 class="font-black text-slate-900 uppercase tracking-widest text-[11px] mb-8 border-b border-slate-50 pb-4">Global Configuration</h3>
                <div class="space-y-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div class="space-y-1">
                            <p class="text-sm font-bold text-slate-800">Product Identity</p>
                            <p class="text-xs text-slate-400">Main branding name across dashboard.</p>
                        </div>
                        <input type="text" value="DigyNex 360" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-300">
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-slate-50 pt-8">
                        <div class="space-y-1">
                            <p class="text-sm font-bold text-slate-800">Primary Currency</p>
                            <p class="text-xs text-slate-400">Display currency for financial analysis.</p>
                        </div>
                        <select class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                            <option>LKR - Sri Lankan Rupee</option>
                            <option>USD - US Dollar</option>
                            <option>AED - UAE Dirham</option>
                        </select>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-slate-50 pt-8">
                        <div class="space-y-1">
                            <p class="text-sm font-bold text-slate-800">Security Audit Logs</p>
                            <p class="text-xs text-slate-400">Strict mode session recording levels.</p>
                        </div>
                        <div class="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-100">
                            <button class="flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase text-slate-400">Minimal</button>
                            <button class="flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase bg-slate-900 text-white shadow-md">Standard</button>
                            <button class="flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase text-slate-400">Strict</button>
                        </div>
                    </div>
                </div>
                <div class="mt-12 flex justify-end">
                    <button @click="triggerToast('Cloud configuration persist protocol updated.')" class="px-8 py-3 bg-primary hover:bg-blue-600 text-white rounded-xl text-sm font-black transition-all shadow-xl shadow-primary/20 active:scale-95">Save Changes</button>
                </div>
            </div>

            <!-- Danger Zone -->
            <div class="bg-red-50/50 rounded-3xl border border-red-100 p-8">
                <h3 class="font-black text-red-700 uppercase tracking-widest text-[11px] mb-4">Enterprise Danger Zone</h3>
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div class="space-y-1">
                        <p class="text-sm font-bold text-red-900">Restore Cloud Database</p>
                        <p class="text-xs text-red-700/60 font-medium">Reset all transaction data to latest backup point.</p>
                    </div>
                    <button @click="triggerToast('Restoration Access Denied. Contact Root Admin.')" class="px-6 py-2.5 bg-white border border-red-200 text-red-700 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm">Initialize Reset</button>
                </div>
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
import { Settings, X } from 'lucide-vue-next'
import Sidebar from '../components/dashboard/Sidebar.vue'
import TopHeader from '../components/dashboard/TopHeader.vue'

const isMobileMenuOpen = ref(false)
const toastState = ref({ show: false, message: '' })

const triggerToast = (msg) => {
  toastState.value = { show: true, message: msg }
  setTimeout(() => { toastState.value.show = false }, 3000)
}
</script>

<style scoped>
.toast-slide-enter-active, .toast-slide-leave-active { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.toast-slide-enter-from, .toast-slide-leave-to { opacity: 0; transform: translateY(20px) scale(0.95); }
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
</style>
