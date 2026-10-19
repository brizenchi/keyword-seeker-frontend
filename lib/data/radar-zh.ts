import type { KeywordReport } from '../types'

// Chinese copy of the demo content in ./radar.ts. Keywords and domains stay in English.

export const wordReasonsZh: Record<string, string> = {
  'driftbound-codes': 'Roblox 游戏 3 天前上线，前 10 只有 Reddit 和 Discord 的帖子。',
  'kestrel-2-benchmark': '发布当天的尖峰，两天内会被大媒体占满。今天写一篇对比文，别买域名。',
  'lumen-video-ai': '新的文生视频模型，还没有专门的指南页，广告主已经出价 $3.10 CPC。',
  'aurora-forecast-tonight': '新闻型尖峰，48 小时内就会退潮，结果页被天气和新闻网站占据。',
  'mochi-merge-tier-list': '稳步上涨，不是尖峰。tier list 意图明确，还没有人做专门的页面。',
  'pixel-siege-wiki': '还能做，但发现之后进场了 7 个站。要做得比现在排名的空壳页更深。',
  'veil-3-prompts': '热度昨天已经见顶。适合整理一篇提示词合集，新建站已经太挤。',
  'receipt-scanner-ai': '缓慢但持续的增长，CPC $4 以上。适合做一个带免费额度的工具站。',
  'brainrot-fusion-calculator': '需求很大，但 4 天里进场了 11 个站。除非你的计算器做得更好，否则不值得。',
  'harvest-haven-codes': '兑换码意图，每周都有更新。Fandom 页面内容单薄、已经过时。',
}

type KeywordReportCopy = Pick<KeywordReport, 'createdAt' | 'headline' | 'scores' | 'roi' | 'traps' | 'serp' | 'nextSteps'>

export const keywordReportsZh: Record<string, KeywordReportCopy> = {
  'rpt-driftbound-codes': {
    createdAt: '2026年10月18日',
    headline: '值得建站，但要在 48 小时内动手。',
    scores: [
      { label: '需求', value: '月搜 2.4K · 上涨中', note: '下拉词里已经出现 codes、wiki 和 map。', tone: 'good' },
      { label: '能不能排上去', value: 'KD 4 · KGR 0.03', note: '前 10 是 Reddit、Discord 和一个 Fandom 空壳页。', tone: 'good' },
      { label: '商业价值', value: 'CPC $0.40', note: '靠广告变现的流量，不适合做订阅。', tone: 'warn' },
      { label: '竞品赚钱吗', value: '约 4 万访问/月', note: '同类游戏兑换码站靠展示广告变现。', tone: 'good' },
    ],
    roi: '一周内进前 3 是现实的：大约每月 6–9K 访问，持续 4–8 周。游戏词会退潮，要按短窗口和多站组合来规划，别押单个站。',
    traps: ['单独的 “driftbound” 会混进一张 2019 年的同名独立专辑，要做 codes 和 wiki 这类变体。', '过去 6 小时进场了 3 个新站，窗口正在关闭。'],
    serp: [
      { rank: 1, domain: 'reddit.com', pageType: '论坛帖', note: '弱：没有结构，没有兑换码列表' },
      { rank: 2, domain: 'discord.com', pageType: '邀请页', note: '弱：不是内容页' },
      { rank: 3, domain: 'driftbound.fandom.com', pageType: 'Wiki 空壳页', note: '两段文字，3 天前最后编辑' },
      { rank: 4, domain: 'youtube.com', pageType: '视频', note: '只有一个 4 分钟视频' },
      { rank: 5, domain: 'gamecodeswiki.net', pageType: '新站', note: '5 小时前进场' },
    ],
    nextSteps: ['买域名前先查一下带 “driftbound” 的域名是否可注册。', '今天就上线兑换码页和一个 wiki 页，每天更新兑换码。', '第一周补上 “driftbound map” 和 “driftbound tier list” 页面。'],
  },
  'rpt-pixel-siege-wiki': {
    createdAt: '2026年10月16日',
    headline: '还能做，但已经不容易了。',
    scores: [
      { label: '需求', value: '月搜 1.3K · 上涨中', note: '角色和兑换码相关搜索也在同步增长。', tone: 'good' },
      { label: '能不能排上去', value: 'KD 7 · KGR 0.06', note: '现在有 9 个站，大多是单页空壳。', tone: 'warn' },
      { label: '商业价值', value: 'CPC $0.30', note: '只能靠展示广告。', tone: 'warn' },
      { label: '竞品赚钱吗', value: '约 2.5 万访问/月', note: '这类游戏里排第一的 wiki 靠广告赚钱。', tone: 'good' },
    ],
    roi: '靠深度打败空壳页：角色页加兑换码追踪。进前 3 的话，预计每月 3–5K 访问。',
    traps: ['发现之后进场了 7 个站。Pro 用户提前 52 小时看到这个词，当时前 10 里只有 2 个站。'],
    serp: [
      { rank: 1, domain: 'pixelsiege.fandom.com', pageType: 'Wiki', note: '内容单薄，只有 6 页' },
      { rank: 2, domain: 'reddit.com', pageType: '论坛帖', note: '弱' },
      { rank: 3, domain: 'pixelsiegewiki.com', pageType: '新站', note: '40 小时前进场' },
    ],
    nextSteps: ['第一周做 20 个以上的角色页。', '加一个带日期的兑换码追踪。', '所有页面都从一个 tier list 页链接过去。'],
  },
}

export const demoHeadlineZh = '示例报告：正式版会针对你输入的关键词实时分析。'
