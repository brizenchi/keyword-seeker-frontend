import type { Locale } from '../i18n'
import type { RadarWatchlist, RadarWord } from '../types'
import { wordReasonsZh } from './radar-zh'

// Demo data for Trends until the backend endpoints exist.
// Game titles, AI products and domains below are fictional.

/** Free users see new keywords this many hours after Pro users. */
export const PUBLIC_DELAY_HOURS = 48

export const suggestedRoots = ['xxx codes', 'xxx game', 'xxx wiki', 'xxx tier list', 'xxx calculator', 'xxx ai', 'xxx generator', 'xxx prompts']

export const demoWatchlist: RadarWatchlist = {
  roots: ['xxx codes', 'xxx wiki', 'xxx tier list', 'xxx ai'],
  sites: ['aitoolsdigest.com', 'gamecodeshub.net'],
  delivery: { email: 'you@example.com', realtimeAlerts: true },
}

export const demoWords: RadarWord[] = [
  {
    id: 'driftbound-codes', keyword: 'driftbound codes', score: 82, scoreDelta: 6, scoreParts: { momentum: 23, durability: 20, rankability: 33, value: 6 }, confidence: 'medium',
    root: 'xxx codes', category: 'Games',
    firstSeenHoursAgo: 6, growthPct: 1240, growthWindow: '72h', trend: [2, 3, 3, 4, 6, 9, 15, 26, 41, 63, 82, 100],
    volume: 2400, kd: 4, kgr: 0.03, sitesThen: 1, sitesNow: 3, intents: ['codes', 'wiki', 'map'], verdict: 'build',
    reason: 'Roblox game launched 3 days ago. Only Reddit and Discord threads in the top 10.',
  },
  {
    id: 'kestrel-2-benchmark', keyword: 'kestrel 2 benchmark', score: 40, scoreDelta: -9, scoreParts: { momentum: 25, durability: 5, rankability: 18, value: 10 }, confidence: 'high',
    root: 'xxx ai', category: 'AI models',
    firstSeenHoursAgo: 9, growthPct: 2100, growthWindow: '24h', trend: [1, 1, 1, 1, 2, 2, 3, 5, 12, 38, 100, 91],
    volume: 6600, kd: 22, kgr: 0.41, sitesThen: 5, sitesNow: 21, intents: ['vs', 'benchmark', 'pricing'], verdict: 'content',
    reason: 'Launch-day spike. Big media will own it within 2 days. Write a comparison post today, skip the domain.',
  },
  {
    id: 'lumen-video-ai', keyword: 'lumen video ai', score: 82, scoreDelta: 4, scoreParts: { momentum: 21, durability: 19, rankability: 30, value: 12 }, confidence: 'medium',
    root: 'xxx ai', category: 'AI tools',
    firstSeenHoursAgo: 14, growthPct: 680, growthWindow: '7d', trend: [4, 5, 5, 7, 9, 14, 22, 31, 47, 66, 84, 100],
    volume: 1900, kd: 9, kgr: 0.08, sitesThen: 2, sitesNow: 4, intents: ['free', 'pricing', 'alternative'], verdict: 'build',
    reason: 'New text-to-video model with no dedicated guide pages yet. Advertisers already bid $3.10 CPC.',
  },
  {
    id: 'aurora-forecast-tonight', keyword: 'aurora forecast tonight', score: 38, scoreDelta: -15, scoreParts: { momentum: 24, durability: 2, rankability: 8, value: 4 }, confidence: 'high',
    root: 'trending', category: 'News',
    firstSeenHoursAgo: 20, growthPct: 900, growthWindow: '24h', trend: [5, 5, 6, 5, 6, 7, 8, 9, 22, 100, 64, 30],
    volume: 12000, kd: 35, kgr: 1.8, sitesThen: 30, sitesNow: 60, intents: ['tonight', 'map'], verdict: 'skip',
    reason: 'News spike that fades within 48h. Weather and news sites own the results.',
  },
  {
    id: 'mochi-merge-tier-list', keyword: 'mochi merge tier list', score: 78, scoreDelta: 3, scoreParts: { momentum: 17, durability: 22, rankability: 34, value: 5 }, confidence: 'low',
    root: 'xxx tier list', category: 'Games',
    firstSeenHoursAgo: 31, growthPct: 410, growthWindow: '7d', trend: [10, 11, 12, 14, 17, 21, 28, 36, 49, 63, 80, 100],
    volume: 880, kd: 6, kgr: 0.05, sitesThen: 0, sitesNow: 2, intents: ['tier list', 'best units'], verdict: 'build',
    reason: 'Steady climb, not a spike. Tier-list intent is clear and nobody has a dedicated page.',
  },
  {
    id: 'pixel-siege-wiki', keyword: 'pixel siege wiki', score: 68, scoreDelta: -11, scoreParts: { momentum: 19, durability: 20, rankability: 24, value: 5 }, confidence: 'high',
    root: 'xxx wiki', category: 'Games',
    firstSeenHoursAgo: 52, growthPct: 520, growthWindow: '7d', trend: [3, 4, 6, 8, 11, 16, 24, 35, 52, 70, 88, 100],
    volume: 1300, kd: 7, kgr: 0.06, sitesThen: 2, sitesNow: 9, intents: ['wiki', 'characters', 'codes'], verdict: 'build',
    reason: 'Still winnable, but 7 sites entered since detection. Go deeper than the stubs that rank now.',
  },
  {
    id: 'veil-3-prompts', keyword: 'veil 3 prompts', score: 40, scoreDelta: -8, scoreParts: { momentum: 20, durability: 6, rankability: 15, value: 9 }, confidence: 'high',
    root: 'xxx prompts', category: 'AI tools',
    firstSeenHoursAgo: 60, growthPct: 1500, growthWindow: '48h', trend: [1, 1, 2, 2, 3, 4, 9, 30, 100, 76, 58, 44],
    volume: 4400, kd: 28, kgr: 0.6, sitesThen: 8, sitesNow: 33, intents: ['prompts', 'examples'], verdict: 'content',
    reason: 'Hype peaked yesterday. Good for a prompt-collection post, too crowded for a new site.',
  },
  {
    id: 'receipt-scanner-ai', keyword: 'receipt scanner ai', score: 74, scoreDelta: 1, scoreParts: { momentum: 12, durability: 23, rankability: 26, value: 13 }, confidence: 'high',
    root: 'xxx ai', category: 'AI tools',
    firstSeenHoursAgo: 70, growthPct: 190, growthWindow: '30d', trend: [20, 22, 25, 27, 31, 36, 42, 50, 61, 72, 86, 100],
    volume: 720, kd: 18, kgr: 0.12, sitesThen: 6, sitesNow: 11, intents: ['free', 'app'], verdict: 'build',
    reason: 'Slow, durable growth with $4+ CPC. A tool site with a free tier fits this intent.',
  },
  {
    id: 'brainrot-fusion-calculator', keyword: 'brainrot fusion calculator', score: 66, scoreDelta: -14, scoreParts: { momentum: 21, durability: 19, rankability: 20, value: 6 }, confidence: 'high',
    root: 'xxx calculator', category: 'Games',
    firstSeenHoursAgo: 96, growthPct: 760, growthWindow: '7d', trend: [2, 3, 4, 6, 9, 14, 23, 38, 57, 76, 92, 100],
    volume: 2900, kd: 12, kgr: 0.09, sitesThen: 3, sitesNow: 14, intents: ['calculator', 'values', 'trade'], verdict: 'build',
    reason: 'Big demand, but 11 sites entered in 4 days. Only worth it with a better calculator.',
  },
  {
    id: 'harvest-haven-codes', keyword: 'harvest haven codes', score: 72, scoreDelta: -2, scoreParts: { momentum: 15, durability: 21, rankability: 31, value: 5 }, confidence: 'high',
    root: 'xxx codes', category: 'Games',
    firstSeenHoursAgo: 120, growthPct: 300, growthWindow: '7d', trend: [8, 9, 11, 13, 17, 22, 29, 39, 52, 68, 84, 100],
    volume: 1600, kd: 5, kgr: 0.07, sitesThen: 1, sitesNow: 6, intents: ['codes', 'wiki'], verdict: 'build',
    reason: 'Codes intent with weekly updates. Fandom page is thin and outdated.',
  },
]

export const isFreshWord = (word: { firstSeenHoursAgo: number }) => word.firstSeenHoursAgo < PUBLIC_DELAY_HOURS

/** Demo words in the reader's language (keywords stay as searched). */
export function getDemoWords(locale: Locale = 'en'): RadarWord[] {
  if (locale === 'en') return demoWords
  return demoWords.map((word) => ({ ...word, reason: wordReasonsZh[word.id] ?? word.reason }))
}
