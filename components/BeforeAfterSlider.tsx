'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'

interface BeforeAfterSliderProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt?: string
  afterAlt?: string
  beforeLabel?: string
  afterLabel?: string
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Before',
  afterAlt = 'After',
  beforeLabel = 'Old',
  afterLabel = 'New',
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width)
    setSliderPos((x / rect.width) * 100)
  }, [])

  const startDrag = () => { isDragging.current = true }
  const stopDrag = () => { isDragging.current = false }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) updatePosition(e.clientX)
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX)
  }

  // Each side is "dimmed" while its visible share of the frame is under 50%,
  // and clears once it reaches 51%+
  const beforeDimmed = sliderPos < 51
  const afterDimmed = sliderPos > 51

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video select-none cursor-ew-resize touch-none"
      onMouseDown={startDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onMouseMove={handleMouseMove}
      onTouchStart={startDrag}
      onTouchEnd={stopDrag}
      onTouchMove={handleTouchMove}
    >
      {/* AFTER (new) - full base layer */}
      <div className="absolute inset-0">
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          unoptimized
          className="object-cover pointer-events-none"
        />
        {/* Dim/blur overlay for AFTER's visible region (right side) */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 pointer-events-none"
          style={{
            clipPath: `inset(0 0 0 ${sliderPos}%)`,
            opacity: afterDimmed ? 1 : 0,
          }}
        />
      </div>

      {/* BEFORE (old) - clipped to slider position */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          unoptimized
          className="object-cover pointer-events-none"
        />
        {/* Dim/blur overlay for BEFORE's visible region (left side) */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 pointer-events-none"
          style={{ opacity: beforeDimmed ? 1 : 0 }}
        />
      </div>

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
        style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-portfolio-red">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L2 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 3L14 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span
        className="absolute top-5 left-5 bg-white text-portfolio-red font-bold uppercase text-xl px-4 py-1 shadow-xl rounded-3xl pointer-events-none transition-opacity duration-300"
        style={{ opacity: beforeDimmed ? 0 : 1 }}
      >
        {beforeLabel}
      </span>
      <span
        className="absolute top-5 right-5 bg-white text-portfolio-red font-bold uppercase text-xl px-4 py-1 shadow-xl rounded-3xl pointer-events-none transition-opacity duration-300"
        style={{ opacity: afterDimmed ? 0 : 1 }}
      >
        {afterLabel}
      </span>
    </div>
  )
}