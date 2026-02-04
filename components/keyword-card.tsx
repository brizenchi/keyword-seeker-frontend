"use client"

import { useState } from "react"
import { Flame, TrendingUp, Lock, FileText, TrendingDown, Minus, Users, DollarSign, Target } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Sparkline } from "@/components/sparkline"
import { PricingModal } from "@/components/pricing-modal"
import { cn } from "@/lib/utils"
import type { Keyword } from "@/lib/types"
import {
  calculateKeywordMetrics,
  formatNumber,
  formatCurrency,
  formatPercentage,
  getOpportunityScoreGrade,
  getTrendDirection,
} from "@/lib/utils/keyword-metrics"

interface KeywordCardProps {
  keyword: Keyword
  trendData?: number[]
  onClick?: () => void
}

export function KeywordCard({ keyword, trendData, onClick }: KeywordCardProps) {
  const [showPricing, setShowPricing] = useState(false)

  // 计算所有指标
  const metrics = calculateKeywordMetrics(keyword)
  const opportunityGrade = getOpportunityScoreGrade(metrics.opportunityScore)
  const trendInfo = getTrendDirection(metrics.growthRate)

  const isHot = (metrics.growthRate ?? 0) >= 50
  const greenColor = "#10b981"

  // 获取趋势图标
  const TrendIcon = trendInfo.direction === 'up' ? TrendingUp : trendInfo.direction === 'down' ? TrendingDown : Minus

  return (
    <>
      <Card
        onClick={onClick}
        className={cn(
          "relative overflow-hidden border-[#1E2650] bg-[#0F1629] transition-all duration-300",
          "hover:border-[#67f745]/50 hover:shadow-[0_0_20px_rgba(103,247,69,0.15)] hover:-translate-y-1",
          isHot && "glow-hot border-[#67f745]/50",
          onClick && "cursor-pointer"
        )}
      >
        {isHot && (
          <div className="absolute right-3 top-3 flex items-center gap-1">
            <Flame className="h-4 w-4 text-[#67f745] animate-pulse" />
            <span className="text-xs font-bold text-[#67f745] font-mono">HOT</span>
          </div>
        )}

        <CardHeader className="pb-3">
          <h3 className="text-lg font-bold text-foreground tracking-tight">{keyword.keyword}</h3>
          <Badge variant="outline" className="text-xs border-border text-muted-foreground font-mono w-fit">
            {keyword.search_intent_info?.main_intent || 'Unknown Intent'}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 机会价值比 - 主指标 */}
          <div className="bg-gradient-to-br from-[#67f745]/15 to-[#0080FF]/15 rounded-lg p-3 border border-[#67f745]/30">
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-4 w-4 text-[#67f745]" />
              <span className="text-xs font-medium text-[#67f745]">Opportunity Score</span>
            </div>
            <div className="font-mono text-2xl font-bold text-[#67f745]">
              {formatNumber(metrics.opportunityScore)}
            </div>
            <span className={cn("text-xs font-medium", opportunityGrade.color)}>
              {opportunityGrade.label}
            </span>
          </div>

          {/* 次级指标网格 */}
          <div className="grid grid-cols-2 gap-2">
            {/* 利润预估 */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3 text-[#10b981]" />
                <span className="text-xs text-muted-foreground">Profit</span>
              </div>
              <div className="font-mono text-sm font-semibold text-foreground">
                {formatCurrency(metrics.profitOpportunity)}
              </div>
            </div>

            {/* 市场规模 */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-[#06b6d4]" />
                <span className="text-xs text-muted-foreground">Market</span>
              </div>
              <div className="font-mono text-sm font-semibold text-foreground">
                {formatCurrency(metrics.marketOpportunity)}
              </div>
            </div>

            {/* 搜索量 */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-[#8b5cf6]" />
                <span className="text-xs text-muted-foreground">Volume</span>
              </div>
              <div className="font-mono text-sm font-semibold text-foreground">
                {formatNumber(metrics.searchVolume)}
              </div>
            </div>

            {/* 增长率 */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <TrendIcon className={cn("h-3 w-3", trendInfo.color)} />
                <span className="text-xs text-muted-foreground">Growth</span>
              </div>
              <div className={cn("font-mono text-sm font-semibold", trendInfo.color)}>
                {formatPercentage(metrics.growthRate)}
              </div>
            </div>
          </div>

          {/* 趋势图 (可选) */}
          {trendData && trendData.length > 0 && (
            <div className="h-8">
              <Sparkline data={trendData} color={greenColor} />
            </div>
          )}
        </CardContent>
      </Card>

      <PricingModal open={showPricing} onOpenChange={setShowPricing} feature="AI Business Plan Generator" />
    </>
  )
}
