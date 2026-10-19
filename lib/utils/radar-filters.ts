import type { Dictionary } from '../i18n'
import type { RadarConfidence, RadarVerdict, RadarWord } from '../types'

export type RadarSort = 'score' | 'rising' | 'newest' | 'growth' | 'kgr' | 'volume' | 'sites'

export interface RadarFilters {
  sort: RadarSort
  verdicts: RadarVerdict[]
  categories: string[]
  root: string | null
  minScore: number
  maxKd: number | null
  maxKgr: number | null
  minVolume: number
  maxSitesNow: number | null
  maxAgeHours: number | null
  confidence: RadarConfidence[]
}

export const DEFAULT_FILTERS: RadarFilters = {
  sort: 'score',
  verdicts: ['build', 'content'],
  categories: [],
  root: null,
  minScore: 0,
  maxKd: null,
  maxKgr: null,
  minVolume: 0,
  maxSitesNow: null,
  maxAgeHours: null,
  confidence: [],
}

export const SORT_KEYS: RadarSort[] = ['score', 'rising', 'newest', 'growth', 'kgr', 'volume', 'sites']

export interface RadarPreset {
  id: string
  filters: Partial<RadarFilters>
}

/** Labels live in the dictionaries under filters.presets[id]. */
export const PRESETS: RadarPreset[] = [
  { id: 'best', filters: {} },
  { id: 'easy', filters: { verdicts: ['build'], maxKd: 10, maxKgr: 0.1, maxSitesNow: 5 } },
  { id: 'big-open', filters: { verdicts: ['build'], minVolume: 1000, maxSitesNow: 5 } },
  { id: 'fresh', filters: { maxAgeHours: 24, sort: 'newest' } },
  { id: 'posts', filters: { verdicts: ['content'], sort: 'growth' } },
]

export const presetFilters = (preset: RadarPreset): RadarFilters => ({ ...DEFAULT_FILTERS, ...preset.filters })

const SORTERS: Record<RadarSort, (a: RadarWord, b: RadarWord) => number> = {
  score: (a, b) => b.score - a.score,
  rising: (a, b) => b.scoreDelta - a.scoreDelta,
  newest: (a, b) => a.firstSeenHoursAgo - b.firstSeenHoursAgo,
  growth: (a, b) => b.growthPct - a.growthPct,
  kgr: (a, b) => a.kgr - b.kgr,
  volume: (a, b) => b.volume - a.volume,
  sites: (a, b) => a.sitesNow - b.sitesNow,
}

export function applyFilters(words: RadarWord[], f: RadarFilters): RadarWord[] {
  return words
    .filter((w) => f.verdicts.length === 0 || f.verdicts.includes(w.verdict))
    .filter((w) => f.categories.length === 0 || f.categories.includes(w.category))
    .filter((w) => !f.root || w.root === f.root)
    .filter((w) => w.score >= f.minScore)
    .filter((w) => f.maxKd === null || w.kd <= f.maxKd)
    .filter((w) => f.maxKgr === null || w.kgr <= f.maxKgr)
    .filter((w) => w.volume >= f.minVolume)
    .filter((w) => f.maxSitesNow === null || w.sitesNow <= f.maxSitesNow)
    .filter((w) => f.maxAgeHours === null || w.firstSeenHoursAgo <= f.maxAgeHours)
    .filter((w) => f.confidence.length === 0 || f.confidence.includes(w.confidence))
    .sort(SORTERS[f.sort])
}

/** Human-readable chips for every filter that differs from the default (sort excluded). */
export function activeFilterChips(f: RadarFilters, t: Dictionary): { key: keyof RadarFilters; label: string }[] {
  const chips: { key: keyof RadarFilters; label: string }[] = []
  const c = t.filters.chips
  const sameVerdicts = f.verdicts.length === DEFAULT_FILTERS.verdicts.length && f.verdicts.every((v) => DEFAULT_FILTERS.verdicts.includes(v))
  if (!sameVerdicts) chips.push({ key: 'verdicts', label: c.verdicts(f.verdicts.map((v) => t.word.verdicts[v])) })
  if (f.categories.length) chips.push({ key: 'categories', label: f.categories.map((x) => t.word.categories[x] ?? x).join(' · ') })
  if (f.root) chips.push({ key: 'root', label: f.root })
  if (f.minScore) chips.push({ key: 'minScore', label: c.minScore(f.minScore) })
  if (f.maxKd !== null) chips.push({ key: 'maxKd', label: c.maxKd(f.maxKd) })
  if (f.maxKgr !== null) chips.push({ key: 'maxKgr', label: c.maxKgr(f.maxKgr) })
  if (f.minVolume) chips.push({ key: 'minVolume', label: c.minVolume(f.minVolume) })
  if (f.maxSitesNow !== null) chips.push({ key: 'maxSitesNow', label: c.maxSitesNow(f.maxSitesNow) })
  if (f.maxAgeHours !== null) chips.push({ key: 'maxAgeHours', label: c.maxAgeHours(f.maxAgeHours) })
  if (f.confidence.length) chips.push({ key: 'confidence', label: c.confidence(f.confidence.map((x) => t.filters.confidenceLevels[x])) })
  return chips
}
