import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AuthProvider } from "@/hooks/useAuth"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: 'swap',
  preload: true,
  fallback: ['monospace']
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "NichePop - Discover Trending Keywords & Profitable Niches",
    template: "%s | NichePop",
  },
  description: "Discover trending keyword opportunities with real-time data from Reddit, Google Trends & more. AI-powered niche analysis, competition insights & profit estimation. Start free!",
  keywords: [
    // Core keywords - opportunity focused
    "profitable niche finder",
    "niche opportunity discovery",
    "low competition niche finder",
    "affordable keyword research",
    "keyword research tool",
    "niche keyword research",
    "trend discovery tool",
    // Pain point keywords
    "ahrefs alternative cheap",
    "semrush alternative affordable",
    "cheap keyword research tool",
    "keyword tool under $50",
    "affordable SEO tool",
    "keyword research on budget",
    "free keyword research alternative",
    // Problem-solving keywords
    "find profitable niches before saturated",
    "discover trending niches early",
    "how to find untapped niches",
    "low competition keyword finder",
    "niche research for affiliate marketing",
    "find profitable keywords fast",
    // Reddit & opportunity discovery
    "reddit niche finder",
    "reddit trend analysis tool",
    "reddit keyword opportunities",
    "find business ideas reddit",
    "reddit market research tool",
    "trending subreddits business",
    // User intent keywords
    "keyword research for beginners",
    "niche site keyword research",
    "affiliate marketing niche finder",
    "content creator keyword tool",
    "SEO keyword opportunity finder",
    "profitable keywords 2026",
    "trending keywords finder",
    "real-time keyword trends",
    "keyword profitability calculator"
  ],
  authors: [{ name: "NichePop" }],
  creator: "NichePop",
  publisher: "NichePop",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'NichePop - Discover Trending Keywords & Profitable Niches',
    description: 'Discover trending keyword opportunities with real-time data from Reddit, Google Trends & more. AI-powered niche analysis, competition insights & profit estimation.',
    siteName: 'NichePop',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'NichePop - Keyword Research Tool',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NichePop - Discover Trending Keywords & Profitable Niches',
    description: 'Discover trending keyword opportunities with real-time data from Reddit, Google Trends & more. Start free!',
    images: ['/twitter-image.png'],
    creator: '@nichepop',
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.className} ${jetbrainsMono.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </AuthProvider>
      </body>
    </html>
  )
}
