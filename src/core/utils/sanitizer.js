/**
 * Input / Output Sanitizer Utility
 * Prevents malicious payload processing and ensures data integrity.
 * Crucial for V13 Production Hardening.
 */
export const Sanitizer = {
  /**
   * Cleans a string to prevent basic XSS or malformed inputs.
   */
  cleanString(str) {
    if (typeof str !== 'string') return ''
    return str.replace(/<[^>]*>?/gm, '').trim()
  },

  /**
   * Validates metric values against contract thresholds.
   */
  validateMetric(val, min = 0, max = 100) {
    const num = Number(val)
    if (isNaN(num)) return min
    return Math.max(min, Math.min(max, num))
  },

  /**
   * Deeply sanitizes a player object before it enters the modules.
   */
  sanitizePlayer(player) {
    return {
      id: this.cleanString(player.id),
      name: this.cleanString(player.name),
      pos: this.cleanString(player.pos || player.position),
      match: this.validateMetric(player.match || player.efficiency)
    }
  }
}
