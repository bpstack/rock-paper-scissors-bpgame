'use client'


import { useEffect } from 'react'

import { motion } from 'framer-motion'
import { useGame } from '@/hooks/useGame'
import MoveButton from './MoveButton'
import ResultDisplay from './ResultDisplay'
import ScoreDisplay from './ScoreDisplay'
import GameControls from './GameControls'
import { AchievementNotification } from './AchievementNotification'
import { AchievementsDisplay } from './AchievementsDisplay'
import { Move } from '@/types/game'

export default function Game() {
  const {
    score,
    lastResult,
    isAutoPlaying,
    stats,
    unlockedAchievements,
    newAchievement,
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
    <div className="relative min-h-screen flex flex-col items-center justify-center p-2 md:p-8">
      <div className="absolute inset-0 -z-10">
        <div className="animated-grid" />
        <div className="meteor-shower" />
      </div>

      <div className="absolute top-4 right-4 z-10">
        <AchievementsDisplay unlockedAchievements={unlockedAchievements} />
      </div>

      <div className="w-full max-w-2xl text-center glass-panel px-3 py-4 md:px-10 md:py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg md:text-4xl font-bold mb-3 md:mb-10 gradient-text"
        >
          Piedra | Papel | Tijera
        </motion.h1>

        <div className="relative flex justify-center gap-2 md:gap-6 mb-4 md:mb-8">
          <div className="orbital-ring" />
          <MoveButton move="rock" onClick={() => playGame('rock')} disabled={isAutoPlaying} />
          <MoveButton move="paper" onClick={() => playGame('paper')} disabled={isAutoPlaying} />
          <MoveButton move="scissors" onClick={() => playGame('scissors')} disabled={isAutoPlaying} />
        </div>

        {isAutoPlaying && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent-yellow mb-2 text-[10px] md:text-sm flex items-center justify-center gap-1"
          >
            <span className="pulse-dot" />
            Auto Play activo
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

      </div>

      <AchievementNotification achievementId={newAchievement} onClose={() => {}} />
    </div>
  )
}
