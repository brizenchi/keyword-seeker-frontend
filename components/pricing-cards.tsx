"use client"

import type React from "react"
import { useState } from "react"

import { Zap, Crown, TrendingUp, Search, Eye, CheckCircle2, Mail, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import LoginDialog from "@/components/LoginDialog"
import { stripeService } from "@/lib/api"
import { toast } from "@/hooks/use-toast"

interface Tier {
  name: string
  monthlyPrice: number
  yearlyPrice: number
  description: string
  features: Array<{ icon: any; text: string; disabled?: boolean }>
  cta: string
  popular: boolean
  accent: string
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
    description: "Perfect for getting started",
    features: [
      { icon: TrendingUpIcon, text: "View 1 trending keyword daily" },
      { icon: Search, text: "1 search per day" },
      { icon: Eye, text: "Access to 1 trending keyword" },
    ],
    cta: "Get Started Free",
    popular: false,
    accent: "zinc",
  },
  {
    name: "Pro",
    monthlyPrice: 9.9,
    yearlyPrice: 99.18, // $9.9 × 12 × 0.83 (17% discount)
    description: "Best for content creators",
    features: [
      { icon: TrendingUp, text: "View all trending keywords" },
      { icon: Search, text: "20 searches per day" },
      { icon: CheckCircle2, text: "Priority support" },
      { icon: Zap, text: "Real-time data updates" },
      { icon: TrendingUp, text: "Advanced analytics" },
    ],
    cta: "Upgrade to Pro",
    popular: true,
    accent: "indigo",
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
    monthlyPrice: 19.9,
    yearlyPrice: 198.22, // $19.9 × 12 × 0.83 (17% discount)
    description: "For power users and teams",
    features: [
      { icon: Crown, text: "View all trending keywords" },
      { icon: Search, text: "50 searches per day" },
      { icon: CheckCircle2, text: "Priority support" },
      { icon: Zap, text: "Real-time data updates" },
      { icon: TrendingUp, text: "Advanced analytics" },
      { icon: Mail, text: "Email alerts for new opportunities" },
    ],
    cta: "Upgrade to Premium",
    popular: false,
    accent: "rose",
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
  const [isYearly, setIsYearly] = useState(false)
  const { isAuthenticated } = useAuth()
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [processingTier, setProcessingTier] = useState<string | null>(null)

  const handleUpgrade = async (tier: Tier) => {
    if (tier.name === "Free") {
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
      const cancelUrl = `${baseUrl}/pricing`

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
        title: "Payment Error",
        description: "Failed to start payment process. Please try again.",
        variant: "destructive",
      })
      setLoading(false)
      setProcessingTier(null)
    }
  }

  return (
    <>
      {/* Billing Toggle */}
      <div className="mb-8 flex items-center justify-center gap-4">
        <span className={cn("text-sm font-medium", !isYearly && "text-foreground")}>Monthly</span>
        <button
          onClick={() => setIsYearly(!isYearly)}
          className={cn(
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
            isYearly ? "bg-indigo" : "bg-muted",
          )}
        >
          <span
            className={cn(
              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
              isYearly ? "translate-x-6" : "translate-x-1",
            )}
          />
        </button>
        <span className={cn("text-sm font-medium", isYearly && "text-foreground")}>
          Yearly <span className="text-emerald-600">(Save 17%)</span>
        </span>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => {
          const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice
          const originalPrice = isYearly ? tier.monthlyPrice * 12 : tier.monthlyPrice
          const period = isYearly ? "/year" : "/month"
          const showDiscount = isYearly && tier.yearlyPrice > 0

          return (
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
                  <span className="rounded-full bg-indigo px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                <div className="mt-4">
                  <div className="flex items-baseline gap-3">
                    <div className="flex flex-col">
                      {showDiscount && (
                        <span className="text-sm font-mono text-muted-foreground line-through mb-1">
                          ${originalPrice.toFixed(2)}
                        </span>
                      )}
                      <div className="flex items-baseline">
                        <span
                          className={cn(
                            "font-mono text-4xl font-bold",
                            tier.accent === "indigo" && "text-indigo",
                            tier.accent === "rose" && "text-rose",
                            tier.accent === "zinc" && "text-foreground",
                          )}
                        >
                          ${price.toFixed(price === 0 ? 0 : 2)}
                        </span>
                        <span className="ml-1 text-muted-foreground">{period}</span>
                      </div>
                    </div>
                    {showDiscount && (
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded-full whitespace-nowrap self-start mt-1">
                        Save 17%
                      </span>
                    )}
                  </div>
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
                onClick={() => handleUpgrade(tier)}
                disabled={tier.name === "Free" || loading}
                className={cn(
                  "w-full font-semibold cursor-pointer transition-all duration-200",
                  tier.popular
                    ? "bg-indigo hover:bg-indigo/90 text-white"
                    : "bg-secondary hover:bg-secondary/80",
                  tier.name === "Free" && "cursor-default opacity-70"
                )}
              >
                {loading && processingTier === tier.name ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  tier.cta
                )}
              </Button>
            </div>
          )
        })}
      </div>
      <LoginDialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)} />
    </>
  )
}
