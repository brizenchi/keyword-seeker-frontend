"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Loader2, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import LoginDialog from "@/components/LoginDialog"
import { stripeService } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import { useLocale, useT } from "@/components/i18n/locale-provider"
import { localizedHref } from "@/lib/i18n"

/** Description, features and CTA for each tier live in the dictionaries under pricing.tiers[name]. */
interface Tier {
  name: "Free" | "Pro" | "Premium"
  monthlyPrice: number
  yearlyPrice: number
  popular: boolean
  stripePriceIds?: {
    monthly: string
    yearly: string
  }
  stripeLinks?: {
    monthly: string
    yearly: string
  }
}

const tiers: Tier[] = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    popular: false,
  },
  {
    name: "Pro",
    monthlyPrice: 29,
    yearlyPrice: 290, // Annual price with 17% discount (2 months free)
    popular: true,
    stripePriceIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY || "",
      yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_YEARLY || "",
    },
    stripeLinks: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_LINK_PRO_MONTHLY || "",
      yearly: process.env.NEXT_PUBLIC_STRIPE_LINK_PRO_YEARLY || "",
    },
  },
  {
    name: "Premium",
    monthlyPrice: 59,
    yearlyPrice: 590, // Annual price with 17% discount (2 months free)
    popular: false,
    stripePriceIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_MONTHLY || "",
      yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_YEARLY || "",
    },
    stripeLinks: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_LINK_PREMIUM_MONTHLY || "",
      yearly: process.env.NEXT_PUBLIC_STRIPE_LINK_PREMIUM_YEARLY || "",
    },
  },
]

export function PricingCards() {
  const router = useRouter()
  const locale = useLocale()
  const t = useT().pricing
  const freeLabel = useT().plans.free
  const [isYearly, setIsYearly] = useState(false)
  const { isAuthenticated } = useAuth()
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [processingTier, setProcessingTier] = useState<string | null>(null)

  const handleUpgrade = async (tier: Tier) => {
    if (tier.name === "Free") {
      router.push("/start")
      return
    }

    // Check if user is authenticated
    if (!isAuthenticated) {
      setLoginDialogOpen(true)
      return
    }

    // Get the price ID based on billing period
    const priceId = isYearly ? tier.stripePriceIds?.yearly : tier.stripePriceIds?.monthly

    console.log('🔍 Tier selected:', {
      name: tier.name,
      isYearly,
      priceId,
      hasPriceId: !!priceId,
    })

    // If no price ID, fall back to stripe link
    if (!priceId) {
      console.warn('⚠️ No stripePriceId found, falling back to stripeLink')
      if (tier.stripeLinks) {
        const link = isYearly ? tier.stripeLinks.yearly : tier.stripeLinks.monthly
        window.location.href = link
      }
      return
    }

    console.log('✅ Using API to create checkout session')

    try {
      setLoading(true)
      setProcessingTier(tier.name)

      // Build success and cancel URLs
      const baseUrl = window.location.origin
      const successUrl = `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`
      const cancelUrl = `${baseUrl}${localizedHref("/pricing", locale)}`

      console.log('📤 Creating checkout session with:', {
        price_id: priceId,
        mode: 'subscription',
        success_url: successUrl,
        cancel_url: cancelUrl,
      })

      // Call backend API to create Checkout Session
      const session = await stripeService.createCheckout({
        price_id: priceId,
        mode: 'subscription',
        success_url: successUrl,
        cancel_url: cancelUrl,
      })

      console.log('✅ Checkout session created:', session)
      console.log('🔍 Session URL:', session.url)
      console.log('🔍 Session URL type:', typeof session.url)
      console.log('🔍 Has URL:', !!session.url)

      // Redirect to Stripe Checkout
      if (session.url) {
        console.log('🚀 Redirecting to:', session.url)
        window.location.href = session.url
      } else {
        console.error('❌ No URL in session:', session)
        throw new Error('No checkout URL returned from server')
      }
    } catch (error) {
      console.error('❌ Failed to create checkout session:', error)
      toast({
        title: t.paymentError,
        description: t.paymentErrorText,
        variant: "destructive",
      })
      setLoading(false)
      setProcessingTier(null)
    }
  }

  return (
    <>
      {/* Billing Toggle */}
      <div className="mb-10 flex justify-center">
        <div className="inline-flex items-center rounded-lg bg-muted p-1" role="group" aria-label={t.billingPeriod}>
          {[
            { yearly: false, label: t.monthly },
            { yearly: true, label: t.yearly },
          ].map((option) => (
            <button
              key={option.label}
              onClick={() => setIsYearly(option.yearly)}
              aria-pressed={isYearly === option.yearly}
              className={cn(
                "inline-flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer",
                isYearly === option.yearly ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {option.label}
              {option.yearly && (
                <span className="rounded bg-success-soft px-1.5 py-0.5 text-[11px] font-semibold text-success">-17%</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => {
          const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice
          const originalPrice = isYearly ? tier.monthlyPrice * 12 : tier.monthlyPrice
          const period = isYearly ? t.perYear : t.perMonth
          const copy = t.tiers[tier.name]
          const showDiscount = isYearly && tier.yearlyPrice > 0

          return (
            <div
              key={tier.name}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-7 text-left transition-shadow",
                tier.popular ? "border-primary shadow-[0_12px_40px_-12px_rgba(37,99,235,0.35)] ring-1 ring-primary" : "border-border shadow-sm",
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-foreground">{tier.name === "Free" ? freeLabel : tier.name}</h3>
                {tier.popular && (
                  <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary">{t.mostPopular}</span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{copy.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight tabular-nums text-foreground">
                  ${Number.isInteger(price) ? price : price.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground">{period}</span>
              </div>
              <p className={cn("mt-1 h-5 text-xs text-muted-foreground", !showDiscount && "invisible")}>
                <span className="line-through">${Number.isInteger(originalPrice) ? originalPrice : originalPrice.toFixed(2)}</span> {t.billedMonthly}
              </p>

              <Button
                onClick={() => handleUpgrade(tier)}
                disabled={loading}
                className={cn(
                  "mt-6 h-10 w-full font-semibold cursor-pointer transition-colors",
                  tier.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                    : "border border-border bg-background text-foreground shadow-sm hover:bg-subtle",
                )}
              >
                {loading && processingTier === tier.name ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {t.processing}
                  </>
                ) : (
                  copy.cta
                )}
              </Button>

              <ul className="mt-7 flex-1 space-y-3 border-t border-border pt-6">
                {copy.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-body">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
      <LoginDialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)} />
    </>
  )
}
