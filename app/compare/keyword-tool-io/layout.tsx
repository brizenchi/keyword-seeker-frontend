import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NichePop vs KeywordTool.io: Which is Better? [2026]',
  description: 'Compare NichePop and KeywordTool.io features, pricing, and capabilities. Find the best keyword research tool.',
  alternates: {
    canonical: '/compare/keyword-tool-io',
  },
}

export default function CompareKeywordToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
