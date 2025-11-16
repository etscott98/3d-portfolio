'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const skillsData = {
  productDesign: [
    'End-to-end process: research → wireframes → UI → developer handoff',
    'Scalable design systems: tokens, components, documentation',
    'Accessibility-first workflows (semantic HTML, WCAG guidelines)',
    'Tools: Figma (auto layout, variants), Miro, Maze, Adobe CC'
  ],
  technicalFluency: [
    'Front-end: HTML, CSS, JavaScript, TypeScript, web animations (GSAP, Framer Motion)',
    'Back-end: Node.js, Express basics, PostgreSQL (pgvector, schema design), REST/GraphQL APIs',
    'DevOps & Collaboration: Git/GitHub (branching, PR reviews, team workflows), CI/CD familiarity (Vercel, GitHub Actions)'
  ]
};

export default function ToolsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const elements = sectionRef.current?.querySelectorAll('.skill-item');
      if (elements) {
        gsap.set(elements, { clearProps: 'all' });
        
        gsap.fromTo(elements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
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
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6 bg-black border-t border-zinc-800"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight">
            Skills
          </h2>
          <p className="text-xl text-gray-400">
            Tools, technologies, and methodologies
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Design */}
          <div className="skill-item">
            <h3 className="text-3xl font-bold text-lime-400 mb-6 uppercase tracking-tight">
              Product Design
            </h3>
            <ul className="space-y-4">
              {skillsData.productDesign.map((skill, index) => (
                <li key={index} className="flex gap-3 text-gray-300 leading-relaxed">
                  <span className="text-lime-400 mt-1.5 flex-shrink-0">•</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Fluency */}
          <div className="skill-item">
            <h3 className="text-3xl font-bold text-lime-400 mb-6 uppercase tracking-tight">
              Technical Fluency
            </h3>
            <ul className="space-y-4">
              {skillsData.technicalFluency.map((skill, index) => (
                <li key={index} className="flex gap-3 text-gray-300 leading-relaxed">
                  <span className="text-lime-400 mt-1.5 flex-shrink-0">•</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
