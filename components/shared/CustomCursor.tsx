'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // Imperatively move the cursor elements without causing React re-renders
      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Outer cursor */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference hidden md:block will-change-transform"
      >
        <div
          className={`w-full h-full rounded-full border-2 border-cyan-400 transition-transform duration-150 ${
            isHovering ? 'scale-150' : 'scale-100'
          }`}
        />
      </div>

      {/* Inner cursor */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block will-change-transform"
      />
    </>
  );
}

