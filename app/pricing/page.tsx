import type { Metadata } from "next"
import { PricingPage } from "@/components/marketing/pricing-page"
import { getDictionary } from "@/lib/i18n"
import { localizedPageMetadata } from "@/lib/i18n/metadata"

const t = getDictionary("en").pricing

export const metadata: Metadata = localizedPageMetadata("/pricing", "en", `${t.metaTitle} | NichePop`, t.metaDescription)

export default function Page() {
  return <PricingPage locale="en" />
}
