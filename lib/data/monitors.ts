import type { Locale } from '../i18n'
import type { Monitor, MonitorFeed, MonitorKind, RadarReport, RadarWord } from '../types'
import { cleanDomain } from '../utils/domain'
import { buildActions, type ActionCopy } from './actions'
import { getDemoMentions } from './mentions'
import { getPagepulseActions } from './reports'

// Demo monitors and their feeds. driftboundcodes.gg, pagepulse.dev and every competitor are fictional.

const descriptions = {
  en: { pagepulse: 'Uptime monitoring and status pages for side projects', video: 'Text-to-video and AI video editing tools', videoName: 'AI video generation' },
  zh: { pagepulse: '给副业项目用的可用性监控和状态页', video: '文生视频和 AI 视频剪辑工具', videoName: 'AI 视频生成' },
}

export function getDemoMonitors(locale: Locale = 'en'): Monitor[] {
  return [
    {
      id: 'mon-driftbound',
      kind: 'keyword',
      name: 'driftbound codes',
      description: '',
      site: 'driftboundcodes.gg',
      xQuery: '"driftbound" (codes OR code OR update) -is:retweet',
      competitors: ['gamecodeswiki.net', 'driftbound.fandom.com'],
      rankKeywords: ['driftbound codes', 'driftbound wiki', 'driftbound map', 'driftbound tier list'],
      tracks: ['mentions', 'competitors', 'rankings', 'trends'],
      delivery: 'realtime',
      createdAt: Date.UTC(2026, 9, 15),
      demo: true,
    },
    {
      id: 'mon-pagepulse',
      kind: 'product',
      name: 'pagepulse.dev',
      description: descriptions[locale].pagepulse,
      site: 'pagepulse.dev',
      xQuery: '("status page" OR "uptime monitor") (cheap OR alternative OR recommend) -is:retweet',
      competitors: ['pingward.com', 'uptimely.io', 'statuskit.dev'],
      rankKeywords: ['status page for side projects', 'free uptime monitor', 'pingward alternative', 'cron job monitoring'],
      tracks: ['mentions', 'competitors', 'rankings', 'trends'],
      delivery: 'realtime',
      createdAt: Date.UTC(2026, 9, 2),
      demo: true,
    },
    {
      id: 'mon-ai-video',
      kind: 'market',
      name: descriptions[locale].videoName,
      description: descriptions[locale].video,
      site: '',
      xQuery: '("ai video generator" OR "text to video") (best OR alternative OR recommend) -is:retweet',
      competitors: ['clipforge.ai', 'reelsmith.io', 'lumenvideo.ai'],
      rankKeywords: [],
      tracks: ['mentions', 'competitors', 'trends'],
      delivery: 'digest',
      createdAt: Date.UTC(2026, 9, 16),
      demo: true,
    },
  ]
}

