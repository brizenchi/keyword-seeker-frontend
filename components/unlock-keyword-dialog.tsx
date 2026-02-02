"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sparkles, Coins, Lock, Unlock } from "lucide-react"
import { cn } from "@/lib/utils"

interface UnlockKeywordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  keywordName: string
  userCredits: number
  onConfirm: () => Promise<void>
  isUnauthenticated?: boolean
  onLoginRequired?: () => void
}

export function UnlockKeywordDialog({
  open,
  onOpenChange,
  keywordName,
  userCredits,
  onConfirm,
  isUnauthenticated = false,
  onLoginRequired,
}: UnlockKeywordDialogProps) {
  const [isUnlocking, setIsUnlocking] = useState(false)

  const handleConfirm = async () => {
    // If user is not authenticated, trigger login instead
    if (isUnauthenticated && onLoginRequired) {
      onLoginRequired()
      onOpenChange(false)
      return
    }

    setIsUnlocking(true)
    try {
      await onConfirm()
      onOpenChange(false)
    } catch (error) {
      console.error('Failed to unlock keyword:', error)
    } finally {
      setIsUnlocking(false)
    }
  }

  const hasEnoughCredits = userCredits >= 1

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Unlock className="h-5 w-5 text-indigo-600" />
            Unlock Keyword
          </DialogTitle>
          <DialogDescription>
            {isUnauthenticated
              ? 'Sign in to unlock this keyword and view full details'
              : 'Use 1 credit to unlock this keyword and view full details'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Keyword Info */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Locked Keyword
              </span>
            </div>
            <p className="text-lg font-bold text-foreground">{keywordName}</p>
          </div>

          {/* Credits Info */}
          {!isUnauthenticated && (
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-amber-600" />
                <span className="text-sm font-medium">Your Credits</span>
              </div>
              <span className={cn(
                "text-lg font-bold font-mono",
                hasEnoughCredits ? "text-green-600" : "text-red-600"
              )}>
                {userCredits}
              </span>
            </div>
          )}

          {/* Cost Info */}
          {!isUnauthenticated && (
            <div className="flex items-center justify-between p-4 border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                <span className="text-sm font-medium">Unlock Cost</span>
              </div>
              <span className="text-lg font-bold font-mono text-indigo-600">
                1 Credit
              </span>
            </div>
          )}

          {/* Warning if not enough credits */}
          {!isUnauthenticated && !hasEnoughCredits && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">
                You don't have enough credits. Please upgrade your plan to get more credits.
              </p>
            </div>
          )}

          {/* Login prompt for unauthenticated users */}
          {isUnauthenticated && (
            <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <p className="text-sm text-foreground">
                Sign in to unlock keywords and access premium features. Free users get credits to unlock keywords!
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isUnlocking}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={(!isUnauthenticated && !hasEnoughCredits) || isUnlocking}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
          >
            {isUnlocking ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
                {isUnauthenticated ? 'Redirecting...' : 'Unlocking...'}
              </>
            ) : (
              <>
                <Unlock className="h-4 w-4 mr-2" />
                {isUnauthenticated ? 'Sign In to Unlock' : 'Unlock for 1 Credit'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
