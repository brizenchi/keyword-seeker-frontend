import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Keyword Research for E-commerce - Optimize Product Listings | NichePop',
  description: 'Find profitable products and optimize your e-commerce listings. Discover trending products and keywords to increase your online sales.',
  alternates: {
    canonical: '/use-cases/ecommerce',
  },
}

export default function EcommerceUseCaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
