"use client"

import Link from "next/link"
import { ArrowDown, ArrowRight, ArrowUp, ChevronDown, Eye, Lock, Sparkles } from "lucide-react"
import { useT } from "@/components/i18n/locale-provider"
import { monitorParamsFromWord } from "@/lib/data/monitors"
import { cn } from "@/lib/utils"
import type { RadarConfidence, RadarVerdict, RadarWord } from "@/lib/types"

const VERDICT: Record<RadarVerdict, { className: string; stroke: string }> = {
  build: { className: "bg-primary-soft text-primary", stroke: "stroke-success" },
  content: { className: "bg-warning-soft text-warning", stroke: "stroke-warning" },
  skip: { className: "bg-muted text-muted-foreground", stroke: "stroke-faint" },
}

const CONFIDENCE_DOT: Record<RadarConfidence, string> = {
  high: "bg-success",
  medium: "bg-warning",
  low: "bg-faint",
}

const SCORE_PARTS: { key: keyof RadarWord["scoreParts"]; max: number }[] = [
  { key: "momentum", max: 25 },
  { key: "durability", max: 25 },
  { key: "rankability", max: 35 },
  { key: "value", max: 15 },
]

export function VerdictBadge({ verdict }: { verdict: RadarVerdict }) {
  const t = useT()
  return <span className={cn("inline-flex shrink-0 rounded-md px-1.5 py-0.5 text-[11px] font-semibold", VERDICT[verdict].className)}>{t.word.verdicts[verdict]}</span>
}

function scoreTone(score: number) {
  if (score >= 75) return "bg-success-soft text-success ring-success/20"
  if (score >= 60) return "bg-primary-soft text-primary ring-primary/20"
  return "bg-muted text-muted-foreground ring-border"
}

