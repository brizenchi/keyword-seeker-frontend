"use client"

import { useEffect, useState, type ReactNode } from "react"
import { Bell, BellOff, SlidersHorizontal, Star, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { RADAR_VIEWS_KEY } from "@/lib/storageKeys"
import type { RadarConfidence, RadarVerdict } from "@/lib/types"
import { DEFAULT_FILTERS, PRESETS, SORT_KEYS, activeFilterChips, presetFilters, type RadarFilters, type RadarSort } from "@/lib/utils/radar-filters"
import { useT } from "@/components/i18n/locale-provider"

interface SavedView {
  id: string
  name: string
  filters: RadarFilters
  alert: boolean
}

const VERDICTS: RadarVerdict[] = ["build", "content", "skip"]
const CONFIDENCES: RadarConfidence[] = ["high", "medium", "low"]

const selectClass =
  "h-9 w-full rounded-lg border border-border bg-card px-2.5 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 cursor-pointer"

const chipClass = (active: boolean) =>
  cn(
    "rounded-full border px-2.5 py-1 text-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
    active ? "border-primary bg-primary-soft font-medium text-primary" : "border-border bg-card text-body hover:border-primary/40",
  )

const toggle = <T,>(list: T[], value: T) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
const same = (a: RadarFilters, b: RadarFilters) => JSON.stringify(a) === JSON.stringify(b)
const parseNullable = (value: string) => (value === "any" ? null : Number(value))

function Control({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      {children}
    </div>
  )
}

interface WordFiltersProps {
  filters: RadarFilters
  onChange: (filters: RadarFilters) => void
  categories: string[]
  roots: string[]
  resultCount: number
  totalCount: number
  isPro: boolean
  onUpgrade: () => void
}

export function WordFilters({ filters, onChange, categories, roots, resultCount, totalCount, isPro, onUpgrade }: WordFiltersProps) {
  const t = useT()
  const tf = t.filters
  const [panelOpen, setPanelOpen] = useState(false)
  const [views, setViews] = useState<SavedView[]>([])
  const [viewName, setViewName] = useState("")

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(RADAR_VIEWS_KEY)
      if (stored) setViews(JSON.parse(stored))
    } catch {
      window.localStorage.removeItem(RADAR_VIEWS_KEY)
    }
  }, [])

  const persist = (next: SavedView[]) => {
    setViews(next)
    window.localStorage.setItem(RADAR_VIEWS_KEY, JSON.stringify(next))
  }

  const set = (patch: Partial<RadarFilters>) => onChange({ ...filters, ...patch })
  const chips = activeFilterChips(filters, t)

  const saveView = () => {
    const name = viewName.trim()
    if (!name) return
    persist([...views, { id: `${Date.now()}`, name, filters, alert: false }])
    setViewName("")
  }

  const toggleAlert = (view: SavedView) => {
    if (!isPro) {
      onUpgrade()
      return
    }
    persist(views.map((v) => (v.id === view.id ? { ...v, alert: !v.alert } : v)))
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label={tf.quickViews}>
          {PRESETS.map((preset) => (
            <button key={preset.id} onClick={() => onChange(presetFilters(preset))} aria-pressed={same(filters, presetFilters(preset))} title={tf.presets[preset.id]?.description} className={chipClass(same(filters, presetFilters(preset)))}>
              {tf.presets[preset.id]?.label ?? preset.id}
            </button>
          ))}
          {views.map((view) => (
            <span key={view.id} className={cn(chipClass(same(filters, view.filters)), "inline-flex items-center gap-1 py-0.5 pl-2.5 pr-1")}>
              <button onClick={() => onChange(view.filters)} className="inline-flex items-center gap-1 cursor-pointer">
                <Star className="h-3 w-3" />
                {view.name}
              </button>
              <button
                onClick={() => toggleAlert(view)}
                aria-label={view.alert ? tf.stopAlerts(view.name) : tf.alertMe(view.name)}
                title={isPro ? (view.alert ? tf.alertOn : tf.alertHint) : tf.alertProOnly}
                className="rounded-full p-1 hover:bg-primary/10 cursor-pointer"
              >
                {view.alert ? <Bell className="h-3 w-3 text-primary" /> : <BellOff className="h-3 w-3 text-faint" />}
              </button>
              <button onClick={() => persist(views.filter((v) => v.id !== view.id))} aria-label={tf.deleteView(view.name)} className="rounded-full p-1 hover:bg-primary/10 cursor-pointer">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex min-w-0 items-center gap-2 sm:shrink-0">
          <label htmlFor="radar-sort" className="sr-only">
            {tf.sortBy}
          </label>
          <select id="radar-sort" value={filters.sort} onChange={(e) => set({ sort: e.target.value as RadarSort })} className={cn(selectClass, "min-w-0 flex-1 sm:w-auto sm:flex-none")}>
            {SORT_KEYS.map((key) => (
              <option key={key} value={key}>
                {tf.sortPrefix} {tf.sort[key]}
              </option>
            ))}
          </select>
          <button
            onClick={() => setPanelOpen((v) => !v)}
            aria-expanded={panelOpen}
            className={cn(
              "inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 text-sm font-medium shadow-sm transition-colors cursor-pointer",
              panelOpen || chips.length ? "border-primary bg-primary-soft text-primary" : "border-border bg-card text-foreground hover:bg-subtle",
            )}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            {tf.filters}
            {chips.length > 0 && <span className="rounded-full bg-primary px-1.5 text-[11px] text-white">{chips.length}</span>}
          </button>
        </div>
      </div>

      {panelOpen && (
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Control label={tf.verdict}>
              <div className="flex flex-wrap gap-1.5">
                {VERDICTS.map((v) => (
                  <button key={v} onClick={() => set({ verdicts: toggle(filters.verdicts, v) })} aria-pressed={filters.verdicts.includes(v)} className={chipClass(filters.verdicts.includes(v))}>
                    {t.word.verdicts[v]}
                  </button>
                ))}
              </div>
            </Control>
            <Control label={tf.category}>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((c) => (
                  <button key={c} onClick={() => set({ categories: toggle(filters.categories, c) })} aria-pressed={filters.categories.includes(c)} className={chipClass(filters.categories.includes(c))}>
                    {t.word.categories[c] ?? c}
                  </button>
                ))}
              </div>
            </Control>
            <Control label={tf.root}>
              <select aria-label={tf.root} value={filters.root ?? "any"} onChange={(e) => set({ root: e.target.value === "any" ? null : e.target.value })} className={selectClass}>
                <option value="any">{tf.allRoots}</option>
                {roots.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </Control>
            <Control label={tf.confidence}>
              <div className="flex flex-wrap gap-1.5">
                {CONFIDENCES.map((c) => (
                  <button key={c} onClick={() => set({ confidence: toggle(filters.confidence, c) })} aria-pressed={filters.confidence.includes(c)} className={chipClass(filters.confidence.includes(c))}>
                    {tf.confidenceLevels[c]}
                  </button>
                ))}
              </div>
            </Control>
            <Control label={tf.minScore}>
              <select aria-label={tf.minScore} value={filters.minScore} onChange={(e) => set({ minScore: Number(e.target.value) })} className={selectClass}>
                {[0, 50, 60, 70, 80].map((v) => (
                  <option key={v} value={v}>
                    {v ? tf.scoreAtLeast(v) : tf.anyScore}
                  </option>
                ))}
              </select>
            </Control>
            <Control label={tf.kd}>
              <select aria-label={tf.kd} value={filters.maxKd ?? "any"} onChange={(e) => set({ maxKd: parseNullable(e.target.value) })} className={selectClass}>
                <option value="any">{tf.anyKd}</option>
                {[10, 20, 30].map((v) => (
                  <option key={v} value={v}>
                    {tf.kdAtMost(v)}
                  </option>
                ))}
              </select>
            </Control>
            <Control label={tf.kgr}>
              <select aria-label={tf.kgr} value={filters.maxKgr ?? "any"} onChange={(e) => set({ maxKgr: parseNullable(e.target.value) })} className={selectClass}>
                <option value="any">{tf.anyKgr}</option>
                {[0.1, 0.25, 0.5].map((v) => (
                  <option key={v} value={v}>
                    {tf.kgrAtMost(v)}
                  </option>
                ))}
              </select>
            </Control>
            <Control label={tf.volume}>
              <select aria-label={tf.volume} value={filters.minVolume} onChange={(e) => set({ minVolume: Number(e.target.value) })} className={selectClass}>
                {[0, 500, 1000, 5000].map((v) => (
                  <option key={v} value={v}>
                    {v ? tf.volumeAtLeast(v) : tf.anyVolume}
                  </option>
                ))}
              </select>
            </Control>
            <Control label={tf.sites}>
              <select aria-label={tf.sites} value={filters.maxSitesNow ?? "any"} onChange={(e) => set({ maxSitesNow: parseNullable(e.target.value) })} className={selectClass}>
                <option value="any">{tf.anyNumber}</option>
                {[3, 5, 10].map((v) => (
                  <option key={v} value={v}>
                    {tf.sitesAtMost(v)}
                  </option>
                ))}
              </select>
            </Control>
            <Control label={tf.found}>
              <select aria-label={tf.found} value={filters.maxAgeHours ?? "any"} onChange={(e) => set({ maxAgeHours: parseNullable(e.target.value) })} className={selectClass}>
                <option value="any">{tf.anyTime}</option>
                <option value={24}>{tf.last24}</option>
                <option value={48}>{tf.last48}</option>
                <option value={168}>{tf.last7d}</option>
              </select>
            </Control>
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <button onClick={() => onChange(DEFAULT_FILTERS)} className="self-start text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">
              {tf.reset}
            </button>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                saveView()
              }}
              className="flex gap-2"
            >
              <input
                value={viewName}
                onChange={(e) => setViewName(e.target.value)}
                placeholder={tf.viewNamePlaceholder}
                aria-label={tf.viewName}
                className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-card px-3 text-sm text-foreground placeholder:text-faint focus:border-primary focus:outline-none sm:w-64"
              />
              <button type="submit" disabled={!viewName.trim()} className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-hover disabled:opacity-50 cursor-pointer">
                <Star className="h-3.5 w-3.5" />
                {tf.saveView}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-xs text-muted-foreground">
          {tf.count(resultCount, totalCount)}
        </span>
        {chips.map((chip) => (
          <span key={chip.key} className="inline-flex items-center gap-1 rounded-full bg-muted py-0.5 pl-2.5 pr-1 text-xs text-body">
            {chip.label}
            <button onClick={() => set({ [chip.key]: DEFAULT_FILTERS[chip.key] } as Partial<RadarFilters>)} aria-label={tf.remove(chip.label)} className="rounded-full p-0.5 hover:bg-border cursor-pointer">
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        {chips.length > 0 && (
          <button onClick={() => onChange({ ...DEFAULT_FILTERS, sort: filters.sort })} className="text-xs font-medium text-primary hover:text-primary-hover cursor-pointer">
            {tf.clearAll}
          </button>
        )}
      </div>
    </div>
  )
}
