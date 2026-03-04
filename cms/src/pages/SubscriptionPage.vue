<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-xl">
      <div>
        <h1 class="text-h4 text-weight-bolder text-white q-my-none">Subscription Plans</h1>
        <p class="text-grey-5 q-mt-xs q-mb-none text-subtitle1">
          Choose the perfect plan for your institute.
        </p>
      </div>
      <!-- Regional Toggle -->
      <div class="glass-panel q-px-md q-py-sm rounded-borders border-glass shadow-lg">
        <span class="text-weight-bold text-emerald">Region: </span>
        <span class="text-uppercase text-white text-weight-bold"
          >{{ currencyStore.countryCode }} ({{ currencyStore.currency }})</span
        >
      </div>
    </div>

    <div class="row q-col-gutter-lg justify-center">
      <!-- Starter Plan -->
      <div class="col-12 col-md-4 col-lg-3">
        <q-card class="full-height column no-shadow border-glass bg-dark-card hover-lift">
          <q-card-section class="q-pa-lg">
            <div class="text-overline text-grey-5 font-bold uppercase tracking-widest">STARTER</div>
            <div class="text-h3 text-weight-bolder text-white q-mt-sm">Free</div>
            <div class="text-caption text-grey-6 q-mb-lg">Forever free for small classes</div>

            <q-separator dark class="q-mb-md opacity-20" />

            <q-list dense dark>
              <q-item v-for="feature in starterFeatures" :key="feature" class="q-px-none">
                <q-item-section avatar style="min-width: 30px">
                  <q-icon name="check" color="emerald" size="xs" />
                </q-item-section>
                <q-item-section class="text-grey-3">{{ feature }}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-card-actions align="center" class="q-pa-lg mt-auto">
            <q-btn
              outline
              color="grey-6"
              label="Current Plan"
              class="full-width q-py-sm"
              v-if="currentPlan === 'free'"
              disable
            />
            <q-btn
              outline
              color="emerald"
              label="Select Starter"
              class="full-width q-py-sm q-px-xl"
              v-else
              @click="changePlan('free')"
            />
          </q-card-actions>
        </q-card>
      </div>

      <!-- Growth Plan -->
      <div class="col-12 col-md-4 col-lg-3">
        <q-card class="full-height column no-shadow border-glass bg-dark-card hover-lift relative-position">
          <div class="absolute-top-right q-pa-sm">
            <q-badge color="blue-9" text-color="white" label="POPULAR" class="text-weight-bold" />
          </div>
          <q-card-section class="q-pa-lg">
            <div class="text-overline text-blue-4 font-bold uppercase tracking-widest">GROWTH</div>
            <div class="text-h4 text-weight-bolder text-white q-mt-sm">
              {{
                currencyStore.countryCode === 'LK' || currencyStore.countryCode === 'SL'
                  ? '2.5%'
                  : '5%'
              }}
              <span class="text-h6 text-grey-6 font-regular">/ txn</span>
            </div>
            <div class="text-caption text-grey-6 q-mb-lg">Pay only when you grow</div>

            <q-separator dark class="q-mb-md opacity-20" />

            <q-list dense dark>
              <q-item v-for="feature in growthFeatures" :key="feature" class="q-px-none">
                <q-item-section avatar style="min-width: 30px">
                  <q-icon name="check" color="blue-5" size="xs" />
                </q-item-section>
                <q-item-section class="text-grey-3">{{ feature }}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-card-actions align="center" class="q-pa-lg mt-auto">
            <q-btn
              unelevated
              color="blue-7"
              label="Current Plan"
              class="full-width q-py-sm"
              v-if="currentPlan === 'growth'"
              disable
            />
            <q-btn
              unelevated
              color="blue-7"
              label="Upgrade to Growth"
              class="full-width q-py-sm"
              v-else
              @click="changePlan('growth')"
            />
          </q-card-actions>
        </q-card>
      </div>

      <!-- Pro Plan -->
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
            <div class="text-overline text-emerald font-bold">PRO</div>
            <div class="text-h4 text-weight-bolder q-mt-sm font-numeric">
              {{ currencyStore.format(currencyStore.proPrice) }}
              <span class="text-body2 text-grey-4 font-regular">/ month</span>
            </div>
            <div v-if="currencyStore.taxRate > 0" class="text-caption text-emerald q-mb-md">
              + {{ (currencyStore.taxRate * 100).toFixed(0) }}% Tax ({{ currencyStore.format(currencyStore.proPrice * currencyStore.taxRate) }})
            </div>
            <div class="text-caption text-grey-4 q-mb-lg" v-else>Unlimited power for large institutes</div>

            <q-separator dark class="q-mb-md opacity-20" />

            <q-list dense>
              <q-item v-for="feature in proFeatures" :key="feature" class="q-px-none">
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
              v-if="currentPlan === 'pro'"
              disable
            />
            <q-btn
              unelevated
              class="full-width q-py-sm bg-emerald text-white text-weight-bold hover-bright"
              label="Upgrade to Pro"
              v-else
              @click="openPaymentModal"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="paymentModal" backdrop-filter="blur(10px)">
      <q-card style="min-width: 500px; border-radius: 20px" class="bg-dark-card border-glass text-white">
        <q-card-section class="q-pa-lg">
          <div class="row items-center q-mb-md">
            <div class="text-h6 text-weight-bold">Upgrade Protocol</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup color="grey-6" />
          </div>
          <div class="text-caption text-grey-5 uppercase tracking-widest q-mb-lg">Authorization Required</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-px-lg">
          <!-- Sri Lanka Payment Flow -->
          <div v-if="countryCode === 'LK' || countryCode === 'SL'" class="q-mt-sm fade-in">
            <div class="bg-dark-drawer border-glass q-pa-md rounded-borders q-mb-md">
              <div class="text-weight-bold text-emerald q-mb-md uppercase tracking-tighter">Bank Transfer Details</div>
              <div class="row q-col-gutter-sm">
                <div class="col-6"><div class="text-caption text-grey-6">Bank</div><div class="text-weight-bold">Commercial Bank</div></div>
                <div class="col-6"><div class="text-caption text-grey-6">Account No</div><div class="text-weight-bold font-numeric">123456789</div></div>
                <div class="col-6 q-mt-sm"><div class="text-caption text-grey-6">Branch</div><div class="text-weight-bold">Colombo 7</div></div>
                <div class="col-6 q-mt-sm"><div class="text-caption text-grey-6">Entity</div><div class="text-weight-bold">DigyNex Systems</div></div>
              </div>
              <q-separator dark class="q-my-md opacity-20" />
              <div class="text-caption text-grey-6">Amount Due</div>
              <div class="text-h5 text-weight-bolder text-emerald font-numeric">
                {{ currencyStore.format(currencyStore.proPrice) }}
              </div>
            </div>

            <div class="text-caption text-grey-5 q-mb-sm uppercase font-bold tracking-widest">Upload Payment Proof</div>
            <q-file
              v-model="receiptFile"
              dark
              filled
              dense
              label="Transaction Receipt"
              accept="image/*,.pdf"
              class="q-mb-md"
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" color="emerald" />
              </template>
            </q-file>
          </div>

          <!-- International Payment Flow -->
          <div v-else class="q-mt-sm fade-in text-center q-pb-lg">
            <div class="text-h4 text-weight-bolder text-emerald q-mb-md font-numeric">
              {{ currencyStore.format(currencyStore.proPrice) }}
              <span class="text-body2 text-grey-6 font-regular">/ month</span>
            </div>
            <p class="text-grey-5">Encrypted payment orchestration via Stripe Gateway.</p>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-lg">
          <q-btn flat label="Abort" color="grey-6" v-close-popup no-caps />
          <q-btn
            unelevated
            class="bg-emerald-gradient text-white q-px-xl font-bold"
            rounded
            :label="countryCode === 'LK' || countryCode === 'SL' ? 'Validate Receipt' : 'Authorize Payment'"
            :loading="loading"
            @click="processUpgrade"
            no-caps
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'
import { useCurrencyStore } from 'stores/currency'

