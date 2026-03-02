'use client'

import { getCanonicalOrigin, getSiteUrl } from "@/lib/seo/site-url"

function resolveSiteOrigin() {
  if (typeof window !== "undefined") {
    return getCanonicalOrigin(window.location.origin)
  }

  return getSiteUrl()
}

function resolvePageUrl() {
  if (typeof window === "undefined") {
    return getSiteUrl()
  }

  try {
    const currentUrl = new URL(window.location.href)
    const canonicalOrigin = getCanonicalOrigin(currentUrl.origin)
    return `${canonicalOrigin}${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`
  } catch {
    return getSiteUrl()
  }
}

export function OrganizationSchema() {
  const siteOrigin = resolveSiteOrigin()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NichePop',
    description: 'Discover trending keyword opportunities with real-time data from Reddit, Google Trends & more.',
    url: siteOrigin,
    logo: `${siteOrigin}/icon.svg`,
    sameAs: [
      // Add your social media URLs here
      // 'https://twitter.com/nichepop',
      // 'https://linkedin.com/company/nichepop',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebApplicationSchema() {
  const siteOrigin = resolveSiteOrigin()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'NichePop',
    description: 'Keyword research and niche discovery tool with real-time trend analysis',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    url: siteOrigin,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'Real-time keyword trend tracking',
      'Competition analysis',
      'Profit estimation with CPC data',
      'SERP analysis',
      'AI-powered insights',
      'Opportunity scoring system',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const siteOrigin = resolveSiteOrigin()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteOrigin}${item.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ProductSchema({
  name,
  description,
  price,
  priceCurrency,
}: {
  name: string
  description: string
  price: string
  priceCurrency: string
}) {
  const pageUrl = resolvePageUrl()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency,
      availability: 'https://schema.org/InStock',
      url: pageUrl,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
