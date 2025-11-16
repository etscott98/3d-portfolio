'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const elements = sectionRef.current?.querySelectorAll('.about-text');
      if (elements) {
        gsap.set(elements, { clearProps: 'all' });
        
        gsap.fromTo(elements,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'top 40%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-40 px-6 bg-black"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="about-text text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-12 uppercase tracking-tight">
            <span className="block">defining a</span>
            <span className="block text-lime-400">legacy</span>
          </h2>
          
          <p className="about-text text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Redefining limits, fighting for wins, bringing it all in all ways. Every project is a chance to push boundaries and create products that users love and businesses value.
          </p>
        </motion.div>

        {/* Philosophy Points */}
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="about-text text-center"
          >
            <div className="text-6xl font-bold text-lime-400 mb-4">Design</div>
            <p className="text-gray-400">User-centered approach backed by research, data, and measurable outcomes</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="about-text text-center"
          >
            <div className="text-6xl font-bold text-lime-400 mb-4">Code</div>
            <p className="text-gray-400">Technical execution with modern frameworks, performance, and scalability</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="about-text text-center"
          >
            <div className="text-6xl font-bold text-lime-400 mb-4">Impact</div>
            <p className="text-gray-400">Real results: 25% fewer support calls, 50% faster workflows, users who love the product</p>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto border-t border-zinc-800 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="about-text text-center"
          >
            <div className="text-6xl font-bold text-lime-400 mb-4">25%</div>
            <div className="text-lg text-white font-medium mb-2">Support Call Reduction</div>
            <p className="text-sm text-gray-500">FloLogic Mobile Redesign</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="about-text text-center"
          >
            <div className="text-6xl font-bold text-lime-400 mb-4">50%</div>
            <div className="text-lg text-white font-medium mb-2">Fewer Taps Required</div>
            <p className="text-sm text-gray-500">Streamlined User Flows</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="about-text text-center"
          >
            <div className="text-6xl font-bold text-lime-400 mb-4">300+</div>
            <div className="text-lg text-white font-medium mb-2">Active Users</div>
            <p className="text-sm text-gray-500">First Month Launch (Teamu)</p>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <blockquote className="text-3xl md:text-4xl font-light text-gray-300 italic max-w-4xl mx-auto">
            "It doesn't matter where you start, it's how you progress from there."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
