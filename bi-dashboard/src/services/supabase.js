import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ticmdqeyeiycznfzxqrx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpY21kcWV5ZWl5Y3puZnp4cXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzOTMzNzYsImV4cCI6MjA4NTk2OTM3Nn0.rDnmzU407z9BmIFhvFlQghXmthoYKHvlrBVyrd33i0I'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
