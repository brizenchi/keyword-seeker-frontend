"use client"

import { useState } from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Check, ChevronDown, Clock, Copy, Lock, Timer } from "lucide-react"
import { cn } from "@/lib/utils"
import type { RadarAction, RadarActionType, RadarBrief } from "@/lib/types"
import { useT } from "@/components/i18n/locale-provider"
import type { Dictionary } from "@/lib/i18n"
import { SIGNAL_ICONS } from "./signal-source"
import { buttonStyles, cardStyles } from "./ui"

const ACTION_DOTS: Record<RadarActionType, string> = {
  rising_topic: "bg-radar-success",
  competitor_gap: "bg-radar-warning",
  quick_win: "bg-radar-primary",
}

type ActionStatus = "open" | "done" | "dismissed"

function scoreStyles(score: number) {
  if (score >= 80) return "bg-radar-success-soft text-radar-success"
  if (score >= 70) return "bg-radar-primary-soft text-radar-primary"
  return "bg-radar-warning-soft text-radar-warning"
}

function briefToMarkdown(brief: RadarBrief, md: Dictionary["actions"]["markdown"]) {
  return [
    `# ${brief.workingTitle}`,
    "",
    `${md.target}: ${brief.targetKeyword}`,
    `${md.secondary}: ${brief.secondaryKeywords.join(", ")}`,
    "",
    `## ${md.outline}`,
    ...brief.outline.map((item, index) => `${index + 1}. ${item}`),
  ].join("\n")
}

function Brief({ brief }: { brief: RadarBrief }) {
  const t = useT().actions
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(briefToMarkdown(brief, t.markdown))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg border border-radar-border bg-radar-subtle p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-radar-text">{brief.workingTitle}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {brief.targetKeyword && <span className="rounded-md bg-radar-primary-soft px-2 py-0.5 text-xs font-medium text-radar-primary">{brief.targetKeyword}</span>}
            {brief.secondaryKeywords.map((keyword) => (
              <span key={keyword} className="rounded-md border border-radar-border bg-radar-surface px-2 py-0.5 text-xs text-radar-text-2">
                {keyword}
              </span>
            ))}
          </div>
        </div>
        <button onClick={handleCopy} className={cn(buttonStyles.secondary, "h-8 shrink-0 px-2.5 text-xs")}>
          {copied ? <Check className="h-3.5 w-3.5 text-radar-success" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? t.copied : t.copy}
        </button>
      </div>
      <ol className="mt-4 space-y-2 border-t border-radar-border pt-4">
        {brief.outline.map((item, index) => (
          <li key={item} className="flex gap-3 text-sm text-radar-text-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-radar-surface text-[11px] font-medium tabular-nums text-radar-text-3 ring-1 ring-radar-border">
              {index + 1}
            </span>
            {item}
          </li>
        ))}
      </ol>
    </div>
  )
}

interface ActionListProps {
  actions: RadarAction[]
  locked: boolean
  onUpgrade: () => void
  /** Shared pages: viewers can read moves but not mark them. */
  readOnly?: boolean
}

export function ActionList({ actions, locked, onUpgrade, readOnly = false }: ActionListProps) {
  const t = useT().actions
  const [statuses, setStatuses] = useState<Record<string, ActionStatus>>({})
  const setStatus = (id: string, status: ActionStatus) => setStatuses((prev) => ({ ...prev, [id]: status }))

  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      defaultValue={actions[0]?.id}
      className={cn(cardStyles, "divide-y divide-radar-border overflow-hidden")}
    >
      {actions.map((action, index) => {
        const status = statuses[action.id] ?? "open"

        return (
          <AccordionPrimitive.Item key={action.id} value={action.id}>
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger
                className={cn(
                  "group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-150 hover:bg-radar-subtle cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-radar-primary/30",
                )}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-radar-subtle text-xs font-semibold tabular-nums text-radar-text-3 ring-1 ring-radar-border">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={cn("text-[15px] font-semibold text-radar-text", status !== "open" && "text-radar-text-4 line-through")}>
                    {action.title}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-radar-text-3">
                    <span className="inline-flex items-center gap-1.5 font-medium text-radar-text-2">
                      <span className={cn("h-1.5 w-1.5 rounded-full", ACTION_DOTS[action.type])} />
                      {t.types[action.type]}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {action.effort}
                    </span>
                    <span className="font-medium text-radar-success">{action.upside}</span>
                    {status === "done" && <span className="font-medium text-radar-primary">{t.done}</span>}
                    {status === "dismissed" && <span>{t.dismissed}</span>}
                  </div>
                </div>
                <span className={cn("shrink-0 rounded-md px-2 py-1 text-sm font-semibold tabular-nums", scoreStyles(action.score))}>
                  {action.score}
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-radar-text-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>

            <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="space-y-5 px-5 pb-6 sm:pl-16">
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed text-radar-text-2">{action.summary}</p>
                  <p className="inline-flex items-center gap-1.5 rounded-md bg-radar-warning-soft px-2 py-1 text-xs font-medium text-radar-warning">
                    <Timer className="h-3.5 w-3.5" />
                    {action.window}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-radar-text-3">{t.whyNow}</p>
                  <ul className="divide-y divide-radar-border rounded-lg border border-radar-border">
                    {action.signals.map((signal) => {
                      const Icon = SIGNAL_ICONS[signal.source]
                      const label = t.sources[signal.source]
                      return (
                        <li key={signal.source} className="flex items-start gap-3 px-3 py-2.5 text-sm">
                          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-radar-text-4" />
                          <div className="min-w-0 sm:flex sm:gap-3">
                            <span className="block text-xs leading-5 text-radar-text-3 sm:w-28 sm:shrink-0 sm:text-sm">{label}</span>
                            <span className="text-radar-text">{signal.value}</span>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-radar-text-3">{t.brief}</p>
                  {locked ? (
                    <div className="flex flex-col gap-3 rounded-lg border border-dashed border-radar-border-strong bg-radar-subtle p-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="flex items-center gap-2 text-sm text-radar-text-2">
                        <Lock className="h-4 w-4 shrink-0 text-radar-text-4" />
                        {t.briefLocked}
                      </p>
                      <button onClick={onUpgrade} className={cn(buttonStyles.primary, "h-8")}>
                        {t.unlockPro}
                      </button>
                    </div>
                  ) : (
                    <Brief brief={action.brief} />
                  )}
                </div>

                {status === "open" && !readOnly && (
                  <div className="flex gap-2">
                    <button onClick={() => setStatus(action.id, "done")} className={cn(buttonStyles.secondary, "h-9")}>
                      <Check className="h-4 w-4 text-radar-success" />
                      {t.markDone}
                    </button>
                    <button onClick={() => setStatus(action.id, "dismissed")} className={cn(buttonStyles.ghost, "h-9")}>
                      {t.notRelevant}
                    </button>
                  </div>
                )}
              </div>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        )
      })}
    </AccordionPrimitive.Root>
  )
}
