'use client'

import { useEffect, useRef, useState } from 'react'
import { Heart } from 'lucide-react'

interface Metric {
  label: string
  value?: number
}

const metrics: Metric[] = [
  { label: 'Happiness', value: 94 },
  { label: 'Engagement', value: 85 },
  { label: 'Adoption', value: 96 },
  { label: 'Retention', value: 90 },
  { label: 'Task Success', value: 92 },
]

const FILL_MS = 1400
const STAGGER_MS = 200

export default function HeartMetrics() {
  const ref = useRef<HTMLDivElement>(null)
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFilled(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="w-full rounded-3xl bg-white p-4 shadow-[0_8px_0_0_rgba(0,0,0,0.25)] md:rounded-[3rem] md:p-[2%]"
    >
      <div className="mb-4 flex flex-col items-start gap-3 px-2 text-portfolio-red sm:flex-row sm:items-center sm:justify-between md:mb-[1%] md:py-[1.0%]">
        <span className="flex items-center gap-2 md:gap-[1.5vw]">
          <span
            aria-hidden="true"
            className="block aspect-558/717 h-[clamp(2.5rem,6vw,6rem)] bg-portfolio-red mask-[url(/REFORM_LOGO.svg)] mask-center mask-no-repeat mask-contain"
          />
          <span className="font-inter text-[clamp(1.75rem,5vw,5rem)] font-black leading-none tracking-tight">
            REFORM
          </span>
        </span>
        <span className="flex items-center gap-2 whitespace-nowrap font-anton text-[clamp(1.75rem,4.2vw,4.2rem)] uppercase leading-none">
          Heart Metrics
          <Heart className="size-[1.1em]" aria-hidden="true" />
        </span>
      </div>

      <p className="mb-4 px-2 font-overpass text-base font-semibold leading-snug text-portfolio-red md:mb-[2vw] md:text-[1.5vw]">
        Evaluated across live remote and in-person usability testing cycles for REFORM.
      </p>

      <ul className="flex flex-col gap-3 md:gap-[1.2vw]">
        {metrics.map((metric, i) => {
          const isFilled = filled && metric.value !== undefined
          const delay = `${i * STAGGER_MS}ms`
          return (
            <li
              key={metric.label}
              className="relative flex h-[clamp(3rem,5.5vw,5.5rem)] items-center overflow-hidden rounded-full bg-[#D4D3D4] font-anton text-[clamp(1.25rem,2.8vw,2.8rem)] uppercase leading-none"
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-portfolio-red transition-[width] ease-out motion-reduce:transition-none"
                style={{
                  width: isFilled ? `${metric.value}%` : '0%',
                  transitionDuration: `${FILL_MS}ms`,
                  transitionDelay: delay,
                }}
              />
              <span
                className={`relative z-10 px-[3%] transition-colors duration-500 motion-reduce:transition-none ${isFilled ? 'text-white' : 'text-portfolio-red'}`}
                style={{ transitionDelay: delay }}
              >
                {metric.label}
              </span>
              {metric.value !== undefined && (
                <span
                  className={`absolute top-1/2 z-10 -translate-x-full -translate-y-1/2 pr-[2%] text-white transition-[left,opacity] ease-out motion-reduce:transition-none ${isFilled ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    left: isFilled ? `${metric.value}%` : '0%',
                    transitionDuration: `${FILL_MS}ms`,
                    transitionDelay: delay,
                  }}
                >
                  {metric.value}%
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
