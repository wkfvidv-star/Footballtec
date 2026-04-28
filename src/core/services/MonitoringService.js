/**
 * MonitoringService v1.0.0
 * Centralized Hub for Errors, Performance, and User Actions.
 * Ready for Sentry/Datadog integration.
 */
export const MonitoringService = {
  logs: [],

  /**
   * Logs a user action with role context
   */
  logAction(action, context = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      type: 'ACTION',
      action,
      ...context
    }
    this.logs.push(entry)
    console.log(`[MONITOR][ACTION] ${action}`, context)
    // In production, send to server/Sentry
  },

  /**
   * Standardized Error Tracking
   */
  logError(error, info = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      type: 'ERROR',
      message: error.message || error,
      stack: error.stack,
      info
    }
    this.logs.push(entry)
    console.error(`[MONITOR][ERROR] ${entry.message}`, info)
    // Send to external monitoring node
  },

  /**
   * Performance Metric Capture
   */
  trackMetric(name, value) {
    console.log(`[MONITOR][PERF] ${name}: ${value}ms`)
  },

  /**
   * Retrieves log history for debugging
   */
  getHistory() {
    return this.logs
  }
}
