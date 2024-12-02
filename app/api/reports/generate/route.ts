import { NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0'
import { format } from 'date-fns'

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { type, startDate, endDate, data } = await request.json()

    let csvContent = ''
    const dateRange = `${format(new Date(startDate), 'MMM d, yyyy')} - ${format(new Date(endDate), 'MMM d, yyyy')}`

    switch (type) {
      case 'revenue':
        csvContent = generateRevenueReport(data.revenue, dateRange)
        break
      case 'conversions':
        csvContent = generateConversionReport(data.conversions, dateRange)
        break
      case 'team':
        csvContent = generateTeamReport(data.team, dateRange)
        break
      case 'full':
        csvContent = generateFullReport(data, dateRange)
        break
      default:
        throw new Error('Invalid report type')
    }

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename=affiliate-report-${format(new Date(), 'yyyy-MM-dd')}.csv`
      }
    })
  } catch (error) {
    console.error('Error generating report:', error)
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    )
  }
}

function generateRevenueReport(revenue: any[], dateRange: string): string {
  let csv = `Revenue Report - ${dateRange}\n\n`
  csv += 'Date,Revenue\n'
  revenue.forEach(({ date, amount }) => {
    csv += `${format(new Date(date), 'MMM d, yyyy')},$${amount.toFixed(2)}\n`
  })
  return csv
}

function generateConversionReport(conversions: any[], dateRange: string): string {
  let csv = `Conversion Report - ${dateRange}\n\n`
  csv += 'Date,Conversion Rate (%)\n'
  conversions.forEach(({ date, rate }) => {
    csv += `${format(new Date(date), 'MMM d, yyyy')},${rate.toFixed(1)}%\n`
  })
  return csv
}

function generateTeamReport(team: any[], dateRange: string): string {
  let csv = `Team Performance Report - ${dateRange}\n\n`
  csv += 'Member,Referrals,Conversions,Revenue,Conversion Rate (%)\n'
  team.forEach(({ name, referrals, conversions, revenue, conversionRate }) => {
    csv += `${name},${referrals},${conversions},$${revenue.toFixed(2)},${conversionRate.toFixed(1)}%\n`
  })
  return csv
}

function generateFullReport(data: any, dateRange: string): string {
  let csv = `Complete Affiliate Report - ${dateRange}\n\n`
  
  // Summary Metrics
  csv += 'Summary Metrics\n'
  csv += 'Metric,Value,Change\n'
  data.metrics.forEach(({ label, value, change, format }: any) => {
    const formattedValue = format === 'currency' 
      ? `$${value.toFixed(2)}` 
      : format === 'percentage' 
        ? `${value.toFixed(1)}%` 
        : value
    csv += `${label},${formattedValue},${change}%\n`
  })
  
  csv += '\nDaily Revenue\n'
  csv += generateRevenueReport(data.revenue, dateRange)
  
  csv += '\nDaily Conversions\n'
  csv += generateConversionReport(data.conversions, dateRange)
  
  csv += '\nTeam Performance\n'
  csv += generateTeamReport(data.team, dateRange)
  
  return csv
}
