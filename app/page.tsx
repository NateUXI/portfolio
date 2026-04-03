'use client'

import HeroScene from '../components/HeroScene'
import FloatingNav from '../components/FloatingNav'
import TopNav from '../components/TopNav'
import ScrollFloat from '../components/ScrollFloat'
import RevealOnScroll from '../components/RevealOnScroll'
import Services from '../components/Services'
import ProjectCTA from '../components/ProjectCTA'
import Footer from '@/components/Footer'
import { useLayoutEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'
import Lenis from 'lenis'
import WorkCard from '@/components/WorkCard'
import SmallHero from '@/components/SmallHero'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import TransitionLink from '@/components/TransitionLink'

export default function Home() {
  const [useSmallHero, setUseSmallHero] = useState<boolean | null>(null)

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    window.scrollTo(0, 0)

    gsap.registerPlugin(ScrollTrigger)
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 })

    lenis.stop()

    const unlockTimer = window.setTimeout(() => {
      lenis.start()
      window.scrollTo(0, 0)
      ScrollTrigger.refresh()
    }, 2750)

    const checkHeroSize = () => {
      const isSmall = window.innerWidth < 1586
      setUseSmallHero(isSmall)
      window.setTimeout(() => {
        ScrollTrigger.refresh()
      }, 200)
    }

    checkHeroSize()
    window.addEventListener('resize', checkHeroSize)

    return () => {
      window.clearTimeout(unlockTimer)
      lenis.destroy()
      window.removeEventListener('resize', checkHeroSize)
    }
  }, [])

  if (useSmallHero === null) return <div className="bg-white h-screen w-full" />

  return (
    <main key={useSmallHero ? 'mobile' : 'desktop'} className="relative overflow-x-hidden ">
      <TopNav />
      <FloatingNav />

      {useSmallHero ? (
        <SmallHero />
      ) : (
        <section className="relative h-[200vh]">
          <div className="fixed top-0 h-screen w-full overflow-hidden bg-white ">
            <HeroScene />
          </div>
        </section>
      )}

      <div id="red" className="relative z-10 bg-portfolio-red">
        {/* approach section */}
        <section
          id="approach"
          className="relative z-10 bg-portfolio-red text-white px-6 md:px-20 py-16 md:py-20 lg:py-0 overflow-hidden min-h-screen flex flex-col"
        >
          <div className="w-full lg:w-1/2 flex flex-col gap-6 relative z-30 pt-[15vh] md:pt-20 lg:pt-[20vh] mb-12">
            <div className="flex flex-col gap-4">
              {/* conditional title rendering */}
              {useSmallHero ? (
                <h2 className="font-anton text-7xl md:text-8xl lg:text-[10rem] uppercase tracking-tight leading-none text-white opacity-100">
                  My Approach
                </h2>
              ) : (
                <RevealOnScroll animationClass="reveal-left">
                  <h2 className="font-anton text-5xl md:text-8xl lg:text-[10rem] uppercase tracking-tight leading-none text-white">
                    My Approach
                  </h2>
                </RevealOnScroll>
              )}

              <div className="max-w-5xl relative">
                {/* conditional description rendering */}
                {useSmallHero ? (
                  <p className="font-overpass text-2xl md:text-4xl lg:text-6xl font-bold leading-tight italic text-white opacity-100">
                    Dedicated to redefining the digital landscape through bold engineering and a deep-seated commitment to striking, user-centric design.
                  </p>
                ) : (
                  <ScrollFloat
                    animationDuration={2}
                    ease="expo.out"
                    scrollStart="top 85%"
                    scrollEnd="top 30%"
                    stagger={0.03}
                    textClassName="font-overpass text-2xl md:text-4xl lg:text-6xl font-bold leading-tight italic text-white"
                  >
                    Dedicated to redefining the digital landscape through bold engineering and a deep-seated commitment to striking, user-centric design.
                  </ScrollFloat>
                )}
              </div>
            </div>
          </div>

          {/* spline container */}
          <div className="w-full lg:w-[75vw] h-[45vh] lg:h-full relative lg:absolute lg:top-0 lg:right-[-10vw] z-10 lg:z-0">
            <div className="w-full h-full scale-110 md:scale-100">
              <Spline
                scene="https://prod.spline.design/ebu4tTsHA2FTAyP7/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* portfolio section */}
        <section
          id="portfolio"
          className="relative z-10 h-auto min-h-screen bg-portfolio-red text-white p-6 md:p-20 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row justify-between items-center w-full mt-24 mb-10 px-4">
            <RevealOnScroll animationClass="reveal-left">
              <h2 className="font-anton text-7xl md:text-[12rem] uppercase leading-none tracking-tight">
                Selected
              </h2>
            </RevealOnScroll>
            <RevealOnScroll animationClass="reveal-right">
              <h2 className="font-anton text-7xl md:text-[12rem] uppercase leading-none tracking-tight">
                Works
              </h2>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-10xl mx-auto pb-20">
            <TransitionLink href="/work/reform">
              <WorkCard
                title="REFORM"
                category="Character Design App"
                baseImg="/Reform_base.png"
                hoverImg="/Reform_hover2.png"
                logoImg="/Reform_logo.png"
                talents={["Figma", "UX", "UI", "Next.JS", "React", "Product Design", "Branding", "Character Design", "Art Direction", "User Research", "Prototyping", "Wireframing", "User Flows", "Usability Testing", "Visual Design", "Interaction Design", "Information Architecture"]}
              />
            </TransitionLink>
            <TransitionLink href="/work/berkeleys">
              <WorkCard
                title="BERKELEYS"
                category="RESTAURANT WEBSITE"
                baseImg="/Berks_Base.PNG"
                hoverImg="/Berks_Background.PNG"
                logoImg="/berkeleys_Logo.png"
                talents={["Figma", "UX", "UI", "Next.JS", "React", "Branding", "Character Design", "Art Direction", "Prototyping", "Wireframing", "User Flows", "Usability Testing", "Visual Design", "Interaction Design", "Information Architecture"]}
              />
            </TransitionLink>
          </div>
          <ProjectCTA text="ALL WORK" />
        </section>

        <section id="services" className="relative z-10">
          <Services />
        </section>

        <section id="footer">
          <Footer />
        </section>
      </div>
    </main>
  )
}