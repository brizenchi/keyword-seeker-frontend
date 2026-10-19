import type { Locale } from '../i18n'
import type { AskTool, IdeaReport, KeywordReport, MarketReport, ProductReport, RadarReport, ReportKind } from '../types'
import { cleanDomain, isDomain } from '../utils/domain'
import { buildActions, type ActionCopy } from './actions'
import { getDemoMentions } from './mentions'
import { demoHeadlineZh, keywordReportsZh } from './radar-zh'

// Demo reports for the AI chat: one per kind. pagepulse.dev, the receipt-scanner idea and every
// competitor below are fictional.

/* ---------- Plans: what each report runs and what it costs ---------- */

export interface ReportStep {
  tool: AskTool
  calls: number
  /** Points this step spends. NichePop's own data and Search Console are free. */
  points: number
}

export interface ReportPlan {
  kind: ReportKind
  steps: ReportStep[]
  /** Estimate shown before running. */
  estimate: [number, number]
}

/** Step labels live in the dictionaries under reports.kinds[kind].steps (same order). */
export const REPORT_PLANS: Record<ReportKind, ReportPlan> = {
  keyword: {
    kind: 'keyword',
    estimate: [5, 7],
    steps: [
      { tool: 'nichepop', calls: 1, points: 0 },
      { tool: 'dfs_labs', calls: 2, points: 1 },
      { tool: 'dfs_serp', calls: 3, points: 2 },
      { tool: 'dfs_trends', calls: 1, points: 1 },
      { tool: 'ai', calls: 1, points: 2 },
    ],
  },
  idea: {
    kind: 'idea',
    estimate: [6, 8],
    steps: [
      { tool: 'ai', calls: 1, points: 1 },
      { tool: 'dfs_keywords', calls: 2, points: 1 },
      { tool: 'dfs_serp', calls: 3, points: 1 },
      { tool: 'x', calls: 2, points: 2 },
      { tool: 'ai', calls: 1, points: 2 },
    ],
  },
  product: {
    kind: 'product',
    estimate: [7, 10],
    steps: [
      { tool: 'gsc', calls: 2, points: 0 },
      { tool: 'dfs_labs', calls: 4, points: 3 },
      { tool: 'x', calls: 2, points: 2 },
      { tool: 'dfs_serp', calls: 2, points: 1 },
      { tool: 'ai', calls: 1, points: 2 },
    ],
  },
  market: {
    kind: 'market',
    estimate: [6, 8],
    steps: [
      { tool: 'nichepop', calls: 1, points: 0 },
      { tool: 'dfs_labs', calls: 3, points: 2 },
      { tool: 'dfs_trends', calls: 1, points: 1 },
      { tool: 'dfs_serp', calls: 4, points: 1 },
      { tool: 'ai', calls: 1, points: 2 },
    ],
  },
}

export const REPORT_KINDS: ReportKind[] = ['keyword', 'idea', 'product', 'market']

export const reportPoints = (kind: ReportKind) => REPORT_PLANS[kind].steps.reduce((sum, step) => sum + step.points, 0)

/** Demo stand-in for the agent deciding which report fits a message. */
export function classifyMessage(text: string): ReportKind {
  const value = text.toLowerCase()
  if (isDomain(text) || /\b[\w-]+\.(com|io|dev|app|ai|net|org|co)\b/.test(value)) return 'product'
  if (/赛道|市场|行业|还能进|\bmarket\b|\bniche\b|\bindustry\b|\bspace\b|\bcategory\b/.test(value)) return 'market'
  if (/想做|点子|做一个|做个|\bidea\b|\bbuild an?\b|\bstartup\b|\bapp for\b/.test(value)) return 'idea'
  return 'keyword'
}

/** The subject a report is about, pulled out of a chat message. */
export function subjectOf(text: string, kind: ReportKind) {
  if (kind === 'product') {
    const match = text.match(/(https?:\/\/)?[\w-]+(\.[\w-]+)+/)
    return match ? cleanDomain(match[0]) : text.trim()
  }
  return text
    .replace(/[?？。.!！]+$/u, '')
    .replace(/^(我想做一个|我想做|想做一个|做一个)/u, '')
    .replace(/^(is there demand for|i want to build|should i build|is the|is)\s+/iu, '')
    .replace(/\s*(值得做吗|值不值得做|这个赛道还能进吗|还能进吗|market still open|still open|worth it|worth building)$/iu, '')
    .replace(/^[“"](.+)[”"]$/u, '$1')
    .trim()
}

/* ---------- Keyword reports ---------- */

