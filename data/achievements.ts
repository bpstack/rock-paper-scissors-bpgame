import { Achievement, AchievementStats } from '@/types/game'

export const ACHIEVEMENTS: Achievement[] = [
  // === LOGROS DE RACHA ===
  {
    id: 'streak-5',
    name: 'Maestro de Piedra',
    description: 'Gana 5 veces seguidas',
    icon: '✊',
    condition: (s: AchievementStats) => s.longestWinStreak >= 5,
    rarity: 'common',
  },
  {
    id: 'streak-10',
    name: 'Señor del Papel',
    description: 'Gana 10 veces seguidas',
    icon: '✋',
    condition: (s: AchievementStats) => s.longestWinStreak >= 10,
    rarity: 'rare',
  },
  {
    id: 'streak-15',
    name: 'Amo de las Tijeras',
    description: 'Gana 15 veces seguidas',
    icon: '✌️',
    condition: (s: AchievementStats) => s.longestWinStreak >= 15,
    rarity: 'epic',
  },
  {
    id: 'streak-20',
    name: 'Trío Legendario',
    description: 'Gana 20 veces seguidas',
    icon: '👑',
    condition: (s: AchievementStats) => s.longestWinStreak >= 20,
    rarity: 'legendary',
  },

  // === LOGROS DE VICTORIAS TOTALES ===
  {
    id: 'wins-10',
    name: 'Primeros Pasos',
    description: 'Consigue 10 victorias',
    icon: '🎯',
    condition: (s: AchievementStats) => s.totalWins >= 10,
    rarity: 'common',
  },
  {
    id: 'wins-25',
    name: 'Guerrero en Ascenso',
    description: 'Consigue 25 victorias',
    icon: '⚔️',
    condition: (s: AchievementStats) => s.totalWins >= 25,
    rarity: 'common',
  },
  {
    id: 'wins-50',
    name: 'Destructor de ilusiones',
    description: 'Consigue 50 victorias',
    icon: '💥',
    condition: (s: AchievementStats) => s.totalWins >= 50,
    rarity: 'rare',
  },
  {
    id: 'wins-100',
    name: 'Maestro de la Estrategia',
    description: 'Consigue 100 victorias',
    icon: '🧠',
    condition: (s: AchievementStats) => s.totalWins >= 100,
    rarity: 'epic',
  },
  {
    id: 'wins-200',
    name: 'El Legendario',
    description: 'Consigue 200 victorias',
    icon: '🏆',
    condition: (s: AchievementStats) => s.totalWins >= 200,
    rarity: 'legendary',
  },

  // === LOGROS DE PARTIDAS ===
  {
    id: 'games-1',
    name: 'Primera Sangre',
    description: 'Juega tu primera partida',
    icon: '🩸',
    condition: (s: AchievementStats) => s.totalGames >= 1,
    rarity: 'common',
  },
  {
    id: 'games-10',
    name: 'Calentando Motores',
    description: 'Juega 10 partidas',
    icon: '🔥',
    condition: (s: AchievementStats) => s.totalGames >= 10,
    rarity: 'common',
  },
  {
    id: 'games-50',
    name: 'Veterano de Guerra',
    description: 'Juga 50 partidas',
    icon: '🎖️',
    condition: (s: AchievementStats) => s.totalGames >= 50,
    rarity: 'rare',
  },
  {
    id: 'games-100',
    name: 'Centuria de Honor',
    description: 'Juga 100 partidas',
    icon: '💯',
    condition: (s: AchievementStats) => s.totalGames >= 100,
    rarity: 'epic',
  },

  // === LOGROS DE MOVIMIENTOS ===
  {
    id: 'rock-master',
    name: 'Devoto de la Piedra',
    description: 'Gana 10 veces con piedra',
    icon: '🪨',
    condition: (s: AchievementStats) => s.rockWins >= 10,
    rarity: 'common',
  },
  {
    id: 'paper-master',
    name: 'Devoto del Papel',
    description: 'Gana 10 veces con papel',
    icon: '📄',
    condition: (s: AchievementStats) => s.paperWins >= 10,
    rarity: 'common',
  },
  {
    id: 'scissors-master',
    name: 'Devoto de las Tijeras',
    description: 'Gana 10 veces con tijeras',
    icon: '✂️',
    condition: (s: AchievementStats) => s.scissorsWins >= 10,
    rarity: 'common',
  },
  {
    id: 'all-moves',
    name: 'Sabio del Equilibrio',
    description: 'Gana 5 veces con cada movimiento',
    icon: '⚖️',
    condition: (s: AchievementStats) => s.rockWins >= 5 && s.paperWins >= 5 && s.scissorsWins >= 5,
    rarity: 'rare',
  },

  // === LOGROS DE RENDIMIENTO ===
  {
    id: 'unbeaten-10',
    name: 'Sin Fracasos',
    description: '10 partidas sin perder',
    icon: '🛡️',
    condition: (s: AchievementStats) => s.longestLoseStreak === 0 && s.totalGames >= 10,
    rarity: 'rare',
  },
  {
    id: 'comeback',
    name: 'Doble O Nada',
    description: 'Gana inmediatamente después de perder',
    icon: '🔄',
    condition: (s: AchievementStats) => s.winsAfterLose >= 1,
    rarity: 'common',
  },
  {
    id: 'comeback-master',
    name: 'Resurreccion',
    description: '3 victorias seguidas después de perder',
    icon: '🦅',
    condition: (s: AchievementStats) => s.winsAfterLose >= 3,
    rarity: 'epic',
  },
  {
    id: 'tie-streak-3',
    name: 'Abrazo Celestial',
    description: '3 empates seguidos',
    icon: '🤝',
    condition: (s: AchievementStats) => s.longestTieStreak >= 3,
    rarity: 'rare',
  },
  {
    id: 'tie-streak-5',
    name: 'Armonia Universal',
    description: '5 empates seguidos',
    icon: '🌌',
    condition: (s: AchievementStats) => s.longestTieStreak >= 5,
    rarity: 'epic',
  },

  // === LOGROS ESPECIALES ===
  {
    id: 'first-win',
    name: 'Inicio Triunfante',
    description: 'Gana tu primera partida',
    icon: '⭐',
    condition: (s: AchievementStats) => s.totalWins >= 1,
    rarity: 'common',
  },
  {
    id: 'perfect-start',
    name: 'Racha Perfecta',
    description: 'Gana las primeras 5 partidas',
    icon: '✨',
    condition: (s: AchievementStats) => s.longestWinStreak >= 5 && s.totalGames === s.totalWins,
    rarity: 'epic',
  },
  {
    id: 'night-owl',
    name: 'Búho Nocturno',
    description: 'Juega una partida entre las 2 y las 5 de la mañana',
    icon: '🦉',
    condition: () => {
      const hour = new Date().getHours()
      return hour >= 2 && hour < 5
    },
    rarity: 'rare',
  },
  {
    id: 'morning-bird',
    name: 'Alondra Madrugadora',
    description: 'Juega una partida antes de las 7 de la mañana',
    icon: '🐦',
    condition: () => {
      const hour = new Date().getHours()
      return hour >= 5 && hour < 7
    },
    rarity: 'rare',
  },
]

export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case 'common':
      return 'from-gray-400 to-gray-500'
    case 'rare':
      return 'from-blue-400 to-blue-600'
    case 'epic':
      return 'from-purple-500 to-purple-700'
    case 'legendary':
      return 'from-amber-400 to-orange-500'
    default:
      return 'from-gray-400 to-gray-500'
  }
}

export function getRarityBorder(rarity: string): string {
  switch (rarity) {
    case 'common':
      return 'border-gray-400'
    case 'rare':
      return 'border-blue-400'
    case 'epic':
      return 'border-purple-500'
    case 'legendary':
      return 'border-amber-400'
    default:
      return 'border-gray-400'
  }
}
