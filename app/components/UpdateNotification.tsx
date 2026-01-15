'use client'

import { useState, useEffect } from 'react'

export function UpdateNotification() {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    navigator.serviceWorker?.addEventListener('message', (event) => {
      if (event.data.type === 'SKIP_WAITING') {
        setWaitingWorker(event.data.worker)
        setShowNotification(true)
      }
    })

    navigator.serviceWorker?.ready.then((registration) => {
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setWaitingWorker(newWorker)
              setShowNotification(true)
            }
          })
        }
      })
    })
  }, [])

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' })
      window.location.reload()
    }
  }

  if (!showNotification) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in-up">
      <div className="bg-amber-500 dark:bg-amber-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
        <span className="text-sm font-medium">Nueva versión disponible</span>
        <button
          onClick={handleUpdate}
          className="bg-white text-amber-600 px-3 py-1 rounded text-sm font-semibold hover:bg-amber-50 transition-colors"
        >
          Actualizar
        </button>
      </div>
    </div>
  )
}
