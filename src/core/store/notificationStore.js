import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    notifications: []
  }),
  
  actions: {
    addNotification(notification) {
      const id = Math.random().toString(36).substr(2, 9)
      const newNotif = {
        id,
        type: 'info', // 'info', 'success', 'warning', 'error', 'critical'
        title: '',
        message: '',
        timestamp: new Date(),
        duration: 5000,
        ...notification
      }
      
      this.notifications.unshift(newNotif)
      
      if (newNotif.duration > 0) {
        setTimeout(() => {
          this.removeNotification(id)
        }, newNotif.duration)
      }
    },
    
    removeNotification(id) {
      this.notifications = this.notifications.filter(n => n.id !== id)
    }
  }
})
