import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node"

export const initSentry = (app) => {
  if (!process.env.SENTRY_DSN) {
    console.warn("[SENTRY] No DSN provided. Skipping initialization.")
    return
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      nodeProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, 
    profilesSampleRate: 1.0,
  })
}

export const sentryErrorHandler = (app) => {
  // In Sentry v8+, use setupExpressErrorHandler
  // Note: This must be called after all controllers but before any custom error handlers
  // If the user has a very new SDK, this is the preferred way
  if (typeof Sentry.setupExpressErrorHandler === 'function') {
    Sentry.setupExpressErrorHandler(app)
  }
}
