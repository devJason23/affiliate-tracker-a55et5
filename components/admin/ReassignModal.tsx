'use client'

import { useState, useEffect } from 'react'

interface Affiliate {
  id: string
  firstName: string
  lastName: string
  uplineId: string | null
}

export default function ReassignModal({
  affiliate,
  onClose,
  onReassign,
  availableUplines
}: {
  affiliate: Affiliate | null
  onClose: () => void
  onReassign: (affiliateId: string, newUplineId: string) => void
  availableUplines: Affiliate[]
}) {
  const [selectedUplineId, setSelectedUplineId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUplines = availableUplines.filter(upline => 
    upline.id !== affiliate?.id && // Can't assign to self
    !isDownline(upline.id, affiliate?.id, availableUplines) && // Can't assign to downline
    (
      upline.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      upline.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  if (!affiliate) return null

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium mb-4">
          Reassign Upline for {affiliate.firstName} {affiliate.lastName}
        </h3>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search uplines..."
            className="w-full rounded-md border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="max-h-60 overflow-y-auto mb-4">
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="upline"
                value=""
                checked={selectedUplineId === ''}
                onChange={() => setSelectedUplineId('')}
                className="mr-2"
              />
              <span>No Upline</span>
            </label>
            {filteredUplines.map(upline => (
              <label key={upline.id} className="flex items-center">
                <input
                  type="radio"
                  name="upline"
                  value={upline.id}
                  checked={selectedUplineId === upline.id}
                  onChange={() => setSelectedUplineId(upline.id)}
                  className="mr-2"
                />
                <span>{upline.firstName} {upline.lastName}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onReassign(affiliate.id, selectedUplineId)
              onClose()
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Confirm Reassignment
          </button>
        </div>
      </div>
    </div>
  )
}

// Helper function to check if a potential upline is actually a downline
function isDownline(
  potentialUplineId: string, 
  affiliateId: string | null | undefined, 
  affiliates: Affiliate[]
): boolean {
  if (!affiliateId) return false
  
  const checkDownline = (currentId: string): boolean => {
    const downlines = affiliates.filter(a => a.uplineId === currentId)
    return downlines.some(downline => 
      downline.id === potentialUplineId || checkDownline(downline.id)
    )
  }

  return checkDownline(affiliateId)
}
