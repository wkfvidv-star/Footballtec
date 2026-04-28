import { defineStore } from 'pinia'
import api from '../services/api'
import { useIotStore } from './iotStore'
import { useTrainingStore } from './trainingStore'
import { useMarketStore } from './marketStore'
import { MonitoringService } from '../services/MonitoringService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
    role: (state) => state.user?.role || 'PLAYER'
  },
  
  actions: {
    async register(name, email, password, role) {
      this.loading = true
      this.error = null
      try {
        await api.post('/auth/register', { name, email, password, role })
        return true
      } catch (err) {
        this.error = err.response?.data?.error || 'فشل التسجيل. يرجى المحاولة لاحقاً.'
        return false
      } finally {
        this.loading = false
      }
    },

    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        // Selective clear to prevent stale session data from interfering
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        const response = await api.post('/auth/login', { email, password })
        this.token = response.data.token
        this.user = response.data.user
        
        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user))
        
        MonitoringService.logAction('USER_LOGIN_SUCCESS', { role: this.user.role, userId: this.user.id })
        return true
      } catch (err) {
        this.error = err.response?.data?.error || 'فشل تسجيل الدخول. يرجى التحقق من بياناتك.'
        return false
      } finally {
        this.loading = false
      }
    },
    
    logout() {
      MonitoringService.logAction('USER_LOGOUT_INITIATED', { userId: this.user?.id })
      this.resetAllStores()
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    resetAllStores() {
      console.log('[LOG] Global State Reset initiated.');
      const iot = useIotStore()
      const training = useTrainingStore()
      const market = useMarketStore()

      iot.reset()
      training.reset()
      market.reset()
    }
  }
})
