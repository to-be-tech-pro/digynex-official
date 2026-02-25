<template>
  <q-layout view="hHh lpR fff" class="official-page-themed">
    <q-header class="glass-header" height-hint="98">
      <q-toolbar class="container q-mx-auto q-py-sm q-px-md flex justify-between">
        <div class="logo">
          <router-link to="/" class="text-decoration-none text-white">
            <span class="gold-text">Digy</span>Nex
          </router-link>
        </div>

        <div class="nav-links-themed gt-sm q-gutter-x-lg">
          <router-link to="/" class="nav-item">CMS</router-link>
          <router-link to="/tms" class="nav-item">Tuition</router-link>
          <router-link to="/ecosystem" class="nav-item">Ecosystem</router-link>
          <a href="#" class="nav-item">Solutions</a>
        </div>

        <div class="nav-actions row items-center q-gutter-x-md">
          <q-btn flat no-caps label="Sign In" to="/login" class="text-white gt-xs" />
          <q-btn
            unelevated
            rounded
            class="btn-emerald-themed q-px-lg text-weight-bold"
            no-caps
            label="Launch CMS"
            to="/login?redirect=/cms/portal/dashboard"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-deep-navy">
      <router-view />
    </q-page-container>

    <q-footer class="main-footer">
      <div class="container footer-content q-mx-auto">
        <div class="footer-brand">
          <div class="logo"><span class="gold-text">Digy</span>Nex</div>
          <p class="text-grey-5 q-mt-sm">Global Leaders in IT Transformation.</p>
        </div>
        <div class="footer-links">
          <h4 class="text-white">Products</h4>
          <router-link to="/">Enterprise CMS</router-link>
          <router-link to="/tms">Tuition Manager</router-link>
          <router-link to="/ecosystem">Ecosystem</router-link>
        </div>
        <div class="footer-contact">
          <h4 class="text-white">Connect</h4>
          <div class="social-icons">
            <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i class="fa-brands fa-linkedin"></i></a>
            <a href="#"><i class="fa-brands fa-github"></i></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom text-center q-pa-md">
        <p class="text-grey-7">
          &copy; 2026 DigyNex Systems. Official Domain |
          <span class="gold-text-static">digynex.se</span>
        </p>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup></script>

<style scoped>
.official-page-themed {
  background-color: #0a0f1c;
  color: #f8fafc;
  font-family: 'Inter', sans-serif;
}

.glass-header {
  background: rgba(10, 15, 28, 0.85) !important;
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.bg-deep-navy {
  background-color: #0a0f1c;
}

.container {
  max-width: 1200px;
}

.logo {
  font-size: 24px;
  font-weight: 800;
  font-family: 'Outfit', sans-serif;
  letter-spacing: -1px;
}

.gold-text {
  background: linear-gradient(135deg, #bf953f 0%, #f5d38b 50%, #af852f 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}

.gold-text-static {
  color: #bf953f;
  font-weight: 700;
}

.nav-links-themed {
  display: flex;
  gap: 30px;
}

.nav-item {
  text-decoration: none;
  color: #f8fafc;
  font-size: 14px;
  font-weight: 500;
  opacity: 0.8;
  transition: 0.3s;
}

.nav-item:hover {
  opacity: 1;
  color: #bf953f;
}

.btn-gold-themed {
  background: linear-gradient(135deg, #bf953f 0%, #f5d38b 50%, #af852f 100%) !important;
  color: #0a0f1c !important;
}

.btn-emerald-themed {
  background: linear-gradient(135deg, #10b981 0%, #34d399 50%, #059669 100%) !important;
  color: #0a0f1c !important;
}

.main-footer {
  background: #050811;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 60px 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 40px;
  padding: 0 20px;
  margin-bottom: 40px;
}

.footer-links h4,
.footer-contact h4 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;
}

.footer-links a {
  display: block;
  color: rgba(248, 250, 252, 0.7);
  text-decoration: none;
  margin-bottom: 12px;
  font-size: 14px;
  transition: 0.3s;
}

.footer-links a:hover {
  color: #bf953f;
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icons a {
  width: 35px;
  height: 35px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f8fafc;
  text-decoration: none;
  transition: 0.3s;
}

.social-icons a:hover {
  background: #bf953f;
  color: #0a0f1c;
}

.text-decoration-none {
  text-decoration: none;
}
</style>