const keywordReports: KeywordReport[] = [
  {
    id: 'rpt-driftbound-codes',
    kind: 'keyword',
    query: 'driftbound codes',
    createdAt: 'Oct 18, 2026',
    wordAgeHours: 6,
    verdict: 'build',
    headline: 'Worth a site — but move within 48 hours.',
    scores: [
      { label: 'Demand', value: '2.4K/mo · rising', note: 'Autocomplete already shows codes, wiki and map.', tone: 'good' },
      { label: 'Can you rank?', value: 'KD 4 · KGR 0.03', note: 'Top 10 is Reddit, Discord and one Fandom stub.', tone: 'good' },
      { label: 'Commercial value', value: 'CPC $0.40', note: 'Ad-supported traffic, not a subscription niche.', tone: 'warn' },
      { label: 'Do competitors earn?', value: '~40K visits/mo', note: 'Similar game-code sites monetize with display ads.', tone: 'good' },
    ],
    roi: 'Top 3 is realistic within a week: roughly 6–9K visits/mo for 4–8 weeks. Game words fade, so plan for a short window and a portfolio, not a single bet.',
    traps: [
      '"driftbound" alone mixes with an unrelated 2019 indie album. Target the codes and wiki variants.',
      '3 new sites entered in the last 6 hours. The window is closing.',
    ],
    serp: [
      { rank: 1, domain: 'reddit.com', pageType: 'Forum thread', note: 'Weak: unstructured, no codes list' },
      { rank: 2, domain: 'discord.com', pageType: 'Invite page', note: 'Weak: not a content page' },
      { rank: 3, domain: 'driftbound.fandom.com', pageType: 'Wiki stub', note: '2 paragraphs, last edit 3 days ago' },
      { rank: 4, domain: 'youtube.com', pageType: 'Video', note: 'One 4-min video' },
      { rank: 5, domain: 'gamecodeswiki.net', pageType: 'New site', note: 'Entered 5h ago' },
    ],
    nextSteps: [
      'Check availability for a domain with "driftbound" in it before buying.',
      'Ship a codes page plus a wiki stub today; update codes daily.',
      'Add pages for "driftbound map" and "driftbound tier list" in week one.',
    ],
    scoreSources: ['dfs_keywords', 'dfs_serp', 'dfs_keywords', 'dfs_labs'],
    sources: [
      { tool: 'nichepop', calls: 1 },
      { tool: 'dfs_labs', calls: 2 },
      { tool: 'dfs_serp', calls: 3 },
      { tool: 'dfs_trends', calls: 1 },
      { tool: 'ai', calls: 1 },
    ],
  },
  {
    id: 'rpt-pixel-siege-wiki',
    kind: 'keyword',
    query: 'pixel siege wiki',
    createdAt: 'Oct 16, 2026',
    wordAgeHours: 52,
    verdict: 'build',
    headline: 'Still winnable, but no longer easy.',
    scores: [
      { label: 'Demand', value: '1.3K/mo · rising', note: 'Characters and codes searches growing alongside.', tone: 'good' },
      { label: 'Can you rank?', value: 'KD 7 · KGR 0.06', note: '9 sites now, most are 1-page stubs.', tone: 'warn' },
      { label: 'Commercial value', value: 'CPC $0.30', note: 'Display ads only.', tone: 'warn' },
      { label: 'Do competitors earn?', value: '~25K visits/mo', note: 'Top wiki in this genre earns from ads.', tone: 'good' },
    ],
    roi: 'Beat the stubs with depth: character pages and a codes tracker. Expect 3–5K visits/mo if you reach top 3.',
    traps: ['7 sites entered after detection. Pro members saw this word 52 hours earlier with 2 sites in the top 10.'],
    serp: [
      { rank: 1, domain: 'pixelsiege.fandom.com', pageType: 'Wiki', note: 'Thin, 6 pages' },
      { rank: 2, domain: 'reddit.com', pageType: 'Forum thread', note: 'Weak' },
      { rank: 3, domain: 'pixelsiegewiki.com', pageType: 'New site', note: 'Entered 40h ago' },
    ],
    nextSteps: ['Build 20+ character pages in week one.', 'Add a codes tracker with dates.', 'Link every page from a tier list.'],
    scoreSources: ['dfs_keywords', 'dfs_serp', 'dfs_keywords', 'dfs_labs'],
    sources: [
      { tool: 'nichepop', calls: 1 },
      { tool: 'dfs_labs', calls: 2 },
      { tool: 'dfs_serp', calls: 3 },
      { tool: 'dfs_trends', calls: 1 },
      { tool: 'ai', calls: 1 },
    ],
  },
]

