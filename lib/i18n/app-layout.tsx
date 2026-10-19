import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { LocaleProvider } from '@/components/i18n/locale-provider'
import { getDictionary, type Dictionary } from './index'
import { getRequestLocale } from './server'

/**
 * Layout for a signed-in app section: language from the cookie, localized title, never indexed.
 * Use as `const { generateMetadata, Layout } = createAppLayout((t) => t.today)`.
 */
export function createAppLayout(pick: (t: Dictionary) => { metaTitle: string; metaDescription?: string }) {
  async function generateMetadata(): Promise<Metadata> {
    const meta = pick(getDictionary(await getRequestLocale()))
    return { title: meta.metaTitle, description: meta.metaDescription, robots: { index: false, follow: false } }
  }

  async function Layout({ children }: { children: ReactNode }) {
    const locale = await getRequestLocale()
    return <LocaleProvider locale={locale}>{children}</LocaleProvider>
  }

  return { generateMetadata, Layout }
}
