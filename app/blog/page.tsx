'use client'

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock } from "lucide-react"

const blogPosts = [
  {
    slug: 'how-to-find-low-competition-keywords',
    title: 'How to Find Low Competition Keywords Using Reddit',
    description: 'Discover untapped keyword opportunities by analyzing Reddit discussions. Learn proven strategies to find low-competition keywords with high potential.',
    category: 'Keyword Research',
    readTime: '8 min read',
    publishedAt: '2026-02-01',
    author: 'NichePop Team',
  },
  {
    slug: 'keyword-opportunity-score-explained',
    title: 'Keyword Opportunity Score: What It Means & How to Use It',
    description: 'Understanding opportunity scores can transform your keyword research. Learn how to interpret and leverage this metric for better results.',
    category: 'Tutorial',
    readTime: '6 min read',
    publishedAt: '2026-02-02',
    author: 'NichePop Team',
  },
  {
    slug: 'nichepop-vs-ahrefs-comparison',
    title: 'NichePop vs Ahrefs: Honest Comparison for 2026',
    description: 'Comparing features, pricing, and value. Find out which keyword research tool is right for your needs and budget.',
    category: 'Comparison',
    readTime: '10 min read',
    publishedAt: '2026-02-03',
    author: 'NichePop Team',
  },
  {
    slug: 'estimate-keyword-profitability',
    title: 'How to Estimate Keyword Profitability (With Examples)',
    description: 'Learn the exact formula to calculate potential revenue from keywords. Real examples and actionable insights included.',
    category: 'Strategy',
    readTime: '7 min read',
    publishedAt: '2026-02-03',
    author: 'NichePop Team',
  },
  {
    slug: 'how-to-evaluate-keyword-worth',
    title: 'How to Evaluate if a Keyword is Worth Targeting: 7 Key Metrics Explained',
    description: 'Learn how to scientifically evaluate keyword value using 7 core metrics including search volume, competition, profit estimation, and more. Stop wasting time on low-value keywords.',
    category: 'Tutorial',
    readTime: '15 min read',
    publishedAt: '2026-03-01',
    author: 'NichePop Team',
  },
  {
    slug: 'openclaw-reddit-demand-analysis',
    title: 'OpenClaw Is Trending — 8 Business Opportunities from Reddit User Demands',
    description: 'We analyzed hundreds of Reddit posts about OpenClaw using NichePop to uncover real user demands. Discover 8 validated business opportunities in the OpenClaw AI agent ecosystem.',
    category: 'Market Research',
    readTime: '12 min read',
    publishedAt: '2026-03-05',
    author: 'NichePop Team',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-card text-success border-border px-4 py-1.5 backdrop-blur-sm">
              Blog
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
              Keyword Research Tips & Guides
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
              Expert insights on finding profitable keywords, analyzing competition, and discovering trending niches
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full border-border hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer bg-card backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs border-border text-success">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-xl mb-2 text-foreground hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-1 text-primary">
                        Read more
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <Card className="border-2 border-primary/40 bg-card backdrop-blur-xl shadow-2xl">
              <CardContent className="p-12 space-y-6">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                  Ready to Find Your Next Keyword Opportunity?
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto font-light">
                  Put these strategies into action with NichePop's real-time keyword research tool
                </p>
                <Link href="/dashboard">
                  <Button size="lg" className="bg-primary hover:bg-primary text-primary-foreground font-bold text-lg px-10 py-6 rounded-xl hover:-translate-y-0.5 transition-all duration-200">
                    Start Exploring Keywords
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
