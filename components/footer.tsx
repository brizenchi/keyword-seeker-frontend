"use client"
/* Hallmark · genre: playful · footer: Ft8 marquee (speed: 32s · direction: left · glyph: middot) + one compact link row · design-system: design.md */

import Link from "next/link"
import { BrandLogo } from "@/components/brand-logo"
import { useLocale, useT } from "@/components/i18n/locale-provider"
import { localizedHref } from "@/lib/i18n"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const locale = useLocale()
  const t = useT()
  const f = t.footer

  // One run of the tagline; the track holds two copies so a -50% loop is seamless.
  const run = [...f.marquee, "NichePop"]
  const links = [
    { label: f.newKeywordsToday, href: localizedHref("/new-keywords", locale) },
    { label: f.pricing, href: localizedHref("/pricing", locale) },
    { label: t.nav.blog, href: "/blog" },
    { label: f.useCases, href: "/use-cases" },
    { label: f.privacy, href: "/privacy" },
    { label: f.terms, href: "/terms" },
    { label: f.contact, href: "mailto:support@nichepop.app" },
  ]

  return (
    <footer className="border-t-2 border-ink bg-paper">
      <div className="foot-marquee overflow-hidden border-b border-rule py-5" aria-hidden>
        <div className="foot-marquee__track flex w-max">
          {[0, 1].map((copy) => (
            <p key={copy} className="flex shrink-0 items-center whitespace-nowrap text-[clamp(1.5rem,3.5vw,2.75rem)] font-bold tracking-[-0.02em] text-ink">
              {[...run, ...run, ...run].map((word, i) => (
                <span key={i} className="flex items-center">
                  <span className="px-6">{word}</span>
                  <span className="h-3 w-3 rounded-full bg-pear" />
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
      <p className="sr-only">{f.tagline}</p>

      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 lg:shrink-0">
          <Link href={localizedHref("/", locale)} className="inline-flex shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <BrandLogo size="sm" />
          </Link>
          <span className="text-xs text-muted-foreground lg:whitespace-nowrap">{f.rights(currentYear)}</span>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm lg:justify-end">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="whitespace-nowrap text-body underline-offset-4 transition-colors hover:text-foreground hover:underline hover:decoration-sky hover:decoration-2">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
