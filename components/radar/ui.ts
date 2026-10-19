import { cn } from "@/lib/utils"

// Shared control styles for the Radar app (light theme tokens from globals.css).
const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-radar-primary/30 focus-visible:ring-offset-1"

export const buttonStyles = {
  primary: cn(
    "inline-flex items-center justify-center gap-1.5 rounded-lg bg-radar-primary px-3.5 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-radar-primary-hover cursor-pointer disabled:opacity-50",
    focusRing,
  ),
  secondary: cn(
    "inline-flex items-center justify-center gap-1.5 rounded-lg border border-radar-border bg-radar-surface px-3.5 text-sm font-medium text-radar-text shadow-sm transition-colors duration-150 hover:bg-radar-subtle cursor-pointer",
    focusRing,
  ),
  ghost: cn(
    "inline-flex items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-medium text-radar-text-3 transition-colors duration-150 hover:bg-radar-subtle hover:text-radar-text cursor-pointer",
    focusRing,
  ),
}

export const inputStyles = cn(
  "h-10 w-full rounded-lg border border-radar-border bg-radar-surface px-3 text-sm text-radar-text shadow-sm transition-colors placeholder:text-radar-text-4",
  "focus:border-radar-primary focus:outline-none focus:ring-3 focus:ring-radar-primary/15",
)

export const cardStyles = "rounded-xl border border-radar-border bg-radar-surface shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
