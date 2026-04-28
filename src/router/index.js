import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../core/store/authStore'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'PortalGateway',
        component: () => import('../views/Dashboard.vue')
      },
      {
        path: 'coach',
        name: 'CoachDashboard',
        component: () => import('../modules/coach/CoachModule.vue'),
        meta: { role: 'COACH' }
      },
      {
        path: 'player',
        component: () => import('../modules/player/PlayerModule.vue'),
        meta: { role: 'PLAYER' },
        children: [
          { path: '', redirect: '/dashboard/player/physical' },
          { path: 'physical', name: 'PlayerPhysical', component: () => import('../modules/player/views/PhysicalView.vue') },
          { path: 'skill', name: 'PlayerSkill', component: () => import('../modules/player/views/SkillView.vue') },
          { path: 'tactical', name: 'PlayerTactical', component: () => import('../modules/player/views/TacticalView.vue') },
          { path: 'psychological', name: 'PlayerPsychological', component: () => import('../modules/player/views/PsychologicalView.vue') },
          { path: 'video', name: 'PlayerVideo', component: () => import('../modules/player/views/VideoView.vue') },
          { path: 'nutrition', name: 'PlayerNutrition', component: () => import('../modules/player/views/NutritionView.vue') }
        ]
      },
      {
        path: 'club',
        name: 'ClubDashboard',
        component: () => import('../views/ClubDashboard.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/Settings.vue')
      },
      {
        path: 'video',
        name: 'VideoAnalysis',
        component: () => import('../modules/coach/VideoModule.vue')
      },
      {
        path: 'academy',
        name: 'AcademyManagement',
        component: () => import('../modules/coach/AcademyModule.vue'),
        meta: { role: 'COACH' }
      },
      {
        path: 'market',
        name: 'TalentMarket',
        component: () => import('../modules/market/MarketModule.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// RBAC Navigation Guard - Single Source of Truth
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const isAuthenticated = auth.isAuthenticated
  const userRole = auth.role

  // 1. Check Authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  // 2. Prevent logged-in users from accessing Login/Register
  if (['Login', 'Register'].includes(to.name) && isAuthenticated) {
    return next('/dashboard')
  }

  // 3. Role-Based Access Control
  if (to.meta.role && to.meta.role !== userRole) {
    console.warn(`[RBAC] Access denied to ${to.path} for role: ${userRole}`)
    // Redirect to the correct base dashboard if role doesn't match
    return next('/dashboard')
  }

  next()
})

export default router
