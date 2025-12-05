'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '@/hooks/useGame'
import MoveButton from './MoveButton'
import ResultDisplay from './ResultDisplay'
import ScoreDisplay from './ScoreDisplay'
import GameControls from './GameControls'
import { Move } from '@/types/game'

export default function Game() {
  const {
    score,
    lastResult,
    isAutoPlaying,
    stats,
    playGame,
    resetScore,
    toggleAutoPlay,
  } = useGame()

  // Atajos de teclado
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isAutoPlaying) return

      const key = event.key.toLowerCase()
      const moveMap: Record<string, Move> = {
        r: 'rock',
        p: 'paper',
        s: 'scissors',
      }

      if (moveMap[key]) {
        playGame(moveMap[key])
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [playGame, isAutoPlaying])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-8 md:mb-12"
        >
          Piedra | Papel | Tijera
        </motion.h1>

        <div className="flex justify-center gap-4 md:gap-6 mb-8">
          <MoveButton move="rock" onClick={() => playGame('rock')} disabled={isAutoPlaying} />
          <MoveButton move="paper" onClick={() => playGame('paper')} disabled={isAutoPlaying} />
          <MoveButton move="scissors" onClick={() => playGame('scissors')} disabled={isAutoPlaying} />
        </div>

        {isAutoPlaying && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent-yellow mb-4 text-sm md:text-base"
          >
            Auto Play activado - Presiona el botón para detener
          </motion.p>
        )}

        {lastResult && (
          <ResultDisplay
            playerMove={lastResult.playerMove}
            computerMove={lastResult.computerMove}
            result={lastResult.result}
          />
        )}

        <ScoreDisplay score={score} stats={stats} />

        <GameControls
          onReset={resetScore}
          onToggleAutoPlay={toggleAutoPlay}
          isAutoPlaying={isAutoPlaying}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-xs md:text-sm text-gray-500"
        >
          Presiona <kbd className="px-2 py-1 bg-white/10 rounded text-accent-yellow">R</kbd>,{' '}
          <kbd className="px-2 py-1 bg-white/10 rounded text-accent-yellow">P</kbd>, o{' '}
          <kbd className="px-2 py-1 bg-white/10 rounded text-accent-yellow">S</kbd> para jugar
        </motion.p>
      </div>
    </div>
  )
}

