<script setup>
import { ref, computed } from 'vue'
import { 
  ShieldCheck, Zap, Lock, Users, DollarSign, Activity, 
  ArrowRight, Search, Edit3, Trash2, Bell, AlertTriangle, 
  ChevronRight, Sparkles, TrendingUp, PieChart, RefreshCw, X
} from 'lucide-vue-next'
import { Line, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend, LineElement, 
  LinearScale, PointElement, CategoryScale, ArcElement, Filler
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, ArcElement, Filler)

const props = defineProps({
  t: Function,
  userProfile: Object,
  isMaintenanceMode: Boolean
})

const emit = defineEmits(['update:isMaintenanceMode', 'setTab', 'sendNotification', 'purgeData', 'updateUserTier'])

// --- AUTHENTICATION GATE ---
const isAdminAuthenticated = ref(false)
const adminPin = ref('')
const neuralKey = 'master333'
const authError = ref('')

const authenticateAdmin = () => {
    if (adminPin.value === neuralKey) {
        isAdminAuthenticated.value = true
        authError.value = ''
    } else {
        authError.value = 'NEURAL KEY REJECTED. IDENTITY NOT VERIFIED.'
        adminPin.value = ''
    }
}

// --- TELEMETRY MOCK DATA ---
const stats = ref([
    { id: 'revenue', label: 'Total Revenue', value: '$12,450', trend: '+12%', icon: DollarSign, color: '#C1A172' },
    { id: 'users', label: 'Active Users', value: '1,280', trend: '+5%', icon: Users, color: '#38BDF8' },
    { id: 'tokens', label: 'AI Burn (Tokens)', value: '8.4M', trend: '-2%', icon: Zap, color: '#F472B6' }
])

const userSearch = ref('')
const users = ref([
    { id: 1, name: 'Amila W.', email: 'amilawijayantha858@gmail.com', tier: 'Elite', lastSeen: 'Today', joined: '2026-01-10' },
    { id: 2, name: 'Sven Svensson', email: 'sven@example.se', tier: 'Pro', lastSeen: '2h ago', joined: '2026-03-22' },
    { id: 3, name: 'Alpha Tester', email: 'test@digynex.se', tier: 'Free', lastSeen: '1d ago', joined: '2026-04-01' }
])

const filteredUsers = computed(() => {
    return users.value.filter(u => 
        u.name.toLowerCase().includes(userSearch.value.toLowerCase()) || 
        u.email.toLowerCase().includes(userSearch.value.toLowerCase())
    )
})

// --- CHART CONFIGS ---
const growthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [{
        label: 'Growth',
        data: [400, 700, 600, 1280],
        borderColor: '#C1A172',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        backgroundColor: 'rgba(193, 161, 114, 0.1)',
        pointRadius: 4,
        pointBackgroundColor: '#C1A172'
    }]
}

const distributionData = {
    labels: ['Elite', 'Pro', 'Free'],
    datasets: [{
        data: [15, 25, 60],
        backgroundColor: ['#C1A172', '#38BDF8', '#64748B'],
        borderWidth: 0,
        hoverOffset: 10
    }]
}

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        x: { display: false },
        y: { display: false }
    }
}

// --- OVERRIDE UTILS ---
const updateTier = (userId, newTier) => {
    const user = users.value.find(u => u.id === userId)
    if (user) user.tier = newTier
}

const handleQuickAction = (action) => {
    if (action.l.includes('Broadcast')) emit('sendNotification', 'Global Strategy Update Broadcasted')
    if (action.l.includes('Purge')) emit('purgeData')
    if (action.l.includes('Sync')) emit('sendNotification', 'Cloud Telemetry Synchronized')
}

</script>

