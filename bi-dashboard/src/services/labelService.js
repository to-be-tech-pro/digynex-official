import { reactive } from 'vue'

const common = {
    revenue: 'Revenue',
    profit: 'Profit',
    expense: 'Cost',
    target: 'Target',
    insight: 'AI Status'
}

const labelsByOrgType = {
    Project: {
        ...common,
        entity: 'Projects',
        fulfillment: 'Work Orders',
        pipeline: 'Project Pipeline',
        partner: 'Partner',
        dashboardTitle: 'Business Outlook'
    },
    Service: {
        ...common,
        entity: 'Services',
        fulfillment: 'Service Tasks',
        pipeline: 'Queue',
        partner: 'Customer',
        dashboardTitle: 'Operation Center'
    },
    Education: {
        ...common,
        entity: 'Enrollments',
        fulfillment: 'Classes',
        pipeline: 'Academic Path',
        partner: 'Student',
        dashboardTitle: 'Tuition Dashboard'
    }
}

export const brandingStore = reactive({
  productName: 'DigyNex',
  productSuffix: '360',
  currency: 'LKR',
  orgType: 'Project',
  labels: labelsByOrgType.Project,
  planTier: 'Business',
  
  // Default Branding
  companyName: 'DigyNex Head Office',
  address: 'No 45, High-Performance Tech Hub, Colombo, Sri Lanka',
  contactEmail: 'operations@digynex.se',
  taxId: 'VAT-SL-2026-9901',
  website: 'https://digynex.se',
  logoUrl: 'https://raw.githubusercontent.com/amilawijayantha/digynex-assets/main/logo-dark.png',
  primaryColor: '#6366f1'
})

export const setBranding = (data) => {
  if (data.org_type) {
    brandingStore.orgType = data.org_type;
    brandingStore.labels = labelsByOrgType[data.org_type] || labelsByOrgType.Project;
  }
  Object.assign(brandingStore, data)
}
