import { cn } from "@/lib/utils"

// Shared control styles for the workspace. Buttons are the Hum `.btn` system from
// app/globals.css: primary = pear push (one per screen), secondary = soft, ghost = text.
export const buttonStyles = {
  primary: "btn",
  secondary: "btn btn--soft",
  ghost: "btn btn--ghost",
}

export const inputStyles = cn(
  "h-10 w-full rounded-lg border border-radar-border-strong bg-radar-surface px-3 text-sm text-radar-text transition-colors placeholder:text-radar-text-4",
  "focus:border-radar-primary focus:outline-none focus:ring-3 focus:ring-radar-primary/15",
)

export const cardStyles = "rounded-xl border border-radar-border bg-radar-surface shadow-card"
