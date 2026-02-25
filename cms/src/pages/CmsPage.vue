<template>
  <q-page class="product-page cms-theme">
    <!-- Hero Section -->
    <section class="hero-section relative-position flex flex-center q-pa-md overflow-hidden">
      <div class="glow-cms"></div>
      <div class="container full-width">
        <div class="row q-col-gutter-xl items-center">
          <div class="col-12 col-md-6 z-top">
            <span class="badge">Enterprise Scale</span>
            <h1 class="text-white text-h2 text-weight-bolder q-mt-none q-mb-md">
              Nexus <span class="emerald-text-static">Enterprise CMS</span>
            </h1>
            <p class="text-grey-4 text-h6 q-mb-xl">
              The operational heart for scaling businesses. A comprehensive ecosystem for lead
              orchestration, client lifecycle management, and high-performance workflow automation.
            </p>
            <div class="q-gutter-md">
              <q-btn
                unelevated
                rounded
                size="lg"
                class="btn-emerald-themed q-px-xl text-weight-bold"
                label="Explore Dashboard"
                to="/cms/portal/dashboard"
                no-caps
              />
              <q-btn
                outline
                rounded
                size="lg"
                color="white"
                label="Start Free Trial"
                to="/register"
                class="q-px-xl text-weight-bold"
                no-caps
              />
            </div>
          </div>
          <div class="col-12 col-md-6 relative-position">
            <div class="glass-mockup-cms">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
                alt="CMS Dashboard"
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
              <q-icon :name="f.icon" size="40px" class="emerald-text-static q-mb-md" />
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
    icon: 'track_changes',
    title: 'End-to-End Lead Tracking',
    desc: 'Monitor every customer interaction from the first lead to the final sale.',
  },
  {
    icon: 'view_kanban',
    title: 'Visual Deal Pipelines',
    desc: 'Optimize your sales flow with intuitive drag-and-drop workflow management.',
  },
  {
    icon: 'sync',
    title: 'Multi-channel CRM Sync',
    desc: 'Seamless integration with your digital marketing channels and communication tools.',
  },
]
</script>

<style scoped>
.product-page {
  background: #050811;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}
.hero-section {
  min-height: 80vh;
  padding-top: 100px;
}
.glow-cms {
  position: absolute;
  bottom: -10%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
}
.badge {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(74, 144, 226, 0.1);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 50px;
  color: #4a90e2;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 20px;
}
.emerald-text-static {
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.btn-emerald-themed {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
  color: #0a0f1c !important;
}
.glass-mockup-cms {
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
}
.glass-mockup-cms img {
  width: 100%;
  display: block;
  filter: brightness(0.9);
}
.feature-card-glass {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 40px;
  border-radius: 20px;
  transition: 0.3s;
  height: 100%;
}
.feature-card-glass:hover {
  transform: translateY(-10px);
  background: rgba(16, 185, 129, 0.05);
  border-color: #10b981;
}
</style>
