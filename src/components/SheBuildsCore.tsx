import { motion } from 'framer-motion'

export function SheBuildsCore() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: [1, 1.01, 1] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      className="relative z-20 flex flex-col items-center justify-center text-center"
    >
      <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_50%_35%,rgba(124,58,237,0.18),transparent_45%)] blur-[90px] pointer-events-none" />

      <div className="relative px-5 py-6 sm:px-8 sm:py-8">
        <span className="block font-heading font-black text-[4rem] leading-[0.88] tracking-[-0.08em] text-white drop-shadow-[0_0_60px_rgba(124,58,237,0.35)] sm:text-[5.2rem] md:text-[6.2rem]">
          SHEBUILDS
        </span>

        <span className="mt-3 block text-sm sm:text-base uppercase tracking-[0.45em] text-purple-200/75">
          CHENNAI
        </span>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute -inset-8 rounded-full border border-purple-500/20 blur-[24px] opacity-40"
        animate={{ opacity: [0.18, 0.42, 0.18], scale: [1, 1.04, 1] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
