'use client'

import { motion } from 'framer-motion'
import TransitionLink from './TransitionLink'

interface ProjectCTAProps {
  text?: string
  href?: string
  red?: boolean
}

export default function ProjectCTA({
  text = "All Projects",
  href = "/work",
  red = false
}: ProjectCTAProps) {
  const buttonBg = red ? "bg-portfolio-red" : "bg-white"
  const textColor = red ? "text-white" : "text-portfolio-red"
  const iconPath = red ? "/ICON_RED.png" : "/ICON.png"

  return (
    <div className="flex justify-center w-full mt-4 relative">
      <motion.div
        className="relative flex items-center justify-center group"
        initial="initial"
        whileHover="hover"
      >
        <motion.div
          variants={{
            initial: { x: 0, opacity: 0 },
            hover: { x: -310, opacity: 1 }
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.05 }}
          className="absolute z-0 pointer-events-none"
        >
          <motion.img
            src={iconPath}
            alt=""
            className="w-24 h-24 md:w-28 md:h-28 object-contain"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <TransitionLink
            href={href}
            className={`
              inline-flex items-center justify-center
              px-16 md:px-20 py-6 md:py-8
              rounded-full shadow-2xl min-w-[320px] md:min-w-105
              transition-colors duration-300
              ${buttonBg}
            `}
          >
            <span
              className={`
                font-anton text-4xl md:text-6xl uppercase tracking-tight
                transition-colors duration-300
                ${textColor}
              `}
            >
              {text}
            </span>
          </TransitionLink>
        </motion.div>

        <motion.div
          variants={{
            initial: { x: 0, opacity: 0 },
            hover: { x: 310, opacity: 1 }
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="absolute z-0 pointer-events-none"
        >
          <motion.img
            src={iconPath}
            alt=""
            className="w-24 h-24 md:w-28 md:h-28 object-contain"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}