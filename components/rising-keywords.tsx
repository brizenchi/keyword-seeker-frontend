"use client"

import { useState, useEffect, useRef } from "react"
import { Sparkles, Unlock, ChevronLeft, ChevronRight } from "lucide-react"
import { UnlockKeywordDialog } from "@/components/unlock-keyword-dialog"
import { KeywordCard } from "@/components/keyword-card"
import { PricingModal } from "@/components/pricing-modal"
import { KeywordDetailDialog } from "@/components/keyword-detail-dialog"
import LoginDialog from "@/components/LoginDialog"
import { Button } from "@/components/ui/button"
import { keywordDetails, KeywordDetail } from "@/lib/data"
import { keywordService } from "@/lib/api"
import type { Keyword } from "@/lib/types"
import { useAuth } from "@/hooks/useAuth"

interface RisingKeywordsProps {
  showResults?: boolean
}

// Helper to generate trend data from backend keyword
const generateTrendDataFromKeyword = (kw: Keyword) => {
  // Generate simple upward trend based on growth_rate
  const data = []
  const growth = (kw.growth_rate ?? 0) * 10
  let currentValue = 20
  for (let i = 1; i <= 30; i++) {
    const change = (Math.random() - 0.2) * (growth / 50)
    currentValue = Math.max(10, currentValue + change)
    data.push({ day: `${i}`, value: Math.round(currentValue) })
  }
  return data
}

