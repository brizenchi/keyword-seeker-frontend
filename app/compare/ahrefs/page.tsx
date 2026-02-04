'use client'

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Check, DollarSign, Zap, TrendingUp } from "lucide-react"

export default function CompareAhrefsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Compare", href: "/compare" },
              { label: "vs Ahrefs", href: "/compare/ahrefs" },
            ]}
            className="mb-8"
          />

          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 px-4 py-1.5">
              Tool Comparison
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              NichePop vs Ahrefs
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              An honest comparison to help you choose the best keyword research tool for your needs and budget
            </p>
          </div>

          {/* Quick Comparison */}
          <div className="grid gap-6 md:grid-cols-2 mb-16">
            <Card className="border-2 border-indigo-500/50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center justify-between">
                  NichePop
                  <Badge className="bg-green-600">Affordable</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Real-time trend tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Multi-source data (Reddit, Google Trends)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Opportunity scoring system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Profit estimation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Easy to use interface</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Free tier available</span>
                  </li>
                </ul>
                <Link href="/pricing">
                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
                    Start Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center justify-between">
                  Ahrefs
                  <Badge variant="outline">Enterprise</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$129</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Massive backlink database</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Comprehensive SEO suite</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Historical keyword data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Site audit tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Rank tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Content explorer</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://ahrefs.com" target="_blank" rel="noopener noreferrer">
                    Visit Ahrefs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Comparison Table */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
              Feature Comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-4 text-left">Feature</th>
                    <th className="border border-border p-4 text-center">NichePop</th>
                    <th className="border border-border p-4 text-center">Ahrefs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-4 font-semibold" colSpan={3}>
                      Pricing
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4">Entry price/month</td>
                    <td className="border border-border p-4 text-center font-semibold text-green-600">$29</td>
                    <td className="border border-border p-4 text-center">$129</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4">Free tier</td>
                    <td className="border border-border p-4 text-center">✅ Yes</td>
                    <td className="border border-border p-4 text-center">❌ No ($7 trial)</td>
                  </tr>

                  <tr>
                    <td className="border border-border p-4 font-semibold" colSpan={3}>
                      Keyword Research
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4">Real-time trend tracking</td>
                    <td className="border border-border p-4 text-center">✅</td>
                    <td className="border border-border p-4 text-center">❌</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4">Reddit integration</td>
                    <td className="border border-border p-4 text-center">✅</td>
                    <td className="border border-border p-4 text-center">❌</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4">Keyword database size</td>
                    <td className="border border-border p-4 text-center">Growing</td>
                    <td className="border border-border p-4 text-center">10B+ keywords</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4">Opportunity scoring</td>
                    <td className="border border-border p-4 text-center">✅ Advanced</td>
                    <td className="border border-border p-4 text-center">❌</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4">Profit estimation</td>
                    <td className="border border-border p-4 text-center">✅</td>
                    <td className="border border-border p-4 text-center">Limited</td>
                  </tr>

                  <tr>
                    <td className="border border-border p-4 font-semibold" colSpan={3}>
                      SEO Features
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4">Backlink analysis</td>
                    <td className="border border-border p-4 text-center">Basic</td>
                    <td className="border border-border p-4 text-center">✅ Extensive</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4">Site audit</td>
                    <td className="border border-border p-4 text-center">❌</td>
                    <td className="border border-border p-4 text-center">✅</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4">Rank tracking</td>
                    <td className="border border-border p-4 text-center">❌</td>
                    <td className="border border-border p-4 text-center">✅</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4">Content explorer</td>
                    <td className="border border-border p-4 text-center">❌</td>
                    <td className="border border-border p-4 text-center">✅</td>
                  </tr>

                  <tr>
                    <td className="border border-border p-4 font-semibold" colSpan={3}>
                      User Experience
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4">Learning curve</td>
                    <td className="border border-border p-4 text-center">Easy</td>
                    <td className="border border-border p-4 text-center">Steep</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4">Interface</td>
                    <td className="border border-border p-4 text-center">Modern, clean</td>
                    <td className="border border-border p-4 text-center">Data-heavy</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4">Mobile app</td>
                    <td className="border border-border p-4 text-center">Coming soon</td>
                    <td className="border border-border p-4 text-center">✅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Use Cases */}
          <div className="grid gap-8 md:grid-cols-2 mb-16">
            <Card className="border-2 border-indigo-500/50 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Choose NichePop if you:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Are a content creator, blogger, or solopreneur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Want to discover trending keywords early</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Need an affordable solution ($29/mo)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Focus on finding low-competition opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Want real-time trend data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Don't need extensive backlink analysis</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Choose Ahrefs if you:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Run an SEO agency with multiple clients</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Need comprehensive backlink analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Have a budget of $2,000+/year</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Want an all-in-one SEO suite</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Need site audit and rank tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Require historical data going back years</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Cost Savings */}
          <Card className="mb-16 border-2 border-green-500/50 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Zap className="h-6 w-6 text-green-600" />
                Save $1,200/year with NichePop
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                For most content creators and small businesses, NichePop provides everything you need at a fraction of the cost:
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 bg-background rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground">Ahrefs Lite (yearly)</p>
                  <p className="text-2xl font-bold">$1,548</p>
                </div>
                <div className="p-4 bg-background rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground">NichePop Pro (yearly)</p>
                  <p className="text-2xl font-bold text-green-600">$99</p>
                </div>
                <div className="p-4 bg-background rounded-lg border border-green-500">
                  <p className="text-sm text-muted-foreground">You save</p>
                  <p className="text-2xl font-bold text-green-600">$1,449</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Final CTA */}
          <Card className="border-2 border-indigo-500/20 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">
                Try NichePop Free Today
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Start discovering profitable keyword opportunities with real-time trend data. No credit card required.
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                Free forever • No credit card required • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
