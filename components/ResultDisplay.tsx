'use client'

import { Move, GameResult } from '@/types/game'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface ResultDisplayProps {
  playerMove: Move
  computerMove: Move
  result: GameResult
}

const resultMessages: Record<GameResult, { text: string; color: string }> = {
  win: { text: '¡Ganaste!', color: 'text-accent-green' },
  lose: { text: 'Perdiste', color: 'text-accent-red' },
  tie: { text: 'Empate', color: 'text-accent-yellow' },
}

const moveLabels: Record<Move, string> = {
  rock: 'Piedra',
  paper: 'Papel',
  scissors: 'Tijera',
}

export default function ResultDisplay({ playerMove, computerMove, result }: ResultDisplayProps) {
  const { text, color } = resultMessages[result]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${playerMove}-${computerMove}-${result}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="mt-8 space-y-6"
      >
        <motion.p
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className={`text-4xl md:text-5xl font-bold ${color} animate-fade-zoom-in`}
        >
          {text}
        </motion.p>

        <div className="flex items-center justify-center gap-4 md:gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-sm md:text-base text-gray-400">Tú</p>
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white bg-primary-dark flex items-center justify-center">
              <Image
                src={`/images/${playerMove}-emoji.png`}
                alt={moveLabels[playerMove]}
                width={40}
                height={40}
                className="md:w-12 md:h-12"
              />
            </div>
            <p className="text-xs text-gray-500 capitalize">{moveLabels[playerMove]}</p>
          </motion.div>

          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="text-2xl md:text-3xl font-bold text-gray-500"
          >
            VS
          </motion.span>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-sm md:text-base text-gray-400">Computadora</p>
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white bg-primary-dark flex items-center justify-center">
              <Image
                src={`/images/${computerMove}-emoji.png`}
                alt={moveLabels[computerMove]}
                width={40}
                height={40}
                className="md:w-12 md:h-12"
              />
            </div>
            <p className="text-xs text-gray-500 capitalize">{moveLabels[computerMove]}</p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

