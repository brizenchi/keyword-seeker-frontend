'use client'

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { BreadcrumbSchema } from "@/components/seo/structured-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQSchema } from "@/components/seo/structured-data"
import { RelatedArticles } from "@/components/related-articles"
import { ArrowRight, Check, FileText, TrendingUp, Zap, Target, Search, BarChart, Clock, DollarSign } from "lucide-react"

const faqs = [
  {
    question: "What are low competition keywords for bloggers? Can you share examples?",
    answer: "Low competition keywords are terms with solid search demand but relatively weak SERP competition. A few example patterns are 'best budget standing desk for small apartments' or 'meal prep for nurses on night shift.' NichePop helps you find these opportunities by combining trend velocity, keyword difficulty, and search volume so you can pick topics that are easier to rank."
  },
  {
    question: "Can NichePop replace expensive tools like Ahrefs for bloggers?",
    answer: "For most bloggers, yes. While Ahrefs is comprehensive, it costs $129/month which is often overkill for solo bloggers or small teams. NichePop provides the core features bloggers need most—trending keyword discovery, competition analysis, and search volume data—at just $19/month. You get 90% of the value for 15% of the price."
  },
  {
    question: "How do I know which keywords are worth targeting?",
    answer: "NichePop provides an opportunity score (0-100) for each keyword based on multiple factors: search volume, competition level, CPC value, and trend velocity. Keywords scoring 70+ are typically excellent opportunities. We also show you exact metrics like monthly search volume, keyword difficulty, and estimated profit potential to help you make data-driven decisions."
  },
  {
    question: "What's the ideal search volume for blog keywords?",
    answer: "For most bloggers, the sweet spot is 500-5,000 monthly searches with low to medium competition (keyword difficulty under 30). These keywords have enough search volume to drive meaningful traffic but aren't so competitive that you'll struggle to rank. NichePop's filters help you find keywords in this ideal range quickly."
  },
  {
    question: "How long does it take to see results from keyword-optimized content?",
    answer: "Most bloggers see initial rankings within 2-4 weeks for low-competition keywords. Full results typically appear within 8-12 weeks as Google fully indexes and ranks your content. Using NichePop's data to target low-competition, high-opportunity keywords significantly speeds up this process compared to targeting competitive terms."
  },
  {
    question: "Can I use NichePop for multiple blogs or niches?",
    answer: "Absolutely! There are no restrictions on niches or topics. Whether you run a tech blog, food blog, travel blog, or multiple blogs across different niches, you can use NichePop to discover keywords for all of them. The Pro plan includes unlimited searches across any niche."
  },
]

const relatedArticles = [
  {
    title: "How to Find Low Competition Keywords Using Reddit",
    href: "/blog/how-to-find-low-competition-keywords",
    category: "Keyword Research",
    readTime: "8 min read",
    description: "Discover untapped keyword opportunities by analyzing Reddit discussions.",
  },
  {
    title: "Keyword Opportunity Score: What It Means & How to Use It",
    href: "/blog/keyword-opportunity-score-explained",
    category: "Tutorial",
    readTime: "6 min read",
    description: "Understanding opportunity scores can transform your keyword research.",
  },
  {
    title: "How to Estimate Keyword Profitability (With Examples)",
    href: "/blog/estimate-keyword-profitability",
    category: "Strategy",
    readTime: "7 min read",
    description: "Learn the exact formula to calculate potential revenue from keywords.",
  },
]

const keywordExamples = [
  {
    keyword: "best budget standing desk for small apartment",
    searchVolume: "1.2K/mo",
    difficulty: "18/100",
    intent: "Commercial",
  },
  {
    keyword: "meal prep ideas for nurses working night shift",
    searchVolume: "900/mo",
    difficulty: "14/100",
    intent: "Informational",
  },
  {
    keyword: "minimalist packing list for 2 week europe trip",
    searchVolume: "1.6K/mo",
    difficulty: "22/100",
    intent: "Informational",
  },
  {
    keyword: "notion content calendar template for bloggers",
    searchVolume: "700/mo",
    difficulty: "16/100",
    intent: "Commercial",
  },
  {
    keyword: "how to start a keto blog and make money",
    searchVolume: "1.1K/mo",
    difficulty: "21/100",
    intent: "Transactional",
  },
  {
    keyword: "best email newsletter examples for personal brands",
    searchVolume: "1.4K/mo",
    difficulty: "24/100",
    intent: "Informational",
  },
]

