import { NextResponse } from 'next/server'
import { dynamodb, Tables } from '@/lib/db/dynamodb'
import { getSession } from '@auth0/nextjs-auth0'

export async function GET(request: Request) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get affiliate ID from user
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

    // Get commissions for affiliate
    const result = await dynamodb.query({
      TableName: Tables.COMMISSIONS,
      IndexName: 'AffiliateIndex',
      KeyConditionExpression: 'affiliateId = :affiliateId',
      ExpressionAttributeValues: {
        ':affiliateId': affiliate.Items[0].id
      }
    }).promise()

    return NextResponse.json(result.Items)
  } catch (error) {
    console.error('Error fetching commissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch commissions' },
      { status: 500 }
    )
  }
}
