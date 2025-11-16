'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CaseStudyHero3DProps {
  title: string;
  subtitle: string;
  tags: string[];
  tools: string[];
  image: string;
  theme?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function CaseStudyHero3D({
  title,
  subtitle,
  tags,
  tools,
  image,
  theme = { primary: '#06b6d4', secondary: '#3b82f6', accent: '#8b5cf6' },
}: CaseStudyHero3DProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax scroll effect
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        if (imageRef.current) {
          imageRef.current.style.transform = `translateY(${scrollY * 0.3}px) scale(${
            1 + scrollY * 0.0002
          })`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Entrance animations
    gsap.from('.hero-content > *', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      delay: 0.3,
      ease: 'power3.out',
    });

    gsap.from(imageRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 1.2,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      style={{
        background: `radial-gradient(circle at 50% 50%, ${theme.primary}10 0%, #000000 70%)`,
      }}
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <div
          ref={imageRef}
          className="relative w-full h-full"
          style={{
            willChange: 'transform',
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover opacity-20"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"
            style={{
              background: `linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.6), ${theme.primary}20, #000000)`,
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
        {/* Back Button */}
        <Link href="/">
          <motion.button
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </motion.button>
        </Link>

        <div className="hero-content">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-4 py-2 glass rounded-full text-sm text-white/80 border"
                style={{ borderColor: `${theme.primary}40` }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-4xl">
            {subtitle}
          </p>

          {/* Tools */}
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-sm text-white/50 font-semibold">Tools:</span>
            {tools.map((tool, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg text-sm font-medium"
                style={{
                  background: `${theme.accent}20`,
                  color: theme.accent,
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 rounded-full flex justify-center pt-2"
          style={{ borderColor: theme.primary }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: theme.primary }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