// 模块级缓存 - 按页缓存
const pageCache = new Map<number, { data: Keyword[], timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存
const PAGE_SIZE = 8

export function RisingKeywords({ showResults = false }: RisingKeywordsProps) {
  const { isAuthenticated, user, refresh } = useAuth()
  const [showPricing, setShowPricing] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [shouldShowPricingAfterLogin, setShouldShowPricingAfterLogin] = useState(false)
  const [selectedKeywordId, setSelectedKeywordId] = useState<number | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [backendKeywords, setBackendKeywords] = useState<Keyword[]>([])
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [showUnlockDialog, setShowUnlockDialog] = useState(false)
  const [keywordToUnlock, setKeywordToUnlock] = useState<Keyword | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  // Fetch keywords from API - 使用缓存策略
  useEffect(() => {
    let ignore = false

    async function fetchKeywords(page: number) {
      // 检查缓存是否有效
      const now = Date.now()
      const cached = pageCache.get(page)
      if (cached && (now - cached.timestamp < CACHE_DURATION)) {
        console.log(`✅ Using cached data for page ${page}`)
        setBackendKeywords(cached.data)
        setLoading(false)
        return
      }

      setLoading(true)

      try {
        const offset = (page - 1) * PAGE_SIZE
        const response = await keywordService.getList({
          limit: PAGE_SIZE,
          offset: offset,
        })

        if (ignore) return

        // 更新缓存
        if (response && response.items && response.items.length > 0) {
          pageCache.set(page, {
            data: response.items,
            timestamp: Date.now()
          })
          setBackendKeywords(response.items)
          setTotal(response.total)
          setTotalPages(response.total_pages)
          setLastUpdated(new Date())
        }
      } catch (error) {
        if (!ignore) {
          console.error('Failed to fetch keywords:', error)
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    fetchKeywords(currentPage)

    return () => {
      ignore = true
    }
  }, [currentPage])

  const handleKeywordClick = (keyword: Keyword) => {
    // Check if keyword is locked based on backend data
    if (keyword.is_locked) {
      setKeywordToUnlock(keyword)
      setShowUnlockDialog(true)
      return
    }

    // Open detail dialog for unlocked keywords
    setSelectedKeywordId(keyword.id)
    setShowDetail(true)
  }

  const handleUnlockKeyword = async () => {
    if (!keywordToUnlock) return

    try {
      // Call unlock API - backend will deduct 1 credit and record unlock
      const response = await keywordService.unlock(keywordToUnlock.id)

      // Refresh user data to update credits
      await refresh()

      // Update the keyword in the list with the unlocked data
      setBackendKeywords(prev => prev.map(kw =>
        kw.id === keywordToUnlock.id
          ? {
              ...kw,
              keyword: response.keyword.keyword, // Update with real keyword name
              is_locked: false,
              growth_rate: response.keyword.growth_rate,
              competition_score: response.keyword.competition_score,
              profit_estimation: response.keyword.profit_estimation,
            }
          : kw
      ))

      // Clear cache to force refresh on next load
      pageCache.clear()

      // Close unlock dialog
      setShowUnlockDialog(false)
      setKeywordToUnlock(null)

      // Note: User needs to click again to view details
      // This allows them to see the unlock was successful first
    } catch (error) {
      console.error('Failed to unlock keyword:', error)
      throw error
    }
  }

  const handleLoginClose = () => {
    setShowLogin(false)
  }

  // Watch for authentication changes and show pricing modal after login
  useEffect(() => {
    if (isAuthenticated && shouldShowPricingAfterLogin) {
      setShouldShowPricingAfterLogin(false)
      setShowLogin(false)
      setShowPricing(true)
    }
  }, [isAuthenticated, shouldShowPricingAfterLogin])

  // Format last updated time
  const formatLastUpdated = (date: Date) => {
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60) // minutes
    if (diff < 1) return 'just now'
    if (diff < 60) return `${diff} min ago`
    return `${Math.floor(diff / 60)} hr ago`
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {showResults ? "Search Results" : "Rising Keywords"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {showResults ? "Opportunities found matching your criteria" : "Emerging tech terms gaining traction"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {loading && (
              <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            )}
            <span className="font-mono text-xs text-muted-foreground">
              Updated {formatLastUpdated(lastUpdated)}
            </span>
          </div>
        </div>

        <div className="relative">
          {loading && backendKeywords.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-4 w-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                <span className="text-sm">Loading keywords...</span>
              </div>
            </div>
          ) : backendKeywords.length > 0 ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {backendKeywords.map((kw, index) => {
                  const detail = keywordDetails[kw.keyword]
                  const trendData = detail
                    ? detail.trendData.map(d => d.value)
                    : generateTrendDataFromKeyword(kw).map(d => d.value)

                  // Logic for blur overlay:
                  // Use backend's is_locked field to determine if keyword should be blurred
                  const shouldBlur = kw.is_locked === true
                  const isUnauthenticatedLock = !isAuthenticated && shouldBlur

                  return (
                    <div key={`${kw.keyword}-${index}`} className="relative">
                      <KeywordCard
                        keyword={kw}
                        trendData={trendData}
                        onClick={() => handleKeywordClick(kw)}
                      />

                      {shouldBlur && (
                        <div className="absolute inset-0 backdrop-blur-[6px] bg-[#0A0E27]/60 rounded-xl z-10 flex flex-col items-center justify-center p-4 gap-3">
                          {kw.highlight && (
                            <div className="bg-[#0F1629] p-3 rounded-lg shadow-lg border-2 border-[#67f745] max-w-[180px]">
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <Sparkles className="h-4 w-4 text-[#67f745]" />
                                <span className="text-xs font-bold text-[#67f745]">Premium</span>
                              </div>
                              <p className="text-xs font-medium text-white">
                                {kw.highlight.highlight_text}
                              </p>
                            </div>
                          )}
                          <Button
                            size="sm"
                            className="bg-[#67f745] hover:bg-[#67f745]/90 text-[#0A0E27] font-semibold shadow-[0_0_20px_rgba(103,247,69,0.4)] cursor-pointer h-8 text-xs px-3"
                            onClick={(e) => {
                              e.stopPropagation()
                              if (isUnauthenticatedLock) {
                                // If user is not authenticated, show login dialog directly
                                setShowLogin(true)
                              } else {
                                // If user is authenticated, show unlock dialog
                                setKeywordToUnlock(kw)
                                setShowUnlockDialog(true)
                              }
                            }}
                          >
                            <Unlock className="h-3 w-3 mr-1.5" />
                            {isUnauthenticatedLock ? 'Sign in' : 'Unlock'}
                          </Button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1 || loading}
                    className="border-[#1E2650] bg-[#0F1635] text-white hover:bg-[#0080FF]/20 hover:border-[#0080FF] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center gap-1">
                    {(() => {
                      const pages: (number | string)[] = []
                      const showEllipsis = totalPages > 7
                      
                      if (!showEllipsis) {
                        // Show all pages if total <= 7
                        for (let i = 1; i <= totalPages; i++) {
                          pages.push(i)
                        }
                      } else {
                        // Always show first page
                        pages.push(1)
                        
                        if (currentPage <= 3) {
                          // Near start: 1 2 3 4 5 ... 50
                          pages.push(2, 3, 4, 5, '...', totalPages)
                        } else if (currentPage >= totalPages - 2) {
                          // Near end: 1 ... 46 47 48 49 50
                          pages.push('...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
                        } else {
                          // Middle: 1 ... 23 24 25 ... 50
                          pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
                        }
                      }
                      
                      return pages.map((page, idx) => {
                        if (page === '...') {
                          return (
                            <span key={`ellipsis-${idx}`} className="px-2 text-[#8B92B3]">
                              ...
                            </span>
                          )
                        }
                        
                        return (
                          <Button
                            key={page}
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(page as number)}
                            disabled={loading}
                            className={`min-w-[32px] border-[#1E2650] cursor-pointer ${
                              currentPage === page
                                ? 'bg-[#0080FF] text-white border-[#0080FF]'
                                : 'bg-[#0F1635] text-[#8B92B3] hover:bg-[#0080FF]/20 hover:border-[#0080FF] hover:text-white'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            {page}
                          </Button>
                        )
                      })
                    })()}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages || loading}
                    className="border-[#1E2650] bg-[#0F1635] text-white hover:bg-[#0080FF]/20 hover:border-[#0080FF] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center py-12">
              <div className="text-center text-muted-foreground">
                <span className="text-sm">No keywords found. Please check your API connection.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <LoginDialog open={showLogin} onClose={handleLoginClose} />
      <PricingModal open={showPricing} onOpenChange={setShowPricing} feature="Full Keyword Insights" />
      <KeywordDetailDialog
        keywordId={selectedKeywordId}
        open={showDetail}
        onOpenChange={setShowDetail}
      />
      <UnlockKeywordDialog
        open={showUnlockDialog}
        onOpenChange={setShowUnlockDialog}
        keywordName={keywordToUnlock?.keyword || ''}
        userCredits={user?.credits || 0}
        onConfirm={handleUnlockKeyword}
        isUnauthenticated={!isAuthenticated}
        onLoginRequired={() => setShowLogin(true)}
      />
    </>
  )
}
