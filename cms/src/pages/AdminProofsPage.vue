<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <h1 class="text-h5 text-weight-bold q-my-none">Payment Approvals</h1>
      <q-btn flat icon="refresh" @click="fetchProofs" />
    </div>

    <q-card v-if="loading" class="q-pa-lg text-center">
      <q-spinner size="3em" color="primary" />
    </q-card>

    <q-list v-else separator bordered class="rounded-borders bg-white">
      <q-item v-if="proofs.length === 0" class="text-center text-grey q-pa-lg">
        No pending approvals.
      </q-item>

      <q-item v-for="proof in proofs" :key="proof.id" class="q-py-md">
        <q-item-section avatar>
          <q-icon name="receipt_long" color="primary" size="32px" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-bold">User: {{ proof.user_id }}</q-item-label>
          <q-item-label caption>Reference: {{ proof.id }}</q-item-label>
          <q-item-label caption>{{ proof.created_at }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="row q-gutter-sm">
            <q-btn flat icon="visibility" color="grey-7" @click="viewReceipt(proof.receipt_url)" />
            <q-btn unelevated color="green" label="Approve" @click="approvePayment(proof)" />
            <q-btn flat color="red" label="Reject" @click="rejectPayment(proof)" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'

const $q = useQuasar()
const proofs = ref([])
const loading = ref(false)

const fetchProofs = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('payment_proofs')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    if (error) throw error
    proofs.value = data
  } catch (error) {
    console.error(error) // Admin specific error log
  } finally {
    loading.value = false
  }
}

const approvePayment = async (proof) => {
  try {
    // 1. Update Profile to Pro
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ plan_type: 'pro', subscription_status: 'active' })
      .eq('id', proof.user_id)

    if (profileError) throw profileError

    // 2. Update Proof Status
    const { error: proofError } = await supabase
      .from('payment_proofs')
      .update({ status: 'approved' })
      .eq('id', proof.id)

    if (proofError) throw proofError

    $q.notify({ type: 'positive', message: 'User upgraded to PRO!' })
    await fetchProofs()
  } catch (error) {
    $q.notify({ type: 'negative', message: 'Approval Failed: ' + error.message })
  }
}

const rejectPayment = async (proof) => {
  // Logic to reject
  const { error } = await supabase
    .from('payment_proofs')
    .update({ status: 'rejected' })
    .eq('id', proof.id)

  if (error) {
    $q.notify({ type: 'negative', message: 'Rejection failed' })
  } else {
    fetchProofs()
  }
}

const viewReceipt = (url) => {
  if (url) window.open(url, '_blank')
  else $q.notify({ type: 'warning', message: 'No receipt URL provided' })
}

onMounted(() => {
  fetchProofs()
})
</script>
