import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ticmdqeyeiycznfzxqrx.supabase.co'
const supabaseAnonKey = 'sb_publishable_My_0QQBRse8sYCjGpxdNCA_8fJMZop2'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
