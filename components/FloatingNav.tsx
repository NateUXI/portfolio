'use client'

import { useState, useEffect, useRef } from 'react'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import {
  SiReact, SiNextdotjs, SiTypescript,
  SiTailwindcss, SiFigma, SiGithub, SiGodotengine
} from 'react-icons/si'
import gsap from 'gsap'
import TransitionLink from './TransitionLink'

export default function FloatingNav() {
  const [isOverRed, setIsOverRed] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const tlRef = useRef<gsap.core.Tween | null>(null)
  const pauseHandlerRef = useRef<() => void>(undefined)
  const playHandlerRef = useRef<() => void>(undefined)

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMounted(true)
      })
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === 'red') {
            setIsOverRed(entry.isIntersecting)
          }
          if (entry.target.id === 'footer') {
            setIsHidden(entry.isIntersecting)
          }
        })
      },
      {
        threshold: 0,
        rootMargin: '0px'
      }
    )

    const redSection = document.getElementById('red')
    const footerSection = document.getElementById('footer')

    if (redSection) observer.observe(redSection)
    if (footerSection) observer.observe(footerSection)

    const scrollElement = scrollRef.current

    function createScrollAnimation() {
      if (!scrollElement) return

      if (tlRef.current) {
        tlRef.current.kill()
        tlRef.current = null
      }

      const scrollWidth = scrollElement.scrollWidth / 2
      tlRef.current = gsap.to(scrollElement, {
        x: -scrollWidth,
        duration: 20,
        ease: 'none',
        repeat: -1,
      })
    }

    if (scrollElement) {
      createScrollAnimation()

      const pause = () => tlRef.current?.pause()
      const play = () => tlRef.current?.play()

      pauseHandlerRef.current = pause
      playHandlerRef.current = play

      scrollElement.addEventListener('mouseenter', pause)
      scrollElement.addEventListener('mouseleave', play)

      const onResize = () => createScrollAnimation()
      window.addEventListener('resize', onResize)

      return () => {
        observer.disconnect()
        if (pauseHandlerRef.current) {
          scrollElement.removeEventListener('mouseenter', pauseHandlerRef.current)
        }
        if (playHandlerRef.current) {
          scrollElement.removeEventListener('mouseleave', playHandlerRef.current)
        }
        window.removeEventListener('resize', onResize)
        if (tlRef.current) {
          tlRef.current.kill()
          tlRef.current = null
        }
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const bgColor = isOverRed ? 'bg-white' : 'bg-portfolio-red'
  const textColor = isOverRed ? 'text-portfolio-red' : 'text-white'
  const borderColor = isOverRed ? 'border-portfolio-red' : 'border-white'

  const iconData = [
    { icon: <SiReact />, url: 'https://react.dev' },
    { icon: <SiNextdotjs />, url: 'https://nextjs.org' },
    { icon: <SiTypescript />, url: 'https://www.typescriptlang.org' },
    { icon: <SiTailwindcss />, url: 'https://tailwindcss.com' },
    { icon: <SiFigma />, url: 'https://www.figma.com' },
    { icon: <SiGithub />, url: 'https://github.com' },
    { icon: <SiGodotengine />, url: 'https://godotengine.org' },
  ]

  return (
    <div
      className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center w-[95%] max-w-150 transition-all duration-500 ease-in-out
        ${mounted && !isHidden ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      <div className={`relative w-full overflow-hidden transition-all duration-500 ease-in-out rounded-3xl border-2 ${borderColor} shadow-2xl ${bgColor} ${isOpen ? 'max-h-100 p-10 mb-3 opacity-100' : 'max-h-0 p-0 opacity-0'}`}>
        <div
          className={`
            absolute right-0 top-0
            w-[45%] h-full
            pointer-events-none z-0
            transition-opacity duration-500
            ${isOpen ? 'opacity-100' : 'opacity-0'}
            ${isOverRed ? 'animate-dither-red' : 'animate-dither-white'}
          `}
        />

        <nav className={`relative z-10 flex flex-col gap-6 font-anton text-5xl uppercase ${textColor}`}>
          <TransitionLink href="/" className="hover:scale-105 transition-all" onNavigate={() => setIsOpen(false)}>
            Home
          </TransitionLink>
          <TransitionLink href="/work" className="hover:scale-105 transition-all" onNavigate={() => setIsOpen(false)}>
            Work
          </TransitionLink>
          <TransitionLink href="/projects" className="hover:scale-105 transition-all" onNavigate={() => setIsOpen(false)}>
            Projects
          </TransitionLink>
        </nav>
      </div>

      <div className={`w-full ${bgColor} rounded-3xl shadow-2xl transition-all duration-500 overflow-hidden border ${isOverRed ? 'border-black/5' : 'border-white/20'}`}>
        <div className="p-4 flex items-center h-24">
          <div className={`shrink-0 border-2 ${borderColor} w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden transition-colors duration-500`}>
            <img
              src={isOverRed ? '/logo_red.png' : '/logo.png'}
              alt="Logo"
              className="w-14 h-14 object-contain"
            />
          </div>

          <div className="flex flex-col grow ml-5 overflow-hidden justify-center">
            <h2 className={`font-anton text-3xl uppercase tracking-tight leading-none transition-colors duration-500 ${textColor}`}>
              Nate Turner
            </h2>

            <div
              className="relative w-full h-8 mt-2 overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
              }}
            >
              <div ref={scrollRef} className={`flex items-center whitespace-nowrap ${textColor}`}>
                <div className="flex items-center gap-10 pr-10">
                  {iconData.map((item, index) => (
                    <a
                      key={`set1-${index}`}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-2xl transition-all duration-300 hover:scale-120 hover:brightness-150 active:scale-95"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>

                <div className="flex items-center gap-10 pr-10" aria-hidden="true">
                  {iconData.map((item, index) => (
                    <a
                      key={`set2-${index}`}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-2xl transition-all duration-300 hover:scale-120 hover:brightness-150 active:scale-95"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`shrink-0 w-14 h-14 ml-2 rounded-xl flex items-center justify-center text-4xl transition-all active:scale-90 ${textColor} hover:bg-black/5`}
          >
            {isOpen ? <HiX /> : <HiMenuAlt4 />}
          </button>
        </div>
      </div>
    </div>
  )
}