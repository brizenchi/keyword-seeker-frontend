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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-card text-pink-400 border-border px-4 py-1.5 backdrop-blur-sm">
              For Content Creators
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
              Find Viral Topics & Grow Your Audience
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
              Discover trending topics for YouTube, TikTok, and other platforms. Create content your audience actually wants.
            </p>
            <Link href="/pricing">
              <Button size="lg" className="bg-primary hover:bg-primary text-primary-foreground font-bold text-base px-8 py-5 rounded-xl hover:-translate-y-0.5 transition-all duration-200">
                Start Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <Card className="p-8 border-border bg-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-foreground font-bold">
                <Youtube className="h-6 w-6 text-primary" />
                Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
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
