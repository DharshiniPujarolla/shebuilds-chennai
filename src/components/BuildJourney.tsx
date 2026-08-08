import { motion } from 'framer-motion'
import { ecosystemJourney } from '../data/shebuildsData'
import { ChevronRight } from 'lucide-react'

export function BuildJourney() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="w-full py-4 px-4 sm:px-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-x-auto flex items-center justify-between gap-2 scrollbar-none"
    >
      {ecosystemJourney.map((step, idx) => (
        <div key={step} className="flex items-center gap-2 shrink-0">
          <span className="font-heading font-extrabold text-[10px] sm:text-xs tracking-widest text-purple-300 uppercase">
            {step}
          </span>
          {idx < ecosystemJourney.length - 1 && (
            <ChevronRight className="w-3.5 h-3.5 text-purple-500/60 shrink-0" />
          )}
        </div>
      ))}
    </motion.div>
  )
}
