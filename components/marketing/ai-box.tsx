"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowUp, Zap } from "lucide-react"
import { useLocale, useT } from "@/components/i18n/locale-provider"
import { PUBLIC_DELAY_HOURS, getDemoWords } from "@/lib/data/radar"
import { REPORT_KINDS } from "@/lib/data/reports"

/** The homepage's main call to action: ask a question, land in the workspace chat with it already asked. */
export function AiBox() {
  const router = useRouter()
  const locale = useLocale()
  const t = useT()
  const [value, setValue] = useState("")
  const fresh = getDemoWords(locale)
    .filter((w) => w.verdict === "build" && w.firstSeenHoursAgo < PUBLIC_DELAY_HOURS)
    .sort((a, b) => a.firstSeenHoursAgo - b.firstSeenHoursAgo)[0]

  const ask = (question: string) => {
    if (!question.trim()) return
    router.push(`/ask?${new URLSearchParams({ q: question.trim() }).toString()}`)
  }

  return (
    <div className="mx-auto w-full max-w-3xl text-left">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          ask(value)
        }}
        className="rounded-2xl border border-border bg-background p-3 shadow-[0_24px_64px_-24px_rgba(37,99,235,0.35)] ring-1 ring-primary/10 transition-shadow focus-within:ring-primary/30"
      >
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault()
              ask(value)
            }
          }}
          rows={3}
          placeholder={t.home.boxPlaceholder}
          aria-label={t.home.boxLabel}
          className="w-full resize-none bg-transparent px-2 py-1.5 text-base leading-relaxed text-foreground outline-none placeholder:text-faint sm:text-lg"
        />
        <div className="flex items-center justify-between gap-3 px-1">
          <span className="text-xs text-muted-foreground">{t.home.boxNote}</span>
          <button
            type="submit"
            disabled={!value.trim()}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover disabled:opacity-50 cursor-pointer"
          >
            {t.home.boxSubmit}
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {fresh && (
          <button
            onClick={() => ask(t.ask.todayTrend(fresh.keyword, fresh.firstSeenHoursAgo))}
            className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success-soft px-3 py-1.5 text-xs font-medium text-success transition-colors hover:border-success/50 cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5" />
            {t.home.liveTrend(fresh.keyword, fresh.firstSeenHoursAgo)}
          </button>
        )}
        {REPORT_KINDS.map((kind) => (
          <button
            key={kind}
            onClick={() => ask(t.ask.starters[kind])}
            className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-body transition-colors hover:border-primary/40 hover:text-primary cursor-pointer"
          >
            {t.ask.starters[kind]}
          </button>
        ))}
      </div>
    </div>
  )
}
