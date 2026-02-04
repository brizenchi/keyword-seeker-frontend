import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Find Low Competition Keywords Using Reddit - Ultimate Guide',
  description: 'Discover untapped keyword opportunities by analyzing Reddit discussions. Learn proven strategies to find low-competition keywords with high potential in 2026.',
  keywords: [
    'low competition keywords',
    'reddit keyword research',
    'how to find keywords',
    'keyword research reddit',
    'untapped keywords',
    'reddit seo',
  ],
  openGraph: {
    title: 'How to Find Low Competition Keywords Using Reddit',
    description: 'Learn proven strategies to discover untapped keyword opportunities from Reddit discussions.',
    type: 'article',
    publishedTime: '2026-02-01T00:00:00.000Z',
    authors: ['NichePop Team'],
  },
  alternates: {
    canonical: '/blog/how-to-find-low-competition-keywords',
  },
}

export default function BlogArticleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
