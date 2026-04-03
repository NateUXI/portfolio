'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import Image from 'next/image'
import FloatingNav from '@/components/FloatingNav'
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'
import { useScroll, useTransform } from 'framer-motion'

function horizontalLoop(items: any[], config: any) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => {
      tl.totalTime(tl.rawTime() + tl.duration() * 100);
    }
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times: number[] = [],
    widths: number[] = [],
    xPercents: number[] = [],
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v: any) => v : gsap.utils.snap(config.snap || 1),
    totalWidth: number, curX: number, distanceToStart: number, distanceToLoop: number, item: any, i: number;

  gsap.set(items, {
    xPercent: (i, el) => {
      let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
      xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px") as string) / w * 100 + (gsap.getProperty(el, "xPercent") as number));
      return xPercents[i];
    }
  });

  gsap.set(items, { x: 0 });

  totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * (gsap.getProperty(items[length - 1], "scaleX") as number) + (parseFloat(config.paddingRight) || 0);

  for (i = 0; i < length; i++) {
    item = items[i];
    curX = xPercents[i] / 100 * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);
    tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
      .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  tl.progress(1, true).progress(0, true);
  if (config.reversed) {
    const onReverseComplete = tl.vars.onReverseComplete as (() => void) | undefined;
    onReverseComplete?.();
    tl.reverse();
  }
  return tl;
}

export default function ProjectPage({ }) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 800])
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  const talents = [
    "Art Direction", "Character Design", "Illustration", "UI", "Game Design", 
    "Player Experience", "Logic handling", "Blender", "Godot Engine", 
    "Procedural Generation", "User Testing", "Research", "Branding"
  ]

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true })
    if ('scrollRestoration' in history) { history.scrollRestoration = 'manual' }
    window.scrollTo(0, 0)

    let loop: any;
    if (marqueeRef.current) {
      const items = Array.from(marqueeRef.current.children) as HTMLElement[];
      loop = horizontalLoop(items, {
        repeat: -1,
        speed: 1,
        paddingRight: 0, 
      });
    }

    return () => { 
      lenis.destroy() 
      if (loop) loop.kill()
    }
  }, [])

  return (
    <main className="min-h-screen bg-portfolio-red overflow-x-hidden">
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
            <div className="relative w-[45vw] md:w-[25vw] aspect-square rounded-full overflow-hidden border-[2vw] md:border-[1.5vw] border-portfolio-red shadow-xl bg-white">
              <Image src="/art/Vessel_base.png" alt="Berkeleys Logo" fill className="object-cover p-0" />
            </div>
            
            <div className="flex-1 text-center md:text-left w-full">
              <h2 className="font-anton text-[18vw] md:text-[13.5vw] text-portfolio-red leading-none -mt-[4vw] md:-mt-[1vw] uppercase">VESSEL</h2>
              <h3 className="font-bold text-[4vw] md:text-[1.8vw] uppercase mb-2 text-portfolio-red tracking-tight">Summary</h3>
              <div className="bg-portfolio-red text-white p-6 md:p-8 rounded-4xl md:rounded-3xl shadow-lg">
                <p className="text-[3.8vw] md:text-[1.2vw] leading-snug">
                  VESSEL is an in development dungeon crawler resource management game set in the catacombs of "death after death". With the only source of light being the player's lanturn the game focuses on retaining your lamp oil and meeting travelers in the dark who can help you travel further into the abyss.
                </p>
              </div>
            </div>
          </div>

          {/* TALENTS BAR */}
          <div className="w-full bg-portfolio-red rounded-full py-3 md:py-4 px-6 md:px-10 mb-[6vw] md:mb-[3vw] shadow-md overflow-hidden whitespace-nowrap flex items-center relative">
            <div ref={marqueeRef} className="flex items-center whitespace-nowrap will-change-transform">
              {talents.map((talent, idx) => (
                <span 
                  key={idx} 
                  className="text-white font-bold uppercase text-[3vw] md:text-sm tracking-widest pr-[8vw] md:pr-[4vw] whitespace-nowrap"
                >
                  {talent}
                </span>
              ))}
            </div>
          </div>

          {/* BRANDING ASSETS */}
          <div className="w-full rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl bg-black mb-[6vw] md:mb-[4vw]">
             <Image 
               src="/art/Game_Dev.png" 
               alt="Home View" 
               width={1200} height={800} 
               className="w-full h-auto"
             />
          </div>

          <div className="w-full rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl bg-black">
             <Image 
               src="/art/Lanturn.png" 
               alt="Colors View" 
               width={1200} height={800} 
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
          <Footer />
        </section>
      </div>
    </main>
  )
}