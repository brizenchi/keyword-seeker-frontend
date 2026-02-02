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
  const greenColor = "#22c55e"

  // 获取趋势图标
  const TrendIcon = trendInfo.direction === 'up' ? TrendingUp : trendInfo.direction === 'down' ? TrendingDown : Minus

  return (
    <>
      <Card
        onClick={onClick}
        className={cn(
          "relative overflow-hidden border-border bg-card transition-all duration-300",
          "hover:border-indigo/50 hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.2)]",
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

        <CardHeader className="pb-3">
          <h3 className="text-lg font-bold text-foreground tracking-tight">{keyword.keyword}</h3>
          <Badge variant="outline" className="text-xs border-border text-muted-foreground font-mono w-fit">
            {keyword.search_intent_info?.main_intent || 'Unknown Intent'}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 机会价值比 - 主指标 */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg p-3 border border-indigo-200 dark:border-indigo-800">
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Opportunity Score</span>
            </div>
            <div className="font-mono text-2xl font-bold text-indigo-700 dark:text-indigo-300">
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
                <DollarSign className="h-3 w-3 text-green-600" />
                <span className="text-xs text-muted-foreground">Profit</span>
              </div>
              <div className="font-mono text-sm font-semibold text-foreground">
                {formatCurrency(metrics.profitOpportunity)}
              </div>
            </div>

            {/* 市场规模 */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-blue-600" />
                <span className="text-xs text-muted-foreground">Market</span>
              </div>
              <div className="font-mono text-sm font-semibold text-foreground">
                {formatCurrency(metrics.marketOpportunity)}
              </div>
            </div>

            {/* 搜索量 */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-purple-600" />
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
