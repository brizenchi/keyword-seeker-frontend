"use client"

import { useState } from "react"
import { Flame, TrendingUp, Lock, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Sparkline } from "@/components/sparkline"
import { PricingModal } from "@/components/pricing-modal"
import { cn } from "@/lib/utils"

interface KeywordCardProps {
  keyword: string
  growth: number
  source: string
  trendData: number[]
  onClick?: () => void
}

export function KeywordCard({ keyword, growth, source, trendData, onClick }: KeywordCardProps) {
  const [showPricing, setShowPricing] = useState(false)
  const isHot = growth >= 500
  const greenColor = "#22c55e"

  return (
    <>
      <Card
        onClick={onClick}
        className={cn(
          "relative overflow-hidden border-border bg-card transition-all duration-300",
          "hover:border-indigo/50 hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.2)]", // Border Beam / Glow effect
          isHot && "glow-hot border-rose/50",
          onClick && "cursor-pointer"
        )}
      >
        {isHot && (
          <div className="absolute right-3 top-3 flex items-center gap-1">
            <Flame className="h-4 w-4 text-rose animate-pulse" />
            <span className="text-xs font-bold text-rose font-mono">HOT</span>
          </div>
        )}

        <CardHeader className="pb-2">
          <h3 className="text-lg font-bold text-foreground tracking-tight">{keyword}</h3>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-end gap-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" style={{ color: greenColor }} />
              <span className="font-mono text-3xl font-bold tracking-tighter" style={{ color: greenColor }}>
                +{growth}%
              </span>
            </div>
            <span className="text-xs text-muted-foreground mb-1">30d growth</span>
          </div>

          <div className="h-10">
            <Sparkline data={trendData} color={greenColor} />
          </div>

          <div className="flex items-center justify-between gap-2">
            <Badge variant="outline" className="text-xs border-border text-muted-foreground font-mono">
              Source: {source}
            </Badge>

            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-muted-foreground hover:text-indigo gap-1 px-2 font-mono"
              onClick={() => setShowPricing(true)}
            >
              <FileText className="h-3 w-3" />
              Business Plan
              <Lock className="h-3 w-3 text-indigo" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <PricingModal open={showPricing} onOpenChange={setShowPricing} feature="AI Business Plan Generator" />
    </>
  )
}