function keywordReports_(locale: Locale): KeywordReport[] {
  if (locale === 'en') return keywordReports
  return keywordReports.map((report) => ({ ...report, ...keywordReportsZh[report.id] }))
}

/* ---------- Idea report ---------- */

const ideaCopy = {
  en: {
    query: 'A receipt scanner app for freelancers',
    createdAt: 'Oct 17, 2026',
    headline: 'Real demand, crowded middle. Worth building for one niche the incumbents ignore: freelancers paid in several currencies.',
    demand: [
      { label: 'Search demand', value: '720/mo · +190% in 30d', note: '"receipt scanner ai" is climbing steadily, not spiking.' },
      { label: 'People asking', value: '~25 posts a week', note: 'Mostly Reddit and X, asking for something cheaper and simpler.' },
      { label: 'Willingness to pay', value: 'CPC $4.10', note: 'Advertisers pay well; incumbents charge $9–$15 a month.' },
      { label: 'Competition', value: 'KD 18 · 11 sites', note: 'Three funded products own the generic terms.' },
    ],
    alternatives: [
      { traffic: '~120K visits/mo', pricing: '$15/mo', overlap: 'Full bookkeeping', note: 'Built for small businesses; freelancers say it does too much.' },
      { traffic: '~35K visits/mo', pricing: '$9/mo', overlap: 'Receipt scanning', note: 'Closest match, but USD only and no accountant export.' },
      { traffic: '~18K visits/mo', pricing: 'free · $6/mo', overlap: 'AI categorizing', note: 'New, growing fast on Product Hunt traffic.' },
    ],
    complaints: [
      { text: 'Too expensive for one person with 20 receipts a month', source: 'Reddit, X', count: '14 posts' },
      { text: 'Can’t handle receipts in other currencies', source: 'r/digitalnomad', count: '9 posts' },
      { text: 'My accountant can’t use the export', source: 'X', count: '6 posts' },
    ],
    monetization: [
      'Free for 10 receipts a month, $5/mo after — undercuts the closest match at $9.',
      'Charge for the accountant-ready export, the one thing people say they’d pay for.',
      'Affiliate links to multi-currency bank accounts fit the audience.',
    ],
    angle:
      'Build "the receipt scanner for freelancers paid in several currencies": convert at the receipt date and export in your accountant’s format. None of the three alternatives does both.',
  },
  zh: {
    query: '给自由职业者用的收据扫描 app',
    createdAt: '2026年10月17日',
    headline: '需求是真的，但中间地带很挤。值得做，前提是只做一个老玩家忽略的人群：收入来自多种货币的自由职业者。',
    demand: [
      { label: '搜索需求', value: '月搜 720 · 30 天 +190%', note: '“receipt scanner ai” 在稳定上涨，不是尖峰。' },
      { label: '有人在问', value: '每周约 25 条帖子', note: '主要在 Reddit 和 X，想要更便宜、更简单的工具。' },
      { label: '付费意愿', value: 'CPC $4.10', note: '广告主出价不低；老玩家每月收 $9–$15。' },
      { label: '竞争', value: 'KD 18 · 11 个站', note: '三个拿了融资的产品占着通用词。' },
    ],
    alternatives: [
      { traffic: '约 12 万访问/月', pricing: '$15/月', overlap: '完整记账', note: '面向小公司，自由职业者觉得功能太多。' },
      { traffic: '约 3.5 万访问/月', pricing: '$9/月', overlap: '收据扫描', note: '最接近，但只支持美元，也不能导出给会计。' },
      { traffic: '约 1.8 万访问/月', pricing: '免费 · $6/月', overlap: 'AI 分类', note: '新产品，靠 Product Hunt 的流量涨得很快。' },
    ],
    complaints: [
      { text: '一个人每月就 20 张收据，太贵了', source: 'Reddit、X', count: '14 条帖子' },
      { text: '处理不了其他货币的收据', source: 'r/digitalnomad', count: '9 条帖子' },
      { text: '导出的文件会计用不了', source: 'X', count: '6 条帖子' },
    ],
    monetization: [
      '每月 10 张收据免费，超出后 $5/月，比最接近的竞品便宜（$9）。',
      '对“会计可直接用的导出”收费，这是大家明确说愿意付钱的功能。',
      '多币种银行账户的联盟链接，很适合这群用户。',
    ],
    angle: '做“给多币种收入自由职业者的收据扫描”：按收据日期自动换汇，并按会计要的格式导出。三个已有方案都没有同时做到。',
  },
}