const feedCopy = {
  en: {
    driftbound: {
      mentions: [
        { text: 'Driftbound update 1.2 drops Friday 3pm EST — new map and 3 new codes at launch.', engagement: '210 likes' },
        { text: 'are there any driftbound codes that still work?? every site lists expired ones', engagement: '9 replies', replyDraft: 'All 6 working codes (checked this morning) are here: [your page]. We re-check them every day.' },
        { text: 'Is there a proper driftbound wiki yet? Fandom has like 2 pages.', engagement: '31 comments', replyDraft: 'Working on one — codes, the map and all 14 vehicles so far. Feedback welcome: [your page]' },
        { text: 'New on the site: Driftbound tier list, every vehicle ranked.', engagement: '12 likes' },
      ],
      moves: [
        { change: 'Added a Driftbound tier list page', impact: 'ranks #6' },
        { change: 'Codes page updated after 3 days', impact: 'back to #2' },
      ],
      trends: [
        { growth: '+240% · 24h', note: 'Update 1.2 adds a new map. Nobody has a map page yet.' },
        { growth: 'new · 6h', note: 'Patch-notes searches will spike on Friday.' },
        { growth: '+90% · 7d', note: 'gamecodeswiki.net just entered at #6.' },
      ],
      actions: [
        {
          title: 'Publish a "driftbound map" page before Friday',
          summary: 'Update 1.2 adds a new map on Friday. Searches for the map are already up 240% and nobody has a dedicated page.',
          window: 'Update 1.2 ships Friday, 3pm EST',
          effort: '~2h',
          upside: '≈1.5K visits in launch week',
          signals: ['+240% in 24h', 'No dedicated map page in the top 10', '@rbx_leaks: "new map at launch" · 210 likes'],
          brief: { workingTitle: 'Driftbound Map (Update 1.2): Every Zone, Code Spot and Secret', outline: ['Full map with zones labeled', 'Where to find codes and secrets', 'What changed in 1.2', 'Link to codes and tier list'] },
        },
        {
          title: 'Post the 1.2 codes within an hour of launch',
          summary: 'Three new codes go live with the update. The first page with working codes usually takes the top spot for launch week.',
          window: 'Friday, 3pm EST',
          effort: '~20 min',
          upside: 'Move #4 → top 3',
          signals: ['Your page: #4 for "driftbound codes"', 'driftbound.fandom.com updated after 3 days last time'],
          brief: { workingTitle: 'Driftbound Codes (Update 1.2) — All Working Codes', outline: ['Add the 3 new codes at the top', 'Mark expired codes', 'Update the date under the H1', 'Reply to the X post asking for working codes'] },
        },
      ] as ActionCopy[],
    },
    pagepulse: {
      moves: [
        { change: 'Launched on Hacker News (84 points)', impact: '+2.1K visits' },
        { change: 'Published 6 "X vs Y" comparison pages', impact: '+9 keywords' },
        { change: 'Raised the starter plan to $29/mo', impact: 'more switchers' },
      ],
      trends: [
        { growth: '+150% · 30d', note: 'AI incident summaries are a new angle; 2 competitors added them.' },
        { growth: '+60% · 30d', note: 'Open-source interest is rising. Worth a comparison post.' },
      ],
    },
  },
  zh: {
    driftbound: {
      mentions: [
        { translation: 'Driftbound 1.2 更新周五美东下午 3 点上线 —— 新地图，上线时送 3 个新兑换码。', engagement: '210 赞' },
        { translation: '还有能用的 driftbound 兑换码吗？？每个网站列的都是过期的', engagement: '9 条回复', replyDraft: 'All 6 working codes (checked this morning) are here: [your page]. We re-check them every day.' },
        { translation: '现在有像样的 driftbound wiki 吗？Fandom 上就两页。', engagement: '31 条评论', replyDraft: 'Working on one — codes, the map and all 14 vehicles so far. Feedback welcome: [your page]' },
        { translation: '网站上新：Driftbound 载具排行榜，每辆车都排了名。', engagement: '12 赞' },
      ],
      moves: [
        { change: '新增了 Driftbound 排行榜页面', impact: '排第 6' },
        { change: '兑换码页面隔了 3 天才更新', impact: '回到第 2' },
      ],
      trends: [
        { growth: '+240% · 24 小时', note: '1.2 更新会加一张新地图，还没人做地图页。' },
        { growth: '新出现 · 6 小时', note: '周五更新时，搜更新内容的人会暴涨。' },
        { growth: '+90% · 7 天', note: 'gamecodeswiki.net 刚以第 6 名进场。' },
      ],
      actions: [
        {
          title: '周五前上线一个 “driftbound map” 页面',
          summary: '1.2 更新周五会加一张新地图。搜地图的人已经涨了 240%，还没有人做专门的页面。',
          window: '1.2 更新周五美东下午 3 点上线',
          effort: '约 2 小时',
          upside: '≈ 更新那周 1.5K 访问',
          signals: ['24 小时 +240%', '前 10 里没有专门的地图页', '@rbx_leaks：“上线就有新地图” · 210 赞'],
          brief: { workingTitle: 'Driftbound 地图（1.2 更新）：所有区域、兑换码位置和隐藏点', outline: ['标好区域的完整地图', '兑换码和隐藏点在哪', '1.2 改了什么', '链接到兑换码页和排行榜'] },
        },
        {
          title: '更新上线 1 小时内发布 1.2 兑换码',
          summary: '更新会同时放出 3 个新兑换码。第一个放出可用兑换码的页面，通常能拿下更新那周的第一名。',
          window: '周五美东下午 3 点',
          effort: '约 20 分钟',
          upside: '从第 4 升到前 3',
          signals: ['你的页面：“driftbound codes” 排第 4', '上次 driftbound.fandom.com 隔了 3 天才更新'],
          brief: { workingTitle: 'Driftbound 兑换码（1.2 更新）—— 全部可用兑换码', outline: ['把 3 个新兑换码放在最上面', '标出过期的兑换码', '更新 H1 下面的日期', '回复那条在 X 上问兑换码的帖子'] },
        },
      ] as ActionCopy[],
    },
    pagepulse: {
      moves: [
        { change: '在 Hacker News 发布（84 分）', impact: '+2.1K 访问' },
        { change: '发布了 6 个 “X vs Y” 对比页', impact: '+9 个关键词' },
        { change: '入门套餐涨到 $29/月', impact: '想换的人变多' },
      ],
      trends: [
        { growth: '+150% · 30 天', note: '用 AI 总结故障是个新角度，已经有 2 个竞品加上了。' },
        { growth: '+60% · 30 天', note: '对开源方案的兴趣在涨，值得写一篇对比。' },
      ],
    },
  },
}

