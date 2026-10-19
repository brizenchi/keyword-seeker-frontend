"use client"

import Link from "next/link"
import { Mail } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"
import { useLocale, useT } from "@/components/i18n/locale-provider"
import { localizedHref } from "@/lib/i18n"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const locale = useLocale()
  const f = useT().footer

  const footerSections = [
    {
      title: f.product,
      links: [
        { label: f.radar, href: "/trends" },
        { label: f.askAi, href: "/ask" },
        { label: f.monitors, href: "/monitors" },
        { label: f.newKeywordsToday, href: localizedHref("/new-keywords", locale) },
        { label: f.keywordExplorer, href: "/dashboard" },
        { label: f.pricing, href: localizedHref("/pricing", locale) },
      ],
    },
    {
      title: f.resources,
      links: [
        { label: f.guideLowCompetition, href: "/blog/how-to-find-low-competition-keywords" },
        { label: f.guideProfitability, href: "/blog/estimate-keyword-profitability" },
        { label: f.guideScore, href: "/blog/keyword-opportunity-score-explained" },
        { label: f.guideVsAhrefs, href: "/blog/nichepop-vs-ahrefs-comparison" },
      ],
    },
    {
      title: f.useCases,
      links: [
        { label: f.bloggers, href: "/use-cases/bloggers" },
        { label: f.creators, href: "/use-cases/content-creators" },
        { label: f.ecommerce, href: "/use-cases/ecommerce" },
        { label: f.affiliate, href: "/use-cases/affiliate-marketing" },
      ],
    },
    {
      title: f.company,
      links: [
        { label: f.contact, href: "mailto:support@nichepop.app" },
        { label: f.privacy, href: "/privacy" },
        { label: f.terms, href: "/terms" },
      ],
    },
  ]

  return (
    <footer className="border-t border-border bg-subtle">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 py-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href={localizedHref("/", locale)} className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">
              <BrandLogo size="sm" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {f.tagline}
            </p>
            <a
              href="mailto:support@nichepop.app"
              className="mt-5 inline-flex items-center gap-2 text-sm text-body transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              support@nichepop.app
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>{f.rights(currentYear)}</p>
          <p>{f.builtFor}</p>
        </div>
      </div>
    </footer>
  )
}
