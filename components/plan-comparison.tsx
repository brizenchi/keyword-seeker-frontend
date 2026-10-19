"use client"

import { Check, Minus } from "lucide-react"
import { useT } from "@/components/i18n/locale-provider"
import { PUBLIC_DELAY_HOURS } from "@/lib/data/radar"

function Cell({ value }: { value: string | boolean }) {
  const t = useT().plans
  if (value === true) return <Check className="h-4 w-4 text-success" aria-label={t.included} />
  if (value === false) return <Minus className="h-4 w-4 text-faint" aria-label={t.notIncluded} />
  return <>{value}</>
}

export function PlanComparison() {
  const t = useT().plans
  const rows = t.rows(PUBLIC_DELAY_HOURS)
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-background shadow-sm">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="w-2/5 px-5 py-4 font-medium text-muted-foreground" />
            <th className="px-5 py-4 font-semibold text-foreground">{t.free}</th>
            <th className="bg-primary-soft/60 px-5 py-4 font-semibold text-foreground">{t.pro}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className="px-5 py-3.5 font-medium text-body">{row.label}</th>
              <td className="px-5 py-3.5 text-body">
                <Cell value={row.free} />
              </td>
              <td className="bg-primary-soft/60 px-5 py-3.5 font-medium text-foreground">
                <Cell value={row.pro} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
