/**
 * 关键词指标计算工具
 */

import type { Keyword, KeywordDetailData } from '@/lib/types';

/**
 * 计算机会价值比（总排序指标）
 * 公式：(profit_estimation × growth_rate) / competition_score
 */
export function calculateOpportunityScore(
  profitEstimation: number | null,
  growthRate: number | null,
  competitionScore: number | null
): number {
  const profit = profitEstimation ?? 0;
  const growth = growthRate ?? 0;
  const competition = competitionScore ?? 0;

  if (competition === 0) return 0;
  return (profit * growth) / competition;
}

/**
 * 计算利润型机会值
 * 公式：(profit_estimation × growth_rate) / competition_score
 */
export function calculateProfitOpportunity(
  profitEstimation: number | null,
  growthRate: number | null,
  competitionScore: number | null
): number {
  return calculateOpportunityScore(profitEstimation, growthRate, competitionScore);
}

/**
 * 计算市场规模型机会值（流量角度）
 * 公式：(search_volume × CPC × growth_rate) / competition_score
 */
export function calculateMarketOpportunity(
  searchVolume: number | null,
  cpc: number | null,
  growthRate: number | null,
  competitionScore: number | null
): number {
  const volume = searchVolume ?? 0;
  const price = cpc ?? 0;
  const growth = growthRate ?? 0;
  const competition = competitionScore ?? 0;

  if (competition === 0) return 0;
  return (volume * price * growth) / competition;
}

/**
 * 格式化数字（K, M, B）
 */
export function formatNumber(num: number | null): string {
  if (num === null || typeof num !== 'number' || isNaN(num)) {
    return '0';
  }
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)}B`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toFixed(0);
}

/**
 * 格式化货币
 */
export function formatCurrency(num: number | null): string {
  return `$${formatNumber(num)}`;
}

/**
 * 格式化百分比
 */
export function formatPercentage(num: number | null): string {
  if (num === null || typeof num !== 'number' || isNaN(num)) {
    return '0.0%';
  }
  return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;
}

/**
 * 获取机会价值比的等级
 */
export function getOpportunityScoreGrade(score: number): {
  grade: 'high' | 'medium' | 'low';
  color: string;
  label: string;
} {
  if (score >= 10_000) {
    return { grade: 'high', color: 'text-green-600', label: 'High Opportunity' };
  }
  if (score >= 1_000) {
    return { grade: 'medium', color: 'text-yellow-600', label: 'Medium Opportunity' };
  }
  return { grade: 'low', color: 'text-red-600', label: 'Low Opportunity' };
}

/**
 * 获取竞争难度星级（反向：竞争越低星级越高）
 */
export function getCompetitionStars(competitionScore: number | null): number {
  const score = competitionScore ?? 0;
  if (score >= 80) return 1; // 极难
  if (score >= 60) return 2; // 很难
  if (score >= 40) return 3; // 中等
  if (score >= 20) return 4; // 较易
  return 5; // 容易
}

/**
 * 获取增长趋势方向
 */
export function getTrendDirection(growthRate: number | null): {
  direction: 'up' | 'down' | 'flat';
  color: string;
} {
  const rate = growthRate ?? 0;
  if (rate > 5) {
    return { direction: 'up', color: 'text-green-600' };
  }
  if (rate < 0) {
    return { direction: 'down', color: 'text-red-600' };
  }
  return { direction: 'flat', color: 'text-yellow-600' };
}

/**
 * 计算关键词的所有指标
 */
export function calculateKeywordMetrics(keyword: Keyword) {
  const opportunityScore = calculateOpportunityScore(
    keyword.profit_estimation,
    keyword.growth_rate,
    keyword.competition_score
  );

  const marketOpportunity = calculateMarketOpportunity(
    keyword.search_volume,
    keyword.cpc,
    keyword.growth_rate,
    keyword.competition_score
  );

  const profitOpportunity = calculateProfitOpportunity(
    keyword.profit_estimation,
    keyword.growth_rate,
    keyword.competition_score
  );

  return {
    opportunityScore,
    marketOpportunity,
    profitOpportunity,
    searchVolume: keyword.search_volume,
    growthRate: keyword.growth_rate,
    competitionScore: keyword.competition_score,
    cpc: keyword.cpc,
    profitEstimation: keyword.profit_estimation,
  };
}
