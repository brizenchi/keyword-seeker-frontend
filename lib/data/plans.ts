import type { ReportKind } from '../types'

// Plan limits used by the app UI. Keep in sync with the pricing copy in lib/i18n/{en,zh}.ts.

export type PlanId = 'free' | 'pro' | 'premium'

export interface PlanLimits {
  /** AI points per month for Ask AI. */
  points: number
  monitors: number
  /** X posts read per month across all monitors (X bills $0.005 per post read). */
  xPosts: number
  checkEvery: 'day' | 'hour'
}

// Free monitors skip X (rankings and competitors only), so free accounts cost almost nothing in X reads.
export const PLAN_LIMITS: Record<PlanId, PlanLimits> = {
  free: { points: 20, monitors: 1, xPosts: 0, checkEvery: 'day' },
  pro: { points: 300, monitors: 5, xPosts: 2000, checkEvery: 'hour' },
  premium: { points: 800, monitors: 15, xPosts: 4000, checkEvery: 'hour' },
}

export type PointCharge = { date: string; task: ReportKind | 'followUp'; query: string; points: number }

/** Demo point history, newest first. Free accounts have only used the first entry. */
export const DEMO_POINT_HISTORY: PointCharge[] = [
  { date: '2026-10-18', task: 'keyword', query: 'driftbound codes', points: 6 },
  { date: '2026-10-17', task: 'followUp', query: 'driftbound codes', points: 1 },
  { date: '2026-10-17', task: 'idea', query: 'receipt scanner for freelancers', points: 4 },
  { date: '2026-10-16', task: 'followUp', query: 'AI video generation', points: 1 },
  { date: '2026-10-15', task: 'followUp', query: 'pagepulse.dev', points: 1 },
  { date: '2026-10-14', task: 'followUp', query: 'pixel siege wiki', points: 1 },
]

export const demoPointHistory = (plan: PlanId) => (plan === 'free' ? DEMO_POINT_HISTORY.slice(0, 1) : DEMO_POINT_HISTORY)

/** Demo balances so the app shows realistic usage. */
export const DEMO_POINTS_USED: Record<PlanId, number> = {
  free: demoPointHistory('free').reduce((sum, c) => sum + c.points, 0),
  pro: demoPointHistory('pro').reduce((sum, c) => sum + c.points, 0),
  premium: demoPointHistory('premium').reduce((sum, c) => sum + c.points, 0),
}
export const DEMO_X_POSTS_USED: Record<PlanId, number> = { free: 0, pro: 452, premium: 952 }

/** A single Ask AI task never spends more than this without asking first. */
export const TASK_POINT_CAP = 15
