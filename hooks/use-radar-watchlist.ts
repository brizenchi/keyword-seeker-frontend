"use client"

import { useCallback, useEffect, useState } from "react"
import { RADAR_WATCHLIST_KEY } from "@/lib/storageKeys"
import type { RadarWatchlist } from "@/lib/types"

// Watchlist is kept in localStorage until the Radar backend endpoints exist.
export function useRadarWatchlist() {
  const [watchlist, setWatchlist] = useState<RadarWatchlist | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(RADAR_WATCHLIST_KEY)
      const parsed = stored ? JSON.parse(stored) : null
      // Ignore watchlists saved by the earlier site/competitor version of the radar.
      if (parsed && Array.isArray(parsed.roots)) {
        setWatchlist(parsed)
      }
    } catch {
      window.localStorage.removeItem(RADAR_WATCHLIST_KEY)
    }
    setLoaded(true)
  }, [])

  const save = useCallback((next: RadarWatchlist) => {
    window.localStorage.setItem(RADAR_WATCHLIST_KEY, JSON.stringify(next))
    setWatchlist(next)
  }, [])

  return { watchlist, loaded, save }
}
