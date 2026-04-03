'use client'

import { useState, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup, useMotionValue, useSpring, useTransform } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';

const services = [
  {
    id: '01',
    title: 'Visual Identity',
    description: "Defining strategic brand narratives through cohesive visual systems designed to elevate market presence and resonate with target audiences.",
    image: '/Tavern.png', 
  },
  {
    id: '02',
    title: 'Digital Design',
    description: "Engineering intuitive user interfaces that bridge the gap between high-fidelity art direction and functional technical architecture.",
    image: '/Reform_Prototype.png',
  },
  {
    id: '03',
    title: 'Interactive 3D',
    description: "Building immersive, scroll-triggered 3D environments and interactive assets that bring depth and spatial storytelling to the modern browser.",
    image: '/Spline.png',
  },
  {
    id: '04',
    title: 'Creative Development',
    description: "Translating complex design systems into high-performance code, focusing on fluid animations, responsive layouts, and clean web architecture.",
    image: '/Screen.png',
  },
];


function CardTilt({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="w-full h-full relative"
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [expanded, setExpanded] = useState<string | null>('01');

  return (
    <section className="bg-portfolio-red py-20 md:py-0 relative overflow-hidden">
      <div className="w-full px-4 md:px-10 mb-[6vw] md:mb-[2vw]">
        <h2 className="font-anton text-white text-[20vw] uppercase leading-none tracking-tight text-right md:hidden">
          Services
        </h2>

        <div className="hidden md:block">
          <RevealOnScroll animationClass="reveal-right">
            <h2 className="font-anton text-white text-[10vw] uppercase leading-none tracking-tight text-right">
              Services
            </h2>
          </RevealOnScroll>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:gap-4 w-full px-4 md:px-10 relative z-10">
        <LayoutGroup>
          {services.map((service) => (
            <motion.div
              layout
              key={service.id}
              onClick={() => setExpanded(service.id)} // Click for mobile
              onMouseEnter={() => setExpanded(service.id)}
              className="w-full rounded-[30px] md:rounded-[45px] border-2 border-white overflow-hidden bg-white text-portfolio-red shadow-xl"
              transition={{
                layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
              }}
            >
              {expanded !== service.id && (
                <motion.div layout className="py-4 md:py-6 flex justify-center items-center cursor-pointer">
                  <h3 className="font-anton text-3xl sm:text-4xl md:text-7xl uppercase tracking-tight">
                    {service.title}
                  </h3>
                </motion.div>
              )}

              <AnimatePresence mode="popLayout">
                {expanded === service.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative flex flex-col md:flex-row items-center md:min-h-112 overflow-hidden"
                  >
                    {/* Background Texture/Gradient */}
                    <div className="absolute right-0 top-0 w-full md:w-1/2 h-full animate-dither-red pointer-events-none opacity-10 md:opacity-100" />

                    <div className="flex flex-col md:flex-row items-center w-full px-6 md:px-20 py-8 md:py-12 gap-6 md:gap-12 z-10">
                      
                      <span className="font-anton text-[8rem] sm:text-[12rem] md:text-[20rem] leading-[0.7] tracking-tight md:self-center">
                        {service.id}
                      </span>

                      <div className="flex flex-col gap-2 md:gap-4 max-w-xl text-center md:text-left">
                        <h4 className="font-anton text-4xl sm:text-5xl md:text-8xl uppercase leading-none tracking-tight">
                          {service.title}
                        </h4>
                        <p className="font-overpass text-lg md:text-2xl font-bold leading-tight max-w-md mx-auto md:mx-0">
                          {service.description}
                        </p>
                      </div>

                      <div className="hidden sm:flex lg:flex ml-auto shrink-0 bg-portfolio-red rounded-[30px] md:rounded-[50px] w-full max-w-75 md:w-100 h-60 md:h-80 border-2 border-white/10 items-center justify-center shadow-inner overflow-hidden">
                        <CardTilt>
                          {service.image ? (
                            <img 
                              src={service.image} 
                              alt={service.title} 
                              className="w-full h-full object-cover scale-110 shadow-2xl" 
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full bg-red-800">
                               <span className="font-anton text-white text-xl italic opacity-50">3D</span>
                            </div>
                          )}
                        </CardTilt>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </LayoutGroup>
      </div>
    </section>
  );
}