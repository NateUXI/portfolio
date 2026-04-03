import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  scrollContainerRef = null,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    
    return text.split(' ').map((word, wordIndex) => (
      <span 
        key={wordIndex} 
        className="inline-block whitespace-nowrap"
      >
        {word.split('').map((char, charIndex) => (
          <span className="inline-block word" key={charIndex}>
            {char}
          </span>
        ))}
        <span className="inline-block">&nbsp;</span>
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = (scrollContainerRef && scrollContainerRef.current) 
      ? scrollContainerRef.current 
      : window;

    const charElements = el.querySelectorAll('.word');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        charElements,
        {
          willChange: 'opacity, transform',
          opacity: 0,
          yPercent: 100,
          scaleY: 1.5,
          scaleX: 0.9,
          transformOrigin: '50% 0%'
        },
        {
          duration: animationDuration,
          ease: ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger: stagger,
          scrollTrigger: {
            trigger: el,
            scroller: scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub: true
          }
        }
      );
    });

    return () => ctx.revert();
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2 
      ref={containerRef} 
      className={`relative z-10 my-5 py-10 overflow-visible ${containerClassName}`}
    >
      <span className={`inline-block text-[clamp(1.6rem,4vw,3rem)] leading-[1.4] ${textClassName}`}>
        {splitText}
      </span>
    </h2>
  );
};

export default ScrollFloat;