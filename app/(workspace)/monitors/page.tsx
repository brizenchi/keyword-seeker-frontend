"use client"

import Link from "next/link"
import { ArrowUpRight, Hash, Map, Package, Plus, Swords, Zap } from "lucide-react"
import { useLocale, useT } from "@/components/i18n/locale-provider"
import { usePlan } from "@/components/monitors/use-plan"
import { isHighIntent } from "@/components/radar/mention-card"
import { buttonStyles, cardStyles } from "@/components/radar/ui"
import { useMonitors } from "@/hooks/use-monitors"
import { getMonitorFeed } from "@/lib/data/monitors"
import { cn } from "@/lib/utils"
import type { Monitor } from "@/lib/types"

function QuotaBar({ label, used, max }: { label: string; used: number; max: number }) {
  return (
    <div className={cn(cardStyles, "flex-1 px-4 py-3")}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-2 h-1.5 rounded-full bg-border">
        {max > 0 && <div className={cn("h-1.5 rounded-full", used >= max ? "bg-warning" : "bg-primary")} style={{ width: `${Math.min(100, (used / max) * 100)}%` }} />}
      </div>
    </div>
  )
}

function MonitorCard({ monitor }: { monitor: Monitor }) {
  const locale = useLocale()
  const t = useT().monitors
  const { limits } = usePlan()
  const feed = getMonitorFeed(monitor.id, locale)
  const KindIcon = monitor.kind === "keyword" ? Hash : monitor.kind === "market" ? Map : Package
  const stats = feed
    ? [
        { icon: Zap, label: t.highIntentCount(feed.mentions.filter(isHighIntent).length), tone: "text-primary" },
        { icon: ArrowUpRight, label: t.rankingsUp(feed.rankings.filter((r) => r.change > 0).length), tone: "text-success" },
        { icon: Swords, label: t.movesCount(feed.competitorMoves.length), tone: "text-warning" },
      ]
    : []

  return (
    <Link href={`/monitors/${monitor.id}`} className={cn(cardStyles, "group flex min-w-0 flex-col p-5 transition-colors hover:border-primary/40")}>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1 rounded-md bg-subtle px-1.5 py-0.5 font-medium text-body ring-1 ring-border">
          <KindIcon className="h-3 w-3" />
          {t.kinds[monitor.kind]}
        </span>
        {monitor.demo && <span className="rounded-md bg-primary-soft px-1.5 py-0.5 font-medium text-primary">{t.example}</span>}
        <span className="ml-auto">{feed ? t.checked(feed.lastCheckedMinutes, limits.checkEvery === "hour") : t.firstCheck}</span>
      </div>
      <p className="mt-3 text-base font-semibold text-foreground group-hover:text-primary">{monitor.name}</p>
      {monitor.description && <p className="mt-0.5 text-sm text-muted-foreground">{monitor.description}</p>}
      <p className="mt-2 truncate font-mono text-xs text-faint">{monitor.xQuery}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {monitor.tracks.map((track) => (
          <span key={track} className="rounded-full border border-border px-2 py-0.5 text-[11px] text-body">
            {t.tracks[track]}
          </span>
        ))}
      </div>
      {stats.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3 text-xs">
          {stats.map((stat) => (
            <span key={stat.label} className="inline-flex items-center gap-1 text-body">
              <stat.icon className={cn("h-3.5 w-3.5", stat.tone)} />
              {stat.label}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}

export default function MonitorsPage() {
  const t = useT()
  const tm = t.monitors
  const { monitors, custom, loaded } = useMonitors()
  const { limits, xPostsUsed } = usePlan()

  return (
    <div className="radar-theme min-h-screen bg-radar-bg text-radar-text">

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">{tm.title}</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tm.intro}</p>
          </div>
          <Link href="/monitors/new" className={cn(buttonStyles.primary, "h-10 shrink-0")}>
            <Plus className="h-4 w-4" />
            {tm.new}
          </Link>
        </header>

        <div className={cn("mt-6 flex flex-col gap-3 sm:flex-row", !loaded && "invisible")}>
          <QuotaBar label={tm.quotaMonitors(custom.length, limits.monitors)} used={custom.length} max={limits.monitors} />
          <QuotaBar label={limits.xPosts > 0 ? tm.quotaPosts(xPostsUsed, limits.xPosts) : tm.xQuotaLocked} used={xPostsUsed} max={limits.xPosts} />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {monitors.map((monitor) => (
            <MonitorCard key={monitor.id} monitor={monitor} />
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">{t.common.demoNote}</p>
      </main>
    </div>
  )
}
