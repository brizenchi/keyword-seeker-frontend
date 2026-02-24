"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OrganizationSchema, WebApplicationSchema } from "@/components/seo/structured-data"
import LoginDialog from "@/components/LoginDialog"
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

const radarTargets = [
  { keyword: "AI Agent Tools", x: "74%", y: "18%", labelDirection: "left" },
  { keyword: "UGC Automation", x: "86%", y: "52%", labelDirection: "left" },
  { keyword: "Niche SEO SaaS", x: "46%", y: "84%", labelDirection: "right" },
  { keyword: "TikTok Shop Ads", x: "20%", y: "38%", labelDirection: "right" },
  { keyword: "B2B Outreach AI", x: "18%", y: "70%", labelDirection: "right" },
  { keyword: "Voice Clone Biz", x: "84%", y: "30%", labelDirection: "left" },
]

const hotspotKeywords = [
  { keyword: "AI Agent Tools", growth: "+186%", score: 96 },
  { keyword: "UGC Automation", growth: "+142%", score: 91 },
  { keyword: "Niche SEO SaaS", growth: "+118%", score: 88 },
]

const normalizeAngle = (angle: number) => ((angle % 360) + 360) % 360

const getRadarAngle = (x: string, y: string) => {
  const dx = Number.parseFloat(x) - 50
  const dy = Number.parseFloat(y) - 50
  return normalizeAngle((Math.atan2(dx, -dy) * 180) / Math.PI)
}

const getAngleDistance = (a: number, b: number) => {
  const diff = Math.abs(a - b) % 360
  return diff > 180 ? 360 - diff : diff
}

const smoothstep = (t: number) => t * t * (3 - 2 * t)

const LABEL_HOLD_MS = 1000
const LABEL_FADE_MS = 1200

