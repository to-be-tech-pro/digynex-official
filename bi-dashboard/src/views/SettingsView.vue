<template>
  <div class="h-screen bg-slate-50 flex text-slate-800 font-sans overflow-hidden">
    <Sidebar @toggleMenu="isMobileMenuOpen = !isMobileMenuOpen" @triggerToast="triggerToast" />

    <main class="flex-1 flex flex-col h-screen overflow-hidden bg-[#f4f7fb] relative">
      <TopHeader @toggleMenu="isMobileMenuOpen = !isMobileMenuOpen" @triggerToast="triggerToast" />

      <div class="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
        <!-- HEADER WITH TAB SWITCHER -->
        <div class="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 class="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Settings class="w-6 h-6 text-slate-400" /> Organization Settings
                </h1>
                <p class="text-sm font-medium text-slate-500 mt-1">Configure global business rules, tenant security, and personnel roles.</p>
            </div>
            
            <div class="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
                <button 
                  @click="activeTab = 'general'"
                  :class="activeTab === 'general' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'"
                  class="px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  Business Rules
                </button>
                <button 
                  @click="activeTab = 'personnel'"
                  :class="activeTab === 'personnel' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'"
                  class="px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                >
                  <Users class="w-3 h-3" /> Identity & Personnel
                </button>
            </div>
        </div>

        <!-- GENERAL TAB -->
        <div v-if="activeTab === 'general'" class="max-w-4xl space-y-8 mb-8 animate-[slideDown_0.3s_ease-out]">
            <!-- Basic Config -->
            <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 group overflow-hidden">
                <h3 class="font-black text-slate-900 uppercase tracking-widest text-[11px] mb-8 border-b border-slate-50 pb-4">Global Configuration</h3>
                <div class="space-y-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <div class="space-y-1 mt-1">
                            <p class="text-sm font-bold text-slate-800">Product Identity</p>
                            <p class="text-xs text-slate-400">Main brand name and version suffix.</p>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="flex-1 space-y-2">
                                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Primary Name</p>
                                <input type="text" v-model="brandingStore.productName" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-300">
                            </div>
                            <div class="w-24 space-y-2">
                                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Suffix (Color)</p>
                                <input type="text" v-model="brandingStore.productSuffix" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-300">
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-slate-50 pt-8">
                        <div class="space-y-1">
                            <p class="text-sm font-bold text-slate-800">Primary Currency</p>
                            <p class="text-xs text-slate-400">Display currency for financial analysis.</p>
                        </div>
                        <select v-model="selectedCurrency" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                            <option>LKR - Sri Lankan Rupee</option>
                            <option>SEK - Swedish Krona</option>
                            <option>USD - US Dollar</option>
                            <option>EUR - Euro</option>
                        </select>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-slate-50 pt-8">
                        <div class="space-y-1">
                            <p class="text-sm font-bold text-slate-800">Industry Vertical</p>
                            <p class="text-xs text-slate-400">Adaptive UI mode (Universal Labeling System).</p>
                        </div>
                        <div class="flex items-center gap-2 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200 shadow-inner overflow-hidden">
                            <button 
                                v-for="type in ['Project', 'Service', 'Education']" 
                                :key="type"
                                type="button"
                                @click="handleOrgTypeChange(type)"
                                :class="brandingStore.orgType === type ? 'bg-primary text-white shadow-xl' : 'text-slate-400 hover:text-slate-900'"
                                class="flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 transform active:scale-95"
                            >
                                {{ type }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- RBAC Access Simulation -->
            <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 group overflow-hidden">
                <h3 class="font-black text-slate-900 uppercase tracking-widest text-[11px] mb-8 border-b border-slate-50 pb-4 flex items-center gap-2">
                    <ShieldCheck class="w-4 h-4 text-primary" /> Session Role Simulation
                </h3>
                <div class="space-y-6">
                    <p class="text-xs text-slate-500 font-medium italic">Simulate different personnel views. This updates your current browser session only.</p>
                    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <button 
                            v-for="(label, role) in authStore.roleLabels" 
                            :key="role"
                            @click="changeRole(role)"
                            :class="authStore.user.role === role ? 'bg-primary text-white ring-4 ring-primary/10' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'"
                            class="flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 group/role"
                        >
                            <UserCheck :class="authStore.user.role === role ? 'text-white' : 'text-slate-400 group-hover/role:text-primary'" class="w-6 h-6 mb-2 transition-colors" />
                            <span class="text-[10px] font-black uppercase tracking-tight text-center">{{ role }}</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Danger Zone -->
            <div class="bg-red-50/50 rounded-3xl border border-red-100 p-8">
                <h3 class="font-black text-red-700 uppercase tracking-widest text-[11px] mb-4 flex items-center gap-2">
                    <ShieldAlert class="w-4 h-4 text-red-400" /> Enterprise Danger Zone
                </h3>
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div class="space-y-1">
                        <p class="text-sm font-bold text-red-900">Restore Cloud Database</p>
                        <p class="text-xs text-red-700/60 font-medium">Reset all transaction data to latest backup point.</p>
                    </div>
                    <button @click="triggerToast('Restoration Access Denied. Contact Root Admin.')" class="px-6 py-2.5 bg-white border border-red-200 text-red-700 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm flex items-center gap-2 group/rest">
                        <RotateCcw class="w-4 h-4 group-hover/rest:rotate-[-45deg] transition-transform" /> Initialize Reset
                    </button>
                </div>
            </div>
        </div>

        <!-- PERSONNEL MANAGEMENT TAB -->
        <div v-if="activeTab === 'personnel'" class="max-w-6xl animate-[slideUp_0.3s_ease-out] space-y-6">
            <!-- Stats & Filter Bar -->
            <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div class="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto max-w-full">
                    <button 
                        v-for="cat in ['All', 'Executives', 'Operations', 'Finance', 'Contractors']" 
                        :key="cat"
                        @click="currentPersonnelFilter = cat"
                        :class="currentPersonnelFilter === cat ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'"
                        class="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap"
                    >
                        {{ cat }}
                    </button>
                </div>
                <button 
                    v-if="authStore.user.role === 'ceo' || authStore.user.role === 'manager'"
                    @click="showAddUserModal = true" 
                    class="px-6 py-3 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                >
                    <Plus class="w-4 h-4" /> Index New Member
                </button>
            </div>

            <div class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden min-h-[500px] flex flex-col">
                <div class="p-6 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 class="text-sm font-black text-slate-900 uppercase tracking-widest">Personnel Roles & Access</h3>
                        <p class="text-[11px] text-slate-500 font-medium mt-1">Managing {{ filteredProfiles.length }} organization identities.</p>
                    </div>
                    <div class="relative w-full sm:w-80">
                         <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                         <input v-model="userSearch" type="text" placeholder="Search by name, email or ID..." class="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold outline-none focus:ring-4 focus:ring-primary/10 transition-all">
                    </div>
                </div>
                
                <div class="flex-1 overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="text-left border-b border-slate-50 bg-white">
                                <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Member Identity</th>
                                <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cloud Endpoint</th>
                                <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Cluster</th>
                                <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Last Sync</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50">
                            <tr v-for="profile in filteredProfiles" :key="profile.id" class="group hover:bg-slate-50/20 transition-colors">
                                <td class="px-8 py-6">
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 rounded-2xl bg-slate-800 text-white font-black flex items-center justify-center text-lg shadow-lg ring-4 ring-white group-hover:bg-primary transition-colors">
                                            {{ profile.name?.charAt(0) || 'U' }}
                                        </div>
                                        <div class="flex-1">
                                            <div class="flex items-center gap-2 group/name_edit">
                                                <input 
                                                    type="text" 
                                                    v-model="profile.name" 
                                                    @change="updateUserName(profile.id, profile.name)"
                                                    class="bg-transparent border-0 border-b border-transparent hover:border-slate-200 focus:border-primary focus:ring-0 text-sm font-black text-slate-900 px-0 py-0.5 transition-all outline-none"
                                                    placeholder="Set display name..."
                                                >
                                                <span v-if="!profile.name" class="text-[10px] text-slate-300 font-bold italic">(Missing Identity)</span>
                                            </div>
                                            <div class="flex items-center gap-1.5 mt-1">
                                                <span class="text-[9px] font-black px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded uppercase tracking-tighter border border-emerald-100">Live Hub</span>
                                                <span class="text-[9px] font-bold text-slate-400">ID: {{ profile.id.slice(0,8) }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-8 py-6 text-xs font-bold text-slate-500 font-mono">{{ profile.email }}</td>
                                <td class="px-8 py-6">
                                    <div class="flex items-center gap-2">
                                        <select 
                                            :value="profile.role" 
                                            @change="updateUserRole(profile.id, $event.target.value)"
                                            :class="getRoleBadgeClass(profile.role)"
                                            class="border-0 rounded-xl px-4 py-2 text-[11px] font-black uppercase tracking-tight focus:ring-4 focus:ring-primary/10 outline-none cursor-pointer transition-all shadow-sm"
                                        >
                                            <option v-for="(label, r) in authStore.roleLabels" :key="r" :value="r">{{ r.toUpperCase() }}</option>
                                        </select>
                                    </div>
                                </td>
                                <td class="px-8 py-6 text-right">
                                    <span class="text-[10px] font-black text-slate-400 uppercase italic">{{ new Date(profile.created_at).toLocaleDateString() }}</span>
                                </td>
                            </tr>
                            <tr v-if="filteredProfiles.length === 0">
                                <td colspan="4" class="px-8 py-24 text-center">
                                    <Users class="w-12 h-12 text-slate-100 mx-auto mb-4" />
                                    <p class="text-slate-400 font-bold italic text-sm">No personnel found in "{{ currentPersonnelFilter }}" cluster.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </main>

    <!-- INDEX NEW USER MODAL -->
    <transition name="modal-fade">
      <div v-if="showAddUserModal" class="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-md" @click="showAddUserModal = false"></div>
        <div class="bg-white w-full max-w-xl rounded-[32px] shadow-2xl relative z-20 overflow-hidden animate-[slideUp_0.4s_cubic-bezier(0.16, 1, 0.3, 1)]">
            <div class="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div>
                   <h3 class="text-2xl font-black text-slate-900 tracking-tight italic">Index New Identity</h3>
                   <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Cross-App Strategic Directory Sync</p>
                </div>
                <button @click="showAddUserModal = false" class="p-2 hover:bg-slate-100 rounded-full transition-colors"><X class="w-6 h-6 text-slate-400" /></button>
            </div>
            
            <div class="p-8 space-y-6">
                <div class="grid grid-cols-2 gap-6">
                   <div class="space-y-2">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Legal Name</label>
                        <input v-model="newUser.name" type="text" placeholder="e.g. Ruwan Silva" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm font-bold focus:ring-4 focus:ring-primary/10 outline-none transition-all">
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assigned Role</label>
                        <select v-model="newUser.role" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm font-bold focus:ring-4 focus:ring-primary/10 outline-none transition-all">
                            <option v-for="(label, r) in authStore.roleLabels" :key="r" :value="r">{{ r.toUpperCase() }}</option>
                        </select>
                    </div>
                </div>
                
                <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Endpoint Email</label>
                    <input v-model="newUser.email" type="email" placeholder="identity@domain.com" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm font-bold focus:ring-4 focus:ring-primary/10 outline-none transition-all">
                </div>

                <div class="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                    <p class="text-[10px] text-primary font-bold flex items-center gap-2">
                        <Info class="w-4 h-4" /> This will create a global profile accessible across CSM and TSM nodes.
                    </p>
                </div>
            </div>

            <div class="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                <button @click="showAddUserModal = false" class="flex-1 py-4 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">Discard</button>
                <button @click="handleIndexUser" :disabled="!newUser.name || !newUser.email || isAddingUser" class="flex-[1.5] py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-slate-900/30 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-3">
                    <Loader2 v-if="isAddingUser" class="w-4 h-4 animate-spin" />
                    <Send v-else class="w-4 h-4" />
                    Propagate Identity
                </button>
            </div>
        </div>
      </div>
    </transition>

    <transition name="toast-slide">
      <div v-if="toastState.show" class="fixed bottom-10 right-10 z-[2000] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-start gap-4 ring-1 ring-white/10 max-w-sm">
        <div class="mt-0.5 p-1.5 bg-primary/20 rounded-lg text-primary ring-1 ring-primary/40"><Zap class="w-4 h-4"/></div>
        <p class="text-xs font-bold leading-relaxed">{{ toastState.message }}</p>
        <button @click="toastState.show = false" class="ml-2 hover:opacity-70"><X class="w-4 h-4"/></button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Settings, X, Loader2, RotateCcw, ShieldAlert, ShieldCheck, UserCheck, Zap, Send, Users, Search, Bell, Plus, Info } from 'lucide-vue-next'
import Sidebar from '../components/dashboard/Sidebar.vue'
import TopHeader from '../components/dashboard/TopHeader.vue'

import { brandingStore, setBranding } from '../services/brandingService'
import { authStore, setRole } from '../services/authService'
import { supabase } from '../services/supabase'

const activeTab = ref('personnel') // Defaulting to personnel for user review
const isMobileMenuOpen = ref(false)
const toastState = ref({ show: false, message: '' })
const userSearch = ref('')
const currentPersonnelFilter = ref('All')

const showAddUserModal = ref(false)
const isAddingUser = ref(false)
const newUser = ref({ name: '', email: '', role: 'staff' })

const profiles = ref([])

// Role Badge Styling
const getRoleBadgeClass = (role) => {
    switch(role) {
        case 'ceo': return 'bg-slate-900 text-white border-slate-800'
        case 'manager': return 'bg-indigo-50 text-indigo-600 border-indigo-100'
        case 'finance': return 'bg-amber-50 text-amber-600 border-amber-100'
        case 'subcontractor': return 'bg-emerald-50 text-emerald-600 border-emerald-100'
        default: return 'bg-slate-100 text-slate-500 border-slate-200'
    }
}

// Personnel Tab Logic
const filteredProfiles = computed(() => {
    let base = profiles.value.filter(p => 
        p.name?.toLowerCase().includes(userSearch.value.toLowerCase()) || 
        p.email?.toLowerCase().includes(userSearch.value.toLowerCase()) ||
        p.id?.toLowerCase().includes(userSearch.value.toLowerCase())
    )

    if (currentPersonnelFilter.value === 'Executives') {
        base = base.filter(p => p.role === 'ceo' || p.role === 'manager')
    } else if (currentPersonnelFilter.value === 'Operations') {
        base = base.filter(p => p.role === 'staff')
    } else if (currentPersonnelFilter.value === 'Finance') {
        base = base.filter(p => p.role === 'finance')
    } else if (currentPersonnelFilter.value === 'Contractors') {
        base = base.filter(p => p.role === 'subcontractor')
    }

    return base
})

const fetchProfiles = async () => {
    const { data } = await supabase.from('profiles').select('*').order('name', { ascending: true })
    profiles.value = data || []
}

const handleIndexUser = async () => {
    if (!newUser.value.name || !newUser.value.email) {
        triggerToast("Incomplete Data: Legal Name and Endpoint Email are mandatory.")
        return
    }

    // Check for obvious duplicates in local state first
    const exists = profiles.value.find(p => p.email.toLowerCase() === newUser.value.email.toLowerCase())
    if (exists) {
        triggerToast(`Conflicting Entry: [${newUser.value.email}] is already linked to ${exists.name}.`)
        return
    }

    isAddingUser.value = true
    try {
        // We use a random UUID to ensure insertion doesn't fail due to missing ID
        const payload = {
            id: crypto.randomUUID(),
            name: newUser.value.name,
            email: newUser.value.email,
            role: newUser.value.role,
            status: 'Active',
            created_at: new Date().toISOString()
        }

        const { error } = await supabase.from('profiles').insert([payload])
        
        if (error) {
            // Check for duplicate key error specifically from Supabase
            if (error.code === '23505') throw new Error("This email is already registered in the Global Strategic Directory.")
            throw error
        }
        
        triggerToast(`Success: [${newUser.value.name}] Identity Propagated to Cloud Cluster.`)
        
        // Refresh local memory
        await fetchProfiles()
        
        // Reset and close UI immediately
        showAddUserModal.value = false
        newUser.value = { name: '', email: '', role: 'staff' }
        currentPersonnelFilter.value = 'All'
        
    } catch (err) {
        console.error("Supabase Propagation Error:", err)
        triggerToast(`Critical Error: ${err.message || 'Cloud sync failed.'}`)
    } finally {
        isAddingUser.value = false
    }
}

const updateUserName = async (profileId, newName) => {
    try {
        const { error } = await supabase.from('profiles').update({ name: newName }).eq('id', profileId)
        if (error) throw error
        triggerToast("Personnel Identity renamed in Cloud Directory.")
    } catch (err) {
        console.error(err)
        triggerToast("Failed to sync new Name.")
    }
}

const updateUserRole = async (profileId, newRole) => {
    try {
        const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', profileId)
        if (error) throw error
        
        // Update local state
        const idx = profiles.value.findIndex(p => p.id === profileId)
        if (idx !== -1) profiles.value[idx].role = newRole
        
        triggerToast("Access privileges updated in real-time across all nodes.")
    } catch (err) {
        console.error(err)
        triggerToast("Failed to propagate Role change.")
    }
}

// Global Tab Logic
const selectedCurrency = ref('LKR - Sri Lankan Rupee')

const handleOrgTypeChange = (type) => {
    brandingStore.orgType = type
    triggerToast(`Cluster Optimized: UI successfully re-indexed for ${type} operations.`)
}

const changeRole = (role) => {
    setRole(role)
    triggerToast(`Identity Switched: Now viewing as ${authStore.roleLabels[role]}`)
}

const triggerToast = (msg) => {
  toastState.value = { show: true, message: msg }
  setTimeout(() => { toastState.value.show = false }, 3000)
}

onMounted(async () => {
    fetchProfiles()
    
    const mapping = { 'LKR': 'LKR - Sri Lankan Rupee', 'SEK': 'SEK - Swedish Krona', 'USD': 'USD - US Dollar', 'EUR': 'EUR - Euro' }
    selectedCurrency.value = mapping[brandingStore.currency] || 'LKR - Sri Lankan Rupee'
    
    const { data: org } = await supabase.from('organizations').select('*').eq('slug', 'digynex-hq').single()
    if (org) {
        setBranding({
            companyName: org.name,
            org_type: org.org_type,
            planTier: org.plan_tier || 'Business'
        })
    }
})
</script>

<style scoped>
.toast-slide-enter-active, .toast-slide-leave-active { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.toast-slide-enter-from, .toast-slide-leave-to { opacity: 0; transform: translateY(20px) scale(0.95); }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }

@keyframes slideDown { from { transform: translateY(-10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes slideUp { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

.modal-fade-enter-active, .modal-fade-leave-active { transition: all 0.2s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>
