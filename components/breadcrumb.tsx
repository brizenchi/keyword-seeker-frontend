'use client'

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { BreadcrumbSchema } from "@/components/seo/structured-data"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  // Prepare items for Schema
  const schemaItems = [
    { name: "Home", url: "/" },
    ...items.map(item => ({ name: item.label, url: item.href }))
  ]

  return (
    <>
      <BreadcrumbSchema items={schemaItems} />
      <nav aria-label="Breadcrumb" className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)}>
        <Link
          href="/"
          className="hover:text-foreground transition-colors"
        >
          Home
        </Link>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <div key={item.href} className="flex items-center space-x-1">
              <ChevronRight className="h-4 w-4" />
              {isLast ? (
                <span className="font-medium text-foreground">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          )
        })}
      </nav>
    </>
  )
}
