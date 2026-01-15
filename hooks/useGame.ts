'use client'

import { useState, useEffect, useCallback } from 'react'
import { Move, GameResult, Score, GameHistory, GameStats, AchievementStats, UnlockedAchievement } from '@/types/game'
import { ACHIEVEMENTS } from '@/data/achievements'

const STORAGE_KEY = 'rps-score'
const HISTORY_KEY = 'rps-history'
const ACHIEVEMENTS_KEY = 'rps-achievements'

export function useGame() {
  const [score, setScore] = useState<Score>({ wins: 0, losses: 0, ties: 0 })
  const [history, setHistory] = useState<GameHistory[]>([])
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [lastResult, setLastResult] = useState<{
    playerMove: Move
    computerMove: Move
    result: GameResult
  } | null>(null)
  const [unlockedAchievements, setUnlockedAchievements] = useState<UnlockedAchievement[]>([])
  const [newAchievement, setNewAchievement] = useState<string | null>(null)
  const [moveStats, setMoveStats] = useState({ rockWins: 0, paperWins: 0, scissorsWins: 0 })
  const [winsAfterLose, setWinsAfterLose] = useState(0)
  const [tieStreak, setTieStreak] = useState(0)

  // Cargar datos desde localStorage
  useEffect(() => {
    const savedScore = localStorage.getItem(STORAGE_KEY)
    const savedHistory = localStorage.getItem(HISTORY_KEY)
    const savedAchievements = localStorage.getItem(ACHIEVEMENTS_KEY)
    const savedMoveStats = localStorage.getItem('rps-move-stats')
    const savedWinsAfterLose = localStorage.getItem('rps-wins-after-lose')
    const savedTieStreak = localStorage.getItem('rps-tie-streak')

    if (savedScore) {
      setScore(JSON.parse(savedScore))
    }
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
    if (savedAchievements) {
      setUnlockedAchievements(JSON.parse(savedAchievements))
    }
    if (savedMoveStats) {
      setMoveStats(JSON.parse(savedMoveStats))
    }
    if (savedWinsAfterLose) {
      setWinsAfterLose(JSON.parse(savedWinsAfterLose))
    }
    if (savedTieStreak) {
      setTieStreak(JSON.parse(savedTieStreak))
    }
  }, [])

  // Guardar puntuación
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(score))
  }, [score])

  // Guardar historial
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  }, [history])

  // Guardar logros
  useEffect(() => {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(unlockedAchievements))
  }, [unlockedAchievements])

  // Guardar estadísticas de movimientos
  useEffect(() => {
    localStorage.setItem('rps-move-stats', JSON.stringify(moveStats))
  }, [moveStats])

  useEffect(() => {
    localStorage.setItem('rps-wins-after-lose', JSON.stringify(winsAfterLose))
  }, [winsAfterLose])

  useEffect(() => {
    localStorage.setItem('rps-tie-streak', JSON.stringify(tieStreak))
  }, [tieStreak])

  const calculateAchievementStats = useCallback((): AchievementStats => {
    let currentTieStreakTemp = 0
    let longestTieStreakTemp = 0
    let tempWinStreak = 0
    let tempLoseStreak = 0
    let longestWinStreakTemp = 0
    let longestLoseStreakTemp = 0

    history.forEach((game) => {
      if (game.result === 'win') {
        tempWinStreak++
        tempLoseStreak = 0
        longestWinStreakTemp = Math.max(longestWinStreakTemp, tempWinStreak)
      } else if (game.result === 'lose') {
        tempLoseStreak++
        tempWinStreak = 0
        longestLoseStreakTemp = Math.max(longestLoseStreakTemp, tempLoseStreak)
      } else {
        tempWinStreak = 0
        tempLoseStreak = 0
      }

      if (game.result === 'tie') {
        currentTieStreakTemp++
        longestTieStreakTemp = Math.max(longestTieStreakTemp, currentTieStreakTemp)
      } else {
        currentTieStreakTemp = 0
      }
    })

    let currentStreak = 0
    let streakType: 'win' | 'lose' | null = null
    for (let i = history.length - 1; i >= 0; i--) {
      const result = history[i].result
      if (result === 'tie') continue

      if (streakType === null) {
        streakType = result as 'win' | 'lose'
        currentStreak = 1
      } else if (result === streakType) {
        currentStreak++
      } else {
        break
      }
    }

    return {
      totalWins: score.wins,
      totalLosses: score.losses,
      totalTies: score.ties,
      totalGames: score.wins + score.losses + score.ties,
      currentWinStreak: streakType === 'win' ? currentStreak : 0,
      longestWinStreak: longestWinStreakTemp,
      currentLoseStreak: streakType === 'lose' ? currentStreak : 0,
      longestLoseStreak: longestLoseStreakTemp,
      currentTieStreak: currentTieStreakTemp,
      longestTieStreak: longestTieStreakTemp,
      rockWins: moveStats.rockWins,
      paperWins: moveStats.paperWins,
      scissorsWins: moveStats.scissorsWins,
      winsAfterLose: winsAfterLose,
      perfectGames: 0,
    }
  }, [score, history, moveStats, winsAfterLose])

  const checkAchievements = useCallback((stats: AchievementStats) => {
    const unlockedIds = unlockedAchievements.map((a) => a.achievementId)

    ACHIEVEMENTS.forEach((achievement) => {
      if (!unlockedIds.includes(achievement.id) && achievement.condition(stats)) {
        setUnlockedAchievements((prev) => [...prev, { achievementId: achievement.id, unlockedAt: Date.now() }])
        setNewAchievement(achievement.id)

        setTimeout(() => setNewAchievement(null), 5000)
      }
    })
  }, [unlockedAchievements])

  const pickComputerMove = useCallback((): Move => {
    const randomNumber = Math.random()
    if (randomNumber < 1 / 3) return 'rock'
    if (randomNumber < 2 / 3) return 'paper'
    return 'scissors'
  }, [])

  const calculateResult = useCallback((playerMove: Move, computerMove: Move): GameResult => {
    if (playerMove === computerMove) return 'tie'

    const winConditions: Record<Move, Move> = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper',
    }

    return winConditions[playerMove] === computerMove ? 'win' : 'lose'
  }, [])

  const playGame = useCallback((playerMove: Move) => {
    const computerMove = pickComputerMove()
    const result = calculateResult(playerMove, computerMove)

    setLastResult({ playerMove, computerMove, result })

    // Actualizar puntuación
    setScore((prev) => {
      const newScore = { ...prev }
      if (result === 'win') newScore.wins += 1
      else if (result === 'lose') newScore.losses += 1
      else newScore.ties += 1
      return newScore
    })

    // Actualizar estadísticas de movimientos
    if (result === 'win') {
      setMoveStats((prev) => ({
        ...prev,
        [playerMove + 'Wins']: prev[playerMove === 'rock' ? 'rockWins' : playerMove === 'paper' ? 'paperWins' : 'scissorsWins'] + 1,
      }))

      // Wins after lose
      if (history.length > 0 && history[history.length - 1].result === 'lose') {
        setWinsAfterLose((prev) => prev + 1)
      }
    }

    // Tie streak
    if (result === 'tie') {
      setTieStreak((prev) => prev + 1)
    } else {
      setTieStreak(0)
    }

    const gameHistory: GameHistory = {
      playerMove,
      computerMove,
      result,
      timestamp: Date.now(),
    }

    setHistory((prev) => [...prev, gameHistory])

    // Check achievements
    const achievementStats = calculateAchievementStats()
    checkAchievements(achievementStats)
  }, [pickComputerMove, calculateResult, history, calculateAchievementStats, checkAchievements])

  const resetScore = useCallback(() => {
    setScore({ wins: 0, losses: 0, ties: 0 })
    setHistory([])
    setLastResult(null)
    setMoveStats({ rockWins: 0, paperWins: 0, scissorsWins: 0 })
    setWinsAfterLose(0)
    setTieStreak(0)
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(HISTORY_KEY)
    localStorage.removeItem('rps-move-stats')
    localStorage.removeItem('rps-wins-after-lose')
    localStorage.removeItem('rps-tie-streak')
  }, [])

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev)
  }, [])

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      const moves: Move[] = ['rock', 'paper', 'scissors']
      const randomMove = moves[Math.floor(Math.random() * moves.length)]
      playGame(randomMove)
    }, 1000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, playGame])

  // Calcular estadísticas
  const stats: GameStats = (() => {
    const totalGames = score.wins + score.losses + score.ties
    const winRate = totalGames > 0 ? (score.wins / totalGames) * 100 : 0

    let longestWinStreak = 0
    let longestLoseStreak = 0
    let currentStreak = 0
    let streakType: 'win' | 'lose' | null = null

    if (history.length > 0) {
      let tempWinStreak = 0
      let tempLoseStreak = 0

      history.forEach((game) => {
        if (game.result === 'win') {
          tempWinStreak++
          tempLoseStreak = 0
          longestWinStreak = Math.max(longestWinStreak, tempWinStreak)
        } else if (game.result === 'lose') {
          tempLoseStreak++
          tempWinStreak = 0
          longestLoseStreak = Math.max(longestLoseStreak, tempLoseStreak)
        } else {
          tempWinStreak = 0
          tempLoseStreak = 0
        }
      })

      for (let i = history.length - 1; i >= 0; i--) {
        const result = history[i].result
        if (result === 'tie') continue

        if (streakType === null) {
          streakType = result as 'win' | 'lose'
          currentStreak = 1
        } else if (result === streakType) {
          currentStreak++
        } else {
          break
        }
      }
    }

    return {
      totalGames,
      winRate: Math.round(winRate * 10) / 10,
      longestWinStreak,
      longestLoseStreak,
      currentStreak,
      streakType,
    }
  })()

  return {
    score,
    history,
    lastResult,
    isAutoPlaying,
    stats,
    unlockedAchievements,
    newAchievement,
    playGame,
    resetScore,
    toggleAutoPlay,
  }
}
