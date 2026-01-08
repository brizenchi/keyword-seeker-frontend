"use client"

import type React from "react"

import { Zap, Rocket, Building2, Clock, Search, Brain, Bell, FileDown, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const tiers = [
  {
    name: "Starter",
    nameCn: "探索版",
    price: "$0",
    period: "/月",
    description: "免费体验，建立信任",
    features: [
      { icon: TrendingUpIcon, text: "查看 Top 10 热门趋势（每日更新）" },
      { icon: Clock, text: "数据延迟 48 小时" },
      { icon: Brain, text: "AI 总结每天仅限 3 次" },
      { icon: Search, text: "无法搜索自定义关键词", disabled: true },
    ],
    cta: "免费开始",
    popular: false,
    accent: "zinc",
  },
  {
    name: "Pro",
    nameCn: "创造者版",
    price: "$29",
    period: "/月",
    description: "独立开发者的最佳选择",
    features: [
      { icon: Zap, text: "实时数据 (Last 24h)" },
      { icon: Search, text: "自定义 Niche 搜索" },
      { icon: Brain, text: "AI 痛点挖掘 (500次/月)" },
      { icon: Bell, text: "关注 5 个关键词邮件提醒" },
    ],
    cta: "升级 Pro",
    popular: true,
    accent: "indigo",
  },
  {
    name: "Scale",
    nameCn: "团队版",
    price: "$99",
    period: "/月",
    description: "适合咨询公司与创业团队",
    features: [
      { icon: Rocket, text: "无限 AI 用量 + 商业计划书生成" },
      { icon: FileDown, text: "数据导出 (CSV/API)" },
      { icon: Globe, text: "多数据源 (HN, PH, Twitter)" },
      { icon: Building2, text: "白标 PDF 报告导出" },
    ],
    cta: "联系销售",
    popular: false,
    accent: "rose",
  },
]

function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}

export function PricingCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={cn(
            "relative flex flex-col rounded-2xl border bg-card p-6 transition-all duration-300",
            tier.popular
              ? "border-indigo shadow-lg shadow-indigo/20 scale-105"
              : "border-border hover:border-muted-foreground/50",
          )}
        >
          {tier.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="rounded-full bg-indigo px-3 py-1 text-xs font-semibold text-white">最受欢迎</span>
            </div>
          )}

          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
              <span className="text-sm text-muted-foreground">{tier.nameCn}</span>
            </div>
            <div className="mt-4 flex items-baseline">
              <span
                className={cn(
                  "font-mono text-4xl font-bold",
                  tier.accent === "indigo" && "text-indigo",
                  tier.accent === "rose" && "text-rose",
                  tier.accent === "zinc" && "text-foreground",
                )}
              >
                {tier.price}
              </span>
              <span className="ml-1 text-muted-foreground">{tier.period}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
          </div>

          <ul className="mb-6 flex-1 space-y-3">
            {tier.features.map((feature, idx) => (
              <li
                key={idx}
                className={cn(
                  "flex items-start gap-3 text-sm",
                  feature.disabled ? "text-muted-foreground/50" : "text-muted-foreground",
                )}
              >
                <feature.icon
                  className={cn(
                    "mt-0.5 h-4 w-4 shrink-0",
                    feature.disabled
                      ? "text-muted-foreground/50"
                      : tier.accent === "indigo"
                        ? "text-indigo"
                        : tier.accent === "rose"
                          ? "text-rose"
                          : "text-emerald-500",
                  )}
                />
                <span className={feature.disabled ? "line-through" : ""}>{feature.text}</span>
              </li>
            ))}
          </ul>

          <Button
            className={cn(
              "w-full font-semibold",
              tier.popular ? "bg-indigo hover:bg-indigo/90 text-white" : "bg-secondary hover:bg-secondary/80",
            )}
          >
            {tier.cta}
          </Button>
        </div>
      ))}
    </div>
  )
}
