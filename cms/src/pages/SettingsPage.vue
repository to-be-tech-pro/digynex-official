<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-xl fade-in-up">
      <div class="col">
        <h1 class="text-h4 text-weight-bolder text-emerald-gradient q-my-none">
          System Intelligence Settings
        </h1>
        <p class="text-grey-5 text-subtitle1 q-mt-sm q-mb-none font-medium text-emerald-light">
          Configure your digital infrastructure and system protocols.
        </p>
      </div>
    </div>

    <div class="row q-col-gutter-lg">
      <!-- Settings Navigation -->
      <div class="col-12 col-md-3">
        <q-card class="bg-dark-card border-glass border-radius-lg overflow-hidden">
          <q-tabs
            v-model="tab"
            vertical
            class="text-grey-5"
            active-color="emerald"
            active-bg-color="emerald-transparent"
            indicator-color="emerald"
            align="left"
          >
            <q-tab
              name="general"
              icon="tune"
              label="General"
              class="justify-start q-pl-md font-bold"
              no-caps
            />
            <q-tab
              name="subscription"
              icon="star"
              label="Subscription"
              class="justify-start q-pl-md font-bold"
              no-caps
            />
            <q-tab
              name="notifications"
              icon="notifications"
              label="Notifications"
              class="justify-start q-pl-md font-bold"
              no-caps
            />
            <q-tab
              name="security"
              icon="security"
              label="Security"
              class="justify-start q-pl-md font-bold"
              no-caps
            />
            <q-tab
              name="data"
              icon="cloud_download"
              label="Data"
              class="justify-start q-pl-md font-bold"
              no-caps
            />
            <q-tab
              name="audit"
              icon="history"
              label="Audit Logs"
              class="justify-start q-pl-md font-bold"
              no-caps
            />
          </q-tabs>
        </q-card>
      </div>

      <!-- Settings Content -->
      <div class="col-12 col-md-9">
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="fade"
          transition-next="fade"
          class="bg-transparent"
        >
          <!-- General System Settings -->
          <q-tab-panel name="general" class="q-pa-none">
            <q-card class="bg-dark-card border-glass border-radius-lg q-mb-lg">
              <q-card-section class="q-pa-lg">
                <div class="text-h6 text-weight-bold text-white q-mb-md uppercase tracking-wider">
                  Entity Information
                </div>
                <div class="row q-col-gutter-lg">
                  <div class="col-12 col-sm-6">
                    <q-input
                      outlined
                      dark
                      v-model="general.name"
                      label="Organization Name"
                      dense
                      class="bg-black-opacity"
                    />
                  </div>
                  <div class="col-12 col-sm-6">
                    <q-input
                      outlined
                      dark
                      v-model="general.email"
                      label="System Email"
                      dense
                      class="bg-black-opacity"
                    />
                  </div>
                  <div class="col-12 col-sm-6">
                    <q-input
                      outlined
                      dark
                      v-model="general.phone"
                      label="System Contact"
                      dense
                      class="bg-black-opacity"
                    />
                  </div>
                  <div class="col-12 col-sm-6">
                    <q-select
                      outlined
                      dark
                      v-model="general.currency"
                      :options="['SEK', 'LKR', 'USD']"
                      label="Financial Currency"
                      dense
                      class="bg-black-opacity"
                      @update:model-value="updateCurrency"
                    />
                  </div>
                </div>
              </q-card-section>
              <q-card-actions align="right" class="q-pa-md">
                <q-btn
                  unelevated
                  rounded
                  class="bg-emerald-gradient text-white q-px-xl"
                  label="Synchronize Protocol"
                  no-caps
                />
              </q-card-actions>
            </q-card>

            <q-card class="no-shadow border-gray">
              <q-card-section>
                <div class="text-h6 text-weight-bold q-mb-sm">Appearance</div>
                <div class="row items-center justify-between q-py-sm">
                  <div>
                    <div class="text-subtitle2">Dark Mode</div>
                    <div class="text-caption text-grey-6">
                      Switch between light and dark themes.
                    </div>
                  </div>
                  <q-toggle v-model="general.darkMode" color="primary" />
                </div>
                <q-separator spaced />
                <div class="row items-center justify-between q-py-sm">
                  <div>
                    <div class="text-subtitle2">Compact Sidebar</div>
                    <div class="text-caption text-grey-6">Show icons only in sidebar.</div>
                  </div>
                  <q-toggle v-model="general.compactSidebar" color="primary" />
                </div>
              </q-card-section>
            </q-card>
          </q-tab-panel>

          <!-- Subscription / Upgrade Plan -->
          <q-tab-panel name="subscription" class="q-pa-none">
            <q-card class="no-shadow border-gray q-mb-md">
              <q-card-section>
                <div class="text-h6 text-weight-bold">Current Plan</div>
                <div class="q-mt-sm row items-center">
                  <q-badge color="grey-7" class="q-px-sm q-py-xs text-body2">FREE TIER</q-badge>
                  <div class="text-caption text-grey-6 q-ml-md">Valid until: Forever</div>
                </div>
              </q-card-section>
            </q-card>

            <div class="row q-col-gutter-md">
              <!-- Free Plan -->
              <div class="col-12 col-md-6">
                <q-card class="no-shadow border-gray h-full">
                  <q-card-section class="q-pa-lg">
                    <div class="text-h5 text-weight-bold">Free</div>
                    <div class="text-h4 text-primary q-my-md">
                      {{ currencyStore.format(0) }} <span class="text-body1 text-grey">/mo</span>
                    </div>
                    <q-separator class="q-my-md" />
                    <q-list dense>
                      <q-item
                        ><q-item-section avatar
                          ><q-icon name="check" color="green" /></q-item-section
                        ><q-item-section>Unlimited Leads & Assets</q-item-section></q-item
                      >
                      <q-item
                        ><q-item-section avatar
                          ><q-icon name="check" color="green" /></q-item-section
                        ><q-item-section>Basic Interaction Logs</q-item-section></q-item
                      >
                      <q-item
                        ><q-item-section avatar
                          ><q-icon name="check" color="green" /></q-item-section
                        ><q-item-section>Manual Deal Tracking</q-item-section></q-item
                      >
                      <q-item
                        ><q-item-section avatar><q-icon name="close" color="grey" /></q-item-section
                        ><q-item-section class="text-grey">AI Auto-Pilot</q-item-section></q-item
                      >
                      <q-item
                        ><q-item-section avatar><q-icon name="close" color="grey" /></q-item-section
                        ><q-item-section class="text-grey">Priority Support</q-item-section></q-item
                      >
                    </q-list>
                  </q-card-section>
                  <q-card-actions class="q-pa-lg">
                    <q-btn outline class="full-width" label="Current Plan" disable color="grey" />
                  </q-card-actions>
                </q-card>
              </div>

              <!-- Pro Plan -->
              <div class="col-12 col-md-6">
                <q-card
                  class="no-shadow border-gray bg-primary text-white h-full relative-position"
                >
                  <q-badge color="orange" floating class="q-pa-xs">POPULAR</q-badge>
                  <q-card-section class="q-pa-lg">
                    <div class="text-h5 text-weight-bold">Pro</div>
                    <div class="text-h4 text-white q-my-md">
                      {{ currencyStore.format(currencyStore.proPrice) }}
                      <span class="text-body1 text-blue-2">/mo</span>
                    </div>
                    <q-separator color="blue-4" class="q-my-md" />
                    <q-list dense dark>
                      <q-item
                        ><q-item-section avatar
                          ><q-icon name="check" color="green-2" /></q-item-section
                        ><q-item-section>Everything in Free</q-item-section></q-item
                      >
                      <q-item
                        ><q-item-section avatar
                          ><q-icon name="check" color="green-2" /></q-item-section
                        ><q-item-section>Full AI Auto-Pilot</q-item-section></q-item
                      >
                      <q-item
                        ><q-item-section avatar
                          ><q-icon name="check" color="green-2" /></q-item-section
                        ><q-item-section>Automated Revenue Forecasting</q-item-section></q-item
                      >
                      <q-item
                        ><q-item-section avatar
                          ><q-icon name="check" color="green-2" /></q-item-section
                        ><q-item-section>Daily Cloud Backups</q-item-section></q-item
                      >
                      <q-item
                        ><q-item-section avatar
                          ><q-icon name="check" color="green-2" /></q-item-section
                        ><q-item-section>Advanced Predictive Analytics</q-item-section></q-item
                      >
                    </q-list>
                  </q-card-section>
                  <q-card-actions class="q-pa-lg">
                    <q-btn
                      unelevated
                      class="full-width bg-white text-primary text-weight-bold"
                      label="Upgrade Now"
                    />
                  </q-card-actions>
                </q-card>
              </div>
            </div>
          </q-tab-panel>

          <!-- Notifications Settings -->
          <q-tab-panel name="notifications" class="q-pa-none">
            <q-card class="no-shadow border-gray">
              <q-card-section>
                <div class="text-h6 text-weight-bold q-mb-md">Email Notifications</div>
                <div
                  class="q-banner bg-orange-1 text-orange-9 q-pa-sm rounded-borders q-mb-md flex items-center cursor-pointer hover-brighten"
                  @click="tab = 'subscription'"
                >
                  <q-icon name="lock" size="sm" class="q-mr-sm" />
                  Upgrade to Pro to enable automated email notifications.
                </div>
                <q-list>
                  <q-item tag="label" v-ripple class="opacity-50">
                    <q-item-section>
                      <q-item-label
                        >New Lead Detected
                        <q-badge color="orange" align="top">PRO</q-badge></q-item-label
                      >
                      <q-item-label caption
                        >Receive alert when a new lead enters the stream.</q-item-label
                      >
                    </q-item-section>
                    <q-item-section side>
                      <q-toggle color="emerald" v-model="notifications.newStudent" disable />
                    </q-item-section>
                  </q-item>

                  <q-separator spaced />

                  <q-item tag="label" v-ripple class="opacity-50">
                    <q-item-section>
                      <q-item-label
                        >Payment Confirmation
                        <q-badge color="orange" align="top">PRO</q-badge></q-item-label
                      >
                      <q-item-label caption>Receive email for successful payments.</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-toggle color="primary" v-model="notifications.payments" disable />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="text-h6 text-weight-bold q-mb-md">Strategic Alerts</div>
                <div
                  class="q-banner bg-orange-1 text-orange-9 q-pa-sm rounded-borders q-mb-md flex items-center cursor-pointer hover-brighten"
                  @click="tab = 'subscription'"
                >
                  <q-icon name="lock" size="sm" class="q-mr-sm" />
                  Upgrade to Pro to enable instant strategic SMS alerts.
                </div>
                <q-list>
                  <q-item tag="label" v-ripple class="opacity-50">
                    <q-item-section>
                      <q-item-label
                        >Deal Closure Alert
                        <q-badge color="orange" align="top">PRO</q-badge></q-item-label
                      >
                      <q-item-label caption
                        >Send SMS when a high-value deal is about to close.</q-item-label
                      >
                    </q-item-section>
                    <q-item-section side>
                      <q-toggle color="emerald" v-model="notifications.smsAttendance" disable />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-tab-panel>

          <!-- Security Placeholder -->
          <q-tab-panel name="security" class="q-pa-none">
            <q-card class="no-shadow border-gray">
              <q-card-section>
                <div class="text-h6 text-weight-bold q-mb-md">Security Preferences</div>
                <q-banner class="bg-blue-1 text-primary rounded-borders q-mb-md">
                  <template v-slot:avatar>
                    <q-icon name="shield" size="md" />
                  </template>
                  Two-Factor Authentication (2FA) adds an extra layer of security to your account.
                  <template v-slot:action>
                    <q-btn flat label="Enable 2FA" />
                  </template>
                </q-banner>
              </q-card-section>
            </q-card>
          </q-tab-panel>

          <!-- Audit Logs -->
          <q-tab-panel name="audit" class="q-pa-none">
            <q-card class="no-shadow border-gray">
              <q-card-section>
                <div class="text-h6 text-weight-bold q-mb-sm">Audit Logs</div>
                <p class="text-grey-7">
                  Track all important system activities and security events.
                </p>
              </q-card-section>
              <q-table :rows="auditRows" :columns="auditColumns" row-key="id" flat>
                <template v-slot:body-cell-severity="props">
                  <q-td :props="props">
                    <q-badge :color="props.row.severity === 'High' ? 'red' : 'green'">
                      {{ props.row.severity }}
                    </q-badge>
                  </q-td>
                </template>
              </q-table>
            </q-card>
          </q-tab-panel>

          <!-- Data Management -->
          <q-tab-panel name="data" class="q-pa-none">
            <q-card class="no-shadow border-gray q-mb-md">
              <q-card-section>
                <div class="text-h6 text-weight-bold q-mb-sm">Data Backup & Export</div>

                <div
                  class="q-banner bg-orange-1 text-orange-9 q-pa-sm rounded-borders q-mb-md flex items-center q-mt-md"
                >
                  <q-icon name="lock" size="sm" class="q-mr-sm" />
                  <span class="text-weight-bold">Automated Cloud Backup</span> is available on the
                  Pro Plan.
                  <q-btn
                    flat
                    dense
                    label="Upgrade"
                    class="q-ml-sm"
                    size="sm"
                    @click="tab = 'subscription'"
                  />
                </div>

                <p class="text-grey-7 q-mb-none">
                  Manual exports are always free. You can export your data tables as CSV files for
                  local safekeeping.
                </p>
              </q-card-section>

              <q-separator />

              <q-card-section>
                <div class="text-subtitle1 text-weight-bold q-mb-md">Export Data Assets</div>
                <div class="row q-gutter-md">
                  <q-btn
                    outline
                    icon="leaderboard"
                    label="Export Leads"
                    color="emerald"
                    @click="exportData('leads')"
                    :loading="exporting === 'leads'"
                  />
                  <q-btn
                    outline
                    icon="business"
                    label="Export Clients"
                    color="emerald"
                    @click="exportData('clients')"
                    :loading="exporting === 'clients'"
                  />
                  <q-btn
                    outline
                    icon="payments"
                    label="Export Finance"
                    color="emerald"
                    @click="exportData('deals')"
                    :loading="exporting === 'deals'"
                  />
                </div>
              </q-card-section>
            </q-card>
          </q-tab-panel>

          <!-- Team Placeholder -->
          <q-tab-panel name="team" class="q-pa-none">
            <q-card class="no-shadow border-gray flex flex-center column q-pa-xl">
              <q-icon name="groups" size="60px" color="grey-4" />
              <div class="text-h6 text-grey-7 q-mt-md">Team Management coming soon</div>
            </q-card>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from 'boot/supabase'
