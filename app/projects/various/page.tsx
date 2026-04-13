'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Lenis from 'lenis'
import Image from 'next/image'
import gsap from 'gsap'
import FloatingNav from '@/components/FloatingNav'
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'

const mtgCards = [
  { src: '/art/Various1.png', alt: 'Various 1' },
  { src: '/art/Various2.png', alt: 'Various 2' },
  { src: '/art/Various3.png', alt: 'Various 3' },
  { src: '/art/Various4.png', alt: 'Various 4' },
  { src: '/art/Various5.png', alt: 'Various 5' },
  { src: '/art/Various6.jpg', alt: 'Various 6' },
  { src: '/art/Various7.png', alt: 'Various 7' },
  { src: '/art/Various8.png', alt: 'Various 8' },
  { src: '/art/Various9.png', alt: 'Various 9' },
  { src: '/art/Various10.png', alt: 'Various 10' },
  { src: '/art/Various11.png', alt: 'Various 11' },
]

export default function ProjectPage() {
  const [selectedArt, setSelectedArt] = useState<typeof mtgCards[0] | null>(null)
  const [lenisRef, setLenisRef] = useState<Lenis | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true })
    setLenisRef(lenis)
    if ('scrollRestoration' in history) { history.scrollRestoration = 'manual' }
    window.scrollTo(0, 0)
    return () => { lenis.destroy() }
  }, [])

  // Animation & Scroll Management
  useEffect(() => {
    if (selectedArt) {
      lenisRef?.stop()
      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      gsap.fromTo(imgRef.current, 
        { scale: 0.92, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.5, ease: "power4.out" }
      )
    } else {
      lenisRef?.start()
    }
  }, [selectedArt, lenisRef])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedArt(null)
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <main className="min-h-screen bg-portfolio-red overflow-x-hidden relative">
      <TopNav />
      <FloatingNav />

      {selectedArt && (
        <div 
          ref={modalRef}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-md cursor-zoom-out p-4 md:p-10"
          onClick={() => setSelectedArt(null)}
        >

          <img 
            ref={imgRef}
            src={selectedArt.src} 
            alt={selectedArt.alt}
            className="relative max-w-full max-h-full w-auto h-auto object-contain pointer-events-none shadow-2xl"
          />
        </div>
      )}

      <div id = "red2"className="relative pt-[15vw] md:pt-[1vw] pb-[5vw] px-[5vw] flex flex-col items-center z-10" />

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
        <div className="relative w-full md:w-[106vw] bg-white z-20 px-[4vw] md:px-[8vw] py-[8vw] md:py-[5vw]">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-[4vw] mb-[8vw] md:mb-[6vw] -mt-[24vw] md:-mt-[22vw] relative z-40">
            <h1 className="font-anton text-[17vw] md:text-[10vw] text-center uppercase text-portfolio-red tracking-tight leading-none">Various <br className="md:hidden" /> Projects</h1>
          </div>

          {/* image gallery */}
          <div className="columns-2 md:columns-3 xl:columns-4 gap-6 md:gap-8 [column-fill:balance]">
            {mtgCards.map((card, index) => (
              <div
                key={index}
                className="mb-6 md:mb-8 break-inside-avoid cursor-zoom-in"
                onClick={() => setSelectedArt(card)}
              >
                <div className="group relative w-full">
                  <div className="relative overflow-hidden rounded-[1.25vw] bg-[#f4f4f4] shadow-lg transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02] group-hover:shadow-2xl">
                    <img
                      src={card.src}
                      alt={card.alt}
                      loading="lazy"
                      className="block w-full h-auto"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-tr from-white/15 via-transparent to-transparent pointer-events-none" />
                  </div>
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
            width={1920}
            height={400}
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