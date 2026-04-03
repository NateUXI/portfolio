'use client'

import { useEffect, useState, useRef } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  animationClass: 'reveal-left' | 'reveal-right' | 'reveal-bottom' | 'reveal-top';
  threshold?: number;
  className?: string;
}

export default function RevealOnScroll({
  children,
  animationClass,
  threshold = 0.7,
  className = ''
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: threshold }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div 
      ref={elementRef}
      className={`${animationClass} ${isVisible ? 'reveal-active' : ''} ${className}`}
    >
      {children}
    </div>
  );
}