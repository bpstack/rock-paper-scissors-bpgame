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

