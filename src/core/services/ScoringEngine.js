import api from './api'

/**
 * ScoringEngine Service
 * Consumes the stateless backend scoring engine.
 * Decouples performance logic from individual module data stores.
 */
export const ScoringEngine = {
  async calculateSquadHealth(players) {
    const response = await api.post('/scoring/squad-health', { players })
    return response.data
  },

  async getPlayerScore(playerId, sessionData) {
    const response = await api.post(`/scoring/players/${playerId}`, sessionData)
    return response.data
  }
}
