import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Keyword Research for Affiliate Marketing - Maximize Commissions | NichePop',
  description: 'Find high-converting affiliate keywords with buyer intent. Discover profitable products and niches to maximize your affiliate commissions.',
  keywords: [
    'keyword research for affiliate marketing',
    'affiliate marketing keywords',
    'high converting keywords',
    'buyer intent keywords',
    'affiliate niche research',
    'profitable affiliate keywords',
  ],
  openGraph: {
    title: 'Keyword Research for Affiliate Marketing - NichePop',
    description: 'Find profitable affiliate keywords with high buyer intent',
    type: 'website',
  },
  alternates: {
    canonical: '/use-cases/affiliate-marketing',
  },
}

export default function AffiliateMarketingUseCaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
