'use client'

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Check, TrendingUp, DollarSign, Target, Zap } from "lucide-react"

export default function AffiliateMarketingUseCasePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Use Cases", href: "/use-cases" },
              { label: "For Affiliate Marketers", href: "/use-cases/affiliate-marketing" },
            ]}
            className="mb-8"
          />

          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-card text-success border-border px-4 py-1.5 backdrop-blur-sm">
              For Affiliate Marketers
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
              Find High-Converting Affiliate Keywords
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
              Discover profitable products and keywords with real buyer intent. Maximize your affiliate commissions with data-driven keyword research.
            </p>

            <Link href="/pricing">
              <Button size="lg" className="bg-primary hover:bg-primary text-primary-foreground font-bold text-base px-8 py-5 rounded-xl hover:-translate-y-0.5 transition-all duration-200">
                Start Finding Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* The Challenge */}
          <Card className="mb-16 border border-red-200 bg-danger-soft">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground font-bold">The Affiliate Marketer's Challenge</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You promote products that seem popular, drive traffic to your affiliate links, but conversions are disappointing. Your commission checks don't match the effort you're putting in.
              </p>
              <p className="text-muted-foreground">
                Why? Because you're targeting information-seeking keywords instead of buyer-intent keywords, or competing in saturated niches where established affiliates dominate.
              </p>
            </CardContent>
          </Card>

          {/* Solutions */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center text-foreground">
              How NichePop Helps Affiliate Marketers Win
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-border hover:border-success/30 transition-all duration-300 hover:shadow-xl bg-card backdrop-blur-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft mb-4">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-foreground font-bold">High-Converting Keywords</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Find keywords with strong buyer intent like "best [product]", "[product] review", "[product] vs"
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl bg-card backdrop-blur-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-foreground font-bold">Trending Products</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Discover emerging products before the market gets saturated with affiliates
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border hover:border-success/30 transition-all duration-300 hover:shadow-xl bg-card backdrop-blur-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-foreground font-bold">Profit Estimation</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Calculate potential commission based on CPC, search volume, and conversion rates
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl bg-card backdrop-blur-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-foreground font-bold">Low Competition Niches</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Identify profitable niches with manageable competition where you can rank
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* Workflow */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center text-foreground">
              Your Profitable Affiliate Workflow
            </h2>

            <div className="space-y-6">
              <Card className="border-border bg-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-foreground font-bold">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">1</span>
                    Find Trending Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Monitor Reddit, Google Trends, and other platforms to discover products people are actively searching for and discussing. Catch trends early before competition heats up.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-foreground font-bold">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">2</span>
                    Target Buyer-Intent Keywords
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Focus on keywords that indicate purchase intent: "best X for Y", "X vs Y", "X review", "where to buy X", "X discount code". These convert at 5-10x higher rates than informational keywords.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-foreground font-bold">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">3</span>
                    Analyze Competition & Profitability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Check competition levels and estimate potential earnings. NichePop shows you CPC data and opportunity scores so you can prioritize high-ROI keywords.
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
                    Write comparison posts, product reviews, or buying guides targeting your chosen keywords. Include your affiliate links naturally within valuable content.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Case Study */}
          <Card className="mb-16 border border-green-200 bg-success-soft">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground font-bold">Success Story: Fitness Affiliate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Challenge:</strong> Marcus was promoting popular fitness equipment but struggling against established review sites for generic terms like "best treadmill."
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Solution:</strong> Using NichePop, he discovered trending discussions about "best under-desk treadmill for small apartments"—a specific buyer-intent keyword with 1,800 searches/month and low competition (KD: 22).
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Results:</strong> His targeted review post ranked #2 within 3 weeks. With an average affiliate commission of $45 per sale and a 3% conversion rate, he now earns $2,400/month from this single post.
              </p>
              <div className="p-4 bg-background/50 rounded-lg border border-border mt-4">
                <p className="text-sm font-semibold mb-2 text-foreground">Monthly Earnings Breakdown:</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Traffic: 1,800 visitors/month</li>
                  <li>• Conversion rate: 3%</li>
                  <li>• Sales: 54 sales/month</li>
                  <li>• Commission per sale: $45</li>
                  <li>• <strong className="text-success">Total: $2,430/month</strong></li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center text-foreground">
              Why Affiliate Marketers Choose NichePop
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Discover Emerging Products</p>
                    <p className="text-sm text-muted-foreground">Find trending products before your competitors do</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Buyer Intent Focus</p>
                    <p className="text-sm text-muted-foreground">Target keywords that actually convert to sales</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Revenue Estimation</p>
                    <p className="text-sm text-muted-foreground">Calculate potential commissions before creating content</p>
                  </div>
                </li>
              </ul>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Niche Opportunities</p>
                    <p className="text-sm text-muted-foreground">Find profitable sub-niches with less competition</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Affordable Tool</p>
                    <p className="text-sm text-muted-foreground">At $19/month, ROI is easy to achieve with just a few sales</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Real-Time Data</p>
                    <p className="text-sm text-muted-foreground">Stay ahead with live trend tracking</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Keyword Types */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center text-foreground">
              High-Converting Keyword Types for Affiliates
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-border bg-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground font-bold">Product Reviews</CardTitle>
                  <CardDescription className="space-y-2">
                    <p className="text-sm font-mono text-primary">"[product name] review"</p>
                    <p className="text-sm font-mono text-primary">"[product name] honest review"</p>
                    <p className="text-xs text-success">Conversion rate: 4-7%</p>
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border bg-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground font-bold">Comparisons</CardTitle>
                  <CardDescription className="space-y-2">
                    <p className="text-sm font-mono text-primary">"[product A] vs [product B]"</p>
                    <p className="text-sm font-mono text-primary">"[product] alternatives"</p>
                    <p className="text-xs text-success">Conversion rate: 5-8%</p>
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border bg-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground font-bold">Best Lists</CardTitle>
                  <CardDescription className="space-y-2">
                    <p className="text-sm font-mono text-primary">"best [product] for [use case]"</p>
                    <p className="text-sm font-mono text-primary">"top [product] [year]"</p>
                    <p className="text-xs text-success">Conversion rate: 3-6%</p>
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border bg-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground font-bold">Buying Guides</CardTitle>
                  <CardDescription className="space-y-2">
                    <p className="text-sm font-mono text-primary">"how to choose [product]"</p>
                    <p className="text-sm font-mono text-primary">"[product] buying guide"</p>
                    <p className="text-xs text-success">Conversion rate: 2-4%</p>
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border bg-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground font-bold">Discount/Deal Keywords</CardTitle>
                  <CardDescription className="space-y-2">
                    <p className="text-sm font-mono text-primary">"[product] coupon code"</p>
                    <p className="text-sm font-mono text-primary">"[product] discount"</p>
                    <p className="text-xs text-success">Conversion rate: 8-12%</p>
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border bg-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground font-bold">Problem-Solution</CardTitle>
                  <CardDescription className="space-y-2">
                    <p className="text-sm font-mono text-primary">"best [product] for [problem]"</p>
                    <p className="text-sm font-mono text-primary">"[problem] solution"</p>
                    <p className="text-xs text-success">Conversion rate: 4-6%</p>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          <Separator className="my-12 bg-muted" />

          {/* Final CTA */}
          <Card className="border-2 border-primary/40 bg-card backdrop-blur-xl shadow-2xl">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                Start Earning More Commissions Today
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
                Join successful affiliate marketers who use NichePop to find profitable keywords and products
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary text-primary-foreground font-bold text-lg px-10 py-6 rounded-xl hover:-translate-y-0.5 transition-all duration-200">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                Free forever • No credit card required • ROI in your first sale
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
