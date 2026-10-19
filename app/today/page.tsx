import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

// Today's highlights now open the Ask AI chat.
export default function TodayRedirect() {
  redirect("/ask")
}
