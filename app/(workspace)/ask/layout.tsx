import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getDictionary } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await getRequestLocale()).ask
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
