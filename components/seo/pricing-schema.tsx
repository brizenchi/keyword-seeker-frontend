'use client'

export function PricingSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'NichePop Keyword Research Tool',
    description: 'Discover trending keyword opportunities with real-time data from Reddit, Google Trends & more.',
    brand: {
      '@type': 'Brand',
      name: 'NichePop',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Free Plan',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2026-12-31',
        description: '1 searches per day, access to first result',
      },
      {
        '@type': 'Offer',
        name: 'Pro Monthly',
        price: '29',
        priceCurrency: 'USD',
        billingDuration: 'P1M',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2026-12-31',
        description: 'Unlimited searches, all 15+ results visible, real-time data',
      },
      {
        '@type': 'Offer',
        name: 'Pro Yearly',
        price: '99',
        priceCurrency: 'USD',
        billingDuration: 'P1Y',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2026-12-31',
        description: 'Pro plan billed annually - save 17%',
      },
      {
        '@type': 'Offer',
        name: 'Premium Monthly',
        price: '99',
        priceCurrency: 'USD',
        billingDuration: 'P1M',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2026-12-31',
        description: 'All Pro features plus AI business plans, data export, multi-source data',
      },
      {
        '@type': 'Offer',
        name: 'Premium Yearly',
        price: '990',
        priceCurrency: 'USD',
        billingDuration: 'P1Y',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2026-12-31',
        description: 'Premium plan billed annually - save 17%',
      },
    ],
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
