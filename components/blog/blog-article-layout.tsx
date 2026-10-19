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
    <div className="min-h-screen bg-background">
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
            <Button variant="ghost" size="sm" className="mb-8 -ml-2 text-muted-foreground hover:text-foreground hover:bg-card">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          {/* Article Header */}
          <article className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-border text-success">{category}</Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {readTime}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight text-foreground">
                {title}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed font-light">
                {description}
              </p>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                <Button variant="outline" size="sm" className="border-border bg-transparent text-foreground hover:bg-primary-soft hover:border-primary/40">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <Separator className="bg-muted" />

            {/* Article Content */}
            <div className="max-w-none text-[17px] leading-relaxed text-body
              [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:tracking-tight [&>h2]:text-foreground
              [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-foreground
              [&>p]:mb-5
              [&>ul]:mb-6 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6 [&>ul]:marker:text-faint
              [&>ol]:mb-6 [&>ol]:list-decimal [&>ol]:space-y-2 [&>ol]:pl-6 [&>ol]:marker:text-faint
              [&_strong]:font-semibold [&_strong]:text-foreground
              [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary-hover
              [&_table]:my-8 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm
              [&_thead]:bg-subtle
              [&_th]:border [&_th]:border-border [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground
              [&_td]:border [&_td]:border-border [&_td]:p-3 [&_td]:text-body
              [&_.overflow-x-auto]:rounded-lg [&_.overflow-x-auto]:border [&_.overflow-x-auto]:border-border">
              {children}
            </div>

            <Separator className="my-12 bg-muted" />

            {/* CTA Section */}
            <Card className="border-2 border-primary/40 bg-card backdrop-blur-xl shadow-2xl">
              <CardContent className="p-8 text-center space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  Ready to Find Your Next Keyword?
                </h2>
                <p className="text-muted-foreground font-light">
                  Use NichePop to discover trending keywords with low competition
                </p>
                <Link href="/dashboard">
                  <Button size="lg" className="bg-primary hover:bg-primary text-primary-foreground font-bold text-lg px-10 py-6 rounded-xl hover:-translate-y-0.5 transition-all duration-200">
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
