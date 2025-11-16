'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectData, projectOrder } from '@/lib/projectData';
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const projects = projectOrder.map(id => ({ id, ...projectData[id] }));

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate project cards on scroll
      gsap.utils.toArray('.project-card').forEach((card: any) => {
        // Reset card first
        gsap.set(card, { clearProps: 'all' });
        
        gsap.fromTo(card,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Parallax effect on images
        const img = card.querySelector('.project-image');
        if (img) {
          gsap.set(img, { clearProps: 'all' });
          
          gsap.to(img, {
            y: -50,
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      });
    }, containerRef);

    // Cleanup: kill all ScrollTriggers and reset styles
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative min-h-screen py-32 px-6 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 uppercase tracking-tight">
            Selected Work
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            Projects that made people feel more human
          </p>
        </motion.div>

        {/* Project Cards - Large immersive style */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <Link key={project.id} href={`/case-study/${project.id}`}>
              <article className={`project-card group relative ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                {/* Large Image Container */}
                <div className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-zinc-900">
                  <div className="project-image absolute inset-0 transition-all duration-700 group-hover:scale-105 group-hover:brightness-110">
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Gradient Overlay - More dramatic on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent group-hover:from-black/95 group-hover:via-black/70 transition-all duration-700" />
                  
                  {/* Animated Corner Accents */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-lime-400 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-lime-400 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex items-end">
                    <div className="w-full p-8 md:p-12 lg:p-16 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                      <div className="max-w-3xl">
                        {/* Year/Tag with line accent */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-0.5 bg-lime-400 transform origin-left transition-all duration-500 group-hover:w-20" />
                          <div className="text-lime-400 text-sm font-bold uppercase tracking-wider">
                            {project.timeline || '2024'}
                          </div>
                        </div>

                        {/* Title with enhanced hover */}
                        <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 uppercase tracking-tight group-hover:text-lime-400 transition-colors duration-300 drop-shadow-[0_0_30px_rgba(163,230,53,0.3)]">
                          {project.title}
                        </h3>

                        {/* Subtitle with fade-in effect */}
                        <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                          {project.subtitle}
                        </p>

                        {/* Stats Row - Enhanced animation */}
                        {project.impacts && project.impacts.length > 0 && (
                          <div className="flex flex-wrap gap-8 mb-6">
                            {project.impacts.slice(0, 3).map((impact, i) => (
                              <div key={i} className="flex flex-col transform transition-all duration-500 group-hover:scale-110" style={{ transitionDelay: `${i * 50}ms` }}>
                                <span className="text-3xl font-bold text-lime-400 drop-shadow-[0_0_20px_rgba(163,230,53,0.4)]">{impact.value}</span>
                                <span className="text-sm text-gray-400 uppercase tracking-wide">{impact.label}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* CTA - Enhanced with background */}
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-transparent group-hover:bg-lime-400/10 border-2 border-transparent group-hover:border-lime-400 text-white group-hover:text-lime-400 transition-all duration-300 backdrop-blur-sm">
                          <span className="font-medium uppercase tracking-wider text-sm">View Case Study</span>
                          <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(163,230,53,0)] group-hover:shadow-[inset_0_0_100px_rgba(163,230,53,0.1)] transition-all duration-700 pointer-events-none" />
                </div>

                {/* Tags Below - Enhanced with hover */}
                <div className="mt-6 mb-8 flex flex-wrap gap-2">
                  {project.overviewTags.slice(0, 4).map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-gray-400 text-xs uppercase tracking-wider hover:border-lime-400/50 hover:text-lime-400 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
