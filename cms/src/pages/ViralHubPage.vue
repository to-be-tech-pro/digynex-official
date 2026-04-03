<template>
  <q-page class="q-pa-lg">
    <!-- Header -->
    <div class="row items-center justify-between q-mb-xl">
      <div>
        <h1 class="text-h4 text-weight-bolder q-my-none row items-center">
          <span class="text-emerald-gradient">AI Social Viral Hub</span>
          <q-icon name="auto_awesome" size="md" class="q-ml-md text-emerald" />
        </h1>
        <p class="text-grey-5 text-subtitle1 q-mt-sm q-mb-none font-medium text-emerald-light">
          Your Intelligent Omni-Channel Lead Generation & Approval Center.
        </p>
      </div>
      <div class="row q-gutter-md">
        <q-btn
          outline
          rounded
          color="emerald"
          icon="settings_ethernet"
          label="Webhook Config"
          no-caps
          class="q-px-lg shadow-1 hover-scale"
          @click="showWebhookSettings = true"
        />
        <q-btn
          unelevated
          rounded
          class="bg-emerald-gradient text-white q-px-lg shadow-2 hover-scale font-bold"
          icon="manage_search"
          label="Force Deep Scan"
          no-caps
          @click="forceSystemScan"
          :loading="scanning"
        />
      </div>
    </div>

    <!-- Main Navigation Tabs -->
    <q-tabs
      v-model="tab"
      dense
      class="text-grey-5 q-mb-lg glass-tabs"
      active-color="emerald"
      indicator-color="emerald"
      align="left"
      narrow-indicator
    >
      <q-tab name="inbox" icon="mark_email_unread" label="Omni-Inbox (Approvals)" />
      <q-tab name="scheduler" icon="edit_calendar" label="7-Day Campaign Logic" />
      <q-tab name="logs" icon="history" label="Activity & Handoff Logs" />
    </q-tabs>

    <q-separator dark class="bg-glass-divider q-mb-lg" />

    <q-tab-panels v-model="tab" animated class="bg-transparent">
      
      <!-- 1. OMNI-INBOX (Pending Approvals) -->
      <q-tab-panel name="inbox" class="q-pa-none">
        <div class="row items-center justify-between q-mb-md">
          <div class="text-h6 text-white text-weight-bold">
            Pending Outbound DMs <q-badge color="red" rounded class="q-ml-sm">{{ pendingLeads.length }}</q-badge>
          </div>
          <div class="text-caption text-grey-5">
            <q-icon name="info" color="emerald" class="q-mr-xs"/> Telegram/WhatsApp dual-approval is active.
          </div>
        </div>

        <div v-if="pendingLeads.length === 0" class="text-center q-my-xl">
          <q-icon name="check_circle_outline" color="grey-8" size="80px" />
          <div class="text-h6 text-grey-6 q-mt-md">Approval Queue Empty</div>
          <p class="text-grey-7">All targeted leads have been processed for today.</p>
        </div>

        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-6" v-for="lead in pendingLeads" :key="lead.id">
            <q-card class="bg-dark-card border-glass border-radius-lg hover-card overflow-hidden full-height flex column">
              <q-card-section class="q-pb-none">
                <div class="flex items-center justify-between q-mb-sm">
                  <q-chip :icon="lead.platformIcon" :color="lead.platformColor" text-color="white" size="sm" class="font-bold tracking-wider uppercase">
                    {{ lead.platform }}
                  </q-chip>
                  <span class="text-caption text-grey-5">Discovered {{ lead.foundTime }}</span>
                </div>
                <div class="row items-center no-wrap">
                  <q-avatar size="50px" class="border-glass">
                    <img :src="lead.avatar" />
                  </q-avatar>
                  <div class="q-ml-md">
                    <div class="text-h6 text-white text-weight-bold" style="line-height:1.2">{{ lead.name }}</div>
                    <div class="text-caption text-emerald">{{ lead.designation }}</div>
                  </div>
                </div>
              </q-card-section>
              
              <q-card-section class="q-py-md col-grow">
                <div class="bg-black-opacity q-pa-md rounded-borders relative-position border-glass">
                  <q-icon name="psychology" color="purple-4" size="sm" class="absolute-top-right q-pa-sm" />
                  <div class="text-caption text-grey-6 text-uppercase font-bold q-mb-xs tracking-widest" style="font-size: 10px;">Gemini Latest Engine Draft</div>
                  <div class="text-body2 text-grey-3" style="white-space: pre-wrap;">{{ lead.draftMessage }}</div>
                </div>
              </q-card-section>

              <q-separator dark class="bg-glass-divider" />
              
              <q-card-actions class="q-pa-md justify-between bg-dark-subtle">
                <q-btn flat color="red-4" icon="block" label="Reject" no-caps @click="rejectLead(lead.id)" />
                <div class="q-gutter-x-sm">
                  <q-btn flat color="orange-4" icon="autorenew" label="Regenerate" no-caps @click="regenerateDraft(lead)" />
                  <q-btn unelevated color="emerald" class="bg-emerald-gradient text-white font-bold" icon="send" label="Approve & Send" no-caps @click="approveAndSend(lead.id)" />
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <!-- 2. 7-DAY CAMPAIGN LOGIC -->
      <q-tab-panel name="scheduler" class="q-pa-none">
        <div class="text-h6 text-white text-weight-bold q-mb-lg">Automated Prospecting Constraints (7-Day Matrix)</div>
        
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-6 col-lg-4" v-for="day in weekPlan" :key="day.day">
            <q-card class="bg-dark-card border-glass border-radius-lg relative-position">
              <div class="absolute-top-right q-pa-md">
                <q-badge :color="day.active ? 'emerald' : 'grey-8'" rounded />
              </div>
              <q-card-section>
                <div class="text-h6 text-white text-weight-bold q-mb-md">{{ day.day }}</div>
                <div class="q-gutter-y-md">
                  <q-input v-model="day.target" dark outlined dense label="Target Keyword / Niche" placeholder="Eg: Retail CEOs in Sweden" color="emerald"/>
                  <q-select v-model="day.platforms" multiple options="['LinkedIn', 'Facebook', 'Email']" dark outlined dense label="Target Platforms" color="emerald" >
                    <template v-slot:append>
                       <q-icon name="webhook" color="emerald"/>
                    </template>
                  </q-select>
                  <div class="row items-center q-col-gutter-ms">
                     <div class="col-8">
                       <q-badge color="grey-9" text-color="white" class="q-pa-sm full-width flex justify-between">
                         Lead Generation Limit <span class="text-emerald font-bold">{{ day.limit }}</span>
                       </q-badge>
                     </div>
                     <div class="col-4">
                       <q-input v-model="day.limit" type="number" dark outlined dense color="emerald" />
                     </div>
                  </div>
                  <q-toggle v-model="day.active" color="emerald" label="Enable Execution" dark />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        
        <div class="row justify-end q-mt-xl">
          <q-btn unelevated rounded class="bg-emerald-gradient text-white q-px-xl font-bold hover-scale" icon="save" label="Commit Scheduling Matrix" no-caps @click="saveScheduler" />
        </div>
      </q-tab-panel>

      <!-- 3. LOGS & HANDOFFS -->
      <q-tab-panel name="logs" class="q-pa-none">
        <q-card class="bg-dark-card border-glass border-radius-lg q-pa-lg">
          <div class="text-h6 text-white text-weight-bold q-mb-md">System Outbound & Handoff Logs</div>
          <p class="text-grey-5 q-mb-lg">Real-time status of webhook dispatches and AI-to-Human handoffs.</p>

          <div class="bg-black-opacity q-pa-md rounded-borders font-mono text-caption text-grey-4 overflow-auto" style="max-height: 400px">
            <div v-for="(log, idx) in activityLogs" :key="idx" class="q-mb-sm row no-wrap border-bottom-glass q-pb-sm">
               <span class="text-grey-6 q-mr-md">[{{ log.time }}]</span>
               <span class="col" :class="log.color">
                  <strong>[{{ log.module }}]</strong> {{ log.msg }}
               </span>
            </div>
          </div>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
    
    <!-- Settings Dialog -->
    <q-dialog v-model="showWebhookSettings" persistent>
      <q-card class="bg-dark-card border-glass text-white" style="min-width: 450px; border-radius: 16px;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-weight-bold row items-center">
             <q-icon name="webhook" color="emerald" size="sm" class="q-mr-sm"/> Orchestrator Config
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup color="grey-5" />
        </q-card-section>

        <q-card-section class="q-pt-md q-gutter-y-md">
           <q-input dark outlined dense v-model="n8nWebhookUrl" label="Primary n8n Webhook URL" color="emerald" />
           <q-input dark outlined dense v-model="tgGroupToken" label="Telegram Approval Chat ID Group" color="blue" />
           
           <q-separator dark class="bg-glass-divider q-my-md"/>
           <div class="text-caption text-grey-5">Approver WhatsApp Endpoints (Fallback)</div>
           <q-input dark outlined dense v-model="waNum1" label="CEO WhatsApp (+46...)" color="green" />
           <q-input dark outlined dense v-model="waNum2" label="Manager WhatsApp (+94...)" color="green" />
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Cancel" color="white" no-caps v-close-popup />
          <q-btn unelevated label="Save Protocol" color="emerald" no-caps v-close-popup class="font-bold" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const tab = ref('inbox')
