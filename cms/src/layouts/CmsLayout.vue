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

        <q-toolbar-title class="text-weight-bold text-h6 text-emerald-gradient row items-center">
          Nexus CMS
          <span
            class="text-caption text-dark bg-emerald q-px-sm q-py-none q-ml-sm rounded-borders font-bold"
            style="font-size: 10px; padding: 2px 6px"
            >ENTERPRISE</span
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
            placeholder="Search ecosystem..."
            class="gt-xs q-mr-md"
            input-class="text-white"
            style="min-width: 250px"
            @keyup.enter="handleSearch"
          >
            <template v-slot:prepend>
              <q-icon name="search" color="grey-5" class="cursor-pointer" @click="handleSearch" />
            </template>
          </q-input>

          <q-btn round flat color="grey-5" icon="bolt" class="hover-scale">
            <q-tooltip>Nexus Automations</q-tooltip>
          </q-btn>

          <q-btn
            round
            flat
            color="grey-5"
            icon="settings_suggest"
            to="/cms/portal/settings"
            class="hover-scale"
          />

          <q-separator vertical inset class="q-mx-sm bg-grey-9" />

          <q-btn flat no-caps class="q-ml-none rounded-borders text-white pl-1 hover-scale">
            <q-avatar size="36px" class="border-glass">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="text-left q-ml-sm gt-xs">
              <div class="text-weight-bold text-subtitle2" style="line-height: 1.1">
                {{ userEmail.split('@')[0] || 'Associate' }}
              </div>
              <div
                class="text-caption text-grey-5 uppercase tracking-tighter"
                style="line-height: 1; font-size: 10px"
              >
                Nexus Core
              </div>
            </div>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Sidebar (Drawer) -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="260" class="bg-dark-drawer">
      <div class="q-pa-xl q-mb-md flex flex-center">
        <div class="row items-center cursor-pointer" @click="$router.push('/cms/portal/dashboard')">
          <div class="text-h4 text-weight-bolder text-emerald-gradient tracking-tighter">
            DigyNex
          </div>
        </div>
      </div>

      <q-list padding>
        <q-item-label
          header
          class="text-grey-7 text-uppercase text-weight-bold text-caption q-pl-lg q-mb-xs"
          style="font-size: 0.7rem; letter-spacing: 2px"
        >
          Intelligence Center
        </q-item-label>

        <q-item
          clickable
          v-ripple
          v-for="link in mainLinks"
          :key="link.title"
          :to="link.link"
          active-class="active-emerald-link"
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
          Ops Core
        </q-item-label>

        <q-item
          clickable
          v-ripple
          v-for="link in managementLinks"
          :key="link.title"
          :to="link.link"
          active-class="active-emerald-link"
          class="q-mx-md rounded-borders q-mb-sm transition-all text-grey-5"
        >
          <q-item-section avatar style="min-width: 40px">
            <q-icon :name="link.icon" size="22px" />
          </q-item-section>
          <q-item-section class="text-weight-bold text-body2">
            {{ link.title }}
          </q-item-section>
        </q-item>

        <!-- Bottom Section Wrapper -->
        <div class="q-mt-auto q-pb-xl">
          <q-separator spaced="lg" class="q-mx-lg bg-grey-10" />
          <!-- Support Box -->
          <div
            class="q-mx-md q-mb-lg glass-box-emerald rounded-borders q-pa-md cursor-pointer hover-scale transition-all"
            @click="supportDialog = true"
          >
            <div class="row items-center no-wrap justify-between">
              <div class="row items-center">
                <div class="bg-emerald-opacity q-pa-sm rounded-borders q-mr-sm">
                  <q-icon name="hub" color="emerald" size="24px" />
                </div>
                <div>
                  <div class="text-caption text-weight-bolder text-white">Nexus Hub</div>
                  <div class="text-caption text-grey-5" style="font-size: 10px">Live Response</div>
                </div>
              </div>
              <q-icon name="chevron_right" color="grey-7" size="18px" />
            </div>
          </div>

          <!-- Copyright footer in sidebar -->
          <div class="text-center">
            <div class="text-h6 text-weight-bold text-emerald-gradient">DigyNex</div>
            <div class="text-caption text-grey-8" style="font-size: 9px">
              © 2026 Systems Orchestrator
            </div>
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

    <!-- Nexus Hub Support Dialog -->
    <q-dialog v-model="supportDialog" backdrop-filter="blur(10px)">
      <q-card
        style="min-width: 400px; border-radius: 20px"
        class="bg-dark-card border-glass text-white"
      >
        <q-card-section class="q-pa-lg">
          <div class="row items-center q-mb-md">
            <q-avatar size="48px" class="bg-emerald-opacity">
              <q-icon name="hub" color="emerald" size="28px" />
            </q-avatar>
            <div class="q-ml-md">
              <div class="text-h6 text-weight-bold">Nexus Hub</div>
              <div class="text-caption text-emerald">Internal System Response</div>
            </div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup color="grey-6" />
          </div>

          <q-separator dark class="q-my-md bg-grey-9" />

          <div class="q-gutter-y-md">
            <div class="bg-black-opacity q-pa-md rounded-borders border-glass">
              <div class="text-caption text-grey-5 uppercase q-mb-sm">Status</div>
              <div class="row items-center">
                <div
                  class="bg-emerald q-pa-xs rounded-circle q-mr-sm"
                  style="width: 8px; height: 8px"
                ></div>
                <div class="text-weight-bold">Deep Neural Core Online</div>
              </div>
            </div>

            <div class="text-body2 text-grey-4">
              Nexus Hub is your direct link to our technical architecture support. For critical
              system intervention or custom workflow deployment, contact our orchestration team.
            </div>

            <q-btn
              unelevated
              class="full-width bg-emerald-gradient text-white q-py-sm font-bold"
              label="Contact Orchestrator"
              icon="support_agent"
              no-caps
              to="/cms/portal/chat?context=support"
              @click="supportDialog = false"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'

const $q = useQuasar()
$q.dark.set(true)

const leftDrawerOpen = ref(false)
const search = ref('')
const userEmail = ref('')
const supportDialog = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const handleSearch = () => {
  if (search.value.trim() === '') return
}

const mainLinks = [{ title: 'Overview', icon: 'grid_view', link: '/cms/portal/dashboard' }]

const managementLinks = [
  { title: 'Leads & Streams', icon: 'leaderboard', link: '/cms/portal/leads' },
  { title: 'Deals & Flow', icon: 'view_kanban', link: '/cms/portal/sales' },
  { title: 'Live Nexus', icon: 'forum', link: '/cms/portal/chat' },
  { title: 'Enterprise Clients', icon: 'business', link: '/cms/portal/clients' },
  { title: 'Fiscal Intelligence', icon: 'payments', link: '/cms/portal/revenue' },
  { title: 'Nexus Control Center', icon: 'psychology', link: '/cms/portal/nexus' },
]

onMounted(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    userEmail.value = user.email
  }
})
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

.text-emerald-gradient {
  background: linear-gradient(to right, #10b981, #34d399);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.active-emerald-link {
  background: rgba(16, 185, 129, 0.08) !important;
  color: #10b981 !important;
  border-left: 4px solid #10b981;
  font-weight: 700 !important;
}

.bg-emerald-opacity {
  background: rgba(16, 185, 129, 0.1);
}
.text-emerald {
  color: #10b981;
}
.bg-emerald {
  background: #10b981;
}

.glass-box-emerald {
  background: rgba(16, 185, 129, 0.03);
  border: 1px solid rgba(16, 185, 129, 0.1);
  backdrop-filter: blur(10px);
}

.hover-scale:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
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