const themeCopy = {
  en: {
    driftbound: {
      advice: 'Players keep asking which codes still work; every site lists expired ones.',
      recommendation: 'People want a proper wiki: Fandom has two pages.',
      launch: 'Update 1.2 lands Friday with a new map and 3 codes; a competitor just shipped a tier list.',
    },
    pagepulse: {
      alternatives: '3 people this week want something cheaper than pingward; its price rise is the trigger.',
      pain: 'False alarms from single-region checks are the top complaint about uptimely.',
      advice: 'Founders with many small sites want flat pricing, not per-monitor pricing.',
      recommendation: 'People ask what to use for a few cron jobs; existing tools feel heavy.',
      money: 'Budgets are small: about $10 a month for monitoring across all side projects.',
      launch: 'Statuskit launched on Hacker News with status-page templates (84 points).',
    },
    video: {
      recommendation: 'Real-estate agents want listing videos without a $50/month tool.',
      pain: 'Watermarks on "free" plans are the main reason people switch.',
      launch: 'clipforge 3.0 shipped a bigger free tier.',
    },
  },
  zh: {
    driftbound: {
      advice: '玩家一直在问哪些兑换码还能用，各个网站列的都是过期的。',
      recommendation: '大家想要一个像样的 wiki，Fandom 上只有两页。',
      launch: '1.2 更新周五上线，有新地图和 3 个兑换码；一个竞争站刚上线了排行榜。',
    },
    pagepulse: {
      alternatives: '这周有 3 个人想找比 pingward 便宜的替代品，导火索是它涨价。',
      pain: '对 uptimely 最多的抱怨：单区域检查导致误报。',
      advice: '手上有很多小站的人想要按账号收费，而不是按监控项收费。',
      recommendation: '有人在问几个 cron 任务该用什么监控，现有工具都太重。',
      money: '预算很小：所有副业项目的监控加起来每月约 $10。',
      launch: 'Statuskit 带着状态页模板在 Hacker News 发布（84 分）。',
    },
    video: {
      recommendation: '房产经纪想要做房源视频，但不想用每月 $50 的工具。',
      pain: '“免费版”带水印是大家换工具的主要原因。',
      launch: 'clipforge 3.0 上线，免费额度更大。',
    },
  },
}

function driftboundFeed(locale: Locale): MonitorFeed {
  const c = feedCopy[locale].driftbound
  const en = feedCopy.en.driftbound
  const mentionBase = [
    { id: 'd-leak', source: 'x' as const, author: '@rbx_leaks', hoursAgo: 1, intent: 'launch' as const },
    { id: 'd-kaito', source: 'x' as const, author: '@kaito_plays', hoursAgo: 3, intent: 'advice' as const },
    { id: 'd-main', source: 'youtube' as const, author: 'YouTube · @driftmain', hoursAgo: 6, intent: 'recommendation' as const },
    { id: 'd-gcw', source: 'x' as const, author: '@gamecodeswiki', hoursAgo: 8, intent: 'launch' as const },
  ]
  return {
    themes: themeCopy[locale].driftbound,
    lastCheckedMinutes: 12,
    postsToday: 18,
    postsThisMonth: 212,
    mentions: mentionBase.map((m, i) => ({
      ...m,
      text: en.mentions[i].text,
      engagement: c.mentions[i].engagement,
      replyDraft: en.mentions[i].replyDraft,
      translation: locale === 'zh' ? (c.mentions[i] as { translation?: string }).translation : undefined,
    })),
    competitorMoves: [
      { domain: 'gamecodeswiki.net', direction: 'up', ...c.moves[0] },
      { domain: 'driftbound.fandom.com', direction: 'up', ...c.moves[1] },
    ],
    rankings: [
      { keyword: 'driftbound codes', position: 4, change: 3, volume: 2400, trend: [14, 11, 9, 7, 7, 4] },
      { keyword: 'driftbound wiki', position: 9, change: 5, volume: 1100, trend: [30, 22, 18, 14, 9] },
      { keyword: 'driftbound map', position: null, change: 0, volume: 900, trend: [] },
      { keyword: 'driftbound tier list', position: null, change: 0, volume: 480, trend: [] },
    ],
    trends: [
      { topic: 'driftbound map', ...c.trends[0] },
      { topic: 'driftbound update 1.2', ...c.trends[1] },
      { topic: 'driftbound tier list', ...c.trends[2] },
    ],
    suggestions: buildActions(
      c.actions,
      [
        { id: 'd-map', type: 'rising_topic', score: 88, signals: [{ source: 'google_trends', value: '' }, { source: 'serp', value: '' }, { source: 'x', value: '' }] },
        { id: 'd-codes', type: 'quick_win', score: 81, signals: [{ source: 'search_console', value: '' }, { source: 'competitor', value: '' }] },
      ],
      [
        { targetKeyword: 'driftbound map', secondaryKeywords: ['driftbound 1.2 map', 'driftbound secrets'] },
        { targetKeyword: 'driftbound codes', secondaryKeywords: ['driftbound 1.2 codes', 'driftbound codes october 2026'] },
      ],
    ),
  }
}

