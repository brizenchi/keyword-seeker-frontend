"use client"

import { useMemo } from "react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import type { MonthlySearch } from "@/lib/types"
import { formatNumber } from "@/lib/utils/keyword-metrics"

interface SearchVolumeChartProps {
  data: MonthlySearch[]
  className?: string
}

export function SearchVolumeChart({ data, className }: SearchVolumeChartProps) {
  // 转换数据格式并排序（按时间倒序，最新的在右边）
  const chartData = useMemo(() => {
    return data
      .sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year
        return a.month - b.month
      })
      .map((item) => ({
        date: `${item.year}-${String(item.month).padStart(2, '0')}`,
        displayDate: `${item.year}/${item.month}`,
        volume: item.search_volume,
      }))
  }, [data])

  // 只显示最近12个月
  const recentData = chartData.slice(-12)

  // 自定义 Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-foreground mb-1">
            {payload[0].payload.displayDate}
          </p>
          <p className="text-sm text-muted-foreground">
            Volume: <span className="font-mono font-semibold text-foreground">{formatNumber(payload[0].value)}</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={recentData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
          <XAxis
            dataKey="displayDate"
            className="text-xs"
            tick={{ fill: 'currentColor', fontSize: 12 }}
            tickLine={{ stroke: 'currentColor' }}
            axisLine={{ stroke: 'currentColor' }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            className="text-xs"
            tick={{ fill: 'currentColor', fontSize: 12 }}
            tickLine={{ stroke: 'currentColor' }}
            axisLine={{ stroke: 'currentColor' }}
            tickFormatter={(value) => formatNumber(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="volume"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#colorVolume)"
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
