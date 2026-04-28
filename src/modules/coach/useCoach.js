import { ref, computed } from 'vue'
import { useAuthStore } from '../../core/store/authStore'
import { useIotStore } from '../../core/store/iotStore'

export function useCoach() {
  const auth = useAuthStore()
  const iot = useIotStore()

  const squadStats = ref({
    activePlayers: 24,
    averageLoad: 72,
    injuryRisk: 'LOW'
  })

  const canManageAcademy = computed(() => {
    return auth.user?.role === 'COACH'
  })

  return {
    auth,
    iot,
    squadStats,
    canManageAcademy
  }
}
