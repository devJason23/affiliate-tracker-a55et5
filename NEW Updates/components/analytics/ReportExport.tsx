'use client'

import { useState } from 'react'
import { format } from 'date-fns'

type ReportType = 'revenue' | 'conversions' | 'team' | 'full'

export default function ReportExport({ data, dateRange }: { 
  data: any, 
  dateRange: { start: Date; end: Date } 
}) {
  const [generating, setGenerating] = useState(false)
  const [reportType, setReportType] = useState<ReportType>('full')

  const generateReport = async () => {
    setGenerating(true)
    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: reportType,
          startDate: dateRange.start,
          endDate: dateRange.end,
          data
        })
      })

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `affiliate-report-${format(new Date(), 'yyyy-MM-dd')}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-medium">Export Report</h3>
          <p className="text-sm text-gray-500">
            Download detailed reports for your records
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value as ReportType)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="full">Full Report</option>
            <option value="revenue">Revenue Only</option>
            <option value="conversions">Conversions Only</option>
            <option value="team">Team Performance</option>
          </select>
          <button
            onClick={generateReport}
            disabled={generating}
            className="inline-flex items-center px-4 py-2 border border-transparent 
              rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 
              hover:bg-blue-700 focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {generating ? 'Generating...' : 'Export'}
          </button>
        </div>
      </div>
    </div>
  )
}
