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
      className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="
          bg-white text-black font-semibold px-6 py-3 rounded-lg
          hover:bg-accent-yellow transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:ring-offset-2 focus:ring-offset-primary-dark
          shadow-lg hover:shadow-xl
        "
      >
        Reiniciar Puntuación
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleAutoPlay}
        className={`
          font-semibold px-6 py-3 rounded-lg transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-dark
          shadow-lg hover:shadow-xl
          ${
            isAutoPlaying
              ? 'bg-accent-red text-white hover:bg-red-600 focus:ring-accent-red'
              : 'bg-white text-black hover:bg-accent-yellow focus:ring-accent-yellow'
          }
        `}
      >
        {isAutoPlaying ? '⏸ Detener Auto Play' : '▶ Auto Play'}
      </motion.button>
    </motion.div>
  )
}

