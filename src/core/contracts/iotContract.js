/**
 * IoT Device Status Contract v1.0.0
 * Standardizes the schema for physical/mock device monitoring.
 */
export const IOT_DEVICE_SCHEMA = {
  id: 'string',
  type: 'GPS | WATCH | BIOMETRIC',
  label: 'string (localized)',
  status: 'ONLINE | OFFLINE | SYNCING',
  battery: 'number (0-100)',
  lastSync: 'Date | null'
}

export const IOT_MODES = {
  MOCK: 'MOCK',
  REAL: 'REAL'
}
