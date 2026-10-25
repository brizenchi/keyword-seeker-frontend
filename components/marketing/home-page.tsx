/* Hallmark · genre: playful · macrostructure: narrative-workflow (F4 knobs: numbering=1.0/2.0/3.0 · layout=vertical stack · connector=dashed rail) · hero: text-top / box-right · design-system: design.md · designed-as-app */
/* Hallmark · pre-emit critique: P4 H4 E4 S4 R4 V4 */
import type { CSSProperties, ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { LocaleProvider } from "@/components/i18n/locale-provider"
import { AiBox } from "@/components/marketing/ai-box"
import { ChatPreview, MonitorPreview, TrendPreview } from "@/components/marketing/feature-previews"
import { Navbar } from "@/components/navbar"
import { OrganizationSchema, WebApplicationSchema } from "@/components/seo/structured-data"
import { PUBLIC_DELAY_HOURS } from "@/lib/data/radar"
import { getDictionary, localizedHref, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

/** Each stage owns one surface: pear for finding, cream for judging, sky for watching. */
const STAGES: { href: string; band: string; hl: string; preview: () => ReactNode }[] = [
  { href: "/trends", band: "bg-pear-soft", hl: "var(--color-pear)", preview: () => <TrendPreview /> },
  { href: "/ask", band: "bg-paper", hl: "var(--color-pear)", preview: () => <ChatPreview /> },
  { href: "/monitors", band: "bg-sky-soft", hl: "var(--color-sky)", preview: () => <MonitorPreview /> },
]

const reveal = (i: number) => ({ "--i": i }) as CSSProperties

/** Homepage: one big AI box, then the three steps of the workspace as a numbered walk-through. */
export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const t = dict.home

  return (
    <LocaleProvider locale={locale} remember>
      <div className="min-h-screen bg-background">
        <OrganizationSchema />
        <WebApplicationSchema />
        <Navbar />

        <main>
          {/* Hero: headline across the top, the AI box offset to the right of the pitch. */}
          <section className="mx-auto max-w-6xl px-4 pb-20 pt-36 sm:px-6 sm:pt-44 lg:pb-28">
            <h1 className="display hero-in max-w-5xl text-foreground" style={reveal(0)}>
              {t.h1Lead}
              {locale === "en" ? " " : <br className="sm:hidden" />}
              <span className="hl">{t.h1Accent}</span>
            </h1>

            <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
              <div className="hero-in min-w-0" style={reveal(1)}>
                <p className="text-lg leading-relaxed text-body">{t.sub}</p>
                <ol className="mt-8 space-y-2">
                  {t.stageVerbs.map((verb, i) => (
                    <li key={verb}>
                      <a href={`#stage-${i + 1}`} className="group inline-flex items-baseline gap-3 rounded-full text-sm text-body transition-colors hover:text-foreground">
                        <span className="font-mono text-xs font-medium text-muted-foreground tabular-nums">{i + 1}.0</span>
                        <span className="font-semibold text-foreground">{verb}</span>
                        <span className="text-muted-foreground">{t.features[i].eyebrow}</span>
                        <ArrowRight className="h-3.5 w-3.5 self-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="hero-in min-w-0 pl-3 sm:pl-6 lg:pl-0" style={reveal(2)}>
                <AiBox />
              </div>
            </div>
          </section>

          {/* The walk-through: 1.0 find → 2.0 judge → 3.0 watch, joined by a dashed rail on wide screens. */}
          <section id="features" className="relative scroll-mt-24 border-t-2 border-ink" aria-labelledby="features-title">
            <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
              <div className="relative mx-auto h-full max-w-6xl">
                <span className="absolute inset-y-24 left-[-1.5rem] border-l-2 border-dashed border-ink/25" />
              </div>
            </div>
            {t.features.map((feature, index) => {
              const stage = STAGES[index]
              return (
                <div key={feature.title} id={`stage-${index + 1}`} className={cn("scroll-mt-28 py-20 sm:py-24", stage.band)}>
                  <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    {index === 0 && (
                      <div className="mb-14 max-w-2xl">
                        <h2 id="features-title" className="display-s text-foreground">
                          {t.featuresTitle}
                        </h2>
                        <p className="mt-4 text-lg leading-relaxed text-body">{t.featuresText}</p>
                      </div>
                    )}

                    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
                      <div className="min-w-0">
                        <p className="relative flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <span aria-hidden className="absolute left-[calc(-3rem-7px)] top-1/2 hidden h-4 w-4 -translate-y-1/2 rounded-full bg-ink ring-4 ring-pear xl:block" />
                          <span
                            className="hl text-[clamp(3.5rem,6vw+1rem,5.5rem)] font-bold leading-none tracking-[-0.04em] text-ink tabular-nums"
                            style={{ "--hl": stage.hl, backgroundSize: "100% 0.16em", backgroundPosition: "0 94%" } as CSSProperties}
                          >
                            {index + 1}.0
                          </span>
                          <span className="mono-label text-ink-3">
                            {t.stageVerbs[index]} · {feature.eyebrow}
                          </span>
                        </p>
                        <h3 className="mt-6 text-2xl font-semibold leading-tight text-foreground sm:text-3xl">{feature.title}</h3>
                        <p className="mt-4 text-base leading-relaxed text-body sm:text-lg">{feature.text}</p>
                        <ul className="mt-6 space-y-2.5">
                          {feature.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-body">
                              <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink/45" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={stage.href}
                          className="group mt-8 inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-sky-ink underline decoration-sky/40 decoration-2 underline-offset-[6px] transition-colors hover:decoration-sky"
                        >
                          {feature.link}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                        </Link>
                      </div>

                      <div className="relative min-w-0">
                        {stage.preview()}
                        {index === 1 && (
                          <span className="mono-label absolute -top-3 right-5 -rotate-6 rounded-full bg-lavender-soft px-3 py-1.5 text-lavender-ink shadow-card ring-1 ring-lavender">
                            {t.demoSticker}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </section>

          {/* Start strip: one sentence, one push. */}
          <section className="border-t-2 border-ink">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0 max-w-2xl">
                <h2 className="text-2xl font-semibold leading-tight text-foreground sm:text-3xl">{t.ctaTitle}</h2>
                <p className="mt-2 text-body">{t.ctaText(PUBLIC_DELAY_HOURS)}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/start" className="btn btn--lg">
                  {dict.common.startFree}
                  <ArrowRight className="btn__arrow h-4 w-4" />
                </Link>
                <Link href={localizedHref("/pricing", locale)} className="btn btn--soft btn--lg">
                  {t.ctaPricing}
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </LocaleProvider>
  )
}
