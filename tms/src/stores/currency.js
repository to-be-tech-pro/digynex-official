import { defineStore } from 'pinia'
import axios from 'axios'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    countryCode: localStorage.getItem('user_country') || 'LK',
    currency: 'LKR',
    symbol: 'LKR',
    // Entry-level Sub-product Pricing (TMS SaaS Module)
    pricing: {
      starter: 19,
      growth: 29,
      scale: 79
    },
    setup: {
      starter: 99,
      growth: 199,
      scale: 499
    },
    taxRate: 0,
    isLoaded: false,
  }),

  getters: {
    // Basic price getters with tax
    starterPrice: (state) => state.pricing.starter * (1 + state.taxRate),
    growthPrice: (state) => state.pricing.growth * (1 + state.taxRate),
    scalePrice: (state) => state.pricing.scale * (1 + state.taxRate),
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
      // 🇱🇰 SRI LANKA - Sub-Product Entry Model
      if (this.countryCode === 'LK' || this.countryCode === 'SL') {
        this.currency = 'LKR'
        this.symbol = 'LKR'
        this.pricing = {
          starter: 6000,
          growth: 9000,
          scale: 18000
        }
        this.setup = {
          starter: 8000,
          growth: 12000,
          scale: 18000
        }
        this.taxRate = 0
      }
      // 🇸🇪 SWEDEN / EU - Premium Core Region (Sub-product)
      else if (this.countryCode === 'SE') {
        this.currency = 'SEK'
        this.symbol = 'kr'
        this.pricing = {
          starter: 199,
          growth: 299,
          scale: 799
        }
        this.setup = {
          starter: 999,
          growth: 1999,
          scale: 4999
        }
        this.taxRate = 0.25
      }
      // 🌎 GLOBAL / US DEFAULT - Unified SaaS Strategy (Sub-product)
      else {
        this.currency = 'USD'
        this.symbol = '$'
        this.pricing = {
          starter: 19,
          growth: 29,
          scale: 79
        }
        this.setup = {
          starter: 99,
          growth: 199,
          scale: 499
        }
        this.taxRate = 0.05
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
