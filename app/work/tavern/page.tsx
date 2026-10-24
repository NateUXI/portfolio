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
    "Art Direction", "Character Design", "Illustration", "Concept Art", "UI", "UX",
    "Prototyping", "Interaction Design", "Motion Design", "Animation", "3D Modeling",
    "Shaders", "Web Design", "Front-end", "React", "Next.js", "TypeScript",
    "Image Processing", "Scanning", "Tooling", "Product Strategy", "Research",
    "Branding", "Photography", "Accessibility",
  ]

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true })
    if ('scrollRestoration' in history) { history.scrollRestoration = 'manual' }
    window.scrollTo(0, 0)

    return () => lenis.destroy()
  }, [])

  return (
    <main className="min-h-screen bg-linear-to-b from-portfolio-red from-1% to-[#000000] to-4% overflow-x-hidden">
      <TopNav />
      <FloatingNav />

      {/* Sync Spacer */}
      <div id="red2" className="relative pt-[15vw] md:pt-[1vw] pb-[5vw] px-[5vw] flex flex-col items-center z-10">
      </div>

      <div className="relative w-full flex flex-col items-center z-20">
        
        {/* Top Cap - Sync with 115vw/106vw */}
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
          
          {/* HEADER BLOCK - Sync with Berkeleys layout and margins */}
          <div className="flex flex-col md:flex-row items-center gap-[8vw] md:gap-[4vw] mb-[6vw] md:mb-[3vw] -mt-[24vw] md:-mt-[25vw] md:ml-[2vw] relative z-40">
            {/* Logo Circle */}
            <div className="relative w-[45vw] md:w-[25vw] aspect-square rounded-full overflow-hidden border-[2vw] md:border-[1.5vw] border-[#000000] shadow-xl bg-[#000000]">
              <Image src="/Tavern_icon.png" alt="Tavern Logo" fill className="object-cover p-0" />
            </div>
            
            <div className="flex-1 text-center md:text-left w-full">
              <h2 className="font-anton text-[18vw] md:text-[13.5vw] text-[#000000] leading-none -mt-[4vw] md:-mt-[1vw] uppercase">tavern</h2>
              <h3 className="font-bold text-[4vw] md:text-[1.8vw] uppercase mb-2 text-[#000000] tracking-tight">Summary</h3>
              <div className="bg-[#000000] text-white p-6 md:p-8 rounded-4xl md:rounded-3xl shadow-lg">
                <p className="text-[3.8vw] md:text-[1.2vw] leading-snug">
                  A fantasy metal inspired bar website concept built to establish an artistic and functional delivery of all things magic for The Tavern. Includes full branding suite and mobile-first design.
                </p>
              </div>
            </div>
          </div>

          <TalentBar
            talents={talents}
            background="#000000"
          />

          {/* ASSETS */}
          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-[6vw] md:mb-[4vw]">
             <Image 
             src="/Tavern_top.png" 
             alt="Tavern Top" 
             width={1200} 
             height={800} 
             unoptimized
             className="w-full h-auto" />
          </div>

          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-[6vw] md:mb-[4vw]">
             <Image 
             src="/Tavern_philosophy.png" 
             alt="Philosophy" 
             width={1200} 
             height={800} 
             unoptimized
             className="w-full h-auto" />
          </div>

          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-[6vw] md:mb-[4vw]">
             <Image src="/Tavern_menu.png" 
             alt="Menu" 
             width={1200} 
             height={800} 
             unoptimized 
             className="w-full h-auto" />
          </div>

          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-[6vw] md:mb-[4vw]">
             <Image 
             src="/Tavern_colors.png" 
             alt="Colors" 
             width={1200} 
             height={800} 
             unoptimized 
             className="w-full h-auto" />
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
          <Footer gradientStartColor="#000000" />
        </section>
      </div>
    </main>
  )
}