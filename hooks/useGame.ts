'use client'

import { useState, useEffect, useCallback } from 'react'
import { Move, GameResult, Score, GameHistory, GameStats } from '@/types/game'

const STORAGE_KEY = 'rps-score'
const HISTORY_KEY = 'rps-history'

export function useGame() {
  const [score, setScore] = useState<Score>({ wins: 0, losses: 0, ties: 0 })
  const [history, setHistory] = useState<GameHistory[]>([])
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [lastResult, setLastResult] = useState<{
    playerMove: Move
    computerMove: Move
    result: GameResult
  } | null>(null)

  // Cargar puntuación e historial desde localStorage
  useEffect(() => {
    const savedScore = localStorage.getItem(STORAGE_KEY)
    const savedHistory = localStorage.getItem(HISTORY_KEY)
    
    if (savedScore) {
      setScore(JSON.parse(savedScore))
    }
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Guardar puntuación en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(score))
  }, [score])

  // Guardar historial en localStorage
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  }, [history])

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

    setScore((prev) => {
      const newScore = { ...prev }
      if (result === 'win') newScore.wins += 1
      else if (result === 'lose') newScore.losses += 1
      else newScore.ties += 1
      return newScore
    })

    const gameHistory: GameHistory = {
      playerMove,
      computerMove,
      result,
      timestamp: Date.now(),
    }

    setHistory((prev) => [...prev, gameHistory])
  }, [pickComputerMove, calculateResult])

  const resetScore = useCallback(() => {
    setScore({ wins: 0, losses: 0, ties: 0 })
    setHistory([])
    setLastResult(null)
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(HISTORY_KEY)
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
      let tempCurrentStreak = 0
      let tempStreakType: 'win' | 'lose' | null = null

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

      // Calcular racha actual
      for (let i = history.length - 1; i >= 0; i--) {
        const result = history[i].result
        if (result === 'tie') continue
        
        // TypeScript ahora sabe que result es 'win' | 'lose'
        if (tempStreakType === null) {
          tempStreakType = result as 'win' | 'lose'
          tempCurrentStreak = 1
        } else if (result === tempStreakType) {
          tempCurrentStreak++
        } else {
          break
        }
      }

      currentStreak = tempCurrentStreak
      streakType = tempStreakType
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
    playGame,
    resetScore,
    toggleAutoPlay,
  }
}

