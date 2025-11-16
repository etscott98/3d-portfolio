'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowRight } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { name: 'Email', icon: Mail, href: 'mailto:lunarspired@gmail.com', label: 'lunarspired@gmail.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/erin-scott-6369071b2/', label: 'linkedin.com/in/erin-scott-6369071b2' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/etscott98', label: 'github.com/etscott98' },
  ];

  return (
    <footer className="relative bg-black border-t border-zinc-800/50">
      {/* CTA Section */}
      <div className="relative py-24 px-6 overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime-400/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-400/10 rounded-full blur-[120px]" />
        
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight">
              Let's Create Something
              <span className="block text-lime-400 mt-2">That Matters</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Looking for a designer who codes, thinks in systems, and cares about the humans behind the screens?
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="mailto:lunarspired@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-lime-400 hover:bg-lime-300 text-black font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(163,230,53,0.3)] hover:shadow-[0_0_40px_rgba(163,230,53,0.5)] inline-flex items-center gap-3"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href="/#work"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-lime-400/30 hover:border-lime-400 text-lime-400 font-bold uppercase tracking-wider transition-all duration-300 backdrop-blur-sm hover:bg-lime-400/10"
              >
                View My Work
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-zinc-800/50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* About */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">Erin Scott</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Lead Product Designer & Developer. Building interfaces that make people feel 1% more human.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-bold text-lime-400 mb-4 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/#work" className="text-gray-400 hover:text-lime-400 text-sm transition-colors">
                    Selected Work
                  </a>
                </li>
                <li>
                  <a href="/#about" className="text-gray-400 hover:text-lime-400 text-sm transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="mailto:lunarspired@gmail.com" className="text-gray-400 hover:text-lime-400 text-sm transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-bold text-lime-400 mb-4 uppercase tracking-wider">Connect</h4>
              <ul className="space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-3 text-gray-400 hover:text-lime-400 text-sm transition-colors"
                    >
                      <link.icon className="w-4 h-4" />
                      <span className="group-hover:underline">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} Erin Scott. All rights reserved.</p>
            </div>
            
            {/* 3D Model Attribution */}
            <div className="text-center md:text-right">
              <p className="text-xs">
                3D Character:{' '}
                <a 
                  href="https://sketchfab.com/3d-models/girl-cartoon-cyber-by-oscar-creativo-5092e20e84754029ab1c49848a007639" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lime-400/70 hover:text-lime-400 transition-colors underline"
                >
                  GIRL CARTOON CYBER
                </a>
                {' '}by{' '}
                <a 
                  href="https://sketchfab.com/oscar_creativo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lime-400/70 hover:text-lime-400 transition-colors underline"
                >
                  OSCAR CREATIVO
                </a>
                {' '}licensed under{' '}
                <a 
                  href="http://creativecommons.org/licenses/by/4.0/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lime-400/70 hover:text-lime-400 transition-colors underline"
                >
                  CC-BY-4.0
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

