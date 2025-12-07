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
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 -z-10">
        <div className="animated-grid" />
        <div className="meteor-shower" />
      </div>

      <div className="w-full max-w-2xl text-center glass-panel px-6 py-8 md:px-10 md:py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-8 md:mb-12 gradient-text"
        >
          Piedra | Papel | Tijera
        </motion.h1>


        <div className="relative flex justify-center gap-4 md:gap-6 mb-8">
          <div className="orbital-ring" />
          <MoveButton move="rock" onClick={() => playGame('rock')} disabled={isAutoPlaying} />
          <MoveButton move="paper" onClick={() => playGame('paper')} disabled={isAutoPlaying} />
          <MoveButton move="scissors" onClick={() => playGame('scissors')} disabled={isAutoPlaying} />
        </div>


        {isAutoPlaying && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent-yellow mb-4 text-sm md:text-base flex items-center justify-center gap-3"
          >
            <span className="pulse-dot" />
            Auto Play activado - Presiona el botón para detener
            <span className="pulse-dot" />
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
          className="mt-8 text-xs md:text-sm text-gray-400 flex flex-col items-center gap-2"
        >
          <span>Presiona las teclas para jugar al instante</span>
          <span className="glass-pill text-accent-yellow">
            <kbd className="px-2 py-1 rounded">R</kbd>
            <kbd className="px-2 py-1 rounded">P</kbd>
            <kbd className="px-2 py-1 rounded">S</kbd>
          </span>
        </motion.p>

      </div>
    </div>
  )
}

