<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="text-h5 text-weight-bold q-my-none text-primary">Super Admin Panel</h1>
        <p class="text-grey-5 q-mt-xs q-mb-none">
          Manage system-wide settings, user organizations, and approvals.
        </p>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="row q-col-gutter-md q-mb-xl">
      <div class="col-12 col-md-4">
        <q-card class="no-shadow border-emerald q-pa-md bg-emerald-1">
          <div class="row items-center no-wrap">
            <q-icon name="apartment" size="md" class="text-emerald-9 q-mr-md" />
            <div>
              <div class="text-caption text-emerald-9 text-uppercase text-weight-bold">
                Total Organizations
              </div>
              <div class="text-h4 text-weight-bold text-emerald-9 q-mt-xs">
                {{ organizations.length }}
              </div>
            </div>
          </div>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card class="no-shadow border-blue q-pa-md bg-blue-1">
          <div class="row items-center no-wrap">
            <q-icon name="pending_actions" size="md" class="text-blue-9 q-mr-md" />
            <div>
              <div class="text-caption text-blue-9 text-uppercase text-weight-bold">
                Pending Approvals
              </div>
              <div class="text-h4 text-weight-bold text-blue-9 q-mt-xs">
                {{ pendingProofs.length }}
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <!-- Tabs -->
    <q-card class="no-shadow border-gray q-mb-lg">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="left"
        narrow-indicator
      >
        <q-tab name="organizations" label="Registered Organizations" icon="business" />
        <q-tab name="approvals" label="Payment Approvals" icon="verified" />
        <q-tab name="users" label="All Users" icon="group" />
      </q-tabs>
    </q-card>

    <q-tab-panels v-model="tab" animated class="bg-transparent">
      <!-- Organizations Tab -->
      <q-tab-panel name="organizations" class="q-pa-none">
        <q-card class="no-shadow border-gray">
          <q-table :rows="organizations" :columns="orgColumns" row-key="id" flat :loading="loading">
            <template v-slot:body-cell-plan="props">
              <q-td :props="props">
                <q-badge
                  :color="getPlanColor(props.row.plan_type)"
                  :label="props.row.plan_type || 'Free'"
                  class="q-px-sm text-capitalize"
                />
              </q-td>
            </template>
            <template v-slot:body-cell-student_count="props">
              <q-td :props="props">
                <!-- Mocking count for now if logic is complex with RLS -->
                {{ props.row.student_count || 0 }}
              </q-td>
            </template>
          </q-table>
        </q-card>
      </q-tab-panel>

      <!-- Approvals Tab -->
      <q-tab-panel name="approvals" class="q-pa-none">
        <q-card class="no-shadow border-gray">
          <q-table
            :rows="pendingProofs"
            :columns="proofColumns"
            row-key="id"
            flat
            :loading="loading"
          >
            <template v-slot:body-cell-receipt="props">
              <q-td :props="props">
                <q-btn
                  flat
                  dense
                  color="primary"
                  icon="visibility"
                  label="View Receipt"
                  @click="viewReceipt(props.row.receipt_url)"
                  no-caps
                  size="sm"
                />
              </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" align="right">
                <q-btn
                  unelevated
                  size="sm"
                  color="emerald"
                  label="Approve"
                  class="q-mr-sm"
                  @click="approvePayment(props.row)"
                  :loading="actionLoading === props.row.id"
                />
                <q-btn
                  outline
                  size="sm"
                  color="red"
                  label="Reject"
                  @click="rejectPayment(props.row)"
                  :loading="actionLoading === props.row.id"
                />
              </q-td>
            </template>
          </q-table>
          <div v-if="pendingProofs.length === 0 && !loading" class="q-pa-lg text-center text-grey">
            No pending approvals found.
          </div>
        </q-card>
      </q-tab-panel>

      <!-- All Users Tab (Bonus) -->
      <!-- All Users Tab -->
      <q-tab-panel name="users" class="q-pa-none">
        <q-card class="no-shadow border-gray">
          <q-table :rows="users" :columns="userColumns" row-key="id" flat :loading="loading">
            <template v-slot:body-cell-role="props">
              <q-td :props="props">
                <q-badge
                  :color="props.row.role === 'Super Admin' ? 'purple' : 'grey-7'"
                  :label="props.row.role"
                  class="q-px-sm"
                />
              </q-td>
            </template>
            <template v-slot:body-cell-plan="props">
              <q-td :props="props">
                <q-badge
                  :color="getPlanColor(props.row.plan_type)"
                  :label="props.row.plan_type || 'Free'"
                  class="q-px-sm text-capitalize"
                />
              </q-td>
            </template>
          </q-table>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>

    <!-- Receipt Dialog -->
    <q-dialog v-model="receiptDialog">
      <q-card style="min-width: 300px; max-width: 80vw">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Payment Receipt</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <img :src="selectedReceipt" style="width: 100%; max-height: 500px; object-fit: contain" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { supabase } from 'src/boot/supabase'

const $q = useQuasar()
const tab = ref('organizations')
const loading = ref(false)
const actionLoading = ref(null)
const organizations = ref([])
const pendingProofs = ref([])
const receiptDialog = ref(false)
const selectedReceipt = ref('')
const users = ref([])

