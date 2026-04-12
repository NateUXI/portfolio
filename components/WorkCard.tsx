'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

function horizontalLoop(items: HTMLElement[], config: any) {
  const vars = config || {};
  const tl = gsap.timeline({
    repeat: vars.repeat,
    paused: vars.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => { tl.totalTime(tl.rawTime() + tl.duration() * 100); }
  });
  
  const length = items.length;
  const startX = items[0].offsetLeft;
  const widths: number[] = [];
  const xPercents: number[] = [];
  const pixelsPerSecond = (vars.speed || 1) * 100;
  
  gsap.set(items, {
    xPercent: (i, el) => {
      const w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string));
      xPercents[i] = parseFloat(gsap.getProperty(el, "xPercent") as string) || 0;
      return xPercents[i];
    }
  });

  gsap.set(items, { x: 0 });

  const totalWidth = items[length - 1].offsetLeft + (xPercents[length - 1] / 100) * widths[length - 1] - startX + items[length - 1].offsetWidth + (parseFloat(vars.paddingRight) || 0);

  for (let i = 0; i < length; i++) {
    const item = items[i];
    const curX = (xPercents[i] / 100) * widths[i];
    const distanceToStart = item.offsetLeft + curX - startX;
    const distanceToLoop = distanceToStart + widths[i];
    
    tl.to(item, { xPercent: ((curX - distanceToLoop) / widths[i]) * 100, duration: distanceToLoop / pixelsPerSecond }, 0)
      .fromTo(item, { xPercent: ((curX - distanceToLoop + totalWidth) / widths[i]) * 100 }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
      .add("label" + i, distanceToStart / pixelsPerSecond);
  }
  
  tl.progress(1, true).progress(0, true);
  if (vars.reversed) tl.reverse();
  return tl;
}

type WorkCardProps = {
  title: string
  category: string
  baseImg: string
  hoverImg?: string
  logoImg?: string
  logoWidth?: number
  logoHeight?: number
  talents?: string[]
}

export default function WorkCard({
  title,
  category,
  baseImg,
  hoverImg,
  logoImg,
  logoWidth = 400,
  logoHeight = 200,
  talents = []
}: WorkCardProps) {
  const [isOverRed, setIsOverRed] = useState(false)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsOverRed(entry.isIntersecting),
      { threshold: 0.2 }
    )

    const redSection = document.getElementById('red')
    if (redSection) observer.observe(redSection)

    let loop: gsap.core.Timeline | undefined;
    if (marqueeRef.current && talents.length > 0) {
      const items = Array.from(marqueeRef.current.children) as HTMLElement[];
      loop = horizontalLoop(items, {
        repeat: -1,
        speed: 0.8,
      });
    }

    return () => {
      observer.disconnect()
      loop?.kill()
    }
  }, [talents])

  const theme = {
    frame: isOverRed ? 'bg-white' : 'bg-portfolio-red',
    text: isOverRed ? 'text-portfolio-red' : 'text-white',
    shadow: isOverRed 
      ? 'shadow-[4px_4px_0px_rgba(250,0,0,0.3)] md:shadow-[0.8vw_0.8vw_0px_rgba(250,0,0,0.3)]' 
      : 'shadow-[4px_4px_0px_rgba(0,0,0,0.15)] md:shadow-[0.8vw_0.8vw_0px_rgba(0,0,0,0.15)]'
  }

  return (
    <div className="group relative w-full cursor-pointer font-overpass">
      <div className={`
        ${theme.frame} ${theme.shadow}
        p-2 md:p-[0.8vw] rounded-3xl md:rounded-[2vw] 
        transition-all duration-500 ease-in-out
        hover:-translate-y-1 md:group-hover:-translate-y-[0.5vw]
        hover:shadow-[8px_8px_0px_rgba(0,0,0,0.2)] md:group-hover:shadow-[1.2vw_1.2vw_0px_rgba(0,0,0,0.2)]
        flex flex-col
      `}>

        <div className="relative aspect-16/10 rounded-[18px] md:rounded-[1.5vw] overflow-hidden bg-black">
          <Image 
            src={baseImg} 
            alt={title} 
            fill 
            sizes="(max-width: 768px) 100vw, 50vw" 
            className="object-cover transition-opacity duration-300" 
          />
          
          {hoverImg && (
            <Image 
              src={hoverImg} 
              alt={`${title} hover`} 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw" 
              className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
            />
          )}
          
          {logoImg && (
            <div className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none">
              <div className="relative" style={{ width: '80%', height: '50%' }}>
                <Image 
                  src={logoImg} 
                  alt={`${title} logo`}
                  width={logoWidth}
                  height={logoHeight}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl" 
                />
              </div>
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4 md:bottom-[1.5vw] md:left-[1.5vw]">
            <h3 className="font-anton text-[8vw] md:text-[2.5vw] text-white leading-[0.9] capitalize mb-1">
              {title}
            </h3>
            <p className="text-[3vw] md:text-[0.9vw] text-white/90 uppercase tracking-widest font-bold">
              {category}
            </p>
          </div>
        </div>

        {talents.length > 0 && (
          <div className="h-10 md:h-[2.8vw] mt-1 flex items-center overflow-hidden">
            <div ref={marqueeRef} className="flex items-center will-change-transform">
              {talents.map((talent, idx) => (
                <span 
                  key={idx} 
                  className={`text-[3.2vw] md:text-[0.85vw] uppercase font-black whitespace-nowrap ${theme.text} transition-colors duration-500 pr-12 md:pr-[4vw]`}
                >
                  {talent}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}