'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiX } from 'react-icons/hi'

type ContactModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-200 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* backdrop */}
          <button
            aria-label="Close contact modal"
            onClick={onClose}
            className="absolute inset-0 bg-black/55 backdrop-blur-[6px]"
          />

          {/* modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92, rotate: -1.2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: -0.4 }}
            exit={{ opacity: 0, y: 30, scale: 0.94, rotate: -0.8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-4xl rounded-4xl bg-white p-5 md:p-7 shadow-[0.9vw_0.9vw_0px_rgba(0,0,0,0.22)]"
          >
            {/* top decorative halftone */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-[38%] rounded-tr-4xl opacity-30 animate-dither-red" />

            {/* close */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-portfolio-red text-white transition-transform duration-300 hover:scale-105 active:scale-95"
              aria-label="Close"
            >
              <HiX className="text-3xl" />
            </button>

            <div className="relative z-10">
              <h2 className="font-anton text-portfolio-red text-center text-[clamp(2.5rem,5vw,5rem)] leading-none uppercase tracking-tight">
                Contact Me
              </h2>

              <div className="mt-5 rounded-[1.6rem] bg-[#d9d9d9] p-4 md:p-6 shadow-[inset_0_4px_8px_rgba(0,0,0,0.15)]">
                <form
                  action="https://formsubmit.co/nathanielturner2166@gmail.com"
                  method="POST"
                  className="flex flex-col gap-4"
                >
                  <input type="hidden" name="_subject" value="New portfolio contact message" />
                  <input type="hidden" name="_captcha" value="false" />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      required
                      className="w-full rounded-[1.2rem] border-2 border-transparent bg-white px-5 py-4 font-overpass text-lg outline-none transition-all duration-300 focus:border-portfolio-red"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      className="w-full rounded-[1.2rem] border-2 border-transparent bg-white px-5 py-4 font-overpass text-lg outline-none transition-all duration-300 focus:border-portfolio-red"
                    />
                  </div>

                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="w-full rounded-[1.2rem] border-2 border-transparent bg-white px-5 py-4 font-overpass text-lg outline-none transition-all duration-300 focus:border-portfolio-red"
                  />

                  <textarea
                    name="message"
                    placeholder="Message"
                    required
                    rows={7}
                    className="w-full resize-none rounded-[1.4rem] border-2 border-transparent bg-white px-5 py-4 font-overpass text-lg outline-none transition-all duration-300 focus:border-portfolio-red"
                  />

                  <div className="flex flex-col gap-3 pt-2 md:flex-row md:items-center md:justify-between">
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=nathanielturner2166@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-overpass text-base text-portfolio-red underline underline-offset-4"
                    >
                      open in gmail instead
                    </a>

                    <button
                      type="submit"
                      className="rounded-full bg-portfolio-red px-8 py-4 font-anton text-3xl uppercase tracking-tight text-white transition-all duration-300 hover:scale-[1.03] hover:bg-white hover:text-portfolio-red hover:outline hover:outline-2 hover:outline-portfolio-red active:scale-95"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}