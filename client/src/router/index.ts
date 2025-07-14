import { createRouter, createWebHistory } from 'vue-router'
import { jwtDecode } from 'jwt-decode'
import type { DecodedToken } from '../types/auth.ts'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/admin',
      name: 'adminDashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true, requiresRole: 'admin' }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token') // Or use Vuex/Pinia
  if (to.meta.requiresAuth && !token) {
    next('/login')
  }
  if (to.meta.requiresRole && token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token)
      
      if (decoded.role !== to.meta.requiresRole) {
        return next('/')
      }
    } catch (err) {
      return next('/login')
    }
  }

  next()
})

export default router
