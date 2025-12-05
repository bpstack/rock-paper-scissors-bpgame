'use client'

import { Score, GameStats } from '@/types/game'
import { motion } from 'framer-motion'

interface ScoreDisplayProps {
  score: Score
  stats: GameStats
}

export default function ScoreDisplay({ score, stats }: ScoreDisplayProps) {
  const totalGames = score.wins + score.losses + score.ties

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 space-y-4"
    >
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
        <div className="bg-green-900/30 rounded-lg p-4 border border-green-500/30">
          <p className="text-2xl md:text-3xl font-bold text-accent-green">{score.wins}</p>
          <p className="text-xs md:text-sm text-gray-400 mt-1">Victorias</p>
        </div>
        <div className="bg-red-900/30 rounded-lg p-4 border border-red-500/30">
          <p className="text-2xl md:text-3xl font-bold text-accent-red">{score.losses}</p>
          <p className="text-xs md:text-sm text-gray-400 mt-1">Derrotas</p>
        </div>
        <div className="bg-yellow-900/30 rounded-lg p-4 border border-yellow-500/30">
          <p className="text-2xl md:text-3xl font-bold text-accent-yellow">{score.ties}</p>
          <p className="text-xs md:text-sm text-gray-400 mt-1">Empates</p>
        </div>
      </div>

      {totalGames > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 space-y-2 text-center"
        >
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <div className="bg-primary-dark/50 rounded-lg px-4 py-2 border border-white/10">
              <span className="text-gray-400">Partidas: </span>
              <span className="font-bold text-white">{stats.totalGames}</span>
            </div>
            <div className="bg-primary-dark/50 rounded-lg px-4 py-2 border border-white/10">
              <span className="text-gray-400">% Victoria: </span>
              <span className="font-bold text-accent-green">{stats.winRate}%</span>
            </div>
          </div>

          {(stats.longestWinStreak > 0 || stats.longestLoseStreak > 0) && (
            <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm mt-2">
              {stats.longestWinStreak > 0 && (
                <div className="text-gray-400">
                  Racha de victorias: <span className="text-accent-green font-bold">{stats.longestWinStreak}</span>
                </div>
              )}
              {stats.longestLoseStreak > 0 && (
                <div className="text-gray-400">
                  Racha de derrotas: <span className="text-accent-red font-bold">{stats.longestLoseStreak}</span>
                </div>
              )}
            </div>
          )}

          {stats.currentStreak > 0 && stats.streakType && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className={`mt-2 inline-block px-4 py-2 rounded-lg ${
                stats.streakType === 'win'
                  ? 'bg-accent-green/20 border border-accent-green/50'
                  : 'bg-accent-red/20 border border-accent-red/50'
              }`}
            >
              <span className="text-sm font-bold">
                Racha actual: {stats.currentStreak} {stats.streakType === 'win' ? 'victorias' : 'derrotas'}
              </span>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