function pagepulseFeed(locale: Locale): MonitorFeed {
  const c = feedCopy[locale].pagepulse
  return {
    themes: themeCopy[locale].pagepulse,
    lastCheckedMinutes: 12,
    postsToday: 9,
    postsThisMonth: 100,
    mentions: getDemoMentions(locale),
    competitorMoves: [
      { domain: 'statuskit.dev', direction: 'up', ...c.moves[0] },
      { domain: 'uptimely.io', direction: 'up', ...c.moves[1] },
      { domain: 'pingward.com', direction: 'down', ...c.moves[2] },
    ],
    rankings: [
      { keyword: 'status page for side projects', position: 12, change: 6, volume: 480, trend: [31, 26, 22, 18, 12] },
      { keyword: 'cron job monitoring', position: 17, change: 3, volume: 1100, trend: [24, 22, 20, 17] },
      { keyword: 'free uptime monitor', position: 38, change: -2, volume: 2900, trend: [35, 36, 36, 38] },
      { keyword: 'pingward alternative', position: null, change: 0, volume: 720, trend: [] },
    ],
    trends: [
      { topic: 'status page ai', ...c.trends[0] },
      { topic: 'self hosted uptime monitor', ...c.trends[1] },
    ],
    suggestions: getPagepulseActions(locale),
  }
}

const videoCopy = {
  en: {
    mentions: [
      { engagement: '11 replies · 40 likes' },
      { engagement: '1.2K likes' },
      { engagement: '57 comments' },
    ],
    moves: [
      { change: 'Launched v3 with a bigger free tier', impact: '#1 for "free ai video"' },
      { change: 'Traffic up 180% in two weeks', impact: '+60K visits' },
      { change: 'Dropped out of the top 10 for 6 queries', impact: '−6 rankings' },
    ],
    trends: [
      { growth: 'new · 30d', note: 'Agents are asking for listing videos. KD 6, no dedicated page yet.' },
      { growth: '+90% · 30d', note: 'Frustration with watermarked free tiers is driving this.' },
    ],
    actions: [
      {
        title: 'Write "AI video tools for real estate listings" this week',
        summary: 'A new use case with real buyers: agents already pay for listing videos, and nobody ranks with a dedicated page.',
        window: 'Before the bigger tools add a real-estate template',
        effort: '~3h',
        upside: '≈600 visits/mo',
        signals: ['New in the last 30 days', '@nora_makes: "listing videos that don’t cost $50/mo" · 40 likes', '480 searches/mo · KD 6'],
        brief: { workingTitle: 'Best AI Video Tools for Real Estate Listings (2026)', outline: ['What agents need from a listing video', 'Five tools compared on price and watermark', 'A 10-minute workflow', 'Templates to start with'] },
      },
    ] as ActionCopy[],
  },
  zh: {
    mentions: [
      { engagement: '11 条回复 · 40 赞', translation: '有没有做房源视频的 AI 工具，别每月 $50 那种？' },
      { engagement: '1.2K 赞', translation: 'clipforge 3.0 上线：最长 60 秒，免费额度更大。' },
      { engagement: '57 条评论', translation: 'reelsmith “免费版”的水印太大了，准备换掉。' },
    ],
    moves: [
      { change: '发布 v3，免费额度更大', impact: '“free ai video” 排第 1' },
      { change: '两周流量涨了 180%', impact: '+6 万访问' },
      { change: '6 个词掉出前 10', impact: '−6 个排名' },
    ],
    trends: [
      { growth: '30 天内新出现', note: '房产经纪在找房源视频工具。KD 6，还没有专门的页面。' },
      { growth: '30 天 +90%', note: '大家受够了带水印的免费版，推动了这个词。' },
    ],
    actions: [
      {
        title: '这周写一篇 “房源视频 AI 工具”',
        summary: '一个有真实买家的新场景：房产经纪本来就为房源视频付钱，而且还没有人用专门的页面排上去。',
        window: '赶在大工具推出房产模板之前',
        effort: '约 3 小时',
        upside: '≈ 每月 600 访问',
        signals: ['30 天内新出现', '@nora_makes：“别每月 $50 的房源视频工具” · 40 赞', '月搜 480 · KD 6'],
        brief: { workingTitle: '2026 年最适合房源视频的 AI 工具', outline: ['房产经纪对房源视频的需求', '5 个工具的价格和水印对比', '10 分钟的制作流程', '可以直接用的模板'] },
      },
    ] as ActionCopy[],
  },
}

