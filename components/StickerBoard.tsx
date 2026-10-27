'use client'

import type { CSSProperties } from 'react'
import type { IconType } from 'react-icons'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFigma,
  SiGithub,
  SiGodotengine,
  SiSupabase,
  SiVercel,
} from 'react-icons/si'
import RevealOnScroll from './RevealOnScroll'

interface Sticker {
  icon: IconType
  label: string
  url: string
  rotate: number
}

const stickers: Sticker[] = [
  { icon: SiReact, label: 'React', url: 'https://react.dev', rotate: -8 },
  { icon: SiNextdotjs, label: 'Next.js', url: 'https://nextjs.org', rotate: 6 },
  { icon: SiTypescript, label: 'TypeScript', url: 'https://www.typescriptlang.org', rotate: -4 },
  { icon: SiTailwindcss, label: 'Tailwind CSS', url: 'https://tailwindcss.com', rotate: 9 },
  { icon: SiFigma, label: 'Figma', url: 'https://www.figma.com', rotate: -10 },
  { icon: SiGithub, label: 'GitHub', url: 'https://github.com/NateUXI', rotate: 5 },
  { icon: SiGodotengine, label: 'Godot Engine', url: 'https://godotengine.org', rotate: -6 },
  { icon: SiSupabase, label: 'Supabase', url: 'https://supabase.com', rotate: 7 },
  { icon: SiVercel, label: 'Vercel', url: 'https://vercel.com', rotate: -5 },
]

export default function StickerBoard() {
  return (
    <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-4 sm:gap-6 md:grid md:grid-cols-10 md:gap-[3vw]">
      {stickers.map(({ icon: Icon, label, url, rotate }, i) => (
        // `group` = stable hover target that doesn't rotate with the sticker
        // md+: 10-column grid; 4 stickers on top (centered via the offset), 5 below
        <li
          key={label}
          className={`group w-[28%] max-w-32 sm:w-[22%] sm:max-w-40 md:w-auto md:max-w-none md:col-span-2 ${i === 0 ? 'md:col-start-2' : ''}`}
        >
          <RevealOnScroll animation="bottom" delay={i * 80} threshold={0.3}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="sticker block"
              style={{ '--r': `${rotate}deg` } as CSSProperties}
            >
              <div className="sticker-peel">
                <Icon aria-hidden="true" className="block h-auto w-full text-portfolio-red" />
              </div>
              <span aria-hidden="true" className="sticker-flap" />
            </a>
          </RevealOnScroll>
        </li>
      ))}
    </ul>
  )
}