import { NextResponse } from 'next/server'
import { dynamodb, Tables } from '@/lib/db/dynamodb'
import { getSession } from '@auth0/nextjs-auth0'
import { recalculateCommissions } from '@/lib/commission'

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { affiliateId, newUplineId } = await request.json()

    // Get the affiliate's current data
    const affiliate = await dynamodb.get({
      TableName: Tables.AFFILIATES,
      Key: { id: affiliateId }
    }).promise()

    if (!affiliate.Item) {
      return NextResponse.json(
        { error: 'Affiliate not found' },
        { status: 404 }
      )
    }

    // If new upline specified, verify it exists
    if (newUplineId) {
      const upline = await dynamodb.get({
        TableName: Tables.AFFILIATES,
        Key: { id: newUplineId }
      }).promise()

      if (!upline.Item) {
        return NextResponse.json(
          { error: 'New upline not found' },
          { status: 404 }
        )
      }

      // Check for circular reference
      let currentUpline = upline.Item
      while (currentUpline.uplineId) {
        if (currentUpline.uplineId === affiliateId) {
          return NextResponse.json(
            { error: 'Invalid reassignment: Would create circular reference' },
            { status: 400 }
          )
        }
        const nextUpline = await dynamodb.get({
          TableName: Tables.AFFILIATES,
          Key: { id: currentUpline.uplineId }
        }).promise()
        if (!nextUpline.Item) break
        currentUpline = nextUpline.Item
      }
    }

    // Update the affiliate's upline
    await dynamodb.update({
      TableName: Tables.AFFILIATES,
      Key: { id: affiliateId },
      UpdateExpression: 'SET uplineId = :uplineId',
      ExpressionAttributeValues: {
        ':uplineId': newUplineId || null
      }
    }).promise()

    // Recalculate commissions for the affected teams
    // Start from beginning of current month to keep it manageable
    const startDate = new Date()
    startDate.setDate(1)
    startDate.setHours(0, 0, 0, 0)

    // Recalculate for both old and new upline teams
    if (affiliate.Item.uplineId) {
      await recalculateCommissions(affiliate.Item.uplineId, startDate, dynamodb)
    }
    if (newUplineId) {
      await recalculateCommissions(newUplineId, startDate, dynamodb)
    }

    return NextResponse.json({ 
      success: true,
      message: 'Affiliate reassigned and commissions recalculated successfully'
    })
  } catch (error) {
    console.error('Error reassigning affiliate:', error)
    return NextResponse.json(
      { error: 'Failed to reassign affiliate' },
      { status: 500 }
    )
  }
}
