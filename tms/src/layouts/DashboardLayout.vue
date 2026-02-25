<template>
  <q-layout view="lHh Lpr lFf" class="bg-slate-50 font-inter">
    <!-- Header -->
    <q-header class="bg-white text-primary shadow-1 q-py-xs" height-hint="60">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="q-mr-sm text-grey-7"
        />

        <q-toolbar-title class="text-weight-bold text-h6 text-gold-gradient row items-center">
          DigyNex
          <span
            class="text-caption text-white bg-primary q-px-xs q-py-none q-ml-sm rounded-borders"
            style="font-size: 10px; padding: 2px 6px"
            >BETA</span
          >
        </q-toolbar-title>

        <q-space />

        <!-- Top Right Actions -->
        <div class="q-gutter-x-sm row items-center">
          <q-input
            dense
            outlined
            rounded
            v-model="search"
            placeholder="Global Search..."
            class="gt-xs q-mr-md"
            bg-color="grey-1"
            borderless
            input-class="text-dark"
            style="min-width: 250px"
            @keyup.enter="handleSearch"
          >
            <template v-slot:prepend>
              <q-icon name="search" color="grey-6" class="cursor-pointer" @click="handleSearch" />
            </template>
          </q-input>

          <q-btn round flat color="grey-7" icon="notifications">
            <q-badge color="red" floating rounded mini v-if="notifications.length > 0" />
            <q-menu>
              <q-list style="min-width: 250px">
                <q-item-label header>Notifications</q-item-label>
                <div v-if="notifications.length === 0" class="text-center q-pa-md text-grey">
                  No new notifications
                </div>
                <q-item v-for="notif in notifications" :key="notif.id" clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>{{ notif.title }}</q-item-label>
                    <q-item-label caption>{{ notif.message }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn round flat color="grey-7" icon="settings" to="/settings" />

          <q-separator vertical inset class="q-mx-sm bg-grey-3" />

          <q-btn flat no-caps class="q-ml-none rounded-borders text-dark pl-1">
            <q-avatar size="36px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="text-left q-ml-sm gt-xs">
              <div class="text-weight-bold text-subtitle2" style="line-height: 1.1">
                {{ userEmail.split('@')[0] || 'User' }}
              </div>
              <div class="text-caption text-grey-6" style="line-height: 1; font-size: 11px">
                {{ isSuperAdmin ? 'Super Admin' : 'Administrator' }}
              </div>
            </div>
            <q-menu
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[0, 10]"
              class="bg-white border-light text-dark shadow-10"
            >
              <q-list style="min-width: 200px">
                <div class="q-px-md q-py-sm">
                  <div class="text-weight-bold">{{ userEmail.split('@')[0] || 'User' }}</div>
                  <div class="text-caption text-grey-6">{{ userEmail || 'Loading...' }}</div>
                </div>
                <q-separator class="bg-grey-2" />

                <q-item clickable v-close-popup to="/profile" class="text-grey-8">
                  <q-item-section avatar>
                    <q-icon name="person_outline" />
                  </q-item-section>
                  <q-item-section>My Profile</q-item-section>
                </q-item>

                <q-item clickable v-close-popup to="/settings" class="text-grey-8">
                  <q-item-section avatar>
                    <q-icon name="settings" />
                  </q-item-section>
                  <q-item-section>Settings</q-item-section>
                </q-item>

                <q-separator class="bg-grey-2" />

                <q-item
                  clickable
                  v-close-popup
                  @click="handleLogout"
                  class="text-red-7 hover:bg-red-50"
                >
                  <q-item-section avatar>
                    <q-icon name="logout" color="red-7" />
                  </q-item-section>
                  <q-item-section>Log Out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Sidebar (Drawer) -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="260">
      <div class="q-pa-lg q-mb-xs flex flex-center">
        <div class="row items-center cursor-pointer" @click="$router.push('/dashboard')">
          <div class="text-h5 text-weight-bolder text-gold-gradient tracking-tight font-heading">
            DigyNex
          </div>
        </div>
      </div>

      <q-list padding class="text-slate-300">
        <q-item-label
          header
          class="text-grey-5 text-uppercase text-weight-bold text-caption q-pl-lg q-mb-xs q-pt-sm"
          style="font-size: 0.7rem; letter-spacing: 1px"
        >
          Main Menu
        </q-item-label>

        <q-item
          clickable
          v-ripple
          v-for="link in mainLinks"
          :key="link.title"
          :to="link.link"
          active-class="active-dark-link"
          class="q-mx-md rounded-borders q-mb-sm transition-all text-slate-400"
        >
          <q-item-section avatar style="min-width: 40px">
            <q-icon :name="link.icon" size="22px" />
          </q-item-section>
          <q-item-section class="text-weight-medium text-body2">
            {{ link.title }}
          </q-item-section>
        </q-item>

        <q-separator spaced="lg" class="q-mx-lg bg-grey-8 opacity-20" />

        <q-item-label
          header
          class="text-grey-5 text-uppercase text-weight-bold text-caption q-pl-lg q-mb-xs"
          style="font-size: 0.7rem; letter-spacing: 1px"
        >
          Management
        </q-item-label>

        <q-item
          clickable
          v-ripple
          v-for="link in managementLinks"
          :key="link.title"
          :to="link.link"
          active-class="active-dark-link"
          class="q-mx-md rounded-borders q-mb-sm transition-all text-slate-400"
        >
          <q-item-section avatar style="min-width: 40px">
            <q-icon :name="link.icon" size="22px" />
          </q-item-section>
          <q-item-section class="text-weight-medium text-body2">
            {{ link.title }}
          </q-item-section>
        </q-item>

        <!-- Bottom Spacer to prevent overlap with absolute bottom -->
        <div class="q-pb-xl"></div>
        <div class="q-pb-lg"></div>

        <!-- Bottom Section Wrapper -->
        <div class="absolute-bottom bg-transparent q-pb-md">
          <!-- Support Button -->
          <div
            class="q-mx-md q-mb-md glass-box rounded-borders q-pa-sm cursor-pointer hover-scale transition-all"
            @click="supportDialog = true"
          >
            <div class="row items-center no-wrap justify-between">
              <div class="row items-center">
                <div class="bg-secondary-opacity q-pa-xs rounded-borders q-mr-sm">
                  <q-icon name="headset_mic" color="secondary" size="20px" />
                </div>
                <div>
                  <div class="text-caption text-weight-bold text-white" style="font-size: 13px">
                    Need Help?
                  </div>
                  <div class="text-caption text-grey-5" style="font-size: 10px">
                    Contact Support
                  </div>
                </div>
              </div>
              <q-icon name="chevron_right" color="grey-6" size="18px" />
            </div>
          </div>

          <!-- Powered By -->
          <div class="text-center cursor-pointer q-mt-sm" @click="openSite">
            <div
              class="text-caption text-grey-7 q-mb-xs"
              style="font-size: 9px; letter-spacing: 0.5px"
            >
              Powered by
            </div>
            <div class="text-h6 text-weight-bolder text-gold-gradient font-heading">DigyNex</div>
          </div>
        </div>
      </q-list>
      <!-- Spacer to prevent content overlap -->
      <div style="height: 180px"></div>
    </q-drawer>

    <!-- Support Dialog -->
    <q-dialog v-model="supportDialog">
      <q-card style="min-width: 350px" class="bg-white rounded-borders">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-weight-bold text-primary">Contact Support</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup class="text-grey" />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <p class="text-grey-7 text-body2 q-mb-md">
            Have a question or need assistance? Choose an option below.
          </p>

          <div class="q-gutter-y-sm">
            <q-btn
              outline
              color="primary"
              class="full-width text-left"
              no-caps
              align="left"
              href="mailto:support@digynex.se"
              target="_blank"
            >
              <template v-slot:default>
                <div class="row items-center full-width">
                  <q-icon name="email" class="q-mr-md" size="sm" />
                  <div>
                    <div class="text-weight-bold">Email Support</div>
                    <div class="text-caption text-grey-6">response within 24h</div>
                  </div>
                </div>
              </template>
            </q-btn>

            <q-btn
              outline
              color="green-7"
              class="full-width text-left"
              no-caps
              align="left"
              href="https://wa.me/"
              target="_blank"
            >
              <template v-slot:default>
                <div class="row items-center full-width">
                  <q-icon name="chat" class="q-mr-md" size="sm" />
                  <div>
                    <div class="text-weight-bold">WhatsApp Chat</div>
                    <div class="text-caption text-grey-6">Instant support</div>
                  </div>
                </div>
              </template>
            </q-btn>

            <q-btn
              unelevated
              class="full-width text-left bg-gold-gradient text-white"
              no-caps
              align="left"
              href="https://digynex.se"
              target="_blank"
            >
              <template v-slot:default>
                <div class="row items-center full-width">
                  <q-icon name="language" class="q-mr-md" size="sm" />
                  <div>
                    <div class="text-weight-bold">Visit Website</div>
                    <div class="text-caption text-white-opacity">digynex.se</div>
                  </div>
                </div>
              </template>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-page-container class="bg-slate-50" style="min-height: 100vh">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'

const $q = useQuasar()
// Hybrid Mode: Dark Sidebar, Light Content
$q.dark.set(true)

const leftDrawerOpen = ref(false)
const search = ref('')
const router = useRouter()
const userEmail = ref('')
const userId = ref('') // Added for robust checking
const supportDialog = ref(false)
const notifications = ref([])

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const handleSearch = () => {
  if (search.value.trim() === '') return
  router.push({ path: '/students', query: { q: search.value } })
}

const openSite = () => {
  window.open('https://digynex.se', '_blank')
}

const mainLinks = [{ title: 'Dashboard', icon: 'grid_view', link: '/dashboard' }]

const allManagementLinks = [
  { title: 'Students', icon: 'school', link: '/students' },
  { title: 'Tutors', icon: 'co_present', link: '/tutors' },
  { title: 'Classes', icon: 'class', link: '/classes' },
  { title: 'Attendance', icon: 'rule', link: '/attendance' },
  { title: 'Payments', icon: 'payments', link: '/payments' },
  { title: 'Exams', icon: 'assignment', link: '/exams' },
  { title: 'Reports', icon: 'bar_chart', link: '/reports' },
  { title: 'Billing & Plan', icon: 'credit_card', link: '/subscription' },
  {
    title: 'System Users',
    icon: 'manage_accounts',
    link: '/super-admin',
    superAdminOnly: true, // Custom flag
  },
]

const isSuperAdmin = computed(() => {
  const email = userEmail.value?.toLowerCase() || ''
  return (
    email === 'amilawijayanthaperera@gmail.com' ||
    email === 'amilawijayanthaperera858@gmail.com' ||
    email === 'admin@digynex.com' ||
    userId.value === '74736fbf-0700-4a0d-b797-84d0b0b3b554'
  )
})

const managementLinks = computed(() => {
  return allManagementLinks.filter((link) => {
    if (link.superAdminOnly) {
      return isSuperAdmin.value
    }
    return true
  })
})

onMounted(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    userEmail.value = user.email
    userId.value = user.id
  }
})

const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}
.font-heading {
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.5px;
}

/* Sidebar Active State Styling (Dark Mode) */
.active-dark-link {
  position: relative;
  font-weight: 600 !important;
  background: rgba(16, 185, 129, 0.1) !important; /* Secondary/Emerald with low opacity */
  color: #10b981 !important; /* Emerald Text */
  border-right: 3px solid #10b981; /* Emerald Accent */
}

.transition-all {
  transition: all 0.3s ease;
}

.transition-all:hover {
  background-color: rgba(255, 255, 255, 0.05); /* Subtle white hover */
  color: white;
  padding-left: 20px;
}

/* Glass Box for Bottom Support Section */
.glass-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
}

.hover-scale {
  transition: transform 0.2s ease;
}
.hover-scale:hover {
  transform: scale(1.02);
  background: rgba(255, 255, 255, 0.07);
}

.text-gold-gradient {
  background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #bf953f; /* Fallback */
}

.bg-gold-gradient {
  background: linear-gradient(to right, #bf953f, #b38728);
}

/* Smooth Page Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.border-bottom-light {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
</style>
