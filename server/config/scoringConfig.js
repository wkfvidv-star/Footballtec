/**
 * NexusCore Scoring Configuration v1.0.0
 * Defines weights for the 4-Quadrant Analysis model.
 */

export const QUADRANT_WEIGHTS = {
  PHYSICAL: 40,
  SKILL: 30,
  TACTICAL: 20,
  PSYCHOLOGICAL: 10
}

/**
 * Position-Based Normalization Factors
 * Adapts scoring based on tactical role expectations.
 */
export const POSITION_FACTORS = {
  STRIKER: {
    PHY: { topSpeed: 1.2, stamina: 0.8 },
    SKL: { shotAccuracy: 1.5, dribbling: 1.2, passing: 0.7 },
    TAC: { positioning: 1.3, awareness: 0.9 }
  },
  MIDFIELDER: {
    PHY: { topSpeed: 0.8, stamina: 1.5 },
    SKL: { shotAccuracy: 0.8, dribbling: 1.0, passing: 1.5 },
    TAC: { positioning: 1.0, awareness: 1.5 }
  },
  DEFENDER: {
    PHY: { topSpeed: 1.0, stamina: 1.2 },
    SKL: { shotAccuracy: 0.3, dribbling: 0.5, passing: 1.0 },
    TAC: { positioning: 1.5, awareness: 1.2, interceptions: 1.8 }
  }
}

/**
 * Metric Definitions & Thresholds
 */
export const METRIC_LIMITS = {
  topSpeed: 40, // km/h
  stamina: 100,
  distance: 15, // km
  passing: 100,
  shots: 100,
  dribbling: 100,
  awareness: 100,
  positioning: 100,
  focus: 100,
  stress: 100
}
