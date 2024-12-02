'use client'

import { ProductPackage } from '@/lib/products/schema'

export default function PackageCard({ 
  package: pkg,
  onSelect
}: { 
  package: ProductPackage
  onSelect: (pkg: ProductPackage) => void
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-blue-500">
      <div className="bg-blue-500 text-white py-2 px-4">
        <span className="text-sm font-medium">Best Value</span>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
        
        <div className="mb-4">
          <div className="flex items-baseline mb-1">
            <span className="text-3xl font-bold">
              ${pkg.packagePrice.toLocaleString()}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            <span className="line-through">
              ${pkg.originalPrice.toLocaleString()}
            </span>
            <span className="text-green-600 ml-2">
              Save ${pkg.savings.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-2">Includes:</h4>
          <ul className="space-y-2">
            {pkg.products.map((product, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {product.quantity}x {product.name}
              </li>
            ))}
            <li className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Bonus: 1 Free Website
            </li>
          </ul>
        </div>

        <button
          onClick={() => onSelect(pkg)}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
            transition-colors duration-200"
        >
          Select Package
        </button>
      </div>
    </div>
  )
}
