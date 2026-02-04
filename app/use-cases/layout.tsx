import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Use Cases - Keyword Research for Your Industry | NichePop',
  description: 'Discover how NichePop helps content creators, marketers, e-commerce sellers, and businesses find profitable keywords and trending niches.',
  keywords: [
    'keyword research use cases',
    'keyword tool for bloggers',
    'keyword tool for affiliate marketing',
    'ecommerce keyword research',
    'content marketing keywords',
  ],
  openGraph: {
    title: 'NichePop Use Cases - Find Keywords for Your Industry',
    description: 'See how different professionals use NichePop to discover profitable keywords.',
    type: 'website',
  },
  alternates: {
    canonical: '/use-cases',
  },
}

export default function UseCasesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
