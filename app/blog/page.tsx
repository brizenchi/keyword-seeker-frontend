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
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0A0E27]">
      <Navbar />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-[#0F1635] text-[#39FF14] border-[#1E2650] px-4 py-1.5 backdrop-blur-sm">
              Blog
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Keyword Research Tips & Guides
            </h1>

            <p className="text-lg sm:text-xl text-[#8B92B3] max-w-2xl mx-auto leading-relaxed font-light">
              Expert insights on finding profitable keywords, analyzing competition, and discovering trending niches
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full border-[#1E2650] hover:border-[#0080FF] transition-all duration-300 hover:shadow-2xl hover:shadow-[#0080FF]/20 hover:-translate-y-2 cursor-pointer bg-[#0F1635]/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs border-[#1E2650] text-[#39FF14]">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-[#8B92B3] flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-xl mb-2 text-white hover:text-[#0080FF] transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-[#8B92B3]">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-xs text-[#8B92B3]">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-1 text-[#0080FF]">
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
            <Card className="border-2 border-[#0080FF]/30 bg-[#0F1635]/80 backdrop-blur-xl shadow-2xl shadow-[#0080FF]/20">
              <CardContent className="p-12 space-y-6">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Ready to Find Your Next Keyword Opportunity?
                </h2>
                <p className="text-[#8B92B3] max-w-2xl mx-auto font-light">
                  Put these strategies into action with NichePop's real-time keyword research tool
                </p>
                <Link href="/dashboard">
                  <Button size="lg" className="bg-[#39FF14] hover:bg-[#39FF14] text-[#0A0E27] font-bold text-lg px-10 py-6 rounded-xl hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] hover:-translate-y-0.5 transition-all duration-200">
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
