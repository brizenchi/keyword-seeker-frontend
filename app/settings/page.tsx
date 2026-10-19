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
        return <Badge className="bg-destructive text-white"><Crown className="h-3 w-3 mr-1" />Premium</Badge>
      case "Pro":
        return <Badge className="bg-primary text-white"><TrendingUp className="h-3 w-3 mr-1" />Pro</Badge>
      default:
        return <Badge variant="secondary">Free</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background relative">


      <Suspense fallback={null}>
        <Sidebar />
      </Suspense>

      <main className="pl-16 relative z-10">
        <div className="p-6 max-w-[1400px] mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft">
              <SettingsIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground tracking-tight">Settings</h1>
              <p className="text-sm text-muted-foreground font-light">Manage your account and subscription</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Column - Account & Subscription */}
            <div className="min-w-0 lg:col-span-2 space-y-6">
              {/* Account Information */}
              <Card className="border-border bg-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-foreground">Account Information</CardTitle>
                  <CardDescription className="text-muted-foreground">Your current plan and subscription details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-3 p-4 bg-background/50 rounded-lg border border-border sm:flex-row sm:items-center sm:justify-between">
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
                      <span className="text-sm text-muted-foreground">Email</span>
                      <span className="text-sm font-medium text-foreground">{user?.email || "user@example.com"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Member Since</span>
                      <span className="text-sm font-medium text-foreground">January 2024</span>
                    </div>
                    {subscription?.current_period_end && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {subscription.cancel_at_period_end ? "到期日期" : "Next Billing Date"}
                        </span>
                        <span className="text-sm font-medium text-foreground">
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

                  <div className="flex flex-col gap-2 sm:flex-row">
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
              <Card className="border-border bg-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-foreground">Credits History</CardTitle>
                  <CardDescription className="text-muted-foreground">Track your credits usage and earnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockCreditsHistory.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{item.description}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                        <div
                          className={cn(
                            "text-sm font-semibold font-mono",
                            item.amount > 0 ? "text-success" : "text-destructive"
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
              <Card className="border-primary/40 bg-gradient-to-br from-primary/10 to-[#8b5cf6]/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-primary">Current Credits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-5xl font-bold font-mono text-primary mb-2">
                      {currentCredits}
                    </div>
                    <p className="text-sm text-muted-foreground">Available credits</p>
                  </div>
                </CardContent>
              </Card>

              {/* Invite Friends */}
              <Card className="border-success/30 bg-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-success">
                    <Gift className="h-5 w-5" />
                    Invite Friends
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">Earn 5 credits for each friend who signs up</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-background/50 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground mb-2">Your invite link:</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs bg-background p-2 rounded border border-border truncate text-foreground">
                        {inviteLink}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCopyInviteLink}
                        className="flex-shrink-0"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-success" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Separator className="bg-muted" />

                  <div>
                    <p className="text-sm font-medium mb-3 text-foreground">Invite Status</p>
                    <div className="space-y-2">
                      {mockInvites.map((invite) => (
                        <div
                          key={invite.id}
                          className="flex items-center justify-between text-xs p-2 bg-background/50 rounded border border-border"
                        >
                          <span className="truncate flex-1 text-muted-foreground">{invite.email}</span>
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
