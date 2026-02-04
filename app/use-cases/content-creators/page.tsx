'use client'

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Youtube } from "lucide-react"

export default function ContentCreatorsUseCasePage() {
  return (
    <div className="min-h-screen bg-[#0A0E27]">
      <Navbar />
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-[#0F1635] text-pink-400 border-[#1E2650] px-4 py-1.5 backdrop-blur-sm">
              For Content Creators
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Find Viral Topics & Grow Your Audience
            </h1>
            <p className="text-lg text-[#8B92B3] max-w-2xl mx-auto font-light">
              Discover trending topics for YouTube, TikTok, and other platforms. Create content your audience actually wants.
            </p>
            <Link href="/pricing">
              <Button size="lg" className="bg-[#39FF14] hover:bg-[#39FF14] text-[#0A0E27] font-bold text-base px-8 py-5 rounded-xl hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] hover:-translate-y-0.5 transition-all duration-200">
                Start Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <Card className="p-8 border-[#1E2650] bg-[#0F1635]/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                <Youtube className="h-6 w-6 text-[#0080FF]" />
                Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#8B92B3]">
                This use case page is currently being developed. Check back soon for comprehensive guides on using NichePop for content creation and audience growth.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
