import { reactive } from 'vue'

export const authStore = reactive({
  user: {
    name: 'Amila W.',
    role: 'ceo', // Options: ceo, manager, staff, finance
    email: 'operations@digynex.se',
    avatar: 'AM'
  },
  
  roleLabels: {
    ceo: 'Executive Management (CEO)',
    manager: 'Operations Manager',
    staff: 'Operations Staff',
    finance: 'Finance Controller',
    subcontractor: 'Subcontractor Node'
  },
  
  can: (module) => {
    const permissions = {
      ceo: ['dashboard', 'sales', 'bi', 'operations', 'crm', 'finance', 'settings'],
      manager: ['dashboard', 'bi', 'operations', 'crm', 'sales'],
      staff: ['operations'],
      finance: ['dashboard', 'finance', 'bi', 'crm'],
      subcontractor: ['operations']
    }
    
    const access = permissions[authStore.user.role]
    if (!access) return false
    return access.includes(module)
  }
})

export const setRole = (role) => {
  if (['ceo', 'manager', 'staff', 'finance', 'subcontractor'].includes(role)) {
    authStore.user.role = role
    return true
  }
  return false
}


