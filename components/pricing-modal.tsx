"use client"

import { Check, X, Zap, Crown } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PricingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  feature?: string
}

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Get started with basics",
    features: [
      { text: "3 searches per day", included: true },
      { text: "Top 1 result visible", included: true },
      { text: "Last 7 days data", included: true },
      { text: "Real-time trends", included: false },
      { text: "Business Plan AI", included: false },
      { text: "Export & API", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "Unlock full potential",
    popular: true,
    features: [
      { text: "Unlimited searches", included: true },
      { text: "All 15+ results visible", included: true },
      { text: "Last 24h real-time data", included: true },
      { text: "Real-time trends", included: true },
      { text: "Business Plan AI", included: true },
      { text: "Export & API", included: true },
    ],
  },
]

export function PricingModal({ open, onOpenChange, feature }: PricingModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border p-0 overflow-hidden">
        <div className="bg-gradient-to-b from-indigo/10 to-transparent p-6 pb-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <Zap className="h-5 w-5 text-indigo" />
              Upgrade to Pro
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {feature
                ? `Unlock "${feature}" and get access to all premium features.`
                : "Get unlimited access to all features and insights."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 p-6 pt-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "rounded-xl border p-5 transition-all",
                plan.popular ? "border-indigo bg-indigo/5 ring-1 ring-indigo/20" : "border-border bg-background",
              )}
            >
              {plan.popular && (
                <div className="flex items-center gap-1 text-xs font-semibold text-indigo mb-3">
                  <Crown className="h-3 w-3" />
                  RECOMMENDED
                </div>
              )}
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground font-mono">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
              </div>
              <p className="text-sm text-muted-foreground mt-1 mb-4">{plan.description}</p>

              <ul className="space-y-2.5">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                    )}
                    <span className={cn(feature.included ? "text-foreground" : "text-muted-foreground/60")}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  "w-full mt-5",
                  plan.popular
                    ? "bg-indigo hover:bg-indigo/90 text-white"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                )}
              >
                {plan.popular ? "Upgrade Now" : "Current Plan"}
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
