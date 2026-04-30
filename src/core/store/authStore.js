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
        let errorMsg = 'فشل التسجيل.';
        if (err.response && err.response.data) {
          const data = err.response.data;
          const mainErr = typeof data.error === 'object' ? JSON.stringify(data.error) : (data.error || '');
          const detail = typeof data.details === 'object' ? JSON.stringify(data.details) : (data.details || '');
          errorMsg = mainErr + (detail ? ` (${detail})` : '');
        } else if (err.message) {
          errorMsg = err.message;
        }
        this.error = errorMsg;
        return false
      } finally {
        this.loading = false
      }
    },

    async login(email, password) {
      this.loading = true
      this.error = null
      try {
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
        let errorMsg = 'فشل تسجيل الدخول.';
        if (err.response && err.response.data) {
          const data = err.response.data;
          const mainErr = typeof data.error === 'object' ? JSON.stringify(data.error) : (data.error || '');
          const detail = typeof data.details === 'object' ? JSON.stringify(data.details) : (data.details || '');
          errorMsg = mainErr + (detail ? ` (${detail})` : '');
        } else if (err.message) {
          errorMsg = err.message;
        }
        this.error = errorMsg;
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
