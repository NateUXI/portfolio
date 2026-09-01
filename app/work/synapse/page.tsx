'use client'

import Image from 'next/image'
import { FormEvent, useState } from 'react'
import FloatingNav from '@/components/FloatingNav'
import TopNav from '@/components/TopNav'

export default function SynapsePage() {
  const [password, setPassword] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <TopNav />
      <FloatingNav />

      <div className="absolute inset-0" />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-16">
        <div className="flex w-full max-w-115 flex-col items-center rounded-[18px] bg-[#d8d8d8] px-8 py-8 shadow-[0_12px_24px_rgba(0,0,0,0.12)]">
          <Image
            src="/NDA.png"
            alt="NDA protected"
            width={200}
            height={200}
            priority
            quality={100}
            className="h-45 w-52.5 object-contain"
          />

          <p className="mt-2 text-center font-anton text-[1.5rem] uppercase leading-[1.2] tracking-[-0.02em] text-portfolio-red">
            This content is protected
            <br />
            to view, please enter password.
          </p>

          <form onSubmit={handleSubmit} className="mt-3 flex w-full items-center gap-3">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              aria-label="Password"
              className="h-13 w-full rounded-full border-[3px] border-portfolio-red bg-white px-5 font-overpass text-[1rem] text-[#2b2b2b] placeholder:text-[#4a4a4a]/70 focus:outline-none"
            />

            <button
              type="submit"
              aria-label="Submit password"
              className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-portfolio-red text-white shadow-[0_4px_0_rgba(0,0,0,0.12)] transition-transform hover:scale-[1.1] active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden="true">
                <path d="M8 5.5v13l10-6.5L8 5.5z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}