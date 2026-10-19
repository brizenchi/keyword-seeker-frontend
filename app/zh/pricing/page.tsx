import type { Metadata } from "next"
import { PricingPage } from "@/components/marketing/pricing-page"
import { getDictionary } from "@/lib/i18n"
import { localizedPageMetadata } from "@/lib/i18n/metadata"

const t = getDictionary("zh").pricing

export const metadata: Metadata = localizedPageMetadata("/pricing", "zh", `${t.metaTitle} | NichePop`, t.metaDescription)

export default function Page() {
  return <PricingPage locale="zh" />
}