const scanning = ref(false)
const showWebhookSettings = ref(false)

const n8nWebhookUrl = ref('https://n8n.digynex.se/webhook/viral-hub-dispatch')
const tgGroupToken = ref('-1001928391823')
const waNum1 = ref('')
const waNum2 = ref('')

const pendingLeads = ref([
  {
    id: 'ld_001',
    name: 'Marcus Lindholm',
    designation: 'Operations Director @ NordicTech AB',
    platform: 'LinkedIn',
    platformIcon: 'fab fa-linkedin',
    platformColor: 'blue-8',
    foundTime: '2 hours ago',
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
    draftMessage: "Hi Marcus,\n\nI noticed NordicTech AB is rapidly expanding its digital footprint. We specialize in AI-driven operational scaling and have helped similar firms in Stockholm reduce manual overhead by 40%. \n\nWould you be open to a brief chat next week to share ideas?\n\nBest,\nAmila | DigyNex"
  },
  {
    id: 'ld_002',
    name: 'Sarah Fernando',
    designation: 'Founder @ EduSphere SL',
    platform: 'Facebook',
    platformIcon: 'fab fa-facebook',
    platformColor: 'blue-10',
    foundTime: '5 hours ago',
    avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
    draftMessage: "Hello Sarah, \n\nYour recent post about modernizing tuition systems in Sri Lanka caught my eye. At DigyNex, we've built a dedicated Tuition Management SaaS that completely automates fees, AI receipts, and SMS/WA tracking.\n\nI'd love to show you how our ecosystem functions. Are you free for a quick Zoom call on Thursday?\n\nRegards,\nTeam DigyNex"
  }
])

