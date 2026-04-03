'use client'

import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function HeroScene() {
  return (
    <section className="relative h-[220vh] w-full overflow-x-hidden bg-white">
      {/* Sticky background only */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        <Spline scene="https://prod.spline.design/6tl8vyQEAAOe8DYM/scene.splinecode" />
      </div>

      {/* Normal scrolling content layered over the sticky background */}
      <div className="relative z-10 -mt-[100vh] min-h-screen w-full px-4 pt-[16vh] md:px-10">
        <div className="mx-auto flex w-full max-w-450 flex-col items-center text-center">
          <motion.div
            initial={{ y: -120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              ease: 'easeOut',
              type: 'spring',
              stiffness: 70,
              damping: 20,
            }}
            className="w-full"
          >
            <div
              className="
                mt-[4vh]
                mb-[4vh]
                font-anton uppercase leading-[0.9]
                text-portfolio-red
                text-[8vw] md:text-[6vw]
                md:translate-x-[-18vw]
              "
            >
              Your Future
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              ease: 'easeOut',
              type: 'spring',
              stiffness: 70,
              damping: 20,
              delay: 0.12,
            }}
            className="w-full -mt-[0.6vw] md:-mt-[1vw]"
          >
            <div
              className="
                font-anton uppercase leading-[0.82]
                text-portfolio-red
                text-[18vw] md:text-[14vw]
              "
            >
              Web Designer
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}