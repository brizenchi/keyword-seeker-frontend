"use client"

import { useState } from "react"
import { Lock, Sparkles } from "lucide-react"
import { KeywordCard } from "@/components/keyword-card"
import { PricingModal } from "@/components/pricing-modal"
import { TrendDetailSheet } from "@/components/trend-detail-sheet"
import { Button } from "@/components/ui/button"
import { keywordsList, keywordDetails, KeywordDetail } from "@/lib/data"

interface RisingKeywordsProps {
  showResults?: boolean
}

export function RisingKeywords({ showResults = false }: RisingKeywordsProps) {
  const [showPricing, setShowPricing] = useState(false)
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordDetail | null>(null)

  const handleKeywordClick = (keywordName: string) => {
    const data = keywordDetails[keywordName]
    if (data) {
      setSelectedKeyword(data)
    }
  }

  // If showing search results, only show 2 items initially
  // Otherwise show standard behavior (or all items for now)
  const visibleLimit = showResults ? 2 : keywordsList.length

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {showResults ? "Search Results" : "Rising Keywords"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {showResults ? "Opportunities found matching your criteria" : "Emerging tech terms gaining traction"}
            </p>
          </div>
          <span className="font-mono text-xs text-muted-foreground">Updated 5 min ago</span>
        </div>

        <div className="relative">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {keywordsList.map((kw, index) => {
              const detail = keywordDetails[kw.keyword]
              const trendData = detail ? detail.trendData.map(d => d.value) : []
              
              // Logic for blur overlay:
              // If showResults is true, blur items after the first 2 (index >= 2)
              // If showResults is false (default view), use original behavior (index > 0 is blurred? No, original behavior was just blur everything > 0)
              // Wait, original behavior had: {index > 0 && <div className="absolute inset-0 backdrop-blur-[6px]... />}
              // Let's adapt:
              // Default View: Blur items > 0 (as before)
              // Search Result View: Blur items > 2
              
              const shouldBlur = showResults ? index >= 2 : index > 0
              
              return (
                <div key={kw.keyword} className="relative">
                  <KeywordCard
                    keyword={kw.keyword}
                    growth={kw.growth}
                    source={kw.source}
                    trendData={trendData}
                    onClick={() => handleKeywordClick(kw.keyword)}
                  />
                  
                  {shouldBlur && (
                    <div className="absolute inset-0 backdrop-blur-[6px] bg-background/40 rounded-xl z-10" />
                  )}
                </div>
              )
            })}
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="pointer-events-auto">
              <Button
                onClick={() => setShowPricing(true)}
                className="bg-indigo hover:bg-indigo/90 text-white shadow-lg shadow-indigo/25 gap-2 px-6 py-5 text-sm"
              >
                <Lock className="h-4 w-4" />
                Unlock Pro to see {keywordsList.length - (showResults ? 2 : 1)}+ more insights
                <Sparkles className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <PricingModal open={showPricing} onOpenChange={setShowPricing} feature="Full Keyword Insights" />
      <TrendDetailSheet 
        open={!!selectedKeyword} 
        onOpenChange={(open) => !open && setSelectedKeyword(null)} 
        data={selectedKeyword} 
      />
    </>
  )
}