const weekPlan = ref([
  { day: 'Monday', target: 'Tech Startup CEOs (Sweden)', platforms: ['LinkedIn'], limit: 30, active: true },
  { day: 'Tuesday', target: 'Private College Directors', platforms: ['LinkedIn', 'Facebook'], limit: 50, active: true },
  { day: 'Wednesday', target: 'HR Tech Providers', platforms: ['LinkedIn'], limit: 20, active: true },
  { day: 'Thursday', target: 'E-commerce Owners (B2B)', platforms: ['Facebook', 'Email'], limit: 40, active: false },
  { day: 'Friday', target: 'Digital Agency Founders', platforms: ['LinkedIn'], limit: 25, active: true },
  { day: 'Saturday', target: 'Weekend Retreat (No Ops)', platforms: [], limit: 0, active: false },
  { day: 'Sunday', target: 'Strategic Review & Setup', platforms: [], limit: 0, active: false }
])

const activityLogs = ref([
  { time: '11:05:22', module: 'n8n:Spider', msg: 'Successfully scraped 24 new profiles from LinkedIn.', color: 'text-blue-3' },
  { time: '11:08:15', module: 'Gemini', msg: 'Drafted 24 personalized outbound messages. Confidence score: 92%.', color: 'text-purple-3' },
  { time: '11:10:02', module: 'System', msg: 'Pushed approvals to Telegram ID: -1001928391823 (Waiting logic active).', color: 'text-grey-4' },
  { time: '11:32:44', module: 'Telegram', msg: 'User "Amila" APPROVED message for ID #ld_092.', color: 'text-emerald' },
  { time: '11:32:48', module: 'n8n:Dispatch', msg: 'LinkedIn API: Message delivered to prospect.', color: 'text-blue-4' },
  { time: '11:55:10', module: 'ViralHub:AI', msg: 'HOT LEAD DETECTED! Client replied "Let\'s schedule a call".', color: 'text-orange' },
  { time: '11:55:12', module: 'CMS:Sync', msg: 'Lead formally inserted into DigyNex CMS Pipeline as "Qualified".', color: 'text-emerald' }
])

