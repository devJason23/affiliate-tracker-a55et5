'use client'

interface Product {
  id: string
  name: string
  type: 'one-time' | 'subscription' | 'quote'
  price: number
  description: string
  features: string[]
}

export default function ProductCard({ 
  product,
  onSelect
}: { 
  product: Product
  onSelect: (product: Product) => void 
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4">{product.description}</p>
      
      <div className="mb-4">
        {product.type === 'quote' ? (
          <span className="text-2xl font-bold">Custom Quote</span>
        ) : (
          <span className="text-2xl font-bold">
            ${product.price}{product.type === 'subscription' ? '/month' : ''}
          </span>
        )}
      </div>

      <ul className="mb-6">
        {product.features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(product)}
        className="w-full px-4 py-2 bg-[#00A3FF] text-white rounded-md hover:bg-[#0082CC]"
      >
        {product.type === 'quote' ? 'Request Quote' : 'Select Package'}
      </button>
    </div>
  )
}
