"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PricingCards } from "@/components/pricing-cards"
import { PricingSchema } from "@/components/seo/pricing-schema"
import { FAQSchema } from "@/components/seo/structured-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle2, Sparkles } from "lucide-react"

const faqs = [
  {
    question: "Can I try NichePop for free?",
    answer: "Yes! NichePop offers a free forever plan with 1 searches per day. No credit card required. You can upgrade anytime to unlock unlimited searches and advanced features.",
  },
  {
    question: "What's the difference between Pro and Premium plans?",
    answer: "Pro plans include 20 analyses per day, all 15+ results visible, and real-time data. Premium offers 50 analyses per day and adds AI-powered business plan generation, data export capabilities, and multi-source data analysis for comprehensive insights.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Absolutely! You can cancel your subscription at any time with no questions asked. Your access will continue until the end of your current billing period.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with NichePop for any reason, contact us within 30 days of your purchase for a full refund.",
  },
  {
    question: "How do credits work?",
    answer: "On the free plan, you have 1 search per day. Pro plans offer 20 analyses per day, while Premium plans provide 50 analyses per day. You can also earn credits by inviting friends - each successful referral gives you 5 bonus credits.",
  },
  {
    question: "Can I switch between plans?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, changes take effect at the end of your current billing cycle.",
  },
  {
    question: "Is there a discount for annual billing?",
    answer: "Yes! Annual plans save you 17% compared to monthly billing. That's 2 months free when you pay annually.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) through our secure payment processor Stripe. We also support PayPal for your convenience.",
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0A0E27]">
      <PricingSchema />
      <FAQSchema faqs={faqs} />
      <Navbar />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Grid background */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(30, 38, 80, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 38, 80, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0080FF]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#39FF14]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-[#0F1635] text-[#39FF14] border-[#1E2650] px-4 py-1.5 text-xs backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 mr-2" />
              Simple, Transparent Pricing
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Choose Your Plan
            </h1>

            <p className="text-lg sm:text-xl text-[#8B92B3] max-w-2xl mx-auto leading-relaxed font-light">
              Start free, upgrade anytime to unlock more insights and discover profitable opportunities
            </p>
          </div>

          {/* Pricing Cards */}
          <PricingCards />

          {/* Features List */}
          <div className="mt-20 pt-16 border-t border-[#1E2650]">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                All Plans Include
              </h2>
              <p className="text-[#8B92B3]">
                Everything you need to find and analyze trending keywords
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {[
                "Real-time keyword trends",
                "Competition analysis",
                "Search volume data",
                "CPC and profit metrics",
                "SERP feature analysis",
                "Opportunity scoring",
                "Historical trend data",
                "AI-powered analysis",
                "Mobile-friendly interface",
                "Regular data updates",
                "Priority support",
                "Expert verification",
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#39FF14] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#8B92B3]">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 pt-16 border-t border-[#1E2650]">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Frequently Asked Questions
              </h2>
              <p className="text-[#8B92B3]">
                Got questions? We've got answers.
              </p>
            </div>

            <Card className="max-w-3xl mx-auto border-[#1E2650] bg-[#0F1635]/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-[#1E2650]">
                      <AccordionTrigger className="text-left text-white hover:text-[#0080FF]">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-[#8B92B3]">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
