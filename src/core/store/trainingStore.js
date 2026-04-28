import { defineStore } from 'pinia'

export const useTrainingStore = defineStore('training', {
  state: () => ({
    protocols: [
      { id: 'p1', title: 'تحسين الرؤية الميدانية', duration: '45m', type: 'TACTICAL', load: 75, completed: false },
      { id: 'p2', title: 'الاستشفاء العضلي النشط', duration: '30m', type: 'PHYSICAL', load: 40, completed: true },
      { id: 'p3', title: 'تمارين التركيز اللحظي', duration: '15m', type: 'PSYCHOLOGICAL', load: 20, completed: false }
    ],
    weeklyPlan: [
      { day: 'الاثنين', protocolId: 'p1', status: 'COMPLETED' },
      { day: 'الثلاثاء', protocolId: 'p2', status: 'ACTIVE' },
      { day: 'الأربعاء', protocolId: null, status: 'REST' }
    ]
  }),

  actions: {
    addProtocol(protocol) {
      this.protocols.push({ ...protocol, id: Date.now().toString() })
    },
    updateProtocol(id, updates) {
      const index = this.protocols.findIndex(p => p.id === id)
      if (index !== -1) this.protocols[index] = { ...this.protocols[index], ...updates }
    },
    deleteProtocol(id) {
      this.protocols = this.protocols.filter(p => p.id !== id)
    },
    assignDay(day, protocolId) {
       const index = this.weeklyPlan.findIndex(d => d.day === day)
       if (index !== -1) this.weeklyPlan[index].protocolId = protocolId
    },
    reset() {
      console.log('[LOG] trainingStore reset atomically.');
      // Keep static protocols if needed, but clear session progress
      this.weeklyPlan.forEach(day => {
        day.protocolId = null;
        day.status = 'REST';
      });
    }
  }
})
