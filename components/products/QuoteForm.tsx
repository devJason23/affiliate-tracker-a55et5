'use client'

import { useState } from 'react'
import { Product } from '@/lib/products/schema'

interface QuoteFormData {
  clientName: string
  clientEmail: string
  keywords: string[]
  location: string
  competition: string
  timeline: string
  additionalInfo: string
}

export default function QuoteForm({
  product,
  onSubmit,
  onCancel
}: {
  product: Product
  onSubmit: (data: QuoteFormData) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<QuoteFormData>({
    clientName: '',
    clientEmail: '',
    keywords: [''],
    location: '',
    competition: '',
    timeline: '',
    additionalInfo: ''
  })

  const addKeyword = () => {
    setFormData(prev => ({
      ...prev,
      keywords: [...prev.keywords, '']
    }))
  }

  const removeKeyword = (index: number) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index)
    }))
  }

  const updateKeyword = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.map((k, i) => i === index ? value : k)
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Request Quote for {product.name}</h2>
      
      <form onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
      }}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Client Name
              </label>
              <input
                type="text"
                required
                value={formData.clientName}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  clientName: e.target.value
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Client Email
              </label>
              <input
                type="email"
                required
                value={formData.clientEmail}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  clientEmail: e.target.value
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Keywords
            </label>
            {formData.keywords.map((keyword, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => updateKeyword(index, e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm"
                  placeholder="Enter keyword"
                />
                <button
                  type="button"
                  onClick={() => removeKeyword(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addKeyword}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              + Add Another Keyword
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Target Location/Market
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                location: e.target.value
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Competition Level
            </label>
            <select
              value={formData.competition}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                competition: e.target.value
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="">Select Level</option>
              <option value="low">Low Competition</option>
              <option value="medium">Medium Competition</option>
              <option value="high">High Competition</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Desired Timeline
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                timeline: e.target.value
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="">Select Timeline</option>
              <option value="urgent">ASAP (1-2 weeks)</option>
              <option value="normal">Normal (2-4 weeks)</option>
              <option value="relaxed">Flexible (4+ weeks)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Additional Information
            </label>
            <textarea
              value={formData.additionalInfo}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                additionalInfo: e.target.value
              }))}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Quote Request
          </button>
        </div>
      </form>
    </div>
  )
}
