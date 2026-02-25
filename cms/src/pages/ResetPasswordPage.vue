<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="bg-dark text-white flex flex-center relative-position overflow-hidden">
        <!-- Background Elements -->
        <div class="glow-blob top-right"></div>
        <div class="glow-blob bottom-left"></div>

        <div class="content-container z-top q-pa-md" style="max-width: 450px; width: 100%">
          <div
            class="glass-panel q-pa-lg q-pa-md-xl rounded-xl shadow-24 border-glass text-center relative-position"
          >
            <h2 class="text-h5 text-weight-bold q-mb-md">Set New Password</h2>
            <p class="text-grey-5 q-mb-xl">Please enter your new password below</p>

            <q-form @submit="handlePasswordUpdate" class="q-gutter-y-md">
              <q-input
                v-model="password"
                dark
                outlined
                label="New Password"
                color="accent"
                :type="showPassword ? 'text' : 'password'"
                lazy-rules
                :rules="[
                  (val) => (val && val.length >= 6) || 'Password must be at least 6 characters',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" color="grey-5" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="showPassword ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer"
                    color="grey-5"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>

              <q-input
                v-model="confirmPassword"
                dark
                outlined
                label="Confirm Password"
                color="accent"
                :type="showConfirmPassword ? 'text' : 'password'"
                lazy-rules
                :rules="[(val) => val === password || 'Passwords do not match']"
              >
                <template v-slot:prepend>
                  <q-icon name="lock_clock" color="grey-5" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="showConfirmPassword ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer"
                    color="grey-5"
                    @click="showConfirmPassword = !showConfirmPassword"
                  />
                </template>
              </q-input>

              <q-btn
                unelevated
                type="submit"
                color="white"
                text-color="dark"
                label="Update Password"
                class="full-width text-weight-bold q-py-sm btn-hover-lift"
                :loading="loading"
              />
            </q-form>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'

const $q = useQuasar()
const router = useRouter()

const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)

const handlePasswordUpdate = async () => {
  loading.value = true
  try {
    const { error } = await supabase.auth.updateUser({
      password: password.value,
    })

    if (error) throw error

    $q.notify({
      type: 'positive',
      message: 'Password updated successfully!',
      position: 'top',
    })

    router.push('/login')
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Error updating password',
      position: 'top',
    })
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.glow-blob {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  &.top-right {
    top: -200px;
    right: -200px;
  }
  &.bottom-left {
    bottom: -200px;
    left: -200px;
    background: radial-gradient(circle, rgba($accent, 0.08) 0%, transparent 70%);
  }
}
.bg-glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}
.glass-panel {
  background: rgba(30, 30, 30, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.border-glass {
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.btn-hover-lift {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
  }
}
</style>
