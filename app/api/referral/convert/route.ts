import { NextResponse } from 'next/server'
import { dynamodb, Tables } from '@/lib/db/dynamodb'
import { commissionSchema } from '@/lib/db/schema'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  try {
    const { referralId, amount } = await request.json()

    // Get referral details
    const referral = await dynamodb.get({
      TableName: Tables.REFERRALS,
      Key: { id: referralId }
    }).promise()

    if (!referral.Item) {
      return NextResponse.json(
        { error: 'Referral not found' },
        { status: 404 }
      )
    }

    // Update referral as converted
    await dynamodb.update({
      TableName: Tables.REFERRALS,
      Key: { id: referralId },
      UpdateExpression: 'SET converted = :converted, conversionTimestamp = :timestamp',
      ExpressionAttributeValues: {
        ':converted': true,
        ':timestamp': Date.now()
      }
    }).promise()

    // Get affiliate details for upline commission
    const affiliate = await dynamodb.get({
      TableName: Tables.AFFILIATES,
      Key: { id: referral.Item.affiliateId }
    }).promise()

    // Create direct commission
    const directCommission = commissionSchema.parse({
      id: uuidv4(),
      affiliateId: referral.Item.affiliateId,
      referralId,
      amount: amount * 0.1, // 10% direct commission
      type: 'direct',
      status: 'pending',
      createdAt: Date.now()
    })

    await dynamodb.put({
      TableName: Tables.COMMISSIONS,
      Item: directCommission
    }).promise()

    // If there's an upline, create override commission
    if (affiliate.Item?.uplineId) {
      const overrideCommission = commissionSchema.parse({
        id: uuidv4(),
        affiliateId: affiliate.Item.uplineId,
        referralId,
        amount: amount * 0.05, // 5% override commission
        type: 'override',
        status: 'pending',
        createdAt: Date.now()
      })

      await dynamodb.put({
        TableName: Tables.COMMISSIONS,
        Item: overrideCommission
      }).promise()
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error converting referral:', error)
    return NextResponse.json(
      { error: 'Failed to convert referral' },
      { status: 500 }
    )
  }
}
