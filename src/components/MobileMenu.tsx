import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavItem } from '../types'

import { ArrowRight, X } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: NavItem[]
}

export function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden"
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            className="fixed top-0 left-0 right-0 z-50 bg-[#0c0c14]/95 border-b border-white/10 p-6 shadow-2xl lg:hidden backdrop-blur-xl"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                  SheBuilds
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
                    Chennai
                  </span>
                </span>
              </div>

              <button
                onClick={onClose}
                type="button"
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation List */}
            <nav className="py-6 flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                  className="font-heading text-lg font-semibold text-neutral-200 hover:text-purple-300 py-2.5 px-3 rounded-xl hover:bg-purple-500/10 transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-purple-400 opacity-60">0{index + 1}</span>
                </motion.a>
              ))}
            </nav>

            {/* Mobile CTA Button */}
            <div className="pt-4 border-t border-white/10">
              <a
                href="#join"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-heading font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-purple-500 to-violet-600 shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:shadow-[0_0_35px_rgba(124,58,237,0.6)] transition-all active:scale-[0.98]"
              >
                <span>Join Community</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
