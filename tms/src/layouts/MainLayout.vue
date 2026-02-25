```
<template>
  <q-layout view="lHh Lpr lFf" class="bg-primary text-white font-inter">
    <q-header
      class="bg-transparent text-white q-py-md"
      :class="{ 'bg-dark-glass': scrollPosition > 50 }"
      style="z-index: 5000"
    >
      <q-toolbar class="container q-mx-auto">
        <!-- Header Logo -->
        <div class="row items-center cursor-pointer" @click="$router.push('/')">
          <div class="text-h5 text-white text-weight-bold" style="letter-spacing: -0.5px">
            DigyNex
          </div>
        </div>

        <q-space />

        <div class="gt-sm q-gutter-x-md">
          <q-btn flat no-caps label="Home" class="text-weight-medium" />
          <q-btn flat no-caps label="Features" class="text-weight-medium" />
          <q-btn flat no-caps label="About Us" class="text-weight-medium" />
          <q-btn flat no-caps label="Contact" class="text-weight-medium" />
        </div>

        <div class="gt-xs q-ml-lg row q-gutter-x-sm">
          <q-btn
            flat
            rounded
            color="white"
            label="Log In"
            to="/login"
            no-caps
            class="text-weight-bold hover-grey"
          />
          <q-btn
            unelevated
            rounded
            color="white"
            text-color="dark"
            label="Sign Up"
            to="/register"
            no-caps
            class="q-px-lg text-weight-bold"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Updated Compact Footer (Pure Black Modern Look) -->
    <q-footer class="bg-black text-white q-py-lg border-top-dark" style="z-index: 5000">
      <div class="container q-mx-auto q-px-md">
        <div class="row q-col-gutter-lg items-center">
          <div class="col-12 col-md-6">
            <!-- Footer Branding -->
            <div class="row items-center q-mb-sm">
              <div class="text-h5 text-white text-weight-bold" style="letter-spacing: -0.5px">
                DigyNex
              </div>
            </div>
            <p class="text-caption q-mb-none text-grey-5" style="max-width: 400px">
              The Most Advanced Tuition Management Platform.
            </p>
          </div>
          <div class="col-12 col-md-6 text-md-right">
            <div class="q-gutter-x-lg text-caption">
              <a
                href="#"
                class="text-white hover-grey text-decoration-none transition-colors"
                style="font-size: 13px"
                >Documentation</a
              >

              <a
                href="#"
                class="text-white hover-grey text-decoration-none transition-colors"
                style="font-size: 13px"
                >Support</a
              >
            </div>
          </div>
        </div>
        <div class="q-mt-md text-center text-caption q-pt-md border-top-light text-grey-8">
          © 2026 DigyNex Systems. All rights reserved.
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrollPosition = ref(0)

const updateScroll = () => {
  scrollPosition.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', updateScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.bg-dark-glass {
  background: rgba(10, 10, 10, 0.8) !important; // Using slightly darker for better contrast
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.border-top-dark {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.border-top-light {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.tracking-wide {
  letter-spacing: 0.5px;
}

.text-decoration-none {
  text-decoration: none;
}

.hover-white:hover {
  color: white !important;
}

.bg-black {
  background-color: #000000 !important;
}

.transition-colors {
  transition: color 0.3s ease;
}

.hover-grey:hover {
  color: #9e9e9e !important;
}

.text-gold-gradient {
  background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #bf953f; /* Fallback */
}
</style>
