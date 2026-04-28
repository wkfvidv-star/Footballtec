import axios from 'axios'
import { MonitoringService } from './MonitoringService'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request Interceptor: Add Token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor: Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config
    
    // Handle Token Expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      MonitoringService.logError('Token Expired', { url: originalRequest.url })
      originalRequest._retry = true
      // Mock Refresh logic: in real app, call /auth/refresh here
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    // Handle Role Forbidden
    if (error.response?.status === 403) {
      MonitoringService.logError('Role Violation: Access Denied', { url: originalRequest.url })
      // Graceful redirect to gateway to prevent lockouts
      window.location.href = '/dashboard'
    }

    return Promise.reject(error)
  }
)

export default api
