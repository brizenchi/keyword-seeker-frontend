import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NichePop vs Ahrefs: Honest Comparison for 2026 - Which is Better?',
  description: 'Detailed comparison of NichePop vs Ahrefs. Compare features, pricing, and value to find the best keyword research tool for your needs and budget.',
  keywords: [
    'nichepop vs ahrefs',
    'ahrefs alternative',
    'keyword research tool comparison',
    'ahrefs competitor',
    'affordable keyword tool',
    'ahrefs pricing',
  ],
  openGraph: {
    title: 'NichePop vs Ahrefs: Honest Comparison for 2026',
    description: 'Compare features, pricing, and value to find the best keyword research tool.',
    type: 'article',
    publishedTime: '2026-02-03T00:00:00.000Z',
    authors: ['NichePop Team'],
  },
  alternates: {
    canonical: '/blog/nichepop-vs-ahrefs-comparison',
  },
}

export default function BlogArticleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
