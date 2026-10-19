import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

// Radar was renamed to Trends.
export default function RadarRedirect() {
  redirect("/trends")
}
