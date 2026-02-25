"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RisingKeywords } from "@/components/rising-keywords"
import { StatsCard } from "@/components/stats-card"
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
    <div className="min-h-screen bg-[#0A0E27] relative">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(30, 38, 80, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 38, 80, 0.3) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0080FF]/20 rounded-full blur-3xl animate-gentle-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#39FF14]/10 rounded-full blur-3xl animate-gentle-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar />

      <main className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto min-w-[1200px] max-w-7xl px-8 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Dashboard</h1>
              <p className="text-sm text-[#8B92B3] font-light mt-1">Discover trending niche opportunities from real user insights</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#39FF14] animate-pulse" />
              <span className="text-xs font-mono text-[#8B92B3]">Live scanning</span>
            </div>
          </div>

          {/* Search Bar */}
          {/* <SearchBar onSearch={handleSearch} /> */}

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

              {/* Rising Keywords - Full Width */}
              <RisingKeywords showResults={showResults} />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