import { exportFile, useQuasar } from 'quasar'
import { useCurrencyStore } from 'stores/currency'

const $q = useQuasar()
const currencyStore = useCurrencyStore()
const exporting = ref('')

const tab = ref('general')

const general = ref({
  name: 'DigyNex Institute',
  email: 'admin@digynex.com',
  phone: '0771234567',
  currency: currencyStore.currency,
  darkMode: false,
  compactSidebar: false,
})

const updateCurrency = (curr) => {
  if (curr === 'SEK') {
    currencyStore.setCountryCode('SE')
  } else if (curr === 'LKR') {
    currencyStore.setCountryCode('LK')
  } else {
    currencyStore.setCountryCode('US')
  }
}

const notifications = ref({
  newStudent: true,
  payments: true,
  updates: false,
})

// --- AUDIT LOGS ---
const auditColumns = [
  { name: 'date', label: 'Date & Time', field: 'date', align: 'left', sortable: true },
  { name: 'user', label: 'User', field: 'user', align: 'left', sortable: true },
  { name: 'action', label: 'Action', field: 'action', align: 'left' },
  { name: 'details', label: 'Details', field: 'details', align: 'left' },
  { name: 'severity', label: 'Severity', field: 'severity', align: 'center' },
]
const auditRows = ref([
  {
    id: 1,
    date: '2026-02-10 08:30 AM',
    user: 'Nexus Core',
    action: 'System Sync',
    details: 'Successful synchronization with Supabase Cluster',
    severity: 'Low',
  },
  {
    id: 2,
    date: '2026-02-10 09:15 AM',
    user: 'Nexus Core',
    action: 'Lead Capture',
    details: 'Detected 12 new leads from social streams',
    severity: 'Normal',
  },
  {
    id: 3,
    date: '2026-02-10 09:45 AM',
    user: 'System',
    action: 'Deal Closure',
    details: `Financial audit confirmed ${currencyStore.format(25000)} from Svea Finance`,
    severity: 'Normal',
  },
  {
    id: 4,
    date: '2026-02-09 02:00 PM',
    user: 'Root Admin',
    action: 'Schema Change',
    details: 'Upgraded Clients table to Enterprise spec',
    severity: 'High',
  },
])

