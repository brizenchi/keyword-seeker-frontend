import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AuthProvider } from "@/hooks/useAuth"
import { getSiteUrl } from "@/lib/seo/site-url"
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
  metadataBase: new URL(getSiteUrl()),
  alternates: {
    canonical: '/',
  },
  title: {
    default: "NichePop - Low Competition Keyword Research Tool",
    template: "%s | NichePop",
  },
  description: "Discover low-competition keywords with real-time trend signals from Reddit and Google Trends. Built for bloggers, creators, and lean SEO teams.",
  keywords: [
    "trending keywords",
    "profitable niches",
    "keyword research",
    "real-time insights",
    "low-competition keywords",
    "AI analysis",
    "Reddit discussions",
    "niche discovery"
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
    title: 'NichePop - Low Competition Keyword Research Tool',
    description: 'Find trending keyword opportunities with real-time data and competition signals.',
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
    title: 'NichePop - Low Competition Keyword Research Tool',
    description: 'Find low-competition keyword opportunities faster with real-time trend data.',
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
