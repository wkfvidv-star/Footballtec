/**
 * Training & Workload Data Contract v1.0.0
 * Standardizes the schema for protocols, weekly plans, and load management.
 */
export const PROTOCOL_SCHEMA = {
  id: 'string (UUID)',
  title: 'string (localized)',
  duration: 'string (e.g., 45m)',
  type: 'TACTICAL | PHYSICAL | PSYCHOLOGICAL',
  load: 'number (0-100)',
  completed: 'boolean'
}

export const WORKLOAD_THRESHOLDS = {
  OPTIMAL: 85,
  WARNING: 90,
  CRITICAL: 95
}

export const DAY_STATUS = {
  COMPLETED: 'COMPLETED',
  ACTIVE: 'ACTIVE',
  REST: 'REST'
}
