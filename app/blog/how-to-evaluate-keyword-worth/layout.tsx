import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Evaluate if a Keyword is Worth Targeting: 7 Key Metrics',
  description: 'Learn how to scientifically evaluate keyword value using 7 core metrics including search volume, competition, profit estimation, and growth rate. Stop wasting time on low-value keywords.',
  keywords: [
    'keyword evaluation',
    'keyword research',
    'how to evaluate keywords',
    'keyword worth',
    'keyword metrics',
    'search volume analysis',
    'keyword competition',
    'keyword difficulty',
    'profit estimation',
    'keyword growth rate',
    'emerging keywords',
    'Reddit keyword research',
    'low competition keywords',
  ],
  alternates: {
    canonical: '/blog/how-to-evaluate-keyword-worth',
  },
  openGraph: {
    title: 'How to Evaluate if a Keyword is Worth Targeting: 7 Key Metrics',
    description: 'Master keyword evaluation with data-driven decisions. Discover how to find high-value keywords using search volume, competition, profit estimation, and 4 other critical metrics.',
    type: 'article',
    url: '/blog/how-to-evaluate-keyword-worth',
    siteName: 'NichePop',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Evaluate Keywords: 7 Metrics That Matter',
    description: 'Learn to scientifically evaluate keyword value with 7 core metrics. Stop wasting time on low-value keywords.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
