'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'

interface CommissionRecord {
  id: string
  affiliateId: string
  amount: number
  type: 'direct' | 'override'
  status: 'pending' | 'paid' | 'cancelled'
  createdAt: number
  paidAt?: number
  transactionId: string
  originalAmount?: number
  adjustmentReason?: string
  tier: number
}

export default function CommissionHistory({
  affiliateId
}: {
  affiliateId: string
}) {
  const [history, setHistory] = useState<CommissionRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    dateRange: '30'
  })

  useEffect(() => {
    fetchHistory()
  }, [affiliateId, filters])

  const fetchHistory = async () => {
    try {
      const response = await fetch(`/api/commissions/history?${new URLSearchParams({
        affiliateId,
        type: filters.type,
        status: filters.status,
        days: filters.dateRange
      })}`)
      const data = await response.json()
      setHistory(data)
    } catch (error) {
      console.error('Error fetching commission history:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateAdjustment = (record: CommissionRecord) => {
    if (!record.originalAmount) return 0
    return record.amount - record.originalAmount
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium mb-4">Commission History</h3>
        
        <div className="flex space-x-4 mb-4">
          <select
            value={filters.type}
            onChange={(e) => setFilters(f => ({ ...f, type: e.target.value }))}
            className="rounded-md border-gray-300"
          >
            <option value="all">All Types</option>
            <option value="direct">Direct</option>
            <option value="override">Override</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters(f => ({ ...f, status: e.target.value }))}
            className="rounded-md border-gray-300"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={filters.dateRange}
            onChange={(e) => setFilters(f => ({ ...f, dateRange: e.target.value }))}
            className="rounded-md border-gray-300"
          >
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="180">Last 180 Days</option>
            <option value="365">Last Year</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Adjustment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {history.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(record.createdAt, 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    record.type === 'direct'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {record.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${record.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    record.status === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : record.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {record.originalAmount && (
                    <span className={`${
                      calculateAdjustment(record) >= 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {calculateAdjustment(record) >= 0 ? '+' : ''}
                      ${calculateAdjustment(record).toFixed(2)}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.adjustmentReason || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
