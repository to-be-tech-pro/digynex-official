<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="bg-dark text-white flex flex-center relative-position overflow-hidden">
        <!-- Back Button -->
        <q-btn
          to="/login"
          icon="arrow_back"
          label="Back to Login"
          flat
          no-caps
          class="absolute-top-left q-ma-md z-top text-grey-5 hover-accent"
        />

        <!-- Background Elements -->
        <div class="glow-blob top-right"></div>
        <div class="glow-blob bottom-left"></div>

        <div class="content-container z-top q-pa-md" style="max-width: 450px; width: 100%">
          <div
            class="glass-panel q-pa-lg q-pa-md-xl rounded-xl shadow-24 border-glass text-center relative-position"
          >
            <h2 class="text-h5 text-weight-bold q-mb-md">Reset Password</h2>
            <p class="text-grey-5 q-mb-xl">Enter your email to receive a reset link</p>

            <q-form @submit="handleReset" class="q-gutter-y-md">
              <q-input
                v-model="email"
                dark
                outlined
                label="Email Address"
                color="accent"
                type="email"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please enter your email']"
              >
                <template v-slot:prepend>
                  <q-icon name="email" color="grey-5" />
                </template>
              </q-input>

              <q-btn
                unelevated
                type="submit"
                color="white"
                text-color="dark"
                label="Send Reset Link"
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
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'

const $q = useQuasar()
const email = ref('')
const loading = ref(false)

const handleReset = async () => {
  loading.value = true
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: window.location.origin + '/reset-password',
    })
    if (error) throw error

    $q.notify({
      type: 'positive',
      message: 'Password reset link sent! Check your email.',
      position: 'top',
    })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Error sending reset link',
      position: 'top',
    })
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
// Inherit styles would be better, but copying essential parts for speed
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

.glass-panel {
  background: rgba(30, 30, 30, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.border-glass {
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
