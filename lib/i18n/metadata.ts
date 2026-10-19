import type { Metadata } from 'next'
import { localizedHref, type LOCALIZED_PATHS, type Locale } from './index'

type LocalizedPath = (typeof LOCALIZED_PATHS)[number]

/** Canonical URL plus hreflang links for a page that exists in both languages. */
export function localizedAlternates(path: LocalizedPath, locale: Locale): Metadata['alternates'] {
  return {
    canonical: localizedHref(path, locale),
    languages: {
      en: localizedHref(path, 'en'),
      'zh-CN': localizedHref(path, 'zh'),
      'x-default': localizedHref(path, 'en'),
    },
  }
}

export const openGraphLocale = (locale: Locale) => (locale === 'zh' ? 'zh_CN' : 'en_US')

/** Metadata for a marketing page that exists in both languages. Titles are used as-is (they already name the brand). */
export function localizedPageMetadata(path: LocalizedPath, locale: Locale, title: string, description: string): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: localizedAlternates(path, locale),
    openGraph: {
      type: 'website',
      siteName: 'NichePop',
      title,
      description,
      url: localizedHref(path, locale),
      locale: openGraphLocale(locale),
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}
