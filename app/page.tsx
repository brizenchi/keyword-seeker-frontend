import type { Metadata } from "next"
import { HomePage } from "@/components/marketing/home-page"
import { getDictionary } from "@/lib/i18n"
import { localizedPageMetadata } from "@/lib/i18n/metadata"

const t = getDictionary("en").home

export const metadata: Metadata = localizedPageMetadata("/", "en", t.metaTitle, t.metaDescription)

export default function Page() {
  return <HomePage locale="en" />
}
