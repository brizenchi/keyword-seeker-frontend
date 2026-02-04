import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Keyword Research Tool for Bloggers - Grow Your Blog Traffic | NichePop',
  description: 'Discover trending blog topics and low-competition keywords that drive real traffic. Find content ideas with 500-5K monthly searches. Used by 1000+ bloggers. Start free.',
  keywords: [
    'keyword research for bloggers',
    'blog keyword tool',
    'blog topic ideas',
    'blog traffic growth',
    'blogging keywords',
    'content ideas for bloggers',
    'blog SEO tool',
    'low competition keywords',
    'trending blog topics',
    'blog content strategy',
    'keyword research tool for blog',
    'find blog topics',
  ],
  openGraph: {
    title: 'Keyword Research for Bloggers - Find Topics That Rank | NichePop',
    description: 'Stop guessing what to write. Discover trending topics with low competition. 500-5K monthly searches. See results in 2-4 weeks.',
    type: 'website',
    url: '/use-cases/bloggers',
    siteName: 'NichePop',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keyword Research for Bloggers - NichePop',
    description: 'Find blog topics that actually get traffic. Real-time keyword trends + competition analysis.',
  },
  alternates: {
    canonical: '/use-cases/bloggers',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function BloggersUseCaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
