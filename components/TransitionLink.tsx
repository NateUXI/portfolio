'use client'

import Link from 'next/link'
import { MouseEvent, ReactNode } from 'react'

type TransitionLinkProps = {
  href: string
  className?: string
  children: ReactNode
  onNavigate?: () => void
}

export default function TransitionLink({
  href,
  className,
  children,
  onNavigate,
}: TransitionLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return
    }

    e.preventDefault()
    onNavigate?.()

    window.dispatchEvent(
      new CustomEvent('trigger-page-transition', {
        detail: { href },
      })
    )
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}