<script setup>
import { 
  Sparkles, Check, Maximize2, Lock, Plus, X, RefreshCw 
} from 'lucide-vue-next'

const props = defineProps({
  t: Function,
  userProfile: Object,
  masterProfile: Object,
  cvTemplates: Array,
  selectedTemplate: Number,
  viewportHtml: String,
  isStealthUnlocked: Boolean,
  isAnalyzingKeywords: Boolean,
  isSavingProfile: Boolean,
  isBrandingSyncing: Boolean,
  colorPresets: Array
})

const emit = defineEmits([
  'update:selectedTemplate', 'selectTemplate', 'removeSecretKeyword', 'addSecretKeyword', 'analyzeKeywords', 'selectPreset', 'saveProfile'
])

const selectTemplate = (t) => emit('selectTemplate', t)
const removeSecretKeyword = (k) => emit('removeSecretKeyword', k)
const addSecretKeyword = () => emit('addSecretKeyword')
const analyzeAndSuggestKeywords = () => emit('analyzeKeywords')
const selectPreset = (p) => emit('selectPreset', p)
const saveProfile = () => emit('saveProfile')

// Proxy local model to parent
const updateSelectedTemplate = (id) => emit('update:selectedTemplate', id)

</script>

<template>
  <div class="flex flex-col h-full overflow-hidden animate-in fade-in slide-in-from-right-10 duration-500 pb-[90px]">
    <!-- Top Branding Hub -->
    <header class="flex flex-col items-center pt-[18px] space-y-4 w-full relative z-[600]">
      <div class="p-0.5 bg-white/10 rounded-full shrink-0">
         <img src="/digynex-icon.png" alt="DigyNex" class="h-8 w-auto opacity-50 contrast-125" />
      </div>
      <div class="flex flex-col items-center mb-1">
         <h2 class="text-[14px] font-black text-white/40 uppercase tracking-[0.3em] leading-none">CV Studio</h2>
         <div v-if="userProfile.isSuperUser" class="mt-2 px-3 py-1 bg-[#C1A172]/10 border border-[#C1A172]/20 rounded-full flex items-center gap-2 animate-in slide-in-from-top-2 duration-500">
            <div class="w-1 h-1 rounded-full bg-[#C1A172] animate-pulse shadow-[0_0_8px_#C1A172]"></div>
            <span class="text-[7px] font-black text-[#C1A172] uppercase tracking-[0.2em]">Super User Sync Active</span>
         </div>
      </div>
    </header>

    <div class="mt-6 flex-1 overflow-y-auto space-y-6 px-4 custom-scrollbar">
       <!-- 1. TEMPLATE GALLERY (HORIZONTAL) -->
       <div class="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-3xl rounded-[2.5rem] p-6 border border-white/10 shadow-2xl overflow-visible group relative">
          <div class="flex justify-between items-center mb-3">
             <div class="flex flex-col">
                <span class="text-[9px] font-black text-[#C1A172] uppercase tracking-[0.2em] mb-1">Elite Selection</span>
                <h3 class="text-[14px] font-black text-white tracking-tight">Template Gallery</h3>
             </div>
             <span class="text-[8px] font-bold text-white/20 uppercase tracking-widest">{{ cvTemplates.length }} Styles Active</span>
          </div>
          
          <div class="flex flex-nowrap gap-4 overflow-x-auto pb-10 -mx-4 px-4 snap-x snap-mandatory scroll-smooth min-h-[220px] custom-horizontal-scrollbar">
             <div v-for="t in cvTemplates" :key="t.id" 
                  @click="updateSelectedTemplate(t.id)"
                  class="w-[140px] h-[195px] bg-gradient-to-br from-white/10 to-white/5 rounded-[2rem] shrink-0 border-2 transition-all duration-500 cursor-pointer flex flex-col items-center justify-center relative overflow-hidden group/thumb snap-center"
                  :class="selectedTemplate === t.id ? 'scale-[1.05]' : 'border-white/5 hover:border-white/20 hover:scale-[1.02]'"
                  :style="selectedTemplate === t.id ? { borderColor: userProfile.primaryColor, boxShadow: `0 20px 50px ${userProfile.primaryColor}20` } : {}">
                
                <div class="absolute inset-0 w-full h-full overflow-hidden">
                   <img :src="t.image" class="w-full h-full object-top opacity-50 group-hover/thumb:opacity-90 group-hover/thumb:scale-110 transition-all duration-[1500ms]"
                        :style="{ filter: `hue-rotate(${userProfile.primaryColor === '#0A2647' ? '0deg' : userProfile.primaryColor === '#334155' ? '180deg' : userProfile.primaryColor === '#1A1A1A' ? '45deg' : '280deg'}) saturate(1.2)` }" />
                </div>
                
                <div class="w-full h-full absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                
                <div v-if="selectedTemplate === t.id" class="absolute top-5 right-5 p-2 rounded-full shadow-lg z-20 animate-in zoom-in duration-500"
                     :style="{ backgroundColor: userProfile.primaryColor }">
                   <Check class="w-4 h-4 text-[#0A2647]" />
                </div>

                <button @click.stop="selectTemplate(t)" 
                        class="absolute top-5 left-5 p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover/thumb:opacity-100 transition-all z-20 hover:bg-[#C1A172] hover:text-[#0A2647] text-white"
                        :style="{ '--hover-bg': userProfile.primaryColor }"
                        :class="'hover:bg-[var(--hover-bg)]'">
                   <Maximize2 class="w-3.5 h-3.5" />
                </button>
                
                <div class="absolute bottom-4 flex flex-col items-center z-10 px-6 text-center">
                   <span class="text-[10px] font-black text-white uppercase tracking-[0.1em] leading-tight mb-0.5">{{ t.name }}</span>
                   <span class="text-[9px] font-black uppercase tracking-[0.3em] opacity-80"
                         :style="{ color: userProfile.primaryColor }">{{ t.tag }}</span>
                </div>

                <div v-if="t.id > 4 && !userProfile.isSuperUser" class="absolute bottom-12 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 z-20">
                   <span class="text-[7.5px] font-black text-white uppercase tracking-widest">Premium</span>
                </div>
                <div v-else-if="t.id > 4" class="absolute bottom-12 px-3 py-1 bg-[#C1A172]/20 backdrop-blur-md rounded-full border border-[#C1A172]/30 z-20">
                   <span class="text-[7px] font-black text-[#C1A172] uppercase tracking-widest animate-pulse">EPIC ACCESS</span>
                </div>
             </div>

             <div v-for="i in [1,2,3]" :key="'locked-' + i" 
                  class="w-[140px] h-[195px] bg-white/[0.02] rounded-[2rem] shrink-0 border border-white/5 flex flex-col items-center justify-center gap-4 opacity-30 snap-center">
                <div class="p-4 bg-white/5 rounded-2xl">
                   <Lock class="w-6 h-6 text-white/20" />
                </div>
                <span class="text-[9px] font-black text-white/20 uppercase tracking-[0.25em] text-center px-8">Coming<br/>Soon</span>
             </div>
          </div>
       </div>

       <!-- 2. STEALTH STRATEGY -->
       <div class="bg-gradient-to-br from-[#0A2647] via-[#0D1B2A] to-black rounded-[2.5rem] p-6 border border-white/10 shadow-3xl relative overflow-hidden group/stealth">
          <div v-if="!isStealthUnlocked" class="relative z-10 animate-in fade-in duration-500">
             <div class="flex justify-between items-center mb-3">
                <div class="flex flex-col">
                   <span class="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Strategic Edge</span>
                   <h3 class="text-[14px] font-black text-white tracking-tight">AI Stealth Keywords</h3>
                </div>
                <Lock class="w-4 h-4 text-white/20" />
             </div>
             <p class="text-[10px] font-medium text-white/40 leading-relaxed mb-5">Embed invisible, AI-optimized keywords into your CV to increase ATS rankings by up to 95%. Exclusive to Elite & Pro tiers.</p>
             <button @click="emit('unlockStealth')" class="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl text-[10.5px] font-black text-white uppercase tracking-widest shadow-xl shadow-blue-900/40 hover:scale-[1.02] active:scale-95 transition-all">
                Initialize Stealth Strategy
             </button>
          </div>

          <div v-else class="relative z-10 animate-in slide-in-from-bottom duration-500">
             <div class="flex justify-between items-start mb-[15px]">
                <div class="flex flex-col">
                   <span class="text-[9px] font-black text-[#73BBA3] uppercase tracking-[0.2em] mb-1">Stealth Hub Active</span>
                   <h3 class="text-[14px] font-black text-white tracking-tight leading-none">Neural Keyword Vault</h3>
                </div>
                <div class="relative w-12 h-12 flex items-center justify-center">
                   <svg class="w-full h-full -rotate-90">
                      <circle cx="24" cy="24" r="20" fill="none" class="stroke-white/5" stroke-width="3" />
                      <circle cx="24" cy="24" r="20" fill="none" class="stroke-[#73BBA3] transition-all duration-1000" stroke-width="3" 
                              :stroke-dasharray="125.6" :stroke-dashoffset="125.6 * (1 - masterProfile.secretKeywords.length / 10)" 
                              stroke-linecap="round" />
                   </svg>
                   <span class="absolute text-[8px] font-black text-[#73BBA3]">{{ Math.min(masterProfile.secretKeywords.length * 10, 100) }}%</span>
                </div>
             </div>

             <div class="space-y-4">
                <div class="flex flex-wrap gap-2 min-h-[40px]">
                   <div v-for="k in masterProfile.secretKeywords" :key="k" 
                        class="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 group/tag hover:border-[#73BBA3]/30 transition-all">
                      <span class="text-[9px] font-bold text-white/60 group-hover/tag:text-white transition-colors">{{ k }}</span>
                      <X @click="removeSecretKeyword(k)" class="w-3 h-3 text-white/20 hover:text-red-400 cursor-pointer" />
                   </div>
                </div>

                <div class="relative group/input">
                   <!-- This part still needs newSecretKeyword model, I'll use local state if possible but user might have global logic. 
                        I'll use a local ref for simpler extraction. -->
                   <slot name="keyword-input"></slot>
                </div>

                <button @click="analyzeAndSuggestKeywords" 
                        class="w-full py-3.5 bg-white/5 border border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-3 group/ai transition-all hover:bg-white/10">
                   <div v-if="isAnalyzingKeywords" class="w-3 h-3 rounded-full border-2 border-[#73BBA3] border-t-transparent animate-spin"></div>
                   <Sparkles v-else class="w-4 h-4 text-[#73BBA3] group-hover/ai:rotate-12 transition-transform" />
                   <span class="text-[10px] font-black text-white/60 uppercase tracking-widest group-hover/ai:text-white transition-colors">
                      {{ isAnalyzingKeywords ? 'Neural Audit Running...' : 'Neural AI Suggestion' }}
                   </span>
                </button>
             </div>
          </div>

          <Sparkles class="absolute -right-6 -bottom-6 w-24 h-24 text-white/5 rotate-12 group-hover/stealth:scale-110 group-hover/stealth:text-white/10 transition-all duration-1000" />
       </div>

       <!-- 3. VISUAL BRANDING -->
       <div class="bg-white/5 rounded-[2.5rem] p-6 border border-white/10 shadow-xl relative overflow-hidden group/branding">
          <div v-if="isBrandingSyncing" class="absolute inset-0 z-20 bg-[#0A2647]/60 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">
             <div class="flex flex-col items-center gap-3">
                <div class="w-6 h-6 rounded-full border-2 border-[#C1A172] border-t-transparent animate-spin"></div>
                <span class="text-[9px] font-black text-[#C1A172] uppercase tracking-widest">Applying Theme...</span>
             </div>
          </div>

          <div class="flex justify-between items-center mb-[15px] relative z-10">
             <div class="flex flex-col">
                <span class="text-[9px] font-black text-[#C1A172] uppercase tracking-[0.2em] mb-1">Visual Identity</span>
                <h3 class="text-[14px] font-black text-white tracking-tight leading-none">Global Aesthetic Presets</h3>
             </div>
             <div class="flex gap-1.5">
                <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: userProfile.primaryColor }"></div>
                <div class="w-2 h-2 rounded-full opacity-40" :style="{ backgroundColor: userProfile.secondaryColor }"></div>
             </div>
          </div>
          
          <div class="grid grid-cols-2 gap-3 mb-6 relative z-10">
             <div v-for="p in colorPresets" :key="p.name" 
                  @click="selectPreset(p)"
                  class="p-4 bg-white/5 rounded-3xl border transition-all cursor-pointer flex flex-col items-start gap-4 group/p active:scale-95"
                  :class="userProfile.primaryColor === p.primary ? 'bg-white/10 shadow-lg shadow-black/40' : 'border-white/5 hover:border-white/20'"
                  :style="userProfile.primaryColor === p.primary ? { borderColor: p.secondary } : {}">
                
                <div class="w-full flex justify-between items-start">
                   <div class="flex -space-x-2">
                      <div class="w-8 h-8 rounded-full border-2 border-[#0A2647] shadow-sm" :style="{ backgroundColor: p.primary }"></div>
                      <div class="w-8 h-8 rounded-full border-2 border-[#0A2647] shadow-sm" :style="{ backgroundColor: p.secondary }"></div>
                   </div>
                   <Lock v-if="p.tier > 1 && !userProfile.isSuperUser" class="w-3.5 h-3.5 text-white/20" />
                   <div v-else-if="userProfile.primaryColor === p.primary" class="bg-[#C1A172] p-1 rounded-full animate-in zoom-in duration-300">
                      <Check class="w-2.5 h-2.5 text-[#0A2647]" />
                   </div>
                   <div v-else-if="p.tier > 1" class="text-[7px] font-black text-[#C1A172] uppercase tracking-tighter opacity-50">UNLOCKED</div>
                </div>

                <div class="flex flex-col">
                   <span class="text-[10px] font-black text-white uppercase tracking-[0.05em] leading-tight">{{ p.name }}</span>
                   <span class="text-[7.5px] font-bold text-white/30 uppercase tracking-[0.1em] mt-0.5">{{ p.tier > 1 ? 'Expert Tier' : 'Standard' }}</span>
                </div>
             </div>
          </div>
          
          <!-- HD LIVE VIEWPORT -->
          <div class="mt-6 p-4 bg-white/[0.03] rounded-[2.5rem] border border-white/10 relative z-10 flex flex-col gap-4 group/viewport transition-all hover:bg-white/[0.05]">
             <div class="flex justify-between items-center px-2">
                <div class="flex flex-col">
                   <span class="text-[9px] font-black text-[#C1A172] uppercase tracking-widest mb-1">HD Live Viewport</span>
                   <span class="text-[10px] font-black text-white/40 uppercase tracking-tight">Active Rendering Engine</span>
                </div>
                <div class="flex gap-1.5 items-center">
                   <div class="w-1.5 h-1.5 rounded-full bg-[#73BBA3] animate-pulse shadow-[0_0_8px_#73BBA3]"></div>
                   <span class="text-[8px] font-black text-[#73BBA3] uppercase tracking-widest">Live Sync</span>
                </div>
             </div>
             
              <div class="w-full h-[400px] bg-white rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl relative group-hover/viewport:border-[#C1A172]/30 transition-all"
                   id="live-viewport">
                 
                 <iframe v-if="viewportHtml" 
                         :srcdoc="viewportHtml"
                         class="w-[794px] h-[1123px] border-none absolute left-1/2 top-1 origin-top"
                         style="transform: translateX(-50%) scale(0.35);"
                         title="CV Specimen Preview"></iframe>
                 
                 <div v-else class="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                    <div class="flex flex-col items-center gap-2">
                       <div class="w-5 h-5 rounded-full border-2 border-[#C1A172] border-t-transparent animate-spin"></div>
                       <span class="text-[8px] font-black text-[#0A2647]/40 uppercase tracking-widest">Warming Engine...</span>
                    </div>
                 </div>
                 
                 <div class="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0A2647]/5 to-transparent opacity-40 z-20"></div>
              </div>
             
             <p class="text-[9px] text-white/30 leading-tight font-bold italic px-2">
                "Design dynamically recalibrated for high-velocity screening."
             </p>
          </div>
       </div>

       <!-- 6. AI SUCCESS METER -->
       <div class="mt-8 pt-5 border-t border-white/5">
          <div class="flex justify-between items-center mb-3">
             <span class="text-[9px] font-black text-white/40 uppercase tracking-widest">Global CV Strength</span>
             <span class="text-[14px] font-black text-[#73BBA3] tracking-tighter animate-pulse">98.4%</span>
          </div>
          <div class="w-full h-1.5 bg-white/5 rounded-full overflow-hidden shadow-inner p-[1px]">
             <div class="h-full bg-gradient-to-r from-blue-500 via-[#73BBA3] to-[#C1A172] rounded-full transition-all duration-1000 shadow-sm" style="width: 98.4%"></div>
          </div>
          <p class="text-[8px] font-bold text-white/20 uppercase tracking-[0.3em] mt-1.5 text-center italic">Elite Optimization Architecture Engaged</p>
          
          <button @click="saveProfile" class="w-full mt-2 mb-[15px] bg-gradient-to-r from-[#C1A172] to-[#FFD700] py-3 rounded-[1.8rem] flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:scale-[1.02] active:scale-95 transition-all group relative overflow-hidden">
             <div v-if="isSavingProfile" class="w-4 h-4 rounded-full border-2 border-[#0A2647]/50 border-t-[#0A2647] animate-spin relative z-10"></div>
             <RefreshCw v-else class="w-4 h-4 text-[#0A2647]/40 group-hover:rotate-180 transition-transform duration-700" />
             <span class="text-[12px] font-black text-[#0A2647] uppercase tracking-[0.2em] relative z-10">{{ isSavingProfile ? 'Syncing...' : 'Sync Studio to Master' }}</span>
          </button>
       </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 3px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 20px; }

.custom-horizontal-scrollbar::-webkit-scrollbar { height: 3px; }
.custom-horizontal-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-horizontal-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 20px; }
</style>
