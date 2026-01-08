"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Lock, TrendingUp, Lightbulb } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { KeywordDetail } from "@/lib/data"
import { X } from "lucide-react"

interface TrendDetailSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: KeywordDetail | null
}

export function TrendDetailSheet({ open, onOpenChange, data }: TrendDetailSheetProps) {
  if (!data) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center gap-3">
            <SheetTitle className="text-2xl font-bold">{data.keyword}</SheetTitle>
            <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-2 py-0.5 text-sm">
              +{data.growth}%
            </Badge>
          </div>
        </SheetHeader>

        <div className="space-y-8">
          {/* Section 1: Trend Analysis */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-indigo" />
              <h3 className="font-semibold">Trend Analysis (30 Days)</h3>
            </div>
            <div className="h-[200px] w-full border border-border rounded-lg p-2 bg-card/50">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.trendData}>
                  <XAxis dataKey="day" hide />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      border: "1px solid #27272a",
                      borderRadius: "6px",
                    }}
                    itemStyle={{ color: "#e4e4e7" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Section 2: AI Pain Points */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-rose" />
              <h3 className="font-semibold">User Pain Points</h3>
            </div>
            <div className="grid gap-3">
              {data.painPoints.map((point, index) => (
                <div 
                  key={index} 
                  className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-all hover:border-rose/30 hover:shadow-sm"
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-rose/10 transition-colors group-hover:bg-rose" />
                  <div className="flex items-start gap-3 pl-2">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose/10 text-rose">
                      <X className="h-3.5 w-3.5" />
                    </div>
                    <div className="grid gap-1">
                      <h4 className="font-medium text-foreground leading-none tracking-tight">
                        {point.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: MVP Suggestion */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <h3 className="font-semibold">Business Opportunity</h3>
            </div>
            <Card className="bg-gradient-to-br from-indigo/10 via-background to-background border-indigo/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-indigo">{data.mvpSuggestion.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {data.mvpSuggestion.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-mono bg-background/50 p-2 rounded border border-border">
                  <span className="text-muted-foreground">Target:</span>
                  <span className="text-foreground font-semibold">{data.mvpSuggestion.target}</span>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* The Hook */}
          <div className="pt-4 pb-8">
            <Button className="w-full h-12 text-base gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 relative overflow-hidden group">
              <Lock className="h-4 w-4" />
              Generate Full Business Plan
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Upgrade to Pro to generate comprehensive business plans with one click.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
