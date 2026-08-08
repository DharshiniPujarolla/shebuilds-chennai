import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [cursorState, setCursorState] = useState<'default' | 'view' | 'explore' | 'button'>('default')
  
  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
  })

  useEffect(() => {
    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Inspect target element for custom cursor triggers
      const target = e.target as HTMLElement | null
      if (!target) return

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor') as 'view' | 'explore' | 'button'
        setCursorState(type || 'button')
      } else if (target.closest('button, a, input, select')) {
        setCursorState('button')
      } else {
        setCursorState('default')
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isTouchDevice])

  if (isTouchDevice) return null

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-colors duration-200"
      animate={{
        x: position.x,
        y: position.y,
        scale: cursorState === 'default' ? 1 : cursorState === 'button' ? 1.5 : 2.2,
      }}
      transition={{ type: 'spring', damping: 28, stiffness: 350, mass: 0.5 }}
    >
      {cursorState === 'default' && (
        <div className="w-4 h-4 rounded-full bg-purple-400/80 border border-purple-300 shadow-[0_0_12px_#a855f7]" />
      )}

      {cursorState === 'button' && (
        <div className="w-6 h-6 rounded-full bg-purple-500/30 border border-purple-400/80 shadow-[0_0_20px_#a855f7] backdrop-blur-sm" />
      )}

      {(cursorState === 'view' || cursorState === 'explore') && (
        <div className="px-3 py-1.5 rounded-full bg-purple-600/90 text-white font-heading font-extrabold text-[9px] tracking-widest uppercase shadow-[0_0_25px_rgba(124,58,237,0.7)] backdrop-blur-md border border-purple-300/40">
          {cursorState === 'view' ? 'VIEW' : 'EXPLORE'}
        </div>
      )}
    </motion.div>
  )
}
