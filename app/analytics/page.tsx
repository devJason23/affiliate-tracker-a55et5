import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard'
import DateRangePicker from '@/components/analytics/DateRangePicker'
import ReportExport from '@/components/analytics/ReportExport'

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      </div>
      <AnalyticsDashboard />
    </div>
  )
}
