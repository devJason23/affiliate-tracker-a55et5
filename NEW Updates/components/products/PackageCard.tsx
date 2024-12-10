'use client'

interface Package {
  id: string
  name: string
  originalPrice: number
  packagePrice: number
  savings: number
}

export default function PackageCard({ 
  package: pkg,
  onSelect
}: { 
  package: Package
  onSelect: (pkg: Package) => void 
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-[#00A3FF]">
      <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
      
      <div className="mb-4">
        <span className="text-3xl font-bold">${pkg.packagePrice}</span>
        <span className="text-sm text-gray-500 line-through ml-2">
          ${pkg.originalPrice}
        </span>
        <span className="text-sm text-green-600 ml-2">
          Save ${pkg.savings}
        </span>
      </div>

      <button
        onClick={() => onSelect(pkg)}
        className="w-full px-4 py-2 bg-[#00A3FF] text-white rounded-md hover:bg-[#0082CC]"
      >
        Select Package
      </button>
    </div>
  )
}