export function ScoreBadge({ word, showDelta = true }: { word: RadarWord; showDelta?: boolean }) {
  const t = useT()
  const confidence = { label: t.word.confidence[word.confidence], dot: CONFIDENCE_DOT[word.confidence] }
  return (
    <div className="flex w-14 shrink-0 flex-col items-center gap-1 self-start">
      <span className={cn("relative flex h-11 w-11 items-center justify-center rounded-xl text-lg font-semibold tabular-nums ring-1", scoreTone(word.score))}>
        {word.score}
        <span className={cn("absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-card", confidence.dot)} title={confidence.label} />
      </span>
      {showDelta && word.scoreDelta !== 0 && (
        <span className={cn("inline-flex items-center text-[11px] font-medium tabular-nums", word.scoreDelta > 0 ? "text-success" : "text-warning")}>
          {word.scoreDelta > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
          {Math.abs(word.scoreDelta)}
        </span>
      )}
    </div>
  )
}

export function MiniTrend({ data, verdict, className }: { data: number[]; verdict: RadarVerdict; className?: string }) {
  const max = Math.max(...data, 1)
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${30 - (v / max) * 28}`).join(" ")
  return (
    <svg viewBox="0 0 100 32" preserveAspectRatio="none" className={cn("h-8 w-24", className)} aria-hidden>
      <polyline points={points} fill="none" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" className={VERDICT[verdict].stroke} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export function SitesEntered({ then, now }: { then: number; now: number }) {
  const t = useT()
  const crowded = now - then >= 5
  return (
    <span className={cn("whitespace-nowrap text-xs tabular-nums", crowded ? "text-warning" : "text-body")}>
      <span className="font-semibold">{then}</span> → <span className="font-semibold">{now}</span> {t.word.sites}
    </span>
  )
}

export function ScoreBreakdown({ word }: { word: RadarWord }) {
  const t = useT()
  return (
    <div className="mt-3 rounded-lg border border-border bg-subtle p-3">
      <div className="grid gap-3 sm:grid-cols-2">
        {SCORE_PARTS.map((part) => {
          const value = word.scoreParts[part.key]
          return (
            <div key={part.key}>
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-medium text-foreground">{t.word.parts[part.key].label}</span>
                <span className="tabular-nums text-muted-foreground">
                  {value}/{part.max}
                </span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-border">
                <div className="h-1.5 rounded-full bg-primary" style={{ width: `${(value / part.max) * 100}%` }} />
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">{t.word.parts[part.key].hint}</p>
            </div>
          )
        })}
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <span className={cn("h-2 w-2 rounded-full", CONFIDENCE_DOT[word.confidence])} />
        {t.word.confidence[word.confidence]}
      </p>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] text-muted-foreground">{label}</dt>
      <dd className="text-sm font-semibold tabular-nums text-foreground">{value}</dd>
    </div>
  )
}

interface WordRowProps {
  word: RadarWord
  /** Public digest: show how much earlier Pro members saw the word. */
  showTimeGap?: boolean
  askHref?: string
  /** Show "Monitor", which turns the word into a monitor. */
  showBuild?: boolean
  /** Free plan: the commercial value breakdown is locked. */
  valueLocked?: boolean
  onUpgrade?: () => void
  expanded?: boolean
  onToggle?: () => void
}

export function WordRow({ word, showTimeGap = false, askHref, showBuild = false, valueLocked = false, onUpgrade, expanded = false, onToggle }: WordRowProps) {
  const t = useT()
  return (
    <li className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-3 px-5 py-4 md:grid-cols-[auto_minmax(0,1fr)_auto_auto] md:items-center md:gap-x-6">
      <ScoreBadge word={word} />

      <div className="min-w-0">
        <p className="text-[15px] font-semibold text-foreground">{word.keyword}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {t.word.categories[word.category] ?? word.category} · {t.word.firstSeen(t.word.ago(word.firstSeenHoursAgo))} ·{" "}
          <span className="font-medium text-success">{t.word.growth(word.growthPct, word.growthWindow)}</span>
          {word.intents.length > 0 && <> · {word.intents.join(", ")}</>}
        </p>
        <p className="mt-2 flex items-start gap-2 text-sm leading-snug text-body">
          <VerdictBadge verdict={word.verdict} />
          <span className="min-w-0">{word.reason}</span>
        </p>
        {showTimeGap && (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-primary-soft px-2 py-1 text-xs text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {t.word.timeGap(t.word.duration(word.firstSeenHoursAgo), word.sitesThen, word.sitesNow)}
          </p>
        )}
        {onToggle && (
          <button
            onClick={onToggle}
            aria-expanded={expanded}
            className="mt-2 inline-flex items-center gap-1 rounded text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 cursor-pointer"
          >
            {t.word.scoreDetails}
            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} />
          </button>
        )}
        {expanded &&
          (valueLocked ? (
            <div className="mt-3 flex flex-col gap-2 rounded-lg border border-dashed border-border bg-subtle p-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5 shrink-0" />
                {t.word.valueLocked}
              </p>
              {onUpgrade && (
                <button onClick={onUpgrade} className="btn btn--sm shrink-0">
                  {t.common.upgrade}
                </button>
              )}
            </div>
          ) : (
            <ScoreBreakdown word={word} />
          ))}
      </div>

      <div className="col-start-2 flex items-center gap-5 md:col-start-auto">
        <MiniTrend data={word.trend} verdict={word.verdict} className="hidden sm:block" />
        <dl className="grid w-44 grid-cols-3 gap-4">
          <Metric label={t.word.volume} value={word.volume >= 1000 ? `${(word.volume / 1000).toFixed(1)}K` : `${word.volume}`} />
          <Metric label={t.word.kd} value={`${word.kd}`} />
          <Metric label={t.word.kgr} value={word.kgr.toFixed(2)} />
        </dl>
      </div>

      <div className="col-start-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 md:col-start-auto md:w-28 md:flex-col md:items-end md:gap-1.5">
        <SitesEntered then={word.sitesThen} now={word.sitesNow} />
        {(askHref || showBuild) && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 md:flex-col md:items-end md:gap-1">
            {askHref && (
              <Link
                href={askHref}
                className="inline-flex items-center gap-1 whitespace-nowrap rounded-md text-sm font-medium text-primary hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                {t.word.askAi}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
            {showBuild && word.verdict !== "skip" && (
              <Link
                href={`/monitors/new?${monitorParamsFromWord(word)}`}
                className="inline-flex items-center gap-1 whitespace-nowrap rounded-md text-sm font-medium text-body hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                <Eye className="h-3.5 w-3.5" />
                {t.word.buildIt}
              </Link>
            )}
          </div>
        )}
      </div>
    </li>
  )
}

/** Teaser row for words still inside the Pro-only window: the score shows, the word doesn't. */
export function LockedWordRow({ word, unlockInHours }: { word: RadarWord; unlockInHours: number }) {
  const t = useT()
  const hiddenWord = word.keyword
    .split(" ")
    .map((part, i, arr) => (i === arr.length - 1 && word.root.includes(part) ? part : "•".repeat(part.length)))
    .join(" ")
  return (
    <li className="flex items-center gap-4 px-5 py-4">
      <ScoreBadge word={word} showDelta={false} />
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[15px] font-semibold tracking-wider text-faint">{hiddenWord}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {t.word.categories[word.category] ?? word.category} · {t.word.found(t.word.ago(word.firstSeenHoursAgo))} ·{" "}
          <span className="font-medium text-success">{t.word.growth(word.growthPct, word.growthWindow)}</span> · {t.word.competingSoFar(word.sitesNow)}
          <span className="sm:hidden"> · {t.word.freeIn(unlockInHours)}</span>
        </p>
      </div>
      <span className="hidden shrink-0 items-center gap-1.5 text-xs text-muted-foreground sm:inline-flex">
        <Lock className="h-3.5 w-3.5" />
        {t.word.proNowFreeIn(unlockInHours)}
      </span>
    </li>
  )
}
