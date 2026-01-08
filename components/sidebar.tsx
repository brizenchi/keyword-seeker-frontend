"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { TrendingUp, Search, Bookmark, Settings, Flame, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const navItems = [
  { icon: TrendingUp, label: "Trends", href: "/" },
  { icon: Search, label: "Reddit Search", href: "/reddit" },
  { icon: Bookmark, label: "Saved Ideas", href: "/saved" },
  { icon: CreditCard, label: "Pricing", href: "/pricing" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <TooltipProvider>
      <aside className="fixed left-0 top-0 z-40 h-screen w-16 border-r border-border bg-sidebar flex flex-col items-center py-6 gap-2">
        <Link
          href="/"
          className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo text-primary-foreground"
        >
          <Flame className="h-5 w-5" />
        </Link>

        <nav className="flex flex-col items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Tooltip key={item.label} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-sidebar-accent text-indigo"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-card border-border">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </nav>
      </aside>
    </TooltipProvider>
  )
}
