'use client'

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb } from "@/components/breadcrumb"
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2 } from "lucide-react"
import type { ReactNode } from "react"

interface BlogArticleLayoutProps {
  title: string
  description: string
  category: string
  readTime: string
  publishedAt: string
  author: string
  children: ReactNode
}

export function BlogArticleLayout({
  title,
  description,
  category,
  readTime,
  publishedAt,
  author,
  children,
}: BlogArticleLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0A0E27]">
      <Navbar />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Blog", href: "/blog" },
              { label: title, href: "" },
            ]}
            className="mb-8"
          />

          {/* Back to Blog */}
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="mb-8 -ml-2 text-[#8B92B3] hover:text-white hover:bg-[#0F1635]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          {/* Article Header */}
          <article className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-[#1E2650] text-[#39FF14]">{category}</Badge>
                <span className="text-sm text-[#8B92B3] flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {readTime}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {title}
              </h1>

              <p className="text-xl text-[#8B92B3] leading-relaxed font-light">
                {description}
              </p>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-4 text-sm text-[#8B92B3]">
                  <span>By {author}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <Button variant="outline" size="sm" className="border-[#1E2650] bg-transparent text-white hover:bg-[#0080FF]/10 hover:border-[#0080FF]">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <Separator className="bg-[#1E2650]" />

            {/* Article Content */}
            <div className="prose prose-invert prose-lg max-w-none
              [&>h2]:text-white [&>h2]:font-bold [&>h2]:text-2xl [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:font-[Space_Grotesk]
              [&>h3]:text-white [&>h3]:font-semibold [&>h3]:text-xl [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:font-[Space_Grotesk]
              [&>p]:text-[#8B92B3] [&>p]:leading-relaxed [&>p]:mb-4
              [&>ul]:text-[#8B92B3] [&>ul]:space-y-2 [&>ul]:mb-6
              [&>ol]:text-[#8B92B3] [&>ol]:space-y-2 [&>ol]:mb-6
              [&>li]:text-[#8B92B3] [&>li]:leading-relaxed
              [&>strong]:text-white [&>strong]:font-semibold
              [&_table]:w-full [&_table]:border-collapse [&_table]:my-8 [&_table]:text-sm [&_table]:rounded-lg [&_table]:overflow-hidden
              [&_thead]:bg-[#1E2650]
              [&_th]:border [&_th]:border-[#2A3150] [&_th]:p-4 [&_th]:text-left [&_th]:font-semibold [&_th]:text-white
              [&_td]:border [&_td]:border-[#2A3150] [&_td]:p-4 [&_td]:text-[#8B92B3]
              [&_tbody_tr]:bg-[#0F1635]/50 [&_tbody_tr:hover]:bg-[#1E2650]/50 [&_tbody_tr]:transition-colors
              [&_.overflow-x-auto]:rounded-lg [&_.overflow-x-auto]:border [&_.overflow-x-auto]:border-[#2A3150]">
              {children}
            </div>

            <Separator className="my-12 bg-[#1E2650]" />

            {/* CTA Section */}
            <Card className="border-2 border-[#0080FF]/30 bg-[#0F1635]/80 backdrop-blur-xl shadow-2xl shadow-[#0080FF]/20">
              <CardContent className="p-8 text-center space-y-4">
                <h2 className="text-2xl font-black tracking-tight text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Ready to Find Your Next Keyword?
                </h2>
                <p className="text-[#8B92B3] font-light">
                  Use NichePop to discover trending keywords with low competition
                </p>
                <Link href="/dashboard">
                  <Button size="lg" className="bg-[#39FF14] hover:bg-[#39FF14] text-[#0A0E27] font-bold text-lg px-10 py-6 rounded-xl hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] hover:-translate-y-0.5 transition-all duration-200">
                    Start Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
