import { useState, useEffect, useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import type { StatItem } from '../types'

interface AnimatedCounterProps {
  stat: StatItem
}

export function AnimatedCounter({ stat }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()
  
  const [currentValue, setCurrentValue] = useState(() => 
    prefersReducedMotion ? stat.targetNumber : 0
  )

  useEffect(() => {
    if (prefersReducedMotion || !isInView) return

    let animationFrameId: number
    let startTime: number | null = null
    const duration = 2000 // 2 seconds duration

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Ease Out Quad interpolation: 1 - (1 - t)^2
      const easedProgress = 1 - Math.pow(1 - progress, 2)
      const val = Math.floor(easedProgress * stat.targetNumber)

      setCurrentValue(val)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        setCurrentValue(stat.targetNumber)
      }
    }

    animationFrameId = requestAnimationFrame(step)

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [isInView, stat.targetNumber, prefersReducedMotion])

  // Format count output cleanly (e.g. 12000 -> 12)
  const formatDisplayValue = (num: number) => {
    if (stat.suffix.includes('K')) {
      return Math.floor(num / 1000)
    }
    return num.toLocaleString()
  }

  return (
    <div ref={ref} className="flex flex-col text-left space-y-1">
      <div className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight flex items-baseline gap-0.5">
        {stat.prefix && <span className="text-purple-400">{stat.prefix}</span>}
        <span className="bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
          {formatDisplayValue(currentValue)}
        </span>
        <span className="text-purple-400 text-2xl sm:text-3xl lg:text-4xl">{stat.suffix}</span>
      </div>

      <div className="font-heading font-bold text-sm text-neutral-200 tracking-wide">
        {stat.label}
      </div>

      {stat.description && (
        <p className="font-sans text-xs text-neutral-400 leading-snug">
          {stat.description}
        </p>
      )}
    </div>
  )
}
