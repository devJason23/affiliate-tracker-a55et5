'use client'

import { useState, useEffect } from 'react'
// Change from @/ imports to relative paths
import AffiliateTable from '../../../components/admin/AffiliateTable'
import ReassignModal from '../../../components/admin/ReassignModal'
import TeamTreeView from '../../../components/admin/TeamTreeView'

export default function AffiliateManagementPage() {
  const [affiliates, setAffiliates] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedAffiliate, setSelectedAffiliate] = useState(null)
  const [showReassignModal, setShowReassignModal] = useState(false)
  const [teamTree, setTeamTree] = useState(null)

  useEffect(() => {
    fetchAffiliates()
    fetchTeamTree()
  }, [])

  const fetchAffiliates = async () => {
    try {
      const response = await fetch('/api/admin/affiliates')
      const data = await response.json()
      setAffiliates(data)
    } finally {
      setLoading(false)
    }
  }

  const fetchTeamTree = async () => {
    try {
      const response = await fetch('/api/admin/affiliates/tree')
      const data = await response.json()
      setTeamTree(data)
    } catch (error) {
      console.error('Error fetching team tree:', error)
    }
  }

  const handleReassign = async (affiliateId: string, newUplineId: string) => {
    try {
      const response = await fetch('/api/admin/affiliates/reassign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          affiliateId,
          newUplineId
        })
      })

      if (response.ok) {
        await Promise.all([
          fetchAffiliates(),
          fetchTeamTree()
        ])
        setShowReassignModal(false)
        setSelectedAffiliate(null)
      }
    } catch (error) {
      console.error('Error reassigning affiliate:', error)
    }
  }

  if (loading) return <div>Loading affiliates...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <h1 className="text-2xl font-bold">Affiliate Management</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <AffiliateTable
            affiliates={affiliates}
            onReassign={(affiliate) => {
              setSelectedAffiliate(affiliate)
              setShowReassignModal(true)
            }}
          />
        </div>
        
        <div>
          {teamTree && (
            <TeamTreeView
              data={teamTree}
              onNodeClick={(affiliate) => {
                setSelectedAffiliate(affiliate)
                setShowReassignModal(true)
              }}
            />
          )}
        </div>
      </div>

      {showReassignModal && (
        <ReassignModal
          affiliate={selectedAffiliate}
          onClose={() => {
            setShowReassignModal(false)
            setSelectedAffiliate(null)
          }}
          onReassign={handleReassign}
          availableUplines={affiliates}
        />
      )}
    </div>
  )
}
