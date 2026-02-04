'use client'

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock } from "lucide-react"

interface RelatedArticle {
  title: string
  href: string
  category: string
  readTime: string
  description: string
}

interface RelatedArticlesProps {
  articles: RelatedArticle[]
  title?: string
}

export function RelatedArticles({ articles, title = "Related Articles" }: RelatedArticlesProps) {
  if (articles.length === 0) return null

  return (
    <div className="my-16">
      <h2 className="text-2xl font-bold tracking-tight mb-8">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link key={article.href} href={article.href}>
            <Card className="h-full border-border/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {article.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>
                <CardTitle className="text-lg hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed line-clamp-2">
                  {article.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400">
                  Read more
                  <ArrowRight className="h-3 w-3" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
