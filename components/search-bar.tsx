"use client"

import { useState } from "react"
import { Search, Filter, ChevronDown, Lock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PricingModal } from "@/components/pricing-modal"
import { cn } from "@/lib/utils"

const timeFilters = [
  { label: "Last 24h", locked: true },
  { label: "Last 7 days", locked: false },
  { label: "Last 30 days", locked: false },
  { label: "Last 90 days", locked: false },
]
const categoryFilters = ["SaaS", "AI", "Fintech", "Health", "E-commerce", "Developer Tools"]

interface SearchBarProps {
  onSearch?: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [selectedTime, setSelectedTime] = useState("Last 7 days")
  const [showPricing, setShowPricing] = useState(false)
  const [query, setQuery] = useState("")

  const handleTimeSelect = (filter: { label: string; locked: boolean }) => {
    if (filter.locked) {
      setShowPricing(true)
    } else {
      setSelectedTime(filter.label)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(query)
    }
  }

  return (
    <>
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for startup opportunities, pain points, or keywords..."
              className="bg-background pl-10 h-12 text-sm font-mono border-border focus-visible:ring-indigo"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-border bg-background hover:bg-secondary">
                  <Filter className="mr-2 h-3 w-3" />
                  {selectedTime}
                  <ChevronDown className="ml-2 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border">
                {timeFilters.map((filter) => (
                  <DropdownMenuItem
                    key={filter.label}
                    className={cn(
                      "hover:bg-secondary flex items-center justify-between",
                      filter.locked && "text-muted-foreground",
                    )}
                    onClick={() => handleTimeSelect(filter)}
                  >
                    <span>{filter.label}</span>
                    {filter.locked && <Lock className="h-3 w-3 ml-2 text-indigo" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex flex-wrap gap-1.5">
              {categoryFilters.slice(0, 3).map((filter) => (
                <Badge
                  key={filter}
                  variant="secondary"
                  className="cursor-pointer bg-secondary text-secondary-foreground hover:bg-indigo hover:text-primary-foreground transition-colors"
                >
                  {filter}
                </Badge>
              ))}
              <Badge
                variant="outline"
                className="cursor-pointer border-border text-muted-foreground hover:border-indigo hover:text-indigo"
              >
                +3 more
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <PricingModal open={showPricing} onOpenChange={setShowPricing} feature="Real-time 24h Data" />
    </>
  )
}
