'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap, Rocket, Award } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const timelineData = [
  {
    year: '2025',
    title: 'Leading Innovation',
    company: 'Current',
    description: 'Leading product design for AI-powered applications and IoT platforms, shipping features that delight users and drive business growth.',
    icon: Rocket,
    color: 'from-cyan-400 to-blue-500',
  },
  {
    year: '2024',
    title: 'FloLogic Mobile Redesign',
    company: 'FloLogic',
    description: 'Complete mobile app overhaul resulting in 50% fewer taps and 25% reduction in support calls.',
    icon: Briefcase,
    color: 'from-blue-500 to-purple-500',
  },
  {
    year: '2023',
    title: 'Product Designer',
    company: 'Multiple Projects',
    description: 'Shipped multiple B2B and consumer products, from internal tools to AI social platforms.',
    icon: Award,
    color: 'from-purple-500 to-pink-500',
  },
  {
    year: '2022',
    title: 'Y Combinator Finalist',
    company: 'Teamu',
    description: 'Led UX/UI for Teamu, reaching 300+ MAU in the first month and recognized by Y Combinator.',
    icon: GraduationCap,
    color: 'from-pink-500 to-red-500',
  },
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      // Animate timeline items
      gsap.from(sectionRef.current.querySelectorAll('.timeline-item'), {
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate the connecting line
      gsap.from(sectionRef.current.querySelector('.timeline-line'), {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom center',
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 bg-black overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
            The <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-xl text-white/60">
            Key milestones that shaped my approach to design and development
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="timeline-line absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-16">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Year Badge */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg shadow-blue-500/30`}>
                    <item.icon size={28} className="text-white" />
                  </div>
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`ml-24 md:ml-0 md:w-[calc(50%-4rem)] glass rounded-2xl p-6 md:p-8 ${
                    index % 2 === 0 ? 'md:text-right' : ''
                  }`}
                >
                  <div className={`text-3xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-2`}>
                    {item.year}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-cyan-400 mb-4 font-semibold">
                    {item.company}
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

