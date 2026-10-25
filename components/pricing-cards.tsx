"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Loader2, Check, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
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

/** Billing period, checkout and the login gate, shared by the pricing cards (modal) and the pricing table (page). */
function usePlanCheckout() {
  const router = useRouter()
  const locale = useLocale()
  const t = useT().pricing
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

  const loginDialog = <LoginDialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)} />
  return { isYearly, setIsYearly, loading, processingTier, handleUpgrade, loginDialog }
}

function BillingToggle({ isYearly, onChange, className }: { isYearly: boolean; onChange: (yearly: boolean) => void; className?: string }) {
  const t = useT().pricing
  return (
    <div className={cn("inline-flex items-center rounded-full bg-paper-2 p-1 ring-1 ring-rule", className)} role="group" aria-label={t.billingPeriod}>
      {[
        { yearly: false, label: t.monthly },
        { yearly: true, label: t.yearly },
      ].map((option) => (
        <button
          key={option.label}
          onClick={() => onChange(option.yearly)}
          aria-pressed={isYearly === option.yearly}
          className={cn(
            "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer",
            isYearly === option.yearly ? "bg-raised text-foreground shadow-card ring-1 ring-rule" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option.label}
          {option.yearly && <span className="rounded-full bg-mint-soft px-1.5 py-0.5 text-[11px] font-semibold text-success">-17%</span>}
        </button>
      ))}
    </div>
  )
}

const formatPrice = (price: number) => `$${Number.isInteger(price) ? price : price.toFixed(2)}`

export function PricingCards() {
  const t = useT().pricing
  const freeLabel = useT().plans.free
  const { isYearly, setIsYearly, loading, processingTier, handleUpgrade, loginDialog } = usePlanCheckout()

  return (
    <>
      <div className="mb-10 flex justify-center">
        <BillingToggle isYearly={isYearly} onChange={setIsYearly} />
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
                "relative flex flex-col rounded-2xl bg-card p-7 text-left",
                tier.popular ? "shadow-lift ring-2 ring-pear-deep" : "shadow-card ring-1 ring-rule",
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-foreground">{tier.name === "Free" ? freeLabel : tier.name}</h3>
                {tier.popular && (
                  <span className="rounded-full bg-pear px-2.5 py-0.5 text-xs font-semibold text-ink">{t.mostPopular}</span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{copy.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight tabular-nums text-foreground">
                  {formatPrice(price)}
                </span>
                <span className="text-sm text-muted-foreground">{period}</span>
              </div>
              <p className={cn("mt-1 h-5 text-xs text-muted-foreground", !showDiscount && "invisible")}>
                <span className="line-through">{formatPrice(originalPrice)}</span> {t.billedMonthly}
              </p>

              <button
                onClick={() => handleUpgrade(tier)}
                disabled={loading}
                className={cn("btn mt-6 w-full", !tier.popular && "btn--soft")}
              >
                {loading && processingTier === tier.name ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t.processing}
                  </>
                ) : (
                  copy.cta
                )}
              </button>

              <ul className="mt-7 flex-1 space-y-3 border-t border-rule pt-6">
                {copy.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-body">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-ink" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
      {loginDialog}
    </>
  )
}

function TableCell({ value }: { value: string | boolean }) {
  const t = useT().plans
  if (value === true) return <Check className="h-4 w-4 text-success" aria-label={t.included} />
  if (value === false) return <Minus className="h-4 w-4 text-faint" aria-label={t.notIncluded} />
  return <>{value}</>
}

/**
 * The pricing page's one surface: every plan side by side, with the price and the
 * call to action in the column heads. Pro's column carries the pear tint.
 */
export function PricingTable({ delayHours }: { delayHours: number }) {
  const t = useT().pricing
  const freeLabel = useT().plans.free
  const { isYearly, setIsYearly, loading, processingTier, handleUpgrade, loginDialog } = usePlanCheckout()
  const rows = t.tableRows(delayHours)
  const columns = ["free", "pro", "premium"] as const

  return (
    <>
      <BillingToggle isYearly={isYearly} onChange={setIsYearly} />

      <div className="mt-8 overflow-x-auto rounded-2xl bg-card shadow-card ring-1 ring-rule">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm tabular-nums">
          <caption className="sr-only">{t.tableCaption}</caption>
          <thead>
            <tr className="align-top">
              <th scope="col" className="w-[28%] p-5" />
              {tiers.map((tier, i) => {
                const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice
                const copy = t.tiers[tier.name]
                return (
                  <th key={tier.name} scope="col" className={cn("w-[24%] p-5 font-normal", tier.popular && "bg-pear-soft")}>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold text-foreground">{tier.name === "Free" ? freeLabel : tier.name}</span>
                      {tier.popular && <span className="rounded-full bg-pear px-2 py-0.5 text-[11px] font-semibold text-ink">{t.mostPopular}</span>}
                    </div>
                    <p className="mt-1 min-h-10 text-xs leading-relaxed text-muted-foreground">{copy.description}</p>
                    <p className="mt-3 flex items-baseline gap-1">
                      <span className="text-3xl font-semibold tracking-tight text-foreground">{formatPrice(price)}</span>
                      <span className="text-xs text-muted-foreground">{isYearly ? t.perYear : t.perMonth}</span>
                    </p>
                    <button
                      onClick={() => handleUpgrade(tier)}
                      disabled={loading}
                      className={cn("btn mt-4 w-full", columns[i] !== "pro" && "btn--soft")}
                    >
                      {loading && processingTier === tier.name ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {t.processing}
                        </>
                      ) : (
                        copy.cta
                      )}
                    </button>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-rule">
                <th scope="row" className="px-5 py-3.5 font-medium text-body">{row.label}</th>
                {columns.map((column) => (
                  <td key={column} className={cn("px-5 py-3.5 text-body", column === "pro" && "bg-pear-soft font-medium text-foreground")}>
                    <TableCell value={row[column]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loginDialog}
    </>
  )
}