function ideaReport(locale: Locale): IdeaReport {
  const c = ideaCopy[locale]
  const tones = ['good', 'good', 'good', 'warn'] as const
  const domains = [
    { domain: 'snapbooks.io', trend: 'up' as const },
    { domain: 'receiptly.app', trend: 'flat' as const },
    { domain: 'ledgerlens.com', trend: 'up' as const },
  ]
  return {
    id: 'rpt-receipt-idea',
    kind: 'idea',
    query: c.query,
    createdAt: c.createdAt,
    verdict: 'pivot',
    headline: c.headline,
    demand: c.demand.map((d, i) => ({ ...d, tone: tones[i] })),
    alternatives: domains.map((d, i) => ({ ...d, ...c.alternatives[i] })),
    complaints: c.complaints,
    monetization: c.monetization,
    angle: c.angle,
    sources: [
      { tool: 'nichepop', calls: 1 },
      { tool: 'dfs_keywords', calls: 2 },
      { tool: 'dfs_serp', calls: 3 },
      { tool: 'x', calls: 2 },
      { tool: 'ai', calls: 1 },
    ],
  }
}

/* ---------- Product report ---------- */

const competitorCopy = {
  en: {
    createdAt: 'Oct 18, 2026',
    headline: 'Two incumbents own "free uptime monitor". The opening is status pages for side projects.',
    traffic: ['~85K visits/mo', '~48K visits/mo', '~12K visits/mo', '~6K visits/mo'],
    pricing: ['from $20/mo', 'free · $9–$49/mo', '$12/mo', 'free · $5/mo'],
    overlap: ['74 shared keywords', '62 shared keywords', '18 shared keywords', '11 shared keywords'],
    notes: [
      'The incumbent. Dropped out of the top 10 for 9 queries this month; pricing is the most common complaint.',
      'Strongest on SEO: owns the "free uptime monitor" cluster with 40+ comparison pages.',
      'Entered 4 months ago with status-page templates. Growing fastest.',
      'Cheapest. Small, mostly Product Hunt and Reddit traffic.',
    ],
    gapNotes: ['Low competition and exactly your audience.', 'People leaving the incumbent search this.', 'An adjacent feature you already have.', 'Nobody targets it yet.'],
    owners: ['statuskit.dev (#3)', 'uptimely.io (#2)', 'uptimely.io (#4)', 'nobody'],
    positioning: [
      'Lead with the price gap for side projects: "status page + monitoring for $5, not $29".',
      'Build comparison pages against pingward and uptimely first — that is where switchers search.',
      'Skip "free uptime monitor": uptimely owns it with 40+ pages.',
    ],
  },
  zh: {
    createdAt: '2026年10月18日',
    headline: '两家老牌占着 “free uptime monitor”，机会在“给副业项目用的状态页”。',
    traffic: ['约 8.5 万访问/月', '约 4.8 万访问/月', '约 1.2 万访问/月', '约 6 千访问/月'],
    pricing: ['$20/月起', '免费 · $9–$49/月', '$12/月', '免费 · $5/月'],
    overlap: ['74 个共同关键词', '62 个共同关键词', '18 个共同关键词', '11 个共同关键词'],
    notes: [
      '老牌玩家。这个月有 9 个词掉出前 10，用户吐槽最多的是价格。',
      'SEO 最强：靠 40 多个对比页占住了 “free uptime monitor” 这一组词。',
      '4 个月前靠状态页模板进场，增长最快。',
      '最便宜。体量小，流量主要来自 Product Hunt 和 Reddit。',
    ],
    gapNotes: ['竞争小，搜的正是你的目标用户。', '想离开老牌产品的人在搜这个。', '你已经有的相邻功能。', '还没人做这个词。'],
    owners: ['statuskit.dev（第 3）', 'uptimely.io（第 2）', 'uptimely.io（第 4）', '还没人做'],
    positioning: [
      '主打副业项目的价格差：“状态页 + 监控，$5 一个月，不是 $29”。',
      '先做针对 pingward 和 uptimely 的对比页，想换产品的人就在那里搜。',
      '别碰 “free uptime monitor”：uptimely 用 40 多个页面占住了。',
    ],
  },
}

const discussionCopy = {
  en: {
    createdAt: 'Oct 18, 2026',
    headline: '8 high-intent posts this week. 3 people are actively looking for a cheaper status page.',
    channels: [
      { label: 'X', volume: '~40 relevant posts a day', note: '8 high-intent this week. Checked every hour.' },
      { label: 'Reddit · r/SaaS, r/selfhosted, r/sideproject', volume: '6 threads this week', note: 'Found through Google search, so 1–3 days behind.' },
      { label: 'Hacker News', volume: '2 threads this week', note: 'Mostly competitor launches.' },
    ],
  },
  zh: {
    createdAt: '2026年10月18日',
    headline: '这周有 8 条高意图帖子，其中 3 个人正在找更便宜的状态页。',
    channels: [
      { label: 'X', volume: '每天约 40 条相关帖子', note: '这周 8 条高意图。每小时检查一次。' },
      { label: 'Reddit · r/SaaS、r/selfhosted、r/sideproject', volume: '这周 6 个帖子', note: '通过 Google 搜索找到，会晚 1–3 天。' },
      { label: 'Hacker News', volume: '这周 2 个帖子', note: '大多是竞品发布。' },
    ],
  },
}

