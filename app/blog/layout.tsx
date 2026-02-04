import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Keyword Research Tips & SEO Strategies',
  description: 'Learn how to find profitable keywords, analyze competition, and discover trending niches. Expert tips and guides for keyword research and SEO.',
  keywords: [
    'keyword research tips',
    'SEO strategies',
    'keyword research guide',
    'niche research',
    'SEO blog',
    'keyword analysis',
  ],
  openGraph: {
    title: 'NichePop Blog - Keyword Research & SEO Tips',
    description: 'Expert guides on keyword research, niche discovery, and SEO strategies.',
    type: 'website',
    images: [{
      url: '/og-image-blog.png',
      width: 1200,
      height: 630,
      alt: 'NichePop Blog',
    }],
  },
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
