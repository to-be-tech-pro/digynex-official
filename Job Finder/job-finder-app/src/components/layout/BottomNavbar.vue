<script setup>
import { 
  LayoutDashboard, FileText, Star, User, Search, 
  MapPin, Settings, HelpCircle, Heart
} from 'lucide-vue-next'

const props = defineProps({
  t: Function,
  activeTab: String
})

const emit = defineEmits(['setTab', 'openDiscovery'])

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'nav.dashboard' },
  { id: 'applications', icon: Search, label: 'nav.tasks' },
  { id: 'studio', icon: FileText, label: 'nav.studio' },
  { id: 'saved', icon: Star, label: 'nav.saved' },
  { id: 'profile', icon: User, label: 'nav.expert' }
]

</script>

<template>
  <nav class="absolute bottom-6 left-6 right-6 h-[72px] bg-white/95 backdrop-blur-3xl rounded-[2.2rem] flex items-center justify-around px-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white z-[800] ring-1 ring-black/[0.03]">
     <div v-for="item in navItems" :key="item.id"
          @click="emit('setTab', item.id)"
          :class="activeTab === item.id ? 'text-[#0A2647] scale-110' : 'text-[#0A2647]/30 hover:text-[#0A2647]/60'"
          class="flex flex-col items-center gap-1.5 transition-all duration-500 cursor-pointer group relative">
        
        <div class="relative">
           <component :is="item.icon" class="w-[22px] h-[22px] transition-all duration-500 group-active:scale-75" 
                      :class="activeTab === item.id ? 'stroke-[2.5px]' : 'stroke-[1.8px]'" />
           <div v-if="activeTab === item.id" class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#0A2647] rounded-full animate-in zoom-in duration-500"></div>
        </div>
        <span class="text-[7.5px] font-black uppercase tracking-[0.15em] transition-all duration-500"
              :class="activeTab === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'">
           {{ t(item.label) }}
        </span>
     </div>

     <!-- FAB: Discovery Recalibration -->
     <div @click="emit('openDiscovery')" class="absolute -top-8 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-[#0A2647] to-[#144272] rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(10,38,71,0.4)] border-4 border-[#BDDAFA]/20 cursor-pointer hover:scale-110 active:scale-90 transition-all group z-[900]">
        <MapPin class="w-6 h-6 text-[#C1A172] group-hover:rotate-12 transition-transform" />
        <!-- Floating Pulse Ring -->
        <div class="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20"></div>
     </div>
  </nav>
</template>