function videoFeed(locale: Locale): MonitorFeed {
  const c = videoCopy[locale]
  const base = [
    { id: 'v-nora', source: 'x' as const, author: '@nora_makes', hoursAgo: 4, intent: 'recommendation' as const, text: 'Need an AI video tool for real estate listings that doesn’t cost $50/mo. Anything?' },
    { id: 'v-clipforge', source: 'x' as const, author: '@clipforge', hoursAgo: 9, intent: 'launch' as const, text: 'clipforge 3.0 is live: 60-second clips and a bigger free tier.' },
    { id: 'v-tinker', source: 'bluesky' as const, author: '@vidtinker', hoursAgo: 26, intent: 'pain' as const, text: 'The watermark on reelsmith’s "free" plan is huge. Switching.' },
  ]
  return {
    themes: themeCopy[locale].video,
    lastCheckedMinutes: 40,
    postsToday: 6,
    postsThisMonth: 140,
    mentions: base.map((m, i) => ({ ...m, engagement: c.mentions[i].engagement, translation: (c.mentions[i] as { translation?: string }).translation })),
    competitorMoves: [
      { domain: 'clipforge.ai', direction: 'up', ...c.moves[0] },
      { domain: 'lumenvideo.ai', direction: 'up', ...c.moves[1] },
      { domain: 'motionkit.app', direction: 'down', ...c.moves[2] },
    ],
    rankings: [],
    trends: [
      { topic: 'ai video for real estate', ...c.trends[0] },
      { topic: 'text to video no watermark', ...c.trends[1] },
    ],
    suggestions: buildActions(
      c.actions,
      [{ id: 'v-realestate', type: 'rising_topic', score: 82, signals: [{ source: 'google_trends', value: '' }, { source: 'x', value: '' }, { source: 'keyword', value: '' }] }],
      [{ targetKeyword: 'ai video for real estate', secondaryKeywords: ['real estate listing video ai', 'ai property video'] }],
    ),
  }
}

/** Demo feed for a seeded monitor; monitors the user creates have no data until their first check. */
export function getMonitorFeed(id: string, locale: Locale = 'en'): MonitorFeed | null {
  if (id === 'mon-driftbound') return driftboundFeed(locale)
  if (id === 'mon-pagepulse') return pagepulseFeed(locale)
  if (id === 'mon-ai-video') return videoFeed(locale)
  return null
}

/** Starting X search for a new monitor: exact phrase, no retweets. */
export function defaultXQuery(kind: MonitorKind, name: string) {
  const value = name.trim()
  if (!value) return ''
  if (kind === 'product') {
    const domain = cleanDomain(value)
    const brand = domain.split('.')[0]
    return `("${brand}" OR "${domain}") -is:retweet`
  }
  if (kind === 'market') return `"${value.toLowerCase()}" (best OR alternative OR recommend) -is:retweet`
  return `"${value.toLowerCase()}" -is:retweet`
}

const BROAD_TERMS = new Set(['ai', 'video', 'game', 'games', 'app', 'apps', 'tool', 'tools', 'seo', 'codes', 'code', 'free', 'best', 'news', 'crypto', 'status', 'uptime', 'saas'])

function hash(text: string) {
  let h = 0
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0
  return h
}

export type QuotaFit = { status: 'ok' | 'tight' | 'over'; days: number }

