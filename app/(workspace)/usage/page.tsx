"use client"

import { useState } from "react"
import { useLocale, useT } from "@/components/i18n/locale-provider"
import { usePlan } from "@/components/monitors/use-plan"
import { PricingModal } from "@/components/pricing-modal"
import { buttonStyles, cardStyles } from "@/components/radar/ui"
import { useMonitors } from "@/hooks/use-monitors"
import { getMonitorFeed } from "@/lib/data/monitors"
import { DEMO_POINTS_USED, demoPointHistory } from "@/lib/data/plans"
import { cn } from "@/lib/utils"

function Meter({ label, value, used, max }: { label: string; value: string; used: number; max: number }) {
  return (
    <div className={cn(cardStyles, "flex-1 p-4")}>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1.5 text-lg font-semibold tabular-nums text-foreground">{value}</p>
      <div className="mt-2 h-1.5 rounded-full bg-border">
        {max > 0 && <div className="h-1.5 rounded-full bg-primary" style={{ width: `${Math.min(100, (used / max) * 100)}%` }} />}
      </div>
    </div>
  )
}

/** Where this month's AI points and X posts went, so the point system stays trustworthy. */
export default function UsagePage() {
  const locale = useLocale()
  const t = useT()
  const tu = t.usage
  const { plan, limits, xPostsUsed } = usePlan()
  const { monitors } = useMonitors()
  const [showPricing, setShowPricing] = useState(false)
  const dateFormat = new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", { month: "short", day: "numeric" })
  const xByMonitor = monitors.flatMap((monitor) => {
    const feed = getMonitorFeed(monitor.id, locale)
    return feed && monitor.tracks.includes("mentions") ? [{ monitor, posts: feed.postsThisMonth }] : []
  })

  return (
    <div className="radar-theme min-h-screen bg-radar-bg text-radar-text">

      <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">{tu.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{tu.intro}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-body">
              {tu.plan}: <strong className="text-foreground">{tu.planNames[plan]}</strong>
            </span>
            {plan !== "premium" && (
              <button onClick={() => setShowPricing(true)} className={cn(buttonStyles.primary, "h-9")}>
                {t.common.upgrade}
              </button>
            )}
          </div>
        </header>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Meter label={tu.points} value={tu.used(DEMO_POINTS_USED[plan], limits.points)} used={DEMO_POINTS_USED[plan]} max={limits.points} />
          <Meter label={tu.xPosts} value={limits.xPosts > 0 ? tu.used(xPostsUsed, limits.xPosts) : tu.xLocked} used={xPostsUsed} max={limits.xPosts} />
        </div>

        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold text-foreground">{tu.history}</h2>
          <div className={cn(cardStyles, "overflow-x-auto")}>
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-4 py-2.5 font-medium">{tu.date}</th>
                  <th className="px-2 py-2.5 font-medium">{tu.task}</th>
                  <th className="px-2 py-2.5 font-medium">{tu.query}</th>
                  <th className="px-4 py-2.5 text-right font-medium">{tu.cost}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {demoPointHistory(plan).map((charge, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2.5 tabular-nums text-muted-foreground">{dateFormat.format(new Date(`${charge.date}T12:00:00Z`))}</td>
                    <td className="px-2 py-2.5 text-body">{charge.task === "followUp" ? tu.followUp : t.reports.kinds[charge.task].short}</td>
                    <td className="px-2 py-2.5 text-foreground">{charge.query}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-foreground">−{charge.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {limits.xPosts > 0 && xByMonitor.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-sm font-semibold text-foreground">{tu.byMonitor}</h2>
            <ul className={cn(cardStyles, "divide-y divide-border text-sm")}>
              {xByMonitor.map(({ monitor, posts }) => (
                <li key={monitor.id} className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="min-w-0 truncate text-foreground">{monitor.name}</span>
                  <span className="shrink-0 tabular-nums text-muted-foreground">{tu.posts(posts)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-8 text-xs text-muted-foreground">{t.common.demoNote}</p>
      </main>

      <PricingModal open={showPricing} onOpenChange={setShowPricing} feature={tu.points} />
    </div>
  )
}
