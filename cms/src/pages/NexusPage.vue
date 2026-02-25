<template>
  <q-page class="q-pa-lg">
    <!-- Header -->
    <div class="row items-center justify-between q-mb-xl">
      <div>
        <h1 class="text-h4 text-weight-bolder q-my-none row items-center">
          <span class="text-emerald-gradient">Nexus Control Center</span>
          <q-icon name="hub" size="md" class="q-ml-md text-emerald" />
        </h1>
        <p class="text-grey-5 text-subtitle1 q-mt-sm q-mb-none font-medium text-emerald-light">
          Manage and monitor your digital orchestration layer.
        </p>
      </div>
      <div class="row q-gutter-md">
        <q-btn
          unelevated
          rounded
          class="bg-emerald-gradient text-white q-px-lg shadow-2 hover-scale"
          icon="bolt"
          label="New Workflow"
          no-caps
          @click="createNewWorkflow"
        />
      </div>
    </div>

    <!-- Integration Grid -->
    <div class="row q-col-gutter-lg q-mb-xl">
      <div class="col-12 col-md-4" v-for="node in nodes" :key="node.name">
        <q-card class="bg-dark-card border-glass border-radius-lg hover-card overflow-hidden">
          <q-card-section class="q-pa-lg">
            <div class="row items-center justify-between q-mb-md">
              <q-avatar size="50px" class="bg-black-opacity border-glass">
                <q-icon :name="node.icon" :color="node.color" size="28px" />
              </q-avatar>
              <q-toggle
                v-model="node.active"
                :color="node.color"
                keep-color
                @update:model-value="(val) => onNodeToggle(node, val)"
              />
            </div>
            <div class="text-h6 text-white text-weight-bold">{{ node.name }}</div>
            <p class="text-grey-5 q-mt-xs">{{ node.desc }}</p>

            <div class="row items-center justify-between q-mt-lg">
              <q-badge color="grey-9" text-color="grey-4" class="q-px-sm q-py-xs">
                {{ node.executions }} executions
              </q-badge>
              <span
                :class="node.active ? 'text-green' : 'text-grey-7'"
                class="text-caption font-bold"
              >
                ● {{ node.active ? 'Online' : 'Paused' }}
              </span>
            </div>
          </q-card-section>
          <q-linear-progress :value="node.health" :color="node.color" class="q-pb-none" />
        </q-card>
      </div>
    </div>

    <!-- Active Pipelines & Logs -->
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-lg-7">
        <q-card class="bg-dark-card border-glass border-radius-lg q-pa-lg">
          <div class="text-h6 text-white text-weight-bold q-mb-lg">Automation Logs</div>
          <div
            class="log-container bg-black-opacity q-pa-md rounded-borders font-mono text-caption"
          >
            <div v-for="(log, idx) in automationLogs" :key="idx" class="q-mb-sm row no-wrap">
              <span class="text-grey-6 q-mr-md">[{{ log.time }}]</span>
              <span :class="'text-' + log.type" class="col">{{ log.msg }}</span>
              <span class="text-grey-7">SUCCESS</span>
            </div>
          </div>
          <div class="text-center q-mt-md">
            <q-btn
              flat
              dense
              color="emerald"
              label="Clear Logs"
              no-caps
              size="sm"
              @click="clearLogs"
            />
          </div>
        </q-card>
      </div>

      <div class="col-12 col-lg-5">
        <q-card class="bg-dark-card border-glass border-radius-lg q-pa-lg">
          <div class="text-h6 text-white text-weight-bold q-mb-lg">System Health</div>
          <q-list dark>
            <q-item v-for="check in healthChecks" :key="check.label" class="q-px-none">
              <q-item-section>
                <div class="text-white">{{ check.label }}</div>
                <div class="text-caption text-grey-5">{{ check.details }}</div>
              </q-item-section>
              <q-item-section side>
                <q-icon
                  :name="check.ok ? 'check_circle' : 'warning'"
                  :color="check.ok ? 'green' : 'orange'"
                />
              </q-item-section>
            </q-item>
          </q-list>
          <q-btn
            unelevated
            color="emerald"
            label="Run System Diagnostics"
            class="full-width q-mt-lg text-dark font-bold"
            no-caps
            @click="runDiagnostics"
            :loading="diagnosing"
          />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const diagnosing = ref(false)

