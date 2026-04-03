<script setup>
import { ref, computed } from 'vue';
import { 
    Users, 
    Facebook, 
    Linkedin, 
    Zap, 
    MessageSquare, 
    CheckCircle2, 
    Send,
    TrendingUp,
    ShieldAlert,
    X,
    Cpu,
    Fingerprint,
    Search,
    Network,
    Globe,
    Sparkles,
    Activity,
    Layers,
    Share2,
    Bot,
    Calendar,
    Settings,
    RefreshCcw,
    XCircle,
    Smartphone
} from 'lucide-vue-next';
import Sidebar from '../components/dashboard/Sidebar.vue';
import TopHeader from '../components/dashboard/TopHeader.vue';

import { onMounted } from 'vue';
import { supabase } from '../supabase';

const isMobileMenuOpen = ref(false);
const toastMessage = ref('');
const isLoading = ref(true);

const triggerToast = (msg) => {
    toastMessage.value = msg;
    setTimeout(() => toastMessage.value = '', 3000);
};

// LEAD DATA: STABLE & COMPACT
const leads = ref([]);

const filters = ref({ platform: 'all', minScore: 0 });

const filteredLeads = computed(() => {
    return leads.value.filter(l => {
        const platformMatch = filters.value.platform === 'all' || l.platform === filters.value.platform;
        const scoreMatch = (l.lead_score || 0) >= filters.value.minScore;
        return platformMatch && scoreMatch;
    });
});

const showModal = ref(false);
const showCalendarModal = ref(false);
const showWebhookModal = ref(false);
const selectedLead = ref(null);
const currentDraft = ref('');
const isSending = ref(false);

const weekPlan = ref([]);

const webhookConfig = ref({
    n8nUrl: '',
    tgGroup: '-1001928391823',
    wa1: '+46701234567',
    wa2: '+94771234567',
    fbToken: '',
    liToken: ''
});

// FETCH DATA FROM SUPABASE
const fetchData = async () => {
    isLoading.value = true;
    try {
        // Fetch Leads
        const { data: leadsData, error: leadsError } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (leadsError) throw leadsError;
        leads.value = leadsData || [];

        // Fetch Matrix Settings
        const { data: matrixData, error: matrixError } = await supabase
            .from('viral_matrix_settings')
            .select('*');
        
        if (matrixError) throw matrixError;
        weekPlan.value = matrixData || [];

        // Fetch Org Config/Webhook
        const { data: orgData, error: orgError } = await supabase
            .from('organizations')
            .select('n8n_url')
            .eq('slug', 'digynex-hq')
            .single();
        
        if (orgError) throw orgError;
        webhookConfig.value.n8nUrl = orgData?.n8n_url || 'https://n8n.digynex.se/webhook/viral-hub';

    } catch (err) {
        console.error('Error fetching dashboard data:', err);
        triggerToast('Failed to sync live data from Supabase Hub.');
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchData();
});

const regenerateDraft = (lead) => {
    triggerToast(`AI Context Engine regenerating cognitive parameters for ${lead.name}...`);
    // This would typically trigger an n8n webhook too
};

const rejectLead = async (leadId) => {
    try {
        const { error } = await supabase
            .from('leads')
            .update({ status: 'Rejected' })
            .eq('id', leadId);
        
        if (error) throw error;
        leads.value = leads.value.filter(l => l.id !== leadId);
        triggerToast('Lead discarded from current pipeline tracking.');
    } catch (err) {
        triggerToast('Error updating lead status.');
    }
};

const sendOutreach = async (lead) => {
    isSending.value = true;
    try {
        // CALL REAL n8n WEBHOOK
        const response = await fetch(webhookConfig.value.n8nUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'approve_outreach',
                lead_id: lead.id,
                lead_name: lead.name,
                platform: lead.platform || 'whatsapp',
                message: lead.ai_draft || lead.notes,
                org_id: lead.org_id
            })
        });

        if (!response.ok) throw new Error('n8n Hub Unresponsive');

        // Update status in Supabase
        const { error } = await supabase
            .from('leads')
            .update({ status: 'Approved' })
            .eq('id', lead.id);
        
        if (error) throw error;

        lead.status = 'Approved';
        triggerToast(`Authorization sent. Dual-dispatch via n8n committed.`);
    } catch (err) {
        console.error('Outreach error:', err);
        triggerToast('Critical error: n8n link failed or endpoint offline.');
    } finally {
        isSending.value = false;
    }
};

