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
    indigo: "text-[#0ea5e9] bg-[#0ea5e9]/10",
    rose: "text-[#f43f5e] bg-[#f43f5e]/10",
    green: "bg-[#10b981]/10 text-[#10b981]",
  }

  return (
    <Card className="border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-[#0ea5e9]/50 cursor-pointer">
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
            changeType === "positive" && "text-[#10b981]",
            changeType === "negative" && "text-[#f43f5e]",
            changeType === "neutral" && "text-muted-foreground",
          )}
        >
          {change}
        </p>
      </CardContent>
    </Card>
  )
}
