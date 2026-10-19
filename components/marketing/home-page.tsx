import Link from "next/link"
import { ArrowRight, Bot, Check, Eye, TrendingUp, type LucideIcon } from "lucide-react"
import { Footer } from "@/components/footer"
import { LocaleProvider } from "@/components/i18n/locale-provider"
import { AiBox } from "@/components/marketing/ai-box"
import { ChatPreview, MonitorPreview, TrendPreview } from "@/components/marketing/feature-previews"
import { Navbar } from "@/components/navbar"
import { OrganizationSchema, WebApplicationSchema } from "@/components/seo/structured-data"
import { PUBLIC_DELAY_HOURS } from "@/lib/data/radar"
import { getDictionary, localizedHref, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const primaryButton =
  "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"

const FEATURES: { icon: LucideIcon; href: string; preview: () => React.ReactNode }[] = [
  { icon: TrendingUp, href: "/trends", preview: () => <TrendPreview /> },
  { icon: Bot, href: "/ask", preview: () => <ChatPreview /> },
  { icon: Eye, href: "/monitors", preview: () => <MonitorPreview /> },
]

/** Homepage: one big AI box, then what the three workspace places do. */
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
          {/* Hero: the AI box */}
          <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
            <div className="absolute inset-x-0 top-0 -z-10 h-[620px] bg-gradient-to-b from-primary-soft to-background" />
            <div className="mx-auto max-w-4xl text-center">
              <Link
                href={localizedHref("/new-keywords", locale)}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-3 py-1 text-sm text-body shadow-sm transition-colors hover:border-primary/40"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                {t.badge}
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
                {t.h1Lead}
                {locale === "en" && " "}
                <span className="text-primary">{t.h1Accent}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">{t.sub}</p>
            </div>
            <div className="mt-10">
              <AiBox />
            </div>
          </section>

          {/* Features */}
          <section id="features" className="scroll-mt-20 border-t border-border bg-subtle py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-semibold text-primary">{t.featuresEyebrow}</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{t.featuresTitle}</h2>
                <p className="mt-4 text-lg leading-relaxed text-body">{t.featuresText}</p>
              </div>

              <div className="mt-16 space-y-20 sm:space-y-24">
                {t.features.map((feature, index) => {
                  const { icon: Icon, href, preview } = FEATURES[index]
                  return (
                    <div key={feature.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                      <div className={cn(index % 2 === 1 && "lg:order-2")}>
                        <p className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft">
                            <Icon className="h-4 w-4" />
                          </span>
                          {feature.eyebrow}
                        </p>
                        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{feature.title}</h3>
                        <p className="mt-3 text-base leading-relaxed text-body">{feature.text}</p>
                        <ul className="mt-5 space-y-2.5">
                          {feature.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-2.5 text-sm text-body">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                        <Link href={href} className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover">
                          {feature.link}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                      <div className={cn("min-w-0", index % 2 === 1 && "lg:order-1")}>{preview()}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="px-4 py-20 sm:px-6 sm:py-24">
            <div className="mx-auto max-w-6xl rounded-2xl bg-foreground px-6 py-14 text-center sm:px-12">
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{t.ctaTitle}</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">{t.ctaText(PUBLIC_DELAY_HOURS)}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/start" className={primaryButton}>
                  {dict.common.startFree}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={localizedHref("/pricing", locale)}
                  className="inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-white/10"
                >
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
