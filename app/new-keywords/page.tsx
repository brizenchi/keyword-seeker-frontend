import type { Metadata } from "next"
import { NewKeywordsPage } from "@/components/marketing/new-keywords-page"
import { PUBLIC_DELAY_HOURS } from "@/lib/data/radar"
import { getDictionary } from "@/lib/i18n"
import { localizedPageMetadata } from "@/lib/i18n/metadata"

const t = getDictionary("en").newKeywords

export const metadata: Metadata = localizedPageMetadata("/new-keywords", "en", `${t.metaTitle} | NichePop`, t.metaDescription(PUBLIC_DELAY_HOURS))

export default function Page() {
  return <NewKeywordsPage locale="en" />
}
