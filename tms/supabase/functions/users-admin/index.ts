
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Auth Check
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error('Missing Authorization header')

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token)
    if (authError || !user) throw new Error('Invalid token')

    // Only allow Super Admins or specific roles
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'super_admin' && profile?.role !== 'Admin') {
      throw new Error('Unauthorized: Admin access required')
    }

    const { action, ...data } = await req.json()

    if (action === 'create') {
        const { email, password, name, role } = data
        const { data: newUser, error } = await supabaseClient.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { name, role }
        })
        if (error) throw error
        return new Response(JSON.stringify(newUser), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    if (action === 'delete') {
        const { id } = data
        // 1. Delete user from Auth
        const { error: authError } = await supabaseClient.auth.admin.deleteUser(id)
        if (authError) throw authError

        // 2. Delete from profiles (trigger might handle it, but being safe)
        await supabaseClient.from('profiles').delete().eq('id', id)

        return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    if (action === 'updatePassword') {
       const { id, password } = data
       const { error } = await supabaseClient.auth.admin.updateUserById(id, { password })
       if (error) throw error
        return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    if (action === 'updateProfile') {
        const { id, name, role } = data
        await supabaseClient.auth.admin.updateUserById(id, { user_metadata: { name, role } })
        const { error } = await supabaseClient.from('profiles').update({ name, role }).eq('id', id)
        if (error) throw error
        return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    throw new Error('Invalid action')

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
