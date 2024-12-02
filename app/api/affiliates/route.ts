import { NextResponse } from 'next/server'
import { dynamodb, Tables } from '@/lib/db/dynamodb'
import { affiliateSchema } from '@/lib/db/schema'
import { getSession } from '@auth0/nextjs-auth0'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const affiliateId = uuidv4()
    
    const affiliate = affiliateSchema.parse({
      id: affiliateId,
      userId: session.user.sub,
      uplineId: data.uplineId,
      status: 'pending',
      joinDate: Date.now(),
      referralCode: generateReferralCode(),
      commissionTier: 1,
      totalEarnings: 0,
      pendingCommissions: 0
    })

    await dynamodb.put({
      TableName: Tables.AFFILIATES,
      Item: affiliate
    }).promise()

    return NextResponse.json(affiliate)
  } catch (error) {
    console.error('Error creating affiliate:', error)
    return NextResponse.json(
      { error: 'Failed to create affiliate' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await dynamodb.scan({
      TableName: Tables.AFFILIATES,
      FilterExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': session.user.sub
      }
    }).promise()

    return NextResponse.json(result.Items)
  } catch (error) {
    console.error('Error fetching affiliates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch affiliates' },
      { status: 500 }
    )
  }
}

function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}