const exportData = async (table) => {
  exporting.value = table
  try {
    const { data, error } = await supabase.from(table).select('*')
    if (error) throw error

    if (!data || data.length === 0) {
      $q.notify({ type: 'warning', message: 'No data to export' })
      exporting.value = ''
      return
    }

    // Convert to CSV
    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((fieldName) => {
            let val = row[fieldName] === null ? '' : row[fieldName]
            // Escape quotes and wrap in quotes if contains comma
            if (typeof val === 'string' && (val.includes(',') || val.includes('"'))) {
              val = `"${val.replace(/"/g, '""')}"`
            }
            return val
          })
          .join(','),
      ),
    ].join('\r\n')

    const status = exportFile(
      `${table}_export_${new Date().toISOString().slice(0, 10)}.csv`,
      csvContent,
      'text/csv',
    )

    if (status === true) {
      $q.notify({ type: 'positive', message: 'Export successful' })
    } else {
      $q.notify({ type: 'negative', message: 'Browser denied file download' })
    }
  } catch (e) {
    $q.notify({ type: 'negative', message: 'Export failed: ' + e.message })
  }
  exporting.value = ''
}
</script>

<style lang="scss" scoped>
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
.text-emerald {
  color: #10b981;
}
.text-emerald-light {
  color: rgba(16, 185, 129, 0.7);
}
.bg-emerald-gradient {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}
.bg-black-opacity {
  background: rgba(0, 0, 0, 0.2);
}
.emerald-transparent {
  background: rgba(16, 185, 129, 0.05) !important;
}

/* Animations */
.fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.border-gray {
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.hover-brighten {
  transition: filter 0.2s;
}
.hover-brighten:hover {
  filter: brightness(0.95);
}
</style>
