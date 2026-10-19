"use client"

import { useAuth } from "@/hooks/useAuth"
import { DEMO_X_POSTS_USED, PLAN_LIMITS, type PlanId } from "@/lib/data/plans"

/** The signed-in user's plan limits and demo usage. */
export function usePlan() {
  const { user } = useAuth()
  const plan: PlanId = user?.membership_level === "premium" ? "premium" : user?.membership_level === "pro" ? "pro" : "free"
  const limits = PLAN_LIMITS[plan]
  return { plan, limits, xPostsUsed: DEMO_X_POSTS_USED[plan], xPostsLeft: limits.xPosts - DEMO_X_POSTS_USED[plan] }
}