// Actions
const approveAndSend = (id) => {
  $q.notify({
    type: 'positive',
    message: 'Authorized! Webhook firing to n8n for dispatch.',
    icon: 'rocket_launch'
  })
  pendingLeads.value = pendingLeads.value.filter(lead => lead.id !== id)
  
  activityLogs.value.unshift({
    time: new Date().toLocaleTimeString('en-US', { hour12: false }),
    module: 'WebUI',
    msg: `Authorized dispatch for Lead ID: ${id}. Passed to network.`,
    color: 'text-emerald'
  })
}

const rejectLead = (id) => {
  $q.notify({
    type: 'negative',
    message: 'Lead discarded and removed from queue.',
    icon: 'delete'
  })
  pendingLeads.value = pendingLeads.value.filter(lead => lead.id !== id)
}

const regenerateDraft = (lead) => {
  $q.notify({
    type: 'info',
    message: 'Regenerating message using Gemini Logic...',
    color: 'purple',
    icon: 'auto_awesome'
  })
  setTimeout(() => {
    lead.draftMessage = "[Generated] " + lead.draftMessage + "\n\n(P.S. Added a more aggressive call to action as requested by neural adjust.)"
  }, 1200)
}

const forceSystemScan = () => {
  scanning.value = true
  setTimeout(() => {
    scanning.value = false
    $q.notify({
      type: 'positive',
      message: 'Deep scan complete. Fetching updated targets from LinkedIn/FB channels.',
      icon: 'radar'
    })
  }, 2000)
}

const saveScheduler = () => {
  $q.notify({
    type: 'positive',
    message: '7-Day Targeting Matrix successfully synchronized with n8n core.',
    icon: 'verified'
  })
}
</script>

<style scoped>
.bg-dark-card { background: #0b1120 !important; }
.border-glass { border: 1px solid rgba(255, 255, 255, 0.08) !important; }
.border-radius-lg { border-radius: 16px; }
.text-emerald-gradient {
  background: linear-gradient(to right, #10b981, #34d399);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.bg-emerald-gradient { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
.bg-black-opacity { background: rgba(0, 0, 0, 0.25); }
.bg-dark-subtle { background: rgba(0,0,0,0.15); }
.border-bottom-glass { border-bottom: 1px dashed rgba(255,255,255,0.05); }

.hover-card:hover {
  transform: translateY(-4px);
  border-color: rgba(16, 185, 129, 0.3) !important;
  box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.1), 0 8px 10px -6px rgba(16, 185, 129, 0.1);
}
.hover-scale:hover { transform: scale(1.03); transition: transform 0.2s ease; }
.font-bold { font-weight: 700; }
.bg-glass-divider { background: rgba(255, 255, 255, 0.05); }

.glass-tabs {
  background: rgba(11, 17, 32, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}
</style>
