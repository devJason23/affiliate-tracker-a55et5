import { NextResponse } from 'next/server'
import { dynamodb, Tables } from '@/lib/db/dynamodb'
import { getSession } from '@auth0/nextjs-auth0'

export async function GET(request: Request) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get affiliate ID
    const affiliate = await dynamodb.scan({
      TableName: Tables.AFFILIATES,
      FilterExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': session.user.sub
      }
    }).promise()

    if (!affiliate.Items?.[0]) {
      return NextResponse.json(
        { error: 'Affiliate not found' },
        { status: 404 }
      )
    }

    const affiliateId = affiliate.Items[0].id

    // Get referrals
    const referrals = await dynamodb.query({
      TableName: Tables.REFERRALS,
      IndexName: 'AffiliateIndex',
      KeyConditionExpression: 'affiliateId = :affiliateId',
      ExpressionAttributeValues: {
        ':affiliateId': affiliateId
      }
    }).promise()

    const totalReferrals = referrals.Items?.length || 0
    const conversions = referrals.Items?.filter(r => r.converted)?.length || 0

    return NextResponse.json({
      totalReferrals,
      activeCount: totalReferrals,
      conversionRate: totalReferrals > 0 ? conversions / totalReferrals : 0,
      conversions
    })
  } catch (error) {
    console.error('Error fetching referral stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch referral stats' },
      { status: 500 }
    )
  }
}
