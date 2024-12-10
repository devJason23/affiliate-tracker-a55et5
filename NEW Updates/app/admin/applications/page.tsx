'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'

interface Application {
  id: string
  firstName: string
  lastName: string
  email: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: number
  experience: string
  uplineId?: string
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/admin/applications')
      const data = await response.json()
      setApplications(data)
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await fetch(`/api/admin/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      fetchApplications()
    } catch (error) {
      console.error('Error updating application:', error)
    }
  }

  if (loading) return <div>Loading applications...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-8">Affiliate Applications</h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {applications.map((application) => (
            <li key={application.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900">
                      {application.firstName} {application.lastName}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {application.email}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {application.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateStatus(application.id, 'approved')}
                          className="px-4 py-2 bg-green-600 text-white rounded-md 
                            hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(application.id, 'rejected')}
                          className="px-4 py-2 bg-red-600 text-white rounded-md 
                            hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {application.status !== 'pending' && (
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                        application.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {application.status.charAt(0).toUpperCase() + 
                          application.status.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      Experience: {application.experience}
                    </p>
                    {application.uplineId && (
                      <p className="mt-2 flex items-center text-sm text-gray-500 
                        sm:mt-0 sm:ml-6">
                        Referred by: {application.uplineId}
                      </p>
                    )}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Applied on{' '}
                      {format(application.createdAt, 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
