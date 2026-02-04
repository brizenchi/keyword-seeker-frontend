import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Keyword Research for Content Creators - Grow Your Audience | NichePop',
  description: 'Find trending topics for YouTube, TikTok, and other platforms. Discover what your audience wants to see and grow your channel.',
  alternates: {
    canonical: '/use-cases/content-creators',
  },
}

export default function ContentCreatorsUseCaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
