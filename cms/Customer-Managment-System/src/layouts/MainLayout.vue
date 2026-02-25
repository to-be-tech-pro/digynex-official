<template>
  <q-layout view="hHh lpR fff">
    <q-header class="bg-primary text-white" height-hint="98">
      <q-toolbar class="q-py-sm q-px-md">
        <q-toolbar-title class="text-weight-bold text-h5">
          <span class="text-secondary">Q</span>uasra
        </q-toolbar-title>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap gt-sm">
          <q-btn flat dense no-caps label="Home" class="text-weight-regular" />
          <q-btn flat dense no-caps label="Features" class="text-weight-regular" />
          <q-btn flat dense no-caps label="Analytics" class="text-weight-regular" />
          <q-btn flat dense no-caps label="Pricing" class="text-weight-regular" />
          <q-btn flat dense no-caps label="Contact" class="text-weight-regular" />
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn flat no-caps label="Log In" class="text-white" />
          <q-btn
            unelevated
            rounded
            color="secondary"
            text-color="white"
            no-caps
            label="Get Started"
            class="q-px-lg"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-dark text-white">
      <router-view />
    </q-page-container>

    <q-footer class="bg-primary text-white q-py-xl">
      <div class="container q-mx-auto q-px-md">
        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-4">
            <div class="text-h5 text-weight-bold q-mb-md">
              <span class="text-secondary">Q</span>uasra
            </div>
            <p class="text-grey-5" style="max-width: 300px">
              The ultimate Customer Management System designed to streamline your business
              operations and enhance customer relationships.
            </p>
          </div>

          <div class="col-6 col-md-2">
            <div class="text-subtitle1 text-weight-bold q-mb-sm">Product</div>
            <div class="flex column q-gutter-y-xs">
              <a href="#" class="text-grey-5 text-decoration-none hover-text-secondary">Features</a>
              <a href="#" class="text-grey-5 text-decoration-none hover-text-secondary"
                >Integrations</a
              >
              <a href="#" class="text-grey-5 text-decoration-none hover-text-secondary">Pricing</a>
              <a href="#" class="text-grey-5 text-decoration-none hover-text-secondary"
                >Changelog</a
              >
            </div>
          </div>

          <div class="col-6 col-md-2">
            <div class="text-subtitle1 text-weight-bold q-mb-sm">Company</div>
            <div class="flex column q-gutter-y-xs">
              <a href="#" class="text-grey-5 text-decoration-none hover-text-secondary">About Us</a>
              <a href="#" class="text-grey-5 text-decoration-none hover-text-secondary">Careers</a>
              <a href="#" class="text-grey-5 text-decoration-none hover-text-secondary">Blog</a>
              <a href="#" class="text-grey-5 text-decoration-none hover-text-secondary">Contact</a>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="text-subtitle1 text-weight-bold q-mb-sm">Subscribe to our newsletter</div>
            <q-input
              dark
              outlined
              dense
              v-model="email"
              placeholder="Enter your email"
              class="q-mb-sm"
              color="secondary"
            >
              <template v-slot:append>
                <q-btn round dense flat icon="arrow_forward" color="secondary" />
              </template>
            </q-input>
          </div>
        </div>

        <q-separator dark class="q-my-lg" />

        <div class="row justify-between items-center">
          <div class="text-grey-6 text-caption">© 2024 Quasra CMS. All rights reserved.</div>
          <div class="q-gutter-sm">
            <q-btn flat round dense icon="fab fa-twitter" color="grey-6" />
            <q-btn flat round dense icon="fab fa-linkedin" color="grey-6" />
            <q-btn flat round dense icon="fab fa-github" color="grey-6" />
          </div>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
</script>

<style scoped>
.text-decoration-none {
  text-decoration: none;
}
.hover-text-secondary:hover {
  color: var(--q-secondary) !important;
  transition: color 0.3s ease;
}
</style>
