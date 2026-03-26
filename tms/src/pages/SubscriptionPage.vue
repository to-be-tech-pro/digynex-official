<template>
  <q-page class="q-pa-lg bg-grey-1">
    <div class="row items-center justify-between q-mb-xl">
      <div>
        <h1 class="text-h4 text-weight-bolder text-dark q-my-none">Subscription Plans</h1>
        <p class="text-grey-7 q-mt-xs q-mb-none text-subtitle1">
          Choose the perfect plan for your institute.
        </p>
      </div>
      <!-- Regional Tracking -->
      <div class="bg-white q-px-lg q-py-sm rounded-borders shadow-sm border-light flex items-center">
        <q-icon name="public" color="primary" class="q-mr-sm" size="xs" />
        <span class="text-weight-bold text-grey-9 q-mr-xs">Operational Region: </span>
        <span class="text-primary text-weight-bolder uppercase tracking-widest"
          >{{ currencyStore.countryCode }} ({{ currencyStore.currency }})</span
        >
      </div>
    </div>

    <!-- Pricing Cards -->
    <div class="row q-col-gutter-lg justify-center">
      <!-- Starter Plan -->
      <div class="col-12 col-md-4 col-lg-3">
        <q-card class="full-height column no-shadow border-gray hover-lift">
          <q-card-section class="q-pa-lg">
            <div class="text-overline text-grey-7 font-bold">STARTER</div>
            <div class="text-h4 text-weight-bolder q-mt-sm font-numeric">
              {{ currencyStore.format(currencyStore.pricing.starter) }}
              <span class="text-body2 text-grey-6 font-regular">/ month</span>
            </div>
            <div class="text-caption text-grey-6 q-mb-lg">Perfect for small operations</div>

            <q-separator class="q-mb-md" />

            <q-list dense>
              <q-item v-for="feature in starterFeatures" :key="feature" class="q-px-none">
                <q-item-section avatar style="min-width: 30px">
                  <q-icon name="check" color="green-5" size="xs" />
                </q-item-section>
                <q-item-section class="text-grey-8">{{ feature }}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-card-actions align="center" class="q-pa-lg mt-auto">
            <q-btn
              outline
              color="dark"
              label="Current Plan"
              class="full-width q-py-sm"
              v-if="currentPlan === 'starter'"
              disable
            />
            <q-btn
              outline
              color="primary"
              label="Choose Starter"
              class="full-width q-py-sm"
              v-else
              @click="changePlan('starter')"
            />
          </q-card-actions>
        </q-card>
      </div>

      <!-- Business Plan -->
      <div class="col-12 col-md-4 col-lg-3">
        <q-card class="full-height column no-shadow border-gray hover-lift relative-position">
          <div class="absolute-top-right q-pa-sm">
            <q-badge color="blue-1" text-color="blue-9" label="POPULAR" class="text-weight-bold" />
          </div>
          <q-card-section class="q-pa-lg">
            <div class="text-overline text-blue-9 font-bold">BUSINESS</div>
            <div class="text-h4 text-weight-bolder q-mt-sm font-numeric">
              {{ currencyStore.format(currencyStore.pricing.business) }}
              <span class="text-body2 text-grey-6 font-regular">/ month</span>
            </div>
            <div class="text-caption text-grey-6 q-mb-lg">Deep analytics & full automation</div>

            <q-separator class="q-mb-md" />

            <q-list dense>
              <q-item v-for="feature in businessFeatures" :key="feature" class="q-px-none">
                <q-item-section avatar style="min-width: 30px">
                  <q-icon name="check" color="blue-5" size="xs" />
                </q-item-section>
                <q-item-section class="text-grey-8">{{ feature }}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-card-actions align="center" class="q-pa-lg mt-auto">
            <q-btn
              unelevated
              color="blue-6"
              label="Current Plan"
              class="full-width q-py-sm"
              v-if="currentPlan === 'business'"
              disable
            />
            <q-btn
              unelevated
              color="blue-6"
              label="Upgrade to Business Plan"
              class="full-width q-py-sm"
              v-else
              @click="changePlan('business')"
            />
          </q-card-actions>
        </q-card>
      </div>

      <!-- Enterprise Plan -->
      <div class="col-12 col-md-4 col-lg-3">
        <q-card
          class="full-height column no-shadow border-emerald-glow bg-dark text-white transform-scale"
        >
          <div class="absolute-top-right q-pa-sm">
            <q-badge
              color="emerald"
              text-color="white"
              label="RECOMMENDED"
              class="text-weight-bold shadow-2"
            />
          </div>
          <q-card-section class="q-pa-lg">
            <div class="text-overline text-emerald font-bold">ENTERPRISE</div>
            <div class="text-h4 text-weight-bolder q-mt-sm font-numeric">
              {{ currencyStore.format(currencyStore.pricing.enterprise) }}
              <span class="text-body2 text-grey-4 font-regular">/ month</span>
            </div>
            <div v-if="currencyStore.taxRate > 0" class="text-caption text-emerald q-mb-md">
              + {{ (currencyStore.taxRate * 100).toFixed(0) }}% Tax ({{ currencyStore.format(currencyStore.enterprisePrice - currencyStore.pricing.enterprise) }})
            </div>
            <div class="text-caption text-grey-4 q-mb-lg" v-else>The ultimate business engine</div>

            <q-separator dark class="q-mb-md opacity-20" />

            <q-list dense>
              <q-item v-for="feature in enterpriseFeatures" :key="feature" class="q-px-none">
                <q-item-section avatar style="min-width: 30px">
                  <q-icon name="check" color="emerald" size="xs" />
                </q-item-section>
                <q-item-section class="text-grey-2">{{ feature }}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-card-actions align="center" class="q-pa-lg mt-auto">
            <q-btn
              unelevated
              class="full-width q-py-sm bg-emerald text-white text-weight-bold"
              label="Current Plan"
              v-if="currentPlan === 'enterprise'"
              disable
            />
            <q-btn
              unelevated
              class="full-width q-py-sm bg-emerald text-white text-weight-bold hover-bright"
              label="Upgrade to Enterprise"
              v-else
              @click="openPaymentModal"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- Payment Modal for Pro -->
    <q-dialog v-model="paymentModal" persistent>
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">Upgrade to Pro</div>
          <div class="text-caption text-grey-6">Please complete payment to activate.</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <!-- Sri Lanka Payment Flow -->
          <div v-if="countryCode === 'LK'" class="q-mt-sm fade-in">
            <div class="bg-blue-1 text-blue-9 q-pa-md rounded-borders q-mb-md">
              <div class="text-weight-bold q-mb-xs">Bank Transfer Details</div>
              <div class="text-caption">Bank: Commercial Bank</div>
              <div class="text-caption">Account No: 123456789</div>
              <div class="text-caption">Branch: Colombo 7</div>
              <div class="text-caption">Name: DigyNex Systems</div>
              <div class="text-caption q-mt-sm">
                Amount:
                <span class="text-weight-bold">{{
                  currencyStore.format(currencyStore.proPrice)
                }}</span>
              </div>
            </div>

            <div class="text-weight-medium q-mb-sm">Upload Payment Receipt</div>
            <q-file
              v-model="receiptFile"
              outlined
              dense
              label="Slip / Screenshot"
              accept="image/*,.pdf"
              class="q-mb-md"
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" />
              </template>
            </q-file>
          </div>

          <!-- International Payment Flow -->
          <div v-else class="q-mt-sm fade-in text-center">
            <div class="text-h5 text-weight-bold q-mb-md">
              {{ currencyStore.format(currencyStore.pricing.enterprise) }} / month
            </div>
            <p class="text-grey-6">Secure payment via Stripe.</p>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn
            unelevated
            :color="countryCode === 'LK' ? 'secondary' : 'primary'"
            :label="countryCode === 'LK' ? 'Submit Receipt' : 'Pay Now'"
            :loading="loading"
            @click="processUpgrade"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'
