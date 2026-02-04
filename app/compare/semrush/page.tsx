'use client'

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CompareSemrushPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <Breadcrumb
            items={[
              { label: "Compare", href: "/compare" },
              { label: "vs SEMrush", href: "/compare/semrush" },
            ]}
            className="mb-8"
          />
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-4 py-1.5">
              Tool Comparison
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              NichePop vs SEMrush
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Detailed comparison coming soon. Compare features, pricing, and value.
            </p>
            <Link href="/pricing">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
                Try NichePop Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <Card className="p-8">
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This detailed comparison page is currently being developed. Check back soon for a comprehensive analysis of NichePop vs SEMrush.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
