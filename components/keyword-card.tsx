"use client"

import { useState } from "react"
import { Flame, TrendingUp, TrendingDown, Minus, DollarSign, Target } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Sparkline } from "@/components/sparkline"
import { PricingModal } from "@/components/pricing-modal"
import { cn } from "@/lib/utils"
import type { Keyword } from "@/lib/types"

interface KeywordCardProps {
  keyword: Keyword
  trendData?: number[]
  onClick?: () => void
}

// 格式化数字
function formatNumber(num: number | null): string {
  if (num === null || typeof num !== 'number' || isNaN(num)) {
    return '0';
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toFixed(0);
}

// 格式化货币
function formatCurrency(num: number | null): string {
  return `$${formatNumber(num)}`;
}

// 格式化百分比
function formatPercentage(num: number | null): string {
  if (num === null || typeof num !== 'number' || isNaN(num)) {
    return '0.0%';
  }
  return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;
}

// 获取竞争等级显示
function getCompetitionDisplay(level: string | null): { label: string; color: string } {
  switch (level?.toLowerCase()) {
    case 'low':
      return { label: 'Low', color: 'text-green-600' };
    case 'medium':
      return { label: 'Medium', color: 'text-yellow-600' };
    case 'high':
      return { label: 'High', color: 'text-red-600' };
    default:
      return { label: 'Unknown', color: 'text-gray-600' };
  }
}

// 获取增长趋势
function getTrendDirection(growthRate: number | null): {
  direction: 'up' | 'down' | 'flat';
  color: string;
} {
  const rate = growthRate ?? 0;
  if (rate > 5) {
    return { direction: 'up', color: 'text-green-600' };
  }
  if (rate < -5) {
    return { direction: 'down', color: 'text-red-600' };
  }
  return { direction: 'flat', color: 'text-yellow-600' };
}

export function KeywordCard({ keyword, trendData, onClick }: KeywordCardProps) {
  const [showPricing, setShowPricing] = useState(false)

  const growthRate = keyword.growth_rate ?? 0
  const isHot = growthRate >= 50
  const isNew = growthRate >= 30
  const isHighDemand = (keyword.search_volume ?? 0) >= 10000
  const trendInfo = getTrendDirection(growthRate)
  const competitionInfo = getCompetitionDisplay(keyword.competition_level)

  const TrendIcon = trendInfo.direction === 'up' ? TrendingUp : trendInfo.direction === 'down' ? TrendingDown : Minus

  // Calculate total score
  const totalScore = Math.round(
    (growthRate ?? 0) * 0.3 +
    (keyword.search_volume ?? 0) / 100 * 0.3 +
    (100 - (keyword.competition_score ?? 50)) * 0.4
  )

  return (
    <>
      <Card
        onClick={onClick}
        className={cn(
          "relative overflow-hidden border-[#1E2650] bg-[#0F1629] transition-all duration-300 h-full flex flex-col group",
          "hover:border-[#67f745]/50 hover:shadow-[0_0_20px_rgba(103,247,69,0.15)] hover:scale-[1.02]",
          isHot && "glow-hot border-[#67f745]/50",
          onClick && "cursor-pointer"
        )}
      >
        <CardHeader className="pb-4">
          {/* Top section */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 min-w-0 pr-3">
              {/* Category and special badges */}
              <div className="flex items-center gap-2 mb-2">
                {keyword.category && (
                  <span className="px-2 py-0.5 rounded bg-[#0080FF]/10 text-[9px] text-[#0080FF] font-medium uppercase">
                    {keyword.category}
                  </span>
                )}
                {isNew && (
                  <span className="px-2 py-0.5 rounded bg-[#0080FF] text-white text-[9px] font-bold uppercase">
                    New
                  </span>
                )}
                {isHighDemand && (
                  <span className="px-2 py-0.5 rounded bg-[#ff6b6b] text-white text-[9px] font-bold uppercase">
                    High Demand
                  </span>
                )}
                {isHot && (
                  <div className="flex items-center gap-0.5">
                    <Flame className="h-3 w-3 text-[#67f745] animate-pulse" />
                  </div>
                )}
              </div>
              {/* Keyword title */}
              <h3 className="text-lg font-bold text-white group-hover:text-[#67f745] transition-colors break-words">
                {keyword.keyword}
              </h3>
            </div>
            {/* Total score */}
            <div className="px-3 py-1.5 rounded-full text-xs font-bold shrink-0 bg-[#67f745]/10 text-[#67f745] border border-[#67f745]/30">
              {totalScore}/100
            </div>
          </div>

          {/* Source tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {keyword.source && (
              <span className="px-2 py-0.5 rounded border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 text-[10px] text-[#8b5cf6] font-medium">
                {keyword.source}
              </span>
            )}
            {growthRate > 0 && (
              <span className="px-2 py-0.5 rounded border border-[#0080FF]/30 bg-[#0080FF]/10 text-[10px] text-[#0080FF] font-medium">
                {formatPercentage(growthRate)} growth
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex-grow flex flex-col">
          {/* Description */}
          {keyword.intent && (
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              {keyword.intent}
            </p>
          )}

          {/* Bottom section: Competition + Revenue with gradient backgrounds */}
          <div className="space-y-3 mt-auto">
            {/* Est. Revenue */}
            <div className="bg-gradient-to-br from-[#67f745]/15 to-[#0080FF]/15 rounded-lg p-4 border border-[#67f745]/30">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="h-4 w-4 text-[#67f745]" />
                <span className="text-[9px] text-[#67f745] uppercase font-medium">Est. Revenue</span>
              </div>
              <div className="font-mono text-2xl font-bold text-[#67f745]">
                {formatCurrency(keyword.profit_estimation)}
              </div>
            </div>

            {/* Competition */}
            <div className="bg-gradient-to-br from-[#8b5cf6]/15 to-[#0080FF]/15 rounded-lg p-4 border border-[#8b5cf6]/30">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-[#8b5cf6]" />
                <span className="text-[9px] text-[#8b5cf6] uppercase font-medium">Competition</span>
              </div>
              <div className={cn("text-lg font-bold", competitionInfo.color)}>
                {competitionInfo.label}
              </div>
            </div>
          </div>
        </CardContent>

        {/* Hover arrow indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[#67f745] text-lg">→</span>
        </div>
      </Card>

      <PricingModal open={showPricing} onOpenChange={setShowPricing} feature="AI Business Plan Generator" />
    </>
  )
}
