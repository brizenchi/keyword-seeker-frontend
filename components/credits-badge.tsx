"use client"

import { Sparkles } from "lucide-react"

interface CreditsBadgeProps {
  credits: number
  onClick?: () => void
}

export function CreditsBadge({ credits, onClick }: CreditsBadgeProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-sm transition-all hover:border-indigo/50 hover:bg-indigo/10"
    >
      <Sparkles className="h-3.5 w-3.5 text-indigo" />
      <span className="font-mono text-foreground">{credits}</span>
      <span className="text-muted-foreground">Free Credits Left</span>
    </button>
  )
}
