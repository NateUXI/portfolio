'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import Image from 'next/image'
import FloatingNav from '@/components/FloatingNav'
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'

const mtgCards = [
  { src: '/art/Chapter1.png', alt: 'Chapter 1' },
  { src: '/art/Chapter2.jpg', alt: 'Chapter 2' },
  { src: '/art/Chapter3.png', alt: 'Chapter 3' },
  { src: '/art/SSS_Guitar.png', alt: 'SSS Guitar' },
  { src: '/art/Chapter4.png', alt: 'Chapter 4' },
  { src: '/art/Chapter5.png', alt: 'Chapter 5' },
  { src: '/art/Chapter6.jpg', alt: 'Chapter 6' },
  { src: '/art/Chapter7.png', alt: 'Chapter 7' },
  { src: '/art/RR_Poster.png', alt: 'RR Poster' },
  { src: '/art/Pionta_Poster.png', alt: 'Pionta Poster' },
]

export default function ProjectPage() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true })

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    window.scrollTo(0, 0)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <main className="min-h-screen bg-portfolio-red overflow-x-hidden">
      <TopNav />
      <FloatingNav />

      {/* Spacer */}
      <div className="relative pt-[15vw] md:pt-[1vw] pb-[5vw] px-[5vw] flex flex-col items-center z-10" />

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

        {/* white content section */}
        <div className="relative w-full md:w-[106vw] bg-white z-20 px-[4vw] md:px-[8vw] py-[8vw] md:py-[5vw]">
          
          {/* header */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-[4vw] mb-[8vw] md:mb-[6vw] -mt-[24vw] md:-mt-[22vw] md:ml-[4.5vw] relative z-40">
            <Image
              src="/art/Royal.svg"
              alt="Royal Runaway"
              width={700}
              height={180}
              className="w-[80vw] md:w-[50vw] h-auto"
            />
          </div>

          {/* image gallery */}
          <div className="columns-2 md:columns-3 xl:columns-4 gap-6 md:gap-8 [column-fill:balance]">
            {mtgCards.map((card, index) => (
              <div
                key={index}
                className="mb-6 md:mb-8 break-inside-avoid"
              >
                <div className="group relative w-full">
                  
                  <div className="relative overflow-hidden rounded-[1.25vw] bg-[#f4f4f4] shadow-lg transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02] group-hover:shadow-2xl">
                    
                    <img
                      src={card.src}
                      alt={card.alt}
                      loading="lazy"
                      className="block w-full h-auto"
                    />

                    {/* hover shine */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-tr from-white/15 via-transparent to-transparent pointer-events-none" />
                  
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* bottom cap */}
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