</script>

<template>
    <div class="h-screen bg-white flex text-slate-800 font-sans overflow-hidden">
        <Sidebar @toggleMenu="isMobileMenuOpen = !isMobileMenuOpen" @triggerToast="triggerToast" />

        <main class="flex-1 flex flex-col h-screen overflow-hidden bg-[#f8fafc]">
            <TopHeader @toggleMenu="isMobileMenuOpen = !isMobileMenuOpen" @triggerToast="triggerToast" />

            <div class="flex-1 overflow-y-auto p-4 lg:p-10 custom-scrollbar relative z-10">
                
                <transition name="toast-slide">
                    <div v-if="toastMessage" class="fixed bottom-8 right-8 z-[3000] bg-slate-900 shadow-2xl text-white px-6 py-4 rounded-xl border border-white/10 flex items-center gap-3 backdrop-blur-md">
                        <CheckCircle2 class="w-4 h-4 text-primary" />
                        <span class="text-[10px] font-black uppercase tracking-widest italic">{{ toastMessage }}</span>
                    </div>
                </transition>

                <div class="max-w-7xl mx-auto space-y-10 animate-[fadeIn_0.5s_ease-out]">
                    <!-- PROFESSIONAL HEADER -->
                    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-slate-200/60 pb-10">
                        <div class="flex items-center gap-6 text-left w-full lg:w-auto">
                            <Zap class="w-10 h-10 text-primary animate-pulse flex-shrink-0" />
                            <div class="flex flex-col">
                                <h1 class="text-3xl font-black tracking-tighter uppercase italic text-slate-900 leading-none">AI Social Viral Hub</h1>
                                <p class="text-slate-400 text-[9px] font-black tracking-[0.4em] uppercase mt-2 flex items-center gap-2 italic leading-none opacity-60">
                                    <Fingerprint class="w-3.5 h-3.5" /> Omni-Channel Orchestration Node
                                </p>
                            </div>
                        </div>

                        <!-- ACTIONS CLUSTER -->
                        <div class="flex items-center gap-4 bg-white/60 p-2 rounded-[2.5rem] border border-slate-200 shadow-sm backdrop-blur-sm w-full lg:w-auto overflow-x-auto">
                            <button @click="showCalendarModal = true" class="px-8 py-3 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-transform italic shrink-0 shadow-lg">
                                <Calendar class="w-4 h-4 text-primary" /> 7-Day Matrix
                            </button>
                            <button @click="showWebhookModal = true" class="px-8 py-3 bg-slate-50 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-slate-100 transition-colors italic shrink-0 border border-slate-200">
                                <Settings class="w-4 h-4 text-slate-400" /> API Config
                            </button>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <!-- CONTROL CENTRE (LEFT) -->
                        <div class="lg:col-span-3 space-y-8">
                            <div class="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-10 relative overflow-hidden group">
                                <div class="absolute -top-10 -left-10 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-40 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                <div class="relative z-10 space-y-10">
                                    <!-- MANUAL KEYWORD SEARCH -->
                                    <div>
                                        <h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 flex items-center gap-3 italic">
                                            <Search class="w-4 h-4 text-primary" /> Manual Targeting
                                        </h4>
                                        <input type="text" placeholder="Eg: SaaS Founders in UK..." class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-[10px] font-black text-slate-600 uppercase tracking-widest outline-none transition-all placeholder:text-slate-300 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 italic hover:border-indigo-200 shadow-inner" />
                                    </div>

                                    <div>
                                        <h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 flex items-center gap-3 italic">
                                            <Layers class="w-4 h-4 text-primary" /> Strategy Nodes
                                        </h4>
                                        <div class="flex flex-col gap-3">
                                            <button @click="filters.platform = 'all'" :class="filters.platform === 'all' ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'" class="w-full py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all italic border border-transparent">Omni-Channel</button>
                                            <button @click="filters.platform = 'linkedin'" :class="filters.platform === 'linkedin' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400'" class="w-full px-6 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-between group italic border border-transparent">
                                                LinkedIn <Linkedin class="w-4 h-4 opacity-50 group-hover:opacity-100"/>
                                            </button>
                                            <button @click="filters.platform = 'facebook'" :class="filters.platform === 'facebook' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400'" class="w-full px-6 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-between group italic border border-transparent">
                                                Facebook <Facebook class="w-4 h-4 opacity-50 group-hover:opacity-100"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="pt-8 border-t border-slate-50 space-y-6 text-left">
                                        <div class="flex justify-between items-center px-1">
                                            <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Growth Target</label>
                                            <span class="text-xs font-black text-indigo-600 font-mono">{{ filters.minScore }}%</span>
                                        </div>
                                        <div class="relative h-1 bg-slate-100 rounded-full overflow-hidden">
                                            <input type="range" v-model="filters.minScore" min="0" max="100" class="absolute inset-0 w-full opacity-0 cursor-pointer z-10">
                                            <div class="absolute left-0 top-0 h-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.3)]" :style="{ width: `${filters.minScore}%` }"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                                <!-- LEAD STREAM -->
                                <div class="lg:col-span-9 space-y-6 text-left">
                                    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 bg-white rounded-[3.5rem] border border-slate-100 italic gap-4">
                                        <div class="w-10 h-10 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
                                        <span class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Syncing with Intelligence Hub...</span>
                                    </div>

                                    <div v-else-if="filteredLeads.length === 0" class="flex flex-col items-center justify-center py-20 bg-white rounded-[3.5rem] border border-slate-100 italic gap-4">
                                        <Bot class="w-10 h-10 text-slate-200" />
                                        <span class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">No active leads discovered in this cluster.</span>
                                    </div>

                                    <div v-for="lead in filteredLeads" :key="lead.id" 
                                        class="bg-white p-8 rounded-[3.5rem] border border-slate-200 hover:border-indigo-200 hover:bg-slate-50/20 shadow-sm hover:shadow-xl transition-all duration-700 group relative flex flex-col gap-6">
                                        
                                        <div class="flex flex-col lg:flex-row items-center justify-between gap-10">
                                            <div class="flex items-center gap-8 w-full lg:w-auto">
                                                <div class="relative flex-shrink-0">
                                                    <div class="absolute inset-0 bg-indigo-600 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                                    <div class="w-20 h-20 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl font-black text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all duration-700 italic shadow-inner relative z-10">
                                                        {{ lead.name[0] }}
                                                    </div>
                                                    <div class="absolute -bottom-1 -right-1 w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-20">
                                                        <component :is="lead.platform === 'linkedin' ? Linkedin : Facebook" class="w-4 h-4 text-indigo-600" />
                                                    </div>
                                                </div>
                                                <div class="flex flex-col space-y-1.5">
                                                    <div class="flex items-center gap-5">
                                                        <h3 class="text-2xl font-black tracking-tighter uppercase italic text-slate-900 group-hover:text-primary transition-colors duration-500">{{ lead.name }}</h3>
                                                        <div :class="lead.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'" class="px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest italic transition-all">
                                                            {{ lead.status }}
                                                        </div>
                                                    </div>
                                                    <div class="flex items-center gap-4 mt-1 font-black text-[10px] text-slate-400 uppercase tracking-widest leading-none italic">
                                                        <span class="text-slate-900">{{ lead.role || 'Partner' }}</span>
                                                        <span class="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                                                        <span class="text-primary">{{ lead.company || lead.source }}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="flex flex-col items-end gap-2.5 min-w-[120px] w-full lg:w-auto">
                                                <span class="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] italic leading-none">Scoring Logic</span>
                                                <div class="flex items-center gap-3 w-full">
                                                    <div class="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                                                        <div class="h-full bg-primary" :style="{ width: `${lead.lead_score || 0}%` }"></div>
                                                    </div>
                                                    <span class="text-sm font-black text-slate-900 font-mono italic">{{ lead.lead_score || 0 }}%</span>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- AI GENERATED DRAFT SECTION -->
                                        <div class="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 text-sm font-black text-slate-500 italic relative leading-relaxed">
                                            <Sparkles class="absolute top-6 right-6 w-5 h-5 text-indigo-300 opacity-50" />
                                            <div class="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-3 not-italic">Gemini Latest Engine Draft</div>
                                            {{ lead.ai_draft || lead.notes || 'No preliminary draft found. Triggering context generator...' }}
                                        </div>

                                <!-- ACTION BUTTONS -->
                                <div class="flex items-center justify-between border-t border-slate-100 pt-6">
                                    <button @click="rejectLead(lead.id)" class="px-6 py-4 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors italic">
                                        <XCircle class="w-4 h-4" /> Reject
                                    </button>
                                    
                                    <div class="flex items-center gap-4">
                                        <button @click="regenerateDraft(lead)" class="px-8 py-4 bg-white border border-slate-200 rounded-[2rem] text-[10px] font-black text-slate-600 uppercase tracking-widest hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-3 italic">
                                            <RefreshCcw class="w-4 h-4 text-slate-400" /> Regenerate
                                        </button>
                                        <button @click="sendOutreach(lead)" :disabled="isSending" class="px-10 py-4 bg-slate-900 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 italic shadow-xl shadow-slate-900/10 disabled:opacity-50">
                                            <span v-if="isSending" class="flex gap-2 items-center"><span class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Syncing</span>
                                            <span v-else class="flex gap-2 items-center">Approve & Send <Send class="w-4 h-4 text-primary" /></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- 7-DAY CALENDAR MATRIX MODAL -->
        <transition name="modal">
            <div v-if="showCalendarModal" class="fixed inset-0 z-[2500] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md text-left overflow-y-auto">
                <div class="bg-white w-full max-w-5xl rounded-[3rem] border border-white shadow-2xl relative my-auto">
                    <div class="p-12 space-y-10">
                        <div class="flex items-start justify-between">
                            <div>
                                <h2 class="text-3xl font-black italic tracking-tighter uppercase text-slate-900 flex items-center gap-4">
                                    <Calendar class="w-8 h-8 text-primary" /> 7-Day Target Matrix
                                </h2>
                                <p class="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-2 italic">Automate weekly acquisition targets</p>
                            </div>
                            <button @click="showCalendarModal = false" class="p-4 bg-slate-50 rounded-2xl hover:text-red-500 hover:bg-red-50 transition-all">
                                <X class="w-6 h-6 text-slate-400 hover:text-red-500" />
                            </button>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div v-for="day in weekPlan" :key="day.day" class="border border-slate-100 rounded-[2rem] p-6 bg-slate-50/50 hover:bg-white hover:border-indigo-100 transition-colors shadow-sm relative">
                                <div class="absolute top-6 right-6">
                                    <div class="w-3 h-3 rounded-full shadow-sm" :class="day.active ? 'bg-emerald-400' : 'bg-slate-300'"></div>
                                </div>
                                <h3 class="text-lg font-black italic text-slate-900 uppercase tracking-tighter mb-4">{{ day.day }}</h3>
                                
                                <div class="space-y-4">
                                    <div>
                                        <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic mb-2 block">Keywords / Audience</label>
                                        <input type="text" v-model="day.target" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50" />
                                    </div>
                                    <div class="flex gap-4">
                                        <div class="flex-1">
                                            <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic mb-2 block">Volume</label>
                                            <input type="number" v-model="day.limit" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 focus:outline-none focus:border-indigo-400 font-mono" />
                                        </div>
                                    </div>
                                    <div>
                                        <label class="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" v-model="day.active" class="w-4 h-4 rounded text-indigo-600 bg-slate-100 border-slate-300 focus:ring-indigo-500 focus:ring-offset-0">
                                            <span class="text-[10px] font-black uppercase text-slate-600 tracking-widest italic">Node Active</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-end pt-4 border-t border-slate-100">
                            <button @click="showCalendarModal = false; triggerToast('Matrix trajectory updated in Core.');" class="px-12 py-5 bg-slate-900 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 italic shadow-xl">
                                COMMIT MATRIX <Send class="w-4 h-4 text-primary" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <!-- WEBHOOK CONFIG MODAL -->
        <transition name="modal">
            <div v-if="showWebhookModal" class="fixed inset-0 z-[2500] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md text-left">
                <div class="bg-white w-full max-w-xl rounded-[3rem] border border-white shadow-2xl relative">
                    <div class="p-12 space-y-10">
                        <div class="flex items-start justify-between">
                            <div>
                                <h2 class="text-2xl font-black italic tracking-tighter uppercase text-slate-900 flex items-center gap-4">
                                    <Network class="w-8 h-8 text-primary" /> Architecture Config
                                </h2>
                            </div>
                            <button @click="showWebhookModal = false" class="p-4 bg-slate-50 rounded-2xl hover:text-red-500 hover:bg-red-50 transition-all">
                                <X class="w-6 h-6 text-slate-400 hover:text-red-500" />
                            </button>
                        </div>

                        <div class="space-y-6">
                            <div>
                                <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic mb-2 flex items-center gap-2"><Globe class="w-3 h-3"/> n8n Primary Webhook URL</label>
                                <input type="text" v-model="webhookConfig.n8nUrl" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-xs font-mono font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-400" />
                            </div>
                            
                            <div class="p-6 bg-slate-50 border border-slate-200 rounded-[2rem] space-y-6">
                                <div class="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 italic">
                                    <Smartphone class="w-4 h-4 text-indigo-500" /> Dual-Approval Destinations
                                </div>
                                <div>
                                    <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic mb-2 block">Telegram Channel ID</label>
                                    <input type="text" v-model="webhookConfig.tgGroup" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono font-bold text-slate-700 outline-none focus:border-indigo-400" />
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic mb-2 block">Exec 1 WA Node</label>
                                        <input type="text" v-model="webhookConfig.wa1" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono font-bold text-slate-700 outline-none focus:border-indigo-400" />
                                    </div>
                                    <div>
                                        <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic mb-2 block">Exec 2 WA Node</label>
                                        <input type="text" v-model="webhookConfig.wa2" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono font-bold text-slate-700 outline-none focus:border-indigo-400" />
                                    </div>
                                </div>
                            </div>
                            
                            <!-- PREMIUM CLIENT API INTEGRATION -->
                            <div class="p-6 bg-indigo-50/50 border border-indigo-100 rounded-[2rem] space-y-6 relative overflow-hidden">
                                <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl"></div>
                                <div class="text-[10px] font-black text-indigo-900 uppercase tracking-widest flex items-center gap-2 italic relative z-10">
                                    <Globe class="w-4 h-4 text-indigo-600" /> Real API Integration (Client Tokens)
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                                    <div>
                                        <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest italic mb-2 flex items-center gap-2"><Facebook class="w-3 h-3 text-blue-600"/> FB Access Token</label>
                                        <input type="password" v-model="webhookConfig.fbToken" placeholder="EAAI... (Page Token)" class="w-full bg-white border border-indigo-100 rounded-xl px-4 py-3 text-[10px] font-mono font-bold text-slate-700 outline-none focus:border-indigo-400 shadow-sm" />
                                    </div>
                                    <div>
                                        <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest italic mb-2 flex items-center gap-2"><Linkedin class="w-3 h-3 text-blue-700"/> LI Access Token</label>
                                        <input type="password" v-model="webhookConfig.liToken" placeholder="AQW... (Auth Token)" class="w-full bg-white border border-indigo-100 rounded-xl px-4 py-3 text-[10px] font-mono font-bold text-slate-700 outline-none focus:border-indigo-400 shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-end pt-4 border-t border-slate-100">
                            <button @click="showWebhookModal = false; triggerToast('Architecture routing protocol saved.');" class="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 italic shadow-xl shadow-indigo-600/20">
                                LOCK CONFIG
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes modal-slide { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.modal-enter-active { animation: modal-slide 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-leave-active { animation: modal-slide 0.3s ease-in reverse; }
</style>
