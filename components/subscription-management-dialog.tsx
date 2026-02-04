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
import { Calendar, AlertTriangle, CheckCircle2, XCircle, RefreshCw } from "lucide-react"
import { stripeService } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface SubscriptionManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subscription?: {
    plan: string
    status: string
    cancel_at_period_end?: boolean
    current_period_end?: string
    next_billing_date?: string
  }
  onSubscriptionUpdated?: () => void
}

export function SubscriptionManagementDialog({
  open,
  onOpenChange,
  subscription,
  onSubscriptionUpdated,
}: SubscriptionManagementDialogProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  const isCanceling = subscription?.cancel_at_period_end || false
  const planName = subscription?.plan || "Free"
  const nextBillingDate = subscription?.current_period_end || subscription?.next_billing_date

  const handleCancelSubscription = async () => {
    setIsLoading(true)
    try {
      const response = await stripeService.cancelSubscription()

      toast({
        title: "订阅已标记为取消",
        description: response.message || "订阅将在当前周期结束时取消",
      })

      setShowCancelConfirm(false)
      onSubscriptionUpdated?.()

      // Close the main dialog after a short delay
      setTimeout(() => {
        onOpenChange(false)
      }, 1000)
    } catch (error: any) {
      toast({
        title: "取消订阅失败",
        description: error.message || "请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReactivateSubscription = async () => {
    setIsLoading(true)
    try {
      const response = await stripeService.reactivateSubscription()

      toast({
        title: "订阅已重新激活",
        description: response.message || "订阅将继续自动续费",
      })

      onSubscriptionUpdated?.()

      // Close the main dialog after a short delay
      setTimeout(() => {
        onOpenChange(false)
      }, 1000)
    } catch (error: any) {
      toast({
        title: "重新激活失败",
        description: error.message || "请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
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

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-600" />
              订阅管理
            </DialogTitle>
            <DialogDescription>
              管理您的订阅计划和续费设置
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Current Plan */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">当前计划</span>
                <Badge className={cn(
                  planName === "Premium" && "bg-rose-600",
                  planName === "Pro" && "bg-indigo-600",
                  planName === "Free" && "bg-gray-500"
                )}>
                  {planName}
                </Badge>
              </div>

              <Separator className="my-3" />

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">订阅状态</span>
                  <span className="font-medium">
                    {isCanceling ? (
                      <span className="text-amber-600 flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        即将取消
                      </span>
                    ) : (
                      <span className="text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        活跃
                      </span>
                    )}
                  </span>
                </div>

                {nextBillingDate && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {isCanceling ? "到期日期" : "下次计费"}
                    </span>
                    <span className="font-medium">
                      {formatDate(nextBillingDate)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Cancellation Warning */}
            {isCanceling && (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2 flex-1">
                    <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                      订阅已标记为取消
                    </p>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      您的订阅将在 <strong>{formatDate(nextBillingDate)}</strong> 到期。
                      在此之前，您仍可以继续使用所有 {planName} 功能。
                    </p>
                    <p className="text-sm text-amber-600 dark:text-amber-400">
                      如果改变主意，可以随时重新激活订阅。
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Info Box */}
            {!isCanceling && (
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  取消订阅不会立即生效。您可以继续使用到当前计费周期结束，之后将自动降级为免费计划。
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              关闭
            </Button>

            {isCanceling ? (
              <Button
                onClick={handleReactivateSubscription}
                disabled={isLoading}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
                    处理中...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    重新激活订阅
                  </>
                )}
              </Button>
            ) : (
              <Button
                variant="destructive"
                onClick={() => setShowCancelConfirm(true)}
                disabled={isLoading}
              >
                <XCircle className="h-4 w-4 mr-2" />
                取消订阅
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              确认取消订阅
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3 pt-2">
              <p>
                您确定要取消 <strong>{planName}</strong> 订阅吗？
              </p>
              <p className="text-foreground">
                取消后：
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>您可以继续使用到 <strong>{formatDate(nextBillingDate)}</strong></li>
                <li>到期后将自动降级为免费计划</li>
                <li>可以随时重新激活订阅</li>
                <li>不会立即扣费或退款</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>
              我再想想
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelSubscription}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
                  处理中...
                </>
              ) : (
                "确认取消"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
