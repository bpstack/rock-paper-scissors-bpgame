export type Move = 'rock' | 'paper' | 'scissors'

export type GameResult = 'win' | 'lose' | 'tie'

export interface Score {
  wins: number
  losses: number
  ties: number
}

export interface GameHistory {
  playerMove: Move
  computerMove: Move
  result: GameResult
  timestamp: number
}

export interface GameStats {
  totalGames: number
  winRate: number
  longestWinStreak: number
  longestLoseStreak: number
  currentStreak: number
  streakType: 'win' | 'lose' | null
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  condition: (stats: AchievementStats) => boolean
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export interface AchievementStats {
  totalWins: number
  totalLosses: number
  totalTies: number
  totalGames: number
  currentWinStreak: number
  longestWinStreak: number
  currentLoseStreak: number
  longestLoseStreak: number
  currentTieStreak: number
  longestTieStreak: number
  rockWins: number
  paperWins: number
  scissorsWins: number
  winsAfterLose: number
  perfectGames: number
}

export interface UnlockedAchievement {
  achievementId: string
  unlockedAt: number
}
