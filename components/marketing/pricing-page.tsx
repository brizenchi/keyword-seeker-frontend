import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PricingCards } from "@/components/pricing-cards"
import { PricingSchema } from "@/components/seo/pricing-schema"
import { FAQSchema } from "@/components/seo/structured-data"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PlanComparison } from "@/components/plan-comparison"
import { LocaleProvider } from "@/components/i18n/locale-provider"
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
          <section className="relative pt-32 pb-20 sm:pt-40">
            <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-primary-soft to-background" />
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-semibold text-primary">{t.eyebrow}</p>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  {t.title}
                </h1>
                <p className="mt-4 text-lg text-body">
                  {t.subtitle}
                </p>
              </div>

              <div className="mt-12">
                <PricingCards />
              </div>
            </div>
          </section>

          <section className="border-t border-border bg-subtle py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{t.compareTitle}</h2>
                <p className="mt-2 text-body">{t.compareText}</p>
              </div>
              <div className="mt-10 max-w-4xl">
                <PlanComparison />
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-3">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{t.faqTitle}</h2>
                <p className="mt-3 text-body">
                  {t.faqText}{" "}
                  <a href="mailto:support@nichepop.app" className="font-medium text-primary hover:text-primary-hover">
                    {t.emailUs}
                  </a>
                </p>
              </div>
              <Accordion type="single" collapsible className="lg:col-span-2">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-border">
                    <AccordionTrigger className="py-5 text-left text-base font-semibold text-foreground hover:no-underline hover:text-primary cursor-pointer">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-body">{faq.answer}</AccordionContent>
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
