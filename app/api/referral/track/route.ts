import { NextResponse } from 'next/server'
import { dynamodb, Tables } from '@/lib/db/dynamodb'
import { v4 as uuidv4 } from 'uuid'
import type { Referral } from '@/lib/db/schema'

export async function POST(request: Request) {
  try {
    const { affiliateId, source, landingPage } = await request.json()
    
    const referral: Referral = {
      id: uuidv4(),
      affiliateId,
      visitorId: uuidv4(), // In production, use a more persistent visitor ID
      timestamp: Date.now(),
      converted: false,
      landingPage,
      source,
      userAgent: request.headers.get('user-agent') || undefined
    }

    await dynamodb.put({
      TableName: 'Referrals',
      Item: referral
    }).promise()

    return NextResponse.json({ success: true, referralId: referral.id })
  } catch (error) {
    console.error('Error tracking referral:', error)
    return NextResponse.json(
      { error: 'Failed to track referral' },
      { status: 500 }
    )
  }
}
