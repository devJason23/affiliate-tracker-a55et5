import { z } from 'zod'

// Validation schemas
export const affiliateSchema = z.object({
  id: z.string(),
  userId: z.string(),
  uplineId: z.string().optional(),
  status: z.enum(['active', 'inactive', 'pending']),
  joinDate: z.number(),
  referralCode: z.string(),
  commissionTier: z.number(),
  totalEarnings: z.number(),
  pendingCommissions: z.number(),
  paymentInfo: z.object({
    paypalEmail: z.string().email().optional(),
    bankInfo: z.object({
      accountName: z.string().optional(),
      accountNumber: z.string().optional(),
      routingNumber: z.string().optional()
    }).optional()
  }).optional()
})

export const referralSchema = z.object({
  id: z.string(),
  affiliateId: z.string(),
  visitorId: z.string(),
  timestamp: z.number(),
  converted: z.boolean(),
  conversionTimestamp: z.number().optional(),
  source: z.string().optional(),
  landingPage: z.string(),
  userAgent: z.string().optional(),
  ipAddress: z.string().optional()
})

export const commissionSchema = z.object({
  id: z.string(),
  affiliateId: z.string(),
  referralId: z.string(),
  amount: z.number(),
  type: z.enum(['direct', 'override']),
  status: z.enum(['pending', 'paid', 'cancelled']),
  createdAt: z.number(),
  paidAt: z.number().optional(),
  transactionId: z.string().optional()
})

// TypeScript types
export type Affiliate = z.infer<typeof affiliateSchema>
export type Referral = z.infer<typeof referralSchema>
export type Commission = z.infer<typeof commissionSchema>
