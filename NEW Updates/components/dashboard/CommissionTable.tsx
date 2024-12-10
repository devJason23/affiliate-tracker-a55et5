'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'

interface Commission {
  id: string
  amount: number
  type: 'direct' | 'override'
  status: 'pending' | 'paid' | 'cancelled'
  createdAt: number
  paidAt?: number
  referralId: string
}

export default function CommissionTable() {
  const [commissions, setCommissions] = useState<Commission[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid'>('all')

  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const response = await fetch('/api/commissions')
        const data = await response.json()
        setCommissions(data)
      } catch (error) {
        console.error('Error fetching commissions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCommissions()
  }, [])

  const filteredCommissions = commissions.filter(commission => {
    if (filter === 'all') return true
    if (filter === 'pending') return commission.status === 'pending'
    if (filter === 'paid') return commission.status === 'paid'
    return true
  })

  if (loading) return <div>Loading commissions...</div>

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Commissions</h2>
        <div className="mt-2 flex space-x-2">
          {(['all', 'pending', 'paid'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCommissions.map((commission) => (
              <tr key={commission.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(commission.createdAt, 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`capitalize ${
                    commission.type === 'override' ? 'text-purple-600' : 'text-blue-600'
                  }`}>
                    {commission.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${commission.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    commission.status === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : commission.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {commission.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
