"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { PricingCards } from "@/components/pricing-cards"
import { Badge } from "@/components/ui/badge"

interface PricingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  feature?: string
}

export function PricingModal({ open, onOpenChange, feature }: PricingModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] lg:max-w-[80vw] xl:max-w-[1200px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4 pb-6">
          <div className="flex items-center justify-center">
            <Badge className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Upgrade to Unlock
            </Badge>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-center">
            Choose Your Plan
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            {feature
              ? `Unlock "${feature}" and get access to all premium features.`
              : "Get unlimited access to all features and insights."}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <PricingCards />
        </div>
      </DialogContent>
    </Dialog>
  )
}
