"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import LoginDialog from "@/components/LoginDialog"
import { UserMenu } from "@/components/user-menu"
import { BrandLogo } from "@/components/brand-logo"
import { LanguageSwitcher } from "@/components/i18n/language-switcher"
import { useLocale, useT } from "@/components/i18n/locale-provider"
import { localizedHref } from "@/lib/i18n"

const primaryButton =
  "inline-flex items-center justify-center rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"

export function Navbar() {
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuth()
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const locale = useLocale()
  const t = useT()

  const home = localizedHref("/", locale)
  const navItems = [
    { label: t.nav.howItWorks, href: `${home}#features` },
    { label: t.nav.newKeywords, href: localizedHref("/new-keywords", locale) },
    { label: t.nav.pricing, href: localizedHref("/pricing", locale) },
    { label: t.nav.blog, href: "/blog" },
  ]

  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href)

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-10">
            <Link href={home} className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">
              <BrandLogo size="sm" />
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground",
                    isActive(item.href) ? "font-medium text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <LanguageSwitcher className="mr-1" />
            {isAuthenticated && user ? (
              <>
                <Link href="/ask" className={cn(primaryButton, "h-9")}>
                  {t.common.openRadar}
                </Link>
                <UserMenu />
              </>
            ) : (
              <>
                <button
                  onClick={() => setLoginDialogOpen(true)}
                  className="h-9 rounded-lg px-3 text-sm font-medium text-body transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
                >
                  {t.common.signIn}
                </button>
                <Link href="/start" className={cn(primaryButton, "h-9")}>
                  {t.common.startFree}
                </Link>
              </>
            )}
          </div>

          <button
            className="rounded-md p-2 text-muted-foreground hover:text-foreground md:hidden cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? t.common.closeMenu : t.common.openMenu}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border bg-background md:hidden">
            <div className="mx-auto max-w-6xl space-y-1 px-4 py-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm text-body hover:bg-muted hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 py-2">
                <LanguageSwitcher />
              </div>
              <div className="mt-2 flex gap-2 border-t border-border pt-3">
                {isAuthenticated && user ? (
                  <Link href="/ask" className={cn(primaryButton, "h-10 flex-1")} onClick={() => setMobileMenuOpen(false)}>
                    {t.common.openRadar}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setLoginDialogOpen(true)
                        setMobileMenuOpen(false)
                      }}
                      className="h-10 flex-1 rounded-lg border border-border text-sm font-medium text-foreground cursor-pointer"
                    >
                      {t.common.signIn}
                    </button>
                    <Link href="/start" className={cn(primaryButton, "h-10 flex-1")} onClick={() => setMobileMenuOpen(false)}>
                      {t.common.startFree}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <LoginDialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)} />
    </>
  )
}
