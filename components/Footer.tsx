'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaInstagram, FaPaperPlane } from 'react-icons/fa'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import TransitionLink from './TransitionLink'
import ContactModal from './ContactModal'

const Footer = () => {
  const pathname = usePathname()
  const [isContactOpen, setIsContactOpen] = useState(false)

  const pillBase = `
    absolute z-30 flex items-center justify-center 
    bg-portfolio-red text-white border-[0.2vw] border-transparent 
    hover:bg-white hover:text-portfolio-red hover:border-portfolio-red 
    transition-all duration-300 uppercase font-anton whitespace-nowrap
  `

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isCurrentPage = (href: string) => pathname === href

  const renderInternalPill = (
    href: string,
    className: string,
    content: React.ReactNode
  ) => {
    if (isCurrentPage(href)) {
      return (
        <button
          type="button"
          onClick={scrollToTop}
          className={className}
        >
          {content}
        </button>
      )
    }

    return (
      <TransitionLink href={href} className={className}>
        {content}
      </TransitionLink>
    )
  }

  return (
    <>
      <footer
        id="footer"
        className="relative w-full pt-[15vw] pb-[2vw] overflow-hidden"
        style={{ background: 'linear-gradient(to bottom, #fa0000, #FFFFFF 35%)' }}
      >
        <div className="relative w-full max-w-[100vw] h-[10vw] flex items-end justify-center px-[2vw]">
          {/* Home Pot */}
          <motion.div
            className="absolute left-[10%] -bottom-[68%] z-20 cursor-pointer"
            initial="initial"
            whileHover="hover"
          >
            {isCurrentPage('/') ? (
              <button
                type="button"
                onClick={scrollToTop}
                className="relative flex items-center justify-center w-[20vw] h-[20vw] bg-transparent border-0 p-0 cursor-pointer"
              >
                <motion.div
                  variants={{
                    initial: { y: 0, opacity: 0 },
                    hover: { y: '-14vw', opacity: 1 }
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="absolute z-0 pointer-events-none text-white font-anton text-[6vw]"
                >
                  HOME
                </motion.div>
                <Image
                  src="/ICON_RED.svg"
                  alt="Home Pot"
                  width={500}
                  height={500}
                  className="relative z-10 w-full h-full object-contain"
                />
              </button>
            ) : (
              <TransitionLink href="/" className="relative flex items-center justify-center w-[20vw] h-[20vw]">
                <motion.div
                  variants={{
                    initial: { y: 0, opacity: 0 },
                    hover: { y: '-14vw', opacity: 1 }
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="absolute z-0 pointer-events-none text-white font-anton text-[6vw]"
                >
                  HOME
                </motion.div>
                <Image
                  src="/ICON_RED.svg"
                  alt="Home Pot"
                  width={500}
                  height={500}
                  className="relative z-10 w-full h-full object-contain"
                />
              </TransitionLink>
            )}
          </motion.div>

          {/* Instagram */}
          <a
            href="https://instagram.com/royalrunaway"
            target="_blank"
            rel="noopener noreferrer"
            className={`${pillBase} p-[1.1vw] rounded-full left-[0%] bottom-[42%] -rotate-12`}
          >
            <FaInstagram className="w-[9vw] h-[9vw]" />
          </a>

          {/* Work */}
          {renderInternalPill(
            '/work',
            `${pillBase} px-[4vw] py-[0.7vw] rounded-full text-[6vw] left-[29%] top-[27%] rotate-32`,
            'Work'
          )}

          {/* Projects */}
          {renderInternalPill(
            '/projects',
            `${pillBase} px-[4vw] py-[0.7vw] rounded-full text-[6vw] -right-[1.2%] top-[8%] rotate-[28.3deg]`,
            'Projects'
          )}

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/nathaniel-turner-454375232/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${pillBase} px-[4vw] py-[0.7vw] rounded-full text-[6vw] right-[22.6%] top-[54%]`}
          >
            LinkedIn
          </a>

          {/* Github */}
          <a
            href="https://github.com/NateUXI"
            target="_blank"
            rel="noopener noreferrer"
            className={`${pillBase} px-[4vw] py-[0.7vw] rounded-full text-[6vw] right-[22%] bottom-[82%] -rotate-34`}
          >
            Github
          </a>

          {/* Message */}
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className={`${pillBase} p-[2vw] rounded-full left-[43.5%] bottom-[32%]`}
            aria-label="Open contact form"
          >
            <FaPaperPlane className="w-[7.5vw] h-[7.5vw] shrink-0" />
          </button>
        </div>

        <div className="select-none pointer-events-none w-screen relative left-1/2 -translate-x-1/2 z-10 mt-[5vw]">
          <h2
            className="text-[20vw] font-anton text-center leading-none uppercase tracking-tight"
            style={{ WebkitTextStroke: '0.3vw #Fa0000', color: '#FFFFFF' }}
          >
            LETS CONNECT
          </h2>
        </div>
      </footer>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  )
}

export default Footer