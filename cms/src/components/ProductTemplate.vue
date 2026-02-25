<template>
  <q-page class="product-page">
    <!-- Hero Section -->
    <section class="hero-section relative-position flex flex-center q-pa-md overflow-hidden">
      <div class="container full-width">
        <div class="row q-col-gutter-xl items-center">
          <!-- Text Content (Left) -->
          <div class="col-12 col-md-6 z-top">
            <div class="badge-text text-uppercase q-mb-md tracking-wider">
              Next Generation {{ title }}
            </div>
            <h1
              class="text-white text-h2 text-weight-bolder q-mt-none q-mb-md"
              style="line-height: 1.1"
            >
              {{ heroTitle1 }} <br />
              <span class="gold-text-static">{{ heroTitle2 }}</span>
            </h1>
            <p class="text-grey-4 text-h6 q-mb-xl" style="font-weight: 300; line-height: 1.5">
              {{ description }}
            </p>
            <div class="q-gutter-md">
              <q-btn
                unelevated
                rounded
                size="lg"
                class="btn-gold-themed q-px-xl text-weight-bold"
                label="Start Free Trial"
                no-caps
              />
              <q-btn
                outline
                rounded
                size="lg"
                color="white"
                label="Watch Demo"
                class="q-px-xl text-weight-bold"
                no-caps
                icon="play_circle"
              />
            </div>
          </div>

          <!-- Fancy Visual (Right) -->
          <div class="col-12 col-md-6 relative-position">
            <!-- Background Glow -->
            <div
              class="absolute-center"
              style="
                width: 300px;
                height: 300px;
                background: var(--liquid-gold);
                filter: blur(120px);
                opacity: 0.15;
                border-radius: 50%;
                z-index: 0;
              "
            ></div>

            <!-- Glassmorphism Cards Mockup -->
            <div
              class="relative-position"
              style="z-index: 1; perspective: 1000px; transform-style: preserve-3d"
            >
              <!-- Main Card -->
              <div
                class="glass-card-themed q-pa-md rounded-borders relative-position"
                style="
                  transform: rotateY(-10deg) rotateX(5deg);
                  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                "
              >
                <!-- Fake Dashboard Header -->
                <div class="row items-center q-mb-lg q-gutter-sm">
                  <div class="bg-red-5 rounded-circle" style="width: 12px; height: 12px"></div>
                  <div class="bg-yellow-5 rounded-circle" style="width: 12px; height: 12px"></div>
                  <div class="bg-green-5 rounded-circle" style="width: 12px; height: 12px"></div>
                </div>

                <!-- Fake Chart Area -->
                <div class="row q-col-gutter-md">
                  <div class="col-8">
                    <div class="bg-white-05 rounded-borders q-pa-md q-mb-md" style="height: 150px">
                      <div class="text-grey-5 text-caption q-mb-sm">Analytics Engine</div>
                      <!-- CSS Bar Chart Mockup -->
                      <div class="row items-end q-gutter-x-sm full-height q-pb-md">
                        <div
                          class="bg-gold-fade col"
                          style="height: 40%; opacity: 0.5; border-radius: 4px"
                        ></div>
                        <div
                          class="bg-gold-fade col"
                          style="height: 70%; opacity: 0.8; border-radius: 4px"
                        ></div>
                        <div
                          class="bg-gold-fade col"
                          style="height: 50%; opacity: 0.6; border-radius: 4px"
                        ></div>
                        <div class="bg-gold-fade col" style="height: 90%; border-radius: 4px"></div>
                        <div
                          class="bg-gold-fade col"
                          style="height: 60%; opacity: 0.7; border-radius: 4px"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-4 column q-gutter-y-md">
                    <div class="bg-white-05 rounded-borders col"></div>
                    <div class="bg-white-05 rounded-borders col"></div>
                  </div>
                </div>

                <div class="bg-white-05 rounded-borders q-pa-md q-mt-md" style="height: 80px"></div>
              </div>

              <!-- Floating Element -->
              <div
                class="absolute glass-card-floating flex flex-center"
                style="
                  top: -30px;
                  right: -30px;
                  width: 140px;
                  height: 80px;
                  border-radius: 16px;
                  transform: translateZ(50px) rotateY(-10deg);
                  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
                "
              >
                <div class="text-center">
                  <div class="text-white text-weight-bold text-h5">+{{ growth }}%</div>
                  <div class="text-grey-5 text-caption">{{ growthLabel }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section-themed q-py-xl">
      <div class="container q-mx-auto">
        <div class="row q-col-gutter-lg justify-center text-center">
          <div class="col-6 col-md-3">
            <div class="text-h2 text-weight-bolder text-white">10k+</div>
            <div class="text-grey-5 q-mt-sm">Active Users</div>
          </div>
          <div class="col-6 col-md-3">
            <div class="text-h2 text-weight-bolder text-white">99%</div>
            <div class="text-grey-5 q-mt-sm">Satisfaction Rate</div>
          </div>
          <div class="col-6 col-md-3">
            <div class="text-h2 text-weight-bolder text-white">$2M+</div>
            <div class="text-grey-5 q-mt-sm">Revenue Generated</div>
          </div>
          <div class="col-6 col-md-3">
            <div class="text-h2 text-weight-bolder text-white">24/7</div>
            <div class="text-grey-5 q-mt-sm">Expert Support</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="q-py-xl q-my-xl">
      <div class="container q-mx-auto q-px-md">
        <div class="text-center q-mb-xl">
          <div class="badge-text text-weight-bold text-uppercase q-mb-sm">Features</div>
          <h2 class="text-h3 text-weight-bold text-white q-my-none">Everything you need</h2>
        </div>

        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-4" v-for="(feature, index) in features" :key="index">
            <q-card flat class="bg-transparent text-white full-height feature-card-themed">
              <q-item-section avatar>
                <q-icon :name="feature.icon" color="primary" size="40px" class="q-mb-md" />
              </q-item-section>
              <q-card-section class="q-pt-none">
                <div class="text-h5 text-weight-bold q-mb-sm">{{ feature.title }}</div>
                <div class="text-grey-5" style="font-size: 1.1rem; line-height: 1.6">
                  {{ feature.description }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="q-py-xl q-pb-xl">
      <div class="container q-mx-auto q-px-md">
        <div class="cta-box-themed q-pa-xl text-center relative-position overflow-hidden">
          <div class="relative-position z-top">
            <h2 class="text-h3 text-weight-bold text-white q-mb-md">
              Ready to scale your business?
            </h2>
            <p
              class="text-h6 text-grey-5 q-mb-xl"
              style="max-width: 600px; margin-left: auto; margin-right: auto"
            >
              Join thousands of businesses that trust DigyNex to manage their operations.
            </p>
            <q-btn
              unelevated
              rounded
              size="lg"
              class="btn-gold-themed q-px-xl text-weight-bold shadow-10"
              label="Get Started Now"
              no-caps
            />
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
defineProps({
  title: String,
  heroTitle1: String,
  heroTitle2: String,
  description: String,
  growth: String,
  growthLabel: String,
  features: Array,
})
</script>

<style scoped>
.product-page {
  background-color: #0a0f1c;
  color: #fff;
}

.hero-section {
  min-height: 80vh;
  padding-top: 100px;
}

.badge-text {
  color: #bf953f;
  font-weight: 700;
  letter-spacing: 0.2em;
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

.glass-card-themed {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
}

.glass-card-floating {
  background: rgba(10, 15, 28, 0.9);
  border: 1px solid rgba(191, 149, 63, 0.3);
  backdrop-filter: blur(10px);
}

.bg-gold-fade {
  background: #bf953f;
}

.stats-section-themed {
  background-color: #050811;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.feature-card-themed:hover {
  background: rgba(191, 149, 63, 0.02) !important;
  border: 1px solid rgba(191, 149, 63, 0.1) !important;
}

.cta-box-themed {
  background: #1d2d47;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.bg-white-05 {
  background: rgba(255, 255, 255, 0.05);
}

.container {
  max-width: 1200px;
}
</style>
