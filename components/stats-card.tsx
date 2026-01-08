import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: LucideIcon
  accentColor: "indigo" | "rose" | "green"
}

export function StatsCard({ title, value, change, changeType, icon: Icon, accentColor }: StatsCardProps) {
  const colors = {
    indigo: "text-indigo bg-indigo/10",
    rose: "text-rose bg-rose/10",
    green: "bg-emerald-500/10 text-emerald-400",
  }

  return (
    <Card className="border-border bg-card">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">{title}</p>
            <p className="font-mono text-2xl font-bold text-foreground">{value}</p>
          </div>
          <div className={cn("rounded-lg p-2", colors[accentColor])}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <p
          className={cn(
            "mt-2 text-xs font-mono",
            changeType === "positive" && "text-emerald-400",
            changeType === "negative" && "text-rose",
            changeType === "neutral" && "text-muted-foreground",
          )}
        >
          {change}
        </p>
      </CardContent>
    </Card>
  )
}
