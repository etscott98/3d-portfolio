import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { projectData } from '@/lib/projectData';
import { ArrowLeft } from 'lucide-react';
import CaseStudyContent from '@/components/case-study/CaseStudyContent';
import HeroImage from '@/components/case-study/HeroImage';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(projectData).map((id) => ({
    id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const project = projectData[id];
  
  if (!project) {
    return {
      title: 'Case Study Not Found'
    };
  }

  return {
    title: `${project.title} | Erin Scott`,
    description: project.subtitle,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { id } = await params;
  const project = projectData[id];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Full Screen Immersive */}
      <section className="relative h-screen flex items-end">
        {/* Background Image */}
        <HeroImage src={project.images[0]} alt={project.title} />

        {/* Content */}
        <div className="relative z-10 w-full p-8 md:p-16 lg:p-24 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <Link href="/#work">
              <button className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 mb-12 transition-colors text-sm uppercase tracking-wider font-medium">
                <ArrowLeft size={20} />
                Back
              </button>
            </Link>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-8 uppercase tracking-tight leading-none">
              {project.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-3xl text-gray-200 mb-12 max-w-4xl leading-relaxed">
              {project.subtitle}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-12">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Timeline</p>
                <p className="text-lime-400 font-medium text-lg">{project.timeline || '2024'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Role</p>
                <p className="text-white font-medium text-lg">{project.overviewTags[0]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      {project.impacts && project.impacts.length > 0 && (
        <section className="py-16 px-8 bg-zinc-900 border-y border-zinc-800">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {project.impacts.map((impact, index) => (
              <div key={index} className="text-center md:text-left">
                <div className="text-5xl md:text-6xl font-bold text-lime-400 mb-3">{impact.value}</div>
                <div className="text-lg font-bold text-white mb-1 uppercase tracking-wide">{impact.label}</div>
                <div className="text-sm text-gray-400">{impact.desc}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Overview Section */}
      <section className="py-24 px-8 bg-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 uppercase tracking-tight">Overview</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {project.subtitle}
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">Tools & Technologies</h3>
            <div className="flex flex-wrap gap-3 mb-12">
              {project.tools.map((tool, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-lime-400/10 border border-lime-400/30 text-lime-400 text-sm font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">Scope</h3>
            <div className="space-y-2">
              {project.overviewTags.map((tag, i) => (
                <div key={i} className="text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 bg-lime-400"></span>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Blocks - Immersive */}
      <CaseStudyContent project={project} />

      {/* Next Project CTA */}
      <section className="py-32 px-8 bg-black border-t border-zinc-800">
        <div className="text-center">
          <p className="text-gray-400 mb-8 text-xl">More projects</p>
          <Link href="/#work">
            <button className="inline-block px-12 py-5 bg-lime-400 text-black font-bold uppercase tracking-wider text-sm hover:bg-lime-300 transition-all duration-300">
              View All Work
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
