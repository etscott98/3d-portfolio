'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxContentProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxContent({
  children,
  speed = 0.5,
  className = '',
}: ParallaxContentProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      gsap.from(elementRef.current, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });

      // Parallax effect
      gsap.to(elementRef.current, {
        y: -50 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }
  }, [speed]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

