import { NextResponse } from 'next/server'
import { dynamodb, Tables } from '@/lib/db/dynamodb'
import { getSession } from '@auth0/nextjs-auth0'
import { startOfDay, endOfDay, eachDayOfInterval } from 'date-fns'

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { startDate, endDate } = await request.json()
    const start = startOfDay(new Date(startDate))
    const end = endOfDay(new Date(endDate))

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

    // Fetch all relevant data
    const [commissions, referrals, teamMembers] = await Promise.all([
      fetchCommissions(affiliateId, start, end),
      fetchReferrals(affiliateId, start, end),
      fetchTeamMembers(affiliateId)
    ])

    // Calculate metrics
    const metrics = calculateMetrics(commissions, referrals)

    // Generate daily data
    const dailyData = generateDailyData(start, end, commissions, referrals)

    // Calculate team performance
    const teamPerformance = await calculateTeamPerformance(teamMembers, start, end)

    return NextResponse.json({
      metrics,
      revenue: dailyData.revenue,
      conversions: dailyData.conversions,
      team: teamPerformance
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

async function fetchCommissions(affiliateId: string, start: Date, end: Date) {
  const result = await dynamodb.query({
    TableName: Tables.COMMISSIONS,
    IndexName: 'AffiliateIndex',
    KeyConditionExpression: 'affiliateId = :affiliateId',
    FilterExpression: 'createdAt BETWEEN :start AND :end',
    ExpressionAttributeValues: {
      ':affiliateId': affiliateId,
      ':start': start.getTime(),
      ':end': end.getTime()
    }
  }).promise()

  return result.Items || []
}

async function fetchReferrals(affiliateId: string, start: Date, end: Date) {
  const result = await dynamodb.query({
    TableName: Tables.REFERRALS,
    IndexName: 'AffiliateIndex',
    KeyConditionExpression: 'affiliateId = :affiliateId',
    FilterExpression: 'timestamp BETWEEN :start AND :end',
    ExpressionAttributeValues: {
      ':affiliateId': affiliateId,
      ':start': start.getTime(),
      ':end': end.getTime()
    }
  }).promise()

  return result.Items || []
}

async function fetchTeamMembers(affiliateId: string) {
  const result = await dynamodb.scan({
    TableName: Tables.AFFILIATES,
    FilterExpression: 'uplineId = :affiliateId',
    ExpressionAttributeValues: {
      ':affiliateId': affiliateId
    }
  }).promise()

  return result.Items || []
}

function calculateMetrics(commissions: any[], referrals: any[]) {
  const totalRevenue = commissions.reduce((sum, c) => sum + c.amount, 0)
  const totalReferrals = referrals.length
  const conversions = referrals.filter(r => r.converted).length
  const conversionRate = totalReferrals > 0 ? (conversions / totalReferrals) * 100 : 0

  return [
    {
      label: 'Total Revenue',
      value: totalRevenue,
      change: 12.5, // Calculate actual change
      format: 'currency'
    },
    {
      label: 'Referrals',
      value: totalReferrals,
      change: 8.2, // Calculate actual change
      format: 'number'
    },
    {
      label: 'Conversions',
      value: conversions,
      change: 5.1, // Calculate actual change
      format: 'number'
    },
    {
      label: 'Conversion Rate',
      value: conversionRate,
      change: 2.3, // Calculate actual change
      format: 'percentage'
    }
  ]
}

function generateDailyData(start: Date, end: Date, commissions: any[], referrals: any[]) {
  const days = eachDayOfInterval({ start, end })
  
  return {
    revenue: days.map(date => {
      const dayStart = startOfDay(date).getTime()
      const dayEnd = endOfDay(date).getTime()
      
      const dailyCommissions = commissions.filter(
        c => c.createdAt >= dayStart && c.createdAt <= dayEnd
      )
      
      return {
        date: date.toISOString(),
        amount: dailyCommissions.reduce((sum, c) => sum + c.amount, 0)
      }
    }),
    
    conversions: days.map(date => {
      const dayStart = startOfDay(date).getTime()
      const dayEnd = endOfDay(date).getTime()
      
      const dailyReferrals = referrals.filter(
        r => r.timestamp >= dayStart && r.timestamp <= dayEnd
      )
      
      const total = dailyReferrals.length
      const converted = dailyReferrals.filter(r => r.converted).length
      
      return {
        date: date.toISOString(),
        rate: total > 0 ? (converted / total) * 100 : 0
      }
    })
  }
}

async function calculateTeamPerformance(teamMembers: any[], start: Date, end: Date) {
  const performance = await Promise.all(
    teamMembers.map(async (member) => {
      const [memberReferrals, memberCommissions] = await Promise.all([
        fetchReferrals(member.id, start, end),
        fetchCommissions(member.id, start, end)
      ])

      const referrals = memberReferrals.length
      const conversions = memberReferrals.filter(r => r.converted).length
      const revenue = memberCommissions.reduce((sum, c) => sum + c.amount, 0)

      return {
        id: member.id,
        name: member.name || 'Anonymous',
        referrals,
        conversions,
        revenue,
        conversionRate: referrals > 0 ? (conversions / referrals) * 100 : 0
      }
    })
  )

  return performance
}
