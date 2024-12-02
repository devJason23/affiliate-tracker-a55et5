'use client'

import { useState } from 'react'
import { PRODUCTS, PACKAGES } from '@/lib/products/catalog'
import ProductCard from '@/components/products/ProductCard'
import PackageCard from '@/components/products/PackageCard'
import QuoteForm from '@/components/products/QuoteForm'

export default function ProductsPage() {
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleProductSelect = (product) => {
    if (product.type === 'quote') {
      setSelectedProduct(product)
      setShowQuoteForm(true)
    } else {
      // Handle regular product selection
      window.location.href = `/checkout?product=${product.id}`
    }
  }

  const handlePackageSelect = (pkg) => {
    window.location.href = `/checkout?package=${pkg.id}`
  }

  const handleQuoteSubmit = async (data) => {
    try {
      const response = await fetch('/api/quotes/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          productId: selectedProduct.id
        })
      })

      if (response.ok) {
        setShowQuoteForm(false)
        setSelectedProduct(null)
        // Show success message
      }
    } catch (error) {
      console.error('Error submitting quote:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {showQuoteForm ? (
        <QuoteForm
          product={selectedProduct}
          onSubmit={handleQuoteSubmit}
          onCancel={() => {
            setShowQuoteForm(false)
            setSelectedProduct(null)
          }}
        />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-8">Our Products & Services</h1>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Featured Package</h2>
            <div className="max-w-3xl mx-auto">
              {PACKAGES.map(pkg => (
                <PackageCard
                  key={pkg.id}
                  package={pkg}
                  onSelect={handlePackageSelect}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Individual Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={handleProductSelect}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
