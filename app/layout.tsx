import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rock | Paper | Scissors - Next.js',
  description: 'A modern Rock Paper Scissors game built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

