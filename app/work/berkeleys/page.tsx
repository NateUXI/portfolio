'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import Image from 'next/image'
import FloatingNav from '@/components/FloatingNav'
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'
import TalentBar from '@/components/TalentBar'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'

export default function ProjectPage({ }) {

  const talents = [
    "Art Direction", "Character Design", "Illustration", "UI", "UX", 
    "Prototyping", "Interaction Design", "Motion Design", "Web Design", 
    "Front-end", "React", "Next.js", "TypeScript", "Product Strategy", 
    "Research", "Branding"
  ]

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true })
    if ('scrollRestoration' in history) { history.scrollRestoration = 'manual' }
    window.scrollTo(0, 0)

    return () => lenis.destroy()
  }, [])

  return (
    <main className="min-h-screen bg-linear-to-b from-portfolio-red from-1% to-[#046797] to-4% overflow-x-hidden">
      <TopNav />
      <FloatingNav />

      {/* Spacer for Top Nav */}
      <div id="red2" className="relative pt-[15vw] md:pt-[1vw] pb-[5vw] px-[5vw] flex flex-col items-center z-10">
      </div>

      <div className="relative w-full flex flex-col items-center z-20">
        
        {/* Top Cap - Scaled for Mobile Visibility */}
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
            <div className="relative w-[45vw] md:w-[25vw] aspect-square rounded-full overflow-hidden border-[2vw] md:border-[1.5vw] border-[#046797] shadow-xl bg-white">
              <Image src="/Berks_icon.png" alt="Berkeleys Logo" fill className="object-cover p-0" />
            </div>
            
            <div className="flex-1 text-center md:text-left w-full">
              <h2 className="font-anton text-[18vw] md:text-[13.5vw] text-[#046797] leading-none -mt-[4vw] md:-mt-[1vw] uppercase">Berkeleys</h2>
              <h3 className="font-bold text-[4vw] md:text-[1.8vw] uppercase mb-2 text-[#046797] tracking-tight">Summary</h3>
              <div className="bg-[#046797] text-white p-6 md:p-8 rounded-4xl md:rounded-3xl shadow-lg">
                <p className="text-[3.8vw] md:text-[1.2vw] leading-snug">
                  Refreshing a local favorite with a focus on warmth and accessibility. By highlighting the restaurant's existing brand identity and vibrant food photography, the design translates the casual, welcoming energy of the dining room to the web.
                </p>
              </div>
            </div>
          </div>

          <TalentBar
            talents={talents}
            background="#046797"
          />
          
          {/* BRANDING ASSETS - BEFORE/AFTER */}
          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-[6vw] md:mb-[4vw]">
            <BeforeAfterSlider
              beforeSrc="/Berks_Old.PNG"
              afterSrc="/Berks_home.png"
              beforeAlt="Old Design"
              afterAlt="New Design"
            />
          </div>

          {/* VIDEO ASSET */}
          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-[6vw] md:mb-[4vw]">
            <video 
              src="/menu_preview.mp4" 
              className="w-full h-auto"
              autoPlay loop muted playsInline
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* BRANDING ASSETS */}
          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-[6vw] md:mb-[4vw]">
             <Image 
               src="/Berks_home.png" 
               alt="Home View" 
               width={1200} height={800} 
               unoptimized
               className="w-full h-auto"
             />
          </div>

          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl bg-black">
             <Image 
               src="/Berks_colors.png" 
               alt="Colors View" 
               width={1200} height={800} 
               unoptimized
               className="w-full h-auto"
             />
          </div>

          {/* UX SHOWCASE TITLE */}
          <h3 className="font-anton text-[#046797] text-[7vw] md:text-[8vw] uppercase text-center mt-[8vw] md:mt-[5vw] mb-[5vw] md:mb-[3vw]">
            Persona Case Study
          </h3>

          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl bg-black">
             <Image 
               src="/Berks_Persona1.png" 
               alt="Berks Persona" 
               width={1200} height={800} 
               unoptimized
               className="w-full h-auto"
             />
          </div>

          {/* UX SHOWCASE TITLE */}
          <h3 className="font-anton text-[#046797] text-[7vw] md:text-[8vw] uppercase text-center mt-[8vw] md:mt-[5vw] mb-[5vw] md:mb-[3vw]">
            UX Showcase
          </h3>

          {/* UX SHOWCASE ASSETS */}
          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-[6vw] md:mb-[4vw]">
             <Image 
               src="/Berks_Low_Home.png" 
               alt="Home Page Low Fidelity" 
               width={1200} height={800} 
               unoptimized
               className="w-full h-auto"
             />
          </div>

          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-[6vw] md:mb-[4vw]">
             <Image 
               src="/Berks_Low_About.png" 
               alt="About Page Low Fidelity" 
               width={1200} height={800} 
               unoptimized
               className="w-full h-auto"
             />
          </div>

          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-[6vw] md:mb-[4vw]">
             <Image 
               src="/Berks_Low_Menu.png" 
               alt="Menu Page Low Fidelity" 
               width={1200} height={800} 
               unoptimized
               className="w-full h-auto"
             />
          </div>

          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl">
             <Image 
               src="/Berks_Low_Visit.png" 
               alt="Visit Page Low Fidelity" 
               width={1200} height={800} 
               unoptimized
               className="w-full h-auto"
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
          <Footer gradientStartColor="#046797" />
        </section>
      </div>
    </main>
  )
}