<template>
  <div class="flex-1 bg-[#051124] min-h-0 flex flex-col relative overflow-hidden">
     <!-- BACKGROUND AMBIANCE -->
     <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(193,161,114,0.05),_transparent_40%)]"></div>

     <!-- HEADER -->
     <div class="shrink-0 p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02] backdrop-blur-xl relative z-10">
        <div class="flex items-center gap-4">
           <div class="bg-[#C1A172] p-2.5 rounded-2xl shadow-2xl shadow-[#C1A172]/20">
              <ShieldCheck class="w-6 h-6 text-[#0A2647]" />
           </div>
           <div>
              <h1 class="text-[18px] font-black text-white uppercase tracking-tighter">Neural Master Control</h1>
              <p class="text-[10px] font-bold text-[#C1A172]/60 uppercase tracking-widest">{{ isAdminAuthenticated ? 'System Strategy Active' : 'Restricted Access Protocol' }}</p>
           </div>
        </div>
        <button v-if="isAdminAuthenticated" @click="emit('setTab', 'profile')" class="p-2 bg-white/5 rounded-full hover:bg-white/10 text-white/50">
           <X class="w-5 h-5" />
        </button>
     </div>

     <!-- AUTHENTICATION GATE -->
     <div v-if="!isAdminAuthenticated" class="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-20 animate-in fade-in zoom-in duration-700">
        <div class="w-24 h-24 bg-gradient-to-br from-[#0A2647] to-[#051124] rounded-[2.5rem] border border-white/10 flex items-center justify-center shadow-3xl mb-8 relative group">
           <div class="absolute inset-0 bg-[#C1A172]/10 rounded-full blur-2xl group-hover:bg-[#C1A172]/20 transition-all duration-1000"></div>
           <Lock class="w-10 h-10 text-[#C1A172] animate-pulse" />
        </div>
        
        <div class="max-w-xs w-full space-y-6">
           <div class="space-y-2">
              <h2 class="text-[20px] font-black text-white uppercase tracking-widest">Master Identity</h2>
              <p class="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Enter Neural Key to establish control</p>
           </div>

           <div class="space-y-4">
              <div class="relative">
                 <input v-model="adminPin" 
                        type="password" 
                        placeholder="••••••••" 
                        @keyup.enter="authenticateAdmin"
                        class="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-center text-[22px] font-black text-[#C1A172] tracking-[0.5em] focus:outline-none focus:border-[#C1A172]/50 transition-all placeholder:text-white/10" />
                 <p v-if="authError" class="text-[9px] font-black text-red-400 uppercase mt-2 animate-bounce">{{ authError }}</p>
              </div>
              
              <button @click="authenticateAdmin" class="w-full py-4 bg-[#C1A172] text-[#0A2647] text-[12px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">
                 Establish Neural Link
              </button>
              
              <button @click="emit('setTab', 'profile')" class="text-[10px] font-bold text-white/20 uppercase tracking-widest hover:text-white transition-colors pt-2">
                 Abort Protocol
              </button>
           </div>
        </div>
     </div>

     <!-- SYSTEM DASHBOARD -->
     <div v-else class="flex-1 overflow-y-auto no-scrollbar p-6 pb-32 space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
        
        <!-- TOP LEVEL METRICS (Vertical Pack View) -->
        <div class="grid grid-cols-1 gap-2 w-full">
           <div v-for="stat in stats" :key="stat.id" class="px-4 py-2.5 bg-[#0A2647] border border-white/[0.03] rounded-3xl flex items-center justify-between group hover:bg-white/[0.02] transition-all shadow-lg">
              <div class="flex items-center gap-3">
                 <div :style="`background: ${stat.color}15`" class="w-9 h-9 rounded-xl flex items-center justify-center border border-white/5">
                    <component :is="stat.icon" class="w-3.5 h-3.5" :style="`color: ${stat.color}`" />
                 </div>
                 <div class="flex flex-col">
                    <span class="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] leading-none mb-1">{{ stat.label }}</span>
                    <p class="text-[20px] font-black text-white tracking-tighter leading-none">{{ stat.value }}</p>
                 </div>
              </div>
              <div :class="stat.trend.startsWith('+') ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'" 
                   class="px-2 py-0.5 rounded text-[7.5px] font-black tracking-widest">
                 {{ stat.trend }}
              </div>
           </div>
        </div>

        <!-- VISUAL ANALYTICS (Full Width Impulse + Horizontal Tiers) -->
        <div class="w-full bg-white/5 border border-white/5 rounded-[2.5rem] p-6 flex flex-col">
           <div class="flex items-center justify-between mb-4">
              <span class="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">User Growth Impulse (Global)</span>
              <div class="flex items-center gap-4">
                 <div class="flex items-center gap-1.5">
                    <div class="w-1.5 h-1.5 rounded-full bg-[#C1A172]"></div>
                    <span class="text-[8px] font-black text-white/40 uppercase">Identity Growth</span>
                 </div>
                 <TrendingUp class="w-3.5 h-3.5 text-[#C1A172]/50" />
              </div>
           </div>
           
           <!-- FULL WIDTH CHART -->
           <div class="h-40 w-full mb-6">
              <Line :data="growthData" :options="chartOptions" />
           </div>

           <!-- HORIZONTAL SPECIMEN TIERS (Relocated Live Sync) -->
           <div class="pt-6 border-t border-white/5 flex flex-col gap-5">
              <div class="flex items-center justify-between">
                 <div class="flex flex-col gap-1">
                    <span class="text-[11px] font-black text-white/60 uppercase tracking-widest">Specimen Tiers</span>
                    <p class="text-[9px] font-bold text-[#C1A172]/70 uppercase tracking-wider">Global Strategic Distribution</p>
                 </div>
                 <div class="flex items-center gap-2 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    <div class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    <span class="text-[8px] font-black text-white/40 uppercase tracking-widest">Live Sync</span>
                 </div>
              </div>
              
              <div class="flex items-center justify-between">
                 <div v-for="tier in [{l: 'Elite', v: '15%', c: '#C1A172'}, {l: 'Pro', v: '25%', c: '#38BDF8'}, {l: 'Free', v: '60%', c: '#64748B'}]" 
                      :key="tier.l" 
                      class="flex items-center gap-3 group/tier shrink-0">
                    <div :style="`background: ${tier.c}`" class="w-1.5 h-10 rounded-full shadow-[0_0_15px_-4px] shadow-white/10"></div>
                    <div class="flex flex-col">
                       <span class="text-[22px] font-black text-white leading-none tracking-tighter">{{ tier.v }}</span>
                       <span class="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] mt-0.5">{{ tier.l }}</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- SYSTEM LOGISTICS (Ultra-Extreme Pack View) -->
        <div class="space-y-2">
           <!-- Maintenance Rail (Enhanced Visibility) -->
           <div class="px-4 py-2 bg-[#C1A172]/10 border border-[#C1A172]/20 rounded-[1.8rem] flex items-center justify-between group transition-all hover:bg-[#C1A172]/15">
              <div class="flex items-center gap-3">
                 <div class="w-9 h-9 bg-[#C1A172]/20 rounded-[1.2rem] flex items-center justify-center border border-[#C1A172]/40">
                    <AlertTriangle class="w-3.5 h-3.5 text-[#C1A172]" />
                 </div>
                 <div class="flex flex-col">
                    <span class="text-[10px] font-black text-[#C1A172] uppercase tracking-widest leading-none mb-0.5">Maintenance Mode</span>
                    <p class="text-[7.5px] font-bold text-[#C1A172]/50 uppercase tracking-widest">Global Interaction Lock</p>
                 </div>
              </div>
              
              <button @click="emit('update:isMaintenanceMode', !isMaintenanceMode)" 
                      :class="isMaintenanceMode ? 'bg-[#C1A172] text-[#0A2647] shadow-[0_0_15px_rgba(193,161,114,0.3)]' : 'bg-white/5 text-white/30'"
                      class="px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all active:scale-95">
                 {{ isMaintenanceMode ? 'DEACTIVATE' : 'ACTIVATE' }}
              </button>
           </div>
           
           <!-- Quick Action Stack (Compressed Parity) -->
           <div class="flex flex-col gap-1.5">
              <button v-for="action in [
                 {l: 'Broadcast Strategy', s: 'Neural Alert', i: Bell, c: '#818CF8'}, 
                 {l: 'Purge Test Specs', s: 'Recalibration', i: Trash2, c: '#F87171'}, 
                 {l: 'Force Cloud Sync', s: 'Refresh', i: RefreshCw, c: '#34D399'}
              ]" 
              :key="action.l"
              @click="handleQuickAction(action)"
              class="px-4 py-1.5 bg-white/[0.03] border border-white/[0.05] rounded-[1.5rem] flex items-center justify-between group transition-all hover:bg-white/[0.08]">
                 <div class="flex items-center gap-3">
                    <div :style="`background: ${action.c}15`" class="w-8 h-8 rounded-xl flex items-center justify-center border border-white/5">
                       <component :is="action.i" :style="`color: ${action.c}`" class="w-3 h-3 group-hover:scale-110 transition-transform" />
                    </div>
                    <div class="flex flex-col text-left">
                       <span class="text-[9px] font-black text-white/60 uppercase tracking-widest leading-none mb-0.5">{{ action.l }}</span>
                       <span class="text-[7px] font-bold text-white/20 uppercase tracking-widest">{{ action.s }}</span>
                    </div>
                 </div>
                 <ChevronRight class="w-2.5 h-2.5 text-white/10 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>
           </div>
        </div>

        <!-- USER SPECIMEN MANAGEMENT (Refined Header & Guarded Boundaries) -->
        <div class="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
           <div class="p-3 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <span class="text-[10px] font-black text-white/70 uppercase tracking-[0.15em]">ACTIVE SPECIMENS ({{ filteredUsers.length }})</span>
              
              <div class="relative flex items-center gap-2">
                 <div class="bg-white/5 border border-white/10 rounded-full flex items-center px-2 py-1">
                    <Users class="w-2.5 h-2.5 text-[#C1A172] mr-2" />
                    <input v-model="userSearch" type="text" placeholder="Search..." class="bg-transparent text-[9px] text-white focus:outline-none w-24 placeholder:text-white/20" />
                 </div>
              </div>
           </div>
           
           <div class="overflow-x-auto no-scrollbar">
              <table class="w-full text-left border-collapse">
                 <thead>
                    <tr class="border-b border-white/5 bg-white/[0.01]">
                       <th class="px-3 py-3 text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">Specimen</th>
                       <th class="px-3 py-3 text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">Tier</th>
                       <th class="px-3 py-3 text-[8px] font-black text-white/30 uppercase tracking-[0.2em] text-right pr-5">Actions</th>
                    </tr>
                 </thead>
                 <tbody class="divide-y divide-white/[0.02]">
                    <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-white/[0.04] transition-colors">
                       <td class="px-3 py-2">
                          <div class="flex flex-col">
                             <span class="text-[11px] font-bold text-white leading-tight">{{ user.name }}</span>
                             <span class="text-[8px] font-medium text-white/20 truncate max-w-[90px]">{{ user.email }}</span>
                          </div>
                       </td>
                       <td class="px-3 py-2">
                          <div :class="{
                            'bg-[#C1A172]/20 text-[#C1A172]': user.tier === 'Elite',
                            'bg-[#38BDF8]/20 text-[#38BDF8]': user.tier === 'Pro',
                            'bg-white/10 text-white/40': user.tier === 'Free'
                          }" class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest inline-flex">
                             {{ user.tier }}
                          </div>
                       </td>
                       <td class="px-3 py-2 pr-5">
                          <div class="flex items-center justify-end gap-1">
                             <button @click="updateTier(user.id, 'Elite')" class="w-6.5 h-6.5 bg-white/10 rounded-lg flex items-center justify-center text-white/40 hover:text-[#C1A172] hover:bg-[#C1A172]/20 transition-all">
                                <Sparkles class="w-3 h-3" />
                             </button>
                             <button class="w-6.5 h-6.5 bg-white/10 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/20 transition-all">
                                <Edit3 class="w-3 h-3" />
                             </button>
                             <button class="w-6.5 h-6.5 bg-white/10 rounded-lg flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-500/20 transition-all">
                                <AlertTriangle class="w-3 h-3" />
                             </button>
                          </div>
                       </td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>
     </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
