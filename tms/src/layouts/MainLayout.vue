```
<template>
  <q-layout view="lHh Lpr lFf" class="bg-primary text-white font-inter">
    <q-header
      class="bg-transparent text-white q-py-md"
      :class="{ 'bg-dark-glass': scrollPosition > 50 }"
      style="z-index: 5000"
    >
      <q-toolbar class="container q-mx-auto relative-position">
        <!-- Header Logo -->
        <div class="logo-wrapper cursor-pointer" @click="$router.push('/')">
          <div class="nav-logo-3d">
            <div class="logo-inner">
              <img src="/logo.svg" alt="DigyNex Logo" class="logo-face front">
              <img src="/logo.svg" alt="DigyNex Logo" class="logo-face back">
            </div>
          </div>
          <div class="brand-name">
            Digy<span class="gold-text">Nex</span>
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
            class="btn-gold-themed q-px-lg text-weight-bold"
            label="Sign Up"
            to="/register"
            no-caps
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
          <div class="col-12 col-md-6 text-left">
            <!-- Footer Branding -->
            <div class="row items-center q-mb-sm">
              <img src="/logo.svg" alt="DigyNex" class="footer-logo-main">
            </div>
            <p class="text-caption q-mb-none text-grey-5" style="max-width: 400px">
              The Most Advanced Tuition Management Platform.
            </p>
          </div>
          <div class="col-12 col-md-6 text-md-right">
            <div class="q-gutter-x-lg text-caption">
              <a
                href="https://digynex.se/about.html"
                target="_blank"
                class="text-white hover-grey text-decoration-none transition-colors"
                style="font-size: 13px"
                >About Us</a
              >

              <a
                href="https://digynex.se/terms.html"
                target="_blank"
                class="text-white hover-grey text-decoration-none transition-colors"
                style="font-size: 13px"
                >Terms</a
              >

              <a
                href="https://digynex.se/privacy.html"
                target="_blank"
                class="text-white hover-grey text-decoration-none transition-colors"
                style="font-size: 13px"
                >Privacy</a
              >
            </div>
          </div>
        </div>
        <div class="q-mt-md text-center text-caption q-pt-md border-top-light text-grey-8">
          © 2026 DigyNex Systems. Official Domain | <span class="text-gold-gradient">digynex.se</span>
          <div class="q-mt-sm" style="opacity: 0.6; letter-spacing: 1px; text-transform: uppercase; font-size: 10px;">
            Ecosystem Architected by <a href="https://digynex.se/portfolio" target="_blank" class="text-white" style="text-decoration: none;">DigyNex</a>
          </div>
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;600;800&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* 3D LOGO STYLES */
.logo-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 50px; /* Space for the 3D logo */
}

.nav-logo-3d {
  position: absolute;
  left: -40px;
  top: 50%;
  transform: translateY(-50%);
  width: 120px;
  height: 120px;
  perspective: 1000px;
  z-index: 10;
  pointer-events: none;
}

.logo-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: logo-spin-3d 10s linear infinite;
}

.logo-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-face.front {
  transform: translateZ(1px);
}

.logo-face.back {
  transform: rotateY(180deg) translateZ(1px);
}

.logo-face img {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 20px rgba(191, 149, 63, 0.3));
}

@keyframes logo-spin-3d {
  from { transform: rotateY(0deg); }
  to { transform: rotateY(360deg); }
}

.brand-name {
  font-size: 26px;
  font-weight: 800;
  font-family: 'Outfit', sans-serif;
  letter-spacing: -1px;
  color: #f8fafc;
}

.gold-text {
  background: linear-gradient(135deg, #bf953f 0%, #f5d38b 50%, #af852f 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}

.bg-dark-glass {
  background: rgba(10, 10, 10, 0.8) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.btn-gold-themed {
  background: linear-gradient(135deg, #bf953f 0%, #f5d38b 50%, #af852f 100%) !important;
  color: #0a0f1c !important;
}

.border-top-dark {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.border-top-light {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.text-decoration-none {
  text-decoration: none;
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
  color: #bf953f;
}

.footer-logo-main {
  height: 60px;
  width: auto;
  margin-left: -10px;
}
</style>

