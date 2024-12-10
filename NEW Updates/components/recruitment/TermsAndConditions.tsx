'use client'

export default function TermsAndConditions({ onAccept }: { onAccept: () => void }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Terms and Conditions</h2>
      
      <div className="prose prose-sm max-w-none mb-8">
        <p>By joining the A55ET5 affiliate program, you agree to these terms and conditions.</p>
        <p>Commission Structure:</p>
        <ul>
          <li>Direct Sales Commission: 10% on personal referrals</li>
          <li>Override Commission: 5% on team member sales</li>
        </ul>
        <p>Payments are made monthly for the previous month's qualified sales.</p>
      </div>

      <button
        onClick={onAccept}
        className="px-6 py-3 bg-[#00A3FF] text-white rounded-lg hover:bg-[#0082CC] 
          transition-colors duration-200"
      >
        I Accept the Terms & Conditions
      </button>
    </div>
  )
}
