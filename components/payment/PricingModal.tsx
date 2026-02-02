"use client"

import { useState } from "react"
import { Check, X, Zap, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getPricingPlans, getBrandConfig } from "@/lib/config/app.config"
import type { PricingPlan } from "@/lib/payment/types"
import { stripeService } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "@/hooks/use-toast"

interface PricingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  feature?: string
  onSelectPlan?: (plan: PricingPlan) => void
}

export function PricingModal({ open, onOpenChange, feature, onSelectPlan }: PricingModalProps) {
  const plans = getPricingPlans()
  const brandConfig = getBrandConfig()
  const { user, isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null)

  // 调试：打印所有计划的配置
  console.log('📋 All plans configuration:', plans.map(p => ({
    id: p.id,
    stripePriceId: p.stripePriceId,
    stripeLink: p.stripeLink,
  })))

  const handleSelectPlan = async (plan: PricingPlan) => {
    // 调试日志
    console.log('🔍 Plan selected:', {
      id: plan.id,
      stripePriceId: plan.stripePriceId,
      stripeLink: plan.stripeLink,
      hasStripePriceId: !!plan.stripePriceId,
    })

    // 如果有自定义处理函数，使用它
    if (onSelectPlan) {
      onSelectPlan(plan)
      return
    }

    // 跳过 free 计划
    if (plan.id === 'free') {
      return
    }

    // 检查是否有 stripePriceId
    if (!plan.stripePriceId) {
      console.warn('⚠️ No stripePriceId found, falling back to stripeLink')
      // 降级到使用 stripeLink（如果有）
      if (plan.stripeLink) {
        window.location.href = plan.stripeLink
      } else {
        console.warn('No payment configuration for plan:', plan.id)
        toast({
          title: "Configuration Error",
          description: "Payment is not configured for this plan.",
          variant: "destructive",
        })
      }
      return
    }

    console.log('✅ Using API to create checkout session')

    try {
      setLoading(true)
      setProcessingPlanId(plan.id)

      // 确定支付模式：如果是 yearly 或 monthly，使用 subscription，否则使用 payment
      const mode = plan.id.includes('monthly') || plan.id.includes('yearly')
        ? 'subscription'
        : 'payment'

      // 构建成功和取消 URL
      const baseUrl = window.location.origin
      const successUrl = `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`
      const cancelUrl = `${baseUrl}/payment/cancel`

      console.log('📤 Creating checkout session with:', {
        price_id: plan.stripePriceId,
        mode,
        success_url: successUrl,
        cancel_url: cancelUrl,
      })

      // 调用后端 API 创建 Checkout Session
      // 注意：user_id 和 email 会从 JWT Token 中自动获取
      const session = await stripeService.createCheckout({
        price_id: plan.stripePriceId,
        mode,
        success_url: successUrl,
        cancel_url: cancelUrl,
      })

      console.log('✅ Checkout session created:', session)

      // 重定向到 Stripe Checkout
      if (session.url) {
        window.location.href = session.url
      } else {
        throw new Error('No checkout URL returned from server')
      }
    } catch (error) {
      console.error('❌ Failed to create checkout session:', error)
      toast({
        title: "Payment Error",
        description: "Failed to start payment process. Please try again.",
        variant: "destructive",
      })
      setLoading(false)
      setProcessingPlanId(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border p-0 overflow-hidden">
        <div className="bg-gradient-to-b from-indigo/10 to-transparent p-6 pb-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <Zap className="h-5 w-5 text-indigo" />
              Upgrade Your Plan
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
              key={plan.id}
              className={cn(
                "rounded-xl border p-5 transition-all",
                plan.popular ? "border-indigo bg-indigo/5 ring-1 ring-indigo/20" : "border-border bg-background",
              )}
            >
              {plan.popular && (
                <div className="flex items-center gap-1 text-xs font-semibold text-indigo mb-3">
                  <Zap className="h-3 w-3" />
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
                onClick={() => handleSelectPlan(plan)}
                disabled={plan.disabled || loading}
                className={cn(
                  "w-full mt-5",
                  plan.popular
                    ? "bg-indigo hover:bg-indigo/90 text-white"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                )}
              >
                {loading && processingPlanId === plan.id ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  plan.cta
                )}
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
