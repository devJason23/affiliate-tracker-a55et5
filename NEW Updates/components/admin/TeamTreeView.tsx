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
  children: AffiliateNode[]
}

export default function TeamTreeView({ 
  data, 
  onNodeClick 
}: { 
  data: AffiliateNode
  onNodeClick?: (affiliate: AffiliateNode) => void 
}) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set([data.id]))

  const toggleNode = (id: string) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedNodes(newExpanded)
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-medium mb-4">Team Structure</h3>
      <div className="space-y-2">
        {renderNode(data)}
      </div>
    </div>
  )

  function renderNode(node: AffiliateNode, level: number = 0) {
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = expandedNodes.has(node.id)

    return (
      <div key={node.id} style={{ marginLeft: `${level * 20}px` }}>
        <div className="flex items-center p-2 hover:bg-gray-50 rounded">
          {hasChildren && (
            <button
              onClick={() => toggleNode(node.id)}
              className="w-6 h-6 flex items-center justify-center mr-2"
            >
              {isExpanded ? '−' : '+'}
            </button>
          )}
          <div 
            className="flex-1 cursor-pointer"
            onClick={() => onNodeClick?.(node)}
          >
            <div className="flex justify-between">
              <span>{node.firstName} {node.lastName}</span>
              <span>${node.totalEarnings.toFixed(2)}</span>
            </div>
            <div className="text-sm text-gray-500">{node.email}</div>
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div className="ml-4">
            {node.children.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }
}
