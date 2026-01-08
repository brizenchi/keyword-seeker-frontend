"use client"

import { Lightbulb, AlertCircle, ExternalLink, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Opportunity {
  id: number
  title: string
  description: string
  type: "opportunity" | "pain-point"
  source: string
  votes: number
  time: string
}

const opportunities: Opportunity[] = [
  {
    id: 1,
    title: "Need a tool to manage MCP server configs",
    description: "Developers struggling to manage multiple MCP server configurations across projects",
    type: "pain-point",
    source: "r/LocalLLaMA",
    votes: 847,
    time: "2h ago",
  },
  {
    id: 2,
    title: "AI-powered code review for small teams",
    description: "Small startups need affordable AI code review that integrates with GitHub",
    type: "opportunity",
    source: "r/startups",
    votes: 523,
    time: "4h ago",
  },
  {
    id: 3,
    title: "RAG debugging is a nightmare",
    description: "No good tools to debug and visualize RAG pipeline failures and hallucinations",
    type: "pain-point",
    source: "HackerNews",
    votes: 312,
    time: "6h ago",
  },
  {
    id: 4,
    title: "Voice AI for customer support",
    description: "Growing demand for voice-based AI agents that can handle complex support tickets",
    type: "opportunity",
    source: "r/SaaS",
    votes: 189,
    time: "8h ago",
  },
]

const NEGATIVE_KEYWORDS = ["struggling", "hate", "nightmare", "slow", "failures", "hallucinations", "bad", "terrible"]

function highlightSentiment(text: string) {
  const words = text.split(" ")
  return words.map((word, index) => {
    // Clean punctuation for matching
    const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, "")
    const isNegative = NEGATIVE_KEYWORDS.some(keyword => cleanWord.includes(keyword))
    
    if (isNegative) {
      return (
        <span key={index} className="bg-red-500/20 text-red-200 px-0.5 rounded mx-0.5">
          {word}
        </span>
      )
    }
    return <span key={index}>{word} </span>
  })
}

export function OpportunityFeed() {
  return (
    <Card className="border-border bg-card h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">Live Feed</CardTitle>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            View all
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="group rounded-lg border border-border bg-background p-3 transition-all hover:border-indigo/30"
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "mt-0.5 rounded-md p-1.5",
                  opp.type === "opportunity" ? "bg-indigo/10 text-indigo" : "bg-rose/10 text-rose",
                )}
              >
                {opp.type === "opportunity" ? (
                  <Lightbulb className="h-3.5 w-3.5" />
                ) : (
                  <AlertCircle className="h-3.5 w-3.5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-medium text-foreground leading-tight">
                    {highlightSentiment(opp.title)}
                  </h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {highlightSentiment(opp.description)}
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <Badge variant="outline" className="border-border text-muted-foreground text-[10px] px-1.5 py-0">
                    {opp.source}
                  </Badge>
                  <span className="font-mono text-emerald-400">▲ {opp.votes}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground font-mono">{opp.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
