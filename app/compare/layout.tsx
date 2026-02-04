import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare Keyword Research Tools - Find the Best Alternative',
  description: 'Compare NichePop with other keyword research tools. Find the best tool for your budget and needs with our honest, detailed comparisons.',
  keywords: [
    'keyword research tool comparison',
    'ahrefs alternative',
    'semrush alternative',
    'keyword tool comparison',
    'best keyword research tool',
  ],
  openGraph: {
    title: 'Compare Keyword Research Tools - NichePop',
    description: 'Find the best keyword research tool with our detailed comparisons.',
    type: 'website',
  },
  alternates: {
    canonical: '/compare',
  },
}

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
