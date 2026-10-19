import type { Locale } from '../i18n'

// Demo data for the 30-day view on Trends: which categories are heating up and which words grew most.

export interface CategoryMomentum {
  category: string
  change: number
  newTrends: number
  trend: number[]
}

export interface MonthlyTrend {
  keyword: string
  category: string
  change: number
  status: 'rising' | 'peaked' | 'fading'
  peakDaysAgo: number
  trend: number[]
}

export const categoryMomentum: CategoryMomentum[] = [
  { category: 'AI tools', change: 68, newTrends: 14, trend: [40, 42, 41, 45, 48, 47, 52, 55, 54, 58, 62, 61, 66, 70, 74] },
  { category: 'Games', change: 41, newTrends: 22, trend: [50, 48, 53, 51, 56, 60, 57, 63, 61, 66, 64, 70, 68, 72, 71] },
  { category: 'AI models', change: 12, newTrends: 5, trend: [60, 62, 58, 70, 64, 61, 59, 75, 66, 63, 60, 62, 68, 64, 67] },
  { category: 'News', change: -18, newTrends: 9, trend: [70, 66, 72, 64, 61, 68, 58, 55, 62, 53, 50, 57, 49, 52, 47] },
]

/** Weekly count of new trends found across all roots, oldest week first. */
export const weeklyNewTrends = [31, 38, 42, 50]

const monthly: MonthlyTrend[] = [
  { keyword: 'receipt scanner ai', category: 'AI tools', change: 190, status: 'rising', peakDaysAgo: 0, trend: [20, 21, 23, 24, 27, 29, 31, 34, 37, 41, 45, 50, 55, 61, 67, 72, 78, 84, 90, 96, 100] },
  { keyword: 'mochi merge tier list', category: 'Games', change: 410, status: 'rising', peakDaysAgo: 0, trend: [5, 5, 6, 7, 8, 9, 11, 13, 15, 18, 22, 27, 33, 40, 48, 56, 63, 72, 81, 91, 100] },
  { keyword: 'lumen video ai', category: 'AI tools', change: 680, status: 'rising', peakDaysAgo: 1, trend: [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 5, 7, 10, 15, 24, 38, 56, 77, 100, 97] },
  { keyword: 'brainrot fusion calculator', category: 'Games', change: 760, status: 'peaked', peakDaysAgo: 3, trend: [2, 2, 3, 3, 4, 6, 8, 11, 15, 21, 30, 42, 57, 74, 92, 100, 96, 90, 85, 81, 78] },
  { keyword: 'veil 3 prompts', category: 'AI tools', change: 1500, status: 'fading', peakDaysAgo: 5, trend: [1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 8, 30, 100, 76, 58, 44, 35, 29, 24, 21, 19] },
  { keyword: 'aurora forecast tonight', category: 'News', change: 900, status: 'fading', peakDaysAgo: 9, trend: [5, 5, 6, 5, 6, 7, 8, 100, 64, 30, 18, 12, 10, 9, 8, 8, 7, 7, 7, 6, 6] },
]

export const getMonthlyTrends = (_locale: Locale = 'en') => monthly
