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
  Globe,
  Clock,
  Lightbulb,
  AlertTriangle,
  TrendingUpIcon,
  Package,
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

// 判断是否为 Google Trends 数据
function isGoogleTrendsData(data: KeywordDetailData): boolean {
  return data.source === 'google_trends' || !!(data.commercialization_strategy || data.risk_assessment);
}

// 判断竞争对手数据类型
function isCompetitorDetail(competitor: any): competitor is { position: number; title: string; url: string; domain: string; description: string } {
  return 'position' in competitor && 'title' in competitor && 'url' in competitor;
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
          <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground hover:text-[#67f745] cursor-help transition-colors" />
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

        // Parse monthly_searches if it's a JSON string (Google Trends format)
        if (processedData.monthly_searches && typeof processedData.monthly_searches === 'string') {
          try {
            processedData.monthly_searches = JSON.parse(processedData.monthly_searches)
          } catch (e) {
            console.warn('Failed to parse monthly_searches:', e)
            processedData.monthly_searches = null
          }
        }

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
    ? calculateOpportunityScore(detail.profit_estimation ?? null, detail.growth_rate ?? null, detail.competition_score ?? null)
    : 0
  const profitOpportunity = detail
    ? calculateProfitOpportunity(detail.profit_estimation ?? null, detail.growth_rate ?? null, detail.competition_score ?? null)
    : 0
  const marketOpportunity = detail
    ? calculateMarketOpportunity(detail.search_volume ?? null, detail.cpc ?? null, detail.growth_rate ?? null, detail.competition_score ?? null)
    : 0

  const opportunityGrade = getOpportunityScoreGrade(opportunityScore)
  const competitionStars = detail ? getCompetitionStars(detail.competition_score ?? null) : 0
  const trendInfo = detail ? getTrendDirection(detail.growth_rate ?? null) : { direction: 'flat' as const, color: 'text-gray-600' }
  const TrendIcon = trendInfo.direction === 'up' ? TrendingUp : trendInfo.direction === 'down' ? TrendingDown : Minus

  // 加载中时不显示对话框内容
  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <div className="flex flex-col items-center justify-center py-10 sm:py-12 gap-4 sm:gap-5">
            <div className="relative">
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border-4 border-[#67f745]/20" />
              <div className="absolute inset-0 h-14 w-14 sm:h-16 sm:w-16 rounded-full border-4 border-[#67f745] border-t-transparent animate-spin" />
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
            <DialogHeader className="px-6 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 border-b border-[#1E2650] bg-gradient-to-r from-[#67f745]/10 to-[#0080FF]/10 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <DialogTitle className="text-2xl sm:text-3xl font-bold tracking-tight mb-1.5 sm:mb-2 break-words">{detail.keyword}</DialogTitle>
                  <DialogDescription className="text-sm sm:text-base text-muted-foreground">
                    Comprehensive keyword analysis and opportunity insights
                  </DialogDescription>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                  {isGoogleTrendsData(detail) && (
                    <Badge variant="outline" className="bg-gradient-to-r from-[#67f745]/20 to-[#0080FF]/20 border-[#67f745]/30 text-[#67f745] px-3 py-1.5 text-xs font-semibold">
                      <TrendingUpIcon className="h-3 w-3 mr-1" />
                      Google Trends
                    </Badge>
                  )}
                  <Badge className="bg-[#67f745] hover:bg-[#67f745]/90 text-[#0A0E27] px-3 py-1.5 text-sm font-semibold shadow-sm">
                    Score: {formatNumber(detail.opportunity_score ?? opportunityScore)}
                  </Badge>
                </div>
              </div>
            </DialogHeader>

            <ScrollArea className="h-[calc(92vh-10rem)] sm:h-[calc(92vh-11rem)]">
              <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-6 sm:space-y-8">
              {/* 第二部分：关键指标 Tags (仅 Google Trends 数据) */}
              {isGoogleTrendsData(detail) && (
              <Card className="border-[#67f745]/30 bg-gradient-to-br from-[#67f745]/5 to-[#0080FF]/5 shadow-sm">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                    {detail.opportunity_score != null && (
                      <div className="bg-muted/30 rounded-lg p-3 md:p-4 border border-[#67f745]/30">
                        <div className="text-[11px] md:text-[10px] text-muted-foreground uppercase tracking-wide mb-1.5 md:mb-1">Score</div>
                        <div className="text-sm md:text-base font-bold text-[#67f745]">{detail.opportunity_score.toFixed(1)}</div>
                      </div>
                    )}
                    {detail.competition_level && (
                      <div className={cn(
                        "bg-muted/30 rounded-lg p-3 md:p-4 border",
                        detail.competition_level === 'high' ? 'border-red-500/30' :
                        detail.competition_level === 'medium' ? 'border-yellow-500/30' :
                        'border-green-500/30'
                      )}>
                        <div className="text-[11px] md:text-[10px] text-muted-foreground uppercase tracking-wide mb-1.5 md:mb-1">Competition</div>
                        <div className={cn(
                          "text-sm md:text-base font-bold",
                          detail.competition_level === 'high' ? 'text-red-400' :
                          detail.competition_level === 'medium' ? 'text-yellow-400' :
                          'text-green-400'
                        )}>{detail.competition_level.toUpperCase()}</div>
                      </div>
                    )}
                    {detail.profit_estimation != null && (
                      <div className="bg-muted/30 rounded-lg p-3 md:p-4 border border-green-500/30">
                        <div className="text-[11px] md:text-[10px] text-muted-foreground uppercase tracking-wide mb-1.5 md:mb-1">Est. Profit</div>
                        <div className="text-sm md:text-base font-bold text-green-400">${formatNumber(detail.profit_estimation)}</div>
                      </div>
                    )}
                    {detail.target_market && (
                      <div className="bg-muted/30 rounded-lg p-3 md:p-4 border border-blue-500/30">
                        <div className="text-[11px] md:text-[10px] text-muted-foreground uppercase tracking-wide mb-1.5 md:mb-1">Best Market</div>
                        <div className="text-sm md:text-base font-bold text-foreground">{detail.target_market}</div>
                      </div>
                    )}
                    {detail.time_to_mvp && (
                      <div className="bg-muted/30 rounded-lg p-3 md:p-4 border border-purple-500/30">
                        <div className="text-[11px] md:text-[10px] text-muted-foreground uppercase tracking-wide mb-1.5 md:mb-1">Time to MVP</div>
                        <div className="text-sm md:text-base font-bold text-foreground">{detail.time_to_mvp}</div>
                      </div>
                    )}
                    {detail.user_target && (
                      <div className="bg-muted/30 rounded-lg p-3 md:p-4 border border-indigo-500/30">
                        <div className="text-[11px] md:text-[10px] text-muted-foreground uppercase tracking-wide mb-1.5 md:mb-1">User Target</div>
                        <div className="text-sm md:text-base font-bold text-foreground">{detail.user_target}</div>
                      </div>
                    )}
                    {detail.source && (
                      <div className="bg-muted/30 rounded-lg p-3 md:p-4 border border-[#67f745]/30">
                        <div className="text-[11px] md:text-[10px] text-muted-foreground uppercase tracking-wide mb-1.5 md:mb-1">Source</div>
                        <div className="text-sm md:text-base font-bold text-foreground">{detail.source}</div>
                      </div>
                    )}
                    {detail.category && (
                      <div className="bg-muted/30 rounded-lg p-3 md:p-4 border border-orange-500/30">
                        <div className="text-[11px] md:text-[10px] text-muted-foreground uppercase tracking-wide mb-1.5 md:mb-1">Category</div>
                        <div className="text-sm md:text-base font-bold text-foreground">{detail.category}</div>
                      </div>
                    )}
                  </div>
                  {detail.intent && (
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground leading-relaxed">{detail.intent}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              )}

              {/* 第三部分：数据来源特定内容 */}
              {detail.source === 'google_trends' && detail.search_volume != null && (
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-[#1E2650] bg-[#0F1629]">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-[#67f745]" />
                      Search Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/30 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">Search Volume</div>
                        <div className="font-mono text-xl font-bold text-foreground">{formatNumber(detail.search_volume)}</div>
                      </div>
                      {detail.growth_rate != null && (
                        <div className="bg-muted/30 rounded-lg p-3">
                          <div className="text-xs text-muted-foreground mb-1">Growth Rate</div>
                          <div className={cn("font-mono text-xl font-bold flex items-center gap-2", getTrendDirection(detail.growth_rate).color)}>
                            <TrendIcon className="h-4 w-4" />
                            {formatPercentage(detail.growth_rate)}
                          </div>
                        </div>
                      )}
                    </div>
                    {detail.monthly_searches && detail.monthly_searches.length > 0 && (
                      <SearchVolumeChart data={detail.monthly_searches} className="h-56 sm:h-64 mt-4" />
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Reddit 帖子展示 */}
              {detail.source === 'reddit' && detail.reddit_posts && detail.reddit_posts.length > 0 && (
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-[#1E2650] bg-[#0F1629]">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-[#FF4500]" />
                      Reddit Discussions ({detail.reddit_posts.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {detail.reddit_posts.slice(0, 10).map((post: any) => (
                        <a
                          key={post.post_id}
                          href={post.post_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors border border-border/30"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm line-clamp-2 mb-1">{post.title}</h4>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span>r/{post.subreddit}</span>
                                <span>↑ {post.upvotes}</span>
                                <span>💬 {post.comment_count}</span>
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 第四部分：竞争难度分析 */}
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-[#1E2650] bg-[#0F1629]">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-[#0080FF]" />
                    Competition Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 竞争等级 */}
                  {detail.competition_level && (
                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium">Competition Level</span>
                        <Badge variant={
                          detail.competition_level === 'high' ? 'destructive' :
                          detail.competition_level === 'medium' ? 'default' :
                          'secondary'
                        } className="text-sm font-semibold">
                          {detail.competition_level.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-5 w-5",
                              i < competitionStars
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            )}
                          />
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">
                          ({competitionStars}/5 - {competitionStars >= 4 ? 'Easy' : competitionStars >= 3 ? 'Medium' : 'Hard'})
                        </span>
                      </div>
                    </div>
                  )}

                  {/* 竞争对手列表 */}
                  {detail.competitors && detail.competitors.length > 0 && (
                    <div>
                      <div className="text-sm font-medium mb-3">Top Competitors ({detail.competitors.length})</div>
                      <div className="space-y-2">
                        {detail.competitors.slice(0, 10).map((competitor, index) => {
                          if (isCompetitorDetail(competitor)) {
                            return (
                              <a
                                key={competitor.domain}
                                href={competitor.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors border border-border/30"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#67f745]/20 text-[#67f745] font-bold text-xs flex-shrink-0">
                                    {competitor.position}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm line-clamp-1 hover:text-[#67f745] transition-colors">
                                      {competitor.title}
                                    </h4>
                                    <div className="text-xs text-muted-foreground mt-1">{competitor.domain}</div>
                                    {competitor.description && (
                                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                                        {competitor.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </a>
                            );
                          } else {
                            return (
                              <div key={competitor.domain} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/30">
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#67f745]/20 text-[#67f745] font-bold text-xs flex-shrink-0">
                                    {index + 1}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="font-medium text-sm truncate">{competitor.domain}</div>
                                    <div className="text-xs text-muted-foreground">Position: {competitor.avg_position ?? 'N/A'}</div>
                                  </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <div className="font-mono text-sm font-semibold text-[#67f745]">
                                    {formatCurrency(competitor.etv ?? 0)}
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 第五部分：商业化策略 */}
              {detail.commercialization_strategy && (
                <Card className="border-[#0080FF]/30 shadow-md hover:shadow-lg transition-shadow duration-300 bg-[#0F1629]">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-[#0080FF] text-lg sm:text-xl">
                      <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6" />
                      Commercialization Strategy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                        {detail.commercialization_strategy}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 第六部分：风险考量 */}
              {detail.risk_assessment && (
                <Card className="border-amber-500/30 shadow-md hover:shadow-lg transition-shadow duration-300 bg-[#0F1629]">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-amber-500 text-lg sm:text-xl">
                      <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6" />
                      Risk Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                        {detail.risk_assessment}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 旧的内容保留（用于非 Google Trends/Reddit 数据） */}
              {!isGoogleTrendsData(detail) && (
                <>
                  {/* 核心指标总览 */}
                  <Card className="border-[#67f745]/30 bg-gradient-to-br from-[#67f745]/15 to-[#0080FF]/15 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="flex items-center gap-2 text-[#67f745] text-lg sm:text-xl">
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
                        <div className="font-mono text-4xl sm:text-5xl font-bold text-[#67f745] leading-none">
                          {formatNumber(opportunityScore)}
                        </div>
                        <Badge className={cn("mb-1 sm:mb-2 text-sm sm:text-base px-2.5 sm:px-3 py-1 font-semibold shadow-sm", opportunityGrade.color)}>
                          {opportunityGrade.label}
                        </Badge>
                      </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 pt-3 sm:pt-4 border-t border-[#67f745]/30">
                    <div className="bg-[#0F1629]/60 rounded-xl p-3 sm:p-4 hover:bg-[#0F1629]/80 transition-colors duration-200 shadow-sm border border-[#1E2650]">
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
                        <div className="bg-[#0F1629]/60 rounded-xl p-3 sm:p-4 hover:bg-[#0F1629]/80 transition-colors duration-200 shadow-sm border border-[#1E2650]">
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
                        <div className="bg-[#0F1629]/60 rounded-xl p-3 sm:p-4 hover:bg-[#0F1629]/80 transition-colors duration-200 shadow-sm border border-[#1E2650]">
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
                        <div className="bg-[#0F1629]/60 rounded-xl p-3 sm:p-4 hover:bg-[#0F1629]/80 transition-colors duration-200 shadow-sm border border-[#1E2650]">
                          <div className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2 flex items-center gap-1">
                            Competition
                            <MetricHelp
                              formula="Competition Score: 0-100"
                              description="Measures how many advertisers are bidding on this keyword. Score of 0 = no competition, 100 = maximum competition. Based on the number and intensity of ad bids."
                              example="Score of 100 (HIGH) means many advertisers are competing for this keyword"
                            />
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant={detail.competition_level === 'high' ? 'destructive' : detail.competition_level === 'medium' ? 'default' : 'secondary'} className="text-xs sm:text-sm font-semibold">
                              {detail.competition_level?.toUpperCase() ?? 'N/A'}
                            </Badge>
                            <span className="text-xs sm:text-sm font-mono text-muted-foreground">({detail.competition_score ?? 0})</span>
                          </div>
                        </div>
                    </div>

                  <div className="pt-4 sm:pt-6 border-t border-[#67f745]/30">
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

              {/* 专家分析 - 预留 (仅非 Google Trends/Reddit 数据显示) */}
              {!isGoogleTrendsData(detail) && detail.source !== 'reddit' && (
                <Card className="border-[#67f745]/30 shadow-md hover:shadow-lg transition-shadow duration-300 bg-[#0F1629]">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-[#67f745] text-lg sm:text-xl">
                      <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
                      AI Expert Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-28 sm:h-32 flex items-center justify-center bg-gradient-to-br from-[#67f745]/10 to-[#0080FF]/10 rounded-xl border-2 border-dashed border-[#67f745]/30">
                      <div className="text-center text-muted-foreground">
                        <Sparkles className="h-7 w-7 sm:h-8 sm:w-8 mx-auto mb-2 opacity-50 text-[#67f745]" />
                        <div className="text-xs sm:text-sm font-medium">AI expert analysis coming soon</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              </>
              )}
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
