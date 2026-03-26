import { defineStore } from 'pinia'
import axios from 'axios'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    countryCode: localStorage.getItem('user_country') || 'LK',
    currency: 'LKR',
    symbol: 'LKR',
    // New Tiered Pricing Structure (Master Core)
    pricing: {
      starter: 2500,
      business: 12000,
      enterprise: 18000
    },
    taxRate: 0,
    isLoaded: false,
  }),

  getters: {
    // Basic price getters with tax
    starterPrice: (state) => state.pricing.starter * (1 + state.taxRate),
    businessPrice: (state) => state.pricing.business * (1 + state.taxRate),
    enterprisePrice: (state) => state.pricing.enterprise * (1 + state.taxRate),
  },

  actions: {
    async initialize() {
      if (this.isLoaded) return

      try {
        const res = await axios
          .get('https://ipapi.co/json/')
          .catch(() => axios.get('https://ip-api.com/json/'))

        if (res.data) {
          const code = res.data.country_code || res.data.countryCode
          if (code) {
            this.countryCode = code
            localStorage.setItem('user_country', code)
          }
        }
      } catch {
        console.warn('Currency detection failed, using defaults')
      }

      this.updateStateByCountry()
      this.isLoaded = true
    },

    updateStateByCountry() {
      // 🇱🇰 SRI LANKA - Master Localized Strategy
      if (this.countryCode === 'LK' || this.countryCode === 'SL') {
        this.currency = 'LKR'
        this.symbol = 'LKR'
        this.pricing = {
          starter: 2500,
          business: 12000,
          enterprise: 18000
        }
        this.taxRate = 0
      } 
      // 🇸🇪 SWEDEN / EU - Premium Region
      else if (this.countryCode === 'SE') {
        this.currency = 'SEK'
        this.symbol = 'kr'
        this.pricing = {
          starter: 299,
          business: 899,
          enterprise: 1499
        }
        this.taxRate = 0.25 // Sweden VAT
      } 
      // 🌎 GLOBAL / US DEFAULT - Premium Unified Strategy
      else {
        this.currency = 'USD'
        this.symbol = '$'
        this.pricing = {
          starter: 29,
          business: 89,
          enterprise: 149
        }
        this.taxRate = 0.05 // Global general duty/tax
      }
    },

    format(amount) {
      if (amount === undefined || amount === null) return ''
      const formatted = Number(amount).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })

      if (this.currency === 'SEK') {
        return `${formatted} ${this.symbol}`
      }
      return `${this.symbol} ${formatted}`
    },
  },
})
