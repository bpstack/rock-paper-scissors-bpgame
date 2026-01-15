'use client'

import { motion } from 'framer-motion'

interface GameControlsProps {
  onReset: () => void
  onToggleAutoPlay: () => void
  isAutoPlaying: boolean
}

export default function GameControls({ onReset, onToggleAutoPlay, isAutoPlaying }: GameControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center"
    >
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(250,192,54,0.35)' }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="
          bg-gradient-to-br from-white to-white/80 text-black font-semibold px-4 py-2 rounded-lg
          hover:from-accent-yellow hover:to-accent-yellow/90 transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:ring-offset-2 focus:ring-offset-primary-dark
          shadow-md hover:shadow-[0_15px_35px_rgba(250,192,54,0.35)]
          text-sm
        "
      >
        Reiniciar Puntuación
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleAutoPlay}
        className={`
          font-semibold px-4 py-2 rounded-lg transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-dark
          shadow-md hover:shadow-[0_15px_35px_rgba(255,255,255,0.25)]
          text-sm
          ${
            isAutoPlaying
              ? 'bg-gradient-to-r from-accent-red to-red-600 text-white focus:ring-accent-red'
              : 'bg-gradient-to-r from-white/90 to-white text-black hover:from-accent-yellow hover:to-accent-yellow/90 focus:ring-accent-yellow'
          }
        `}
      >
        {isAutoPlaying ? '⏸ Detener' : '▶ Auto Play'}
      </motion.button>
    </motion.div>
  )
}
