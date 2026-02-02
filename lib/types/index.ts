export interface PainPoint {
  title: string
  description: string
}

export interface MvpSuggestion {
  title: string
  description: string
  target: string
}

// ==================== Keyword 相关类型 ====================

/**
 * 关键词竞争等级
 */
export type CompetitionLevel = 'LOW' | 'MEDIUM' | 'HIGH';

/**
 * 关键词状态
 */
export type KeywordStatus = 'pending' | 'processing' | 'succeed' | 'failed';

/**
 * 月度搜索数据
 */
export interface MonthlySearch {
  year: number;
  month: number;
  search_volume: number;
}

/**
 * 搜索量趋势
 */
export interface SearchVolumeTrend {
  monthly: number | null;
  quarterly: number | null;
  yearly: number | null;
}

/**
 * 反向链接信息
 */
export interface BacklinksInfo {
  se_type: string;
  backlinks: number | null;
  dofollow: number | null;
  referring_pages: number | null;
  referring_domains: number | null;
  referring_main_domains: number | null;
  rank: number | null;
  main_domain_rank: number | null;
  last_updated_time: string;
}

/**
 * 竞争对手信息
 */
export interface Competitor {
  se_type: string;
  domain: string;
  avg_position: number | null;
  median_position: number | null;
  rating: number | null;
  etv: number | null;
  keywords_count: number | null;
  visibility: number | null;
  relevant_serp_items: number | null;
  keywords_positions: Record<string, number[]>;
}

/**
 * 搜索意图信息
 */
export interface SearchIntentInfo {
  se_type: string;
  main_intent: string;
  foreign_intent: string | null;
  last_updated_time: string;
}

/**
 * SERP信息
 */
export interface SerpInfo {
  se_type: string;
  check_url: string;
  se_results_count: number;
  serp_item_types: string[];
  last_updated_time: string;
  previous_updated_time: string;
}

/**
 * Highlight 信息（用于 free 用户的 locked 数据）
 */
export interface KeywordHighlight {
  highlight_type: 'growth' | 'volume' | 'competition' | 'cpc' | 'default';
  highlight_text: string;
  highlight_value: number | null;
}

/**
 * 解锁关键词响应
 */
export interface UnlockKeywordResponse {
  success: boolean;
  message: string;
  keyword: {
    id: number;
    task_id: number;
    keyword: string;
    growth_rate: number | null;
    competition_score: number | null;
    profit_estimation: number | null;
    is_locked: boolean;
    is_unlocked: boolean;
  };
  credits_used: number;
  remaining_credits: number;
}

/**
 * 关键词数据（从后端列表返回）
 */
export interface Keyword {
  id: number;
  task_id: number;
  keyword: string;
  seed_keyword: string;
  is_seed: boolean;
  keyword_status: KeywordStatus;
  search_volume: number | null;
  competition: number | null;
  competition_level: CompetitionLevel | null;
  cpc: number | null;
  growth_rate: number | null;
  competition_score: number | null;
  profit_estimation: number | null;
  has_wikipedia: boolean;
  has_high_authority_site: boolean;
  error_message: string | null;
  search_intent_info?: SearchIntentInfo; // 可选字段
  created_at?: string; // 创建时间（可选）
  updated_at?: string; // 更新时间（可选）
  is_locked?: boolean; // 是否锁定（free 用户）
  highlight?: KeywordHighlight; // 高亮信息（free 用户的 locked 数据）
}

/**
 * 关键词详情数据（从详情接口返回）
 */
export interface KeywordDetailData extends Keyword {
  source_type: string;
  se_type: string | null;
  status: string;
  endpoint: string;
  low_top_of_page_bid: number | null;
  high_top_of_page_bid: number | null;
  categories: number[] | null;
  monthly_searches: MonthlySearch[] | null;
  search_volume_trend: SearchVolumeTrend | null;
  avg_backlinks_info: BacklinksInfo | null;
  competitors: Competitor[];
  search_intent_info?: SearchIntentInfo;
  top_domains: string[]; // Top ranking domains
  serp_info?: SerpInfo; // SERP information (需要从 response_result 中提取)
  created_at: string;
  updated_at: string;
}

/**
 * 关键词列表请求参数
 */
export interface KeywordListParams {
  limit?: number;
  offset?: number;
  keyword_status?: KeywordStatus;
  search?: string;
}

/**
 * 关键词列表响应
 */
export interface KeywordListResponse {
  code: number;
  message: string;
  data: Keyword[];
}

// 旧的类型定义（向后兼容，后续可以逐步迁移）
export interface LegacyKeyword {
  keyword: string;
  growth: number;
  source: string;
}

export interface KeywordDetail extends LegacyKeyword {
  trendData: TrendDataPoint[];
  painPoints: PainPoint[];
  mvpSuggestion: MvpSuggestion;
}

export interface TrendDataPoint {
  day: string
  value: number
}

export interface ApiResponse<T> {
  data: T
  total?: number
  query?: string | null
}

export interface ApiError {
  error: string
  message: string
  statusCode: number
}

export interface User {
  id: number
  email: string
  username: string
  avatar_url: string | null
  phone?: string | null
  membership_level: 'free' | 'pro' | 'premium'
  membership_expires_at: string | null
  referral_code: string | null
  credits: number
}

export interface AuthResponse {
  token: string
  user: User
}

export interface GoogleAuthUrlResponse {
  auth_url: string
}

export interface SendCodeRequest {
  email: string
}

export interface SendCodeResponse {
  message: string
  success: boolean
}

export interface EmailLoginRequest {
  email: string
  code: string
}

export interface EmailLoginResponse {
  token: string
  user: User
}
