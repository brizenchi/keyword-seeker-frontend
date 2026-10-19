"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { PricingCards } from "@/components/pricing-cards"
import { Badge } from "@/components/ui/badge"
import { useT } from "@/components/i18n/locale-provider"

interface PricingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  feature?: string
}

export function PricingModal({ open, onOpenChange, feature }: PricingModalProps) {
  const t = useT().pricingModal
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] lg:max-w-[80vw] xl:max-w-[1200px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4 pb-6">
          <div className="flex items-center justify-center">
            <Badge className="border-primary/20 bg-primary-soft px-4 py-1.5 text-primary">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              {t.badge}
            </Badge>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-center">
            {t.title}
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            {feature ? t.withFeature(feature) : t.generic}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <PricingCards />
        </div>
      </DialogContent>
    </Dialog>
  )
}
