<template>
  <q-page class="q-pa-lg">
    <div class="row q-mb-lg">
      <div class="col">
        <h1 class="text-h5 text-weight-bold q-my-none text-dark">Profile Settings</h1>
        <p class="text-grey-6 q-mt-xs q-mb-none">Manage your personal information and security.</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else class="row q-col-gutter-lg">
      <!-- Left Column: User Card -->
      <div class="col-12 col-md-4">
        <q-card class="no-shadow border-gray text-center q-pa-lg h-full">
          <q-avatar size="100px" class="q-mb-md relative-position">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>

          <div class="text-h6 text-weight-bold">{{ userEmail }}</div>
          <div class="text-caption text-grey-6 q-mb-md">User ID: {{ userId }}</div>

          <q-badge color="primary" label="Authenticated User" class="q-mb-lg" />

          <q-separator class="q-my-md" />

          <div class="text-left q-gutter-y-sm">
            <div class="row items-center">
              <q-icon name="email" color="grey-6" class="q-mr-sm" />
              <span class="text-grey-8">{{ userEmail }}</span>
            </div>
            <div class="row items-center">
              <q-icon name="info" color="grey-6" class="q-mr-sm" />
              <span class="text-grey-8">Last Sign In: {{ lastSignIn }}</span>
            </div>
          </div>
        </q-card>
      </div>

      <!-- Right Column: Forms -->
      <div class="col-12 col-md-8">
        <q-card class="no-shadow border-gray q-mb-md">
          <q-card-section>
            <div class="text-subtitle1 text-weight-bold q-mb-md">Profile Information</div>
            <p class="text-caption text-grey-7">Update your profile details below.</p>

            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-input
                  outlined
                  v-model="form.firstName"
                  label="First Name"
                  dense
                  hint="Update via metadata"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input outlined v-model="form.lastName" label="Last Name" dense />
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right" class="q-pa-md">
            <q-btn
              unelevated
              label="Save Changes"
              color="primary"
              no-caps
              @click="updateProfile"
              :loading="updating"
            />
          </q-card-actions>
        </q-card>

        <q-card class="no-shadow border-gray">
          <q-card-section>
            <div class="text-subtitle1 text-weight-bold q-mb-md text-red-7">Security</div>
            <p class="text-grey-7 text-caption">Change your password.</p>

            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-input
                  outlined
                  v-model="newPassword"
                  label="New Password"
                  type="password"
                  dense
                />
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right" class="q-pa-md">
            <q-btn
              outline
              label="Update Password"
              color="red-7"
              no-caps
              @click="updatePassword"
              :loading="updatingPass"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from 'boot/supabase'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const loading = ref(true)
const updating = ref(false)
const updatingPass = ref(false)

const userId = ref('')
const userEmail = ref('')
const lastSignIn = ref('')

const form = ref({
  firstName: '',
  lastName: '',
})

const newPassword = ref('')

onMounted(async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      userId.value = user.id
      userEmail.value = user.email
      lastSignIn.value = new Date(user.last_sign_in_at).toLocaleDateString()

      // Load metadata if exists
      if (user.user_metadata) {
        form.value.firstName = user.user_metadata.first_name || ''
        form.value.lastName = user.user_metadata.last_name || ''
      }
    }
  } catch (error) {
    console.error('Error fetching user:', error)
  } finally {
    loading.value = false
  }
})

const updateProfile = async () => {
  updating.value = true
  try {
    const { error } = await supabase.auth.updateUser({
      data: {
        first_name: form.value.firstName,
        last_name: form.value.lastName,
      },
    })

    if (error) throw error

    // Sync to profiles table
    const fullName = `${form.value.firstName} ${form.value.lastName}`.trim()
    if (userId.value) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ name: fullName })
        .eq('id', userId.value)

      if (profileError) console.error('Error updating public profile:', profileError)
    }

    $q.notify({ type: 'positive', message: 'Profile updated successfully!' })
  } catch (error) {
    console.error(error) // Log for debugging
    $q.notify({ type: 'negative', message: error.message || 'Error updating profile' })
  } finally {
    updating.value = false
  }
}

const updatePassword = async () => {
  if (!newPassword.value) {
    $q.notify({ type: 'warning', message: 'Please enter a new password' })
    return
  }

  updatingPass.value = true
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword.value,
    })

    if (error) throw error

    $q.notify({ type: 'positive', message: 'Password updated successfully!' })
    newPassword.value = ''
  } catch (error) {
    $q.notify({ type: 'negative', message: error.message })
  } finally {
    updatingPass.value = false
  }
}
</script>

<style lang="scss" scoped>
.border-gray {
  border: 1px solid #eaecf0;
}
.h-full {
  height: 100%;
}
</style>
