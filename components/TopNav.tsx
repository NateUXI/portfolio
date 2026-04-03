'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ContactModal from '@/components/ContactModal';

export default function TopNav() {
  const [isOverRed, setIsOverRed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMounted(true);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.some(entry => entry.isIntersecting);
        setIsOverRed(intersecting);
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('red');
    const section2 = document.getElementById('red2');
    if (section) observer.observe(section);
    if (section2) observer.observe(section2);

    return () => observer.disconnect();
  }, []);

  const textColor = isOverRed ? "text-white" : "text-portfolio-red";
  const btnClass = isOverRed ? "bg-white text-portfolio-red" : "bg-portfolio-red text-white";

  return (
    <>
      <nav className={`
        fixed top-0 left-0 w-full 
        p-5 md:p-8 
        flex justify-between items-start 
        z-50 pointer-events-none 
        transition-all duration-500 
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
      `}>
        
        {/* left side */}
        <div className="flex items-start gap-6 md:gap-12 pointer-events-auto">
          <Link href="/" className={`${textColor} transition-colors duration-500`}>
            <div className="flex flex-col font-overpass text-[9px] md:text-[11px] uppercase tracking-widest font-bold">
              <span className="leading-tight">US Based</span>
              <span className="opacity-60 font-normal lowercase md:uppercase">Working globally</span>
            </div>
          </Link>

          <div className={`hidden sm:flex flex-col font-overpass text-[9px] md:text-[11px] uppercase tracking-widest font-bold transition-colors duration-500 ${textColor}`}>
            <span className="leading-tight">Developing:</span>
            <span className="opacity-60 font-normal">Reform</span>
          </div>

          <div className={`hidden lg:flex flex-col font-overpass text-[9px] md:text-[11px] uppercase tracking-widest font-bold transition-colors duration-500 ${textColor}`}>
            <span className="leading-tight">Availability</span>
            <span className="opacity-60 font-normal">Q2 2026</span>
          </div>
        </div>

        {/* button */}
        <div className="pointer-events-auto">
          <button
            onClick={() => setIsContactOpen(true)}
            className={`
              ${btnClass} 
              px-5 py-2 md:px-8 md:py-3 
              rounded-full font-anton 
              text-base md:text-xl 
              uppercase tracking-wider 
              active:scale-95 md:hover:scale-110 
              transition-all shadow-lg duration-500
            `}
          >
            Get in touch
          </button>
        </div>
      </nav>

      {/* contact modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}