import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Estimate Keyword Profitability (With Examples) - Complete Guide',
  description: 'Learn the exact formula to calculate potential revenue from keywords. Real examples and actionable insights for profitable keyword research.',
  alternates: {
    canonical: '/blog/estimate-keyword-profitability',
  },
}

export default function BlogArticleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
