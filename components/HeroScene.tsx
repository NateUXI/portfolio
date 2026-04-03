'use client'

import { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'

export default function HeroScene() {

  return (
    <div id="hero-scroll" className="w-full h-[300vh]">
      <div className="sticky top-0 h-screen">
        <Spline
          scene="https://prod.spline.design/Ue19pjaIT6xYuRpM/scene.splinecode"
        />
      </div>
    </div>
  )
}