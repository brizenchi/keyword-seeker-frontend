"use client"

import { Suspense, useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/useAuth"
import { SubscriptionManagementDialog } from "@/components/subscription-management-dialog"
import { stripeService } from "@/lib/api"
import {
  Settings as SettingsIcon,
  Crown,
  CreditCard,
  Gift,
  Copy,
  Check,
  ExternalLink,
  Calendar,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

// Mock data - replace with real API calls
const mockCreditsHistory = [
  { id: 1, date: "2024-01-28", amount: 10, type: "purchase", description: "Monthly subscription" },
  { id: 2, date: "2024-01-25", amount: -3, type: "usage", description: "Keyword search" },
  { id: 3, date: "2024-01-20", amount: 5, type: "referral", description: "Friend signup bonus" },
  { id: 4, date: "2024-01-15", amount: -2, type: "usage", description: "Keyword search" },
  { id: 5, date: "2024-01-10", amount: -1, type: "usage", description: "Keyword search" },
]

const mockInvites = [
  { id: 1, email: "friend1@example.com", status: "completed", credits: 5, date: "2024-01-20" },
  { id: 2, email: "friend2@example.com", status: "pending", credits: 0, date: "2024-01-25" },
  { id: 3, email: "friend3@example.com", status: "completed", credits: 5, date: "2024-01-15" },
]

export default function SettingsPage() {
  const { user, refresh } = useAuth()
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false)
  const [subscription, setSubscription] = useState<any>(null)
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false)

  // Use real user data from localStorage
  const userPlan = user?.membership_level
    ? (user.membership_level.charAt(0).toUpperCase() + user.membership_level.slice(1))
    : "Free"
  const currentCredits = user?.credits ?? 0
  const inviteLink = user?.referral_code
    ? `https://nichepop.com/invite/${user.referral_code}`
    : `https://nichepop.com/invite/${user?.id || "abc123"}`

  // Load subscription data
  const loadSubscription = async () => {
    if (userPlan === "Free") return

    setIsLoadingSubscription(true)
    try {
      const data = await stripeService.getSubscription()
      setSubscription(data)
    } catch (error) {
      console.error("Failed to load subscription:", error)
    } finally {
      setIsLoadingSubscription(false)
    }
  }

  useEffect(() => {
    loadSubscription()
  }, [userPlan])

  const handleManageSubscription = () => {
    if (userPlan === "Free") {
      toast({
        title: "无订阅",
        description: "您当前是免费计划，无需管理订阅",
        variant: "destructive",
      })
      return
    }

    setShowSubscriptionDialog(true)
  }

  const handleSubscriptionUpdated = async () => {
    // Refresh user data and subscription
    await refresh()
    await loadSubscription()
  }

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    toast({
      title: "Copied!",
      description: "Invite link copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Premium":
        return <Badge className="bg-[#f43f5e] text-white"><Crown className="h-3 w-3 mr-1" />Premium</Badge>
      case "Pro":
        return <Badge className="bg-[#0ea5e9] text-white"><TrendingUp className="h-3 w-3 mr-1" />Pro</Badge>
      default:
        return <Badge variant="secondary">Free</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0E27] relative">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(30, 38, 80, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 38, 80, 0.3) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0080FF]/20 rounded-full blur-3xl animate-gentle-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#39FF14]/10 rounded-full blur-3xl animate-gentle-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      <Suspense fallback={null}>
        <Sidebar />
      </Suspense>

      <main className="pl-16 relative z-10">
        <div className="p-6 max-w-[1400px] mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0080FF] to-[#39FF14]">
              <SettingsIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Settings</h1>
              <p className="text-sm text-[#8B92B3] font-light">Manage your account and subscription</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Account & Subscription */}
            <div className="lg:col-span-2 space-y-6">
              {/* Account Information */}
              <Card className="border-[#1E2650] bg-[#0F1635]/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Account Information</CardTitle>
                  <CardDescription className="text-[#8B92B3]">Your current plan and subscription details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#0A0E27]/50 rounded-lg border border-[#1E2650]">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
                      <div className="flex items-center gap-2">
                        {getPlanBadge(userPlan)}
                        {subscription?.cancel_at_period_end && (
                          <Badge variant="outline" className="text-amber-600 border-amber-600">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            即将取消
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Upgrade Plan
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#8B92B3]">Email</span>
                      <span className="text-sm font-medium text-white">{user?.email || "user@example.com"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#8B92B3]">Member Since</span>
                      <span className="text-sm font-medium text-white">January 2024</span>
                    </div>
                    {subscription?.current_period_end && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#8B92B3]">
                          {subscription.cancel_at_period_end ? "到期日期" : "Next Billing Date"}
                        </span>
                        <span className="text-sm font-medium text-white">
                          {new Date(subscription.current_period_end).toLocaleDateString('zh-CN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={handleManageSubscription}
                      disabled={isLoadingSubscription}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Manage Subscription
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Billing History
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Credits History */}
              <Card className="border-[#1E2650] bg-[#0F1635]/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Credits History</CardTitle>
                  <CardDescription className="text-[#8B92B3]">Track your credits usage and earnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockCreditsHistory.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-[#0A0E27]/50 rounded-lg border border-[#1E2650]"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{item.description}</p>
                          <p className="text-xs text-[#8B92B3]">{item.date}</p>
                        </div>
                        <div
                          className={cn(
                            "text-sm font-semibold font-mono",
                            item.amount > 0 ? "text-[#39FF14]" : "text-[#f43f5e]"
                          )}
                        >
                          {item.amount > 0 ? "+" : ""}{item.amount} credits
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Credits & Invites */}
            <div className="space-y-6">
              {/* Current Credits */}
              <Card className="border-[#0080FF]/30 bg-gradient-to-br from-[#0080FF]/10 to-[#8b5cf6]/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#0080FF]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Current Credits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-5xl font-bold font-mono text-[#0080FF] mb-2">
                      {currentCredits}
                    </div>
                    <p className="text-sm text-[#8B92B3]">Available credits</p>
                  </div>
                </CardContent>
              </Card>

              {/* Invite Friends */}
              <Card className="border-[#39FF14]/30 bg-[#0F1635]/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#39FF14]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    <Gift className="h-5 w-5" />
                    Invite Friends
                  </CardTitle>
                  <CardDescription className="text-[#8B92B3]">Earn 5 credits for each friend who signs up</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-[#0A0E27]/50 rounded-lg border border-[#1E2650]">
                    <p className="text-xs text-[#8B92B3] mb-2">Your invite link:</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs bg-[#0A0E27] p-2 rounded border border-[#1E2650] truncate text-white">
                        {inviteLink}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCopyInviteLink}
                        className="flex-shrink-0"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-[#39FF14]" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Separator className="bg-[#1E2650]" />

                  <div>
                    <p className="text-sm font-medium mb-3 text-white">Invite Status</p>
                    <div className="space-y-2">
                      {mockInvites.map((invite) => (
                        <div
                          key={invite.id}
                          className="flex items-center justify-between text-xs p-2 bg-[#0A0E27]/50 rounded border border-[#1E2650]"
                        >
                          <span className="truncate flex-1 text-[#8B92B3]">{invite.email}</span>
                          <Badge
                            variant={invite.status === "completed" ? "default" : "secondary"}
                            className="text-xs ml-2"
                          >
                            {invite.status === "completed" ? `+${invite.credits}` : "Pending"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Subscription Management Dialog */}
      <SubscriptionManagementDialog
        open={showSubscriptionDialog}
        onOpenChange={setShowSubscriptionDialog}
        subscription={{
          plan: userPlan,
          status: subscription?.status || "active",
          cancel_at_period_end: subscription?.cancel_at_period_end,
          current_period_end: subscription?.current_period_end,
          next_billing_date: subscription?.next_billing_date,
        }}
        onSubscriptionUpdated={handleSubscriptionUpdated}
      />
    </div>
  )
}
