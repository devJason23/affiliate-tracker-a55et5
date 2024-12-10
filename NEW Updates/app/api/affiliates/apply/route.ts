import { NextResponse } from 'next/server'
import { dynamodb, Tables } from '@/lib/db/dynamodb'
import { v4 as uuidv4 } from 'uuid'
import { sendEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const affiliateId = uuidv4()

    // Check if referral code is valid
    let uplineId = null
    if (data.referralCode) {
      const upline = await dynamodb.scan({
        TableName: Tables.AFFILIATES,
        FilterExpression: 'referralCode = :code',
        ExpressionAttributeValues: {
          ':code': data.referralCode
        }
      }).promise()

      if (upline.Items?.[0]) {
        uplineId = upline.Items[0].id
      }
    }

    // Create affiliate record
    const affiliate = {
      id: affiliateId,
      status: 'pending',
      ...data,
      uplineId,
      createdAt: Date.now(),
      referralCode: generateReferralCode(),
      commissionTier: 1,
      totalEarnings: 0,
      pendingCommissions: 0
    }

    await dynamodb.put({
      TableName: Tables.AFFILIATES,
      Item: affiliate
    }).promise()

    // Send confirmation email
    await sendEmail({
      to: data.email,
      subject: 'Application Received - Affiliate Program',
      template: 'affiliate-application',
      data: {
        firstName: data.firstName,
        applicationId: affiliateId
      }
    })

    // Notify admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL!,
      subject: 'New Affiliate Application',
      template: 'admin-notification',
      data: {
        applicant: `${data.firstName} ${data.lastName}`,
        applicationId: affiliateId
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully'
    })
  } catch (error) {
    console.error('Error submitting application:', error)
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}

function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}
