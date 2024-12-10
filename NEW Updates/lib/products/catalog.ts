export const PRODUCTS = [
  {
    id: 'website-single',
    name: 'Single Website Package',
    type: 'one-time',
    price: 2500,
    description: 'Professional website design and development for your business',
    features: ['Custom Design', 'Mobile Responsive', 'SEO Optimized'],
    commissionRate: 0.10,
    overrideRate: 0.05,
    category: 'website',
    status: 'active'
  },
  {
    id: 'sbo-local',
    name: 'Local Search Box Optimization',
    type: 'subscription',
    price: 750,
    description: 'Monthly local search optimization service',
    features: ['Local Keyword Optimization', 'Monthly Reporting', 'Competitor Analysis'],
    commissionRate: 0.15,
    overrideRate: 0.07,
    category: 'sbo',
    status: 'active'
  },
  {
    id: 'sbo-national',
    name: 'Nationwide Search Box Optimization',
    type: 'quote',
    price: 0,
    description: 'Custom nationwide search optimization strategy',
    features: ['Custom Keyword Strategy', 'National SEO Campaign', 'Comprehensive Reporting'],
    commissionRate: 0.12,
    overrideRate: 0.06,
    category: 'sbo',
    status: 'active'
  }
]

export const PACKAGES = [
  {
    id: 'website-bundle-5',
    name: '5 Website Package',
    products: [{ id: 'website-single', quantity: 5 }],
    originalPrice: 12500,
    packagePrice: 10000,
    savings: 2500,
    commissionRate: 0.12,
    overrideRate: 0.06
  }
]
