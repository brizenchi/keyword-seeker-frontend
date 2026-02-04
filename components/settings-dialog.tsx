"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  User,
  Crown,
  CreditCard,
  Gift,
  Copy,
  Check,
  TrendingUp,
  Settings as SettingsIcon,
  Calendar,
  Mail,
  ExternalLink,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Coins,
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/hooks/use-toast"
import { stripeService } from "@/lib/api"
import { cn } from "@/lib/utils"

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type TabType = "account" | "subscription" | "credits" | "referral"

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const { user, refresh } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<TabType>("account")
  const [copied, setCopied] = useState(false)
  const [subscription, setSubscription] = useState<any>(null)
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const userPlan = user?.membership_level
    ? (user.membership_level.charAt(0).toUpperCase() + user.membership_level.slice(1))
    : "Free"
  const currentCredits = user?.credits ?? 0
  const inviteLink = user?.referral_code
    ? `https://nichepop.com/invite/${user.referral_code}`
    : `https://nichepop.com/invite/${user?.id || "abc123"}`

  const isCanceling = subscription?.cancel_at_period_end || false

  // Load subscription data when dialog opens
  useEffect(() => {
    if (open && userPlan !== "Free") {
      loadSubscription()
    }
  }, [open, userPlan])

  const loadSubscription = async () => {
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

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    toast({
      title: "Copied!",
      description: "Invite link copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCancelSubscription = async () => {
    setIsProcessing(true)
    try {
      const response = await stripeService.cancelSubscription()

      toast({
        title: "Subscription marked for cancellation",
        description: response.message || "Subscription will be cancelled at the end of the current period",
      })

      setShowCancelConfirm(false)
      await refresh()
      await loadSubscription()
    } catch (error: any) {
      toast({
        title: "Failed to cancel subscription",
        description: error.message || "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReactivateSubscription = async () => {
    setIsProcessing(true)
    try {
      const response = await stripeService.reactivateSubscription()

      toast({
        title: "Subscription reactivated",
        description: response.message || "Subscription will continue to renew automatically",
      })

      await refresh()
      await loadSubscription()
    } catch (error: any) {
      toast({
        title: "Failed to reactivate",
        description: error.message || "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    try {
      return new Date(dateString).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Premium":
        return <Badge className="bg-rose-600 text-white"><Crown className="h-3 w-3 mr-1" />Premium</Badge>
      case "Pro":
        return <Badge className="bg-indigo-600 text-white"><TrendingUp className="h-3 w-3 mr-1" />Pro</Badge>
      default:
        return <Badge variant="secondary">Free</Badge>
    }
  }

  const tabs = [
    { id: "account" as TabType, label: "Account", icon: User },
    { id: "subscription" as TabType, label: "Subscription", icon: Crown },
    { id: "credits" as TabType, label: "Credits", icon: Coins },
    { id: "referral" as TabType, label: "Referral", icon: Gift },
  ]

  // Mock data - replace with real API calls
  const mockCreditsHistory = [
    { id: 1, date: "2024-01-28", amount: 10, type: "purchase", description: "Monthly subscription" },
    { id: 2, date: "2024-01-25", amount: -3, type: "usage", description: "Keyword search" },
    { id: 3, date: "2024-01-20", amount: 5, type: "referral", description: "Friend signup bonus" },
    { id: 4, date: "2024-01-15", amount: -2, type: "usage", description: "Keyword search" },
  ]

  const mockInvites = [
    { id: 1, email: "friend1@example.com", status: "completed", credits: 5, date: "2024-01-20" },
    { id: 2, email: "friend2@example.com", status: "pending", credits: 0, date: "2024-01-25" },
    { id: 3, email: "friend3@example.com", status: "completed", credits: 5, date: "2024-01-15" },
  ]

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[70vw] min-w-[800px] max-w-[90vw] max-h-[85vh] p-0 gap-0">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                <SettingsIcon className="h-5 w-5 text-white" />
              </div>
              Settings
            </DialogTitle>
          </DialogHeader>

          <Separator />

          <div className="flex overflow-hidden" style={{ height: "calc(85vh - 120px)" }}>
            {/* Vertical Tabs Sidebar */}
            <div className="w-48 border-r bg-muted/30 p-4 space-y-1 overflow-y-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Account Tab */}
              {activeTab === "account" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Account Information</h3>
                    <p className="text-sm text-muted-foreground">View and manage your account details</p>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Email</span>
                        </div>
                        <span className="text-sm font-medium">{user?.email || "N/A"}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Username</span>
                        </div>
                        <span className="text-sm font-medium">{user?.username || "N/A"}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Crown className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Current Plan</span>
                        </div>
                        {getPlanBadge(userPlan)}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Subscription Tab */}
              {activeTab === "subscription" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Subscription Management</h3>
                    <p className="text-sm text-muted-foreground">Manage your subscription plan and renewal settings</p>
                  </div>

                  {userPlan === "Free" ? (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center py-8">
                          <Crown className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <h4 className="text-lg font-semibold mb-2">You are on the Free Plan</h4>
                          <p className="text-sm text-muted-foreground mb-6">
                            Upgrade to Pro or Premium plan to get more features and credits
                          </p>
                          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 cursor-pointer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Pricing Plans
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <>
                      <Card className="border-indigo-200 dark:border-indigo-800">
                        <CardHeader>
                          <CardTitle className="text-base">Current Subscription</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg">
                            <div>
                              <p className="text-sm text-muted-foreground mb-2">Subscription Plan</p>
                              <div className="flex items-center gap-2">
                                {getPlanBadge(userPlan)}
                                {isCanceling && (
                                  <Badge variant="outline" className="text-amber-600 border-amber-600">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    Canceling Soon
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="cursor-pointer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Upgrade Plan
                            </Button>
                          </div>

                          <Separator />

                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Subscription Status</span>
                              <span className="font-medium">
                                {isCanceling ? (
                                  <span className="text-amber-600 flex items-center gap-1">
                                    <AlertTriangle className="h-4 w-4" />
                                    Canceling Soon
                                  </span>
                                ) : (
                                  <span className="text-green-600">Active</span>
                                )}
                              </span>
                            </div>
                            {subscription?.current_period_end && (
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                  {isCanceling ? "Expiration Date" : "Next Billing"}
                                </span>
                                <span className="font-medium">
                                  {formatDate(subscription.current_period_end)}
                                </span>
                              </div>
                            )}
                          </div>

                          {isCanceling && (
                            <>
                              <Separator />
                              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                                <div className="flex items-start gap-3">
                                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                  <div className="space-y-2 flex-1">
                                    <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                                      Subscription marked for cancellation
                                    </p>
                                    <p className="text-sm text-amber-700 dark:text-amber-300">
                                      Your subscription will expire on <strong>{formatDate(subscription?.current_period_end)}</strong>.
                                      Until then, you can continue to use all {userPlan} features.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          <Separator />

                          <div className="flex gap-2">
                            {isCanceling ? (
                              <Button
                                onClick={handleReactivateSubscription}
                                disabled={isProcessing}
                                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white cursor-pointer"
                              >
                                {isProcessing ? (
                                  <>
                                    <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
                                    Processing...
                                  </>
                                ) : (
                                  <>
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Reactivate Subscription
                                  </>
                                )}
                              </Button>
                            ) : (
                              <Button
                                variant="destructive"
                                onClick={() => setShowCancelConfirm(true)}
                                disabled={isProcessing}
                                className="flex-1 cursor-pointer"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Cancel Subscription
                              </Button>
                            )}
                            <Button variant="outline" className="flex-1 cursor-pointer">
                              <Calendar className="h-4 w-4 mr-2" />
                              Billing History
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {!isCanceling && (
                        <Card className="bg-muted/50">
                          <CardContent className="pt-6">
                            <p className="text-sm text-muted-foreground">
                              💡 Canceling your subscription won't take effect immediately. You can continue to use it until the end of the current billing cycle, after which it will automatically downgrade to the free plan.
                            </p>
                          </CardContent>
                        </Card>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Credits Tab */}
              {activeTab === "credits" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Credits History</h3>
                    <p className="text-sm text-muted-foreground">View your credits usage and earnings history</p>
                  </div>

                  <Card className="border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20">
                    <CardHeader>
                      <CardTitle className="text-indigo-700 dark:text-indigo-300">Available Credits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-5xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mb-2">
                          {currentCredits}
                        </div>
                        <p className="text-sm text-muted-foreground">Available for unlocking keywords</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Transaction History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockCreditsHistory.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                          >
                            <div className="flex-1">
                              <p className="text-sm font-medium">{item.description}</p>
                              <p className="text-xs text-muted-foreground">{item.date}</p>
                            </div>
                            <div
                              className={cn(
                                "text-sm font-semibold font-mono",
                                item.amount > 0 ? "text-green-600" : "text-red-600"
                              )}
                            >
                              {item.amount > 0 ? "+" : ""}{item.amount}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Referral Tab */}
              {activeTab === "referral" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Invite Friends</h3>
                    <p className="text-sm text-muted-foreground">Earn 5 credits for each friend who signs up</p>
                  </div>

                  <Card className="border-emerald-200 dark:border-emerald-800">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                        <Gift className="h-5 w-5" />
                        Your Invite Link
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <code className="flex-1 text-sm bg-background p-3 rounded border truncate">
                            {inviteLink}
                          </code>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCopyInviteLink}
                            className="flex-shrink-0 cursor-pointer"
                          >
                            {copied ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                        <p className="text-sm text-emerald-700 dark:text-emerald-300">
                          💰 Share your invite link and earn 5 credits for each friend who successfully signs up!
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Invite Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {mockInvites.map((invite) => (
                          <div
                            key={invite.id}
                            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                          >
                            <div className="flex-1">
                              <p className="text-sm font-medium truncate">{invite.email}</p>
                              <p className="text-xs text-muted-foreground">{invite.date}</p>
                            </div>
                            <Badge
                              variant={invite.status === "completed" ? "default" : "secondary"}
                              className={cn(
                                "ml-2",
                                invite.status === "completed" && "bg-emerald-600"
                              )}
                            >
                              {invite.status === "completed" ? `+${invite.credits}` : "Pending"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Confirm Subscription Cancellation
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3 pt-2">
              <p>
                Are you sure you want to cancel your <strong>{userPlan}</strong> subscription?
              </p>
              <p className="text-foreground">
                After cancellation:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>You can continue using until <strong>{formatDate(subscription?.current_period_end)}</strong></li>
                <li>After expiration, it will automatically downgrade to the free plan</li>
                <li>You can reactivate your subscription at any time</li>
                <li>No immediate charges or refunds</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing} className="cursor-pointer">
              Let me think
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelSubscription}
              disabled={isProcessing}
              className="bg-red-600 hover:bg-red-700 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                "Confirm Cancellation"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
