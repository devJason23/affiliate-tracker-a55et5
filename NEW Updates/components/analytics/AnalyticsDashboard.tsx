'use client'

import { useState, useEffect } from 'react'
import RevenueChart from './RevenueChart'
import ConversionChart from './ConversionChart'
import PerformanceMetrics from './PerformanceMetrics'
import TeamPerformance from './TeamPerformance'
import { addDays, startOfMonth, endOfMonth } from 'date-fns'

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date())
  })
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            startDate: dateRange.start.toISOString(),
            endDate: dateRange.end.toISOString()
          })
        })
        const analyticsData = await response.json()
        setData(analyticsData)
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [dateRange])

  const timeRanges = [
    { label: '7 Days', days: 7 },
    { label: '30 Days', days: 30 },
    { label: '90 Days', days: 90 }
  ]

  if (loading) return <div>Loading analytics...</div>
  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex space-x-4">
          {timeRanges.map(({ label, days }) => (
            <button
              key={label}
              onClick={() => setDateRange({
                start: addDays(new Date(), -days),
                end: new Date()
              })}
              className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 
                transition-colors duration-200"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <PerformanceMetrics data={data.metrics} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <RevenueChart data={data.revenue} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Conversion Rates</h3>
          <ConversionChart data={data.conversions} />
        </div>
      </div>

      {/* Team Performance */}
      <TeamPerformance data={data.team} />
    </div>
  )
}
