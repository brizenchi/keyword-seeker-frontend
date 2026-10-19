"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Field({ label, hint, htmlFor, action, children }: { label: string; hint?: ReactNode; htmlFor?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="space-y-2.5 p-5">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={htmlFor} className="text-sm font-semibold text-foreground">
          {label}
        </label>
        {(hint || action) && (
          <div className="flex items-center gap-3">
            {hint && <span className="text-right text-xs text-muted-foreground">{hint}</span>}
            {action}
          </div>
        )}
      </div>
      {children}
    </div>
  )
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2",
        checked ? "bg-primary" : "bg-radar-border-strong",
      )}
    >
      <span className={cn("inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200", checked ? "translate-x-5.5" : "translate-x-0.5")} />
    </button>
  )
}
