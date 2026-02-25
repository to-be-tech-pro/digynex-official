<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from 'boot/supabase'

import { useCurrencyStore } from 'stores/currency'

const router = useRouter()
const currencyStore = useCurrencyStore()

onMounted(() => {
  currencyStore.initialize()
  supabase.auth.onAuthStateChange((event) => {
    if (event === 'PASSWORD_RECOVERY') {
      router.push('/reset-password')
    }
  })
})
</script>
