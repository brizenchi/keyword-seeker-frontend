import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Find Trending Keywords & Profitable Niches Fast',
  description: 'Discover trending keyword opportunities with real-time data from Reddit, Google Trends & more. AI-powered niche analysis, competition insights & profit estimation. Start free!',
  keywords: [
    'keyword research tool',
    'niche finder',
    'trending keywords',
    'keyword opportunity finder',
    'real-time trend analysis',
    'low competition keywords',
    'keyword profitability',
    'SEO keyword tool',
    'keyword discovery',
    'reddit keyword trends',
  ],
  openGraph: {
    title: 'NichePop - Find Trending Keywords & Profitable Niches Fast',
    description: 'Discover trending keyword opportunities with real-time data from Reddit, Google Trends & more. Start free!',
    type: 'website',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'NichePop Keyword Research Tool',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NichePop - Find Trending Keywords & Profitable Niches Fast',
    description: 'Discover trending keyword opportunities with real-time data. Start free!',
    images: ['/twitter-image.png'],
  },
  alternates: {
    canonical: '/',
  },
}
