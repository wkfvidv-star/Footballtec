import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { PrismaClient } from '@prisma/client'

// Config & Utils
import logger from './config/logger.js'
import { initSentry, sentryErrorHandler } from './config/sentry.js'

// Routes
import authRoutes from './routes/v1/authRoutes.js'
import { auditInterceptor } from './middleware/auditMiddleware.js'

dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
})

const prisma = new PrismaClient()

// 1. Sentry Initialization (First)
initSentry(app)

// 2. Production Security Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// 3. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
})
app.use('/api/', limiter)

// 4. Request Logging & Auditing
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`)
  next()
})
app.use(auditInterceptor)

// 5. API Routes (Versioned)
app.use('/api/v1/auth', authRoutes)

// 6. Basic Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Nexus Node Active', v: '1.0.0', ts: new Date() })
})

// 7. Sentry Error Handler (After all controllers)
sentryErrorHandler(app)

// 8. Socket.io Logic (LivePulse Node)
import { SocketService } from './services/SocketService.js'
const socketService = new SocketService(io)
socketService.initialize()

// 9. Global Error Handler
app.use((err, req, res, next) => {
  logger.error(err.stack)
  res.status(500).json({ error: 'System Error: Node instability detected' })
})

const PORT = process.env.PORT || 5000
httpServer.listen(PORT, () => {
  logger.info(`[FOOTBALL-TEC-SaaS] System active on port ${PORT} // API v1`)
})

export { prisma, io }
