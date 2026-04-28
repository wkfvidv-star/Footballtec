import api from './api'

/**
 * RecommendationEngine Service
 * Consumes the stateless backend recommendation engine via standard contracts.
 * 100% UI-Agnostic.
 */
export const RecommendationEngine = {
  async getTacticalAdvice(squadData) {
    try {
      const response = await api.post('/recommendations/tactical', squadData)
      return response.data
    } catch (err) {
      console.warn('[RECO-ENGINE] Fallback enabled due to connectivity issues.')
      return [
        'تحسين التمركز الدفاعي في المواقف الثابتة.',
        'زيادة الضغط العالي في الثلث الأوسط.'
      ]
    }
  },

  async getPlayerDrills(playerId) {
    const response = await api.get(`/recommendations/players/${playerId}/drills`)
    return response.data
  }
}
