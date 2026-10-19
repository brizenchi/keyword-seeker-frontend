"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useLocale } from "@/components/i18n/locale-provider"
import { getDemoMonitors } from "@/lib/data/monitors"
import { RADAR_MONITORS_KEY } from "@/lib/storageKeys"
import type { Monitor } from "@/lib/types"

// Monitors the user creates live in localStorage until the backend exists; the seeded examples come from demo data.
export function useMonitors() {
  const locale = useLocale()
  const [custom, setCustom] = useState<Monitor[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(RADAR_MONITORS_KEY)
      const parsed = stored ? JSON.parse(stored) : []
      if (Array.isArray(parsed)) setCustom(parsed)
    } catch {
      window.localStorage.removeItem(RADAR_MONITORS_KEY)
    }
    setLoaded(true)
  }, [])

  const persist = useCallback((next: Monitor[]) => {
    window.localStorage.setItem(RADAR_MONITORS_KEY, JSON.stringify(next))
    setCustom(next)
  }, [])

  const add = useCallback(
    (monitor: Omit<Monitor, "id" | "createdAt">) => {
      const created: Monitor = { ...monitor, id: `mon-${Date.now()}`, createdAt: Date.now() }
      persist([created, ...custom])
      return created
    },
    [custom, persist],
  )

  const remove = useCallback((id: string) => persist(custom.filter((m) => m.id !== id)), [custom, persist])

  const monitors = useMemo(() => [...custom, ...getDemoMonitors(locale)], [custom, locale])

  return { monitors, custom, loaded, add, remove }
}
