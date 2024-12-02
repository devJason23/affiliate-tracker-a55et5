'use client'

import { useState } from 'react'
import ApplicationForm from '@/components/recruitment/ApplicationForm'
import OnboardingSteps from '@/components/recruitment/OnboardingSteps'
import TermsAndConditions from '@/components/recruitment/TermsAndConditions'

export default function JoinPage() {
  const [step, setStep] = useState(1)
  const [applicationData, setApplicationData] = useState({})

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Join Our Affiliate Program
      </h1>

      <OnboardingSteps currentStep={step} />

      {step === 1 && (
        <ApplicationForm 
          onSubmit={(data) => {
            setApplicationData(data)
            setStep(2)
          }}
        />
      )}

      {step === 2 && (
        <TermsAndConditions
          onAccept={async () => {
            // Submit complete application
            const response = await fetch('/api/affiliates/apply', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(applicationData)
            })
            
            if (response.ok) {
              setStep(3)
            }
          }}
        />
      )}

      {step === 3 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-4">
            We'll review your application and get back to you within 24-48 hours.
          </p>
          <p className="text-gray-600">
            Check your email for next steps and additional information.
          </p>
        </div>
      )}
    </div>
  )
}
