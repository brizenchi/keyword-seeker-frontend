'use client'

export function PricingSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'NichePop',
    description: 'A new-keyword radar and AI analyst for indie developers who build sites.',
    brand: {
      '@type': 'Brand',
      name: 'NichePop',
    },
    // Keep in sync with the tiers in components/pricing-cards.tsx.
    offers: [
      { name: 'Free', price: '0', description: 'New keywords 48h late, opportunity score, AI filter, 20 AI points a month' },
      { name: 'Pro Monthly', price: '29', billingDuration: 'P1M', description: 'Real-time new keywords, 300 AI points, 5 monitors with X discussions' },
      { name: 'Pro Yearly', price: '290', billingDuration: 'P1Y', description: 'Pro billed annually - save 17%' },
      { name: 'Premium Monthly', price: '59', billingDuration: 'P1M', description: 'Everything in Pro, 800 AI points, 15 monitors, growth plans with Search Console' },
      { name: 'Premium Yearly', price: '590', billingDuration: 'P1Y', description: 'Premium billed annually - save 17%' },
    ].map((offer) => ({
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
      ...offer,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
