"use client"

import { useState } from "react"
import { Lock, Sparkles } from "lucide-react"
import { KeywordCard } from "@/components/keyword-card"
import { PricingModal } from "@/components/pricing-modal"
import { Button } from "@/components/ui/button"

// Generate realistic trend data
const generateTrendData = (growth: number) => {
  const baseValue = 20
  const data: number[] = []
  for (let i = 0; i < 30; i++) {
    const progress = i / 29
    const trendValue = baseValue + (growth / 10) * progress
    const noise = (Math.random() - 0.5) * 10
    data.push(Math.max(0, trendValue + noise))
  }
  return data
}

const keywords = [
  { keyword: "MCP Servers", growth: 720, source: "Google Trends" },
  { keyword: "Agentic Workflow", growth: 580, source: "Reddit" },
  { keyword: "Local LLM", growth: 340, source: "Google Trends" },
  { keyword: "AI Code Review", growth: 290, source: "HackerNews" },
  { keyword: "RAG Pipeline", growth: 520, source: "Reddit" },
  { keyword: "Voice AI Agents", growth: 450, source: "Google Trends" },
  { keyword: "LLM Observability", growth: 180, source: "Reddit" },
  { keyword: "Prompt Caching", growth: 620, source: "Google Trends" },
]

export function RisingKeywords() {
  const [showPricing, setShowPricing] = useState(false)

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Rising Keywords</h2>
            <p className="text-sm text-muted-foreground">Emerging tech terms gaining traction</p>
          </div>
          <span className="font-mono text-xs text-muted-foreground">Updated 5 min ago</span>
        </div>

        <div className="relative">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {keywords.map((kw, index) => (
              <div key={kw.keyword} className="relative">
                <KeywordCard
                  keyword={kw.keyword}
                  growth={kw.growth}
                  source={kw.source}
                  trendData={generateTrendData(kw.growth)}
                />
                {/* Blur overlay for items after the first one */}
                {index > 0 && <div className="absolute inset-0 backdrop-blur-[6px] bg-background/40 rounded-xl" />}
              </div>
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
              <Button
                onClick={() => setShowPricing(true)}
                className="bg-indigo hover:bg-indigo/90 text-white shadow-lg shadow-indigo/25 gap-2 px-6 py-5 text-sm"
              >
                <Lock className="h-4 w-4" />
                Unlock Pro to see 15+ more insights
                <Sparkles className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <PricingModal open={showPricing} onOpenChange={setShowPricing} feature="Full Keyword Insights" />
    </>
  )
}
