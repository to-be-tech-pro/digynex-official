<template>
  <q-page>
    <!-- Hero Section -->
    <section class="hero-section relative-position flex flex-center q-pa-md overflow-hidden">
      <div class="container full-width">
        <div class="row q-col-gutter-xl items-center">
          <!-- Text Content (Left) -->
          <div class="col-12 col-md-6 z-top">
            <div class="text-secondary text-uppercase text-weight-bold q-mb-md tracking-wider">
              Next Generation CMS
            </div>
            <h1
              class="text-white text-h2 text-weight-bolder q-mt-none q-mb-md"
              style="line-height: 1.1"
            >
              Manage Customers <br />
              <span class="text-transparent bg-clip-text gradient-text">Like a Pro</span>
            </h1>
            <p class="text-grey-4 text-h6 q-mb-xl" style="font-weight: 300; line-height: 1.5">
              Streamline your workflow, boost sales, and build lasting relationships with the
              world's most intuitive Customer Management System.
            </p>
            <div class="q-gutter-md">
              <q-btn
                unelevated
                rounded
                size="lg"
                color="secondary"
                text-color="white"
                label="Start Free Trial"
                class="q-px-xl text-weight-bold"
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
              class="absolute-center bg-secondary"
              style="
                width: 300px;
                height: 300px;
                filter: blur(120px);
                opacity: 0.3;
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
                class="glass-card q-pa-md rounded-borders relative-position"
                style="
                  background: linear-gradient(
                    135deg,
                    rgba(255, 255, 255, 0.1),
                    rgba(255, 255, 255, 0.05)
                  );
                  border: 1px solid rgba(255, 255, 255, 0.1);
                  backdrop-filter: blur(20px);
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
                      <div class="text-grey-5 text-caption q-mb-sm">Revenue Over Time</div>
                      <!-- CSS Bar Chart Mockup -->
                      <div class="row items-end q-gutter-x-sm full-height q-pb-md">
                        <div
                          class="bg-secondary col"
                          style="height: 40%; opacity: 0.5; border-radius: 4px"
                        ></div>
                        <div
                          class="bg-secondary col"
                          style="height: 70%; opacity: 0.8; border-radius: 4px"
                        ></div>
                        <div
                          class="bg-secondary col"
                          style="height: 50%; opacity: 0.6; border-radius: 4px"
                        ></div>
                        <div class="bg-secondary col" style="height: 90%; order-radius: 4px"></div>
                        <div
                          class="bg-secondary col"
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
                class="absolute glass-card flex flex-center"
                style="
                  top: -30px;
                  right: -30px;
                  width: 140px;
                  height: 80px;
                  background: rgba(20, 20, 20, 0.8);
                  border: 1px solid rgba(255, 255, 255, 0.2);
                  backdrop-filter: blur(10px);
                  border-radius: 16px;
                  transform: translateZ(50px) rotateY(-10deg);
                  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
                "
              >
                <div class="text-center">
                  <div class="text-white text-weight-bold text-h5">+125%</div>
                  <div class="text-grey-5 text-caption">Sales Growth</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="bg-dark-page q-py-xl border-y-grey">
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
          <div class="text-secondary text-weight-bold text-uppercase q-mb-sm">Features</div>
          <h2 class="text-h3 text-weight-bold text-white q-my-none">Everything you need</h2>
        </div>

        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-4" v-for="(feature, index) in features" :key="index">
            <q-card flat class="bg-transparent text-white full-height">
              <q-item-section avatar>
                <q-icon :name="feature.icon" color="secondary" size="40px" class="q-mb-md" />
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
        <div
          class="bg-grey-10 rounded-borders q-pa-xl text-center relative-position overflow-hidden"
        >
          <div class="relative-position z-top">
            <h2 class="text-h3 text-weight-bold text-white q-mb-md">
              Ready to scale your business?
            </h2>
            <p
              class="text-h6 text-grey-5 q-mb-xl"
              style="max-width: 600px; margin-left: auto; margin-right: auto"
            >
              Join thousands of businesses that trust Quasra to manage their customer relationships.
            </p>
            <q-btn
              unelevated
              rounded
              size="lg"
              color="secondary"
              text-color="white"
              label="Get Started Now"
              class="q-px-xl text-weight-bold shadow-10"
              no-caps
            />
          </div>
          <div
            class="absolute-bottom-right bg-secondary"
            style="
              width: 300px;
              height: 300px;
              filter: blur(100px);
              opacity: 0.1;
              border-radius: 50%;
              bottom: -100px;
              right: -100px;
            "
          ></div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
const features = [
  {
    icon: 'analytics',
    title: 'Advanced Analytics',
    description:
      'Track customer behavior and sales performance with our real-time dashboard and detailed reports.',
  },
  {
    icon: 'groups',
    title: 'Lead Management',
    description:
      'Organize, track, and nurture your leads from first contact to closed deal with automated workflows.',
  },
  {
    icon: 'cloud_sync',
    title: 'Cloud Sync',
    description:
      'Access your data from anywhere. Our secure cloud infrastructure keeps your team in sync.',
  },
  {
    icon: 'lock',
    title: 'Enterprise Security',
    description:
      'Bank-grade encryption and granular permission settings to keep your customer data safe.',
  },
  {
    icon: 'auto_graph',
    title: 'Sales Automation',
    description:
      'Automate repetitive tasks and focus on closing deals. Set up triggers and actions easily.',
  },
  {
    icon: 'support_agent',
    title: '24/7 Support',
    description:
      'Our dedicated support team is always available to help you resolve issues and get the most out of Quasra.',
  },
]
</script>

<style scoped>
.hero-section {
  min-height: 90vh;
  padding-top: 100px;
}

.tracking-wider {
  letter-spacing: 0.2em;
}

.gradient-text {
  background: linear-gradient(to right, #fff, #999);
  -webkit-background-clip: text;
  background-clip: text;
}

.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

.text-transparent {
  color: transparent;
}

.bg-dark-page {
  background-color: #050505;
}

.border-y-grey {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.container {
  max-width: 1200px;
}

.bg-white-05 {
  background: rgba(255, 255, 255, 0.05);
}
</style>
