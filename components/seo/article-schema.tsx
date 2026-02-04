'use client'

export function ArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  authorName,
  image,
}: {
  headline: string
  description: string
  datePublished: string
  dateModified: string
  authorName: string
  image?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image || (typeof window !== 'undefined' ? `${window.location.origin}/og-image-blog.png` : '/og-image-blog.png'),
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'NichePop',
      logo: {
        '@type': 'ImageObject',
        url: typeof window !== 'undefined' ? `${window.location.origin}/icon.svg` : '/icon.svg',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
