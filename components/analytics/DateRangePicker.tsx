'use client'

import { useState } from 'react'
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns'

interface DateRange {
  start: Date
  end: Date
}

interface Props {
  onChange: (range: DateRange) => void
  currentRange: DateRange
}

export default function DateRangePicker({ onChange, currentRange }: Props) {
  const [isCustom, setIsCustom] = useState(false)

  const presetRanges = [
    { label: '7 Days', range: { start: subDays(new Date(), 7), end: new Date() } },
    { label: '30 Days', range: { start: subDays(new Date(), 30), end: new Date() } },
    { label: 'This Month', range: { 
      start: startOfMonth(new Date()), 
      end: endOfMonth(new Date()) 
    } }
  ]

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex space-x-2">
          {presetRanges.map(({ label, range }) => (
            <button
              key={label}
              onClick={() => {
                setIsCustom(false)
                onChange(range)
              }}
              className={`px-4 py-2 rounded-md transition-colors duration-200
                ${!isCustom && currentRange.start === range.start 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => setIsCustom(true)}
            className={`px-4 py-2 rounded-md transition-colors duration-200
              ${isCustom ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
          >
            Custom
          </button>
        </div>

        {isCustom && (
          <div className="flex items-center space-x-2">
            <input
              type="date"
              value={format(currentRange.start, 'yyyy-MM-dd')}
              onChange={(e) => onChange({
                ...currentRange,
                start: new Date(e.target.value)
              })}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={format(currentRange.end, 'yyyy-MM-dd')}
              onChange={(e) => onChange({
                ...currentRange,
                end: new Date(e.target.value)
              })}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  )
}
