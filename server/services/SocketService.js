import logger from '../config/logger.js'

/**
 * Socket.io Service - LivePulse Node
 * Manages tenant-isolated real-time communication
 */
export class SocketService {
  constructor(io) {
    this.io = io
  }

  initialize() {
    this.io.on('connection', (socket) => {
      logger.info(`Session Initialized: ${socket.id}`)

      // Join a tenant-specific room (Club ID)
      socket.on('join:club', (clubId) => {
        socket.join(`club_${clubId}`)
        logger.info(`Socket ${socket.id} joined room: club_${clubId}`)
      })

      // Handle live biometrics ingestion from Mobile Gateway
      socket.on('biometrics:stream', (data) => {
        const { clubId, userId, hr, sprints, speed } = data
        
        // Broadcast to everyone in the club room (Coaches/Admin)
        this.io.to(`club_${clubId}`).emit('biometrics:update', {
          userId,
          hr,
          sprints,
          speed,
          timestamp: new Date()
        })
      })

      socket.on('disconnect', () => {
        logger.info(`Session Terminated: ${socket.id}`)
      })
    })
  }

  /**
   * Broadcast a performance alert to a specific club
   */
  emitAlert(clubId, alertData) {
    this.io.to(`club_${clubId}`).emit('alert:performance', {
      ...alertData,
      id: Math.random().toString(36).substr(2, 9),
      ts: new Date()
    })
  }
}
