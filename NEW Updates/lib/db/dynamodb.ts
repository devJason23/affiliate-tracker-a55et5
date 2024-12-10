import { DynamoDB } from 'aws-sdk'

export const dynamodb = new DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

export const Tables = {
  AFFILIATES: 'Affiliates',
  REFERRALS: 'Referrals',
  COMMISSIONS: 'Commissions'
} as const
