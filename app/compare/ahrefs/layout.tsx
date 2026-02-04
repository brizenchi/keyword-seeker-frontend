import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NichePop vs Ahrefs: Which Keyword Research Tool is Better? [2026]',
  description: 'Detailed comparison of NichePop and Ahrefs. Compare features, pricing, ease of use, and value to find the best keyword research tool for your needs.',
  keywords: [
    'nichepop vs ahrefs',
    'ahrefs alternative',
    'cheap ahrefs alternative',
    'keyword research tool comparison',
    'ahrefs vs nichepop',
    'affordable keyword tool',
  ],
  openGraph: {
    title: 'NichePop vs Ahrefs: Honest Comparison [2026]',
    description: 'Compare features, pricing, and value to find the best keyword research tool.',
    type: 'website',
  },
  alternates: {
    canonical: '/compare/ahrefs',
  },
}

export default function CompareAhrefsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
