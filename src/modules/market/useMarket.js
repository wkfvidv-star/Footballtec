import { ref, computed } from 'vue'
import { useMarketStore } from '../../core/store/marketStore'

export function useMarket() {
  const market = useMarketStore()

  const activeProspects = computed(() => market.prospects)
  const criticalAlerts = computed(() => market.marketAlerts.filter(a => a.type === 'WARNING'))

  return {
    market,
    activeProspects,
    criticalAlerts
  }
}
