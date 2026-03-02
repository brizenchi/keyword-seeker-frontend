import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Low Competition Keywords for Bloggers (With Examples)',
  description: 'Find low competition keywords for bloggers with real examples, search volume targets, and difficulty benchmarks. Build a content plan that ranks faster.',
  keywords: [
    'low competition keywords for blogger examples',
    'low competition keywords for blogger',
    'low competition keywords for bloggers',
    'keyword research for bloggers',
    'keyword research for blogger examples',
    'blog keyword tool',
    'blog keyword examples',
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
    title: 'Low Competition Keywords for Bloggers: Real Examples',
    description: 'Get real blogger keyword examples with search volume and keyword difficulty so you can publish content that ranks faster.',
    type: 'website',
    url: '/use-cases/bloggers',
    siteName: 'NichePop',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Low Competition Keywords for Bloggers (Examples)',
    description: 'Use real keyword examples, KD benchmarks, and trend data to grow blog traffic.',
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
