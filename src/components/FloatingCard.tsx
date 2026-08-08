import { motion } from 'framer-motion'
import type { FloatingCardData } from '../types'


interface FloatingCardProps {
  card: FloatingCardData
}

export function FloatingCard({ card }: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: [0, -6, 0] 
      }}
      transition={{
        opacity: { duration: 0.6, delay: card.delay },
        scale: { duration: 0.6, delay: card.delay },
        y: {
          duration: card.floatDuration || 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: card.delay
        }
      }}
      whileHover={{ scale: 1.04, y: -4 }}
      className={`glass-panel glass-panel-hover p-3.5 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3 sm:gap-3.5 max-w-[210px] sm:max-w-[230px] w-full border border-white/10 cursor-pointer group select-none ${card.positionClasses}`}
    >
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-violet-950/80 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:text-white group-hover:bg-purple-600 transition-colors shadow-inner flex-shrink-0">
        {card.icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <h4 className="font-heading font-bold text-sm sm:text-base text-white tracking-tight leading-none group-hover:text-purple-200 transition-colors truncate">
            {card.title}
          </h4>
          {card.badgeText && (
            <span className="inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-purple-500/20 text-purple-300 rounded border border-purple-500/30 shrink-0">
              {card.badgeText}
            </span>
          )}
        </div>
        <p className="font-sans text-[11px] sm:text-xs text-purple-200/70 mt-0.5 truncate leading-snug">
          {card.subtitle}
        </p>
      </div>

      {/* Subtle indicator dot */}
      <span className="w-1.5 h-1.5 rounded-full bg-purple-400/50 group-hover:bg-purple-400 group-hover:shadow-[0_0_8px_#a855f7] transition-all flex-shrink-0" />
    </motion.div>
  )
}
