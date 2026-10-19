"use client"

import { usePathname, useRouter } from "next/navigation"
import { Languages } from "lucide-react"
import { cn } from "@/lib/utils"
import { switchLocalePath, type Locale } from "@/lib/i18n"
import { setLocaleCookie, useLocale, useT } from "./locale-provider"

/**
 * EN / 中文 toggle. Marketing pages move to the other language's URL; app pages switch in place.
 * `compact` renders a single button that switches to the other language (for tight headers).
 */
export function LanguageSwitcher({ className, compact = false }: { className?: string; compact?: boolean }) {
  const locale = useLocale()
  const t = useT()
  const pathname = usePathname()
  const router = useRouter()

  const switchTo = (target: Locale) => {
    if (target === locale) return
    setLocaleCookie(target)
    const href = switchLocalePath(pathname, target)
    if (href) {
      router.push(href)
      return
    }
    const params = new URLSearchParams(window.location.search)
    if (params.has("lang")) {
      if (target === "zh") params.set("lang", "zh")
      else params.delete("lang")
      const query = params.toString()
      router.replace(query ? `${pathname}?${query}` : pathname)
    } else {
      router.refresh()
    }
  }

  if (compact) {
    const other: Locale = locale === "en" ? "zh" : "en"
    return (
      <button
        onClick={() => switchTo(other)}
        aria-label={t.switcher.label}
        className={cn(
          "inline-flex h-8 items-center gap-1 whitespace-nowrap rounded-lg px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
          className,
        )}
      >
        {other === "en" ? "EN" : "中文"}
      </button>
    )
  }

  return (
    <div className={cn("inline-flex items-center gap-1 rounded-lg bg-muted p-0.5", className)} role="group" aria-label={t.switcher.label}>
      <Languages className="ml-1.5 h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      {(["en", "zh"] as const).map((option) => (
        <button
          key={option}
          onClick={() => switchTo(option)}
          aria-pressed={locale === option}
          className={cn(
            "rounded-md px-2 py-1 text-xs font-medium transition-colors cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
            locale === option ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option === "en" ? "EN" : "中文"}
        </button>
      ))}
    </div>
  )
}
