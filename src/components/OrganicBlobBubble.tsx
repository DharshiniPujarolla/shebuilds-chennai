import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { CommunityImageItem } from '../types'

interface OrganicBlobBubbleProps {
  image: CommunityImageItem
  clipId: string
  pathData: string
  sizeClass: string
  isCentral?: boolean
  labelTag?: string
  floatDelay?: number
  floatDuration?: number
  onHover?: (hovered: boolean) => void
}

export function OrganicBlobBubble({
  image,
  sizeClass,
  isCentral = false,
  labelTag,
  floatDelay = 0,
  floatDuration = 8,
  onHover,
}: OrganicBlobBubbleProps) {
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const handleMouseEnter = () => {
    setIsHovered(true)
    onHover?.(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onHover?.(false)
  }

  const floatAnimation = prefersReducedMotion
    ? {}
    : {
      y: [0, -7, 2, -5, 0],
      x: [0, 5, -3, 4, 0],
      rotate: [0, 1.5, -1, 1, 0],
    }

  return (
    <motion.div
      data-cursor="view"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 140,
        damping: 18,
        delay: floatDelay * 0.15,
      }}
      className="relative flex items-center justify-center select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={floatAnimation}
        transition={{
          duration: floatDuration,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'mirror',
          delay: floatDelay,
        }}
        whileHover={{ scale: 1.08 }}
        className={`relative ${sizeClass} cursor-pointer group`}
      >
        {/* Soft Ambient Radial Purple Glow Behind Card */}
        <div
          className={`absolute inset-0 rounded-2xl blur-[24px] transition-opacity duration-300 pointer-events-none ${isCentral
            ? 'bg-gradient-to-r from-purple-600/40 via-violet-500/50 to-fuchsia-500/40 opacity-80 group-hover:opacity-100 group-hover:blur-[32px]'
            : 'bg-purple-600/30 opacity-60 group-hover:opacity-90 group-hover:blur-[28px]'
            }`}
        />

        {/* Rounded Square Card with Glowing Border */}
        <div
          className={`relative w-full h-full overflow-hidden rounded-2xl border-4 border-black transition-all duration-300 ${isHovered
            ? 'shadow-[0_0_20px_rgba(192,132,252,0.9),0_0_40px_rgba(168,85,247,0.6)]'
            : 'shadow-[0_0_10px_rgba(168,85,247,0.5),0_0_20px_rgba(124,58,237,0.3)]'
            }`}
        >
          <img
            src={image.url}
            alt={image.alt}
            loading="eager"
            className="w-full h-full object-cover object-center scale-105 group-hover:scale-115 transition-transform duration-500 ease-out"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 via-transparent to-black/20 pointer-events-none" />

          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity duration-300" />
        </div>

        {/* Floating Label Badge */}
        {labelTag && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`absolute ${isCentral
              ? '-bottom-4 left-1/2 -translate-x-1/2'
              : '-bottom-3 left-1/2 -translate-x-1/2'
              } z-30 pointer-events-none whitespace-nowrap`}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-purple-100 bg-slate-950/80 border border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.4)] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_6px_#c084fc]" />
              {labelTag}
            </span>
          </motion.div>
        )}

        {/* Hover Tooltip: Person Name & Role */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-14 left-1/2 -translate-x-1/2 z-40 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-purple-400/40 text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md pointer-events-none whitespace-nowrap"
          >
            <div className="text-xs font-bold text-white font-heading">
              {image.name}
            </div>
            <div className="text-[10px] text-purple-300 font-sans">
              {image.role}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}