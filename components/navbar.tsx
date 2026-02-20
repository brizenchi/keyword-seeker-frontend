"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import LoginDialog from "@/components/LoginDialog"
import { UserMenu } from "@/components/user-menu"
import { BrandLogo } from "@/components/brand-logo"

const navItems = [
  { label: "Features", href: "/#features" },
  { label: "Blog", href: "/blog" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Pricing", href: "/pricing" },
]

export function Navbar() {
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuth()
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1E2650] bg-[#0A0E27]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0A0E27]/60">
        <div className="container mx-auto min-w-[1200px] max-w-7xl px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <BrandLogo
                size="md"
                markClassName="transition-all duration-200 group-hover:drop-shadow-[0_0_12px_rgba(0,128,255,0.55)]"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-[#8B92B3] hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated && user ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" size="sm" className="cursor-pointer text-[#8B92B3] hover:text-white">
                      Dashboard
                    </Button>
                  </Link>
                  <UserMenu  />
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLoginDialogOpen(true)}
                    className="cursor-pointer text-[#67f745] hover:text-[#67f745]/80"
                  >
                    Sign in
                  </Button>
                  <Link href="/dashboard">
                    <Button
                      size="sm"
                      className="bg-[#67f745] hover:bg-[#67f745]/90 text-[#0A0E27] font-semibold cursor-pointer rounded-xl hover:shadow-[0_0_20px_rgba(103,247,69,0.4)] transition-all duration-200"
                    >
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-[#8B92B3] hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#1E2650] bg-[#0A0E27]">
            <div className="container mx-auto min-w-[1200px] max-w-7xl px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-2 text-sm font-medium text-[#8B92B3] hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-[#1E2650] space-y-2">
                {isAuthenticated && user ? (
                  <>
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer text-[#8B92B3] hover:text-white">
                        Dashboard
                      </Button>
                    </Link>
                    <div className="px-2">
                      <UserMenu  />
                    </div>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full cursor-pointer text-[#67f745] hover:text-[#67f745]/80"
                      onClick={() => {
                        setLoginDialogOpen(true)
                        setMobileMenuOpen(false)
                      }}
                    >
                      Sign in
                    </Button>
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        size="sm"
                        className="w-full bg-[#67f745] hover:bg-[#67f745]/90 text-[#0A0E27] font-semibold cursor-pointer rounded-xl"
                      >
                        Get Started
                      </Button>
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
