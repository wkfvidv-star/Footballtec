import { io } from 'socket.io-client'
import { useNotificationStore } from '../store/notificationStore'
import { useAuthStore } from '../store/authStore'

class SocketService {
  constructor() {
    this.socket = null
    this.url = import.meta.env.VITE_API_URL || 'http://localhost:5000'
  }

  connect() {
    const auth = useAuthStore()
    if (!auth.token) return

    this.socket = io(this.url, {
      auth: {
        token: auth.token
      }
    })

    this.socket.on('connect', () => {
      console.log('[SOCKET] Connected to LivePulse Node')
      
      // Automatically join the club room if associated
      if (auth.user?.clubId) {
        this.socket.emit('join:club', auth.user.clubId)
      }
    })

    this.socket.on('alert:performance', (data) => {
      const notifications = useNotificationStore()
      notifications.addNotification({
        type: 'critical',
        title: 'تنقية الأداء الفوري',
        message: data.message,
        duration: 8000
      })
    })

    this.socket.on('biometrics:update', (data) => {
      // Logic to update global player store (to be implemented)
      console.log('[LIVE] Biometrics Update:', data)
    })

    this.socket.on('disconnect', () => {
      console.log('[SOCKET] Disconnected')
    })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data)
    }
  }
}

export const socketService = new SocketService()
