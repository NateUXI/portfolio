'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import Image from 'next/image'
import FloatingNav from '@/components/FloatingNav'
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'
import TalentBar from '@/components/TalentBar'

export default function ProjectPage({ }) {
  const talents = [
    "Art Direction", "Packaging", "Illustration", "Concept Art", "UI", "UX",
    "Prototyping", "Product Design", "Web Design", "Front-end", "React",
    "Next.js", "TypeScript", "Image Processing", "Product Strategy",
    "Research", "Branding", "Accessibility",
  ]

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true })
    if ('scrollRestoration' in history) { history.scrollRestoration = 'manual' }
    window.scrollTo(0, 0)

    return () => { 
      lenis.destroy() 
    }
  }, [])

  return (
    <main className="min-h-screen bg-linear-to-b from-portfolio-red from-1% to-[#009DDC] to-4% overflow-x-hidden">
      <TopNav />
      <FloatingNav />

      {/* Spacer for Top Nav */}
      <div id="red2" className="relative pt-[15vw] md:pt-[1vw] pb-[5vw] px-[5vw] flex flex-col items-center z-10">
      </div>

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

        {/* WHITE CONTENT SECTION */}
        <div className="relative w-[115vw] md:w-[106vw] bg-white z-20 px-[10vw] md:px-[8vw] py-[8vw] md:py-[5vw]">
          
          {/* HEADER BLOCK */}
          <div className="flex flex-col md:flex-row items-center gap-[8vw] md:gap-[4vw] mb-[6vw] md:mb-[3vw] -mt-[24vw] md:-mt-[25vw] md:ml-[2vw] relative z-40">
            {/* Logo Circle */}
            <div className="relative w-[45vw] md:w-[25vw] aspect-square rounded-full overflow-hidden border-[2vw] md:border-[1.5vw] border-[#009DDC] shadow-xl bg-[#009DDC]">
              <Image src="/GRID_icon.png" alt="GRID Logo" fill className="object-cover p-0" />
            </div>
            
            <div className="flex-1 text-center md:text-left w-full">
              <h2 className="font-anton text-[18vw] md:text-[13.5vw] text-[#009DDC] leading-none -mt-[4vw] md:-mt-[1vw] uppercase">grid</h2>
              <h3 className="font-bold text-[4vw] md:text-[1.8vw] uppercase mb-2 text-[#009DDC] tracking-tight">Summary</h3>
              <div className="bg-[#009DDC] text-white p-6 md:p-8 rounded-4xl md:rounded-3xl shadow-lg">
                <p className="text-[3.8vw] md:text-[1.2vw] leading-snug">
                  A concept app for a potential fastfood waffle restaurant, inspired by the playful and bold aesthetics of the 80s and 90s with a modern twist. The branding features a dandelion and blue palette for high visibility.
                </p>
              </div>
            </div>
          </div>

          <TalentBar talents={talents} background="#009DDC" />

          {/* BRANDING ASSETS */}
          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-[6vw] md:mb-[4vw]">
             <Image 
               src="/GRID_app2.png" 
               alt="Branding Board" 
               width={1200} height={800} 
               unoptimized
               className="w-full h-auto"
             />
          </div>

          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-[6vw] md:mb-[4vw]">
             <Image 
               src="/GRID_colors.PNG" 
               alt="Branding Board" 
               width={1200} height={800} 
               className="w-full h-auto"
               unoptimized
             />
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
          <Footer gradientStartColor="#009DDC" />
        </section>
      </div>
    </main>
  )
}