const orgColumns = [
  {
    name: 'id',
    label: 'User ID',
    field: 'id',
    align: 'left',
    sortable: true,
    style: 'max-width: 150px; overflow: hidden; text-overflow: ellipsis;',
  },
  {
    name: 'full_name',
    label: 'Name',
    field: (row) => `${row.first_name || ''} ${row.last_name || ''}`,
    align: 'left',
    sortable: true,
  },
  { name: 'email', label: 'Email', field: 'email', align: 'left', sortable: true },
  { name: 'plan', label: 'Plan Type', field: 'plan_type', align: 'left' },
  {
    name: 'student_count',
    label: 'Students',
    field: 'student_count',
    align: 'center',
    sortable: true,
  },
  {
    name: 'created_at',
    label: 'Joined',
    field: 'created_at',
    align: 'right',
    format: (val) => new Date(val).toLocaleDateString(),
  },
]

const proofColumns = [
  { name: 'user_id', label: 'User ID', field: 'user_id', align: 'left' },
  { name: 'amount', label: 'Amount', field: 'amount', align: 'left' },
  { name: 'currency', label: 'Currency', field: 'currency', align: 'left' },
  {
    name: 'date',
    label: 'Date',
    field: 'created_at',
    align: 'left',
    format: (val) => new Date(val).toLocaleString(),
  },
  { name: 'receipt', label: 'Proof', field: 'receipt_url', align: 'center' },
  { name: 'status', label: 'Status', field: 'status', align: 'center' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'right' },
]

const userColumns = [
  { name: 'email', label: 'Email', field: 'email', align: 'left', sortable: true },
  {
    name: 'full_name',
    label: 'Name',
    field: (row) => `${row.first_name || ''} ${row.last_name || ''}`,
    align: 'left',
    sortable: true,
  },
  { name: 'role', label: 'Role', field: 'role', align: 'left', sortable: true },
  { name: 'plan', label: 'Plan', field: 'plan_type', align: 'center', sortable: true },
  {
    name: 'joined',
    label: 'Joined',
    field: 'created_at',
    align: 'right',
    format: (val) => new Date(val).toLocaleDateString(),
  },
]

const SUPER_ADMINS = [
  'amilawijayanthaperera@gmail.com',
  'amilawijayanthaperera858@gmail.com',
  'admin@digynex.com',
]
const SUPER_ADMIN_IDS = ['74736fbf-0700-4a0d-b797-84d0b0b3b554']

const isSuperAdmin = (p) => {
  return SUPER_ADMINS.includes(p.email?.toLowerCase()) || SUPER_ADMIN_IDS.includes(p.id)
}

const loadData = async () => {
  loading.value = true
  try {
    // 1. Fetch Organizations (Profiles)
    const { data: profiles, error: profileError } = await supabase.from('profiles').select('*')

    if (profileError) throw profileError

    // 2. Fetch Student Counts (Group by user_id)
    const { data: students } = await supabase.from('students').select('user_id')

    // Group count
    const studentCounts = {}
    if (students) {
      students.forEach((s) => {
        if (s.user_id) {
          studentCounts[s.user_id] = (studentCounts[s.user_id] || 0) + 1
        }
      })
    }

    const mappedProfiles = profiles.map((p) => ({
      ...p,
      email: p.email || 'N/A', // If profile lacks email, we might not see it
      student_count: studentCounts[p.id] || 0,
      role: isSuperAdmin(p) ? 'Super Admin' : 'User', // Determine Role
    }))

    organizations.value = mappedProfiles
    users.value = mappedProfiles // Populate users

    // 3. Fetch Pending Proofs
    const { data: proofs, error: proofError } = await supabase
      .from('payment_proofs')
      .select('*')
      .eq('status', 'pending')

    if (proofError) throw proofError
    pendingProofs.value = proofs
  } catch (e) {
    console.error(e)
    $q.notify({ type: 'negative', message: 'Failed to load data' })
  } finally {
    loading.value = false
  }
}

const getPlanColor = (plan) => {
  switch (plan) {
    case 'pro':
      return 'emerald'
    case 'growth':
      return 'blue'
    default:
      return 'grey'
  }
}

const viewReceipt = (url) => {
  selectedReceipt.value = url
  receiptDialog.value = true
}

const approvePayment = async (row) => {
  actionLoading.value = row.id
  try {
    // 1. Update Profile to Pro
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ plan_type: 'pro' })
      .eq('id', row.user_id)

    if (profileError) throw profileError

    // 2. Update Proof Status
    const { error: proofError } = await supabase
      .from('payment_proofs')
      .update({ status: 'approved' })
      .eq('id', row.id)

    if (proofError) throw proofError

    $q.notify({ type: 'positive', message: 'Plan Upgraded to Pro!' })

    // Remove from list
    pendingProofs.value = pendingProofs.value.filter((p) => p.id !== row.id)

    // Refresh orgs
    loadData()
  } catch (e) {
    $q.notify({ type: 'negative', message: 'Action failed: ' + e.message })
  } finally {
    actionLoading.value = null
  }
}

const rejectPayment = async (row) => {
  $q.dialog({
    title: 'Reject Payment',
    message: 'Are you sure?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    // Update status to rejected
    const { error } = await supabase
      .from('payment_proofs')
      .update({ status: 'rejected' })
      .eq('id', row.id)
    if (!error) {
      pendingProofs.value = pendingProofs.value.filter((p) => p.id !== row.id)
      $q.notify({ type: 'info', message: 'Payment rejected.' })
    }
  })
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
.border-emerald {
  border: 1px solid rgba(16, 185, 129, 0.2);
}
.bg-emerald-1 {
  background-color: #ecfdf5 !important;
}
.text-emerald-9 {
  color: #064e3b !important;
}

.border-blue {
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.border-gray {
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
