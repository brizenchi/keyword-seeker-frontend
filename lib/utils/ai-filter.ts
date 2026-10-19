import type { RadarFilters } from './radar-filters'

// Demo stand-in for the AI filter: turns a sentence (English or Chinese) into radar filters.
// The live version sends the sentence to the analyst; this keeps the same output shape.

const CATEGORIES: [RegExp, string][] = [
  [/游戏|\bgames?\b/i, 'Games'],
  [/ai ?工具|\bai tools?\b/i, 'AI tools'],
  [/ai ?模型|模型|\bmodels?\b/i, 'AI models'],
  [/新闻|\bnews\b/i, 'News'],
]

const ROOTS: [RegExp, string][] = [
  [/兑换码|\bcodes?\b/i, 'xxx codes'],
  [/\bwiki\b|百科/i, 'xxx wiki'],
  [/tier ?list|排行榜|排行/i, 'xxx tier list'],
  [/计算器|\bcalculators?\b/i, 'xxx calculator'],
  [/提示词|\bprompts?\b/i, 'xxx prompts'],
]

const num = (value: string) => Number(value.replace(/,/g, ''))

export function parseAiFilter(text: string): Partial<RadarFilters> | null {
  const q = text.trim().toLowerCase()
  if (!q) return null
  const f: Partial<RadarFilters> = {}

  const categories = CATEGORIES.filter(([re]) => re.test(q)).map(([, c]) => c)
  if (categories.length) f.categories = categories

  const root = ROOTS.find(([re]) => re.test(q))
  if (root) f.root = root[1]

  if (/竞争小|竞争低|容易|好排|简单|低竞争|\beasy\b|low competition|low kd/.test(q)) {
    f.maxKd = 10
    f.maxKgr = 0.1
  }
  const kd = q.match(/kd\s*(?:<=|≤|<|小于|低于|不超过|under|below)?\s*(\d+)/)
  if (kd) f.maxKd = num(kd[1])

  if (/流量大|搜索量大|量大|热门|\bbig\b|high volume|popular/.test(q)) f.minVolume = 1000
  const volume = q.match(/(\d+(?:\.\d+)?)\s*(k|千)?\s*\+?\s*(?:以上)?\s*(?:的)?\s*(?:搜索|月搜|searches|volume)/) ?? q.match(/(?:搜索量|月搜|volume)\s*(\d+(?:\.\d+)?)\s*(k|千)?/)
  if (volume) f.minVolume = Math.round(num(volume[1]) * (volume[2] ? 1000 : 1))

  if (/没几个站|还没人|没人做|空白|few sites|nobody|no one/.test(q)) f.maxSitesNow = 5
  const sites = q.match(/(?:少于|不到|低于|under|fewer than|<)\s*(\d+)\s*(?:个)?\s*(?:站|sites?)/) ?? q.match(/(\d+)\s*(?:个)?\s*站以下/)
  if (sites) f.maxSitesNow = num(sites[1])

  if (/今天|刚出现|刚出来|24 ?小时|\btoday\b|just appeared|last 24/.test(q)) f.maxAgeHours = 24
  else if (/本周|这周|一周|this week|last week|7 ?天/.test(q)) f.maxAgeHours = 168
  else {
    const days = q.match(/(\d+)\s*(?:天|days?)/)
    if (days) f.maxAgeHours = Math.min(168, num(days[1]) * 24)
  }

  if (/写文章|写一篇|文章|\bposts?\b|\barticles?\b|blog/.test(q)) f.verdicts = ['content']
  else if (/建站|做站|工具站|\bsites?\b(?! so far)|build/.test(q) && !f.maxSitesNow) f.verdicts = ['build']

  if (/高分|最好的|\bbest\b|top/.test(q)) f.minScore = 70

  if (/涨得最快|增长最快|fastest|growing/.test(q)) f.sort = 'growth'
  else if (/最新|newest|latest/.test(q) || f.maxAgeHours === 24) f.sort = 'newest'
  else if (f.maxSitesNow !== undefined) f.sort = 'sites'

  return Object.keys(f).length ? f : null
}