const nodes = ref([
  {
    name: 'n8n Logic Engine',
    desc: 'Advanced workflow orchestration and multi-step conditional logic.',
    icon: 'hub',
    color: 'deep-orange-7',
    active: true,
    executions: '4,821',
    health: 0.98,
  },
  {
    name: 'Facebook Nexus Connector',
    desc: 'Real-time lead ingestion from Facebook and Instagram Ads.',
    icon: 'facebook',
    color: 'blue-8',
    active: true,
    executions: '1,204',
    health: 0.92,
  },
  {
    name: 'Gemini 1.5 Analysis',
    desc: 'Deep sentiment analysis and strategic response drafting.',
    icon: 'psychology',
    color: 'emerald-5',
    active: true,
    executions: '682',
    health: 0.85,
  },
  {
    name: 'WhatsApp Business API',
    desc: 'Automated notification and customer engagement gateway.',
    icon: 'chat',
    color: 'green-6',
    active: true,
    executions: '2,410',
    health: 0.99,
  },
  {
    name: 'Stripe Webhook Hub',
    desc: 'Financial stream synchronization and automated invoicing.',
    icon: 'payments',
    color: 'indigo-6',
    active: true,
    executions: '184',
    health: 1.0,
  },
  {
    name: 'SendGrid SMTP',
    desc: 'Transactional emails and enterprise reporting delivery.',
    icon: 'email',
    color: 'sky-blue',
    active: false,
    executions: '0',
    health: 0.0,
  },
])

const automationLogs = ref([
  {
    time: '12:45:02',
    msg: 'AI: Sentiment score 0.82 for lead "Sarah Jensen" - High Priority.',
    type: 'emerald',
  },
  {
    time: '12:40:45',
    msg: 'n8n: Multi-stage workflow "Enterprise Onboarding" active.',
    type: 'blue-4',
  },
  {
    time: '12:35:12',
    msg: 'WhatsApp: Automated follow-up sent to +46 701 *** 89.',
    type: 'green-4',
  },
  {
    time: '12:30:00',
    msg: 'System: Real-time sync with Supabase Edge Functions completed.',
    type: 'grey-4',
  },
  {
    time: '12:25:20',
    msg: 'Security: New API key rotation successfully finished.',
    type: 'gold',
  },
])

const runDiagnostics = () => {
  diagnosing.value = true
  $q.notify({
    message: 'Initializing Deep System Scan...',
    icon: 'radar',
    color: 'emerald',
    timeout: 1500,
  })

  setTimeout(() => {
    diagnosing.value = false
    healthChecks.value[4].ok = true
    healthChecks.value[4].details = 'All Gateways recovered (10/10)'
    $q.notify({
      type: 'positive',
      message: 'Nexus System Integrity Restored. All nodes operational.',
      icon: 'verified',
    })
  }, 3000)
}

const clearLogs = () => {
  automationLogs.value = []
  $q.notify({ message: 'Automation buffer purged.', color: 'grey-8', icon: 'delete_sweep' })
}

const createNewWorkflow = () => {
  $q.notify({
    message: 'Opening n8n Visual Logic Editor...',
    icon: 'auto_fix_high',
    color: 'emerald',
  })
}

const onNodeToggle = (node, val) => {
  $q.notify({
    message: `${node.name} ${val ? 'Activated' : 'Suspended'}`,
    color: val ? 'emerald' : 'orange-8',
    icon: val ? 'bolt' : 'power_off',
    position: 'top',
  })
}

const healthChecks = ref([
  { label: 'Core Orchestrator', details: 'All regions operational', ok: true },
  { label: 'Supabase Data Gateway', details: 'Latency: 18ms (Optimal)', ok: true },
  { label: 'n8n Webhook Instance', details: 'Connected & Listening', ok: true },
  { label: 'AI Inference Engine', details: 'Load: 12% (Idle)', ok: true },
  { label: 'External API Gateways', details: '9 Gateways active, 1 error', ok: false },
])
</script>

<style scoped>
.bg-dark-card {
  background: #0f172a !important;
}
.border-glass {
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
}
.border-radius-lg {
  border-radius: 16px;
}
.text-emerald-gradient {
  background: linear-gradient(to right, #10b981, #34d399);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.text-emerald-light {
  color: rgba(16, 185, 129, 0.7);
}
.bg-emerald-gradient {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}
.bg-black-opacity {
  background: rgba(0, 0, 0, 0.3);
}
.font-mono {
  font-family: 'Roboto Mono', monospace;
}
.hover-card:hover {
  transform: translateY(-5px);
  border-color: rgba(16, 185, 129, 0.2) !important;
}
.hover-scale:hover {
  transform: scale(1.02);
}
.font-bold {
  font-weight: 700;
}
</style>
