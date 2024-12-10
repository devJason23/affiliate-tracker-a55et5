'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function AffiliateLink() {
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)
  
  const affiliateId = user?.sub // or however you store affiliate IDs
  const referralLink = `${process.env.NEXT_PUBLIC_SITE_URL}/ref/${affiliateId}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Your Referral Link</h3>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="flex-1 p-2 border rounded bg-gray-50"
        />
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
