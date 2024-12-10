'use client'

import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'  // Update the import path

export default function ReferralLinkBox() {
  const [copied, setCopied] = useState(false)
  const { user } = useAuth()
  
  const referralLink = user ? `${process.env.NEXT_PUBLIC_SITE_URL}/join/${user.referralCode}` : ''

  const copyToClipboard = async () => {
    if (!referralLink) return
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!user) return null  // Don't render anything if user is not authenticated

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#00A3FF]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#1E1E1E]">Your Referral Link</h2>
        <img 
          src="https://i.ibb.co/CtDkWFF/A55-ET5-LOGO-Donkey.webp"
          alt="A55ET5 Mascot" 
          className="h-12 w-12"
        />
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-600"
        />
        <button
          onClick={copyToClipboard}
          className="px-6 py-3 bg-[#00A3FF] text-white rounded-lg hover:bg-[#0082CC] 
            transition-colors duration-200 flex items-center gap-2"
        >
          {copied ? (
            <>
              <CheckIcon className="h-5 w-5" />
              Copied!
            </>
          ) : (
            <>
              <CopyIcon className="h-5 w-5" />
              Copy
            </>
          )}
        </button>
      </div>
      
      <p className="mt-3 text-sm text-gray-500">
        Share this link with potential affiliates to earn override commissions
      </p>
    </div>
  )
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
      />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M5 13l4 4L19 7" 
      />
    </svg>
  )
}
