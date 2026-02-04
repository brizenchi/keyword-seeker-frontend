"use client"

import { useState } from "react"
import { User, LogOut, Settings, Gift, CreditCard, Crown, TrendingUp, Copy, Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/hooks/use-toast"
import { SettingsDialog } from "@/components/settings-dialog"
import { cn } from "@/lib/utils"

interface UserMenuProps {
  // Props are now optional and only used as fallbacks
  credits?: number
  userPlan?: "Free" | "Pro" | "Premium"
}

export function UserMenu({ credits: propCredits, userPlan: propUserPlan }: UserMenuProps) {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [loggingOut, setLoggingOut] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // Use real user data from localStorage, fallback to props or defaults
  const credits = user?.credits ?? propCredits ?? 0
  const userPlan = user?.membership_level
    ? (user.membership_level.charAt(0).toUpperCase() + user.membership_level.slice(1)) as "Free" | "Pro" | "Premium"
    : propUserPlan ?? "Free"

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await logout()
    } finally {
      setLoggingOut(false)
    }
  }

  const handleInviteFriends = () => {
    const inviteLink = user?.referral_code
      ? `https://nichepop.com/invite/${user.referral_code}`
      : `https://nichepop.com/invite/${user?.id || "abc123"}`
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    toast({
      title: "Invite link copied!",
      description: "Share it with friends to earn +5 credits each",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const getPlanBadge = () => {
    switch (userPlan) {
      case "Premium":
        return (
          <Badge className="bg-rose-600 text-white text-xs">
            <Crown className="h-3 w-3 mr-1" />
            Premium
          </Badge>
        )
      case "Pro":
        return (
          <Badge className="bg-indigo-600 text-white text-xs">
            <TrendingUp className="h-3 w-3 mr-1" />
            Pro
          </Badge>
        )
      default:
        return <Badge variant="secondary" className="text-xs">Free</Badge>
    }
  }

  if (!user) return null

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.username || user.email}
                className="h-8 w-8 rounded-lg object-cover"
              />
            ) : (
              <User className="h-5 w-5 text-sidebar-foreground" />
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium leading-none">{user.username || "User"}</p>
                {getPlanBadge()}
              </div>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {/* Credits */}
          <div className="px-2 py-2">
            <div className="flex items-center justify-between p-2 rounded-md bg-indigo-50 dark:bg-indigo-950/30">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-medium">Credits</span>
              </div>
              <Badge className="bg-indigo-600 text-white">{credits}</Badge>
            </div>
          </div>

          <DropdownMenuSeparator />

          {/* Invite */}
          <DropdownMenuItem className="cursor-pointer" onClick={handleInviteFriends}>
            {copied ? (
              <Check className="mr-2 h-4 w-4 text-green-600" />
            ) : (
              <Gift className="mr-2 h-4 w-4" />
            )}
            <span>{copied ? "Link Copied!" : "Invite Friends"}</span>
            <Badge variant="secondary" className="ml-auto text-xs">+5 Credits</Badge>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Settings */}
          <DropdownMenuItem className="cursor-pointer" onClick={() => setShowSettings(true)}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>

          {/* Logout */}
          <DropdownMenuItem
            className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{loggingOut ? "Logging out..." : "Log out"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Settings Dialog */}
      <SettingsDialog open={showSettings} onOpenChange={setShowSettings} />
    </>
  )
}
