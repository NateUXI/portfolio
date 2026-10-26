'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import FloatingNav from '@/components/FloatingNav'
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'
import LinkBanner from '@/components/LinkBanner'
import TalentBar from '@/components/TalentBar'
import RevealOnScroll from '@/components/RevealOnScroll'

export default function ProjectPage({}) {
  const problemSectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress: problemProgress } = useScroll({
    target: problemSectionRef,
    offset: ['start end', 'end start'],
  })
  const referenceOpacity = useTransform(problemProgress, [0, 0.4, 0.6, 1], [1, 1, 0, 0])
  const resultOpacity = useTransform(problemProgress, [0, 0.4, 0.6, 1], [0, 0, 1, 1])

  const talents = [
    "Design Direction", "Illustration", "UI", "UX", 
    "Prototyping", "Interaction Design", "Motion Design", "Web Design", "Front-end", "React", "Tailwind CSS", "Next.js", "TypeScript", 
    "Image Processing", "Account Management", "SAAS", "Product Strategy", "Research", 
    "Branding", "Accessibility", "Cloud Management", "Mobile Design", "Responsive Interfaces", "User Testing", "Figma"
  ]

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true })
    if ('scrollRestoration' in history) { history.scrollRestoration = 'manual' }
    window.scrollTo(0, 0)

    return () => lenis.destroy()
  }, [])

  return (
    <main className="min-h-screen bg-linear-to-b from-portfolio-red from-1% to-[#33A1D0] md: to-4% overflow-x-hidden">
      <TopNav />
      <FloatingNav />

      {/* Synchronized Spacer */}
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
            <div className="relative w-[45vw] md:w-[25vw] aspect-square rounded-full overflow-hidden border-[2vw] md:border-[1.5vw] border-[#33A1D0] shadow-xl bg-white">
              <Image src="/Reform_icon.png" alt="Reform Logo" fill className="object-cover p-0" />
            </div>
            
            <div className="flex-1 text-center md:text-left w-full">
              <h2 className="font-anton text-[18vw] md:text-[13vw] font-inter font-black tracking-tighter text-[#33A1D0] leading-none -mt-[4vw] md:-mt-[1vw] uppercase">Reform</h2>
              <h3 className="font-bold text-[4vw] md:text-[1.8vw] uppercase mb-2 text-[#33A1D0] tracking-tight">Summary</h3>
              <div className="bg-linear-to-b from-[#33A1D0] to-[#33A470] text-white p-6 md:p-8 rounded-4xl md:rounded-3xl shadow-lg">
                <p className="text-[3.8vw] md:text-[1.2vw] leading-snug">
                  A character design focused image board app created to help writers design and create across platforms, enabling writing and reference both on the go and in the studio. Currently being built with EXPO with releases for IOS, Android, and Web.
                </p>
              </div>
            </div>
          </div>

          <TalentBar
            talents={talents}
            background="linear-gradient(to right, #33A1D0, #33A470)"
          />

          <RevealOnScroll
            animation="fade"
            className="mb-[6vw] md:mb-[3vw]"
          >
            <LinkBanner
              href="https://use-reform.com"
              logoSrc="/REFORM_LOGO.svg"
              title="REFORM"
              backgroundImage="/Reform_hover.png"
            />
          </RevealOnScroll>

          {/* LIVE PROTOTYPE SECTION */}
          <div className="flex flex-col md:flex-row items-center gap-[8vw] md:gap-[4vw] mb-[8vw] md:mb-[5vw]">
            
            {/* Left Column: Headings & Text */}
            <div className="flex-1 text-center md:text-left w-full">
              <RevealOnScroll animation="left">
                <h2 className="font-anton text-[12vw] md:text-[9vw] uppercase leading-none bg-linear-to-b from-[#33A1D0] to-[#33A470] bg-clip-text text-transparent">
                  Live Prototype
                </h2>
              </RevealOnScroll>
              <h3 className="font-bold text-[4vw] md:text-[2vw] uppercase mt-2 mb-4 text-[#33A1D0] tracking-tight">
                Built in Figma
              </h3>

              <div className="bg-[#33A1D0] text-white p-6 md:p-8 rounded-3xl md:rounded-3xl shadow-lg mb-6">
                <p className="text-[3.8vw] md:text-[1.5vw] font-semibold leading-relaxed tracking-tight">
                  This interactive Figma prototype captures the earliest version of REFORM's user experience and interface design. It was the starting point for a much more ambitious product: a flexible, cross-platform creative workspace built for designers. Since this initial prototype, REFORM has evolved significantly, with expanded functionality, and a working application built for web, desktop, and mobile.
                </p>
              </div>

              <p className="text-[3.5vw] md:text-[1.5vw] font-bold leading-relaxed tracking-tight text-[#33A1D0]">
                REFORM is now approaching launch, with mobile app approvals underway. The current product is built with React Native across platforms, bringing the same creative workspace to wherever inspiration happens.
              </p>
            </div>

            {/* Right Column: Mobile Frame Device Wrapper */}
            <div className="shrink-0 relative w-[67.5vw] md:w-[23.5vw] aspect-9/18.5 rounded-[3.2rem] md:rounded-[4.5rem] p-[2%] bg-linear-to-b from-[#33A1D0] to-[#33A470] shadow-2xl">
              <div className="relative w-full h-full rounded-[2.6rem] md:rounded-[3.1rem] overflow-hidden">
                <iframe
                  src="https://embed.figma.com/proto/wAQzY4BOvRqzBwqdR2frUx/RefLow--Copy-?node-id=205-388&p=f&viewport=-216%2C16%2C1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=205%3A388&embed-host=share&hide-ui=1"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[128%] h-[118%] border-0 scale-98 pointer-events-auto"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

          </div>

          {/* THE PROBLEM SECTION */}
          <section
            ref={problemSectionRef}
            className="mb-[8vw] md:mb-[5vw] grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] items-center gap-[8vw] md:gap-[4vw]"
          >
            <div className="relative w-full max-w-[78vw] md:max-w-none aspect-4/5 mx-auto md:mx-0 overflow-hidden rounded-4xl md:rounded-[3rem] shadow-2xl">
              <motion.div className="absolute inset-0" style={{ opacity: referenceOpacity }}>
                <Image
                  src="/Reference.png"
                  alt="Original reference image"
                  fill
                  sizes="(max-width: 768px) 78vw, 34vw"
                  className="object-cover"
                />
              </motion.div>
              <motion.div className="absolute inset-0" style={{ opacity: resultOpacity }}>
                <Image
                  src="/Result.png"
                  alt="Artwork created from the reference"
                  fill
                  sizes="(max-width: 768px) 78vw, 34vw"
                  className="object-cover"
                />
              </motion.div>
            </div>

            <div className="text-right">
              <RevealOnScroll animation="right">
                <h2 className="font-anton text-[12vw] md:text-[9vw] mb-5 uppercase leading-none bg-linear-to-b from-[#33A1D0] to-[#33A470] bg-clip-text text-transparent">
                  The Problem
                </h2>
              </RevealOnScroll>
            {/* REFORM was created to bridge that gap, giving designers a way to use their reference boards on the go and have their ideas ready when they return to the studio. */}
              <div className="bg-[#33A1D0] text-white p-6 md:p-8 rounded-3xl shadow-lg mb-5">
                <p className="text-[3.8vw] md:text-[1.5vw] font-semibold leading-relaxed tracking-tight">
                  As a character and narrative designer, I draw inspiration from the real world and the things I notice on hikes. But I often found myself forgetting the photos I took—or struggling to get them from my phone onto my computer and into my image boards.
                </p>
              </div>
              <p className="text-[3.5vw] md:text-[1.5vw] font-bold leading-relaxed tracking-tight text-[#33A1D0]">
                REFORM was created to bridge that gap, giving designers a way to use their reference boards on the go and have their ideas ready when they return to the studio.
              </p>
            </div>
          </section>

          {/* UNDERSTANDING USER NEEDS */}
          <section className="mb-[8vw] md:mb-[5vw]">
            <RevealOnScroll animation="left">
              <h2 className="font-anton text-left text-[12vw] md:text-[9vw] mb-[5vw] md:mb-[3vw] uppercase leading-none bg-linear-to-b from-[#33A1D0] to-[#33A470] bg-clip-text text-transparent">
                USER NEEDS
              </h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-[8vw] md:gap-[4vw]">
              <div className="rounded-3xl bg-[#33A1D0] p-6 md:p-8 text-white shadow-lg">
                <p className="mb-5 text-[3.8vw] md:text-[1.5vw] font-semibold leading-relaxed tracking-tight">
                  Through speaking and collaborating with designers across multiple creative mediums, REFORM&apos;s capabilities and focus expanded to be the best for any artistic endeavor.
                </p>
                <p className="mb-5 text-[3.8vw] md:text-[1.5vw] font-semibold leading-relaxed tracking-tight">
                  The goal was to make collecting references, shaping a personal workspace, and returning to your work across devices feel simple without getting in the way of the creative process.
                </p>
                <p className="mb-5 text-[3.8vw] md:text-[1.5vw] font-semibold leading-relaxed tracking-tight">
                  Alongside these identifiers with the survey work done, User personas were developed to keep track of user needs and behaviors throughout the design process.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[4vw] md:text-[2vw] uppercase mb-4 text-[#33A1D0] tracking-tight">
                  Key User Needs
                </h3>
                <ul className="space-y-3 text-[3.8vw] md:text-[1.5vw] font-semibold leading-relaxed tracking-tight">
                  <li className="rounded-3xl bg-linear-to-r from-[#33A1D0] to-[#33A470] p-5 md:p-6 text-white shadow-lg transition-transform duration-300 ease-out hover:translate-x-2">
                    Quickly collect and organize references
                  </li>
                  <li className="rounded-3xl bg-linear-to-r from-[#33A1D0] to-[#33A470] p-5 md:p-6 text-white shadow-lg transition-transform duration-300 ease-out hover:translate-x-2">
                    Full creative control over board layout and style
                  </li>
                  <li className="rounded-3xl bg-linear-to-r from-[#33A1D0] to-[#33A470] p-5 md:p-6 text-white shadow-lg transition-transform duration-300 ease-out hover:translate-x-2">
                    Access work across all devices
                  </li>
                  <li className="rounded-3xl bg-linear-to-r from-[#33A1D0] to-[#33A470] p-5 md:p-6 text-white shadow-lg transition-transform duration-300 ease-out hover:translate-x-2">
                    Retain easy navigation and light menus
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-[6vw] md:mb-[4vw]">
             <Image 
               src="/Persona1.png" 
               alt="Branding Board" 
               width={1200} height={800} 
               unoptimized
               className="w-full h-auto rounded-4xl"
             />
          </div>

          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-[6vw] md:mb-[4vw]">
             <Image 
               src="/Persona2.png" 
               alt="Branding Board" 
               width={1200} height={800} 
               unoptimized
               className="w-full h-auto rounded-4xl"
             />
          </div>

          {/* DESIGN DECISIONS */}
          <h2 className="font-anton text-center text-[12vw] md:text-[9vw] mb-[5vw] md:mb-[3vw] uppercase leading-none bg-linear-to-b from-[#33A1D0] to-[#33A470] bg-clip-text text-transparent">
            Design Decisions
          </h2>

          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-[6vw] md:mb-[4vw]">
             <Image 
               src="/modal_showcase.png" 
               alt="Branding Board" 
               width={1200} height={800} 
               unoptimized
               className="w-full h-auto rounded-4xl"
             />
          </div>

          {/* MOBILE SHOWCASE */}
          <div className="w-[92%] md:w-[88%] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-[6vw] md:mb-[4vw]">
            {["/Reform_Home.png", "/Reform_login.png", "/Reform_Create_Tab.png", "/Reform_board.png"].map((src, i) => (
              <div 
                key={i}
                className="relative aspect-9/19 rounded-4xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500 ease-out"
              >
                <Image src={src} alt={`Screen ${i}`} fill unoptimized className="object-cover" />
              </div>
            ))}
          </div>

          {/* BRANDING ASSETS  */}
          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-[6vw] md:mb-[4vw]">
             <Image 
               src="/Reform_promo.png" 
               alt="Branding Board" 
               width={1200} height={800} 
               unoptimized
               className="w-full h-auto rounded-4xl"
             />
          </div>

          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-[6vw] md:mb-[4vw]">
             <Image 
               src="/UseFlow.png" 
               alt="Branding Board" 
               width={1200} height={800} 
               unoptimized
               className="w-full h-auto rounded-4xl"
             />
          </div>

          {/* PERSONA TITLE */}
          <h3 className="font-anton text-[#33A1D0] text-[7vw] md:text-[8vw] uppercase text-center mt-[8vw] md:mt-[5vw] mb-[5vw] md:mb-[3vw]">
            Brand Style Board
          </h3>

          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-[6vw] md:mb-[4vw]">
             <Image 
               src="/Colors.png" 
               alt="Branding Board" 
               width={1200} height={800} 
               unoptimized
               className="w-full h-auto rounded-4xl"
             />
          </div>

        </div>

        {/* Bottom Cap*/}
        <div className="w-[105vw] md:w-[106vw] leading-none relative z-30">
          <Image 
            src="/Bottom2.png" 
            alt="Cap Bottom" 
            width={1920} height={400} 
            className="w-full h-auto block -mt-1" 
          />
        </div>

        <section id="footer" className="w-full mt-[10vw] md:mt-[5vw]">
          <Footer gradientStartColor="#33A1D0" />
        </section>
      </div>
    </main>
  )
}