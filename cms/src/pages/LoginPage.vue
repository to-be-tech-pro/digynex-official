<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="bg-dark text-white flex flex-center relative-position overflow-hidden">
        <!-- Back Button -->
        <q-btn
          to="/"
          icon="arrow_back"
          label="Home"
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
            <!-- Logo -->
            <div class="q-mb-xl cursor-pointer" @click="$router.push('/')">
              <div class="text-h4 text-white text-weight-bold" style="letter-spacing: -1px">
                DigyNex
              </div>
              <div class="text-caption text-grey-5 q-mt-xs">{{ platformTitle }}</div>
            </div>

            <h2 class="text-h5 text-weight-bold q-mb-md">Welcome Back</h2>
            <p class="text-grey-5 q-mb-xl">Sign in to access your dashboard</p>

            <q-form @submit="handleLogin" class="q-gutter-y-md">
              <q-input
                v-model="email"
                dark
                outlined
                label="Email Address"
                color="secondary"
                type="email"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please enter your email']"
              >
                <template v-slot:prepend>
                  <q-icon name="email" color="grey-5" />
                </template>
              </q-input>

              <q-input
                v-model="password"
                dark
                outlined
                label="Password"
                color="secondary"
                :type="showPassword ? 'text' : 'password'"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please enter your password']"
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

              <div class="row justify-between items-center q-mb-md">
                <q-checkbox
                  v-model="rememberMe"
                  dark
                  label="Remember me"
                  size="sm"
                  color="secondary"
                />
                <router-link
                  to="/forgot-password"
                  class="text-grey-5 hover-accent text-decoration-none text-caption"
                  >Forgot Password?</router-link
                >
              </div>

              <q-btn
                unelevated
                type="submit"
                :color="platformTitle === 'Enterprise CMS' ? 'emerald' : 'white'"
                :text-color="platformTitle === 'Enterprise CMS' ? 'white' : 'dark'"
                label="Sign In"
                class="full-width text-weight-bold q-py-sm btn-hover-lift"
                :class="platformTitle === 'Enterprise CMS' ? 'bg-emerald-gradient' : ''"
                :loading="loading"
              />
            </q-form>

            <div class="q-mt-xl text-grey-5">
              Don't have an account?
              <router-link
                to="/register"
                class="text-white text-weight-bold hover-accent text-decoration-none"
                >Sign Up</router-link
              >
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'

const $q = useQuasar()
const router = useRouter()

const platformTitle = computed(() => {
  const params = new URLSearchParams(window.location.search)
  const redirect = params.get('redirect') || ''
  return redirect.includes('/tms') ? 'Tuition Management System' : 'Enterprise CMS'
})

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) throw error

    if (data.session) {
      $q.notify({
        type: 'positive',
        message: 'Welcome back! Redirecting...',
        position: 'top',
        timeout: 1500,
      })

      setTimeout(() => {
        const params = new URLSearchParams(window.location.search)
        const redirect = params.get('redirect') || '/cms/portal/dashboard'
        router.push(redirect)
      }, 1000)
    } else {
      $q.notify({
        type: 'info',
        message: 'Please check your email to confirm your account.',
        position: 'top',
      })
    }
  } catch (error) {
    let msg = error.message
    if (msg.includes('Invalid login credentials')) {
      msg = 'Invalid email or password. Please try again.'
    }
    $q.notify({
      type: 'negative',
      message: msg,
      position: 'top',
    })
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
// Autofill Fix for Dark Mode
:deep(input:-webkit-autofill) {
  -webkit-box-shadow: 0 0 0 30px #1d1d1d inset !important;
  -webkit-text-fill-color: white !important;
  transition: background-color 5000s ease-in-out 0s;
}

// Shared styling from IndexPage for consistency

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
    background: radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%);
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

.hover-accent:hover {
  color: #10b981 !important;
  transition: color 0.3s ease;
}

.bg-emerald-gradient {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
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
