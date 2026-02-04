'use client'

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, X } from "lucide-react"

const comparisons = [
  {
    slug: 'ahrefs',
    name: 'Ahrefs',
    description: 'Compare NichePop with Ahrefs - features, pricing, and which is best for your needs',
    pricing: 'From $129/mo',
    ourPricing: 'From $29/mo',
    pros: ['Extensive backlink database', 'Comprehensive SEO suite', 'Historical data'],
    cons: ['Expensive', 'Steep learning curve', 'Overkill for beginners'],
  },
  {
    slug: 'semrush',
    name: 'SEMrush',
    description: 'NichePop vs SEMrush - which keyword research tool offers better value?',
    pricing: 'From $139/mo',
    ourPricing: 'From $29/mo',
    pros: ['All-in-one marketing suite', 'Competitor analysis', 'Content marketing tools'],
    cons: ['Very expensive', 'Complex interface', 'Limited searches on lower tiers'],
  },
  {
    slug: 'keyword-tool-io',
    name: 'KeywordTool.io',
    description: 'Compare NichePop with KeywordTool.io for keyword research capabilities',
    pricing: 'From $89/mo',
    ourPricing: 'From $29/mo',
    pros: ['Google Autocomplete data', 'Multiple platforms', 'Long-tail keywords'],
    cons: ['No competition data on free plan', 'Limited filtering', 'No trend analysis'],
  },
]

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 px-4 py-1.5">
              Tool Comparisons
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Compare Keyword Research Tools
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Find the best keyword research tool for your needs and budget with our honest, detailed comparisons
            </p>
          </div>

          {/* Comparison Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {comparisons.map((comparison) => (
              <Card key={comparison.slug} className="border-border/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl">
                      vs {comparison.name}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    {comparison.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-xs text-muted-foreground">{comparison.name}</p>
                        <p className="text-sm font-semibold">{comparison.pricing}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">NichePop</p>
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">{comparison.ourPricing}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">Pros</p>
                      {comparison.pros.map((pro, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">Cons</p>
                      {comparison.cons.map((con, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <X className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Link href={`/compare/${comparison.slug}`}>
                      <Button variant="outline" className="w-full">
                        Full Comparison
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Why Choose NichePop Section */}
          <div className="mt-20 pt-16 border-t border-border/40">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Why Choose NichePop?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                While other tools focus on comprehensive SEO suites, NichePop is laser-focused on one thing: helping you discover profitable keyword opportunities
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Affordable Pricing</CardTitle>
                  <CardDescription>
                    Starting at just $19/month, NichePop costs 70-80% less than competitors while delivering focused keyword research capabilities
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Real-Time Trends</CardTitle>
                  <CardDescription>
                    Discover trending keywords before your competition with live data from Reddit, Google Trends, and more
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Easy to Use</CardTitle>
                  <CardDescription>
                    No steep learning curve. Start finding keyword opportunities in minutes, not hours
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20">
            <Card className="border-2 border-indigo-500/20 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20">
              <CardContent className="p-12 text-center space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">
                  Try NichePop Free
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Start discovering profitable keyword opportunities today. No credit card required.
                </p>
                <Link href="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
                    Start Free Trial
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
