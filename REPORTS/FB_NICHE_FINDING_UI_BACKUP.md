# FB Niche Finding / Viral Creative Studio UI Backup

*Generated as a layout backup from an accidental injection into the SalesNexusView.*

This is the fully functioning template and data structure for an AI Social Viral Hub / Creative Studio interface, designed for discovering viral niches and generating multi-stage prompts and scripts for platforms like Facebook and TikTok.

## Script & Data State (Vue 3 Composition API)
```javascript
const activeTab = ref('leads'); // 'leads' or 'creative'

const viralNiches = ref([
    {
        id: 1,
        title: "Zen Cyber-Loft Restoration",
        growth: 94.5,
        target: "Interior Designers / Tech Minimalists",
        potential: "Transforming a brutalist concrete shell into a neon-lit, organic zen garden with smart tech integration.",
        sequence: [
            { name: "Excavation", prompt: "Static 4k wide shot, raw grey concrete room, industrial debris, dramatic low light. Cinematic focal length 24mm." },
            { name: "Structural", prompt: "Camera locked. Workers installing smart glass panels and wooden slats. High-fidelity textures, warm amber lighting." },
            { name: "Refining", prompt: "Identical framing. Neon RGB strips active on ceilings, polished floors, lush monstera plants appearing." },
            { name: "Climax", prompt: "Cinematic reveal. Lush plants under neon, smart tech active, luxury vibe. 8k resolution, raytracing active." }
        ],
        audio: {
            script: "Watch how we turned this concrete nightmare into a digital sanctuary. From raw build to neon bliss.",
            sfx: ["concrete scraping", "neon hum", "lush leaves rustle", "cinematic bass drop"]
        }
    },
    {
        id: 2,
        title: "Luxury Underground Pool Vault",
        growth: 89.2,
        target: "Billionaire Bunker Enthusiasts",
        potential: "Turning a dark, forgotten basement into a glowing underground infinity pool environment.",
        sequence: [
            { name: "Raw Pit", prompt: "Static wide shot, dirty basement pit, mud and rocks, high contrast shadows. RAW photography style." },
            { name: "Build", prompt: "Same framing. Premium tile installation, water pipes visible, soft blue glow appearing." },
            { name: "Finish", prompt: "Identical camera. Sparkling tiles, pool filling up, high-end finishing touches." },
            { name: "Reveal", prompt: "Climax capture. Crystal clear water, neon reflections, ultra-high-end luxury. Motion blur at 24fps." }
        ],
        audio: {
            script: "Deep underground, hidden from the world... we built the ultimate escape. Crystal clear luxury.",
            sfx: ["drilling", "water filling", "echoing droplets", "chill synth wave"]
        }
    }
]);

const selectedNiche = ref(viralNiches.value[0]);
```

