"use client"

import Link from "next/link"
import { Flame, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[#1E2650] bg-[#0A0E27]/95 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <Link href="/" className="flex items-center gap-2 group mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0080FF] to-[#67f745] group-hover:shadow-[0_0_20px_rgba(103,247,69,0.4)] transition-all duration-200">
                  <Flame className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-black bg-gradient-to-r from-[#0080FF] to-[#67f745] bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  NichePop
                </span>
              </Link>
              <p className="text-sm text-[#8B92B3] leading-relaxed mb-6 max-w-sm">
                Discover trending keyword opportunities with real-time data. AI-powered niche analysis, competition insights, and profit estimation for marketers and entrepreneurs.
              </p>
              {/* Social Links */}
              <div className="flex items-center gap-3">
                
                <a
                  href="mailto:support@nichepop.app"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F1629] border border-[#1E2650] text-[#8B92B3] hover:text-[#67f745] hover:border-[#67f745]/50 transition-all duration-200"
                  aria-label="Email us"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-sm text-[#8B92B3] hover:text-[#67f745] transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-sm text-[#8B92B3] hover:text-[#67f745] transition-colors duration-200">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-[#8B92B3] hover:text-[#67f745] transition-colors duration-200">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/#features" className="text-sm text-[#8B92B3] hover:text-[#67f745] transition-colors duration-200">
                    Features
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Resources</h3>
              <ul className="space-y-3">
               
                <li>
                  <Link href="/blog/how-to-find-low-competition-keywords" className="text-sm text-[#8B92B3] hover:text-[#67f745] transition-colors duration-200">
                    Find Low Competition Keywords
                  </Link>
                </li>
                <li>
                  <Link href="/blog/estimate-keyword-profitability" className="text-sm text-[#8B92B3] hover:text-[#67f745] transition-colors duration-200">
                    Estimate Keyword Profitability
                  </Link>
                </li>
                <li>
                  <Link href="/blog/keyword-opportunity-score-explained" className="text-sm text-[#8B92B3] hover:text-[#67f745] transition-colors duration-200">
                    Opportunity Score Guide
                  </Link>
                </li>
                <li>
                  <Link href="/blog/nichepop-vs-ahrefs-comparison" className="text-sm text-[#8B92B3] hover:text-[#67f745] transition-colors duration-200">
                    NichePop vs Ahrefs
                  </Link>
                </li>
              </ul>
            </div>

            

            {/* Use Cases Links */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Use Cases</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/use-cases/bloggers" className="text-sm text-[#8B92B3] hover:text-[#67f745] transition-colors duration-200">
                    For Bloggers
                  </Link>
                </li>
                <li>
                  <Link href="/use-cases/content-creators" className="text-sm text-[#8B92B3] hover:text-[#67f745] transition-colors duration-200">
                    Content Creators
                  </Link>
                </li>
                <li>
                  <Link href="/use-cases/ecommerce" className="text-sm text-[#8B92B3] hover:text-[#67f745] transition-colors duration-200">
                    E-commerce
                  </Link>
                </li>
                <li>
                  <Link href="/use-cases/affiliate-marketing" className="text-sm text-[#8B92B3] hover:text-[#67f745] transition-colors duration-200">
                    Affiliate Marketing
                  </Link>
                </li>
              </ul>
            </div>
{/* Company Links */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:support@nichepop.app" className="text-sm text-[#8B92B3] hover:text-[#67f745] transition-colors duration-200">
                    Contact Us
                  </a>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-[#8B92B3] hover:text-[#67f745] transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-[#8B92B3] hover:text-[#67f745] transition-colors duration-200">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1E2650] py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#8B92B3] text-center sm:text-left">
              © {currentYear} NichePop. All rights reserved.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  )
}
