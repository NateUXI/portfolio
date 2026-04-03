'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import Image from 'next/image'
import FloatingNav from '@/components/FloatingNav'
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'
import { motion, useScroll, useTransform } from 'framer-motion'
import WorkCard from '@/components/WorkCard'
import TransitionLink from '@/components/TransitionLink'

// Row Component for the Infinite Scroll
const ImageRow = ({
    images,
    speed = 20,
    reverse = false,
    delay = 0,
  }: {
    images: string[];
    speed?: number;
    reverse?: boolean;
    delay?: number;
  }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 0.4, scale: 1 }}
      transition={{ duration: 1.5, delay, ease: "easeOut" }}
      className="flex whitespace-nowrap overflow-hidden py-2"
    >
      <motion.div 
        className="flex gap-4 px-2"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {[...images, ...images].map((src, idx) => (
          /* Increased mobile width from 25vw to 50vw for better visibility */
          <div key={idx} className="relative w-[50vw] md:w-[25vw] aspect-16/10 shrink-0 rounded-2xl overflow-hidden border-2 border-black/10 shadow-lg">
            <Image 
              src={src} 
              alt="Gallery item" 
              fill 
              sizes="(max-width: 768px) 50vw, 25vw" 
              className="object-cover" 
            />
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function WorkPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 1000]);

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });
    if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
    window.scrollTo(0, 0);
    return () => { lenis.destroy(); };
  }, []);

  const row1 = ["/Tavern_Base.PNG", "/Reform_base.png", "/Berks_base.png", "/GRID_base.png"];
  const row2 = ["/Reform_hover2.png", "/Tavern_Hover.png", "/GRID_hover.png", "/Berks_background.png"];

  return (
    <main className="min-h-screen bg-portfolio-red overflow-x-hidden">
      <TopNav />
      <FloatingNav />

      {/* Hero Section - Added responsive padding-top to give mobile title breathing room */}
      <div id="red2" className="relative pt-[40vw] md:pt-[15vw] pb-[15vw] md:pb-[8vw] px-[5vw] flex flex-col items-center z-10">
        
        {/* BACKGROUND GALLERY - Adjusted scale and rotation for mobile impact */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center pointer-events-none scale-125 md:scale-110 -rotate-3">
          <ImageRow images={row1} speed={30} delay={0.2} />
          <ImageRow images={row2} speed={25} reverse={true} delay={0.4} />
          <ImageRow images={row1} speed={35} delay={0.6} />
        </div>

        <motion.h1
          style={{ y, transform: 'translateZ(0)' }}
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut",
            type: "spring",
            stiffness: 70,
            damping: 20,
          }}
          /* Scaled mobile text to 18vw and adjusted leading for tighter stacking */
          className="relative z-10 font-anton text-[18vw] md:text-[13vw] text-center uppercase text-white tracking-tight leading-none md:leading-[0.8] drop-shadow-2xl"
        >
          Selected <br className="md:hidden" /> Works
        </motion.h1>
      </div>

      {/* THE STICKER WALL */}
      <div className="relative w-full flex flex-col items-center z-20">
        
        {/* Top Cap - Sync with project page width */}
        <div className="w-[115vw] md:w-[106vw] leading-none relative z-30">
          <Image 
            src="/Top3.png"
            alt="Cap Top"
            width={1000}
            height={200}
            priority
            className="w-full h-auto block -mb-px"
          />
        </div>

        {/* White Section */}
        <div className="relative w-[115vw] md:w-[106vw] bg-white min-h-[100vw] z-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[12vw] md:gap-[5vw] px-[10vw] md:px-[5vw] pt-[15vw] md:pt-[10vw]">
            <div className="-rotate-1">
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
            </div>

            <div className="rotate-2">
              <TransitionLink href="/work/berkeleys">
                <WorkCard
                  title="BERKELEYS"
                  category="RESTAURANT WEBSITE"
                  baseImg="/Berks_base.png"
                  hoverImg="/Berks_background.png"
                  logoImg="/Berkeleys_Logo.png"
                  talents={["Figma", "UX", "UI", "Next.JS", "React", "Branding", "Character Design", "Art Direction", "Prototyping", "Wireframing", "User Flows", "Usability Testing", "Visual Design", "Interaction Design", "Information Architecture"]}
                />
              </TransitionLink>
            </div>

            <div className="rotate-2">
              <TransitionLink href="/work/tavern">
                <WorkCard
                  title="THE TAVERN"
                  category="BAR WEBSITE"
                  baseImg="/Tavern_Base.PNG"
                  hoverImg="/Tavern_Hover.png"
                  logoImg="/Tavern_logo2.PNG"
                  talents={["UX", "UI", "Branding", "Product Design", "Art Direction", "User Research", "Prototyping", "wireframing", "Desktop Development"]}
                />
              </TransitionLink>
            </div>

            <div className="-rotate-1">
              <TransitionLink href="/work/grid">
                <WorkCard
                  title="GRID WAFFLES"
                  category="FAST FOOD WEBSITE"
                  baseImg="/GRID_base.png"
                  hoverImg="/GRID_hover.png"
                  logoImg="/GRID_Logo2.png"
                  talents={["UX", "UI", "Branding", "Product Design", "Art Direction", "User Research", "Prototyping", "wireframing", "Mobile Development, Figma"]}
                />
              </TransitionLink>
            </div>
          </div>
        </div>

        {/* Bottom Cap */}
        <div className="w-[106vw] md:w-[106vw] leading-none relative z-30">
          <Image 
            src="/Bottom2.png"
            alt="Cap Bottom"
            width={1000}
            height={200}
            className="w-full h-auto block -mt-1.25"
          />
        </div>

        <section id="footer" className="w-full mt-[15vw] md:mt-[10vw]">
          <Footer />
        </section>

      </div>
    </main>
  )
}