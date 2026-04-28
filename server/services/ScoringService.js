import { QUADRANT_WEIGHTS, POSITION_FACTORS, METRIC_LIMITS } from '../config/scoringConfig.js'
import logger from '../config/logger.js'

/**
 * NexusCore Intelligence Engine v2.1
 * Implements 4-Quadrant analysis with position-based normalization.
 */
export class ScoringService {
  /**
   * Calculates Normalized Overall Score
   * @param {Object} metrics - Raw data
   * @param {string} position - 'STRIKER' | 'MIDFIELDER' | 'DEFENDER'
   */
  static calculateOverallScore(metrics, position = 'STRIKER') {
    const factors = POSITION_FACTORS[position] || POSITION_FACTORS.STRIKER;

    // 1. Physical Quadrant
    const phys = this._calculateSection([
      { val: metrics.topSpeed || 0, weight: 15 * (factors.PHY?.topSpeed || 1), max: METRIC_LIMITS.topSpeed },
      { val: metrics.stamina || 0, weight: 15 * (factors.PHY?.stamina || 1), max: METRIC_LIMITS.stamina },
      { val: metrics.distance || 0, weight: 10, max: METRIC_LIMITS.distance }
    ], QUADRANT_WEIGHTS.PHYSICAL);

    // 2. Skill Quadrant
    const skill = this._calculateSection([
      { val: metrics.passing || 0, weight: 15 * (factors.SKL?.passing || 1), max: METRIC_LIMITS.passing },
      { val: metrics.shots || 0, weight: 10 * (factors.SKL?.shotAccuracy || 1), max: METRIC_LIMITS.shots },
      { val: metrics.dribbling || 0, weight: 5 * (factors.SKL?.dribbling || 1), max: METRIC_LIMITS.dribbling }
    ], QUADRANT_WEIGHTS.SKILL);

    // 3. Tactical Quadrant
    const tact = this._calculateSection([
      { val: metrics.awareness || 0, weight: 10 * (factors.TAC?.awareness || 1), max: METRIC_LIMITS.awareness },
      { val: metrics.positioning || 0, weight: 10 * (factors.TAC?.positioning || 1), max: METRIC_LIMITS.positioning }
    ], QUADRANT_WEIGHTS.TACTICAL);

    // 4. Psychological Quadrant
    const psych = this._calculateSection([
      { val: metrics.focus || 0, weight: 5, max: METRIC_LIMITS.focus },
      { val: metrics.stress || 0, weight: 5, max: METRIC_LIMITS.stress }
    ], QUADRANT_WEIGHTS.PSYCHOLOGICAL);

    const total = Math.round(phys + skill + tact + psych);
    
    logger.info(`[NEXUS-CORE] Score generated for ${position}: ${total} (PHY:${Math.round(phys)} SKL:${Math.round(skill)} TAC:${Math.round(tact)} PSY:${Math.round(psych)})`);
    
    return total;
  }

  /**
   * Predicts Injury Risk based on Rule-Based Heuristics
   */
  static calculateInjuryRisk(fatigueLevel, history = []) {
    let risk = 5; 
    
    if (fatigueLevel === 'CRITICAL') risk += 45;
    if (fatigueLevel === 'HIGH') risk += 25;
    if (fatigueLevel === 'FATIGUE_RISK') risk += 15;

    if (history.length > 3) {
      const recentAvg = history.slice(-3).reduce((a, b) => a + b, 0) / 3;
      if (recentAvg > 90) risk += 10;
    }

    return Math.min(risk, 100);
  }

  static getFatigueLevel(heartRate, durationAbove180, sprints) {
    if (heartRate > 190) return 'CRITICAL';
    if (heartRate > 180 && durationAbove180 > 180) return 'HIGH';
    if (sprints > 30) return 'FATIGUE_RISK';
    return 'LOW';
  }

  // --- Helpers ---

  static _calculateSection(metrics, sectionMax) {
    let weightedSum = 0;
    let totalPossibleWeight = 0;
    
    metrics.forEach(m => {
      const normalized = Math.min((m.val / m.max) * 100, 100);
      weightedSum += normalized * m.weight;
      totalPossibleWeight += m.weight;
    });

    if (totalPossibleWeight === 0) return 0;
    return (weightedSum / totalPossibleWeight) * (sectionMax / 100);
  }
}