const productCopy = {
  en: {
    createdAt: 'Oct 18, 2026',
    headline: 'Growing, but two incumbents own the big terms. Win switchers from pingward and reply to the people already asking.',
    metrics: ['Visits (30d, est.)', 'Keywords in top 20', 'Avg. position'],
    actions: [
        {
          title: 'Write "pingward alternative" while the price change is fresh',
          summary: 'pingward raised its starter plan to $29 three days ago. People are already asking for cheaper options, and only one comparison page ranks.',
          window: 'The price change is 3 days old',
          effort: '~3h',
          upside: '≈700 visits/mo',
          signals: ['pingward.com raised its starter plan to $29', '3 posts this week asking for cheaper options', '720 searches/mo · KD 14'],
          brief: { workingTitle: 'Best Pingward Alternatives in 2026 (Cheaper Status Pages for Small Projects)', outline: ['What changed in pingward’s pricing', 'Side-by-side price table', 'When pingward is still the right pick', 'How to migrate in 10 minutes'] },
        },
        {
          title: 'Reply to 2 high-intent threads today',
          summary: 'Two people are asking for exactly what you sell, and neither thread has a good answer yet.',
          window: 'Threads go quiet after about a day',
          effort: '~15 min',
          upside: '2 warm leads',
          signals: ['@mara_ships · 14 replies, no clear answer', 'u/quietstack · 23 comments'],
          brief: { workingTitle: 'Replies for @mara_ships and u/quietstack', outline: ['Answer the question first', 'Mention pagepulse last and say you made it', 'Skip the link unless asked'] },
        },
] as ActionCopy[],
  },
  zh: {
    createdAt: '2026年10月18日',
    headline: '在增长，但大词被两家老牌占着。从 pingward 手里抢想换产品的人，并回复已经在问的人。',
    metrics: ['访问量（30 天，估算）', '前 20 名的关键词', '平均排名'],
    actions: [
        {
          title: '趁涨价还新鲜，写一篇 “pingward alternative”',
          summary: 'pingward 三天前把入门套餐涨到了 $29。已经有人在问更便宜的选择，而排上去的对比页只有一个。',
          window: '涨价才 3 天',
          effort: '约 3 小时',
          upside: '≈ 每月 700 访问',
          signals: ['pingward.com 入门套餐涨到 $29', '这周有 3 条帖子在问更便宜的选择', '月搜 720 · KD 14'],
          brief: { workingTitle: '2026 年最好的 Pingward 替代品（给小项目的便宜状态页）', outline: ['pingward 的价格改了什么', '价格对比表', '什么情况下 pingward 仍然是对的选择', '10 分钟迁移过来'] },
        },
        {
          title: '今天回复 2 条高意图帖子',
          summary: '有两个人在找的正是你卖的东西，两个帖子都还没有好答案。',
          window: '帖子过一天左右就没人看了',
          effort: '约 15 分钟',
          upside: '2 个潜在客户',
          signals: ['@mara_ships · 14 条回复，还没有明确答案', 'u/quietstack · 23 条评论'],
          brief: { workingTitle: '给 @mara_ships 和 u/quietstack 的回复', outline: ['先回答问题', '最后再提 pagepulse，并说明是你做的', '别人没要就先别放链接'] },
        },
] as ActionCopy[],
  },
}

/** Growth moves for pagepulse.dev, shared with its monitor's weekly suggestions. */
export function getPagepulseActions(locale: Locale) {
  return buildActions(
    productCopy[locale].actions,
    [
      { id: 'p-alt', type: 'competitor_gap', score: 84, signals: [{ source: 'competitor', value: '' }, { source: 'x', value: '' }, { source: 'keyword', value: '' }] },
      { id: 'p-reply', type: 'quick_win', score: 79, signals: [{ source: 'x', value: '' }, { source: 'reddit', value: '' }] },
    ],
    [
      { targetKeyword: 'pingward alternative', secondaryKeywords: ['cheap status page', 'pingward pricing'] },
      { targetKeyword: '', secondaryKeywords: [] },
    ],
  )
}