/** How long the rest of this month's X quota lasts at a query's daily volume. */
export function quotaFit(dailyPosts: number, remaining: number): QuotaFit {
  if (dailyPosts <= 0) return { status: 'ok', days: 999 }
  const days = Math.floor(remaining / dailyPosts)
  return { status: days >= 30 ? 'ok' : days >= 10 ? 'tight' : 'over', days: Math.max(1, days) }
}

/**
 * Demo stand-in for X's post-count endpoint: roughly how many posts a query matches per day.
 * Unquoted or generic terms match thousands; exact multi-word phrases match a few dozen.
 */
export function estimateDailyPosts(query: string): number {
  const q = query.toLowerCase().trim()
  if (!q) return 0
  const phrases = [...q.matchAll(/"([^"]+)"/g)].map((m) => m[1].trim())
  const bare = q
    .replace(/"[^"]*"/g, ' ')
    .replace(/-\S+|\b\w+:\S+|[()]|\bor\b|\band\b/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
  // Volume depends on the search terms only; operators can only narrow it.
  const jitter = hash([...phrases, ...bare].join(' ')) % 30
  let daily: number
  if (phrases.length === 0) daily = bare.length <= 1 || bare.some((w) => BROAD_TERMS.has(w)) ? 2400 + jitter * 40 : 120 + jitter * 4
  else if (phrases.some((p) => p.split(/\s+/).length >= 2)) daily = 6 + (jitter % 12)
  else if (phrases.every((p) => BROAD_TERMS.has(p))) daily = 1800 + jitter * 30
  else daily = 8 + (jitter % 20)
  if (q.includes('-is:retweet')) daily *= 0.7
  if (q.includes('-is:reply')) daily *= 0.6
  return Math.max(1, Math.round(daily))
}

/** Narrower version of a query: quote the main phrase and drop retweets. */
export function narrowXQuery(query: string, name: string) {
  const phrase = name.trim().toLowerCase()
  if (!phrase) return query
  return `"${phrase}" -is:retweet -is:reply`
}

const BIG_PLATFORMS = ['reddit.com', 'discord.com', 'youtube.com', 'x.com', 'twitter.com', 'wikipedia.org', 'facebook.com']

/** Query string for /monitors/new, prefilled from a word on the radar. */
export function monitorParamsFromWord(word: RadarWord) {
  const suffix = word.root.replace(/^xxx\s*/, '')
  const base = suffix && word.keyword.endsWith(suffix) ? word.keyword.slice(0, -suffix.length).trim() : word.keyword
  const keywords = Array.from(new Set([word.keyword, ...word.intents.map((intent) => `${base} ${intent}`)])).slice(0, 4)
  return new URLSearchParams({ kind: 'keyword', name: word.keyword, keywords: keywords.join(',') }).toString()
}

export type MonitorDraft = Omit<Monitor, 'id' | 'createdAt'>

/** A ready-to-save monitor for whatever a report was about: the keyword, the idea's market, the product or the market. */
export function monitorDraftFromReport(report: RadarReport, canReadX: boolean): MonitorDraft {
  const withX = (tracks: Monitor['tracks']) => (canReadX ? tracks : tracks.filter((track) => track !== 'mentions'))
  const base = { description: '', site: '', rankKeywords: [] as string[], delivery: 'realtime' as const, channels: ['email'] }
  switch (report.kind) {
    case 'keyword':
      return {
        ...base,
        kind: 'keyword',
        name: report.query,
        xQuery: defaultXQuery('keyword', report.query),
        competitors: report.serp.map((row) => row.domain).filter((domain) => !BIG_PLATFORMS.includes(domain)),
        rankKeywords: [report.query],
        tracks: withX(['mentions', 'competitors', 'rankings', 'trends']),
      }
    case 'product':
      return {
        ...base,
        kind: 'product',
        name: report.query,
        site: report.query,
        xQuery: defaultXQuery('product', report.query),
        competitors: report.competitors.map((c) => c.domain),
        rankKeywords: report.gaps.map((gap) => gap.keyword),
        tracks: withX(['mentions', 'competitors', 'rankings', 'trends']),
      }
    case 'idea':
    case 'market': {
      const competitors = report.kind === 'idea' ? report.alternatives : report.players
      return {
        ...base,
        kind: 'market',
        name: report.query,
        description: report.query,
        xQuery: defaultXQuery('market', report.query),
        competitors: competitors.map((c) => c.domain),
        tracks: withX(['mentions', 'competitors', 'trends']),
      }
    }
  }
}
