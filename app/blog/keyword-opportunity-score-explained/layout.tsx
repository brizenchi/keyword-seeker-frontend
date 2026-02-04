import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Keyword Opportunity Score Explained - What It Means & How to Use It',
  description: 'Learn how to interpret keyword opportunity scores and use them to find the best keywords for your content. Maximize your SEO ROI.',
  alternates: {
    canonical: '/blog/keyword-opportunity-score-explained',
  },
}

export default function BlogArticleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
