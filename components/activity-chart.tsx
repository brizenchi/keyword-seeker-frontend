"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { day: "Mon", opportunities: 12, painPoints: 8 },
  { day: "Tue", opportunities: 19, painPoints: 14 },
  { day: "Wed", opportunities: 15, painPoints: 11 },
  { day: "Thu", opportunities: 25, painPoints: 18 },
  { day: "Fri", opportunities: 32, painPoints: 24 },
  { day: "Sat", opportunities: 28, painPoints: 20 },
  { day: "Sun", opportunities: 22, painPoints: 15 },
]

const indigoColor = "#6366f1"
const roseColor = "#f43f5e"

export function ActivityChart() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">Weekly Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="opportunityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={indigoColor} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={indigoColor} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="painPointGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={roseColor} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={roseColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#71717a", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#71717a", fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #3f3f46",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "#fafafa" }}
              />
              <Area
                type="monotone"
                dataKey="opportunities"
                stroke={indigoColor}
                fill="url(#opportunityGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="painPoints"
                stroke={roseColor}
                fill="url(#painPointGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: indigoColor }} />
            <span className="text-muted-foreground">Opportunities</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: roseColor }} />
            <span className="text-muted-foreground">Pain Points</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
