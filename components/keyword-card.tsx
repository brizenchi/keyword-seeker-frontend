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
      return { label: 'Low Competition', color: 'text-green-600' };
    case 'medium':
      return { label: 'Medium Competition', color: 'text-yellow-600' };
    case 'high':
      return { label: 'High Competition', color: 'text-red-600' };
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
  const trendInfo = getTrendDirection(growthRate)
  const competitionInfo = getCompetitionDisplay(keyword.competition_level)
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
            {keyword.competition_level || 'Unknown'}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 利润预估 - 主指标 */}
          <div className="bg-gradient-to-br from-[#67f745]/15 to-[#0080FF]/15 rounded-lg p-3 border border-[#67f745]/30">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-[#67f745]" />
              <span className="text-xs font-medium text-[#67f745]">Profit Estimation</span>
            </div>
            <div className="font-mono text-2xl font-bold text-[#67f745]">
              {formatCurrency(keyword.profit_estimation)}
            </div>
          </div>

          {/* 次级指标网格 */}
          <div className="grid grid-cols-2 gap-3">
            {/* 增长率 */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <TrendIcon className={cn("h-3 w-3", trendInfo.color)} />
                <span className="text-xs text-muted-foreground">Growth</span>
              </div>
              <div className={cn("font-mono text-sm font-semibold", trendInfo.color)}>
                {formatPercentage(growthRate)}
              </div>
            </div>

            {/* 竞争等级 */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Target className="h-3 w-3 text-[#8b5cf6]" />
                <span className="text-xs text-muted-foreground">Competition</span>
              </div>
              <div className={cn("text-xs font-semibold", competitionInfo.color)}>
                {competitionInfo.label}
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
