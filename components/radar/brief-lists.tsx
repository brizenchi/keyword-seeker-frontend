"use client"

import type { ReactNode } from "react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { RadarCompetitorMove } from "@/lib/types"
import { useT } from "@/components/i18n/locale-provider"
import { cardStyles } from "./ui"

function ListSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold text-radar-text">{title}</h2>
      <ul className={cn(cardStyles, "divide-y divide-radar-border")}>{children}</ul>
    </section>
  )
}

export function CompetitorMovesList({ moves }: { moves: RadarCompetitorMove[] }) {
  const t = useT()
  return (
    <ListSection title={t.report.competitorMoves}>
      {moves.map((move) => {
        const Arrow = move.direction === "up" ? ArrowUpRight : ArrowDownRight
        return (
          <li key={move.domain} className="flex items-start gap-3 px-4 py-3.5">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-radar-text">{move.domain}</p>
              <p className="mt-0.5 text-xs text-radar-text-3">{move.change}</p>
            </div>
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums",
                move.direction === "up" ? "bg-radar-warning-soft text-radar-warning" : "bg-radar-success-soft text-radar-success",
              )}
            >
              <Arrow className="h-3 w-3" />
              {move.impact}
            </span>
          </li>
        )
      })}
    </ListSection>
  )
}
