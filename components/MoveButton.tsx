'use client'

import { Move } from '@/types/game'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface MoveButtonProps {
  move: Move
  onClick: () => void
  disabled?: boolean
}

const moveLabels: Record<Move, string> = {
  rock: 'Piedra',
  paper: 'Papel',
  scissors: 'Tijera',
}

export default function MoveButton({ move, onClick, disabled }: MoveButtonProps) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.1, rotate: 2, boxShadow: '0 0 30px rgba(250, 192, 54, 0.5)' } : {}}
      whileTap={!disabled ? { scale: 0.95, rotate: -2 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-white/10 to-white/5
        border-[3px] border-white/70 backdrop-blur

        cursor-pointer transition-all duration-300 shadow-lg shadow-black/40
        hover:border-accent-yellow hover:shadow-accent-yellow/60 hover:-translate-y-1

        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:ring-offset-2 focus:ring-offset-primary-dark
      `}
      aria-label={`Jugar ${moveLabels[move]}`}
    >
      <Image
        src={`/images/${move}-emoji.png`}
        alt={moveLabels[move]}
        width={50}
        height={50}
        className="absolute inset-0 m-auto"
        priority
      />
    </motion.button>
  )
}

