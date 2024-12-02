import ReferralLinkBox from '@/components/dashboard/ReferralLinkBox'

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <ReferralLinkBox />
      </div>
      
      {/* Other dashboard components */}
    </div>
  )
}
   <h1 className="text-2xl font-bold mb-8">Affiliate Dashboard</h1>
      
      <div className="space-y-8">
        <AffiliateStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ReferralLinks />
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Tips</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Share your referral link on social media
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Use custom links for different campaigns
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Track your conversions regularly
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Build your team for override commissions
              </li>
            </ul>
          </div>
        </div>
        
        <CommissionTable />
      </div>
    </div>
  )
}
