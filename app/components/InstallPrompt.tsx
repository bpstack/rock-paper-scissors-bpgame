'use client'

import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const STORAGE_KEY_HIDDEN = 'rps-install-prompt-hidden'
const STORAGE_KEY_IOS_SHOWN = 'rps-ios-instructions-shown'

function isAppInstalled(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(display-mode: standalone)').matches) return true
  if ((window.navigator as any).standalone === true) return true
  return false
}

function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

function isIOS(): boolean {
  if (typeof window === 'undefined') return false
  return /iPhone|iPad|iPod/.test(navigator.userAgent) && !(window as any).MSStream
}

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showIOSInstructions, setShowIOSInstructions] = useState(false)
  const [isIos, setIsIos] = useState(false)
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [promptAvailable, setPromptAvailable] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsIos(isIOS())
    setIsMobileDevice(isMobile())

    if (isAppInstalled()) return

    if (localStorage.getItem(STORAGE_KEY_HIDDEN)) return

    setShowPrompt(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setPromptAvailable(true)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return

    if (isIos) {
      const timer = setTimeout(() => {
        if (!localStorage.getItem(STORAGE_KEY_IOS_SHOWN) && !isAppInstalled()) {
          setShowPrompt(true)
        }
      }, 2000)

      return () => clearTimeout(timer)
    }

    if (isMobileDevice && !promptAvailable) {
      const timer = setTimeout(() => {
        if (!localStorage.getItem(STORAGE_KEY_HIDDEN) && !isAppInstalled() && !deferredPrompt) {
          setShowPrompt(true)
        }
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [mounted, isIos, isMobileDevice, promptAvailable, deferredPrompt])

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIOSInstructions(true)
      localStorage.setItem(STORAGE_KEY_IOS_SHOWN, 'true')
    } else if (deferredPrompt) {
      deferredPrompt.prompt()

      const { outcome } = await deferredPrompt.userChoice

      if (outcome === 'accepted') {
        console.log('[PWA] Usuario acepto la instalacion')
      } else {
        console.log('[PWA] Usuario rechazo la instalacion')
      }

      setDeferredPrompt(null)
      setPromptAvailable(false)
      setShowPrompt(false)
    } else if (isMobileDevice) {
      alert('Para instalar:\n\n1. Abre el menu del navegador\n2. Toca "Anadir a pantalla de inicio" o "Instalar app"')
    }
  }

  const handleClose = () => {
    setShowPrompt(false)
    setShowIOSInstructions(false)
    localStorage.setItem(STORAGE_KEY_HIDDEN, 'true')
  }

  if (!mounted || !showPrompt) return null

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50 animate-fade-in-up">
        <button
          onClick={handleInstallClick}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105 flex items-center gap-2 font-medium text-sm group"
          aria-label="Instalar aplicacion"
        >
          <svg
            className="w-5 h-5 group-hover:rotate-12 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <span>Instalar App</span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleClose()
          }}
          className="absolute -top-2 -right-2 ml-1 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 rounded-full p-1 transition-colors"
          aria-label="Cerrar"
        >
          <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {showIOSInstructions && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          onClick={handleClose}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Instalar en iOS
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p className="text-sm">
                Para instalar esta app en tu iPhone/iPad:
              </p>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 flex items-center justify-center text-xs font-semibold">
                    1
                  </span>
                  <span>
                    Toca el boton de <strong>Compartir</strong>{' '}
                    <svg
                      className="inline w-4 h-4 mx-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 flex items-center justify-center text-xs font-semibold">
                    2
                  </span>
                  <span>
                    Selecciona{' '}
                    <strong>&quot;Anadir a pantalla de inicio&quot;</strong>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 flex items-center justify-center text-xs font-semibold">
                    3
                  </span>
                  <span>
                    Toca &quot;Anadir&quot; en la esquina superior derecha
                  </span>
                </li>
              </ol>
            </div>
            <button
              onClick={handleClose}
              className="mt-6 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  )
}
