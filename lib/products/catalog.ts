import { Product, ProductPackage } from './schema'

export const PRODUCTS: Product[] = [
  {
    id: 'website-single',
    name: 'Single Website Package',
    type: 'one-time',
    price: 2500,
    description: 'Professional website design and development for your business',
    features: [
      'Custom Design',
      'Mobile Responsive',
      'SEO Optimized',
      'Contact Forms',
      'Social Media Integration',
      'Analytics Setup'
    ],
    commissionRate: 0.10, // 10% direct commission
    overrideRate: 0.05,   // 5% override commission
    category: 'website',
    status: 'active'
  },
  {
    id: 'sbo-local',
    name: 'Local Search Box Optimization',
    type: 'subscription',
    price: 750,
    description: 'Monthly local search optimization service',
    features: [
      'Local Keyword Optimization',
      'Monthly Reporting',
      'Competitor Analysis',
      'Google Business Profile Optimization',
      'Local Citation Building'
    ],
    commissionRate: 0.15, // 15% direct commission on monthly
    overrideRate: 0.07,   // 7% override commission
    category: 'sbo',
    status: 'active'
  },
  {
    id: 'sbo-national',
    name: 'Nationwide Search Box Optimization',
    type: 'quote',
    price: 0, // Quote-based pricing
    description: 'Custom nationwide search optimization strategy',
    features: [
      'Custom Keyword Strategy',
      'National SEO Campaign',
      'Comprehensive Reporting',
      'Competitor Analysis',
      'Content Strategy'
    ],
    commissionRate: 0.12, // 12% direct commission
    overrideRate: 0.06,   // 6% override commission
    category: 'sbo',
    status: 'active'
  }
]

export const PACKAGES: ProductPackage[] = [
  {
    id: 'website-bundle-5',
    name: '5 Website Package',
    products: [
      { ...PRODUCTS[0], quantity: 5 } // 5 websites
    ],
    originalPrice: 12500, // 5 * $2500
    packagePrice: 10000,
    savings: 2500,
    commissionRate: 0.12, // 12% direct commission on package
    overrideRate: 0.06    // 6% override commission
  }
]

export const FREE_WEBSITE_THRESHOLD = 5 // Number of paid websites to qualify for free one
