import { NextResponse } from 'next/server'
import { dynamodb, Tables } from '@/lib/db/dynamodb'
import { referralSchema } from '@/lib/db/schema'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  try {
    const { affiliateId, source, landingPage } = await request.json()
    
    const referral = referralSchema.parse({
      id: uuidv4(),
      affiliateId,
      visitorId: uuidv4(),
      timestamp: Date.now(),
      converted: false,
      landingPage,
      source,
      userAgent: request.headers.get('user-agent'),
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
    })

    await dynamodb.put({
      TableName: Tables.REFERRALS,
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
:', error)
    return NextResponse.json(
      { error: 'Failed to track referral' },
      { status: 500 }
    )
  }
}
