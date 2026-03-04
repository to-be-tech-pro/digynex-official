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
        <q-tab name="organizations" label="Organizations" icon="business" class="text-grey-4" />
        <q-tab name="approvals" label="Payments" icon="verified" class="text-grey-4" />
        <q-tab name="users" label="Users" icon="group" class="text-grey-4" />
      </q-tabs>
    </q-card>

    <q-tab-panels v-model="tab" animated class="bg-transparent">
      <!-- Organizations Tab -->
      <q-tab-panel name="organizations" class="q-pa-none">
        <q-card class="no-shadow border-gray">
          <q-table :rows="organizations" :columns="orgColumns" row-key="id" flat :loading="loading">
            <template v-slot:body-cell-category="props">
              <q-td :props="props">
                <q-badge outline color="secondary" :label="props.row.category || 'Standard'" />
              </q-td>
            </template>
            <template v-slot:body-cell-subscription_status="props">
              <q-td :props="props" align="center">
                <q-badge
                  :color="getPlanColor(props.row.subscription_status)"
                  :label="props.row.subscription_status || 'Trial'"
                  class="q-px-sm"
                />
              </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" align="right">
                <q-btn flat round dense icon="edit" color="primary" @click="editOrg(props.row)" />
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
            <template v-slot:body-cell-full_name="props">
              <q-td :props="props">
                <div class="text-weight-bold text-white">{{ props.row.name || 'N/A' }}</div>
              </q-td>
            </template>
            <template v-slot:body-cell-role="props">
              <q-td :props="props">
                <q-badge
                  :color="props.row.role === 'super_admin' ? 'purple' : props.row.role === 'Admin' ? 'blue' : 'grey-7'"
                  :label="props.row.role"
                  class="q-px-sm"
                />
              </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" align="right">
                <q-btn flat round dense icon="manage_accounts" color="primary" @click="editUser(props.row)">
                  <q-tooltip>Manage Permissions</q-tooltip>
                </q-btn>
                <q-btn flat round dense icon="delete" color="red" @click="deleteUser(props.row.id)">
                  <q-tooltip>Delete User</q-tooltip>
                </q-btn>
              </q-td>
            </template>
          </q-table>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>

    <!-- Edit Org Dialog -->
    <q-dialog v-model="orgDialog">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Edit Organization</div>
        </q-card-section>
        <q-card-section class="q-pt-none q-gutter-y-md">
          <q-input outlined v-model="editingOrg.name" label="Organization Name" dense />
          <q-select
            outlined
            v-model="editingOrg.category"
            :options="['General', 'Music', 'Language', 'Science', 'Arts', 'Individual']"
            label="Category"
            dense
          />
          <q-select
            outlined
            v-model="editingOrg.subscription_status"
            :options="['active', 'trial', 'inactive', 'suspended']"
            label="Subscription Status"
            dense
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn unelevated color="primary" label="Save Changes" @click="saveOrg" :loading="saving" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Edit User Dialog -->
    <q-dialog v-model="userDialog">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Manage System User</div>
          <div class="text-caption text-grey">{{ editingUser.email }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none q-gutter-y-md">
          <q-select
            outlined
            v-model="editingUser.org_id"
            :options="organizations"
            option-label="name"
            option-value="id"
            emit-value
            map-options
            label="Assign Organization"
            dense
          />
          <q-select
            outlined
            v-model="editingUser.role"
            :options="['super_admin', 'Admin', 'Staff', 'Tutor']"
            label="System Role"
            dense
            hint="Admin is the Institute Owner"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn unelevated color="primary" label="Update Permissions" @click="saveUser" :loading="saving" />
        </q-card-actions>
      </q-card>
    </q-dialog>

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
import { supabase } from 'boot/supabase'
import { useAuthStore } from 'stores/auth'

const $q = useQuasar()
const authStore = useAuthStore()
const tab = ref('organizations')
const loading = ref(false)
const actionLoading = ref(null)
const organizations = ref([])
const pendingProofs = ref([])
const receiptDialog = ref(false)
const selectedReceipt = ref('')
const users = ref([])

const orgColumns = [
  { name: 'name', label: 'Organization Name', field: 'name', align: 'left', sortable: true },
  { name: 'category', label: 'Category', field: 'category', align: 'left' },
  { name: 'subscription_status', label: 'Status', field: 'subscription_status', align: 'center' },
  {
    name: 'created_at',
    label: 'Created',
    field: 'created_at',
    align: 'right',
    format: (val) => new Date(val).toLocaleDateString(),
  },
  { name: 'actions', label: '', field: 'actions', align: 'right' },
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
    field: (row) => row.name || 'N/A',
    align: 'left',
    sortable: true,
  },
  { name: 'role', label: 'Role', field: 'role', align: 'left', sortable: true },
  { name: 'org_name', label: 'Organization', field: 'org_name', align: 'left' },
  {
    name: 'joined',
    label: 'Joined',
    field: 'created_at',
    align: 'right',
    format: (val) => new Date(val).toLocaleDateString(),
  },
  { name: 'actions', label: '', field: 'actions', align: 'right' },
]

