import { useEffect } from 'react'
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import type { FloatingBubbleData } from '../types'
import { communityImages } from '../data/communityImages'
import { CommunityImage } from './CommunityImage'
import { Star } from 'lucide-react'

interface FloatingBubbleProps {
  bubble: FloatingBubbleData
}

const bubbleSizes: Record<string, string> = {
  circle: 'w-28 h-28 sm:w-36 sm:h-36',
  blob: 'w-32 h-36 sm:w-44 sm:h-48',
  portrait: 'w-28 h-36 sm:w-32 sm:h-44',
  pill: 'w-32 h-12 sm:w-40 h-12',
  ring: 'w-16 h-16 sm:w-20 h-20',
  star: 'w-18 h-18 sm:w-22 h-22',
  dot: 'w-3 h-3 sm:w-4 h-4'
}

export function FloatingBubble({ bubble }: FloatingBubbleProps) {
  const controls = useAnimationControls()
  const prefersReducedMotion = useReducedMotion()
  const associatedPhoto = bubble.imageId
    ? communityImages.find((img) => img.id === bubble.imageId)
    : null

  useEffect(() => {
    if (prefersReducedMotion) {
      controls.set({
        x: bubble.finalPosition.x,
        y: bubble.finalPosition.y,
        opacity: 1,
        scale: 1,
      })
      return
    }

    const animateBubble = async () => {
      await controls.start({
        x: bubble.finalPosition.x,
        y: bubble.finalPosition.y,
        opacity: 1,
        scale: 1,
        transition: {
          x: {
            type: 'spring',
            stiffness: 160,
            damping: 16,
            mass: 0.72,
            delay: bubble.burstDelay,
            duration: bubble.burstDuration,
          },
          y: {
            type: 'spring',
            stiffness: 160,
            damping: 16,
            mass: 0.72,
            delay: bubble.burstDelay,
            duration: bubble.burstDuration,
          },
          scale: {
            type: 'spring',
            stiffness: 160,
            damping: 16,
            mass: 0.72,
            delay: bubble.burstDelay,
            duration: bubble.burstDuration * 0.7,
          },
          opacity: {
            ease: 'easeOut',
            duration: 0.16,
            delay: bubble.burstDelay + 0.04,
          },
        },
      })

      if (bubble.transient) {
        controls.start({
          opacity: 0,
          transition: { duration: 0.9, delay: 0.3 },
        })
        return
      }

      controls.start({
        x: [
          bubble.finalPosition.x,
          bubble.finalPosition.x + bubble.floatOffset.x,
          bubble.finalPosition.x,
          bubble.finalPosition.x - bubble.floatOffset.x,
          bubble.finalPosition.x,
        ],
        y: [
          bubble.finalPosition.y,
          bubble.finalPosition.y + bubble.floatOffset.y,
          bubble.finalPosition.y,
          bubble.finalPosition.y - bubble.floatOffset.y,
          bubble.finalPosition.y,
        ],
        scale: [1, 1.03, 1, 0.98, 1],
        transition: {
          duration: bubble.floatDuration || 7.5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'mirror',
        },
      })
    }

    animateBubble()
  }, [bubble, controls, prefersReducedMotion])

  const wrapperClass = bubble.hideOnMobile ? 'hidden sm:block' : ''
  const variantSize = bubbleSizes[bubble.variant] ?? bubbleSizes.circle
  const isInteractive = bubble.type === 'image' || bubble.type === 'label'

  const labelContent = bubble.label ? (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs sm:text-sm font-heading font-semibold uppercase tracking-[0.2em] text-white shadow-[0_0_20px_rgba(124,58,237,0.18)] backdrop-blur-md border border-white/10">
      <span className="w-2 h-2 rounded-full bg-violet-300" />
      {bubble.label}
    </span>
  ) : null

  const renderVariant = () => {
    if (bubble.type === 'image' && associatedPhoto) {
      return (
        <CommunityImage
          image={associatedPhoto}
          className={`relative ${variantSize} overflow-hidden ${bubble.variant === 'blob' ? 'rounded-[2.6rem]' : bubble.variant === 'circle' ? 'rounded-full' : bubble.variant === 'portrait' ? 'rounded-[2rem]' : 'rounded-[1.8rem]'}`}
        />
      )
    }

    if (bubble.type === 'label') {
      return (
        <div className={`flex items-center justify-center ${variantSize} ${bubble.variant === 'pill' ? 'rounded-full' : bubble.variant === 'ring' ? 'rounded-full border border-violet-300/30 bg-white/5' : 'rounded-[1.8rem] bg-white/5'} px-2 py-2`}> 
          {labelContent}
        </div>
      )
    }

    if (bubble.type === 'particle') {
      if (bubble.variant === 'dot') {
        return <div className="w-3 h-3 rounded-full bg-white/80 shadow-[0_0_20px_rgba(168,85,247,0.35)]" />
      }
      if (bubble.variant === 'ring') {
        return <div className="w-4 h-4 rounded-full border border-violet-300/60 bg-transparent shadow-[0_0_16px_rgba(124,58,237,0.18)]" />
      }
      return (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/10 shadow-[0_0_15px_rgba(168,85,247,0.18)]">
          <Star className="w-4 h-4 text-violet-200" />
        </div>
      )
    }

    return null
  }

  return (
    <motion.div
      data-cursor={isInteractive ? (bubble.type === 'image' ? 'view' : 'explore') : undefined}
      initial={{ x: 0, y: 0, opacity: 0, scale: 0.28 }}
      animate={controls}
      whileHover={isInteractive ? { scale: 1.08 } : undefined}
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 ${wrapperClass} ${bubble.type === 'particle' ? 'pointer-events-none' : 'cursor-pointer'}`}
    >
      <div className={`flex items-center justify-center ${variantSize} ${bubble.variant === 'pill' ? 'rounded-full' : bubble.variant === 'ring' ? 'rounded-full' : bubble.variant === 'star' ? 'rounded-[1.8rem]' : bubble.variant === 'dot' ? 'rounded-full' : 'rounded-[2.2rem]'} ${bubble.type === 'image' ? 'overflow-hidden border border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.24)] bg-slate-950/95' : ''}`}>
        {bubble.type === 'label' ? labelContent : renderVariant()}
      </div>
    </motion.div>
  )
}
