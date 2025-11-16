/**
 * GSAP Animation Configurations
 * Centralized animation utilities for consistent motion design
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Animation timing constants
export const DURATIONS = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.2,
  xslow: 2.0,
};

export const EASES = {
  smooth: 'power2.out',
  bounce: 'back.out(1.7)',
  elastic: 'elastic.out(1, 0.5)',
  expo: 'expo.out',
  inOut: 'power2.inOut',
};

// Fade in animation
export const fadeIn = (element: gsap.TweenTarget, options = {}) => {
  return gsap.from(element, {
    opacity: 0,
    y: 30,
    duration: DURATIONS.normal,
    ease: EASES.smooth,
    ...options,
  });
};

// Fade in stagger (for lists)
export const fadeInStagger = (elements: gsap.TweenTarget, options = {}) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 30,
    duration: DURATIONS.normal,
    ease: EASES.smooth,
    stagger: 0.1,
    ...options,
  });
};

// Scale in animation
export const scaleIn = (element: gsap.TweenTarget, options = {}) => {
  return gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration: DURATIONS.normal,
    ease: EASES.bounce,
    ...options,
  });
};

// Slide in from direction
export const slideIn = (
  element: gsap.TweenTarget,
  direction: 'left' | 'right' | 'top' | 'bottom' = 'left',
  options = {}
) => {
  const movement = {
    left: { x: -100 },
    right: { x: 100 },
    top: { y: -100 },
    bottom: { y: 100 },
  };

  return gsap.from(element, {
    ...movement[direction],
    opacity: 0,
    duration: DURATIONS.slow,
    ease: EASES.expo,
    ...options,
  });
};

// Parallax effect
export const parallax = (
  element: gsap.TweenTarget,
  amount: number = 100,
  options = {}
) => {
  return gsap.to(element, {
    y: amount,
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      ...options,
    },
  });
};

// Reveal text animation
export const revealText = (element: gsap.TweenTarget, options = {}) => {
  return gsap.from(element, {
    opacity: 0,
    clipPath: 'inset(0% 100% 0% 0%)',
    duration: DURATIONS.slow,
    ease: EASES.expo,
    ...options,
  });
};

// 3D rotate animation
export const rotate3D = (element: gsap.TweenTarget, options = {}) => {
  return gsap.from(element, {
    rotationY: -90,
    transformOrigin: 'left center',
    opacity: 0,
    duration: DURATIONS.slow,
    ease: EASES.smooth,
    ...options,
  });
};

// Hover lift effect
export const hoverLift = (element: HTMLElement) => {
  const tl = gsap.timeline({ paused: true });
  
  tl.to(element, {
    y: -10,
    scale: 1.02,
    duration: DURATIONS.fast,
    ease: EASES.smooth,
  });

  element.addEventListener('mouseenter', () => tl.play());
  element.addEventListener('mouseleave', () => tl.reverse());
  
  return tl;
};

// Scroll-triggered section animation
export const scrollSection = (element: gsap.TweenTarget, options = {}) => {
  return gsap.from(element, {
    opacity: 0,
    y: 100,
    duration: DURATIONS.slow,
    ease: EASES.smooth,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none reverse',
      ...options,
    },
  });
};

// Count up animation for numbers
export const countUp = (
  element: HTMLElement,
  start: number = 0,
  end: number,
  options = {}
) => {
  const obj = { value: start };
  
  return gsap.to(obj, {
    value: end,
    duration: DURATIONS.slow,
    ease: EASES.smooth,
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toString();
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      ...options,
    },
  });
};

// Mouse parallax effect
export const mouseParallax = (
  container: HTMLElement,
  elements: { element: HTMLElement; speed: number }[]
) => {
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

    elements.forEach(({ element, speed }) => {
      gsap.to(element, {
        x: x * speed,
        y: y * speed,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  });

  container.addEventListener('mouseleave', () => {
    elements.forEach(({ element }) => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  });
};

// Clean up ScrollTrigger instances
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

// Refresh ScrollTrigger (useful after layout changes)
export const refreshScrollTriggers = () => {
  ScrollTrigger.refresh();
};

