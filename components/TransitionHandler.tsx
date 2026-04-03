'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export function TransitionHandler() {
  const router = useRouter()
  const pathname = usePathname()

  const [phase, setPhase] = useState<'idle' | 'leaving' | 'entering'>('idle')
  const nextHrefRef = useRef<string | null>(null)
  const isNavigatingRef = useRef(false)

  useEffect(() => {
    const handleTransition = (event: Event) => {
      const customEvent = event as CustomEvent<{ href: string }>
      const href = customEvent.detail?.href

      if (!href || isNavigatingRef.current) return

      isNavigatingRef.current = true
      nextHrefRef.current = href
      setPhase('leaving')

      window.setTimeout(() => {
        if (nextHrefRef.current) {
          router.push(nextHrefRef.current)
        }
      }, 350)
    }

    window.addEventListener('trigger-page-transition', handleTransition)

    return () => {
      window.removeEventListener('trigger-page-transition', handleTransition)
    }
  }, [router])

  useEffect(() => {
    if (!isNavigatingRef.current) return

    setPhase('entering')

    const timer = window.setTimeout(() => {
      setPhase('idle')
      isNavigatingRef.current = false
      nextHrefRef.current = null
    }, 500)

    return () => window.clearTimeout(timer)
  }, [pathname])

  return (
    <div aria-hidden="true" className={`page-transition-overlay ${phase}`}>
    </div>
  )
}