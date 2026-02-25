<template>
  <q-layout view="lHh Lpr lFf" class="bg-dark-page font-inter">
    <!-- Header -->
    <q-header class="glass-header text-white" height-hint="60">
      <q-toolbar class="q-px-md">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="q-mr-sm text-grey-5"
        />

        <q-toolbar-title class="text-weight-bold text-h6 text-gold-gradient row items-center">
          DigyNex
          <span
            class="text-caption text-dark bg-gold q-px-xs q-py-none q-ml-sm rounded-borders font-bold"
            style="font-size: 10px; padding: 2px 6px"
            >BETA</span
          >
        </q-toolbar-title>

        <q-space />

        <!-- Top Right Actions -->
        <div class="q-gutter-x-sm row items-center">
          <q-input
            dense
            filled
            dark
            rounded
            v-model="search"
            placeholder="Global search..."
            class="gt-xs q-mr-md"
            input-class="text-white"
            style="min-width: 250px"
            @keyup.enter="handleSearch"
          >
            <template v-slot:prepend>
              <q-icon name="search" color="grey-5" class="cursor-pointer" @click="handleSearch" />
            </template>
          </q-input>

          <q-btn round flat color="grey-5" icon="notifications" class="hover-scale">
            <q-badge color="red" floating rounded mini v-if="notifications.length > 0" />
          </q-btn>

          <q-btn
            round
            flat
            color="grey-5"
            icon="settings"
            to="/tms/portal/settings"
            class="hover-scale"
          />

          <q-separator vertical inset class="q-mx-sm bg-grey-9" />

          <q-btn flat no-caps class="q-ml-none rounded-borders text-white pl-1 hover-scale">
            <q-avatar size="36px" class="border-glass">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="text-left q-ml-sm gt-xs" @click="menuOpen = !menuOpen">
              <div class="text-weight-bold text-subtitle2" style="line-height: 1.1">
                {{ userEmail.split('@')[0] || 'Admin' }}
              </div>
              <div
                class="text-caption text-grey-5 uppercase tracking-tighter"
                style="line-height: 1; font-size: 10px"
              >
                {{ isSuperAdmin ? 'Master Entity' : 'Coordinator' }}
              </div>
            </div>
            <q-menu
              dark
              transition-show="jump-down"
              transition-hide="jump-up"
              class="bg-dark-drawer border-glass"
            >
              <q-list style="min-width: 200px">
                <q-item clickable v-close-popup to="/profile" class="text-grey-3">
                  <q-item-section avatar><q-icon name="person_outline" /></q-item-section>
                  <q-item-section>Profile</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="handleLogout" class="text-red">
                  <q-item-section avatar><q-icon name="logout" /></q-item-section>
                  <q-item-section>Terminate Session</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Sidebar (Drawer) -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="260" class="bg-dark-drawer">
      <div class="q-pa-xl q-mb-md flex flex-center">
        <div class="row items-center cursor-pointer" @click="$router.push('/tms/portal/dashboard')">
          <div class="text-h4 text-weight-bolder text-gold-gradient tracking-tighter">DigyNex</div>
        </div>
      </div>

      <q-list padding>
        <q-item-label
          header
          class="text-grey-7 text-uppercase text-weight-bold text-caption q-pl-lg q-mb-xs"
          style="font-size: 0.7rem; letter-spacing: 2px"
        >
          Institutional Control
        </q-item-label>

        <q-item
          clickable
          v-ripple
          v-for="link in mainLinks"
          :key="link.title"
          :to="link.link"
          active-class="active-gold-link"
          class="q-mx-md rounded-borders q-mb-sm transition-all text-grey-5"
        >
          <q-item-section avatar style="min-width: 40px">
            <q-icon :name="link.icon" size="22px" />
          </q-item-section>
          <q-item-section class="text-weight-bold text-body2">
            {{ link.title }}
          </q-item-section>
        </q-item>

        <q-separator spaced="lg" class="q-mx-lg bg-grey-10" />

        <q-item-label
          header
          class="text-grey-7 text-uppercase text-weight-bold text-caption q-pl-lg q-mb-xs"
          style="font-size: 0.7rem; letter-spacing: 2px"
        >
          Management Core
        </q-item-label>

        <q-item
          clickable
          v-ripple
          v-for="link in managementLinks"
          :key="link.title"
          :to="link.link"
          active-class="active-gold-link"
          class="q-mx-md rounded-borders q-mb-sm transition-all text-grey-5"
        >
          <q-item-section avatar style="min-width: 40px">
            <q-icon :name="link.icon" size="22px" />
          </q-item-section>
          <q-item-section class="text-weight-bold text-body2">
            {{ link.title }}
          </q-item-section>
        </q-item>

        <div class="absolute-bottom bg-transparent q-pb-xl">
          <div
            class="q-mx-md q-mb-lg glass-box-gold rounded-borders q-pa-md cursor-pointer hover-scale transition-all"
            @click="supportDialog = true"
          >
            <div class="row items-center no-wrap justify-between">
              <div class="row items-center">
                <div class="bg-gold-opacity q-pa-sm rounded-borders q-mr-sm">
                  <q-icon name="support_agent" color="gold" size="24px" />
                </div>
                <div>
                  <div class="text-caption text-weight-bolder text-white">System Help</div>
                  <div class="text-caption text-grey-5" style="font-size: 10px">
                    Protocol Active
                  </div>
                </div>
              </div>
              <q-icon name="chevron_right" color="grey-7" size="18px" />
            </div>
          </div>
          <div class="text-center">
            <div class="text-h6 text-weight-bold text-gold-gradient">DigyNex</div>
          </div>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-dark-page">
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
$q.dark.set(true)

