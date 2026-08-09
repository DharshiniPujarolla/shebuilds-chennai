import { motion } from 'framer-motion'
import { SheBuildsCore } from './SheBuildsCore'
import { RightCollage } from './RightCollage'

interface HeroVisualProps {
  mousePos?: { x: number; y: number }
}

export function HeroVisual({ mousePos = { x: 0, y: 0 } }: HeroVisualProps) {
  const parallaxX = mousePos.x * 0.015
  const parallaxY = mousePos.y * 0.015

  return (
    <div className="relative w-full max-w-[920px] min-h-[420px] sm:min-h-[560px] lg:min-h-[700px] flex items-center justify-center overflow-visible select-none">
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute left-[10%] top-[8%] w-[240px] h-[240px] rounded-full bg-violet-500/18 blur-[92px]" />
        <div className="absolute right-[6%] top-[20%] w-[300px] h-[300px] rounded-full bg-purple-600/18 blur-[110px]" />
        <div className="absolute left-[8%] bottom-[14%] w-[200px] h-[200px] rounded-full bg-fuchsia-500/12 blur-[82px]" />
        <div className="absolute right-[4%] bottom-[28%] w-[220px] h-[220px] rounded-full bg-purple-700/12 blur-[96px]" />
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="absolute w-[420px] h-[420px] rounded-full bg-violet-400/18 blur-[90px]"
          initial={{ scale: 0.12, opacity: 0.25 }}
          animate={{ scale: [0.12, 1.05, 1.4], opacity: [0.25, 0.1, 0] }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
        />
        <motion.div
          className="absolute w-[320px] h-[320px] rounded-full bg-purple-500/12 blur-[70px]"
          initial={{ scale: 0.12, opacity: 0.3 }}
          animate={{ scale: [0.12, 0.95, 1.15], opacity: [0.3, 0.08, 0] }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.12 }}
        />
      </div>

      <div className="relative z-20 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-10">
        <SheBuildsCore />
      </div>

      {/* New static decorative collage (non-interactive) */}
      <RightCollage />
    </div>
  )
}
