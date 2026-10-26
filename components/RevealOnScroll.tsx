'use client';

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';

type Animation = 'left' | 'right' | 'bottom' | 'top' | 'fade';

interface RevealOnScrollProps {
  children: ReactNode;
  animation?: Animation;
  /** Fraction of the element that must be visible (0–1). Keep low for tall elements. */
  threshold?: number;
  /** Shrinks the trigger zone; the default waits until the element is slightly inside the viewport. */
  rootMargin?: string;
  /** Stagger delay in ms */
  delay?: number;
  /** Animation duration in ms */
  duration?: number;
  /** Travel distance in px */
  distance?: number;
  /** Reveal once (default) or toggle on every enter/exit */
  once?: boolean;
  /** Rendered element, e.g. "li", "section" */
  as?: ElementType;
  className?: string;
}

export default function RevealOnScroll({
  children,
  animation = 'bottom',
  threshold = 0.15,
  rootMargin = '0px 0px -8% 0px',
  delay = 0,
  duration = 700,
  distance = 40,
  once = true,
  as: Tag = 'div',
  className = '',
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip animation entirely for reduced-motion users or browsers without IO
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  const style = {
    '--reveal-delay': `${delay}ms`,
    '--reveal-duration': `${duration}ms`,
    '--reveal-distance': `${distance}px`,
  } as CSSProperties;

  return (
    // Outer element is observed and never transformed, so intersection is reliable.
    <Tag ref={ref} className={className}>
      <div
        className={`reveal reveal-${animation} ${isVisible ? 'reveal-active' : ''}`}
        style={style}
      >
        {children}
      </div>
    </Tag>
  );
}