const router = useRouter()
const leftDrawerOpen = ref(false)
const search = ref('')
const userEmail = ref('')
const userId = ref('')
const notifications = ref([])
const supportDialog = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
const handleSearch = () => {
  if (search.value.trim() !== '')
    router.push({ path: '/tms/portal/students', query: { q: search.value } })
}

const mainLinks = [{ title: 'Control Wall', icon: 'grid_view', link: '/tms/portal/dashboard' }]

const allManagementLinks = [
  { title: 'Talent Pool (Students)', icon: 'school', link: '/tms/portal/students' },
  { title: 'Faculty (Tutors)', icon: 'co_present', link: '/tms/portal/tutors' },
  { title: 'Session Core (Classes)', icon: 'class', link: '/tms/portal/classes' },
  { title: 'Audit Presence', icon: 'rule', link: '/tms/portal/attendance' },
  { title: 'Revenue Vault', icon: 'payments', link: '/tms/portal/payments' },
  { title: 'Examinations', icon: 'assignment', link: '/tms/portal/exams' },
  { title: 'Analytics Core', icon: 'bar_chart', link: '/tms/portal/reports' },
  {
    title: 'Master Console',
    icon: 'manage_accounts',
    link: '/tms/portal/super-admin',
    superAdminOnly: true,
  },
]

const isSuperAdmin = computed(() => {
  const email = userEmail.value?.toLowerCase() || ''
  return email.includes('amilawijayanthaperera') || email === 'admin@digynex.com'
})

const managementLinks = computed(() =>
  allManagementLinks.filter((l) => !l.superAdminOnly || isSuperAdmin.value),
)

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
.bg-dark-page {
  background-color: #060910 !important;
}
.bg-dark-drawer {
  background-color: #080c14 !important;
  border-right: 1px solid rgba(255, 255, 255, 0.05) !important;
}

.glass-header {
  background: rgba(8, 12, 20, 0.8) !important;
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.text-gold-gradient {
  background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.active-gold-link {
  background: rgba(191, 149, 63, 0.08) !important;
  color: #bf953f !important;
  border-left: 4px solid #bf953f;
  font-weight: 700 !important;
}

.bg-gold-opacity {
  background: rgba(191, 149, 63, 0.1);
}
.bg-gold {
  background: #bf953f;
}
.text-gold {
  color: #bf953f;
}

.glass-box-gold {
  background: rgba(191, 149, 63, 0.03);
  border: 1px solid rgba(191, 149, 63, 0.1);
  backdrop-filter: blur(10px);
}

.hover-scale {
  transition: transform 0.2s ease;
}
.hover-scale:hover {
  transform: scale(1.05);
}
.border-glass {
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
