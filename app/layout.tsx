import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ServiceWorkerRegister } from './components/ServiceWorkerRegister'
import { UpdateNotification } from './components/UpdateNotification'
import { InstallPrompt } from './components/InstallPrompt'

export const metadata: Metadata = {
  title: 'Rock | Paper | Scissors - Next.js',
  description: 'A modern Rock Paper Scissors game built with Next.js',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Rock Paper Scissors',
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  themeColor: '#10b981',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icons/icon.svg" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body>
        {children}
        <ServiceWorkerRegister />
        <UpdateNotification />
        <InstallPrompt />
      </body>
    </html>
  )
}
