"use client"

import { Suspense, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/useAuth"
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
  const { user } = useAuth()
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  // Use real user data from localStorage
  const userPlan = user?.membership_level
    ? (user.membership_level.charAt(0).toUpperCase() + user.membership_level.slice(1))
    : "Free"
  const currentCredits = user?.credits ?? 0
  const inviteLink = user?.referral_code
    ? `https://nichepop.com/invite/${user.referral_code}`
    : `https://nichepop.com/invite/${user?.id || "abc123"}`

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
        return <Badge className="bg-rose-600 text-white"><Crown className="h-3 w-3 mr-1" />Premium</Badge>
      case "Pro":
        return <Badge className="bg-indigo-600 text-white"><TrendingUp className="h-3 w-3 mr-1" />Pro</Badge>
      default:
        return <Badge variant="secondary">Free</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={null}>
        <Sidebar />
      </Suspense>

      <main className="pl-16">
        <div className="p-6 max-w-[1400px] mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
              <SettingsIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">Settings</h1>
              <p className="text-sm text-muted-foreground">Manage your account and subscription</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Account & Subscription */}
            <div className="lg:col-span-2 space-y-6">
              {/* Account Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Your current plan and subscription details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
                      <div className="flex items-center gap-2">
                        {getPlanBadge(userPlan)}
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
                      <span className="text-sm font-medium">{user?.email || "user@example.com"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Member Since</span>
                      <span className="text-sm font-medium">January 2024</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Next Billing Date</span>
                      <span className="text-sm font-medium">February 28, 2024</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
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
              <Card>
                <CardHeader>
                  <CardTitle>Credits History</CardTitle>
                  <CardDescription>Track your credits usage and earnings</CardDescription>
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
              <Card className="border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20">
                <CardHeader>
                  <CardTitle className="text-indigo-700 dark:text-indigo-300">Current Credits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-5xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mb-2">
                      {currentCredits}
                    </div>
                    <p className="text-sm text-muted-foreground">Available credits</p>
                  </div>
                </CardContent>
              </Card>

              {/* Invite Friends */}
              <Card className="border-emerald-200 dark:border-emerald-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                    <Gift className="h-5 w-5" />
                    Invite Friends
                  </CardTitle>
                  <CardDescription>Earn 5 credits for each friend who signs up</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-2">Your invite link:</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs bg-background p-2 rounded border truncate">
                        {inviteLink}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCopyInviteLink}
                        className="flex-shrink-0"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-medium mb-3">Invite Status</p>
                    <div className="space-y-2">
                      {mockInvites.map((invite) => (
                        <div
                          key={invite.id}
                          className="flex items-center justify-between text-xs p-2 bg-muted/30 rounded"
                        >
                          <span className="truncate flex-1">{invite.email}</span>
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
    </div>
  )
}
