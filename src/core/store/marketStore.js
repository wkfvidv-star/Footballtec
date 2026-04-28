import { defineStore } from 'pinia'

export const useMarketStore = defineStore('market', {
  state: () => ({
    prospects: [
      { id: 'm1', name: 'منذر', pos: 'وسط ميدان هجومي', age: 19, value: '$2.1M', growth: '+12.4%', match: 94 },
      { id: 'm2', name: 'محمد', pos: 'مدافع محوري', age: 17, value: '$1.4M', growth: '+8.1%', match: 88 },
      { id: 'm3', name: 'رفيق', pos: 'مهاجم', age: 18, value: '$1.8M', growth: '+5.4', match: 82 }
    ],
    marketAlerts: [
      { id: 1, text: 'تحرك مكثف لأندية منافسة نحو استهداف المواهب في مركز صانع الألعاب.', type: 'WARNING' }
    ]
  }),
  
  actions: {
    addProspect(p) {
      this.prospects.push({ ...p, id: Date.now().toString() })
    },
    reset() {
      console.log('[LOG] marketStore reset atomically.');
      this.marketAlerts = [];
      // Note: We might want to keep the base prospects list if it's static, 
      // but here we clear active alerts.
    }
  }
})