import { useCurrencyStore } from 'stores/currency'

const $q = useQuasar()
const currencyStore = useCurrencyStore()

const currentPlan = ref('free')

const paymentModal = ref(false)
const receiptFile = ref(null)
const loading = ref(false)
const user = ref(null)

const starterFeatures = ['Up to 100 Records', 'Basic Dashboard', 'QR Check-in']
const businessFeatures = [
  'Up to 500 Records',
  'Advanced BI Reports',
  'Automated Reminders (n8n)',
  'Lead Pipeline Management',
]
const enterpriseFeatures = [
  'Infinite Scaling (800+)',
  'AI Decision Forecasting',
  'Priority Success Manager',
  'Custom White-Labeling',
  'Dedicated API Support',
]

onMounted(async () => {
  // Initialize currency detection first
  await currencyStore.initialize()
  
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()
  if (authUser) {
    user.value = authUser
    const { data } = await supabase
      .from('profiles')
      .select('plan_type, country_code')
      .eq('id', authUser.id)
      .single()

    if (data) {
      currentPlan.value = data.plan_type || 'free'
      // DB overrides local detection if set
      if (data.country_code) currencyStore.countryCode = data.country_code
    }
  }
})

const changePlan = async (plan) => {
  try {
    if (plan === 'starter' || plan === 'business') {
      $q.dialog({
        title: 'Confirm Plan Change',
        message: `Are you sure you want to switch to the ${plan} plan? This will change your feature set and billing tier.`,
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        const { error } = await supabase
          .from('profiles')
          .update({ plan_type: plan })
          .eq('id', user.value.id)
        if (error) throw error
        currentPlan.value = plan
        $q.notify({ type: 'positive', message: `Successfully switched to ${plan.toUpperCase()} plan.` })
      })
    }
  } catch {
    $q.notify({ type: 'negative', message: 'Failed to update plan. Please contact support.' })
  }
}