## Template Markup
```html
<!-- CREATIVE STUDIO VIEW -->
<div v-else-if="activeTab === 'creative'" class="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-[fadeIn_0.5s_ease-out]">
    <!-- TRENDS SIDEBAR (LEFT) -->
    <div class="lg:col-span-4 space-y-8">
        <div class="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-10 text-left">
            <div>
                <h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 flex items-center gap-3 italic">
                    <TrendingUp class="w-4 h-4 text-primary" /> Viral Trend Discovery
                </h4>
                <div class="space-y-4">
                    <div v-for="niche in viralNiches" :key="niche.id" 
                        @click="selectedNiche = niche"
                        :class="selectedNiche.id === niche.id ? 'border-primary bg-slate-50 shadow-md' : 'border-slate-100 hover:border-slate-300'"
                        class="p-6 rounded-[2rem] border transition-all cursor-pointer group text-left">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-[9px] font-black text-primary uppercase tracking-widest italic">{{ niche.growth }}% POTENTIAL</span>
                            <div v-if="selectedNiche.id === niche.id" class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        </div>
                        <h5 class="text-sm font-black text-slate-900 uppercase tracking-tighter italic group-hover:text-primary transition-colors">{{ niche.title }}</h5>
                    </div>
                </div>
                <button @click="triggerToast('Gemini Latest Engine scanning global social clusters...')" class="w-full mt-8 py-5 bg-slate-900 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:scale-105 transition-all italic shadow-xl shadow-slate-900/10">
                    <RefreshCcw class="w-4 h-4 text-primary" /> Scan 10 New Niches
                </button>
            </div>
        </div>

        <div class="bg-indigo-600 p-10 rounded-[3rem] shadow-xl text-white space-y-4 relative overflow-hidden text-left">
            <div class="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <Bot class="w-8 h-8 text-indigo-200" />
            <h4 class="text-xl font-black italic tracking-tighter uppercase leading-none">Gemini Latest Engine</h4>
            <p class="text-[10px] font-bold text-indigo-100 opacity-80 leading-relaxed italic uppercase tracking-widest">Autonomous creative orchestration active. Ready for rendering dispatch.</p>
        </div>
    </div>

    <!-- ASSET ARCHITECT (RIGHT) -->
    <div class="lg:col-span-8 space-y-10">
        <!-- NICHE PREVIEW -->
        <div class="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm space-y-10 text-left">
            <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div class="space-y-4">
                    <span class="text-[10px] font-black text-primary uppercase tracking-[0.4em] italic">{{ selectedNiche.target }}</span>
                    <h2 class="text-4xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">{{ selectedNiche.title }}</h2>
                    <p class="text-slate-500 text-sm font-medium italic leading-relaxed max-w-2xl">{{ selectedNiche.potential }}</p>
                </div>
                <div class="shrink-0 flex items-center gap-4">
                    <button class="p-6 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors border border-slate-100 shadow-inner">
                        <Share2 class="w-6 h-6 text-slate-400" />
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-slate-100">
                <!-- PROMPT STAGES -->
                <div class="space-y-8">
                    <h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 flex items-center gap-3 italic">
                        <Sparkles class="w-4 h-4 text-primary" /> Visual Sequence (Scene Locked)
                    </h4>
                    <div class="space-y-4">
                        <div v-for="(stage, idx) in selectedNiche.sequence" :key="idx" class="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group relative text-left">
                            <div class="flex justify-between items-center mb-3">
                                <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Stage 0{{ idx + 1 }}: {{ stage.name }}</span>
                                <button @click="triggerToast('Prompt copied to clipboard.')" class="opacity-0 group-hover:opacity-100 text-[9px] font-black text-primary uppercase tracking-widest transition-opacity cursor-pointer italic transition-all">Copy Prompt</button>
                            </div>
                            <p class="text-[11px] font-black text-slate-600 italic leading-relaxed">{{ stage.prompt }}</p>
                        </div>
                    </div>
                </div>

                <!-- AUDITORY DNA -->
                <div class="space-y-8">
                    <h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 flex items-center gap-3 italic">
                        <Activity class="w-4 h-4 text-emerald-500" /> Auditory Architecture
                    </h4>
                    <div class="bg-slate-900 p-8 rounded-[3rem] text-white space-y-8 relative overflow-hidden text-left shadow-2xl">
                        <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
                        <div class="relative z-10 space-y-6">
                            <div>
                                <span class="text-[9px] font-black text-indigo-300 uppercase tracking-widest block mb-4 italic">ElevenLabs Voiceover Script</span>
                                <p class="text-lg font-black italic tracking-tight leading-snug">"{{ selectedNiche.audio.script }}"</p>
                            </div>
                            <div class="h-[1px] bg-white/10 w-full"></div>
                            <div>
                                <span class="text-[9px] font-black text-emerald-400 uppercase tracking-widest block mb-4 italic">Atmospheric SFX Metadata</span>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="tag in selectedNiche.audio.sfx" :key="tag" class="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold uppercase tracking-wider text-slate-300">{{ tag }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pt-6">
                        <button @click="triggerToast('External rendering protocol initiated via n8n...')" class="w-full py-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:scale-105 transition-all italic shadow-lg shadow-emerald-500/20">
                            Dispatch to Rendering Node <Bot class="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```
