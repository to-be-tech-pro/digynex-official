import { defineStore } from 'pinia'
import axios from 'axios'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    countryCode: localStorage.getItem('user_country') || 'SE', // Default to SE for Sweden user
    currency: 'SEK',
    symbol: 'kr',
    proPrice: 750,
    isLoaded: false,
  }),

  actions: {
    async initialize() {
      if (this.isLoaded) return

      try {
        // Try multiple APIs for reliability
        const res = await axios
          .get('https://ipapi.co/json/')
          .catch(() => axios.get('https://ip-api.com/json/'))

        if (res.data) {
          const code = res.data.country_code || res.data.countryCode
          if (code) {
            this.setCountryCode(code)
          }
        }
      } catch (error) {
        console.warn('Currency detection failed, using defaults', error)
      }

      this.updateStateByCountry()
      this.isLoaded = true
    },

    setCountryCode(code) {
      if (!code) return
      this.countryCode = code
      localStorage.setItem('user_country', code)
      this.updateStateByCountry()
    },

    updateStateByCountry() {
      if (this.countryCode === 'LK' || this.countryCode === 'SL') {
        this.currency = 'LKR'
        this.symbol = 'LKR'
        this.proPrice = 15000
      } else if (this.countryCode === 'SE') {
        this.currency = 'SEK'
        this.symbol = 'kr'
        this.proPrice = 750
      } else {
        // International Default
        this.currency = 'USD'
        this.symbol = '$'
        this.proPrice = 49
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

    formatShort(val) {
      if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M'
      if (val >= 1000) return (val / 1000).toFixed(1) + 'k'
      return val
    },
  },
})
