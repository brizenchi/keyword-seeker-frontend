/* Hallmark · genre: playful · macrostructure: narrative-workflow / pricing as F3 tabular spec sheet (columns: 3 plans · rule density: every row · numbers: tabular) · design-system: design.md · designed-as-app */
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PricingCards, PricingTable } from "@/components/pricing-cards"
import { PricingSchema } from "@/components/seo/pricing-schema"
import { FAQSchema } from "@/components/seo/structured-data"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { LocaleProvider } from "@/components/i18n/locale-provider"
import { PUBLIC_DELAY_HOURS } from "@/lib/data/radar"
import { getDictionary, type Locale } from "@/lib/i18n"

export function PricingPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).pricing
  const faqs = t.faqs

  return (
    <LocaleProvider locale={locale} remember>
      <div className="min-h-screen bg-background">
        <PricingSchema />
        <FAQSchema faqs={faqs} />
        <Navbar />

        <main>
          <section className="mx-auto max-w-6xl px-4 pb-16 pt-36 sm:px-6 sm:pt-44">
            <div className="max-w-2xl">
              <h1 className="display-s text-foreground">{t.title}</h1>
              <p className="mt-4 text-lg leading-relaxed text-body">{t.subtitle}</p>
            </div>

            <div className="mt-10 hidden md:block">
              <PricingTable delayHours={PUBLIC_DELAY_HOURS} />
            </div>
            {/* Phones get the plans as cards; a 4-column table doesn't fit a 375px screen. */}
            <div className="mt-10 md:hidden">
              <PricingCards />
            </div>
          </section>

          <section className="border-t-2 border-ink bg-paper-2 py-16 sm:py-20">
            <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:gap-12">
              <div>
                <h2 className="text-2xl font-semibold leading-tight text-foreground sm:text-3xl">{t.faqTitle}</h2>
                <p className="mt-3 text-body">
                  {t.faqText}{" "}
                  <a href="mailto:support@nichepop.app" className="font-semibold text-sky-ink underline decoration-sky/40 decoration-2 underline-offset-4 hover:decoration-sky">
                    {t.emailUs}
                  </a>
                </p>
              </div>
              <Accordion type="single" collapsible className="lg:col-span-2">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-rule-strong">
                    <AccordionTrigger className="py-5 text-left text-base font-semibold text-foreground hover:no-underline hover:text-sky-ink cursor-pointer">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="max-w-[65ch] text-sm leading-relaxed text-body">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </LocaleProvider>
  )
}