const openPaymentModal = () => {
  paymentModal.value = true
}

const processUpgrade = async () => {
  loading.value = true
  try {
    if (currencyStore.countryCode === 'LK' || currencyStore.countryCode === 'SL') {
      // SL Logic (Bank Transfer)
      if (!receiptFile.value) {
        $q.notify({ type: 'warning', message: 'Please upload a receipt.' })
        loading.value = false
        return
      }

      // Upload Logic
      const fileName = `${user.value.id}/${Date.now()}_${receiptFile.value.name}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('receipts')
        .upload(fileName, receiptFile.value)

      if (uploadError) console.warn('Upload failed (mock mode?)', uploadError)

      const receiptUrl = uploadData?.path || 'demo_' + fileName

      const { error } = await supabase.from('payment_proofs').insert({
        user_id: user.value.id,
        amount: currencyStore.proPrice,
        currency: currencyStore.currency,
        receipt_url: receiptUrl,
        status: 'pending', // Admin must approve
      })
      if (error) throw error

      $q.notify({ type: 'positive', message: 'Receipt submitted. Plan activates upon approval.' })
      paymentModal.value = false
    } else {
      // International Logic (Stripe)
      // Mocking successful stripe payment
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Auto-upgrade for international mock
      const { error } = await supabase
        .from('profiles')
        .update({ plan_type: 'enterprise', subscription_status: 'active' })
        .eq('id', user.value.id)
      if (error) throw error

      currentPlan.value = 'enterprise'
      $q.notify({ type: 'positive', message: 'Payment successful! Welcome to Enterprise.' })
      paymentModal.value = false
    }
  } catch (e) {
    $q.notify({ type: 'negative', message: 'Error: ' + e.message })
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.border-gray {
  border: 1px solid #eaecf0;
}
.border-emerald-glow {
  border: 1px solid #10b981;
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.2);
}
.hover-lift {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  }
}
.transform-scale {
  transition: transform 0.3s ease;
  transform: scale(1.02);
  &:hover {
    transform: scale(1.05);
  }
}
.text-emerald {
  color: #10b981;
}
.bg-emerald {
  background: #10b981;
}
.font-bold {
  font-weight: 700;
}
.font-regular {
  font-weight: 400;
}
.opacity-20 {
  opacity: 0.2;
}
.hover-bright:hover {
  filter: brightness(110%);
}
.mt-auto {
  margin-top: auto;
}
</style>
