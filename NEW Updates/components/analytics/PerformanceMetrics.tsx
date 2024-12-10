'use client'

import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'

interface Metric {
  label: string
  value: number
  change: number
  format: string
}

export default function PerformanceMetrics({ data }: { data: Metric[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((metric, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">{metric.label}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {metric.format === 'currency' && '$'}
              {metric.format === 'percentage' 
                ? `${metric.value.toFixed(1)}%`
                : metric.value.toLocaleString()}
            </p>
            <span className={`ml-2 flex items-center text-sm ${
              metric.change > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.change > 0 ? (
                <ArrowUpIcon className="h-4 w-4" />
              ) : (
                <ArrowDownIcon className="h-4 w-4" />
              )}
              {Math.abs(metric.change)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
