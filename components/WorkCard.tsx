'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

type WorkCardProps = {
  title: string
  category: string
  baseImg: string
  hoverImg?: string
  logoImg?: string
  talents?: string[]
}

function horizontalLoop(items: any[], config: any) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
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
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}

export default function WorkCard({
  title,
  category,
  baseImg,
  hoverImg,
  logoImg,
  talents = []
}: WorkCardProps) {
  const [isOverRed, setIsOverRed] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === 'red') {
            setIsOverRed(entry.isIntersecting)
          }
        })
      },
      { threshold: 0.2 }
    )

    const redSection = document.getElementById('red')
    if (redSection) observer.observe(redSection)

    let loop: any;
    if (marqueeRef.current && talents.length > 0) {
      const items = marqueeRef.current.children;
      loop = horizontalLoop(items, {
        repeat: -1,
        speed: 0.8,
        paddingRight: 0,
      });
    }

    return () => {
      observer.disconnect()
      if (loop) loop.kill()
    }
  }, [talents])

  const frameColor = isOverRed ? 'bg-white' : 'bg-portfolio-red'
  const talentTextColor = isOverRed ? 'text-portfolio-red' : 'text-white'
  
  const shadowColor = isOverRed
    ? 'shadow-[4px_4px_0px_rgba(250,0,0,0.3)] md:shadow-[0.8vw_0.8vw_0px_rgba(250,0,0,0.3)]'
    : 'shadow-[4px_4px_0px_rgba(0,0,0,0.15)] md:shadow-[0.8vw_0.8vw_0px_rgba(0,0,0,0.15)]'

  return (
    <div ref={cardRef} className="group relative w-full cursor-pointer font-overpass">
      <div className={`
        ${frameColor} ${shadowColor}
        p-2 md:p-[0.8vw] rounded-3xl md:rounded-[2vw] 
        transition-all duration-500 ease-in-out
        hover:-translate-y-1 md:group-hover:-translate-y-[0.5vw]
        hover:shadow-[8px_8px_0px_rgba(0,0,0,0.2)] md:group-hover:shadow-[1.2vw_1.2vw_0px_rgba(0,0,0,0.2)]
        relative flex flex-col
      `}>

        {/* Image Container */}
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
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
              <div className="relative w-4/5 h-1/2">
                <Image 
                  src={logoImg} 
                  alt={title} 
                  fill 
                  className="object-contain group-hover:scale-110 transition duration-300 drop-shadow-2xl" 
                />
              </div>
            </div>
          )}

          {/* Overlay Text */}
          <div className="absolute bottom-3 left-3 right-3 md:bottom-[1.5vw] md:left-[1.5vw] md:right-[1.5vw]">
            <h3 className="font-anton text-[8vw] md:text-[2.5vw] text-white leading-none capitalize">
              {title}
            </h3>
            <p className="text-[3vw] md:text-[1vw] text-white/80 uppercase tracking-wide">
              {category}
            </p>
          </div>
        </div>

        {/* talents */}
        {talents.length > 0 && (
          <div className="h-8 md:h-[2.5vw] mt-1 md:mt-[0.5vw] flex items-center overflow-hidden">
            <div 
              ref={marqueeRef} 
              className="flex items-center will-change-transform"
            >
              {talents.map((talent, idx) => (
                <span 
                  key={idx} 
                  className={`text-[3.2vw] md:text-[0.9vw] uppercase font-bold whitespace-nowrap ${talentTextColor} transition-colors duration-500 pr-10 md:pr-[4vw]`}
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