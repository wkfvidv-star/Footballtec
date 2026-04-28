import logger from '../config/logger.js'

/**
 * RecommendationService v1.0.0
 * Deterministic Rule-Based Heuristic Engine for Tactical & Physical Advice.
 */
export class RecommendationService {
  /**
   * Generates localized recommendations based on biometric and performance thresholds
   * @param {Object} data - Processed metrics
   */
  static getRecommendations(data) {
    const recommendations = {
      PHYSICAL: [],
      TACTICAL: [],
      PSYCHOLOGICAL: []
    };

    // --- 1. Physical Domain Heuristics ---
    if (data.fatigueLevel === 'CRITICAL' || data.fatigueLevel === 'HIGH') {
      recommendations.PHYSICAL.push('تقليل حدة التدريب فوراً وزيادة فترات الراحة البينية.');
      this._logTrigger('PHYSICAL', 'HIGH_FATIGUE');
    }
    
    if (data.heartRate > 185) {
      recommendations.PHYSICAL.push('مراقبة نبضات القلب؛ تجاوز الحد الأماني المستهدف.');
    }

    // --- 2. Tactical Domain Heuristics ---
    if (data.spatialAwareness < 50) {
      recommendations.TACTICAL.push('التركيز على مسح الملعب (Scanning) قبل استلام الكرة.');
      this._logTrigger('TACTICAL', 'LOW_AWARENESS');
    }

    if (data.passIntensity < 40 && data.position === 'MIDFIELDER') {
      recommendations.TACTICAL.push('زيادة سرعة تدوير الكرة لكسر التكتل الدفاعي.');
    }

    // --- 3. Psychological Domain Heuristics ---
    if (data.mentalFocus < 60) {
      recommendations.PSYCHOLOGICAL.push('تدريبات التركيز اللحظي لتقليل الأخطاء في الثلث الأخير.');
      this._logTrigger('PSYCHOLOGICAL', 'LOW_FOCUS');
    }

    return recommendations;
  }

  static _logTrigger(domain, ruleId) {
    logger.info(`[HEURISTIC-ENGINE] Rule Triggered: Domain=${domain}, Rule=${ruleId}`);
  }
}
