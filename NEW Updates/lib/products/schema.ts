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
  products: { id: string; quantity: number }[]
  originalPrice: number
  packagePrice: number
  savings: number
  commissionRate: number
  overrideRate: number
}