export default function HomePage() {
  const [scanFrame, setScanFrame] = useState({ angle: 0, now: 0 })
  const lastDetectedAtRef = useRef<Record<string, number>>({})
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

  const radarTargetsWithAngles = useMemo(() => {
    return radarTargets.map((target) => ({
      ...target,
      angle: getRadarAngle(target.x, target.y),
    }))
  }, [])

  useEffect(() => {
    let animationFrameId: number
    let previousTime = performance.now()
    const rotationSpeed = 360 / 5000

    const tick = (now: number) => {
      const delta = now - previousTime
      previousTime = now
      setScanFrame((prev) => ({
        angle: (prev.angle + delta * rotationSpeed) % 360,
        now,
      }))
      animationFrameId = requestAnimationFrame(tick)
    }

    animationFrameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  const radarTargetsInView = radarTargetsWithAngles.map((target) => {
    const isDetectedNow = getAngleDistance(scanFrame.angle, target.angle) <= 10

    if (isDetectedNow) {
      lastDetectedAtRef.current[target.keyword] = scanFrame.now
    }

    const lastDetectedAt = lastDetectedAtRef.current[target.keyword] ?? -Infinity
    const elapsedSinceDetected = scanFrame.now - lastDetectedAt
    const fadeProgress = Math.max(0, Math.min(1, (elapsedSinceDetected - LABEL_HOLD_MS) / LABEL_FADE_MS))
    const highlightOpacity = elapsedSinceDetected <= LABEL_HOLD_MS ? 1 : 1 - smoothstep(fadeProgress)
    const isHighlighted = highlightOpacity > 0

    return {
      ...target,
      isDetectedNow,
      isHighlighted,
      highlightOpacity,
    }
  })

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
                Find Profitable Niches
                <br />
                <span className="bg-gradient-to-r from-[#0080FF] to-[#39FF14] bg-clip-text text-transparent">
                  Before Everyone Else
                </span>
              </h1>

              <p className="text-lg text-white max-w-xl lg:max-w-none leading-relaxed font-medium">
                Discover trending, low-competition niches 3 months before they peak. Real-time Reddit insights + AI analysis—starting at $12.9/month.
              </p>

              <div className="grid grid-cols-3 gap-4 max-w-xl lg:max-w-none mb-4">
                <div className="text-left">
                  <div className="text-2xl font-bold text-[#39FF14]">10,000+</div>
                  <div className="text-xs text-[#8B92B3]">Reddit discussions analyzed daily</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-[#39FF14]">3 months</div>
                  <div className="text-xs text-[#8B92B3]">Earlier trend detection</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-[#39FF14]">95%</div>
                  <div className="text-xs text-[#8B92B3]">Lower competition keywords</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-3 pt-2">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-[#39FF14] hover:bg-[#39FF14]/90 text-[#0A0E27] font-bold text-base px-8 py-5 rounded-xl hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  >
                    Try Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="text-base px-8 py-5 rounded-xl border-2 border-[#1E2650] bg-transparent backdrop-blur-sm text-white hover:bg-[#0080FF]/20 hover:border-[#0080FF] hover:text-white transition-all duration-200 cursor-pointer">
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
                        <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Opportunity Radar</h3>
                        <p className="text-[#8B92B3] text-sm">Live scan for trending business keywords</p>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-[#1E2650] bg-[#0A0E27]/60 px-3 py-1.5">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#39FF14]/70"></span>
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#39FF14]"></span>
                        </span>
                        <span className="text-xs font-medium text-[#39FF14]">Scan Active</span>
                      </div>
                    </div>

                    {/* Radar */}
                    <div className="relative rounded-xl border border-[#1E2650] bg-[#0A0E27]/50 p-4">
                      <div className="relative mx-auto aspect-square max-w-[320px]">
                        <div className="absolute inset-0 rounded-full border border-[#1E2650] bg-[radial-gradient(circle,_rgba(57,255,20,0.12)_0%,_rgba(10,14,39,0.96)_68%)]"></div>
                        <div className="absolute inset-[12%] rounded-full border border-[#1E2650]/90"></div>
                        <div className="absolute inset-[24%] rounded-full border border-[#1E2650]/80"></div>
                        <div className="absolute inset-[36%] rounded-full border border-[#1E2650]/70"></div>

                        <div className="absolute inset-0">
                          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[#1E2650]"></div>
                          <div className="absolute bottom-0 top-0 left-1/2 w-px -translate-x-1/2 bg-[#1E2650]"></div>
                          <div className="absolute left-[15%] top-1/2 h-px w-[70%] -translate-y-1/2 rotate-45 bg-[#1E2650]/80"></div>
                          <div className="absolute left-[15%] top-1/2 h-px w-[70%] -translate-y-1/2 -rotate-45 bg-[#1E2650]/80"></div>
                        </div>

                        <div className="absolute inset-0 overflow-hidden rounded-full">
                          <div className="absolute inset-0 origin-center" style={{ transform: `rotate(${scanFrame.angle}deg)` }}>
                            <div className="absolute left-1/2 top-1/2 h-1/2 w-[2px] -translate-x-1/2 -translate-y-full bg-gradient-to-b from-[#39FF14] via-[#39FF14]/70 to-transparent shadow-[0_0_20px_rgba(57,255,20,0.9)]"></div>
                          </div>
                        </div>

                        {radarTargetsInView.map((target) => {
                          return (
                            <div
                              key={target.keyword}
                              className="absolute -translate-x-1/2 -translate-y-1/2"
                              style={{ left: target.x, top: target.y }}
                            >
                              <div className={`absolute inset-0 rounded-full bg-[#39FF14]/50 transition-opacity duration-150 ${target.isDetectedNow ? "animate-ping opacity-100" : "opacity-0"}`}></div>
                              <div
                                className={`relative h-2.5 w-2.5 rounded-full border ${target.isHighlighted ? "border-[#39FF14] bg-[#0A0E27] shadow-[0_0_14px_rgba(57,255,20,0.85)]" : "border-[#2E6A44] bg-[#0A0E27] shadow-none opacity-45"}`}
                                style={target.isHighlighted ? { opacity: target.highlightOpacity } : undefined}
                              ></div>
                              <div
                                className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded border bg-[#0A0E27]/90 px-2 py-0.5 text-[10px] font-medium ${target.labelDirection === "left" ? "right-4 text-right" : "left-4"} ${target.isHighlighted ? "border-[#2E6A44] text-[#D8FFE3]" : "opacity-0 border-transparent text-transparent"}`}
                                style={target.isHighlighted ? { opacity: target.highlightOpacity } : undefined}
                              >
                                {target.keyword}
                              </div>
                            </div>
                          )
                        })}

                        <div className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#39FF14] bg-[#0A0E27] shadow-[0_0_18px_rgba(57,255,20,0.85)]"></div>
                        <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#39FF14]/40 animate-pulse"></div>
                      </div>

                      <div className="mt-3 grid grid-cols-1 gap-2">
                        {hotspotKeywords.map((item) => (
                          <div key={item.keyword} className="flex items-center justify-between rounded-lg border border-[#1E2650] bg-[#0F1635]/70 px-3 py-2">
                            <div>
                              <p className="text-sm font-semibold text-white">{item.keyword}</p>
                              <p className="text-xs text-[#8B92B3]">Radar-detected keyword</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-semibold text-[#39FF14]">{item.growth}</p>
                              <p className="text-xs text-[#8B92B3]">Score {item.score}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points + How It Works Section */}
      <section className="py-20 bg-[#0A0E27]">
        <div className="container mx-auto min-w-[1200px] max-w-7xl px-8">
          {/* Pain Points */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Tired of Missing Profitable Opportunities?
            </h2>
            <p className="text-lg text-[#8B92B3] max-w-3xl mx-auto">
              Traditional keyword research tools are holding you back. Here's why:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <Card className="border-[#1E2650] bg-[#0F1635]/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-4xl mb-3">💸</div>
                <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Too Expensive</h3>
                <p className="text-sm text-[#8B92B3] leading-relaxed">
                  Ahrefs and SEMrush cost $99-999/month. That's $1,188-11,988/year. NichePop starts at just $12.9/month—87% cheaper with the insights you actually need.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#1E2650] bg-[#0F1635]/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-4xl mb-3">⏰</div>
                <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Always Too Late</h3>
                <p className="text-sm text-[#8B92B3] leading-relaxed">
                  By the time keywords show up in traditional tools, the opportunity is already saturated. You need to find trends before they explode, not after.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#1E2650] bg-[#0F1635]/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-4xl mb-3">🤯</div>
                <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Overwhelming Complexity</h3>
                <p className="text-sm text-[#8B92B3] leading-relaxed">
                  Too many features, confusing metrics, and no clear direction. You spend hours analyzing data instead of creating content and making money.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                How NichePop Solves This
              </h2>
              <p className="text-base text-[#8B92B3] leading-relaxed">
                NichePop monitors real conversations happening right now on Reddit, niche forums, and social platforms. Our AI identifies emerging topics and validates them against Google Trends data—giving you a 3-month head start before keywords become competitive.
              </p>
              <p className="text-base text-[#8B92B3] leading-relaxed">
                We analyze 10,000+ Reddit discussions daily, tracking sentiment shifts, engagement patterns, and early search signals. When a niche shows momentum, you'll know immediately—with a clear opportunity score and profit estimate.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#0080FF]/20 flex items-center justify-center">
                    <span className="text-[#0080FF] font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Real-Time Conversation Monitoring</h3>
                    <p className="text-sm text-[#8B92B3]">Track Reddit, forums, and social signals for emerging problems and solutions people are actively discussing</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#0080FF]/20 flex items-center justify-center">
                    <span className="text-[#0080FF] font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">AI Opportunity Validation</h3>
                    <p className="text-sm text-[#8B92B3]">Analyze competition, search trends, and profit potential using machine learning—no guesswork required</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#39FF14]/20 flex items-center justify-center">
                    <span className="text-[#39FF14] font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Actionable Opportunity Scores</h3>
                    <p className="text-sm text-[#8B92B3]">Get ranked opportunities with clear profitability estimates—know exactly which niches to pursue</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Why NichePop Beats Traditional Tools
              </h2>
              <div className="space-y-4">
                <Card className="border-[#1E2650] bg-[#0F1635]/80 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#39FF14] flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-white font-semibold mb-1">3-Month Head Start</h3>
                        <p className="text-sm text-[#8B92B3]">Ahrefs and SEMrush show what's already popular. NichePop identifies opportunities 3 months before they peak—when competition is still low and ranking is easy.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-[#1E2650] bg-[#0F1635]/80 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#39FF14] flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-white font-semibold mb-1">Reddit-Powered Discovery</h3>
                        <p className="text-sm text-[#8B92B3]">Find niches from real conversations where people discuss actual problems—not just search volume estimates that might be inaccurate.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-[#1E2650] bg-[#0F1635]/80 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#39FF14] flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-white font-semibold mb-1">Affordable & Simple</h3>
                        <p className="text-sm text-[#8B92B3]">Starting at $12.9/month—87% cheaper than Ahrefs. No overwhelming dashboards. Just clear, actionable niche opportunities.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="pt-4">
                <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Perfect For:</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-[#8B92B3]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]"></div>
                    Affiliate Marketers
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#8B92B3]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]"></div>
                    Content Creators
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#8B92B3]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]"></div>
                    Niche Site Builders
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#8B92B3]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]"></div>
                    SEO Freelancers
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#8B92B3]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]"></div>
                    E-commerce Owners
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#8B92B3]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]"></div>
                    Solo Entrepreneurs
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
                <Button
                  size="lg"
                  className="bg-[#39FF14] hover:bg-[#39FF14]/90 text-[#0A0E27] font-bold text-lg px-10 py-6 rounded-xl hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  Try Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Login Dialog */}
      <LoginDialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)} />
    </div>
  )
}
