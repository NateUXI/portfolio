'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import Image from 'next/image'
import FloatingNav from '@/components/FloatingNav'
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'
import { motion, useScroll, useTransform } from 'framer-motion'

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
      xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px") as string) / w * 100 + (gsap.getProperty(el, "x") as number));
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

export default function ProjectPage({}) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 800])
  const marqueeRef = useRef<HTMLDivElement | null>(null)

  const talents = [
    "Art Direction", "Character Design", "Illustration", "Concept Art", "UI", "UX", 
    "Prototyping", "Interaction Design", "Motion Design", "Animation", "3D Modeling", 
    "Shaders", "Web Design", "Front-end", "React", "Next.js", "TypeScript", 
    "Image Processing", "Scanning", "Tooling", "Product Strategy", "Research", 
    "Branding", "Photography", "Accessibility"
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
        speed: 0.9,
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
            <div className="relative w-[45vw] md:w-[25vw] aspect-square rounded-full overflow-hidden border-[2vw] md:border-[1.5vw] border-portfolio-red shadow-xl bg-white">
              <Image src="/Reform_icon.png" alt="Reform Logo" fill className="object-cover p-0" />
            </div>
            
            <div className="flex-1 text-center md:text-left w-full">
              <h2 className="font-anton text-[18vw] md:text-[13.5vw] text-portfolio-red leading-none -mt-[4vw] md:-mt-[1vw] uppercase">Reform</h2>
              <h3 className="font-bold text-[4vw] md:text-[1.8vw] uppercase mb-2 text-portfolio-red tracking-tight">Summary</h3>
              <div className="bg-portfolio-red text-white p-6 md:p-8 rounded-4xl md:rounded-3xl shadow-lg">
                <p className="text-[3.8vw] md:text-[1.2vw] leading-snug">
                  A character design focused image board app created to help writers design and create across platforms, enabling writing and reference both on the go and in the studio. Currently being built with EXPO with releases for IOS, Android, and Web.
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

          {/* LIVE PROTOTYPE SECTION */}
          <div className="flex flex-col md:flex-row items-center gap-[8vw] md:gap-[4vw] mb-[8vw] md:mb-[5vw]">
            
            {/* Left Column: Headings & Text */}
            <div className="flex-1 text-center md:text-left w-full">
              <h2 className="font-anton text-[12vw] md:text-[9vw] uppercase leading-none bg-[linear-gradient(180deg,var(--color-portfolio-red)_0%,var(--color-portfolio-red)_30%,#33A1D0_100%)] bg-clip-text text-transparent">
                Live Prototype
              </h2>
              <h3 className="font-bold text-[4vw] md:text-[2vw] uppercase mt-2 mb-4 text-[#33A1D0] tracking-tight">
                Built in Figma
              </h3>

              <div className="bg-[#33A1D0] text-white p-6 md:p-8 rounded-3xl md:rounded-3xl shadow-lg mb-6">
                <p className="text-[3.8vw] md:text-[1.5vw] font-semibold leading-relaxed tracking-tight">
                  Here is a small presentation of REFORM. This live prototype serves as a working proof of concept for the eventual full release of this user first concepting app.
                </p>
              </div>

              <p className="text-[3.5vw] md:text-[1.5vw] font-bold leading-relaxed tracking-tight text-[#33A1D0]">
                The current version of REFORM is being built out using Expo. Prototyping, UX, and UI design is made in Figma and User Experience testing is being collected from both versions. If you would like to send any feedback on this limited prototype, please send it using the contact modal on the top right of my website.
              </p>
            </div>

            {/* Right Column: Mobile Frame Device Wrapper */}
            <div className="shrink-0 relative w-[67.5vw] md:w-[23.5vw] aspect-9/18.5 rounded-[3.2rem] md:rounded-[4.5rem] p-[2%] bg-[linear-gradient(180deg,var(--color-portfolio-red)_0%,var(--color-portfolio-red)_30%,#33A1D0_100%)] shadow-2xl">
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

          {/* MOBILE SHOWCASE */}
          <div className="w-[92%] md:w-[88%] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-[6vw] md:mb-[4vw]">
            {["/Reform_Home.png", "/Reform_login.png", "/Reform_Create_Tab.png", "/Reform_board.png"].map((src, i) => (
              <div 
                key={i}
                className="relative aspect-9/19 rounded-4xl overflow-hidden shadow-2xl"
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

          {/* PERSONA TITLE */}
          <h3 className="font-anton text-[#33A1D0] text-[7vw] md:text-[8vw] uppercase text-center mt-[8vw] md:mt-[5vw] mb-[5vw] md:mb-[3vw]">
            Persona Case Studies
          </h3>

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
          <Footer />
        </section>
      </div>
    </main>
  )
}