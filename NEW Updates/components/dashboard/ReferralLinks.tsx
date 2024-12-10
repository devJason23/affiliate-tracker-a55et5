'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function ReferralLinks() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'standard' | 'custom'>('standard')
  const [customUrl, setCustomUrl] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  const affiliateId = user?.sub // You might want to get this from your affiliate profile

  const links = {
    standard: `${baseUrl}/ref/${affiliateId}`,
    custom: customUrl ? `${baseUrl}/ref/${affiliateId}?c=${encodeURIComponent(customUrl)}` : ''
  }

  const copyToClipboard = async (type: 'standard' | 'custom') => {
    try {
      await navigator.clipboard.writeText(links[type])
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Your Referral Links</h2>
      
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab('standard')}
          className={`px-4 py-2 rounded ${
            activeTab === 'standard' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Standard Link
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`px-4 py-2 rounded ${
            activeTab === 'custom' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Custom Link
        </button>
      </div>

      {activeTab === 'standard' ? (
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={links.standard}
              readOnly
              className="flex-1 p-2 border rounded bg-gray-50"
            />
            <button
              onClick={() => copyToClipboard('standard')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {copied === 'standard' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Custom URL Parameter
            </label>
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="e.g., summer-promo"
              className="w-full p-2 border rounded"
            />
          </div>
          {customUrl && (
            <div className="flex gap-2">
              <input
                type="text"
                value={links.custom}
                readOnly
                className="flex-1 p-2 border rounded bg-gray-50"
              />
              <button
                onClick={() => copyToClipboard('custom')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {copied === 'custom' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
