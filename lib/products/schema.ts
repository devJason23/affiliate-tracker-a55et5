export interface Product {
  id: string
  name: string
  type: 'one-time' | 'subscription' | 'quote'
  price: number
  description: string
  features: string[]
  commissionRate: number
  overrideRate: number
  category: 'website' | 'sbo'
  status: 'active' | 'inactive'
}

export interface ProductPackage {
  id: string
  name: string
  products: Product[]
  originalPrice: number
  packagePrice: number
  savings: number
  commissionRate: number
  overrideRate: number
}

export interface Quote {
  id: string
  clientName: string
  clientEmail: string
  productId: string
  requirements: {
    keywords: string[]
    location: string
    competition: string
    timeline: string
  }
  status: 'pending' | 'sent' | 'accepted' | 'declined'
  amount?: number
  createdAt: number
  affiliateId: string
}