export default function BloggersUseCasePage() {
  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Use Cases", url: "/use-cases" },
          { name: "For Bloggers", url: "/use-cases/bloggers" },
        ]}
      />
      <FAQSchema faqs={faqs} />
      <Navbar />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Use Cases", href: "/use-cases" },
              { label: "For Bloggers", href: "/use-cases/bloggers" },
            ]}
            className="mb-8"
          />

          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-card text-primary border-border px-4 py-1.5 backdrop-blur-sm">
              For Bloggers
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
              Low Competition Keywords for Bloggers (With Examples)
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
              Stop guessing what to write about. Use real keyword examples, trend data, and competition metrics to publish blog posts with a faster path to rankings.
            </p>

            <Link href="/pricing">
              <Button size="lg" className="bg-primary hover:bg-primary text-primary-foreground font-bold text-base px-8 py-5 rounded-xl hover:-translate-y-0.5 transition-all duration-200">
                Start Finding Topics
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Low Competition Keyword Examples */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold tracking-tight mb-4 text-center text-foreground">
              Low Competition Keyword Examples for Bloggers
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              These are sample keyword patterns with realistic search and difficulty ranges. Use them as templates to find your own low competition opportunities.
            </p>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {keywordExamples.map((example) => (
                <Card key={example.keyword} className="border-border bg-card backdrop-blur-sm">
                  <CardHeader className="space-y-3">
                    <CardTitle className="text-base text-foreground leading-relaxed">
                      {example.keyword}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-card text-success border-border">{example.searchVolume}</Badge>
                      <Badge className="bg-card text-primary border-border">KD {example.difficulty}</Badge>
                      <Badge className="bg-card text-foreground border-border">{example.intent}</Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* The Problem */}
          <Card className="mb-16 border border-red-200 bg-danger-soft">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground font-bold">The Blogger's Dilemma</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You spend hours researching and writing a blog post, publish it with excitement, and then... crickets. No traffic, no engagement, no results.
              </p>
              <p className="text-muted-foreground">
                Why? Because you're competing for keywords that are either too competitive or not being searched for at all.
              </p>
            </CardContent>
          </Card>

          {/* The Solution */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center text-foreground">
              How NichePop Helps Bloggers Succeed
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl bg-card backdrop-blur-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-foreground font-bold">Find Trending Topics</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Discover what people are talking about right now on Reddit, Google Trends, and more
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border hover:border-success/30 transition-all duration-300 hover:shadow-xl bg-card backdrop-blur-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-foreground font-bold">Low Competition</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Identify keywords with high search volume but low competition that you can actually rank for
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl bg-card backdrop-blur-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-foreground font-bold">Content Ideas</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Never run out of blog post ideas with our real-time trending keyword discovery
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border hover:border-success/30 transition-all duration-300 hover:shadow-xl bg-card backdrop-blur-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-foreground font-bold">Quick Analysis</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Get instant opportunity scores to know which topics to prioritize for maximum impact
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* Real Blogger Workflow */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center text-foreground">
              Your New Content Creation Workflow
            </h2>

            <div className="space-y-6">
              <Card className="border-border bg-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-foreground font-bold">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">1</span>
                    Discover Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Browse the live feed to see what's trending in your niche right now. Find discussions happening on Reddit, emerging searches on Google Trends, and popular topics across multiple platforms.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-foreground font-bold">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">2</span>
                    Analyze Competition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Check the competition level for each keyword. Focus on opportunities with high search volume but low to medium competition where you have a realistic chance to rank.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-foreground font-bold">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">3</span>
                    Estimate Traffic Potential
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Use our profit estimation and opportunity scoring to understand the potential impact of ranking for a keyword. Prioritize high-opportunity topics.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-foreground font-bold">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">4</span>
                    Create Targeted Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Write your blog post targeting the keyword, knowing you've chosen a topic with real search demand and winnable competition.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Metrics Explanation */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center text-foreground">
              Key Metrics for Blogger Success
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-border bg-card backdrop-blur-sm hover:border-primary/40 transition-all">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft flex-shrink-0">
                      <Search className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-foreground mb-2">Search Volume</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        The number of monthly searches for a keyword. For bloggers, target 500-5,000 searches/month—enough traffic to make an impact without overwhelming competition.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-border bg-card backdrop-blur-sm hover:border-success/30 transition-all">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft flex-shrink-0">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-foreground mb-2">Keyword Difficulty</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Competition level (0-100). Look for keywords under 30 for quick wins. Under 20 means you can often rank within 2-4 weeks with quality content.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-border bg-card backdrop-blur-sm hover:border-primary/40 transition-all">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-foreground mb-2">Trend Velocity</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        How quickly a keyword is gaining popularity. Rising trends indicate growing interest—perfect timing to create content before it becomes competitive.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-border bg-card backdrop-blur-sm hover:border-success/30 transition-all">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft flex-shrink-0">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-foreground mb-2">CPC Value</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Cost-per-click in advertising. Higher CPC ($2+) indicates commercial intent and potential for affiliate monetization or ad revenue.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* Content Strategy Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center text-foreground">
              Proven Blog Content Strategies
            </h2>

            <div className="grid gap-8 md:grid-cols-3 mb-8">
              <Card className="border-border bg-card backdrop-blur-sm">
                <CardHeader>
                  <Badge className="bg-card text-primary border-border w-fit mb-3">Strategy 1</Badge>
                  <CardTitle className="text-xl text-foreground">
                    The Quick Win Approach
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    Target ultra-specific long-tail keywords with 100-500 monthly searches and difficulty under 15.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-foreground font-semibold">Best for:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• New blogs building initial traffic</li>
                      <li>• Quick content wins (1-2 weeks to rank)</li>
                      <li>• Building topical authority</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card backdrop-blur-sm">
                <CardHeader>
                  <Badge className="bg-card text-success border-border w-fit mb-3">Strategy 2</Badge>
                  <CardTitle className="text-xl text-foreground">
                    The Growth Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    Balance keywords: 70% low-competition (KD &lt; 20), 30% medium-competition (KD 20-40).
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-foreground font-semibold">Best for:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Blogs with 6+ months of content</li>
                      <li>• Steady traffic growth</li>
                      <li>• Building domain authority</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card backdrop-blur-sm">
                <CardHeader>
                  <Badge className="bg-card text-primary border-border w-fit mb-3">Strategy 3</Badge>
                  <CardTitle className="text-xl text-foreground">
                    The Authority Play
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    Create comprehensive pillar content for medium-competition keywords (KD 30-50) with 2,000+ words.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-foreground font-semibold">Best for:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Established blogs with authority</li>
                      <li>• Long-term traffic goals</li>
                      <li>• High-value conversions</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border bg-card backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-soft flex-shrink-0">
                    <Zap className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-foreground font-semibold mb-2">Pro Tip: The Content Cluster Method</p>
                    <p className="text-muted-foreground text-sm">
                      Instead of isolated articles, create topic clusters: 1 comprehensive pillar post (2,000+ words) linking to 5-8 supporting articles (800-1,200 words each). This signals topical authority to Google and dramatically improves rankings across all cluster keywords.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Case Study */}
          <Card className="mb-16 border border-green-200 bg-success-soft">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground font-bold">Real Example: Tech Blog Success</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Challenge:</strong> Sarah runs a tech blog but struggled to compete with major tech sites for popular keywords like "best laptop 2026."
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Solution:</strong> Using NichePop, she discovered emerging discussions on Reddit about "best laptop for digital nomads with long battery life"—a specific niche with 2,400 monthly searches and low competition.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Results:</strong> Her blog post ranked #3 within 2 weeks, driving 800+ visitors per month and generating $400 in affiliate commissions monthly.
              </p>
            </CardContent>
          </Card>

          {/* Benefits List */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center text-foreground">
              Why Bloggers Love NichePop
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Find Untapped Niches</p>
                    <p className="text-sm text-muted-foreground">Discover sub-niches your competitors haven't found yet</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Real-Time Opportunities</p>
                    <p className="text-sm text-muted-foreground">Catch trending topics early before they become saturated</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Save Research Time</p>
                    <p className="text-sm text-muted-foreground">Find winning topics in minutes instead of hours</p>
                  </div>
                </li>
              </ul>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Affordable Pricing</p>
                    <p className="text-sm text-muted-foreground">At $19/month, it's accessible for bloggers at any stage</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Content Calendar Ideas</p>
                    <p className="text-sm text-muted-foreground">Build a 3-month content calendar in one sitting</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">No Learning Curve</p>
                    <p className="text-sm text-muted-foreground">Intuitive interface designed for content creators</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-12 bg-muted" />

          {/* Common Blogger Questions */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold tracking-tight mb-4 text-center text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Everything you need to know about using keyword research to grow your blog
            </p>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border rounded-lg px-6 bg-card backdrop-blur-sm"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Related Content */}
          <div className="mb-16">
            <RelatedArticles articles={relatedArticles} />
          </div>

          <Separator className="my-12 bg-muted" />

          {/* Final CTA */}
          <Card className="border-2 border-primary/40 bg-card backdrop-blur-xl shadow-2xl">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                Start Growing Your Blog Today
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
                Join thousands of bloggers who use NichePop to find winning topics and grow their traffic
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary text-primary-foreground font-bold text-lg px-10 py-6 rounded-xl hover:-translate-y-0.5 transition-all duration-200">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                Free forever • No credit card required • 1 searches per day
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
