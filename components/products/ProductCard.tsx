'use client'

import { Product } from '@/lib/products/schema'

export default function ProductCard({ 
  product,
  onSelect
}: { 
  product: Product
  onSelect: (product: Product) => void
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        <div className="mb-4">
          {product.type === 'quote' ? (
            <span className="text-2xl font-bold">Custom Quote</span>
          ) : (
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">
                ${product.price.toLocaleString()}
              </span>
              {product.type === 'subscription' && (
                <span className="text-gray-500 ml-1">/month</span>
              )}
            </div>
          )}
        </div>

        <ul className="space-y-2 mb-6">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        <button
          onClick={() => onSelect(product)}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
            transition-colors duration-200"
        >
          {product.type === 'quote' ? 'Request Quote' : 'Select Package'}
        </button>
      </div>
    </div>
  )
}
