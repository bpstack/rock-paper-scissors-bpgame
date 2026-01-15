'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ACHIEVEMENTS, getRarityColor, getRarityBorder } from '@/data/achievements'

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
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.8 }}
        className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div className={`bg-gradient-to-br ${getRarityColor(achievement.rarity)} rounded-2xl p-4 shadow-2xl max-w-xs mx-auto`}>
          <div className="flex items-center gap-3">
            <div className="text-4xl bg-white/20 rounded-full p-2 backdrop-blur-sm">
              {achievement.icon}
            </div>
            <div>
              <p className="text-white text-xs font-medium uppercase tracking-wider opacity-80">
                Logro desbloqueado
              </p>
              <p className="text-white font-bold text-lg">{achievement.name}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
