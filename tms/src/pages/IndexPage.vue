<template>
  <q-page class="bg-primary text-white overflow-hidden">
    <!-- Hero Section -->
    <section class="hero-section container q-px-md flex flex-center relative-position">
      <!-- Background Elements -->
      <div class="glow-blob top-right"></div>
      <div class="glow-blob bottom-left"></div>

      <div class="row items-center q-col-gutter-xl full-width z-top mobile-column-reverse">
        <!-- Text Content (Left) -->
        <div class="col-12 col-md-6 text-left hero-text q-pr-md-xl">
          <div class="badge-container q-mb-lg fade-in-up" style="animation-delay: 0.1s">
            <div
              class="q-px-lg q-py-sm rounded-borders bg-glass text-body1 text-weight-medium tracking-wide border-emerald text-white row inline items-center glow-pulse"
              style="border-radius: 50px; border: 1px solid #10b981; backdrop-filter: blur(10px)"
            >
              <q-icon name="stars" color="emerald" size="20px" class="q-mr-sm" />
              ✨ Start for Free. No Credit Card Needed.
            </div>
          </div>

          <h1
            class="text-h3 text-md-display-2 text-weight-bolder q-mb-md leading-tight fade-in-up"
            style="animation-delay: 0.2s"
          >
            Master Your <br />
            <span class="text-white">Classroom.</span>
          </h1>

          <p
            class="text-subtitle1 text-grey-5 q-mb-xl move-up-p fade-in-up text-weight-regular"
            style="animation-delay: 0.3s; line-height: 1.6; max-width: 500px"
          >
            Streamline students, payments, and schedules in one unified, high-performance platform.
            Focus on teaching, we handle the rest.
          </p>

          <div class="column q-gutter-y-md fade-in-up" style="animation-delay: 0.4s">
            <!-- Primary Web Actions -->
            <div class="row q-gutter-md items-center">
              <q-btn
                unelevated
                size="lg"
                color="white"
                text-color="dark"
                label="Open Web App"
                to="/login"
                icon="public"
                no-caps
                class="q-px-xl text-weight-bold btn-hover-lift shadow-10"
              />
              <!-- 'Watch Demo' Hidden for now until video is ready
              <q-btn
                outline
                rounded
                size="lg"
                color="emerald"
                text-color="white"
                label="Watch Demo"
                icon="play_circle_outline"
                no-caps
                class="q-px-xl text-weight-bold btn-hover-lift text-emerald-btn"
                @click="openVideo"
              />
              -->
            </div>

            <!-- Download Actions -->
            <div class="row q-gutter-md items-center q-mt-sm">
              <span class="text-grey-5 text-caption text-uppercase tracking-wide q-mr-sm"
                >Download App:</span
              >
              <q-btn
                outline
                rounded
                dense
                class="q-px-md"
                color="grey-4"
                label="Windows (x64)"
                icon="desktop_windows"
                no-caps
                @click="openDownload('windows')"
              />
              <q-btn
                outline
                rounded
                dense
                class="q-px-md"
                color="grey-4"
                label="MacOS"
                icon="laptop_mac"
                no-caps
                @click="openDownload('mac')"
              />
            </div>
          </div>
        </div>

        <!-- Image Content (Right) -->
        <div class="col-12 col-md-6 fade-in-right relative-position" style="animation-delay: 0.5s">
          <div class="hero-image-wrapper">
            <!-- Using a high-quality abstract 3D block image similar to the reference -->
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
              alt="Abstract Education Technology"
              class="responsive-img rounded-xl shadow-24 border-glass grayscale-hover"
            />
            <!-- Floating Elements for depth -->
            <div
              class="float-card bg-dark border-glass q-pa-md absolute-bottom-left shadow-10 rounded-lg lt-md-hide"
              :class="{ dimmed: showVideo }"
            >
              <div class="row items-center q-gutter-md">
                <q-avatar color="accent" text-color="white" icon="analytics" size="md" />
                <div>
                  <div class="text-weight-bold text-white">Automated</div>
                  <div class="text-caption text-grey-5">Analytics & Reports</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Brands / Trusted By -->
    <section class="q-py-lg q-py-md-xl bg-primary border-y-glass">
      <div class="container q-mx-auto text-center">
        <div
          class="text-caption text-grey-7 tracking-widest q-mb-lg text-uppercase text-weight-medium"
        >
          Trusted by premium institutes worldwide
        </div>
        <div
          class="row justify-center items-center q-gutter-x-lg q-gutter-y-md opacity-60 grayscale-logos"
        >
          <h4 class="text-h6 text-md-h5 text-grey-5 text-weight-bold q-my-none">HARVARD</h4>
          <h4 class="text-h6 text-md-h5 text-grey-5 text-weight-bold q-my-none">STANFORD</h4>
          <h4 class="text-h6 text-md-h5 text-grey-5 text-weight-bold q-my-none">MIT</h4>
          <h4 class="text-h6 text-md-h5 text-grey-5 text-weight-bold q-my-none">OXFORD</h4>
          <h4 class="text-h6 text-md-h5 text-grey-5 text-weight-bold q-my-none">CAMBRIDGE</h4>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="q-py-lg q-py-md-xl bg-dark-page">
      <div class="container q-mx-auto q-px-md">
        <div class="row q-col-gutter-lg justify-center text-center">
          <div class="col-6 col-md-3" v-for="(stat, index) in stats" :key="index">
            <div class="stat-card">
              <h3
                class="text-h4 text-md-h3 text-weight-bolder text-white q-mb-xs q-mt-none gradient-text font-numeric"
              >
                {{ stat.value }}
              </h3>
              <div
                class="text-caption text-grey-4 text-uppercase tracking-widest text-weight-medium"
              >
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Data Driven Insights (New Section) -->
    <section class="q-py-lg q-py-md-xl relative-position overflow-hidden">
      <div class="container q-mx-auto q-px-md q-py-lg">
        <div class="row items-center q-col-gutter-xl">
          <!-- Content -->
          <div class="col-12 col-md-6 order-last order-md-first">
            <div class="text-overline text-secondary tracking-widest q-mb-sm text-weight-bold">
              ANALYTICS
            </div>
            <h2 class="text-h4 text-md-h3 text-weight-bold q-mb-md leading-tight">
              Data-Driven <br />
              Insights.
            </h2>
            <p class="text-body1 text-grey-5 q-mb-lg text-weight-regular" style="line-height: 1.6">
              Visualize your institute's performance in real-time. Track revenue, student
              attendance, and enrollment trends with our powerful analytics engine.
            </p>

            <div class="column q-gutter-y-sm q-mb-xl">
              <div class="row items-center">
                <q-icon name="check_circle" color="secondary" size="20px" class="q-mr-md" />
                <span class="text-subtitle1 text-grey-4">Real-time financial reporting</span>
              </div>
              <div class="row items-center">
                <q-icon name="check_circle" color="secondary" size="20px" class="q-mr-md" />
                <span class="text-subtitle1 text-grey-4">Automated attendance tracking</span>
              </div>
              <div class="row items-center">
                <q-icon name="check_circle" color="secondary" size="20px" class="q-mr-md" />
                <span class="text-subtitle1 text-grey-4">Growth trend analysis</span>
              </div>
            </div>

            <q-btn
              flat
              no-caps
              color="white"
              label="Explore Reporting"
              icon-right="arrow_forward"
              class="text-weight-bold q-px-none hover-accent"
              to="/reports"
            />
          </div>

          <!-- Image -->
          <div class="col-12 col-md-6 text-center order-first order-md-last q-mb-lg q-mb-md-none">
            <div
              class="glass-panel q-pa-sm rounded-xl shadow-24 border-glass inline-block"
              style="transform: perspective(1000px) rotateY(-10deg)"
            >
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
                class="responsive-img rounded-lg"
                style="max-height: 400px; width: auto; max-width: 100%; object-fit: contain"
                alt="Analytics Dashboard"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="q-py-lg q-py-md-xl relative-position bg-dark-page">
      <div class="container q-mx-auto q-px-md q-py-lg">
        <div class="text-center q-mb-lg q-mb-md-xl">
          <h2 class="text-h4 text-md-h3 text-weight-bold q-mb-md">Everything in One Place</h2>
          <p class="text-subtitle1 text-grey-5 max-w-600 q-mx-auto">
            Replacing multiple fragmented tools with one cohesive operating system.
          </p>
        </div>

        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-4" v-for="(feature, idx) in features" :key="idx">
            <div
              class="feature-card q-pa-lg rounded-borders full-height hover-effect text-left relative-position overflow-hidden border-top-emerald"
            >
              <div class="absolute-top-right q-ma-md opacity-10">
                <q-icon :name="feature.icon" size="80px" class="text-emerald" />
              </div>
              <div class="q-mb-md q-mb-md-lg relative-position z-top">
                <q-icon :name="feature.icon" size="28px" class="text-emerald" />
              </div>
              <h3 class="text-h6 text-weight-bold q-mb-sm text-white relative-position z-top">
                {{ feature.title }}
              </h3>
              <p
                class="text-grey-3 text-caption q-mb-none relative-position z-top"
                style="line-height: 1.6"
              >
                {{ feature.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Video Modal Hidden
    <q-dialog
      v-model="showVideo"
      backdrop-filter="blur(8px) brightness(60%)"
      class="z-top-force"
      transition-show="scale"
      transition-hide="scale"
      @hide="stopVideo"
    >
      <q-card style="width: 800px; max-width: 90vw" class="bg-black text-white">
        <q-toolbar>
          <q-toolbar-title class="text-weight-bold font-inter">Platform Demo</q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section class="q-pa-none relative-position">
          <q-video v-if="videoUrl" :ratio="16 / 9" :src="videoUrl" />
        </q-card-section>
      </q-card>
    </q-dialog>
    -->
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import axios from 'axios'

// const showVideo = ref(false)
// const videoUrl = ref(null)

/*
const openVideo = () => {
  // SaaS Level Fix: Autoplay logic with mute for browser policy compliance
  videoUrl.value = 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&autoplay=1&mute=1&playsinline=1'
  showVideo.value = true
}

const stopVideo = () => {
  videoUrl.value = null
}
*/

const openDownload = (platform) => {
  console.log('Download for:', platform) // Just to use the variable and avoid lint error, or remove it.
  // Point to GitHub Releases page where all artifacts are stored
  const repoUrl = 'https://github.com/to-be-tech-pro/DigiNex-Tution-Class-Managment/releases'
  window.open(repoUrl, '_blank')
}

// Client-Side Country Detection
onMounted(async () => {
  try {
    // Check if we already have it to avoid spamming the free API
    if (!localStorage.getItem('user_country')) {
      const response = await axios.get('https://ip-api.com/json/')
      if (response.data && response.data.countryCode) {
        localStorage.setItem('user_country', response.data.countryCode)
        console.log('Detected Country:', response.data.countryCode)
      }
    }
  } catch (e) {
    console.warn('Country detection failed, defaulting to Global/SL', e)
  }
})

const stats = [
  { value: '500+', label: 'Institutions' },
  { value: '120k', label: 'Students' },
  { value: '99%', label: 'Efficiency' },
  { value: '24/7', label: 'Support' },
]

const features = [
  {
    icon: 'school',
    title: 'Student Management',
    desc: 'Keep detailed records of student profiles, enrollments, and academic history in one secure database.',
  },
  {
    icon: 'calendar_month',
    title: 'Smart Scheduling',
    desc: 'Effortlessly create and manage class timetables, resolving conflicts and handling adjustments on the fly.',
  },
  {
    icon: 'payments',
    title: 'Automated Payments',
    desc: 'Generate invoices, track fee statuses, and send automated reminders to parents via SMS and Email.',
  },
  {
    icon: 'qr_code_scanner',
    title: 'Attendance Tracking',
    desc: 'QR-code based or manual attendance marking that syncs instantly with parent reporting.',
  },
  {
    icon: 'bar_chart',
    title: 'Exam Results',
    desc: 'Publish exam marks and detailed performance reports directly to the student portal.',
  },
  {
    icon: 'manage_accounts',
    title: 'Staff Management',
    desc: 'Manage tutor assignments, payroll, and access permissions with granular control.',
  },
]
</script>

<style lang="scss" scoped>
// Emerald Colors
.text-emerald {
  color: #10b981 !important;
}

.border-top-emerald {
  border-top: 4px solid #10b981 !important;
}

.glow-pulse {
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  animation: pulse-emerald 2s infinite;
}

@keyframes pulse-emerald {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

.text-emerald-btn {
  border-color: #10b981 !important;
  color: #10b981 !important;

  &:hover {
    background: rgba(16, 185, 129, 0.1) !important;
  }
}

// Hero & Layout
.hero-section {
  min-height: 90vh;
  padding-top: 50px;
}

.text-md-display-2 {
  @media (min-width: 1024px) {
    font-size: 4rem;
    line-height: 1.1;
  }
}

// Blobs
.glow-blob {
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;

  &.top-right {
    top: -100px;
    right: -100px;
  }
  &.bottom-left {
    bottom: -100px;
    left: -100px;
    background: radial-gradient(circle, rgba($secondary, 0.15) 0%, transparent 70%);
  }
}

// Glass
.bg-glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}
.border-glass {
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.border-y-glass {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

// Images
.hero-image-wrapper {
  position: relative;
  perspective: 1000px;

  .responsive-img {
    width: 100%;
    height: auto;
    display: block;
    transform: rotateY(-5deg) rotateX(5deg);
    transition: transform 0.5s ease;

    &:hover {
      transform: rotateY(0deg) rotateX(0deg);
    }
  }
}

.dimmed {
  opacity: 0.1;
  pointer-events: none;
  filter: blur(10px);
  transition: all 0.5s ease;
}

.z-top-force {
  z-index: 9999 !important;
}

.float-card {
  left: -30px;
  bottom: 40px;
  backdrop-filter: blur(20px);
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

// Buttons
.btn-hover-lift {
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-3px);
  }
}

.hover-accent:hover {
  color: $accent !important;
}

// Features & Cards
.feature-card {
  background: #0f172a; // Deep Blue / Slate
  transition:
    transform 0.3s ease,
    background 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    background: #1e293b;
    border-color: rgba(255, 255, 255, 0.1);
  }
}

.opacity-10 {
  opacity: 0.05;
}
.z-top {
  z-index: 2;
}

// Stats Text
.gradient-text {
  background: linear-gradient(135deg, white 30%, $accent 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.font-numeric {
  font-variant-numeric: tabular-nums;
  letter-spacing: -2px;
}

// Animation Classes
.fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.fade-in-right {
  opacity: 0;
  animation: fadeInRight 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.grayscale-hover {
  filter: grayscale(100%);
  transition: filter 0.5s ease;

  &:hover {
    filter: grayscale(0%);
  }
}

.grayscale-logos {
  h4 {
    opacity: 0.4;
    transition: opacity 0.3s;
  }
  h4:hover {
    opacity: 1;
    color: white !important;
  }
}

.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
}
</style>