function productReport(locale: Locale): ProductReport {
  const c = competitorCopy[locale]
  const d = discussionCopy[locale]
  const p = productCopy[locale]
  const rows = [
    { domain: 'pingward.com', trend: 'down' as const },
    { domain: 'uptimely.io', trend: 'up' as const },
    { domain: 'statuskit.dev', trend: 'up' as const },
    { domain: 'sitecanary.io', trend: 'flat' as const },
  ]
  const gaps = [
    { keyword: 'status page for side projects', volume: 480, kd: 8 },
    { keyword: 'pingward alternative', volume: 720, kd: 14 },
    { keyword: 'cron job monitoring free', volume: 390, kd: 11 },
    { keyword: 'uptime monitor for indie hackers', volume: 170, kd: 3 },
  ]
  const channelSources = ['x', 'reddit', 'hn'] as const
  return {
    id: 'rpt-pagepulse',
    kind: 'product',
    query: 'pagepulse.dev',
    createdAt: p.createdAt,
    headline: p.headline,
    ownerMetrics: [
      { label: p.metrics[0], value: '3.1K', delta: '+22%' },
      { label: p.metrics[1], value: '41', delta: '+9' },
      { label: p.metrics[2], value: '23.6', delta: '+3.2' },
    ],
    competitors: rows.map((row, i) => ({ ...row, traffic: c.traffic[i], pricing: c.pricing[i], overlap: c.overlap[i], note: c.notes[i] })),
    gaps: gaps.map((gap, i) => ({ ...gap, owner: c.owners[i], note: c.gapNotes[i] })),
    channels: d.channels.map((channel, i) => ({ ...channel, source: channelSources[i] })),
    mentions: getDemoMentions(locale),
    actions: getPagepulseActions(locale),
    sources: [
      { tool: 'gsc', calls: 2 },
      { tool: 'dfs_labs', calls: 4 },
      { tool: 'x', calls: 2 },
      { tool: 'dfs_serp', calls: 2 },
      { tool: 'ai', calls: 1 },
    ],
  }
}

/* ---------- Market report ---------- */

const marketCopy = {
  en: {
    query: 'AI video generation tools',
    createdAt: 'Oct 16, 2026',
    headline: 'Still growing fast, but the generic terms are taken. The openings are vertical use cases and honest "free, no watermark" comparisons.',
    metrics: [
      { label: 'Searches in the category', value: '+68% in 30 days', note: 'Across 140 tracked keywords.' },
      { label: 'New tools this month', value: '12', note: '4 already rank for their brand plus "free".' },
      { label: 'Average CPC', value: '$3.10', note: 'Advertisers pay; affiliate programs pay 20–30%.' },
    ],
    players: [
      { traffic: '~1.2M visits/mo', pricing: 'free · $12–$48/mo', overlap: 'Leader', note: 'Owns "ai video generator" and most "free" queries.' },
      { traffic: '~410K visits/mo', pricing: '$19/mo', overlap: 'Short-form', note: 'Wins on TikTok and Reels templates.' },
      { traffic: '~95K visits/mo', pricing: 'free · $10/mo', overlap: 'New model', note: 'Launched two weeks ago; almost no guide sites yet.' },
      { traffic: '~60K visits/mo', pricing: '$24/mo', overlap: 'Templates', note: 'Losing rankings to the newer models.' },
    ],
    openings: [
      'Vertical use cases are nearly empty: "ai video for real estate" has KD 6 and no dedicated tool page.',
      'Honest "free, no watermark" comparisons — the top 10 is the tools’ own landing pages.',
      'Guides for the newest model (lumen video ai): 2 sites so far, advertisers already bidding $3.10.',
    ],
  },
  zh: {
    query: 'AI 视频生成工具',
    createdAt: '2026年10月16日',
    headline: '还在快速增长，但通用大词已经被占了。机会在垂直场景，以及真实的“免费、无水印”对比。',
    metrics: [
      { label: '赛道搜索量', value: '30 天 +68%', note: '基于 140 个追踪关键词。' },
      { label: '本月新出现的工具', value: '12 个', note: '其中 4 个已经用“品牌名 + free”排上去了。' },
      { label: '平均 CPC', value: '$3.10', note: '广告主在出价；联盟计划佣金 20–30%。' },
    ],
    players: [
      { traffic: '约 120 万访问/月', pricing: '免费 · $12–$48/月', overlap: '龙头', note: '占着 “ai video generator” 和大部分 “free” 相关词。' },
      { traffic: '约 41 万访问/月', pricing: '$19/月', overlap: '短视频', note: '靠 TikTok 和 Reels 模板取胜。' },
      { traffic: '约 9.5 万访问/月', pricing: '免费 · $10/月', overlap: '新模型', note: '两周前上线，几乎还没有教程站。' },
      { traffic: '约 6 万访问/月', pricing: '$24/月', overlap: '模板', note: '排名正在被新模型抢走。' },
    ],
    openings: [
      '垂直场景几乎空白：“ai video for real estate” KD 只有 6，还没有专门的工具页。',
      '真实的“免费、无水印”对比：现在前 10 都是各家工具自己的落地页。',
      '最新模型（lumen video ai）的教程：目前只有 2 个站，广告主已经出价 $3.10。',
    ],
  },
}

