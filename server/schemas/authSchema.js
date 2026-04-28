import { z } from 'zod'

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email('بريد إلكتروني غير صالح'),
    password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
    name: z.string().min(2, 'الاسم مطلوب'),
    role: z.enum(['PLAYER', 'COACH', 'CLUB_ADMIN', 'SYSTEM_ADMIN']).optional()
  })
})

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('بريد إلكتروني غير صالح'),
    password: z.string().min(1, 'كلمة المرور مطلوبة')
  })
})
