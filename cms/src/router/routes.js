const routes = [
  {
    path: '/',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
      { path: 'landing', component: () => import('pages/LandingPage.vue') },
      { path: 'card', component: () => import('pages/CardPage.vue') },
      { path: 'cms', component: () => import('pages/CmsPage.vue') },
      { path: 'tms', component: () => import('pages/TmsPage.vue') },
    ],
  },

  // --- TMS (Tuition Manager) Portal Routes ---
  {
    path: '/tms/portal',
    component: () => import('layouts/TmsLayout.vue'),
    children: [
      { path: 'dashboard', component: () => import('pages/TmsDashboard.vue') },
      { path: 'students', component: () => import('pages/StudentsPage.vue') },
      { path: 'tutors', component: () => import('pages/TutorsPage.vue') },
      { path: 'payments', component: () => import('pages/PaymentsPage.vue') },
      { path: 'classes', component: () => import('pages/ClassesPage.vue') },
      { path: 'attendance', component: () => import('pages/AttendancePage.vue') },
      { path: 'reports', component: () => import('pages/ReportsPage.vue') },
      { path: 'exams', component: () => import('pages/ExamsPage.vue') },
      { path: 'profile', component: () => import('pages/ProfilePage.vue') },
      { path: 'settings', component: () => import('pages/SettingsPage.vue') },
      { path: 'users', component: () => import('pages/UsersPage.vue') },
      { path: 'subscription', component: () => import('pages/SubscriptionPage.vue') },
      { path: 'super-admin', component: () => import('pages/SuperAdminPage.vue') },
    ],
    meta: { requiresAuth: true },
  },

  // --- CMS (Enterprise CMS) Portal Routes ---
  {
    path: '/cms/portal',
    component: () => import('layouts/CmsLayout.vue'),
    children: [
      { path: 'dashboard', component: () => import('pages/CmsDashboard.vue') },
      {
        path: 'leads',
        component: () => import('pages/LeadsPage.vue'),
      },
      {
        path: 'sales',
        component: () => import('pages/SalesPage.vue'),
      },
      {
        path: 'chat',
        component: () => import('pages/ChatPage.vue'),
      },
      {
        path: 'clients',
        component: () => import('pages/ClientsPage.vue'),
      },
      {
        path: 'revenue',
        component: () => import('pages/RevenuePage.vue'),
      },
      {
        path: 'nexus',
        component: () => import('pages/NexusPage.vue'),
      },
      {
        path: 'settings',
        component: () => import('pages/SettingsPage.vue'),
      },
    ],
    meta: { requiresAuth: true },
  },

  // Authentication
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/register',
    component: () => import('pages/RegisterPage.vue'),
  },
  {
    path: '/forgot-password',
    component: () => import('pages/ForgotPasswordPage.vue'),
  },
  {
    path: '/reset-password',
    component: () => import('pages/ResetPasswordPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
