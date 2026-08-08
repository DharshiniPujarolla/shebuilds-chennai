import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { NavItem } from '../types'

import { MobileMenu } from './MobileMenu'
import { ArrowRight, Menu } from 'lucide-react'

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Community', href: '#community' },
  { label: 'Opportunities', href: '#opportunities' }
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Listen to window scroll to toggle dark translucent background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#09090d]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <a 
            href="#home" 
            className="group inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg p-1"
            aria-label="SheBuilds Chennai Home"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-white group-hover:text-purple-200 transition-colors">
                  SheBuilds
                </span>
                <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
              </div>
              <span className="font-heading text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-purple-300 uppercase -mt-1">
                Chennai
              </span>
            </div>
          </a>

          {/* Desktop Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-sans text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 px-3.5 py-1.5 rounded-full transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="#join"
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full font-heading font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-purple-500 to-violet-600 shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_30px_rgba(124,58,237,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-purple-400/30"
            >
              <span>Join Community</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              type="button"
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
      />
    </>
  )
}
