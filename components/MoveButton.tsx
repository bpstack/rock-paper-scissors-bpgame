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
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-24 h-24 md:w-28 md:h-28 rounded-full
        border-[3px] border-white bg-transparent
        cursor-pointer transition-all duration-200
        hover:border-accent-yellow hover:shadow-lg hover:shadow-accent-yellow/50
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

