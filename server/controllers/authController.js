import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import logger from '../config/logger.js'

const prisma = new PrismaClient()

export const register = async (req, res) => {
  const { email, password, name, role } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || 'PLAYER'
      }
    })
    logger.info(`[AUTH] New identity registered: ${user.email} (Role: ${user.role})`)
    res.status(201).json({ message: 'User created successfully', userId: user.id })
  } catch (error) {
    res.status(400).json({ error: 'User registration failed', details: error.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(404).json({ error: 'User not found' })

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(401).json({ error: 'Invalid password' })

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'cyber-secret-key',
      { expiresIn: '24h' }
    )

    logger.info(`[AUTH] User verified: ${user.email} (Assigned Role: ${user.role})`)

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message })
  }
}
