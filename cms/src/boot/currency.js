import { boot } from 'quasar/wrappers'
import { useCurrencyStore } from 'stores/currency'

export default boot(async () => {
  const currencyStore = useCurrencyStore()
  await currencyStore.initialize()
})
