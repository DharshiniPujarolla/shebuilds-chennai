import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SparkleParticle {
  id: number
  x: number
  y: number
  size: number
  color: string
  opacity: number
  vx: number
  vy: number
  rotation: number
  shape: 'star' | 'circle'
}

const PARTICLE_COLORS = [
  '#ffffff', // Pure white
  '#e9d5ff', // Purple 200
  '#d8b4fe', // Purple 300
  '#c084fc', // Purple 400
  '#a855f7', // Theme primary purple
]

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [cursorState, setCursorState] = useState<'default' | 'view' | 'explore' | 'button'>('default')
  const [particles, setParticles] = useState<SparkleParticle[]>([])
  
  const lastPosRef = useRef({ x: -100, y: -100 })
  const particleIdRef = useRef(0)
  const animFrameRef = useRef<number | null>(null)

  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
  })

  // Spawn sparkle trail particles based on mouse movement
  const spawnSparkles = useCallback((x: number, y: number, count = 1) => {
    const newParticles: SparkleParticle[] = []
    
    for (let i = 0; i < count; i++) {
      particleIdRef.current += 1
      const angle = Math.random() * Math.PI * 2
      const speed = 0.5 + Math.random() * 1.8
      
      newParticles.push({
        id: particleIdRef.current,
        x: x + (Math.random() * 8 - 4),
        y: y + (Math.random() * 8 - 4),
        size: Math.random() * 6 + 4,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        opacity: 1,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.3, // slight upward float
        rotation: Math.random() * 360,
        shape: Math.random() > 0.4 ? 'star' : 'circle',
      })
    }

    setParticles((prev) => [...prev.slice(-25), ...newParticles])
  }, [])

  // Particle animation loop
  useEffect(() => {
    if (isTouchDevice) return

    const updateParticles = () => {
      setParticles((prevParticles) => {
        if (prevParticles.length === 0) return prevParticles

        return prevParticles
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy + 0.1, // gentle gravity
            opacity: p.opacity - 0.035, // smooth fade out
            size: Math.max(0, p.size - 0.12),
            rotation: p.rotation + 4,
          }))
          .filter((p) => p.opacity > 0 && p.size > 0)
      })

      animFrameRef.current = requestAnimationFrame(updateParticles)
    }

    animFrameRef.current = requestAnimationFrame(updateParticles)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isTouchDevice])

  useEffect(() => {
    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX
      const currentY = e.clientY

      setPosition({ x: currentX, y: currentY })

      // Calculate distance moved to spawn trail particles
      const dx = currentX - lastPosRef.current.x
      const dy = currentY - lastPosRef.current.y
      const distSq = dx * dx + dy * dy

      if (distSq > 16) { // moved > 4px
        // Spawn 1-2 trail particles at wand tip (aligned with mouse position)
        spawnSparkles(currentX, currentY, Math.random() > 0.5 ? 2 : 1)
        lastPosRef.current = { x: currentX, y: currentY }
      }

      // Inspect target element for custom cursor triggers
      const target = e.target as HTMLElement | null
      if (!target) return

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor') as 'view' | 'explore' | 'button'
        setCursorState(type || 'button')
      } else if (target.closest('button, a, input, select, textarea, [role="button"]')) {
        setCursorState('button')
      } else {
        setCursorState('default')
      }
    }

    const handleMouseDown = () => {
      // Extra magical burst on click
      if (lastPosRef.current.x > 0) {
        spawnSparkles(lastPosRef.current.x, lastPosRef.current.y, 6)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [isTouchDevice, spawnSparkles])

  if (isTouchDevice) return null

  return (
    <>
      {/* Sparkle Trail Particles */}
      <div className="fixed top-0 left-0 z-40 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              opacity: p.opacity,
              transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
            }}
          >
            {p.shape === 'star' ? (
              <svg
                width={p.size * 2}
                height={p.size * 2}
                viewBox="0 0 24 24"
                fill={p.color}
                className="drop-shadow-[0_0_6px_rgba(168,85,247,0.9)]"
              >
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
              </svg>
            ) : (
              <div
                className="rounded-full shadow-[0_0_8px_#a855f7]"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Main Magic Wand Cursor Container */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none flex items-start justify-start transition-colors duration-200"
        style={{
          left: 0,
          top: 0,
        }}
        animate={{
          x: position.x - 7, // Hotspot offset so wand star tip lands precisely on mouse target
          y: position.y - 7,
          scale: cursorState === 'button' ? 1.25 : 1,
          rotate: cursorState === 'button' ? [-45, -35, -50, -45] : -45,
        }}
        transition={{
          x: { type: 'spring', damping: 28, stiffness: 400, mass: 0.4 },
          y: { type: 'spring', damping: 28, stiffness: 400, mass: 0.4 },
          scale: { type: 'spring', damping: 20, stiffness: 300 },
          rotate: cursorState === 'button' 
            ? { repeat: Infinity, duration: 1.8, ease: 'easeInOut' }
            : { type: 'spring', damping: 22, stiffness: 300 },
        }}
      >
        {/* Magic Wand SVG */}
        <div className="relative group">
          {/* Wand Aura & Glow */}
          <div 
            className={`absolute -inset-1 rounded-full blur-md transition-opacity duration-300 ${
              cursorState === 'button' 
                ? 'bg-purple-500/60 opacity-100 scale-125' 
                : 'bg-purple-400/30 opacity-60'
            }`} 
          />

          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 drop-shadow-[0_0_12px_rgba(168,85,247,0.85)]"
          >
            <defs>
              {/* Sleek Purple-to-Light Metallic Wand Shaft */}
              <linearGradient id="wandShaftGrad" x1="30" y1="30" x2="8" y2="8" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#581c87" />
                <stop offset="40%" stopColor="#7c3aed" />
                <stop offset="75%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>

              {/* Sparkle Glow Filter */}
              <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Wand Shaft Line */}
            <line
              x1="30"
              y1="30"
              x2="9"
              y2="9"
              stroke="url(#wandShaftGrad)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Silver handle end cap */}
            <circle cx="30" cy="30" r="2" fill="#c084fc" />

            {/* Magic Tip Gem/Orb */}
            <circle cx="9" cy="9" r="2.2" fill="#ffffff" className="animate-pulse" />

            {/* Primary Magic Star Sparkle at Wand Tip */}
            <path
              d="M7 0L8.8 5.2L14 7L8.8 8.8L7 14L5.2 8.8L0 7L5.2 5.2Z"
              fill="#ffffff"
              filter="url(#starGlow)"
            />
            <path
              d="M7 2.2L8.2 5.8L11.8 7L8.2 8.2L7 11.8L5.8 8.2L2.2 7L5.8 5.8Z"
              fill="#f3e8ff"
            />

            {/* Secondary Accent Sparkles */}
            <path
              d="M17 3L17.8 5.2L20 6L17.8 6.8L17 9L16.2 6.8L14 6L16.2 5.2Z"
              fill="#a855f7"
              opacity="0.95"
            />
            <path
              d="M3 16L3.6 17.4L5 18L3.6 18.6L3 20L2.4 18.6L1 18L2.4 17.4Z"
              fill="#d8b4fe"
              opacity="0.85"
            />
          </svg>

          {/* Interactive State Text Badges (VIEW / EXPLORE) */}
          <AnimatePresence>
            {(cursorState === 'view' || cursorState === 'explore') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 20 }}
                exit={{ opacity: 0, scale: 0.8, x: 10 }}
                className="absolute top-0 left-full ml-1 px-3 py-1 rounded-full bg-purple-950/90 text-purple-200 font-heading font-extrabold text-[10px] tracking-widest uppercase shadow-[0_0_20px_rgba(168,85,247,0.6)] backdrop-blur-md border border-purple-400/40 whitespace-nowrap pointer-events-none"
              >
                {cursorState === 'view' ? '✨ VIEW' : '🔮 EXPLORE'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  )
}
