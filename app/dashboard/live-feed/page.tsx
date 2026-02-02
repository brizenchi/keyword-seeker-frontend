"use client"

import { Suspense, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { LiveFeedList } from "@/components/live-feed-list"
import { CreditsBadge } from "@/components/credits-badge"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Rss, Filter, TrendingUp, Zap } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function LiveFeedPage() {
  const [sortBy, setSortBy] = useState("trending")
  const [filterBy, setFilterBy] = useState("all")

  const handleReset = () => {
    setSortBy("trending")
    setFilterBy("all")
  }

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={null}>
        <Sidebar />
      </Suspense>

      <main className="pl-16">
        <div className="p-6 max-w-[1400px] mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                  <Rss className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">Live Feed</h1>
                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                  <span className="relative flex h-2 w-2 mr-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Live
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Real-time trending keywords and opportunities</p>
            </div>
            <div className="flex items-center gap-4">
              {/* <Suspense fallback={null}> */}
            </div>
          </div>

          {/* Filters */}
          <Card className="p-4 border-border/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span>Filters:</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[160px] h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trending">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Trending
                        </div>
                      </SelectItem>
                      <SelectItem value="newest">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Newest
                        </div>
                      </SelectItem>
                      <SelectItem value="volume">Search Volume</SelectItem>
                      <SelectItem value="opportunity">Opportunity Score</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Category:</span>
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-[160px] h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" size="sm" className="ml-auto" onClick={handleReset}>
                  Reset Filters
                </Button>
              </div>
            </div>
          </Card>

          {/* Live Keywords Feed */}
          <Suspense fallback={<div>Loading...</div>}>
            <LiveFeedList sortBy={sortBy} filterBy={filterBy} />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
