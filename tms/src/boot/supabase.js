import { createClient } from '@supabase/supabase-js'
import { boot } from 'quasar/wrappers'

// Use environment variables for security in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Supabase URL or Key is missing! Check your .env file or Vercel Environment Variables.',
  )
} else {
  console.log('Supabase initialized with URL:', supabaseUrl)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default boot(({ app }) => {
  app.config.globalProperties.$supabase = supabase
  // You can also use inject in composition API:
  // app.provide('supabase', supabase)
})

export { supabase }
