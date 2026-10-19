import { AtSign, BarChart3, MessageSquare, Search, Swords, Target, TrendingUp, type LucideIcon } from "lucide-react"
import type { RadarSignalSource } from "@/lib/types"

/** Icons per signal source; labels live in the dictionaries under actions.sources. */
export const SIGNAL_ICONS: Record<RadarSignalSource, LucideIcon> = {
  reddit: MessageSquare,
  google_trends: TrendingUp,
  serp: Search,
  competitor: Swords,
  search_console: BarChart3,
  keyword: Target,
  x: AtSign,
}
