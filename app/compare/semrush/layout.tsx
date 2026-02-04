import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NichePop vs SEMrush: Which Keyword Tool is Better? [2026]',
  description: 'Compare NichePop and SEMrush features, pricing, and value. Find the best keyword research tool for your needs.',
  alternates: {
    canonical: '/compare/semrush',
  },
}

export default function CompareSemrushLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
