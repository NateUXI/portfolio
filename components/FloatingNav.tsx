'use client'

import { useState, useEffect, useRef } from 'react'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import {
  SiReact, SiNextdotjs, SiTypescript,
  SiTailwindcss, SiFigma, SiGithub, SiGodotengine
} from 'react-icons/si'
import gsap from 'gsap'
import TransitionLink from './TransitionLink'

const previewData = {
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
  ]
}

export default function FloatingNav() {
  const [isOverRed, setIsOverRed] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activePreview, setActivePreview] = useState<'projects' | 'work' | null>(null)

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const tlRef = useRef<gsap.core.Tween | null>(null)
  const previewRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    requestAnimationFrame(() => { requestAnimationFrame(() => { setMounted(true) }) })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === 'red') setIsOverRed(entry.isIntersecting)
          if (entry.target.id === 'footer') setIsHidden(entry.isIntersecting)
        })
      },
      { threshold: 0 }
    )

    const redSection = document.getElementById('red')
    const footerSection = document.getElementById('footer')
    if (redSection) observer.observe(redSection)
    if (footerSection) observer.observe(footerSection)

    const scrollElement = scrollRef.current
    const containerElement = containerRef.current
    
    function createScrollAnimation() {
      if (!scrollElement) return
      if (tlRef.current) tlRef.current.kill()
      
      const scrollWidth = scrollElement.scrollWidth / 2
      tlRef.current = gsap.to(scrollElement, {
        x: -scrollWidth,
        duration: 20,
        ease: 'none',
        repeat: -1,
      })
    }

    if (scrollElement && containerElement) {
      createScrollAnimation()
      const pause = () => tlRef.current?.pause()
      const play = () => tlRef.current?.play()
      
      containerElement.addEventListener('mouseenter', pause)
      containerElement.addEventListener('mouseleave', play)
      window.addEventListener('resize', createScrollAnimation)

      return () => {
        observer.disconnect()
        containerElement.removeEventListener('mouseenter', pause)
        containerElement.removeEventListener('mouseleave', play)
        window.removeEventListener('resize', createScrollAnimation)
        tlRef.current?.kill()
      }
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!previewRef.current) return
    const allCards = previewRef.current.querySelectorAll('.preview-card')
    
    gsap.to(allCards, {
      opacity: 0, x: 0, y: 0, rotation: 0, scale: 0.5,
      duration: 0.3, ease: "power2.in"
    })

    if (isOpen && activePreview) {
      const targetCards = previewRef.current.querySelectorAll(`.preview-${activePreview}`)
      const currentSet = previewData[activePreview]

      gsap.to(targetCards, {
        opacity: 1,
        x: (i) => (currentSet[i].side === 'left' ? -400 : 400),
        y: (i) => currentSet[i].y,
        rotation: (i) => currentSet[i].rotate,
        scale: 1,
        duration: 0.5,
        stagger: 0.03,
        ease: "back.out(1.7)",
        delay: 0.05
      })
    }
  }, [isOpen, activePreview])

  const bgColor = isOverRed ? 'bg-white' : 'bg-portfolio-red'
  const textColor = isOverRed ? 'text-portfolio-red' : 'text-white'
  const borderColor = isOverRed ? 'border-portfolio-red' : 'border-white'

  const iconData = [
    { icon: <SiReact />, url: 'https://react.dev' },
    { icon: <SiNextdotjs />, url: 'https://nextjs.org' },
    { icon: <SiTypescript />, url: 'https://www.typescriptlang.org' },
    { icon: <SiTailwindcss />, url: 'https://tailwindcss.com' },
    { icon: <SiFigma />, url: 'https://www.figma.com' },
    { icon: <SiGithub />, url: 'https://github.com/NateUXI' },
    { icon: <SiGodotengine />, url: 'https://godotengine.org' },
  ]

  return (
    <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center w-[95%] max-w-150 transition-all duration-500 ease-in-out ${mounted && !isHidden ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
      
      <div ref={previewRef} className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {previewData.projects.map((img, i) => (
          <div key={`p-${i}`} className="preview-card preview-projects absolute w-28 md:w-36 aspect-3/4 opacity-0 scale-50 overflow-hidden rounded-xl border-2 border-white shadow-2xl bg-white">
            <img src={img.src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
        {previewData.work.map((img, i) => (
          <div key={`w-${i}`} className="preview-card preview-work absolute w-28 md:w-36 aspect-square opacity-0 scale-50 overflow-hidden rounded-xl border-2 border-white shadow-2xl bg-white">
            <img src={img.src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className={`relative w-full overflow-hidden transition-all duration-500 ease-in-out rounded-3xl border-2 ${borderColor} shadow-2xl ${bgColor} ${isOpen ? 'max-h-120 p-10 mb-3 opacity-100' : 'max-h-0 p-0 opacity-0'}`}>
        <div className={`absolute right-0 top-0 w-[45%] h-full pointer-events-none z-0 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'} ${isOverRed ? 'animate-dither-red' : 'animate-dither-white'}`} />
        <nav className={`relative z-10 flex flex-col gap-6 font-anton text-5xl uppercase ${textColor}`}>
          <div className="w-fit">
            <TransitionLink href="/" className="hover:scale-115 transition-all block" onNavigate={() => setIsOpen(false)}>Home</TransitionLink>
          </div>
          <div className="w-fit" onMouseEnter={() => setActivePreview('work')} onMouseLeave={() => setActivePreview(null)}>
            <TransitionLink href="/work" className="hover:scale-115 transition-all block" onNavigate={() => setIsOpen(false)}>Work</TransitionLink>
          </div>
          <div className="w-fit" onMouseEnter={() => setActivePreview('projects')} onMouseLeave={() => setActivePreview(null)}>
            <TransitionLink href="/projects" className="hover:scale-115 transition-all block" onNavigate={() => setIsOpen(false)}>Projects</TransitionLink>
          </div>
        </nav>
      </div>

      <div className={`w-full z-10 ${bgColor} rounded-3xl shadow-2xl transition-all duration-500 overflow-hidden border ${isOverRed ? 'border-black/5' : 'border-white/20'}`}>
        <div className="p-4 flex items-center h-24">
          <div className={`shrink-0 border-2 ${borderColor} w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden transition-colors duration-500`}>
            <img src={isOverRed ? '/logo_red.png' : '/logo.png'} alt="Logo" className="w-14 h-14 object-contain" />
          </div>
          <div className="flex flex-col grow ml-5 overflow-hidden justify-center">
            <h2 className={`font-anton text-3xl uppercase tracking-tight leading-none transition-colors duration-500 ${textColor}`}>Nate Turner</h2>
            
            <div
              ref={containerRef}
              className="relative w-full h-8 mt-2 overflow-hidden"
              style={{ 
                maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', 
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' 
              }}
            >
              <div ref={scrollRef} className={`flex items-center whitespace-nowrap ${textColor}`}>
                <div className="flex items-center gap-10 pr-10">
                  {iconData.map((item, i) => (
                    <a key={`s1-${i}`} href={item.url} target="_blank" rel="noopener noreferrer" className="shrink-0 text-2xl transition-all hover:scale-120 hover:brightness-150 active:scale-95">
                      {item.icon}
                    </a>
                  ))}
                </div>
                <div className="flex items-center gap-10 pr-10" aria-hidden="true">
                  {iconData.map((item, i) => (
                    <a key={`s2-${i}`} href={item.url} target="_blank" rel="noopener noreferrer" className="shrink-0 text-2xl transition-all hover:scale-120 hover:brightness-150 active:scale-95">
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className={`shrink-0 w-14 h-14 ml-2 rounded-xl flex items-center justify-center text-4xl transition-all active:scale-90 ${textColor} hover:bg-black/5`}>
            {isOpen ? <HiX /> : <HiMenuAlt4 />}
          </button>
        </div>
      </div>
    </div>
  )
}