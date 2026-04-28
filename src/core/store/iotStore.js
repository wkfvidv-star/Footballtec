import { defineStore } from 'pinia'
import { IOT_MODES } from '../contracts/iotContract'

export const useIotStore = defineStore('iot', {
  state: () => ({
    mode: 'MOCK', // 'MOCK' | 'REAL'
    devices: [
      { id: 'gps-01', type: 'GPS', label: 'الصدرية الذكية', status: 'ONLINE', battery: 88, lastSync: new Date() },
      { id: 'watch-05', type: 'WATCH', label: 'الساعة الذكية', status: 'ONLINE', battery: 65, lastSync: new Date() },
      { id: 'vest-09', type: 'BIOMETRIC', label: 'حساسات القياس', status: 'OFFLINE', battery: 0, lastSync: null }
    ]
  }),
  
  actions: {
    setMode(newMode) {
      if (this.mode !== newMode) {
        console.warn(`[IOT-SYNC] Mode change detected: ${this.mode} -> ${newMode}. Sanitizing session...`);
        this.sanitizeSession();
      }
      this.mode = newMode
    },
    sanitizeSession() {
      // Clear data to prevent bleeding between modes
      this.devices.forEach(d => {
        d.status = 'OFFLINE';
        d.lastSync = null;
      });
      // In Real mode, we would trigger discovery. In Mock, we reset to defaults.
    },
    updateDeviceStatus(id, status) {
      const device = this.devices.find(d => d.id === id)
      if (device) device.status = status
    },
    reset() {
      console.log('[LOG] iotStore reset atomically.');
      this.mode = 'MOCK';
      this.devices.forEach(d => {
        d.status = 'OFFLINE';
        d.lastSync = null;
      });
    }
  }
})