function marketReport(locale: Locale): MarketReport {
  const c = marketCopy[locale]
  const players = [
    { domain: 'clipforge.ai', trend: 'up' as const },
    { domain: 'reelsmith.io', trend: 'up' as const },
    { domain: 'lumenvideo.ai', trend: 'up' as const },
    { domain: 'motionkit.app', trend: 'down' as const },
  ]
  return {
    id: 'rpt-ai-video-market',
    kind: 'market',
    query: c.query,
    createdAt: c.createdAt,
    headline: c.headline,
    metrics: c.metrics,
    trend: [40, 41, 43, 42, 45, 47, 46, 49, 52, 51, 54, 56, 55, 58, 61, 60, 63, 64, 66, 65, 69, 71, 70, 73, 76, 78, 77, 81, 84, 87],
    players: players.map((p, i) => ({ ...p, ...c.players[i] })),
    rising: [
      { keyword: 'lumen video ai', growth: locale === 'zh' ? '7 天 +680%' : '+680% · 7d', volume: 1900, kd: 9 },
      { keyword: 'ai video upscaler free', growth: locale === 'zh' ? '30 天 +120%' : '+120% · 30d', volume: 3600, kd: 24 },
      { keyword: 'text to video no watermark', growth: locale === 'zh' ? '30 天 +90%' : '+90% · 30d', volume: 2900, kd: 31 },
      { keyword: 'ai video for real estate', growth: locale === 'zh' ? '30 天内新出现' : 'new · 30d', volume: 480, kd: 6 },
    ],
    openings: c.openings,
    sources: [
      { tool: 'nichepop', calls: 1 },
      { tool: 'dfs_labs', calls: 3 },
      { tool: 'dfs_trends', calls: 1 },
      { tool: 'dfs_serp', calls: 4 },
      { tool: 'ai', calls: 1 },
    ],
  }
}

/* ---------- Lookups ---------- */

export const getReports = (locale: Locale = 'en'): RadarReport[] => [...keywordReports_(locale), ideaReport(locale), productReport(locale), marketReport(locale)]

export const findReport = (id: string, locale: Locale = 'en') => getReports(locale).find((report) => report.id === id)

/** Demo-only: the sample report of the right kind, labeled with what the user asked about. */
export function reportFor(query: string, kind: ReportKind, locale: Locale = 'en'): RadarReport {
  const subject = query.trim()
  if (kind === 'idea') return { ...ideaReport(locale), query: subject || ideaCopy[locale].query }
  if (kind === 'product') return { ...productReport(locale), query: cleanDomain(subject) || 'pagepulse.dev' }
  if (kind === 'market') return { ...marketReport(locale), query: subject || marketCopy[locale].query }
  const reports = keywordReports_(locale)
  const match = reports.find((report) => subject.toLowerCase().includes(report.query))
  const demoHeadline = locale === 'zh' ? demoHeadlineZh : 'Sample report — the live agent will analyze your exact keyword.'
  return match ?? { ...reports[0], id: 'rpt-demo', query: subject, headline: demoHeadline }
}

/* ---------- Follow-ups ---------- */

type FollowUp = { question: string; answer: string }

