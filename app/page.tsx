'use client';

import { useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import ProjectShowcase from '@/components/home/ProjectShowcase';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ToolsSection from '@/components/home/ToolsSection';

export default function Home() {
  useEffect(() => {
    // Ensure page starts at top
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroSection />
      <ProjectShowcase />
      <TestimonialsSection />
      <ToolsSection />
    </>
  );
}
