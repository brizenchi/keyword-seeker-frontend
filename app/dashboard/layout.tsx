import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Keyword Analytics & Trends',
  description: 'Access real-time keyword trends, competition analysis, and profit opportunities. Track rising keywords and discover new niches.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
