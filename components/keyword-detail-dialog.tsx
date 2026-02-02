"use client"

import { useEffect, useState } from "react"
import {
  Target,
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  DollarSign,
  Star,
  Award,
  Activity,
  BarChart3,
  Sparkles,
  HelpCircle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { keywordService } from "@/lib/api"
import type { KeywordDetailData } from "@/lib/types"
import {
  calculateProfitOpportunity,
  calculateMarketOpportunity,
  formatNumber,
  formatCurrency,
  formatPercentage,
  getCompetitionStars,
  getTrendDirection,
  getOpportunityScoreGrade,
  calculateOpportunityScore,
} from "@/lib/utils/keyword-metrics"
import { SearchVolumeChart } from "@/components/search-volume-chart"

interface KeywordDetailDialogProps {
  keywordId: number | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

// 从 response_result 中提取嵌套字段 (兼容处理)
function extractNestedFields(data: any) {
  try {
    const overviewItem = data.response_result?.overview?.items?.[0];

    if (!overviewItem) {
      return data;
    }

    // 如果根目录缺失 serp_info，从深层提取
    if (!data.serp_info && overviewItem.serp_info) {
      data.serp_info = overviewItem.serp_info;
    }

    // 如果根目录缺失 search_intent_info，从深层提取
    if (!data.search_intent_info && overviewItem.search_intent_info) {
      data.search_intent_info = overviewItem.search_intent_info;
    }

    return data;
  } catch (e) {
    console.warn('Failed to extract nested fields:', e);
    return data;
  }
}

// 指标帮助提示组件
function MetricHelp({
  formula,
  description,
  example
}: {
  formula: string
  description?: string
  example?: string
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center ml-1 hover:scale-110 transition-transform duration-200">
          <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 cursor-help transition-colors" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 sm:w-96 p-3 sm:p-4 space-y-2.5 sm:space-y-3 shadow-lg border-border/50" align="start">
        <div>
          <h4 className="font-semibold text-xs sm:text-sm mb-1.5 sm:mb-2 text-foreground">Calculation Formula</h4>
          <p className="text-xs sm:text-sm font-mono bg-muted/70 p-2 rounded-md leading-relaxed">{formula}</p>
        </div>
        {description && (
          <div>
            <h4 className="font-semibold text-xs sm:text-sm mb-1.5 sm:mb-2 text-foreground">Description</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        )}
        {example && (
          <div>
            <h4 className="font-semibold text-xs sm:text-sm mb-1.5 sm:mb-2 text-foreground">Example</h4>
            <p className="text-xs sm:text-sm text-muted-foreground font-mono leading-relaxed">{example}</p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export function KeywordDetailDialog({ keywordId, open, onOpenChange }: KeywordDetailDialogProps) {
  const [loading, setLoading] = useState(false)
  const [detail, setDetail] = useState<KeywordDetailData | null>(null)

  useEffect(() => {
    const fetchDetail = async () => {
      if (!keywordId || !open) return

      try {
        setLoading(true)
        const data = await keywordService.getDetail(keywordId)

        console.log('📊 Raw API response:', data)
        console.log('📊 Has serp_info at root?', !!data.serp_info)
        console.log('📊 Has search_intent_info at root?', !!data.search_intent_info)

        // 从 response_result 深层提取缺失的字段 (serp_info, search_intent_info)
        const processedData = extractNestedFields(data);

        console.log('✅ After extractNestedFields:', processedData)
        console.log('✅ Has serp_info after extraction?', !!processedData.serp_info)
        console.log('✅ Has search_intent_info after extraction?', !!processedData.search_intent_info)
        console.log('✅ CPC value:', processedData.cpc)
        console.log('✅ All numeric fields:', {
          cpc: processedData.cpc,
          low_top_of_page_bid: processedData.low_top_of_page_bid,
          high_top_of_page_bid: processedData.high_top_of_page_bid,
          'avg_backlinks_info.rank': processedData.avg_backlinks_info?.rank,
          'avg_backlinks_info.main_domain_rank': processedData.avg_backlinks_info?.main_domain_rank
        })

        setDetail(processedData)
      } catch (error) {
        console.error('❌ Failed to fetch keyword detail:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [keywordId, open])

  if (!detail && !loading) {
    return null
  }

  // 计算指标
  const opportunityScore = detail
    ? calculateOpportunityScore(detail.profit_estimation, detail.growth_rate, detail.competition_score)
    : 0
  const profitOpportunity = detail
    ? calculateProfitOpportunity(detail.profit_estimation, detail.growth_rate, detail.competition_score)
    : 0
  const marketOpportunity = detail
    ? calculateMarketOpportunity(detail.search_volume, detail.cpc, detail.growth_rate, detail.competition_score)
    : 0

  const opportunityGrade = getOpportunityScoreGrade(opportunityScore)
  const competitionStars = detail ? getCompetitionStars(detail.competition_score) : 0
  const trendInfo = detail ? getTrendDirection(detail.growth_rate) : { direction: 'flat' as const, color: 'text-gray-600' }
  const TrendIcon = trendInfo.direction === 'up' ? TrendingUp : trendInfo.direction === 'down' ? TrendingDown : Minus

  // 加载中时不显示对话框内容
  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <div className="flex flex-col items-center justify-center py-10 sm:py-12 gap-4 sm:gap-5">
            <div className="relative">
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border-4 border-indigo-100 dark:border-indigo-900/50" />
              <div className="absolute inset-0 h-14 w-14 sm:h-16 sm:w-16 rounded-full border-4 border-indigo-600 dark:border-indigo-500 border-t-transparent animate-spin" />
            </div>
            <div className="text-center space-y-1.5 sm:space-y-2">
              <div className="font-semibold text-base sm:text-lg text-foreground">Loading Keyword Details</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Please wait a moment...</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] lg:max-w-[80vw] xl:max-w-[75vw] w-full max-h-[92vh] p-0 gap-0">
        {detail ? (
          <>
            <DialogHeader className="px-6 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 border-b bg-gradient-to-r from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/30 dark:to-purple-950/30 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <DialogTitle className="text-2xl sm:text-3xl font-bold tracking-tight mb-1.5 sm:mb-2 break-words">{detail.keyword}</DialogTitle>
                  <DialogDescription className="text-sm sm:text-base text-muted-foreground">
                    Comprehensive keyword analysis and opportunity insights
                  </DialogDescription>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 text-sm font-semibold shadow-sm">
                    Score: {formatNumber(opportunityScore)}
                  </Badge>
                </div>
              </div>
            </DialogHeader>

            <ScrollArea className="h-[calc(92vh-10rem)] sm:h-[calc(92vh-11rem)]">
            <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-6 sm:space-y-8">
              {/* 核心指标总览 */}
              <Card className="border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50/90 to-purple-50/90 dark:from-indigo-950/40 dark:to-purple-950/40 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 text-lg sm:text-xl">
                    <Target className="h-5 w-5 sm:h-6 sm:w-6" />
                    Opportunity Score
                    <MetricHelp
                      formula="(Profit Estimation × Growth Rate) / Competition Score"
                      description="This score represents the overall business opportunity by balancing profit potential, growth momentum, and competitive difficulty. Higher scores indicate better opportunities."
                      example="If Profit Est. = $500K, Growth = 10%, Competition = 80, then Score = (500,000 × 10) / 80 = 62,500"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="flex items-end gap-3 sm:gap-4">
                    <div className="font-mono text-4xl sm:text-5xl font-bold text-indigo-700 dark:text-indigo-300 leading-none">
                      {formatNumber(opportunityScore)}
                    </div>
                    <Badge className={cn("mb-1 sm:mb-2 text-sm sm:text-base px-2.5 sm:px-3 py-1 font-semibold shadow-sm", opportunityGrade.color)}>
                      {opportunityGrade.label}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 pt-3 sm:pt-4 border-t border-indigo-200 dark:border-indigo-800">
                    <div className="bg-white/60 dark:bg-black/30 rounded-xl p-3 sm:p-4 hover:bg-white/80 dark:hover:bg-black/40 transition-colors duration-200 shadow-sm">
                      <div className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2 flex items-center gap-1">
                        Search Volume
                        <MetricHelp
                          formula="Monthly search volume"
                          description="The average number of times this keyword is searched per month. This data comes from Google's search volume estimates via DataForSEO."
                          example="5,000,000 = 5 million searches per month"
                        />
                      </div>
                      <div className="font-mono text-xl sm:text-2xl font-bold text-foreground leading-tight">{formatNumber(detail.search_volume ?? 0)}</div>
                    </div>
                    <div className="bg-white/60 dark:bg-black/30 rounded-xl p-3 sm:p-4 hover:bg-white/80 dark:hover:bg-black/40 transition-colors duration-200 shadow-sm">
                      <div className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2 flex items-center gap-1">
                        Growth Rate
                        <MetricHelp
                          formula="(Current Volume - Previous Volume) / Previous Volume × 100%"
                          description="The percentage change in search volume compared to the previous period. Positive growth indicates increasing interest in this keyword."
                          example="If volume grew from 4M to 5M, Growth = (5M - 4M) / 4M × 100% = 25%"
                        />
                      </div>
                      <div className={cn("font-mono text-xl sm:text-2xl font-bold flex items-center gap-2 leading-tight", trendInfo.color)}>
                        <TrendIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        {formatPercentage(detail.growth_rate ?? 0)}
                      </div>
                    </div>
                    <div className="bg-white/60 dark:bg-black/30 rounded-xl p-3 sm:p-4 hover:bg-white/80 dark:hover:bg-black/40 transition-colors duration-200 shadow-sm">
                      <div className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2 flex items-center gap-1">
                        CPC
                        <MetricHelp
                          formula="Cost Per Click (Average)"
                          description="The average amount advertisers pay when someone clicks their ad for this keyword. Higher CPC indicates higher commercial value and advertiser demand."
                          example="CPC of $0.29 means advertisers pay about $0.29 per click on average"
                        />
                      </div>
                      <div className="font-mono text-xl sm:text-2xl font-bold text-green-600 dark:text-green-500 leading-tight">${(detail.cpc ?? 0).toFixed(2)}</div>
                    </div>
                    <div className="bg-white/60 dark:bg-black/30 rounded-xl p-3 sm:p-4 hover:bg-white/80 dark:hover:bg-black/40 transition-colors duration-200 shadow-sm">
                      <div className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2 flex items-center gap-1">
                        Competition
                        <MetricHelp
                          formula="Competition Score: 0-100"
                          description="Measures how many advertisers are bidding on this keyword. Score of 0 = no competition, 100 = maximum competition. Based on the number and intensity of ad bids."
                          example="Score of 100 (HIGH) means many advertisers are competing for this keyword"
                        />
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant={detail.competition_level === 'HIGH' ? 'destructive' : detail.competition_level === 'MEDIUM' ? 'default' : 'secondary'} className="text-xs sm:text-sm font-semibold">
                          {detail.competition_level ?? 'N/A'}
                        </Badge>
                        <span className="text-xs sm:text-sm font-mono text-muted-foreground">({detail.competition_score ?? 0})</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 sm:pt-6 border-t border-indigo-200 dark:border-indigo-800">
                    <div className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2 flex items-center gap-1">
                      Top of Page Bid Range
                      <MetricHelp
                        formula="Low Bid - High Bid"
                        description="The estimated cost range to secure top-of-page ad placement for this keyword. Lower bound represents minimum competitive bid, upper bound represents premium placement cost."
                        example="$0.83 - $0.96 means you need to bid between these amounts for top placement"
                      />
                    </div>
                    <div className="font-mono text-lg sm:text-xl font-bold text-foreground">
                      ${(detail.low_top_of_page_bid ?? 0).toFixed(2)} - ${(detail.high_top_of_page_bid ?? 0).toFixed(2)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 机会价值详解 */}
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-border/50">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                    Opportunity Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  {/* 难易程度 */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <span className="text-xs sm:text-sm font-medium flex items-center gap-1">
                        Difficulty Level
                        <MetricHelp
                          formula="Based on Competition Score"
                          description="Star rating inversely correlates with competition: 5★ = Very Easy (Score <20), 4★ = Easy (20-39), 3★ = Medium (40-59), 2★ = Hard (60-79), 1★ = Very Hard (≥80). More stars mean easier to rank."
                          example="Competition Score 100 → 1★ (Very Hard to rank)"
                        />
                      </span>
                      <div className="flex items-center gap-1 flex-wrap">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-3.5 w-3.5 sm:h-4 sm:w-4",
                              i < competitionStars
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            )}
                          />
                        ))}
                        <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-muted-foreground">
                          ({competitionStars}/5 - {competitionStars >= 4 ? 'Easy' : competitionStars >= 3 ? 'Medium' : 'Hard'})
                        </span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {competitionStars >= 4
                        ? "Low competition - Good opportunity for new entrants"
                        : competitionStars >= 3
                        ? "Moderate competition - Requires strategic approach"
                        : "High competition - Challenging for new sites"}
                    </p>
                  </div>

                  <Separator />

                  {/* SEO难度指标 */}
                  {detail.avg_backlinks_info && (
                    <div>
                      <div className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 flex items-center gap-1">
                        SEO Requirements
                        <MetricHelp formula="Average metrics of top-ranking pages for this keyword" />
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                        <div className="space-y-1 bg-muted/30 rounded-lg p-2 sm:p-3">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            Avg. Backlinks
                            <MetricHelp formula="Average number of backlinks to rank" />
                          </span>
                          <div className="font-mono text-sm font-semibold">{formatNumber(detail.avg_backlinks_info.backlinks ?? 0)}</div>
                        </div>
                        <div className="space-y-1 bg-muted/30 rounded-lg p-2 sm:p-3">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            Referring Domains
                            <MetricHelp formula="Average unique domains linking to ranking pages" />
                          </span>
                          <div className="font-mono text-sm font-semibold">{formatNumber(detail.avg_backlinks_info.referring_domains ?? 0)}</div>
                        </div>
                        <div className="space-y-1 bg-muted/30 rounded-lg p-2 sm:p-3">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            Domain Rank
                            <MetricHelp formula="Average domain authority rank (lower is better)" />
                          </span>
                          <div className="font-mono text-sm font-semibold">{(detail.avg_backlinks_info?.rank ?? 0).toFixed(1)}</div>
                        </div>
                        <div className="space-y-1 bg-muted/30 rounded-lg p-2 sm:p-3">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            Main Domain Rank
                            <MetricHelp formula="Average main domain rank of competitors" />
                          </span>
                          <div className="font-mono text-sm font-semibold">{(detail.avg_backlinks_info?.main_domain_rank ?? 0).toFixed(1)}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* 搜索意图 */}
                  {detail.search_intent_info && (
                    <div>
                      <div className="text-xs sm:text-sm font-medium mb-2">Search Intent</div>
                      <Badge variant="outline" className="capitalize text-xs sm:text-sm font-semibold">
                        {detail.search_intent_info.main_intent}
                      </Badge>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                        {detail.search_intent_info.main_intent === 'navigational'
                          ? "Users are looking for a specific website or brand"
                          : detail.search_intent_info.main_intent === 'transactional'
                          ? "Users are ready to make a purchase or take action"
                          : "Users are seeking information or answers"}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 竞争对手分析 */}
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-border/50">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    Competitive Landscape
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  {/* 市场规模概览 */}
                  {detail.serp_info && detail.serp_info.se_results_count != null && (
                    <div className="bg-gradient-to-br from-muted/40 to-muted/20 rounded-xl p-3 sm:p-4 space-y-2 sm:space-y-3 border border-border/50">
                      <div className="text-xs sm:text-sm font-medium flex items-center gap-1">
                        Market Size
                        <MetricHelp
                          formula="Total Search Results"
                          description="The number of web pages Google has indexed that are competing for this keyword. A larger number indicates a more crowded market with many existing content pieces."
                          example="1.47B results means 1.47 billion pages are competing for this keyword"
                        />
                      </div>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-mono text-xl sm:text-2xl font-bold text-foreground">
                          {formatNumber(detail.serp_info.se_results_count)}
                        </span>
                        <span className="text-xs sm:text-sm text-muted-foreground">search results</span>
                      </div>
                    </div>
                  )}

                  {/* SERP Features */}
                  {detail.serp_info && detail.serp_info.serp_item_types && detail.serp_info.serp_item_types.length > 0 && (
                    <div>
                      <div className="text-xs sm:text-sm font-medium mb-2 flex items-center gap-1">
                        SERP Features
                        <MetricHelp formula="Special content types appearing in search results (e.g., images, videos, knowledge graph)" />
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {detail.serp_info.serp_item_types.map((type) => (
                          <Badge key={type} variant="secondary" className="capitalize text-xs sm:text-sm font-medium">
                            {type.replace(/_/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                        These features indicate the type of content that ranks well for this keyword
                      </p>
                    </div>
                  )}

                  <Separator />

                  {/* Top Ranking Domains */}
                  {detail.top_domains && detail.top_domains.length > 0 && (
                    <div>
                      <div className="text-xs sm:text-sm font-medium mb-2 sm:mb-3">Top Ranking Domains</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
                        {detail.top_domains.map((domain, index) => (
                          <div key={domain} className="flex items-center gap-2 p-2 sm:p-2.5 bg-muted/40 hover:bg-muted/60 rounded-lg text-xs sm:text-sm transition-colors duration-200 border border-border/30">
                            <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-semibold text-xs flex-shrink-0">
                              {index + 1}
                            </span>
                            <span className="truncate">{domain}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Competitor Details */}
                  {detail.competitors && detail.competitors.length > 0 ? (
                    <div>
                      <div className="text-xs sm:text-sm font-medium mb-2 sm:mb-3">Top Competitors</div>
                      <div className="space-y-2 sm:space-y-3">
                        {detail.competitors.slice(0, 10).map((competitor, index) => (
                          <div key={competitor.domain} className="flex items-center justify-between p-2.5 sm:p-3 bg-muted/50 hover:bg-muted/70 rounded-xl transition-colors duration-200 border border-border/30">
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold text-xs sm:text-sm flex-shrink-0">
                                {index + 1}
                              </div>
                              <div className="min-w-0">
                                <div className="font-medium text-xs sm:text-sm truncate">{competitor.domain}</div>
                                <div className="text-xs text-muted-foreground">Position: {competitor.avg_position ?? 'N/A'}</div>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="font-mono text-xs sm:text-sm font-semibold text-green-600 dark:text-green-500">
                                {formatCurrency(competitor.etv ?? 0)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Visibility: {((competitor.visibility ?? 0) * 100).toFixed(0)}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-32 sm:h-40 flex items-center justify-center bg-muted/30 rounded-xl border-2 border-dashed border-muted-foreground/20">
                      <div className="text-center text-muted-foreground">
                        <Users className="h-7 w-7 sm:h-8 sm:w-8 mx-auto mb-2 opacity-50" />
                        <div className="text-xs sm:text-sm">No competitor data available</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 利润预估和市场规模 */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-border/50">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                      Profit Opportunity
                      <MetricHelp
                        formula="(Profit Estimation × Growth Rate) / Competition Score"
                        description="Evaluates the keyword from a profit-first perspective. It considers the estimated profit potential adjusted by growth momentum and divided by competition difficulty. Higher values indicate better profit opportunities."
                        example="Profit Est. $534K × Growth 9% / Competition 100 = $48,060 profit opportunity score"
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 sm:space-y-3">
                      <div>
                        <div className="text-xs sm:text-sm text-muted-foreground mb-1 flex items-center gap-1">
                          Calculated Value
                          <MetricHelp formula="Higher value = Better profit opportunity relative to competition" />
                        </div>
                        <div className="font-mono text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-500">
                          {formatCurrency(profitOpportunity)}
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        Formula: (Profit Estimation × Growth Rate) / Competition Score
                      </div>
                      <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
                        <div className="bg-muted/30 rounded-lg p-2">
                          <div className="text-muted-foreground mb-1">Profit Est.</div>
                          <div className="font-mono font-semibold">{formatCurrency(detail.profit_estimation ?? 0)}</div>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-2">
                          <div className="text-muted-foreground mb-1">Growth</div>
                          <div className="font-mono font-semibold">{formatPercentage(detail.growth_rate ?? 0)}</div>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-2">
                          <div className="text-muted-foreground mb-1">Competition</div>
                          <div className="font-mono font-semibold">{detail.competition_score ?? 0}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-border/50">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                      Market Opportunity
                      <MetricHelp
                        formula="(Search Volume × CPC × Growth Rate) / Competition Score"
                        description="Evaluates the keyword from a traffic monetization perspective. It calculates the potential value of capturing search traffic based on volume, click value (CPC), growth trend, and competitive difficulty."
                        example="Volume 5M × CPC $0.29 × Growth 9% / Competition 100 = $13,050 market opportunity score"
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 sm:space-y-3">
                      <div>
                        <div className="text-xs sm:text-sm text-muted-foreground mb-1 flex items-center gap-1">
                          Calculated Value
                          <MetricHelp formula="Higher value = Better traffic monetization opportunity" />
                        </div>
                        <div className="font-mono text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-500">
                          {formatCurrency(marketOpportunity)}
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        Formula: (Search Volume × CPC × Growth Rate) / Competition Score
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                        <div className="bg-muted/30 rounded-lg p-2">
                          <div className="text-muted-foreground mb-1">Volume</div>
                          <div className="font-mono font-semibold">{formatNumber(detail.search_volume ?? 0)}</div>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-2">
                          <div className="text-muted-foreground mb-1">CPC</div>
                          <div className="font-mono font-semibold">${(detail.cpc ?? 0).toFixed(2)}</div>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-2">
                          <div className="text-muted-foreground mb-1">Growth</div>
                          <div className="font-mono font-semibold">{formatPercentage(detail.growth_rate ?? 0)}</div>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-2">
                          <div className="text-muted-foreground mb-1">Competition</div>
                          <div className="font-mono font-semibold">{detail.competition_score ?? 0}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 搜索量趋势 */}
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-border/50">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Activity className="h-5 w-5 sm:h-6 sm:w-6" />
                    Search Volume Trend
                    <MetricHelp formula="Historical search volume growth trends over different time periods" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3">
                    {detail.search_volume_trend ? (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        <div className="bg-muted/30 rounded-lg p-3">
                          <div className="text-xs sm:text-sm text-muted-foreground mb-1 flex items-center gap-1">
                            Monthly
                            <MetricHelp formula="Month-over-month growth percentage" />
                          </div>
                          <div className={cn("font-mono text-base sm:text-lg font-semibold", getTrendDirection(detail.search_volume_trend.monthly ?? 0).color)}>
                            {formatPercentage(detail.search_volume_trend.monthly ?? 0)}
                          </div>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-3">
                          <div className="text-xs sm:text-sm text-muted-foreground mb-1 flex items-center gap-1">
                            Quarterly
                            <MetricHelp formula="Quarter-over-quarter growth percentage" />
                          </div>
                          <div className={cn("font-mono text-base sm:text-lg font-semibold", getTrendDirection(detail.search_volume_trend.quarterly ?? 0).color)}>
                            {formatPercentage(detail.search_volume_trend.quarterly ?? 0)}
                          </div>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-3">
                          <div className="text-xs sm:text-sm text-muted-foreground mb-1 flex items-center gap-1">
                            Yearly
                            <MetricHelp formula="Year-over-year growth percentage" />
                          </div>
                          <div className={cn("font-mono text-base sm:text-lg font-semibold", getTrendDirection(detail.search_volume_trend.yearly ?? 0).color)}>
                            {formatPercentage(detail.search_volume_trend.yearly ?? 0)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs sm:text-sm text-muted-foreground">No trend data available</div>
                    )}

                    {/* 月度搜索量趋势图 */}
                    {detail.monthly_searches && detail.monthly_searches.length > 0 ? (
                      <SearchVolumeChart data={detail.monthly_searches} className="h-56 sm:h-64" />
                    ) : (
                      <div className="h-48 sm:h-56 flex items-center justify-center bg-muted/30 rounded-xl border-2 border-dashed border-muted-foreground/20">
                        <div className="text-center text-muted-foreground">
                          <Activity className="h-7 w-7 sm:h-8 sm:w-8 mx-auto mb-2 opacity-50" />
                          <div className="text-xs sm:text-sm">No chart data available</div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 专家分析 - 预留 */}
              <Card className="border-purple-200 dark:border-purple-800 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300 text-lg sm:text-xl">
                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
                    AI Expert Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-28 sm:h-32 flex items-center justify-center bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl border-2 border-dashed border-purple-300/30 dark:border-purple-700/30">
                    <div className="text-center text-muted-foreground">
                      <Sparkles className="h-7 w-7 sm:h-8 sm:w-8 mx-auto mb-2 opacity-50 text-purple-500" />
                      <div className="text-xs sm:text-sm font-medium">AI expert analysis coming soon</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            </ScrollArea>
          </>
        ) : (
          <>
            <DialogHeader className="sr-only">
              <DialogTitle>Keyword details</DialogTitle>
              <DialogDescription>No keyword information available</DialogDescription>
            </DialogHeader>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
