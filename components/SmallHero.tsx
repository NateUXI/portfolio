'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

type ImageRowProps = {
  images: string[]
  speed?: number
  reverse?: boolean
  delay?: number
}

function ImageRow({
  images,
  speed = 30,
  reverse = false,
  delay = 0,
}: ImageRowProps) {
  const repeatedImages = [...images, ...images]

  return (
    <div className="relative flex overflow-hidden py-[1.2vw] md:py-[1vw]">
      <motion.div
        className="flex shrink-0 gap-[2vw] px-[1vw]"
        initial={{ x: reverse ? '-50%' : '0%' }}
        animate={{ x: reverse ? '0%' : '-50%' }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
          delay,
        }}
      >
        {repeatedImages.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="relative w-[65vw] md:w-[20vw] aspect-4/5 shrink-0 rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover grayscale-[0.15] brightness-[0.9] contrast-[0.95]"
            />

            <div className="absolute inset-0 bg-white/45" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function SmallHero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -90])

  const row1 = ['/Tavern_Base.png', '/Reform_base.png', '/Berks_base.png', '/GRID_Base.png']
  const row2 = ['/Reform_hover2.png', '/Tavern_Hover.png', '/GRID_hover.png', '/Berks_background.png']

  return (
    <section className="relative w-screen overflow-hidden bg-white">
      <div
        className="relative pt-[40vw] md:pt-[7vw] pb-[10vw] md:pb-[6vw] px-0 flex flex-col items-start z-10"
        >
        <div className="absolute inset-0 z-0 flex flex-col justify-center pointer-events-none scale-[1.35] md:scale-[2.25] -rotate-3 overflow-hidden opacity-90">
            <ImageRow images={row1} speed={30} delay={0.2} />
            <ImageRow images={row2} speed={25} reverse={true} delay={0.4} />
            <ImageRow images={row1} speed={35} delay={0.6} />
        </div>

            <motion.div
                style={{ y, transform: 'translateZ(0)' }}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 1.1,
                    ease: 'easeOut',
                    type: 'spring',
                    stiffness: 75,
                    damping: 20,
                }}
                className="relative z-10 inline-block pl-[3vw] md:pl-0 md:mx-auto md:text-center"
                >
                <div className="font-anton uppercase text-portfolio-red leading-none tracking-medium md:tracking-[-0.03em]">
                    
                    <div className="text-[12vw] md:text-[7vw] md:mb-[0.5vw] ml-[4vw] md:mr-[54vw] leading-[0.9]">
                    your future
                    </div>

                    <div className="mt-[0.2vw] text-[24vw] md:text-[14vw] ml-[4vw] md:mr-[4vw] leading-[.9]">
                    web designer
                    </div>

                </div>
            </motion.div>
        </div>

      <div className="relative w-full flex flex-col items-center z-20">
        <div className="w-[115vw] md:w-[106vw] leading-none relative z-30">
          <Image
            src="/Top_red.png"
            alt="Cap Top"
            width={1000}
            height={200}
            priority
            className="w-full h-auto block -mb-px"
          />
        </div>
      </div>
    </section>
  )
}