const saving = ref(false)
const orgDialog = ref(false)
const userDialog = ref(false)
const editingOrg = ref({})
const editingUser = ref({})

const loadData = async () => {
  loading.value = true
  try {
    // 1. Fetch Real Organizations
    const { data: orgs, error: orgError } = await supabase.from('organizations').select('*').order('created_at', { ascending: false })
    if (orgError) throw orgError
    organizations.value = orgs

    // 2. Fetch All Profiles for Users tab
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('*, organizations(name)')
      .order('created_at', { ascending: false })
    if (profileError) throw profileError

    users.value = profiles.map(p => ({
      ...p,
      org_name: p.organizations?.name || 'Unassigned'
    }))

    // 3. Fetch Pending Proofs
    const { data: proofs, error: proofError } = await supabase
      .from('payment_proofs')
      .select('*')
      .eq('status', 'pending')

    if (proofError) throw proofError
    pendingProofs.value = proofs
  } catch (e) {
    console.error(e)
    $q.notify({ type: 'negative', message: 'Failed to load data: ' + e.message })
  } finally {
    loading.value = false
  }
}

const getPlanColor = (plan) => {
  switch (plan) {
    case 'active':
      return 'emerald'
    case 'inactive':
      return 'red'
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
    // 1. Update Profile or Organization status?
    // For now, keeping legacy logic but adapting to the new world
    const { error: proofError } = await supabase
      .from('payment_proofs')
      .update({ status: 'approved' })
      .eq('id', row.id)

    if (proofError) throw proofError

    $q.notify({ type: 'positive', message: 'Payment Approved!' })

    // Remove from list
    pendingProofs.value = pendingProofs.value.filter((p) => p.id !== row.id)

    // Refresh data
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

const editOrg = (org) => {
  editingOrg.value = { ...org }
  orgDialog.value = true
}

const saveOrg = async () => {
  saving.value = true
  const { error } = await supabase
    .from('organizations')
    .update({
      name: editingOrg.value.name,
      category: editingOrg.value.category,
      subscription_status: editingOrg.value.subscription_status
    })
    .eq('id', editingOrg.value.id)

  saving.value = false
  if (error) {
    $q.notify({ type: 'negative', message: error.message })
  } else {
    $q.notify({ type: 'positive', message: 'Organization updated' })
    orgDialog.value = false
    loadData()
  }
}

const editUser = (user) => {
  editingUser.value = { ...user }
  userDialog.value = true
}

const saveUser = async () => {
  saving.value = true
  const { error } = await supabase
    .from('profiles')
    .update({
      org_id: editingUser.value.org_id,
      role: editingUser.value.role
    })
    .eq('id', editingUser.value.id)

  saving.value = false
  if (error) {
    $q.notify({ type: 'negative', message: error.message })
  } else {
    $q.notify({ type: 'positive', message: 'User permissions updated' })
    userDialog.value = false
    loadData()
  }
}

const deleteUser = (id) => {
  $q.dialog({
    title: 'Confirm System-Wide Deletion',
    message: 'Are you sure? This will remove the user profile and their access to the system. This cannot be undone.',
    cancel: true,
    persistent: true,
    ok: { label: 'Delete User', color: 'negative', flat: true }
  }).onOk(async () => {
    loading.value = true
    try {
      const { error } = await supabase.functions.invoke('users-admin', {
        body: { action: 'delete', id: id }
      })
      if (error) throw error

      $q.notify({ type: 'positive', message: 'User deleted from system' })
      loadData()
    } catch (e) {
      $q.notify({ type: 'negative', message: 'Delete failed: ' + e.message })
    } finally {
      loading.value = false
    }
  })
}

onMounted(async () => {
  if (!authStore.user) {
    await authStore.initialize()
  }

  if (authStore.isSuperAdmin) {
    loadData()
  } else {
    $q.notify({ type: 'negative', message: 'Access Denied: Super Admin only.' })
  }
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
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.text-gold-gradient {
  background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #bf953f;
}
</style>
