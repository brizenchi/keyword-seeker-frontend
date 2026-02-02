"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Search,
  Zap,
  Target,
  BarChart3,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Flame
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            <Badge className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Discover Your Next Big Opportunity
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Find Trending Keywords
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Before Everyone Else
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover high-potential keywords with low competition. Analyze search trends,
              competition levels, and profit opportunities in real-time.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-base px-8">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="text-base px-8">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Free trial included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Everything You Need to Find Winning Keywords
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful tools to discover, analyze, and capitalize on trending opportunities
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Real-Time Trends</CardTitle>
                <CardDescription>
                  Track keyword trends as they happen with live data from Google and social platforms
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Competition Analysis</CardTitle>
                <CardDescription>
                  Identify low-competition keywords with high search volume for maximum ROI
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 mb-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Profit Estimation</CardTitle>
                <CardDescription>
                  Calculate potential revenue with CPC data and search volume metrics
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 mb-4">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <CardTitle>SERP Analysis</CardTitle>
                <CardDescription>
                  Analyze search results to understand what content ranks and why
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Instant Insights</CardTitle>
                <CardDescription>
                  Get actionable insights in seconds with our AI-powered analysis engine
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 mb-4">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Opportunity Score</CardTitle>
                <CardDescription>
                  Proprietary scoring system to rank keywords by profit potential
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-2 border-indigo-500/20 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20">
            <CardContent className="p-12 text-center space-y-6">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600">
                  <Flame className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Ready to Find Your Next Opportunity?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of marketers and entrepreneurs discovering profitable keywords every day
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-base px-8">
                  Start Exploring Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                <Flame className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                NichePop
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 NichePop. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
