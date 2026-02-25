<template>
  <q-page class="product-page tms-theme">
    <!-- Hero Section -->
    <section class="hero-section relative-position flex flex-center q-pa-md overflow-hidden">
      <div class="glow-tms"></div>
      <div class="container full-width">
        <div class="row q-col-gutter-xl items-center">
          <div class="col-12 col-md-6 z-top">
            <span class="badge">Next Generation Education</span>
            <h1 class="text-white text-h2 text-weight-bolder q-mt-none q-mb-md">
              Elite <span class="gold-text-static">Tuition Manager</span>
            </h1>
            <p class="text-grey-4 text-h6 q-mb-xl">
              A central operating system for educational institutes. Manage students, attendance,
              payments, and exams with military-grade precision.
            </p>
            <div class="q-gutter-md">
              <q-btn
                unelevated
                rounded
                size="lg"
                class="btn-gold-themed q-px-xl text-weight-bold"
                label="Launch Dashboard"
                to="/tms/portal/dashboard"
                no-caps
              />
              <q-btn
                outline
                rounded
                size="lg"
                color="white"
                label="Create Account"
                to="/register"
                class="q-px-xl text-weight-bold"
                no-caps
              />
            </div>
          </div>
          <div class="col-12 col-md-6 relative-position">
            <div class="glass-mockup-tms">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
                alt="TMS Dashboard"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Detailed Features -->
    <section class="q-py-xl">
      <div class="container q-mx-auto q-px-md">
        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-4" v-for="f in features" :key="f.title">
            <div class="feature-card-glass">
              <q-icon :name="f.icon" size="40px" class="gold-text-static q-mb-md" />
              <h3 class="text-h5 text-weight-bold">{{ f.title }}</h3>
              <p class="text-grey-5">{{ f.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
const features = [
  {
    icon: 'payments',
    title: 'Automated Billing & Fees',
    desc: 'Secure payment tracking and automated invoicing for all student enrollments.',
  },
  {
    icon: 'qr_code_scanner',
    title: 'QR-Based Attendance',
    desc: 'High-speed student check-in with instant notifications to parents.',
  },
  {
    icon: 'hub',
    title: 'Parent Connect Portal',
    desc: 'Real-time updates for parents on student performance and financial status.',
  },
]
</script>

<style scoped>
.product-page {
  background: #0a0f1c;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}
.hero-section {
  min-height: 80vh;
  padding-top: 100px;
}
.glow-tms {
  position: absolute;
  top: -10%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(191, 149, 63, 0.1) 0%, transparent 70%);
}
.badge {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(191, 149, 63, 0.1);
  border: 1px solid rgba(191, 149, 63, 0.2);
  border-radius: 50px;
  color: #bf953f;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 20px;
}
.gold-text-static {
  background: linear-gradient(135deg, #bf953f 0%, #f5d38b 50%, #af852f 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.btn-gold-themed {
  background: linear-gradient(135deg, #bf953f 0%, #f5d38b 50%, #af852f 100%) !important;
  color: #0a0f1c !important;
}
.glass-mockup-tms {
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
}
.glass-mockup-tms img {
  width: 100%;
  display: block;
  filter: brightness(0.8);
}
.feature-card-glass {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 40px;
  border-radius: 20px;
  transition: 0.3s;
  height: 100%;
}
.feature-card-glass:hover {
  transform: translateY(-10px);
  background: rgba(191, 149, 63, 0.05);
  border-color: #bf953f;
}
</style>