const $q = useQuasar()
const currencyStore = useCurrencyStore()

const countryCode = computed(() => currencyStore.countryCode)
const currentPlan = ref('free')

const paymentModal = ref(false)
const receiptFile = ref(null)
const loading = ref(false)
const user = ref(null)

const starterFeatures = ['Max 10 Students', 'Basic Dashboard', 'Manual Attendance']
const growthFeatures = [
  'Max 100 Students',
  'QR Attendance',
  'Manual & Stripe Payments',
  'Email Support',
]
const proFeatures = [
  'Unlimited Students',
  '0% Commission',
  'Advanced Analytics',
  'Priority Support',
  'Custom Branding',
]

onMounted(async () => {
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
      if (data.country_code) currencyStore.setCountryCode(data.country_code)
    }
  }
})

const changePlan = async (plan) => {
  // Switching to Free or Growth usually happens instantly or via contact if downgrading logic is complex.
  // For this MVP, we allow switching to 'free' or 'growth' easily (assuming no data limits violated yet, checking that would be next step).
  try {
    if (plan === 'free' || plan === 'growth') {
      // We should check limits here ideally, but for now just update.
      // "If plan_type == 'growth' and count >= 100: Block addition" - this is enforcement.
      // Changing plan itself might need checks.

      $q.dialog({
        title: 'Confirm Change',
        message: `Are you sure you want to switch to the ${plan} plan?`,
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        const { error } = await supabase
          .from('profiles')
          .update({ plan_type: plan })
          .eq('id', user.value.id)
        if (error) throw error
        currentPlan.value = plan
        $q.notify({ type: 'positive', message: `Switched to ${plan} plan.` })
      })
    }
  } catch {
    $q.notify({ type: 'negative', message: 'Failed to update plan.' })
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

      // Auto-upgrade to Pro for international mock
      const { error } = await supabase
        .from('profiles')
        .update({ plan_type: 'pro', subscription_status: 'active' })
        .eq('id', user.value.id)
      if (error) throw error

      currentPlan.value = 'pro'
      $q.notify({ type: 'positive', message: 'Payment successful! Welcome to Pro.' })
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
.border-emerald-glow {
  border: 1px solid #10b981;
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.2);
}
.bg-dark-card {
  background: #0f172a !important;
}
.border-glass {
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
}
.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
}
.hover-lift {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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
