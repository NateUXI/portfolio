'use client'

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  memo,
} from 'react'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFigma,
  SiGithub,
  SiGodotengine,
} from 'react-icons/si'
import gsap from 'gsap'
import TransitionLink from './TransitionLink'

type PreviewKind = 'projects' | 'work' | null
type Side = 'left' | 'right'

type PreviewItem = {
  src: string
  side: Side
  rotate: number
  y: number
}

type IconItem = {
  icon: React.ComponentType<{ className?: string }>
  url: string
  label: string
}

const PREVIEW_DATA: Record<'projects' | 'work', PreviewItem[]> = {
  projects: [
    { src: '/art/Talion.png', side: 'left', rotate: -12, y: -110 },
    { src: '/art/Swords.png', side: 'left', rotate: 8, y: 0 },
    { src: '/art/SSS_Guitar.png', side: 'left', rotate: -5, y: 110 },
    { src: '/art/RR_Poster.png', side: 'right', rotate: 10, y: -110 },
    { src: '/art/Various11.png', side: 'right', rotate: -15, y: 0 },
    { src: '/art/Chapter1.png', side: 'right', rotate: 5, y: 110 },
  ],
  work: [
    { src: '/Reform_icon.png', side: 'left', rotate: -10, y: -60 },
    { src: '/Berks_icon.png', side: 'left', rotate: 15, y: 60 },
    { src: '/GRID_icon.png', side: 'right', rotate: -15, y: -60 },
    { src: '/Tavern_icon.png', side: 'right', rotate: 10, y: 60 },
  ],
}

const ICON_DATA: IconItem[] = [
  { icon: SiReact, url: 'https://react.dev', label: 'React' },
  { icon: SiNextdotjs, url: 'https://nextjs.org', label: 'Next.js' },
  { icon: SiTypescript, url: 'https://www.typescriptlang.org', label: 'TypeScript' },
  { icon: SiTailwindcss, url: 'https://tailwindcss.com', label: 'Tailwind CSS' },
  { icon: SiFigma, url: 'https://www.figma.com', label: 'Figma' },
  { icon: SiGithub, url: 'https://github.com/NateUXI', label: 'GitHub' },
  { icon: SiGodotengine, url: 'https://godotengine.org', label: 'Godot Engine' },
]

// How many identical copies of the icon strip are rendered. The marquee moves
// exactly one copy's width per loop, so the seam is always invisible. Keep this
// at 2+ and raise it to 3 if the strip ever becomes narrower than the viewport.
const MARQUEE_COPIES = 2
// Seconds for one full copy to scroll past.
const MARQUEE_DURATION = 20

