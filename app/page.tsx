"use client"

import { Suspense, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { SearchBar } from "@/components/search-bar"
import { RisingKeywords } from "@/components/rising-keywords"
import { StatsCard } from "@/components/stats-card"
import { OpportunityFeed } from "@/components/opportunity-feed"
import { ActivityChart } from "@/components/activity-chart"
import { CreditsBadge } from "@/components/credits-badge"
import { TrendingUp, MessageSquare, Lightbulb, AlertTriangle } from "lucide-react"
import { TerminalLoader } from "@/components/terminal-loader"

export default function Dashboard() {
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleSearch = (query: string) => {
    if (!query.trim()) return
    setIsSearching(true)
    setShowResults(false)
  }

  const handleScanComplete = () => {
    setIsSearching(false)
    setShowResults(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={null}>
        <Sidebar />
      </Suspense>

      <main className="pl-16">
        <div className="p-6 max-w-[1600px] mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">IdeaMine</h1>
              <p className="text-sm text-muted-foreground">Discover startup opportunities from real user pain points</p>
            </div>
            <div className="flex items-center gap-4">
              <Suspense fallback={null}>
                <CreditsBadge credits={3} />
              </Suspense>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono text-muted-foreground">Live scanning</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <Suspense fallback={null}>
            <SearchBar onSearch={handleSearch} />
          </Suspense>

          {/* Loading State */}
          {isSearching ? (
            <div className="py-12">
              <TerminalLoader onComplete={handleScanComplete} />
            </div>
          ) : (
            <>
              {/* Stats Row */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                  title="Trending Keywords"
                  value="2,847"
                  change="+12% from last week"
                  changeType="positive"
                  icon={TrendingUp}
                  accentColor="indigo"
                />
                <StatsCard
                  title="Reddit Discussions"
                  value="14.2K"
                  change="+8% from last week"
                  changeType="positive"
                  icon={MessageSquare}
                  accentColor="green"
                />
                <StatsCard
                  title="Opportunities"
                  value="342"
                  change="+24 new today"
                  changeType="positive"
                  icon={Lightbulb}
                  accentColor="indigo"
                />
                <StatsCard
                  title="Pain Points"
                  value="189"
                  change="+15 new today"
                  changeType="neutral"
                  icon={AlertTriangle}
                  accentColor="rose"
                />
              </div>

              {/* Bento Grid Layout */}
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Rising Keywords - Takes 2 columns */}
                <div className="lg:col-span-2">
                  <Suspense fallback={null}>
                    <RisingKeywords showResults={showResults} />
                  </Suspense>
                </div>

                {/* Right Column - Activity Chart + Feed */}
                <div className="space-y-6">
                  <Suspense fallback={null}>
                    <ActivityChart />
                  </Suspense>
                  <Suspense fallback={null}>
                    <OpportunityFeed />
                  </Suspense>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
