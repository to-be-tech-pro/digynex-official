<script setup>
import { ref, onMounted } from 'vue'
import { Sparkles, Zap, ShieldCheck, X, Activity, Globe, Copy } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  job: Object
})

const emit = defineEmits(['close'])

const steps = ref([
  { id: 'auth', label: 'Neural Handshake', status: 'pending' },
  { id: 'wipe', label: 'Cleaning Interface', status: 'pending' },
  { id: 'fill', label: 'Injecting Identity', status: 'pending' },
  { id: 'strike', label: 'Finalizing Submission', status: 'pending' }
])

import { watch } from 'vue'

onMounted(() => {
  if (props.isOpen) {
    runSimulation()
  }
})

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    // Reset steps for a fresh handshake
    steps.value.forEach(s => s.status = 'pending')
    runSimulation()
  }
})

const runSimulation = async () => {
  for (let i = 0; i < steps.value.length; i++) {
    steps.value[i].status = 'active'
    await new Promise(r => setTimeout(r, 1200))
    steps.value[i].status = 'done'
  }
}

const copyNeuralScript = async () => {
  try {
    // Strategic Payload Extraction: Fetch the core injector logic
    const response = await fetch('/src/lib/neural_injector.js');
    const text = await response.text();
    await navigator.clipboard.writeText(text);
    alert('Neural Script Copied to Clipboard. Paste in LinkedIn Console (F12) to verify.');
  } catch (err) {
    console.error('Copy failed:', err);
  }
}
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[7000] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-[#0A2647]/95 backdrop-blur-2xl"></div>
      
      <div class="relative w-full max-w-[320px] bg-[#051124] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-3xl p-8 flex flex-col items-center text-center space-y-6 animate-in zoom-in duration-500">
        <!-- Neural Core Graphic -->
        <div class="relative w-20 h-20 flex items-center justify-center">
           <div class="absolute inset-0 bg-[#C1A172]/20 rounded-full animate-ping"></div>
           <div class="w-14 h-14 bg-[#C1A172] rounded-2xl shadow-[0_0_40px_#C1A172] flex items-center justify-center relative z-10 rotate-45">
              <Zap class="w-7 h-7 text-[#0A2647] -rotate-45" />
           </div>
        </div>

        <div class="space-y-1">
           <h3 class="text-lg font-black text-white uppercase tracking-tight">Neural Bridge</h3>
           <p class="text-[9px] font-bold text-[#C1A172] uppercase tracking-[0.2em]">Executing Sovereign Injection</p>
        </div>

        <!-- Verification Unit -->
        <div class="w-full space-y-3 pt-4">
           <button @click="copyNeuralScript" class="w-full py-3.5 bg-[#C1A172]/10 border border-[#C1A172]/30 rounded-2xl flex items-center justify-center gap-3 group hover:bg-[#C1A172]/20 transition-all active:scale-95">
              <Copy class="w-4 h-4 text-[#C1A172]" />
              <span class="text-[10px] font-black text-[#C1A172] uppercase tracking-widest">Verify in Console</span>
           </button>

           <div v-for="step in steps" :key="step.id" class="flex items-center justify-between px-4 py-2.5 bg-white/5 rounded-xl border border-white/5 transition-all" :class="{ 'opacity-40': step.status === 'pending', 'border-[#C1A172]/50 bg-[#C1A172]/5': step.status === 'active' }">
              <div class="flex items-center gap-3">
                 <Activity v-if="step.status === 'active'" class="w-3.5 h-3.5 text-[#C1A172] animate-pulse" />
                 <ShieldCheck v-else-if="step.status === 'done'" class="w-3.5 h-3.5 text-green-400" />
                 <div v-else class="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                 <span class="text-[10px] font-black uppercase tracking-widest" :class="step.status === 'active' ? 'text-white' : 'text-white/40'">{{ step.label }}</span>
              </div>
           </div>
        </div>

        <button @click="emit('close')" class="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-white/40 uppercase tracking-widest hover:bg-white/10 transition-all">
           Return to Dashboard
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