const PreviewCards = memo(function PreviewCards() {
  return (
    <>
      {PREVIEW_DATA.projects.map((img, i) => (
        <div
          key={`p-${i}`}
          data-preview-group="projects"
          data-preview-index={i}
          className="preview-card absolute w-28 md:w-36 aspect-3/4 opacity-0 scale-50 overflow-hidden rounded-xl border-2 border-white shadow-2xl bg-white will-change-transform"
        >
          <img
            src={img.src}
            alt=""
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {PREVIEW_DATA.work.map((img, i) => (
        <div
          key={`w-${i}`}
          data-preview-group="work"
          data-preview-index={i}
          className="preview-card absolute w-28 md:w-36 aspect-square opacity-0 scale-50 overflow-hidden rounded-xl border-2 border-white shadow-2xl bg-white will-change-transform"
        >
          <img
            src={img.src}
            alt=""
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </>
  )
})

const IconLoop = memo(function IconLoop({
  textColor,
  duplicate = false,
}: {
  textColor: string
  duplicate?: boolean
}) {
  return (
    <>
      {ICON_DATA.map(({ icon: Icon, url, label }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          // Duplicates are decorative: keep them out of the tab order so
          // keyboard users don't tab through every icon twice.
          tabIndex={duplicate ? -1 : undefined}
          className={`shrink-0 text-2xl transition-transform duration-200 hover:scale-120 active:scale-95 ${textColor}`}
        >
          <Icon />
        </a>
      ))}
    </>
  )
})

export default function FloatingNav() {
  const [isOverRed, setIsOverRed] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activePreview, setActivePreview] = useState<PreviewKind>(null)
  const [isShrunk, setIsShrunk] = useState(false)

  const rootRef = useRef<HTMLDivElement | null>(null)
  const previewRef = useRef<HTMLDivElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null)
  const previousPreviewRef = useRef<PreviewKind>(null)
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    const id1 = requestAnimationFrame(() => {
      const id2 = requestAnimationFrame(() => {
        setMounted(true)
      })
      return () => cancelAnimationFrame(id2)
    })

    return () => cancelAnimationFrame(id1)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id
          if (id === 'red') setIsOverRed(entry.isIntersecting)
          if (id === 'footer') setIsHidden(entry.isIntersecting)
        }
      },
      { threshold: 0 }
    )

    const redSection = document.getElementById('red')
    const footerSection = document.getElementById('footer')

    if (redSection) observer.observe(redSection)
    if (footerSection) observer.observe(footerSection)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    lastScrollYRef.current = window.scrollY

    const handleScroll = () => {
      const currentY = window.scrollY
      const lastY = lastScrollYRef.current
      const delta = currentY - lastY

      // Ignore tiny jitters, and always stay full-size near the top
      if (Math.abs(delta) < 6) return

      if (currentY < 80) {
        setIsShrunk(false)
      } else if (delta > 0) {
        setIsShrunk(true) // scrolling down
      } else {
        setIsShrunk(false) // scrolling up
      }

      lastScrollYRef.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Marquee: built once. Using xPercent (relative to the strip's own width,
  // which is `w-max`) means there is nothing to measure, so no resize handler
  // and no animation restarts/jumps when the window changes size.
  useEffect(() => {
    const scrollEl = scrollRef.current
    const containerEl = containerRef.current
    if (!scrollEl || !containerEl) return

    const tween = gsap.to(scrollEl, {
      xPercent: -100 / MARQUEE_COPIES,
      duration: MARQUEE_DURATION,
      ease: 'none',
      repeat: -1,
      force3D: true,
    })
    marqueeTweenRef.current = tween

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) tween.pause()

    // Ease the speed to/from a stop instead of freezing abruptly.
    let hovered = false
    let focused = false
    const updateSpeed = () => {
      gsap.to(tween, {
        timeScale: hovered || focused ? 0 : 1,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    // Mouse only: touch fires emulated enter events with no matching leave,
    // which used to leave the marquee stuck paused after a tap.
    const onPointerEnter = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      hovered = true
      updateSpeed()
    }
    const onPointerLeave = () => {
      hovered = false
      updateSpeed()
    }
    const onFocusIn = () => {
      focused = true
      updateSpeed()
    }
    const onFocusOut = () => {
      focused = false
      updateSpeed()
    }

    containerEl.addEventListener('pointerenter', onPointerEnter)
    containerEl.addEventListener('pointerleave', onPointerLeave)
    containerEl.addEventListener('focusin', onFocusIn)
    containerEl.addEventListener('focusout', onFocusOut)

    return () => {
      containerEl.removeEventListener('pointerenter', onPointerEnter)
      containerEl.removeEventListener('pointerleave', onPointerLeave)
      containerEl.removeEventListener('focusin', onFocusIn)
      containerEl.removeEventListener('focusout', onFocusOut)
      gsap.killTweensOf(tween)
      tween.kill()
      marqueeTweenRef.current = null
    }
  }, [])

  // Don't burn frames animating a nav that's faded out over the footer.
  useEffect(() => {
    const tween = marqueeTweenRef.current
    if (!tween) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    tween.paused(isHidden || prefersReducedMotion)
  }, [isHidden])

  // set initial hidden state once
  useLayoutEffect(() => {
    if (!previewRef.current) return

    const cards = previewRef.current.querySelectorAll<HTMLElement>('.preview-card')

    gsap.set(cards, {
      opacity: 0,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 0.5,
      force3D: true,
    })
  }, [])

  // animate previews in and out
  useLayoutEffect(() => {
    if (!previewRef.current) return

    const previewEl = previewRef.current
    const previousPreview = previousPreviewRef.current

    // animate previous set back in
    if (previousPreview && previousPreview !== activePreview) {
      const previousCards = previewEl.querySelectorAll<HTMLElement>(
        `[data-preview-group="${previousPreview}"]`
      )

      gsap.killTweensOf(previousCards)

      gsap.to(previousCards, {
        opacity: 0,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 0.5,
        duration: 0.45,
        stagger: 0.03,
        ease: 'back.in(1.7)',
        overwrite: 'auto',
        force3D: true,
      })
    }

    // animate current set out
    if (isOpen && activePreview) {
      const activeCards = previewEl.querySelectorAll<HTMLElement>(
        `[data-preview-group="${activePreview}"]`
      )
      const activeSet = PREVIEW_DATA[activePreview]

      gsap.killTweensOf(activeCards)

      gsap.to(activeCards, {
        opacity: 1,
        x: (i) => (activeSet[i].side === 'left' ? -400 : 400),
        y: (i) => activeSet[i].y,
        rotation: (i) => activeSet[i].rotate,
        scale: 1,
        duration: 0.5,
        stagger: 0.03,
        ease: 'back.out(1.7)',
        delay: 0.05,
        overwrite: 'auto',
        force3D: true,
      })
    }

    previousPreviewRef.current = isOpen ? activePreview : null
  }, [isOpen, activePreview])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
    setActivePreview(null)
  }, [])

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev
      if (!next) setActivePreview(null)
      return next
    })
  }, [])

  const bgColor = isOverRed ? 'bg-white' : 'bg-portfolio-red'
  const textColor = isOverRed ? 'text-portfolio-red' : 'text-white'
  const borderColor = isOverRed ? 'border-portfolio-red' : 'border-white'

  return (
    <div
      ref={rootRef}
      className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center w-[95%] max-w-150 origin-bottom transition-all duration-500 ease-in-out ${
        mounted && !isHidden
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      } ${isShrunk ? 'scale-90' : 'scale-100'}`}
    >
      <div
        ref={previewRef}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <PreviewCards />
      </div>

      <div
        className={`relative w-full overflow-hidden transition-all duration-500 ease-in-out rounded-3xl border-2 ${borderColor} shadow-2xl ${bgColor} ${
          isOpen ? 'max-h-120 p-10 mb-3 opacity-100' : 'max-h-0 p-0 opacity-0'
        }`}
      >
        <div
          className={`absolute right-0 top-0 w-[45%] h-full pointer-events-none z-0 transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          } ${isOverRed ? 'animate-dither-red' : 'animate-dither-white'}`}
        />

        <nav
          className={`relative z-10 flex flex-col gap-6 font-anton text-5xl uppercase ${textColor}`}
        >
          <div className="w-fit">
            <TransitionLink
              href="/"
              className="hover:scale-115 transition-all block"
              onNavigate={closeMenu}
            >
              Home
            </TransitionLink>
          </div>

          <div
            className="w-fit"
            onMouseEnter={() => setActivePreview('work')}
            onMouseLeave={() => setActivePreview(null)}
          >
            <TransitionLink
              href="/work"
              className="hover:scale-115 transition-all block"
              onNavigate={closeMenu}
            >
              Work
            </TransitionLink>
          </div>

          <div
            className="w-fit"
            onMouseEnter={() => setActivePreview('projects')}
            onMouseLeave={() => setActivePreview(null)}
          >
            <TransitionLink
              href="/projects"
              className="hover:scale-115 transition-all block"
              onNavigate={closeMenu}
            >
              Projects
            </TransitionLink>
          </div>
        </nav>
      </div>

      <div
        className={`w-full z-10 ${bgColor} rounded-3xl shadow-2xl transition-all duration-500 overflow-hidden border ${
          isOverRed ? 'border-black/5' : 'border-white/20'
        }`}
      >
        <div className="p-4 flex items-center h-24">
          <div
            className={`shrink-0 border-2 ${borderColor} w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden transition-colors duration-500`}
          >
            <img
              src={isOverRed ? '/logo_red.png' : '/logo.png'}
              alt="Logo"
              loading="eager"
              decoding="async"
              className="w-14 h-14 object-contain"
            />
          </div>

          <div className="flex flex-col grow ml-5 overflow-hidden justify-center">
            <h2
              className={`font-anton text-3xl uppercase tracking-tight leading-none transition-colors duration-500 ${textColor}`}
            >
              Nate Turner
            </h2>

            <div
              ref={containerRef}
              className="relative w-full h-8 mt-2 overflow-hidden"
              style={{
                maskImage:
                  'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              }}
            >
              {/* w-max is required: xPercent is relative to this element's own
                  width, so it must size to its content, not its container. */}
              <div
                ref={scrollRef}
                className="flex items-center w-max whitespace-nowrap will-change-transform"
              >
                {Array.from({ length: MARQUEE_COPIES }, (_, copy) => (
                  <div
                    key={copy}
                    className="flex items-center gap-10 pr-10"
                    aria-hidden={copy > 0 ? true : undefined}
                  >
                    <IconLoop textColor={textColor} duplicate={copy > 0} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            className={`shrink-0 w-14 h-14 ml-2 rounded-xl flex items-center justify-center text-4xl cursor-pointer transition-all active:scale-90 ${textColor} hover:bg-black/5`}
          >
            {isOpen ? <HiX /> : <HiMenuAlt4 />}
          </button>
        </div>
      </div>
    </div>
  )
}