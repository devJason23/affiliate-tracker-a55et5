'use client'

import { useState } from 'react'
import { format } from 'date-fns'

interface AffiliateNode {
  id: string
  firstName: string
  lastName: string
  email: string
  referralCode: string
  totalEarnings: number
  directReferrals: number
  teamSize: number
  joinDate: number
  status: 'active' | 'inactive' | 'pending'
  children: AffiliateNode[]
  metrics: {
    monthlyEarnings: number
    conversionRate: number
    activeReferrals: number
  }
}

export default function TeamTreeView({ 
  data, 
  onNodeClick 
}: { 
  data: AffiliateNode
  onNodeClick?: (affiliate: AffiliateNode) => void 
}) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set([data.id]))
  const [viewMode, setViewMode] = useState<'tree' | 'list'>('tree')
  const [searchTerm, setSearchTerm] = useState('')
  const [metricFilter, setMetricFilter] = useState<'earnings' | 'team' | 'conversion'>('earnings')

  const toggleNode = (id: string, event: React.MouseEvent) => {
    event.stopPropagation()
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedNodes(newExpanded)
  }

  const expandAll = () => {
    const allIds = getAllNodeIds(data)
    setExpandedNodes(new Set(allIds))
  }

  const collapseAll = () => {
    setExpandedNodes(new Set([data.id]))
  }

  const getAllNodeIds = (node: AffiliateNode): string[] => {
    let ids = [node.id]
    node.children?.forEach(child => {
      ids = [...ids, ...getAllNodeIds(child)]
    })
    return ids
  }

  const renderMetrics = (node: AffiliateNode) => (
    <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-gray-500">
      <div>
        <div className="font-medium">Monthly</div>
        ${node.metrics.monthlyEarnings.toFixed(2)}
      </div>
      <div>
        <div className="font-medium">Team Size</div>
        {node.teamSize}
      </div>
      <div>
        <div className="font-medium">Conv. Rate</div>
        {node.metrics.conversionRate.toFixed(1)}%
      </div>
    </div>
  )

  const renderNode = (node: AffiliateNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = expandedNodes.has(node.id)

    return (
      <div key={node.id} 
        className={`
          ml-6 first:ml-0 relative
          ${searchTerm && node.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ? 'bg-yellow-50' : ''}
        `}
      >
        <div 
          className={`
            flex items-center p-3 my-1 rounded-lg border
            ${onNodeClick ? 'cursor-pointer hover:bg-gray-50' : ''}
            ${node.status === 'inactive' ? 'opacity-60' : ''}
          `}
          style={{ marginLeft: viewMode === 'tree' ? `${level * 24}px` : '0' }}
          onClick={() => onNodeClick?.(node)}
        >
          {hasChildren && viewMode === 'tree' && (
            <button
              onClick={(e) => toggleNode(node.id, e)}
              className="mr-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              {isExpanded ? '−' : '+'}
            </button>
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">
                  {node.firstName} {node.lastName}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  ({node.referralCode})
                </span>
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  node.status === 'active' ? 'bg-green-100 text-green-800' :
                  node.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {node.status}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                ${node.totalEarnings.toFixed(2)}
              </span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {node.email} • Joined {format(node.joinDate, 'MMM d, yyyy')}
            </div>
            {renderMetrics(node)}
          </div>
        </div>
        {hasChildren && (viewMode === 'list' || isExpanded) && (
          <div className={viewMode === 'tree' ? 'border-l border-gray-200 ml-3' : ''}>
            {node.children.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Team Structure</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={expandAll}
              className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
            >
              Collapse All
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">View:</span>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as 'tree' | 'list')}
              className="text-sm border rounded-md"
            >
              <option value="tree">Tree View</option>
              <option value="list">List View</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={metricFilter}
              onChange={(e) => setMetricFilter(e.target.value as 'earnings' | 'team' | 'conversion')}
              className="text-sm border rounded-md"
            >
              <option value="earnings">Earnings</option>
              <option value="team">Team Size</option>
              <option value="conversion">Conversion Rate</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search affiliates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 text-sm border rounded-md px-3 py-1"
          />
        </div>
      </div>

      <div className="p-4 overflow-auto max-h-[600px]">
        {renderNode(data)}
      </div>
    </div>
  )
}
