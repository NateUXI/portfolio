'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Lenis from 'lenis'
import Image from 'next/image'
import gsap from 'gsap'
import FloatingNav from '@/components/FloatingNav'
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'

const mtgCards = [
  { src: '/art/Talion.png', alt: 'Talion' },
  { src: '/art/EleshNorn2.png', alt: 'Elesh Norn' },
  { src: '/art/Pionta_card.png', alt: 'Pionta Card' },
  { src: '/art/Pionta_aura.png', alt: 'Pionta Aura' },
  { src: '/art/Razzle.png', alt: 'Razzle' },
  { src: '/art/Lark.png', alt: 'Lark' },
  { src: '/art/Sylvan.png', alt: 'Sylvan' },
  { src: '/art/Swords.png', alt: 'Sword' },
  { src: '/art/Token.png', alt: 'Token' },
  { src: '/art/Nebulous.png', alt: 'Nebulous' },
  { src: '/art/Crab.jpeg', alt: 'Crab' },
  { src: '/art/Persist.png', alt: 'Persist' },
  { src: '/art/Surpise.png', alt: 'Surprise' },
  { src: '/art/Skullclamp.png', alt: 'Skullclamp' },
  { src: '/art/Sakashima2.png', alt: 'Sakashima' },
  { src: '/art/CrabToken.png', alt: 'Crab_Token' },
  { src: '/art/Strider.png', alt: 'Strider' },
  { src: '/art/Gift.png', alt: 'Gift' },
]

export default function ProjectPage() {
  const [selectedCard, setSelectedCard] = useState<typeof mtgCards[0] | null>(null)
  const [lenisRef, setLenisRef] = useState<Lenis | null>(null)
  
  const modalRef = useRef<HTMLDivElement>(null)
  const cardContainerRef = useRef<HTMLDivElement>(null)

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true })
    setLenisRef(lenis)
    if ('scrollRestoration' in history) { history.scrollRestoration = 'manual' }
    window.scrollTo(0, 0)
    return () => lenis.destroy()
  }, [])

  // Animation & Scroll Lock logic
  useEffect(() => {
    if (selectedCard) {
      lenisRef?.stop()
      
      // Snappy fade and scale pop
      gsap.fromTo(modalRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      
      gsap.fromTo(cardContainerRef.current,
        { scale: 0.7, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' }
      )
    } else {
      lenisRef?.start()
    }
  }, [selectedCard, lenisRef])

  // Subtle 3D Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardContainerRef.current) return
    
    const card = cardContainerRef.current
    const rect = card.getBoundingClientRect()
    
    // Calculate mouse position relative to card center
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // Limits the tilt to a subtle range
    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1200
    })
  }

  const resetRotation = () => {
    gsap.to(cardContainerRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out'
    })
  }

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedCard(null)
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <main className="min-h-screen bg-portfolio-red overflow-x-hidden relative">
      <TopNav />
      <FloatingNav />

      <div className="relative pt-[15vw] md:pt-0 pb-[5vw] px-[5vw] flex flex-col items-center z-10" />

      <div className="relative w-full flex flex-col items-center z-20"></div>

      {/* MODAL OVERLAY */}
      {selectedCard && (
        <div 
          ref={modalRef}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-md cursor-zoom-out p-6"
          onClick={() => setSelectedCard(null)}
          role="dialog"
          aria-modal="true"
        >


          <div 
            ref={cardContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetRotation}
            className="relative w-full max-w-125 aspect-5/7 rounded-[1vw] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <Image 
              src={selectedCard.src} 
              alt={selectedCard.alt} 
              fill
              priority
              className="object-cover pointer-events-none"
              sizes="(max-width: 768px) 90vw, 500px"
            />
          </div>
        </div>
      )}

      <div className="relative w-full flex flex-col items-center z-20">
        {/* Top Cap */}
        <div className="w-[115vw] md:w-[106vw] leading-none relative z-0">
          <Image
            src="/Top3.png"
            alt="Cap Top"
            width={1920}
            height={400}
            priority
            className="w-full h-auto block -mb-px"
          />
        </div>

        {/* Content Section */}
        <div className="relative w-[115vw] md:w-[106vw] bg-white z-20 px-[8vw] py-[8vw] md:py-[5vw]">
                  
          {/* Header Logos */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-[6vw] md:gap-[4vw] mb-[12vw] md:mb-[6vw] mt-[-10vw] md:-mt-[22vw] md:ml-[4.5vw] relative z-40">
            <Image src="/art/Pionta.svg" alt="Pionta" width={700} height={180} className="w-[75vw] md:w-[30vw] h-auto" />
            <Image src="/art/X.svg" alt="X" width={120} height={120} className="w-[12vw] md:w-[5vw] h-auto" />
            <Image src="/art/MTG.svg" alt="MTG" width={900} height={220} className="w-[80vw] md:w-[35vw] h-auto" />
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-12 w-full max-w-8xl mx-auto">
            {mtgCards.map((card, index) => (
              <div 
                key={index} 
                className="group relative aspect-[5/7] w-full cursor-zoom-in"
                onClick={() => setSelectedCard(card)}
              >
                <div className="relative h-full w-full rounded-[1vw] overflow-hidden shadow-lg transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-2xl">
                  <Image 
                    src={card.src} 
                    alt={card.alt} 
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/5 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Cap */}
        <div className="w-[105vw] md:w-[106vw] leading-none relative z-30">
          <Image 
            src="/Bottom2.png" 
            alt="Cap Bottom" 
            width={1920} height={400} 
            className="w-full h-auto block -mt-1" 
          />
        </div>

        <section id="footer" className="w-full mt-[10vw] md:mt-[5vw]">
          <Footer />
        </section>
      </div>
    </main>
  )
}