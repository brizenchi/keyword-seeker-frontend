"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OrganizationSchema, WebApplicationSchema } from "@/components/seo/structured-data"
import {
  TrendingUp,
  Search,
  Zap,
  Target,
  BarChart3,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from "lucide-react"
import { BrandMark } from "@/components/brand-logo"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0E27]">
      <OrganizationSchema />
      <WebApplicationSchema />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
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

        <div className="container mx-auto min-w-[1200px] max-w-7xl px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-6">
              <Badge className="bg-[#0F1635] text-[#39FF14] border-[#1E2650] px-4 py-1.5 text-xs backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 mr-2" />
                Discover Your Next Big Opportunity
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white" style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
                Find Trending Keywords
                <br />
                <span className="bg-gradient-to-r from-[#0080FF] to-[#39FF14] bg-clip-text text-transparent">
                  Before Everyone Else
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#8B92B3] max-w-xl lg:max-w-none leading-relaxed font-light">
                Discover high-potential keywords with low competition. Analyze search trends,
                competition levels, and profit opportunities in real-time.
              </p>

              <div className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-3 pt-2">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-[#39FF14] hover:bg-[#39FF14] text-[#0A0E27] font-bold text-base px-8 py-5 rounded-xl hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] hover:-translate-y-0.5 transition-all duration-200">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="text-base px-8 py-5 rounded-xl border-2 border-[#1E2650] bg-transparent backdrop-blur-sm text-white hover:bg-[#0080FF]/10 hover:border-[#0080FF] transition-all duration-200">
                    Learn More
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-xs text-[#8B92B3]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#39FF14]" />
                  <span className="font-medium">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#39FF14]" />
                  <span className="font-medium">Free trial included</span>
                </div>
              </div>
            </div>

            {/* Right Chart */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-lg">
                {/* Glass card container for the chart */}
                <div className="relative rounded-2xl bg-[#0F1635]/80 backdrop-blur-xl border border-[#1E2650] p-6 shadow-2xl shadow-[#0080FF]/20">
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#39FF14]/20 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#0080FF]/20 rounded-full blur-2xl"></div>

                  {/* Chart Header */}
                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Keyword Trends</h3>
                        <p className="text-[#8B92B3] text-sm">Real-time analytics</p>
                      </div>
                      <div className="flex items-center gap-1 bg-[#0A0E27]/50 rounded-lg p-1 border border-[#1E2650]">
                        <button className="px-3 py-1 text-xs font-medium text-[#8B92B3] hover:text-white hover:bg-[#1E2650] rounded transition-colors">1W</button>
                        <button className="px-3 py-1 text-xs font-medium bg-[#0080FF] text-white rounded transition-colors">1M</button>
                        <button className="px-3 py-1 text-xs font-medium text-[#8B92B3] hover:text-white hover:bg-[#1E2650] rounded transition-colors">1Y</button>
                      </div>
                    </div>

                    {/* Mock Chart */}
                    <div className="relative h-64 rounded-xl bg-[#0A0E27]/50 border border-[#1E2650] p-4">
                      {/* Y-axis labels */}
                      <div className="absolute left-2 top-4 bottom-4 flex flex-col justify-between text-[#8B92B3] text-xs">
                        <span>100K</span>
                        <span>75K</span>
                        <span>50K</span>
                        <span>25K</span>
                        <span>0</span>
                      </div>

                      {/* Chart area */}
                      <div className="ml-8 h-full relative">
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between">
                          <div className="border-t border-[#1E2650]"></div>
                          <div className="border-t border-[#1E2650]"></div>
                          <div className="border-t border-[#1E2650]"></div>
                          <div className="border-t border-[#1E2650]"></div>
                          <div className="border-t border-[#1E2650]"></div>
                        </div>

                        {/* Mock curve using SVG */}
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#0080FF" />
                              <stop offset="100%" stopColor="#39FF14" />
                            </linearGradient>
                            <linearGradient id="chartFill" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#0080FF" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="#0080FF" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          {/* Area fill */}
                          <path
                            d="M 0 200 L 0 120 Q 60 80, 120 100 T 240 60 L 240 200 Z"
                            fill="url(#chartFill)"
                          />
                          {/* Line */}
                          <path
                            d="M 0 120 Q 60 80, 120 100 T 240 60"
                            fill="none"
                            stroke="url(#chartGradient)"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                          {/* Glow effect */}
                          <path
                            d="M 0 120 Q 60 80, 120 100 T 240 60"
                            fill="none"
                            stroke="url(#chartGradient)"
                            strokeWidth="6"
                            strokeLinecap="round"
                            opacity="0.3"
                            filter="blur(4px)"
                          />
                        </svg>
                      </div>

                      {/* X-axis labels */}
                      <div className="absolute bottom-0 left-8 right-0 flex justify-between text-[#8B92B3] text-xs pt-2">
                        <span>Week 1</span>
                        <span>Week 2</span>
                        <span>Week 3</span>
                        <span>Week 4</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-[#0A0E27]/50 rounded-lg p-3 border border-[#1E2650]">
                        <div className="text-[#8B92B3] text-xs mb-1">Volume</div>
                        <div className="text-white font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>89.2K</div>
                        <div className="text-[#39FF14] text-xs">+12.5%</div>
                      </div>
                      <div className="bg-[#0A0E27]/50 rounded-lg p-3 border border-[#1E2650]">
                        <div className="text-[#8B92B3] text-xs mb-1">CPC</div>
                        <div className="text-white font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>$2.45</div>
                        <div className="text-[#39FF14] text-xs">+8.3%</div>
                      </div>
                      <div className="bg-[#0A0E27]/50 rounded-lg p-3 border border-[#1E2650]">
                        <div className="text-[#8B92B3] text-xs mb-1">Opportunity</div>
                        <div className="text-white font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>94</div>
                        <div className="text-[#39FF14] text-xs flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          <span>High</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#0F1635]/50 backdrop-blur-sm border-y border-[#1E2650]">
        <div className="container mx-auto min-w-[1200px] max-w-7xl px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Everything You Need to Find <span className="bg-gradient-to-r from-[#0080FF] to-[#39FF14] bg-clip-text text-transparent">Winning Keywords</span>
            </h2>
            <p className="text-xl text-[#8B92B3] max-w-2xl mx-auto font-light">
              Powerful tools to discover, analyze, and capitalize on trending opportunities
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group border-[#1E2650] hover:border-[#0080FF] transition-all duration-300 hover:shadow-2xl hover:shadow-[#0080FF]/20 hover:-translate-y-2 cursor-pointer bg-[#0F1635]/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0080FF] mb-4 shadow-lg shadow-[#0080FF]/50 group-hover:shadow-[#0080FF]/70 transition-all">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-white text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Real-Time Trends</CardTitle>
                <CardDescription className="text-[#8B92B3]">
                  Track keyword trends as they happen with live data from Google and social platforms
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-[#1E2650] hover:border-[#39FF14] transition-all duration-300 hover:shadow-2xl hover:shadow-[#39FF14]/20 hover:-translate-y-2 cursor-pointer bg-[#0F1635]/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#39FF14] mb-4 shadow-lg shadow-[#39FF14]/50 group-hover:shadow-[#39FF14]/70 transition-all">
                  <Target className="h-7 w-7 text-[#0A0E27]" />
                </div>
                <CardTitle className="text-white text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Competition Analysis</CardTitle>
                <CardDescription className="text-[#8B92B3]">
                  Identify low-competition keywords with high search volume for maximum ROI
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-[#1E2650] hover:border-[#0080FF] transition-all duration-300 hover:shadow-2xl hover:shadow-[#0080FF]/20 hover:-translate-y-2 cursor-pointer bg-[#0F1635]/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0080FF] mb-4 shadow-lg shadow-[#0080FF]/50 group-hover:shadow-[#0080FF]/70 transition-all">
                  <BarChart3 className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-white text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Profit Estimation</CardTitle>
                <CardDescription className="text-[#8B92B3]">
                  Calculate potential revenue with CPC data and search volume metrics
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-[#1E2650] hover:border-[#39FF14] transition-all duration-300 hover:shadow-2xl hover:shadow-[#39FF14]/20 hover:-translate-y-2 cursor-pointer bg-[#0F1635]/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#39FF14] mb-4 shadow-lg shadow-[#39FF14]/50 group-hover:shadow-[#39FF14]/70 transition-all">
                  <Search className="h-7 w-7 text-[#0A0E27]" />
                </div>
                <CardTitle className="text-white text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>SERP Analysis</CardTitle>
                <CardDescription className="text-[#8B92B3]">
                  Analyze search results to understand what content ranks and why
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-[#1E2650] hover:border-[#0080FF] transition-all duration-300 hover:shadow-2xl hover:shadow-[#0080FF]/20 hover:-translate-y-2 cursor-pointer bg-[#0F1635]/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0080FF] mb-4 shadow-lg shadow-[#0080FF]/50 group-hover:shadow-[#0080FF]/70 transition-all">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-white text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Instant Insights</CardTitle>
                <CardDescription className="text-[#8B92B3]">
                  Get actionable insights in seconds with our AI-powered analysis engine
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-[#1E2650] hover:border-[#39FF14] transition-all duration-300 hover:shadow-2xl hover:shadow-[#39FF14]/20 hover:-translate-y-2 cursor-pointer bg-[#0F1635]/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#39FF14] mb-4 shadow-lg shadow-[#39FF14]/50 group-hover:shadow-[#39FF14]/70 transition-all">
                  <Sparkles className="h-7 w-7 text-[#0A0E27]" />
                </div>
                <CardTitle className="text-white text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Opportunity Score</CardTitle>
                <CardDescription className="text-[#8B92B3]">
                  Proprietary scoring system to rank keywords by profit potential
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0080FF]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto min-w-[1200px] max-w-7xl px-8 relative z-10">
          <Card className="border-2 border-[#0080FF]/30 bg-[#0F1635]/80 backdrop-blur-xl shadow-2xl shadow-[#0080FF]/20">
            <CardContent className="p-12 text-center space-y-6">
              <div className="flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#1E2650] bg-[#0A0E27]/80 shadow-2xl shadow-[#0080FF]/40">
                  <BrandMark className="h-12 w-12" withGlow />
                </div>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Ready to Find Your <span className="bg-gradient-to-r from-[#0080FF] to-[#39FF14] bg-clip-text text-transparent">Next Opportunity?</span>
              </h2>
              <p className="text-xl text-[#8B92B3] max-w-2xl mx-auto font-light">
                Join thousands of marketers and entrepreneurs discovering profitable keywords every day
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="bg-[#39FF14] hover:bg-[#39FF14] text-[#0A0E27] font-bold text-lg px-10 py-6 rounded-xl hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] hover:-translate-y-0.5 transition-all duration-200">
                  Start Exploring Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
