import { prisma } from '../server.js'
import logger from '../config/logger.js'

/**
 * Global Audit Logging Middleware
 * Automatically tracks CUD (Create, Update, Delete) mutations
 */
export const auditInterceptor = async (req, res, next) => {
  const originalSend = res.send;

  res.send = function (data) {
    // Only track mutations (POST, PUT, DELETE, PATCH)
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const userId = req.user?.id || 'SYSTEM'
        const entity = req.originalUrl.split('/')[3] // e.g., /api/v1/PLAYERS

        // Fire and forget audit log to not block response
        prisma.auditLog.create({
          data: {
            action: req.method,
            entity: entity || 'UNKNOWN',
            entityId: JSON.parse(data).id || 'N/A',
            userId: userId
          }
        }).catch(err => logger.error(`[AUDIT-ERROR] ${err.message}`))
      }
    }
    
    return originalSend.apply(res, arguments)
  }

  next()
}
