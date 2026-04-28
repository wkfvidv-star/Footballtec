import { ref, computed } from 'vue'
import { useAuthStore } from '../../core/store/authStore'
import { useIotStore } from '../../core/store/iotStore'
import { useTrainingStore } from '../../core/store/trainingStore'

export function usePlayer() {
  const auth = useAuthStore()
  const iot = useIotStore()
  const training = useTrainingStore()

  const metrics = ref([
    { l: 'PHY', v: 88, c: 'cyan' },
    { l: 'SKL', v: 92, c: 'magenta' },
    { l: 'TAC', v: 85, c: 'gold' },
    { l: 'PSY', v: 78, c: 'cyan' }
  ])

  const sessionStatus = computed(() => {
    return iot.devices.some(d => d.status === 'ONLINE') ? 'STREAMING' : 'OFFLINE'
  })

  return {
    auth,
    iot,
    training,
    metrics,
    sessionStatus
  }
}
