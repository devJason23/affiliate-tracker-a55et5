'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface Stats {
  totalEarnings: number
  pendingCommissions: number
  activeReferrals: number
  conversionRate: number
  teamSize: number
}

export default function AffiliateStats() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [commissions, referrals, team] = await Promise.all([
          fetch('/api/commissions').then(res => res.json()),
          fetch('/api/referral/stats').then(res => res.json()),
          fetch('/api/affiliates/team').then(res => res.json())
        ])

        setStats({
          totalEarnings: commissions.reduce((acc: number, c: any) => 
            c.status === 'paid' ? acc + c.amount : acc, 0),
          pendingCommissions: commissions.reduce((acc: number, c: any) => 
            c.status === 'pending' ? acc + c.amount : acc, 0),
          activeReferrals: referrals.activeCount,
          conversionRate: referrals.conversionRate,
          teamSize: team.length
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchStats()
    }
  }, [user])

  if (loading) return <div>Loading stats...</div>
  if (!stats) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <StatCard
        title="Total Earnings"
        value={`$${stats.totalEarnings.toFixed(2)}`}
        icon="💰"
      />
      <StatCard
        title="Pending Commissions"
        value={`$${stats.pendingCommissions.toFixed(2)}`}
        icon="⏳"
      />
      <StatCard
        title="Active Referrals"
        value={stats.activeReferrals.toString()}
        icon="👥"
      />
      <StatCard
        title="Conversion Rate"
        value={`${(stats.conversionRate * 100).toFixed(1)}%`}
        icon="📈"
      />
      <StatCard
        title="Team Size"
        value={stats.teamSize.toString()}
        icon="🤝"
      />
    </div>
  )
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}
