'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    quote:
      'Working with Erin is smooth because she actually understands how things get built. She hands over components that slot straight into our codebase and she catches edge cases before they hit us. It makes our whole team faster.',
    author: 'Senior Software Engineer',
    role: 'FloLogic',
    highlight: 'Understands how things get built',
  },
  {
    quote:
      "Erin brought structure to chaos. She helped me clarify the product, the users, and the system we were actually trying to build. A lot of Teamu's direction came from her ability to connect ideas and make them workable.",
    author: 'CEO',
    role: 'Teamu',
    highlight: 'Brings structure to chaos',
  },
  {
    quote:
      'Erin made my job easy. She handled the visuals, the animations, the feel of the app, and kept delivering stuff I could plug in without back-and-forth. The prototype moved as quickly as it did because she kept pushing clean, thoughtful work.',
    author: 'Founding Developer',
    role: 'Circadia',
    highlight: 'Clean, thoughtful delivery',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        gsap.set(cards, { clearProps: 'all' });
        
        gsap.fromTo(cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
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
      className="relative py-32 px-6 bg-gradient-to-b from-black via-zinc-900/30 to-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight">
            What People Say
          </h2>
          <p className="text-xl text-gray-400">
            Words from teams I've worked with
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-8 hover:border-lime-400/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(163,230,53,0.1)]"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <div className="inline-flex p-3 bg-lime-400/10 border border-lime-400/20 group-hover:bg-lime-400/20 transition-all duration-300">
                  <Quote className="w-6 h-6 text-lime-400" />
                </div>
              </div>

              {/* Highlight Badge */}
              <div className="mb-4">
                <span className="text-xs font-bold text-lime-400 uppercase tracking-wider px-3 py-1 bg-lime-400/10 border border-lime-400/20">
                  {testimonial.highlight}
                </span>
              </div>

              {/* Quote */}
              <blockquote className="mb-6">
                <p className="text-gray-300 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              {/* Author */}
              <div className="pt-4 border-t border-zinc-800 group-hover:border-lime-400/20 transition-colors">
                <p className="text-white font-semibold">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-lime-400/0 via-lime-400/0 to-lime-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 pt-20 border-t border-zinc-800"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-lime-400 mb-2">5+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-lime-400 mb-2">15+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Projects Shipped</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-lime-400 mb-2">100%</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-lime-400 mb-2">∞</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Coffee Consumed</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

