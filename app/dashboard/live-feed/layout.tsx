import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Live Feed - Real-Time Trending Keywords',
  description: 'Watch trending keywords emerge in real-time. Track search volume, competition, and opportunities as they happen.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function LiveFeedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
