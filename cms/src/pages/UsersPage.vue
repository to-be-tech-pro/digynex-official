<template>
  <q-page class="q-pa-lg">
    <!-- Header -->
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="text-h5 text-weight-bold q-my-none text-dark">System Users</h1>
        <p class="text-grey-6 q-mt-xs q-mb-none">Manage system administrators and staff access.</p>
      </div>
      <div class="q-gutter-x-sm">
        <q-btn
          unelevated
          icon="add"
          color="primary"
          label="New User"
          no-caps
          @click="openAddDialog"
        />
      </div>
    </div>

    <!-- Users Table -->
    <q-card class="no-shadow border-gray">
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="id"
        flat
        bordered
        :pagination="{ rowsPerPage: 10 }"
      >
        <!-- Custom Name Column with Avatar -->
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <div class="row items-center no-wrap">
              <q-avatar size="32px" class="q-mr-sm" color="orange-1" text-color="orange-9">
                {{ props.row.name.charAt(0) }}
              </q-avatar>
              <div>
                <div class="text-weight-bold">{{ props.row.name }}</div>
                <div class="text-caption text-grey-6">{{ props.row.email }}</div>
              </div>
            </div>
          </q-td>
        </template>

        <!-- Role Column -->
        <template v-slot:body-cell-role="props">
          <q-td :props="props">
            <q-badge
              :color="getRoleColor(props.row.role)"
              :text-color="getRoleTextColor(props.row.role)"
              class="q-px-sm"
              rounded
            >
              {{ props.row.role }}
            </q-badge>
          </q-td>
        </template>

        <!-- Status Column -->
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge
              :color="props.row.status === 'Active' ? 'green-1' : 'red-1'"
              :text-color="props.row.status === 'Active' ? 'green-8' : 'red-8'"
              class="q-px-sm q-py-xs text-weight-bold"
            >
              {{ props.row.status }}
            </q-badge>
          </q-td>
        </template>

        <!-- Actions Column -->
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" auto-width>
            <q-btn flat round dense icon="more_vert" color="grey-7">
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="editUser(props.row)">
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="resetPassword(props.row)">
                    <q-item-section>Reset Password</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item
                    clickable
                    v-close-popup
                    class="text-red"
                    @click="deleteUser(props.row.id)"
                  >
                    <q-item-section>Delete</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Edit/Add Dialog -->
    <q-dialog v-model="editDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">{{ isEditMode ? 'Edit User Details' : 'Add New User' }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-gutter-y-md">
          <q-input outlined v-model="editingRow.name" label="Full Name" dense />
          <q-input outlined v-model="editingRow.email" label="Email Address" dense />

          <q-select
            outlined
            v-model="editingRow.role"
            :options="['Admin', 'Manager', 'Staff', 'Editor']"
            label="Role"
            dense
          />

          <!-- Password Field (Only for New Users or intentional reset in edit) -->
          <div v-if="!isEditMode">
            <q-input
              outlined
              v-model="editingRow.password"
              label="Password"
              type="password"
              dense
              hint="Set an initial password for the user"
            />
          </div>

          <q-select
            outlined
            v-model="editingRow.status"
            :options="['Active', 'Inactive']"
            label="Status"
            dense
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary q-pa-md">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn
            unelevated
            :label="isEditMode ? 'Save Changes' : 'Create User'"
            color="primary"
            @click="saveUser"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Password Reset Dialog -->
    <q-dialog v-model="passwordDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Reset Password</div>
          <div class="text-caption text-grey-6">
            Set a new password for {{ selectedUser?.name }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input outlined v-model="newPassword" label="New Password" type="password" dense />
        </q-card-section>

        <q-card-actions align="right" class="text-primary q-pa-md">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn
            unelevated
            label="Update Password"
            color="primary"
            @click="confirmPasswordReset"
            v-close-popup
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

const $q = useQuasar()
const editDialog = ref(false)
const passwordDialog = ref(false)
const editingRow = ref({})
const isEditMode = ref(false)
const selectedUser = ref(null)
const newPassword = ref('')
const loading = ref(false)

const columns = [
  {
    name: 'name',
    required: true,
    label: 'User Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  { name: 'role', align: 'left', label: 'Role', field: 'role', sortable: true },
  { name: 'email', align: 'left', label: 'Email', field: 'email' },
  { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
  { name: 'actions', align: 'right', label: '', field: 'actions' },
]

const rows = ref([])

onMounted(() => {
  fetchUsers()
})

const fetchUsers = async () => {
  loading.value = true
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) {
    $q.notify({ type: 'negative', message: 'Error fetching users: ' + error.message })
  } else {
    rows.value = data
  }
  loading.value = false
}

const getRoleColor = (role) => {
  switch (role) {
    case 'Admin':
      return 'purple-1'
    case 'Manager':
      return 'blue-1'
    case 'Staff':
      return 'grey-2'
    default:
      return 'grey-1'
  }
}

const getRoleTextColor = (role) => {
  switch (role) {
    case 'Admin':
      return 'purple-9'
    case 'Manager':
      return 'blue-9'
    case 'Staff':
      return 'grey-9'
    default:
      return 'grey-8'
  }
}

const openAddDialog = () => {
  editingRow.value = { status: 'Active', role: 'Staff', password: '' }
  isEditMode.value = false
  editDialog.value = true
}

const editUser = (row) => {
  editingRow.value = { ...row }
  isEditMode.value = true
  editDialog.value = true
}

const resetPassword = (row) => {
  selectedUser.value = row
  newPassword.value = ''
  passwordDialog.value = true
}

const confirmPasswordReset = async () => {
  if (!newPassword.value) return

  loading.value = true
  const { error } = await supabase.functions.invoke('users-admin', {
    body: { action: 'updatePassword', id: selectedUser.value.id, password: newPassword.value },
  })

  loading.value = false
  if (error) {
    $q.notify({ type: 'negative', message: error.message })
  } else {
    $q.notify({
      type: 'positive',
      message: `Password updated for ${selectedUser.value.name}`,
      icon: 'lock_reset',
    })
  }
}

const saveUser = async () => {
  loading.value = true
  if (isEditMode.value) {
    // Edit existing user profile
    const { error } = await supabase.functions.invoke('users-admin', {
      body: {
        action: 'updateProfile',
        id: editingRow.value.id,
        name: editingRow.value.name,
        role: editingRow.value.role,
        status: editingRow.value.status,
      },
    })

    if (error) {
      $q.notify({ type: 'negative', message: error.message })
    } else {
      $q.notify({ type: 'positive', message: 'User updated successfully' })
      fetchUsers() // Refresh list
    }
  } else {
    // Create new user
    const { error } = await supabase.functions.invoke('users-admin', {
      body: {
        action: 'create',
        email: editingRow.value.email,
        password: editingRow.value.password,
        name: editingRow.value.name,
        role: editingRow.value.role,
      },
    })

    if (error) {
      $q.notify({ type: 'negative', message: error.message })
    } else {
      $q.notify({ type: 'positive', message: 'New user created successfully' })
      fetchUsers()
    }
  }
  loading.value = false
}

const deleteUser = (id) => {
  $q.dialog({
    title: 'Confirm Deletion',
    message:
      'Are you sure you want to remove this user? This account will no longer be able to log in.',
    cancel: true,
    persistent: true,
    ok: { label: 'Delete', color: 'negative', flat: true },
  }).onOk(async () => {
    loading.value = true
    const { error } = await supabase.functions.invoke('users-admin', {
      body: { action: 'delete', id: id },
    })

    loading.value = false
    if (error) {
      $q.notify({ type: 'negative', message: error.message })
    } else {
      rows.value = rows.value.filter((row) => row.id !== id)
      $q.notify({ type: 'positive', message: 'User removed successfully', icon: 'delete' })
    }
  })
}
</script>

<style lang="scss" scoped>
.border-gray {
  border: 1px solid #eaecf0;
}
</style>
