"use client"

import { Navbar } from "@/components/navbar"
import { PricingCards } from "@/components/pricing-cards"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Sparkles } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Simple, Transparent Pricing
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Choose Your Plan
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Start free, upgrade anytime to unlock more insights and discover profitable opportunities
            </p>
          </div>

          {/* Pricing Cards */}
          <PricingCards />

          {/* Features List */}
          <div className="mt-20 pt-16 border-t border-border/40">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                All Plans Include
              </h2>
              <p className="text-muted-foreground">
                Everything you need to find and analyze trending keywords
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {[
                "Real-time keyword trends",
                "Competition analysis",
                "Search volume data",
                "CPC and profit metrics",
                "SERP feature analysis",
                "Opportunity scoring",
                "Historical trend data",
                "Export capabilities",
                "Mobile-friendly interface",
                "Regular data updates",
                "Priority support",
                "API access (Pro+)",
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-sm text-muted-foreground">
            <p>Need a custom plan? <a href="mailto:support@nichepop.com" className="text-indigo-600 hover:text-indigo-500 underline">Contact us</a></p>
          </div>
        </div>
      </footer>
    </div>
  )
}
