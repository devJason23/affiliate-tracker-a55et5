'use client'

import { useState } from 'react'

interface TeamMember {
  id: string
  name: string
  referrals: number
  conversions: number
  revenue: number
  conversionRate: number
}

export default function TeamPerformance({ data }: { data: TeamMember[] }) {
  const [sortConfig, setSortConfig] = useState({
    key: 'revenue',
    direction: 'desc'
  })

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1
    }
    return 0
  })

  const requestSort = (key: string) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    })
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Team Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                {[
                  { key: 'referrals', label: 'Referrals' },
                  { key: 'conversions', label: 'Conversions' },
                  { key: 'revenue', label: 'Revenue' },
                  { key: 'conversionRate', label: 'Conv. Rate' }
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 
                      uppercase tracking-wider cursor-pointer hover:text-gray-700"
                    onClick={() => requestSort(key)}
                  >
                    {label}
                    {sortConfig.key === key && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedData.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.referrals}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.conversions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${member.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.conversionRate.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
