import { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/seo/site-url'
import { LOCALES, localizedHref } from '@/lib/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()
  const currentDate = new Date()

  // Pages that exist in English and Chinese, each listed once per language with hreflang alternates.
  const localizedPages = [
    { path: '/', changeFrequency: 'daily', priority: 1 },
    { path: '/pricing', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/new-keywords', changeFrequency: 'daily', priority: 0.9 },
  ] as const
  const localized: MetadataRoute.Sitemap = localizedPages.flatMap((page) =>
    LOCALES.map((locale) => ({
      url: `${baseUrl}${localizedHref(page.path, locale) === '/' ? '' : localizedHref(page.path, locale)}`,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: locale === 'en' ? page.priority : page.priority - 0.1,
      alternates: {
        languages: {
          en: `${baseUrl}${page.path === '/' ? '' : page.path}`,
          'zh-CN': `${baseUrl}${localizedHref(page.path, 'zh')}`,
        },
      },
    })),
  )

  return [
    ...localized,
    {
      url: `${baseUrl}/dashboard`,
      lastModified: currentDate,
      changeFrequency: 'always',
      priority: 0.8,
    },
    // Blog
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/how-to-find-low-competition-keywords`,
      lastModified: new Date('2026-02-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/keyword-opportunity-score-explained`,
      lastModified: new Date('2026-02-02'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/nichepop-vs-ahrefs-comparison`,
      lastModified: new Date('2026-02-03'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/estimate-keyword-profitability`,
      lastModified: new Date('2026-02-03'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/how-to-evaluate-keyword-worth`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Use cases
    {
      url: `${baseUrl}/use-cases`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/use-cases/bloggers`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/use-cases/affiliate-marketing`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/use-cases/ecommerce`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/use-cases/content-creators`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Legal pages
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]
}
