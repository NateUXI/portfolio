'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import Image from 'next/image'
import FloatingNav from '@/components/FloatingNav'
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'
import { motion, useScroll, useTransform } from 'framer-motion'
import WorkCard from '@/components/WorkCard'
import Link from 'next/link'
import ProjectCTA from '@/components/ProjectCTA'

const ImageRow = ({ images, speed = 20, reverse = false, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 0.4, scale: 1 }}
      transition={{ duration: 1.5, delay, ease: "easeOut" }}
      className="flex whitespace-nowrap overflow-hidden py-2"
    >
      <motion.div 
        className="flex gap-4 px-2"
        animate={{ 
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] 
        }}
        transition={{ 
          duration: speed, 
          repeat: Infinity, 
          ease: "linear",
          repeatType: "loop"
        }}
      >
        {[...images, ...images].map((src, idx) => (
          <div 
            key={idx} 
            className="relative w-[50vw] md:w-[20vw] aspect-square shrink-0 rounded-2xl overflow-hidden border-2 border-black/10 shadow-lg"
          >
            <Image 
              src={src} 
              alt="Gallery item" 
              fill 
              sizes="(max-width: 768px) 45vw, 20vw" 
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

  const row1 = ["/art/Chapter1.png", "/art/Chapter2.jpg", "/art/Chapter3.png", "/art/Chapter4.png", "/art/Chapter5.png", "/art/Chapter6.jpg"];
  const row2 = ["/art/Chapter5.png", "/art/Chapter6.jpg", "/art/Chapter7.png", "/art/Chapter6.jpg", "/art/Chapter3.png", "/art/Chapter2.jpg"];

  return (
    <main className="min-h-screen bg-portfolio-red overflow-x-hidden">
      <TopNav />
      <FloatingNav />

      {/* Hero Section */}
      <div id="red2" className="relative pt-[40vw] md:pt-[15vw] pb-[15vw] md:pb-[8vw] px-[5vw] flex flex-col items-center z-10">
        <div className="absolute inset-0 z-0 flex-col justify-center pointer-events-none scale-125 md:scale-110 -rotate-3">
          <ImageRow images={row1} speed={30} delay={0.2} />
          <ImageRow images={row2} speed={25} reverse={true} delay={0.4} />
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
          className="relative z-10 font-anton text-[18vw] md:text-[13vw] text-center uppercase text-white tracking-tight leading-none md:leading-[0.8] drop-shadow-2xl"
        >
          VESSEL <br className="md:hidden" /> GALLERY
        </motion.h1>
      </div>

      <div className="relative w-full flex flex-col items-center z-20">
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

        <div className="relative w-[115vw] md:w-[106vw] bg-white min-h-[100vw] z-40">
          {(() => {
            const ScrollRow = ({
              images,
              speed = 40,
              reverse = false
            }: {
              images: { src: string; type?: 'card' | 'image' }[]
              speed?: number
              reverse?: boolean
            }) => {
              return (
                <div className="w-full overflow-hidden px-[1vw]">
                  <motion.div 
                    className="flex gap-[2vw] md:gap-[1.2vw] w-max items-end"
                    animate={{ 
                      x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] 
                    }}
                    transition={{ 
                      duration: speed, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  >
                    {[...images, ...images].map((img, i) => {
                      const isCard = img.type === 'card'
                      return (
                        <div
                          key={i}
                          className={`relative shrink-0 overflow-hidden rounded-[2vw] md:rounded-[1.1vw] shadow-[0.45vw_0.45vw_0_rgba(0,0,0,0.14)] ${
                            isCard ? 'h-[52vw] md:h-[28vw] w-[37vw] md:w-[20vw]' : 'h-[42vw] md:h-[25vw] w-auto'
                          }`}
                        >
                          <Image
                            src={img.src}
                            alt={`gallery image ${i + 1}`}
                            width={1200}
                            height={1200}
                            className={`h-full w-auto ${isCard ? 'object-cover' : 'object-contain'}`}
                          />
                        </div>
                      )
                    })}
                  </motion.div>
                </div>
              )
            }

            const GalleryShell = ({
              children,
              className = ''
            }: {
              children: React.ReactNode
              className?: string
            }) => (
              <div
                className={`mx-[3vw] md:mx-[2vw] rounded-[2.4vw] md:rounded-[1.5vw] bg-[#cfcfcf] px-[1.2vw] md:px-[1vw] py-[1.6vw] md:py-[1.2vw] shadow-[inset_0_0.5vw_0_rgba(0,0,0,0.12)] overflow-hidden ${className}`}
              >
                {children}
              </div>
            )

            const piontaImages = [
              { src: '/art/Talion.png', type: 'card' as const },
              { src: '/art/Swords.png', type: 'card' as const },
              { src: '/art/EleshNorn2.png', type: 'card' as const },
              { src: '/art/Pionta_card.png', type: 'card' as const },
              { src: '/art/Pionta_aura.png', type: 'card' as const },
              { src: '/art/Razzle.png', type: 'card' as const },
              { src: '/art/Lark.png', type: 'card' as const },
              { src: '/art/Sylvan.png', type: 'card' as const }
            ]

            const royalImages = [
              { src: '/art/Chapter2.jpg', type: 'image' as const },
              { src: '/art/SSS_Guitar.png', type: 'image' as const },
              { src: '/art/Chapter5.png', type: 'image' as const },
              { src: '/art/RR_Poster.png', type: 'image' as const },
              { src: '/art/Chapter3.png', type: 'image' as const },
              { src: '/art/Pionta_poster.png', type: 'image' as const },
              { src: '/art/Chapter7.png', type: 'image' as const },
            ]

            const variousImages = [
              { src: '/art/Various1.png', type: 'image' as const },
              { src: '/art/Various2.png', type: 'image' as const },
              { src: '/art/Various3.png', type: 'image' as const },
              { src: '/art/Various4.png', type: 'image' as const },
              { src: '/art/Painting.png', type: 'image' as const },
              { src: '/art/Various5.png', type: 'image' as const },
              { src: '/art/Various6.jpg', type: 'image' as const },
            ]

            return (
              <>
                <section className="pt-[7vw] md:pt-[4vw]">
                  <div className="flex items-center justify-center gap-[4vw] md:gap-[2vw] mb-[3vw] px-[4vw] flex-wrap">
                    <Image src="/art/Pionta.svg" alt="Pionta" width={700} height={180} className="w-[70vw] md:w-[26vw] h-auto" />
                    <Image src="/art/X.svg" alt="X" width={120} height={120} className="w-[8vw] md:w-[5vw] h-auto" />
                    <Image src="/art/MTG.svg" alt="MTG" width={900} height={220} className="w-[76vw] md:w-[30vw] h-auto" />
                  </div>
                  <GalleryShell>
                    <ScrollRow images={piontaImages} speed={30} />
                  </GalleryShell>
                  <div className="flex justify-center mt-[3vw] md:mt-[2vw]">
                    <ProjectCTA text="FULL SET" red href = "/projects/mtg"/>
                  </div>
                </section>

                <section className="pt-[12vw] md:pt-[6vw]">
                  <div className="flex justify-center mb-[3vw]">
                    <Image src="/art/Royal.svg" alt="Royal Runaway" width={900} height={220} className="w-[86vw] md:w-[48vw] h-auto" />
                  </div>
                  <GalleryShell>
                    <ScrollRow images={royalImages} speed={35} reverse />
                  </GalleryShell>
                  <div className="flex justify-center mt-[3vw] md:mt-[2vw]">
                    <ProjectCTA red text="GALLERY" href = "/projects/royalrunaway"/>
                  </div>
                </section>

                <section className="pt-[12vw] md:pt-[7vw]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[12vw] md:gap-[5vw] px-[10vw] md:px-[5vw]">
                    <div className="-rotate-1">
                      <div className="flex justify-center mb-[2vw]">
                        <Image src="/art/Vessel.svg" alt="Vessel" width={700} height={180} className="w-[38vw] md:w-[22vw] h-auto" />
                      </div>
                      <Link href="/projects/vessel">
                        <WorkCard title="" category="" baseImg="/art/Vessel_base.png" hoverImg="/art/Vessel_hover.png" />
                      </Link>
                      <div className="flex justify-center mt-[3vw] md:mt-[2vw]">
                        <ProjectCTA red text="VIEW PROJECT" href="/projects/vessel"/>
                      </div>
                    </div>

                    <div className="rotate-2">
                      <div className="flex justify-center mb-[2vw]">
                        <Image src="/art/Blender.svg" alt="Blender" width={700} height={180} className="w-[82vw] md:w-[26vw] h-auto" />
                      </div>
                      <Link href="/projects/blender">
                        <WorkCard title="" category="" baseImg="/art/Blender_base.png" hoverImg="/art/Blender_hover.png" />
                      </Link>
                      <div className="flex justify-center mt-[3vw] md:mt-[2vw]">
                        <ProjectCTA red text="VIEW ALL" href="/projects/blender"/>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="pt-[14vw] md:pt-[8vw] pb-[10vw] md:pb-[6vw]">
                  <h2 className="font-anton text-portfolio-red uppercase text-center text-[13vw] md:text-[7vw] leading-none mb-[3vw]">
                    Various Works
                  </h2>
                  <GalleryShell>
                    <ScrollRow images={variousImages} speed={40} />
                  </GalleryShell>
                  <div className="flex justify-center mt-[3vw] md:mt-[2vw]">
                    <ProjectCTA red text="VIEW ALL" href="/projects/various"/>
                  </div>
                </section>
              </>
            )
          })()}
        </div>

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