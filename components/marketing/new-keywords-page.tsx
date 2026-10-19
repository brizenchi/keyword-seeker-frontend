import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Footer } from "@/components/footer"
import { LocaleProvider } from "@/components/i18n/locale-provider"
import { Navbar } from "@/components/navbar"
import { LockedWordRow, WordRow } from "@/components/radar/word-row"
import { PUBLIC_DELAY_HOURS, getDemoWords, isFreshWord } from "@/lib/data/radar"
import { getDictionary, localizedHref, type Locale } from "@/lib/i18n"

const primaryButton =
  "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover"

export function NewKeywordsPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const t = dict.newKeywords
  const pricingHref = localizedHref("/pricing", locale)
  const demoWords = getDemoWords(locale)
  const publicWords = demoWords.filter((w) => !isFreshWord(w)).sort((a, b) => a.firstSeenHoursAgo - b.firstSeenHoursAgo)
  const lockedWords = demoWords.filter(isFreshWord)
  const avg = (values: number[]) => Math.round(values.reduce((sum, v) => sum + v, 0) / values.length)
  const sitesThen = avg(publicWords.map((w) => w.sitesThen))
  const sitesNow = avg(publicWords.map((w) => w.sitesNow))

  return (
    <LocaleProvider locale={locale} remember>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main>
          <section className="relative pt-32 pb-12 sm:pt-40">
            <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-primary-soft to-background" />
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <p className="text-sm font-semibold text-primary">{t.eyebrow}</p>
              <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {t.title(PUBLIC_DELAY_HOURS)}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-body">
                {t.text(PUBLIC_DELAY_HOURS)}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={pricingHref} className={primaryButton}>
                  {t.ctaEarlier(PUBLIC_DELAY_HOURS)}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/start"
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-subtle"
                >
                  {dict.common.startFree}
                </Link>
              </div>

              <dl className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
                {[
                  { label: t.statPublished, value: publicWords.length },
                  { label: t.statProOnly, value: lockedWords.length },
                  { label: t.statSites, value: `${sitesThen} → ${sitesNow}` },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border bg-background px-4 py-3">
                    <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                    <dd className="mt-1 text-xl font-semibold tabular-nums text-foreground">{stat.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-2 text-xs text-muted-foreground">{t.statNote}</p>
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
            <h2 className="mb-3 text-sm font-semibold text-foreground">{t.publishedToday}</h2>
            <ul className="divide-y divide-border rounded-xl border border-border bg-background shadow-sm">
              {publicWords.map((word) => (
                <WordRow key={word.id} word={word} showTimeGap askHref={`/ask?q=${encodeURIComponent(word.keyword)}`} />
              ))}
            </ul>

            <div className="mt-10 flex items-baseline justify-between gap-4">
              <h2 className="text-sm font-semibold text-foreground">{t.inProWindow}</h2>
              <Link href={pricingHref} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover">
                <Sparkles className="h-3.5 w-3.5" />
                {t.unlockNow}
              </Link>
            </div>
            <ul className="mt-3 divide-y divide-border rounded-xl border border-dashed border-border bg-subtle">
              {lockedWords.map((word) => (
                <LockedWordRow key={word.id} word={word} unlockInHours={PUBLIC_DELAY_HOURS - word.firstSeenHoursAgo} />
              ))}
            </ul>
          </section>

          <section className="border-t border-border bg-subtle py-16">
            <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 md:grid-cols-3">
              {t.howTo.map((item) => (
                <div key={item.title}>
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-5xl px-4 text-xs text-muted-foreground sm:px-6">{dict.common.demoNote}</p>
          </section>
        </main>

        <Footer />
      </div>
    </LocaleProvider>
  )
}