const followUps: Record<Locale, Record<ReportKind, FollowUp[]>> = {
  en: {
    keyword: [
      {
        question: 'Who ranks now and how strong are they?',
        answer:
          'The top 3 are a Reddit thread, a Discord invite and a 2-paragraph Fandom stub — none has a structured codes list. The only real competitor is a site that entered 5 hours ago with a single page and no backlinks.',
      },
      {
        question: 'Give me a title and H1',
        answer: 'Title: "Driftbound Codes (October 2026) — All Working Codes & Rewards". H1: "Driftbound Codes". Put the last-updated date right under the H1 and refresh it daily.',
      },
      {
        question: 'What other words should I cover?',
        answer: 'Cover "driftbound wiki", "driftbound map" and "driftbound tier list" next. Autocomplete shows all three, and none has a dedicated page in the top 10 yet.',
      },
    ],
    idea: [
      {
        question: 'What should the first version do?',
        answer: 'Three things only: snap a receipt, convert it at the receipt date’s rate, and export a CSV your accountant accepts. Skip bank sync and invoicing — that is where the incumbents are strong.',
      },
      {
        question: 'Where do I find my first 20 users?',
        answer: 'r/digitalnomad and r/freelance threads about taxes (9 complaints about currencies this month), plus X replies to people asking for a cheaper receiptly. Offer the export free for the first 20.',
      },
    ],
    product: [
      {
        question: 'Which competitor is easiest to win customers from?',
        answer: 'pingward.com. Its traffic is down this month, 3 of this week’s 8 high-intent posts complain about its price, and "pingward alternative" (720/mo, KD 14) has only one decent comparison page.',
      },
      {
        question: 'Which posts should I reply to first?',
        answer: '@mara_ships (asking for a cheaper status page) and u/quietstack (23 comments, no good answer yet). Both ask for exactly what you sell. Reply within a few hours — threads go quiet after a day.',
      },
      {
        question: 'How do I reply without sounding like an ad?',
        answer: 'Answer the question first, mention your product last and say you made it. Keep it to 2–3 sentences and skip the link unless someone asks for it.',
      },
    ],
    market: [
      {
        question: 'Which opening would you pick?',
        answer: '"ai video for real estate": KD 6, nobody has a dedicated page, and agents already pay for listing videos. Start with one page comparing tools for listing videos, then add templates.',
      },
      {
        question: 'Who should I watch in this market?',
        answer: 'clipforge.ai (the leader — watch its pricing and new landing pages) and lumenvideo.ai (the fastest-growing newcomer). Add both as competitors in a market monitor.',
      },
    ],
  },
  zh: {
    keyword: [
      {
        question: '现在谁在排名，实力如何？',
        answer: '前 3 是一个 Reddit 帖、一个 Discord 邀请页和一个只有两段文字的 Fandom 空壳页，都没有结构化的兑换码列表。唯一像样的对手是 5 小时前进场的一个新站，只有一个页面、没有外链。',
      },
      {
        question: '给我一个标题和 H1',
        answer: '标题："Driftbound Codes (October 2026) — All Working Codes & Rewards"。H1："Driftbound Codes"。在 H1 下面放上最后更新日期，并且每天刷新。',
      },
      {
        question: '我还应该覆盖哪些词？',
        answer: '接下来做 “driftbound wiki”、“driftbound map” 和 “driftbound tier list”。三个词都已经出现在下拉词里，前 10 里也都还没有专门的页面。',
      },
    ],
    idea: [
      {
        question: '第一版应该做什么？',
        answer: '只做三件事：拍收据、按收据当天的汇率换算、导出会计能直接用的 CSV。银行同步和开发票先别做，那是老玩家的强项。',
      },
      {
        question: '前 20 个用户去哪找？',
        answer: 'r/digitalnomad 和 r/freelance 里聊报税的帖子（这个月有 9 条在吐槽货币问题），以及 X 上想找更便宜替代品的人。前 20 个用户的导出功能免费。',
      },
    ],
    product: [
      {
        question: '从哪个竞品手里抢用户最容易？',
        answer: 'pingward.com。它这个月流量在掉，这周 8 条高意图帖子里有 3 条在吐槽它的价格，而 “pingward alternative”（月搜 720，KD 14）只有一个像样的对比页。',
      },
      {
        question: '我应该先回复哪几条？',
        answer: '@mara_ships（在找更便宜的状态页）和 u/quietstack（23 条评论，还没有好答案）。两个人要的正是你卖的东西。几个小时内回复，帖子过一天就没人看了。',
      },
      {
        question: '怎么回复才不像打广告？',
        answer: '先回答问题，最后再提你的产品，并说明是你做的。控制在 2–3 句，别人没要链接就先别放。',
      },
    ],
    market: [
      {
        question: '你会选哪个空位？',
        answer: '“ai video for real estate”：KD 6，还没人做专门的页面，而且房产经纪本来就愿意为房源视频付钱。先做一个“房源视频工具对比”页，再加模板。',
      },
      {
        question: '这个赛道里该盯谁？',
        answer: 'clipforge.ai（龙头，盯它的定价和新落地页）和 lumenvideo.ai（涨得最快的新玩家）。把两个都加进赛道监控的竞品里。',
      },
    ],
  },
}

/** Suggested follow-up questions with their demo answers, per report kind, in the reader's language. */
export const getFollowUps = (kind: ReportKind, locale: Locale = 'en'): FollowUp[] => followUps[locale][kind]
