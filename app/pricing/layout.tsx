import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - Free & Pro Keyword Research Plans',
  description: 'Start free with 3 searches/day. Pro plans from $29/mo for unlimited keyword research, real-time data & AI insights. No credit card required for free tier.',
  keywords: [
    'keyword research tool pricing',
    'affordable keyword tool',
    'free keyword research tool',
    'keyword tool subscription',
    'SEO tool pricing',
    'keyword research plans',
  ],
  openGraph: {
    title: 'NichePop Pricing - Start Free or Go Pro',
    description: 'Choose the perfect plan for your keyword research needs. Start free, upgrade anytime.',
    type: 'website',
    images: [{
      url: '/og-image-pricing.png',
      width: 1200,
      height: 630,
      alt: 'NichePop Pricing Plans',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NichePop Pricing - Start Free or Go Pro',
    description: 'Choose the perfect plan for your keyword research needs.',
    images: ['/twitter-image-pricing.png'],
  },
  alternates: {
    canonical: '/pricing',
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
