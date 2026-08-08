import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { heroConfig, heroStats } from '../data/shebuildsData'
import { HeroVisual } from './HeroVisual'
import { AnimatedCounter } from './AnimatedCounter'
import { BuildJourney } from './BuildJourney'
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
  })

  useEffect(() => {
    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = e.clientX - innerWidth / 2
      const y = e.clientY - innerHeight / 2
      setMousePos({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isTouchDevice])

  // Parallax layers calculation
  const layer1X = isTouchDevice ? 0 : mousePos.x * 0.005
  const layer1Y = isTouchDevice ? 0 : mousePos.y * 0.005

  return (
    <section 
      id="home"
      className="relative min-h-screen pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-24 bg-hero-pattern flex flex-col justify-center overflow-hidden select-none"
    >
      {/* Layer 1: Ambient Background Radial Glow (Parallax) */}
      <motion.div 
        style={{ x: layer1X, y: layer1Y }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none" 
      />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-violet-600/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 space-y-16">
        
        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            
            {/* Step 2: Pill Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(124,58,237,0.2)] backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>{heroConfig.pillLabel}</span>
            </motion.div>

            {/* Step 3: Main Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-6xl xl:text-7xl text-white tracking-tight leading-[1.06]"
            >
              {heroConfig.headlineMain}{' '}
              <br className="hidden sm:block" />
              <span className="italic font-black bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
                {heroConfig.headlineAccent}
              </span>
            </motion.h1>

            {/* Step 4: Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal"
            >
              {heroConfig.description}
            </motion.p>

            {/* Step 5: Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              {/* Primary CTA */}
              <a
                href="#join"
                data-cursor="button"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-heading font-bold text-base text-white bg-gradient-to-r from-purple-600 via-purple-500 to-violet-600 shadow-[0_0_30px_rgba(124,58,237,0.45)] hover:shadow-[0_0_45px_rgba(124,58,237,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-purple-400/40 group"
              >
                <span>{heroConfig.primaryCTA}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Secondary CTA */}
              <a
                href="#building"
                data-cursor="button"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-heading font-semibold text-base text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/40 hover:text-white transition-all duration-200 backdrop-blur-md"
              >
                <span>{heroConfig.secondaryCTA}</span>
                <ChevronDown className="w-4 h-4 text-purple-400" />
              </a>
            </motion.div>

            {/* Visual Story Ecosystem Bar */}
            <BuildJourney />

          </div>

          {/* Right Column: Hero Visual - SheBuilds as the Source */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center w-full"
          >
            <HeroVisual mousePos={mousePos} />
          </motion.div>

        </div>

        {/* Step 10: Count-Up Statistics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
        >
          {heroStats.map((stat) => (
            <AnimatedCounter key={stat.id} stat={stat} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
