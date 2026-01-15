'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ACHIEVEMENTS, getRarityColor, getRarityBorder } from '@/data/achievements'
import { UnlockedAchievement } from '@/types/game'

interface AchievementsDisplayProps {
  unlockedAchievements: UnlockedAchievement[]
}

export function AchievementsDisplay({ unlockedAchievements }: AchievementsDisplayProps) {
  const [isOpen, setIsOpen] = useState(false)

  const unlockedIds = unlockedAchievements.map((a) => a.achievementId)
  const unlockedCount = unlockedAchievements.length
  const totalCount = ACHIEVEMENTS.length

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
      >
        <span className="text-xl">🏆</span>
        <span className="text-sm font-medium">{unlockedCount}/{totalCount}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900/95 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  🏆 Logros
                  <span className="text-sm font-normal text-gray-400">
                    {unlockedCount}/{totalCount}
                  </span>
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-4 overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ACHIEVEMENTS.map((achievement) => {
                    const isUnlocked = unlockedIds.includes(achievement.id)
                    const unlockedData = unlockedAchievements.find((a) => a.achievementId === achievement.id)

                    return (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`relative p-3 rounded-xl border transition-all ${
                          isUnlocked
                            ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)} border-${getRarityBorder(achievement.rarity)}`
                            : 'bg-gray-800/50 border-gray-700 opacity-50'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-2xl">{achievement.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className={`font-bold text-sm ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                              {achievement.name}
                            </p>
                            <p className={`text-xs mt-0.5 ${isUnlocked ? 'text-white/80' : 'text-gray-500'}`}>
                              {achievement.description}
                            </p>
                            {isUnlocked && unlockedData && (
                              <p className="text-xs text-white/60 mt-1">
                                {new Date(unlockedData.unlockedAt).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>

                        {!isUnlocked && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                            <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
