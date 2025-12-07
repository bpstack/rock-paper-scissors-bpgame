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
        className="mt-4 md:mt-8 space-y-3 md:space-y-6"
      >
        <motion.p
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className={`text-2xl md:text-5xl font-bold ${color} animate-fade-zoom-in`}
        >

          {text}
        </motion.p>

        <div className="flex items-center justify-center gap-3 md:gap-10">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-1.5 md:gap-3"
          >
            <p className="text-xs md:text-base text-gray-400">Tú</p>
            <div className="relative w-14 h-14 md:w-24 md:h-24">
              <div className="absolute inset-0 rounded-full border border-white/20 blur" />
              <div className="relative w-full h-full rounded-full border border-white/60 bg-primary-dark flex items-center justify-center shadow-[0_0_25px_rgba(250,192,54,0.2)]">
                <Image
                  src={`/images/${playerMove}-emoji.png`}
                  alt={moveLabels[playerMove]}
                  width={36}
                  height={36}
                  className="md:w-14 md:h-14"
                />
              </div>
            </div>
            <p className="text-[10px] md:text-xs text-gray-500 capitalize">{moveLabels[playerMove]}</p>
          </motion.div>



          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="vs-pulse text-[11px] md:text-sm uppercase tracking-[0.3em] text-gray-300"
          >
            VS
          </motion.div>


          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-1.5 md:gap-3"
          >
            <p className="text-xs md:text-base text-gray-400">Computadora</p>
            <div className="relative w-14 h-14 md:w-24 md:h-24">
              <div className="absolute inset-0 rounded-full border border-white/20 blur" />
              <div className="relative w-full h-full rounded-full border border-white/60 bg-primary-dark flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.15)]">
                <Image
                  src={`/images/${computerMove}-emoji.png`}
                  alt={moveLabels[computerMove]}
                  width={36}
                  height={36}
                  className="md:w-14 md:h-14"
                />
              </div>
            </div>
            <p className="text-[10px] md:text-xs text-gray-500 capitalize">{moveLabels[computerMove]}</p>
          </motion.div>

        </div>
      </motion.div>
    </AnimatePresence>
  )
}


