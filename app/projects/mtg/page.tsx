'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import Image from 'next/image'
import FloatingNav from '@/components/FloatingNav'
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'

// Sample data structure for your cards
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
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true })
    if ('scrollRestoration' in history) { history.scrollRestoration = 'manual' }
    window.scrollTo(0, 0)

    return () => { 
      lenis.destroy() 
    }
  }, [])

  return (
    <main className="min-h-screen bg-portfolio-red overflow-x-hidden">
      <TopNav />
      <FloatingNav />

      <div className="relative pt-[15vw] md:pt-[1vw] pb-[5vw] px-[5vw] flex flex-col items-center z-10" />

      <div className="relative w-full flex flex-col items-center z-20">
        
        {/* Top Cap */}
        <div className="w-[115vw] md:w-[106vw] leading-none relative z-00">
          <Image 
            src="/Top3.png" 
            alt="Cap Top" 
            width={1920} height={400} 
            priority 
            className="w-full h-auto block -mb-px" 
          />
        </div>

        {/* content section */}
        <div className="relative w-[115vw] md:w-[106vw] bg-white z-20 px-[8vw] py-[8vw] md:py-[5vw]">
                  
          {/* header */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-[6vw] md:gap-[4vw] mb-[12vw] md:mb-[6vw] mt-[-10vw] md:-mt-[22vw] md:ml-[4.5vw] relative z-40">
            <Image 
              src="/art/Pionta.svg" 
              alt="Pionta" 
              width={700} 
              height={180} 
              className="w-[75vw] md:w-[30vw] h-auto"
            />

            <Image 
              src="/art/X.svg" 
              alt="X" 
              width={120} 
              height={120} 
              className="w-[12vw] md:w-[5vw] h-auto"
            />

            <Image 
              src="/art/MTG.svg" 
              alt="MTG" 
              width={900} 
              height={220} 
              className="w-[80vw] md:w-[35vw] h-auto"
            />
        </div>

          {/* card grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-12 w-full max-w-8xl mx-auto">
            {mtgCards.map((card, index) => (
              <div 
                key={index} 
                className="group relative aspect-5/7 w-full cursor-pointer perspective-1000"
              >
                <div className="relative h-full w-full rounded-[1vw] overflow-hidden shadow-xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:z-50 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                  <Image 
                    src={card.src} 
                    alt={card.alt} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
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