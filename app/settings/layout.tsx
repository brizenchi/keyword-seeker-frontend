import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings - Account & Subscription Management',
  description: 'Manage your NichePop account, subscription plan, billing, and credits.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
