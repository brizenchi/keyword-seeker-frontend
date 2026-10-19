'use client'

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, ShoppingCart, TrendingUp, Youtube } from "lucide-react"

const useCases = [
  {
    slug: 'bloggers',
    title: 'For Bloggers & Content Creators',
    icon: FileText,
    description: 'Find trending topics and low-competition keywords to grow your blog traffic and authority',
    benefits: [
      'Discover trending blog topics before they saturate',
      'Find long-tail keywords with high conversion potential',
      'Identify content gaps in your niche',
      'Track what your audience is searching for',
    ],
  },
  {
    slug: 'affiliate-marketing',
    title: 'For Affiliate Marketers',
    icon: TrendingUp,
    description: 'Discover profitable products and keywords with high buyer intent to maximize your affiliate commissions',
    benefits: [
      'Find high-converting product keywords',
      'Identify trending products early',
      'Analyze competition for affiliate niches',
      'Estimate potential revenue from keywords',
    ],
  },
  {
    slug: 'ecommerce',
    title: 'For E-commerce Sellers',
    icon: ShoppingCart,
    description: 'Optimize product listings and find profitable niches for your online store',
    benefits: [
      'Find trending products to sell',
      'Optimize product titles and descriptions',
      'Discover niche markets with low competition',
      'Track seasonal keyword trends',
    ],
  },
  {
    slug: 'content-creators',
    title: 'For YouTube & Video Creators',
    icon: Youtube,
    description: 'Find trending video topics and optimize your content for maximum views',
    benefits: [
      'Discover viral video topics early',
      'Optimize video titles and descriptions',
      'Find niche audiences to target',
      'Track trending discussions',
    ],
  },
]

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-card text-success border-border px-4 py-1.5 backdrop-blur-sm">
              Use Cases
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
              Keyword Research for Every Industry
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
              See how professionals across different industries use NichePop to discover profitable keywords and trending opportunities
            </p>
          </div>

          {/* Use Cases Grid */}
          <div className="grid gap-8 md:grid-cols-2 mb-16">
            {useCases.map((useCase) => {
              const Icon = useCase.icon
              return (
                <Link key={useCase.slug} href={`/use-cases/${useCase.slug}`}>
                  <Card className="h-full border-border hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer bg-card backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl text-foreground hover:text-primary transition-colors">
                        {useCase.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                        {useCase.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {useCase.benefits.slice(0, 3).map((benefit, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-success">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6">
                        <Button variant="outline" className="w-full border-border bg-transparent text-foreground hover:bg-primary-soft hover:border-primary/40">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          {/* CTA Section */}
          <Card className="border-2 border-primary/40 bg-card backdrop-blur-xl shadow-2xl">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                Start Finding Keywords for Your Industry
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
                No matter your industry or niche, NichePop helps you discover profitable keyword opportunities
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary text-primary-foreground font-bold text-lg px-10 py-6 rounded-xl hover:-translate-y-0.5 transition-all duration-200">
                  Start Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                Free forever • No credit card required
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
