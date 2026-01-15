'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ACHIEVEMENTS, getRarityColor } from '@/data/achievements'

interface AchievementNotificationProps {
  achievementId: string | null
  onClose: () => void
}

export function AchievementNotification({ achievementId, onClose }: AchievementNotificationProps) {
  const [achievement, setAchievement] = useState<typeof ACHIEVEMENTS[0] | null>(null)

  useEffect(() => {
    if (achievementId) {
      const found = ACHIEVEMENTS.find((a) => a.id === achievementId)
      if (found) {
        setAchievement(found)
      }
    }
  }, [achievementId])

  if (!achievement) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="fixed top-2 left-2 z-50"
      >
        <div className={`bg-gradient-to-r ${getRarityColor(achievement.rarity)} rounded-lg px-3 py-1.5 shadow-lg border border-white/20 flex items-center gap-2`}>
          <span className="text-base">{achievement.icon}</span>
          <div>
            <p className="text-white/80 text-[9px] font-semibold uppercase leading-none">Logro</p>
            <p className="text-white font-bold text-xs leading-none">{achievement.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors ml-1"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
