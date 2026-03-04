import { defineStore } from 'pinia'
import { supabase } from 'boot/supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    profile: null,
    loading: false,
    selectedOrgId: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isSuperAdmin: (state) => state.profile?.role === 'super_admin',
    userOrgId: (state) => state.selectedOrgId || state.profile?.org_id,
  },

  actions: {
    async fetchProfile() {
      if (!this.user) return

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', this.user.id)
          .single()

        if (error) throw error
        this.profile = data
        this.selectedOrgId = data.org_id
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    },

    setOrganization(orgId) {
      if (this.isSuperAdmin) {
        this.selectedOrgId = orgId
      }
    },

    async initialize() {
      this.loading = true
      const { data: { session } } = await supabase.auth.getSession()
      this.user = session?.user || null
      if (this.user) {
        await this.fetchProfile()
      }
      this.loading = false
    },

    async logout() {
      await supabase.auth.signOut()
      this.user = null
      this.profile = null
    }
  }
})
