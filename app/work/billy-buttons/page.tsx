'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import FloatingNav from '@/components/FloatingNav'
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'
import TalentBar from '@/components/TalentBar'
import LinkBanner from '@/components/LinkBanner'
import Lenis from 'lenis'

export default function BillyButtonsPage() {
  const talents = ['Brand Concept', 'Showcase in Progress', 'Visual Identity', 'Ecommerce Design', 'Brand Design', 'Subscription Service Concept', 'Figma', 'Web Design', 'Illustration', 'React', 'User Experience Researching']

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true })
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    return () => lenis.destroy()
  }, [])

  return (
    <main className="min-h-screen bg-linear-to-b from-portfolio-red from-1% to-[#D52456] to-4% overflow-x-hidden">
      <TopNav />
      <FloatingNav />

      <div id="red2" className="relative pt-[15vw] md:pt-[1vw] pb-[5vw] px-[5vw] flex flex-col items-center z-10">
      </div>

      <div className="relative w-full flex flex-col items-center z-20">
        <div className="w-[115vw] md:w-[106vw] leading-none relative z-00">
          <Image
            src="/Top3.png"
            alt=""
            width={1920}
            height={400}
            priority
            className="w-full h-auto block -mb-px"
          />
        </div>

        <div className="relative w-[115vw] md:w-[106vw] bg-white z-20 px-[10vw] md:px-[8vw] py-[8vw] md:py-[5vw]">
          <div className="flex flex-col md:flex-row items-center gap-[8vw] md:gap-[4vw] mb-[6vw] md:mb-[3vw] -mt-[24vw] md:-mt-[25vw] md:ml-[2vw] relative z-40">
            {/* Logo Circle */}
              <div className="relative w-[45vw] md:w-[25vw] aspect-square rounded-full overflow-hidden border-[2vw] md:border-[1.5vw] border-[#D52456] shadow-xl bg-[#D52456]">
                <Image src="/Billy_Buttons_Icon.png" alt="Billy Buttons Logo" fill className="object-cover p-0" />
              </div>

            <div className="flex-1 text-center md:text-left w-full">
              <h2 className="font-anton text-[13vw] md:text-[9vw] text-[#D52456] leading-none -mt-[4vw] md:-mt-[1vw] uppercase">
                Billy Buttons
              </h2>
              <h3 className="font-bold text-[4vw] md:text-[1.8vw] uppercase mb-2 text-[#D52456] tracking-tight">
                Summary
              </h3>
              <div className="bg-[#D52456] text-white p-6 md:p-8 rounded-4xl md:rounded-3xl shadow-lg">
                <p className="text-[3.8vw] md:text-[1.2vw] leading-snug">
                  A brand concept showcase for Billy Buttons. Visual identity and project details will be added as the concept develops.
                </p>
              </div>
            </div>
          </div>

          <TalentBar
            talents={talents}
            background="linear-gradient(to right, #E886A1, #D52456)"
          />

          <LinkBanner
            href="/work/billy-buttons/demo"
            openInNewTab={false}
            invertLogo={false}
            logoSrc="/billy-demo/assets/Logo.svg"
            logoAlt="Billy Buttons"
            title=""
            ctaText="Website Demo"
            backgroundImage="/Billy_Buttons_hover1.png"
            gradientFrom="rgba(246, 205, 216, 0.85)"
            gradientTo="#D52456"
            buttonGradientFrom="#E886A1"
            buttonGradientTo="#E886A1"
            className="mb-[6vw] md:mb-[3vw]"
          />

          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-[6vw] md:mb-[4vw] aspect-3/2 bg-[#D52456] text-white flex flex-col items-center justify-center text-center px-6">
            <span className="font-anton text-[9vw] md:text-[5vw] uppercase leading-none">Billy Buttons</span>
            <span className="mt-4 text-[3vw] md:text-base font-bold uppercase tracking-[0.25em]">Branding assets coming soon</span>
          </div>

          <div className="w-[92%] md:w-[88%] mx-auto rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-[6vw] md:mb-[4vw] aspect-3/2 bg-[#f4f1ec] text-[#D52456] flex flex-col items-center justify-center text-center px-6">
            <span className="font-anton text-[8vw] md:text-[4vw] uppercase leading-none">Showcase in progress</span>
            <span className="mt-4 text-[3vw] md:text-base font-bold uppercase tracking-[0.25em]">Project visuals will appear here</span>
          </div>
        </div>

        <div className="w-[105vw] md:w-[106vw] leading-none relative z-30">
          <Image
            src="/Bottom2.png"
            alt=""
            width={1920}
            height={400}
            className="w-full h-auto block -mt-1"
          />
        </div>

        <section id="footer" className="w-full mt-[10vw] md:mt-[5vw]">
          <Footer gradientStartColor="#D52456"/>
        </section>
      </div>
    </main>
  )
}
