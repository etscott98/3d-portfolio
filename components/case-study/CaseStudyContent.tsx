'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageLightbox from '@/components/shared/ImageLightbox';
import type { Project } from '@/lib/projectData';

interface CaseStudyContentProps {
  project: Project;
}

export default function CaseStudyContent({ project }: CaseStudyContentProps) {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      {/* Content Blocks - Immersive */}
      {project.contentBlocks && project.contentBlocks.length > 0 && (
        <section className="bg-black">
          {project.contentBlocks.map((block, index) => {
            if (block.type === 'text' && block.heading && block.content) {
              return (
                <div key={index} className="py-24 px-8 border-t border-zinc-800">
                  <div className="max-w-4xl mx-auto">
                    <div className="border-l-4 border-lime-400 pl-8">
                      <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 uppercase tracking-tight">{block.heading}</h3>
                      <div 
                        className="prose prose-invert prose-xl max-w-none text-gray-300 
                          [&_h4]:text-white [&_h4]:text-2xl [&_h4]:font-bold [&_h4]:mb-4 [&_h4]:uppercase [&_h4]:mt-8
                          [&_p]:mb-6 [&_p]:text-lg [&_p]:leading-relaxed
                          [&_strong]:text-lime-400 [&_strong]:font-semibold 
                          [&_.result-box]:bg-lime-400/10 [&_.result-box]:border-l-4 [&_.result-box]:border-lime-400 [&_.result-box]:p-6 [&_.result-box]:my-8 [&_.result-box]:text-lg
                          [&_.why-box]:bg-zinc-800 [&_.why-box]:border-l-4 [&_.why-box]:border-zinc-600 [&_.why-box]:p-6 [&_.why-box]:my-8 [&_.why-box]:text-lg"
                        dangerouslySetInnerHTML={{ __html: block.content }}
                      />
                    </div>
                  </div>
                </div>
              );
            }

            if (block.type === 'full-image' && block.image) {
              return (
                <div key={index} className="py-12">
                  <div 
                    className="relative w-full max-w-5xl mx-auto h-[55vh] md:h-[65vh] cursor-pointer group"
                    onClick={() => setLightboxImage({ src: block.image!, alt: block.alt || '' })}
                  >
                    <Image
                      src={block.image}
                      alt={block.alt || ''}
                      fill
                      sizes="100vw"
                      quality={100}
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm uppercase tracking-wide bg-black/50 px-4 py-2">
                        Click to enlarge
                      </div>
                    </div>
                  </div>
                  {block.caption && (
                    <p className="text-center text-sm text-gray-500 mt-6 uppercase tracking-wide px-8">{block.caption}</p>
                  )}
                </div>
              );
            }

            if (block.type === 'gallery' && block.images) {
              return (
                <div key={index} className="py-24 px-8 border-t border-zinc-800">
                  <div className="max-w-7xl mx-auto">
                    {block.heading && (
                      <h3 className="text-4xl font-bold text-white mb-12 uppercase tracking-tight">{block.heading}</h3>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {block.images.map((img, imgIndex) => (
                        <div 
                          key={imgIndex} 
                          className="relative aspect-video max-w-3xl mx-auto border-2 border-zinc-800 cursor-pointer group"
                          onClick={() => setLightboxImage({ src: img.src, alt: img.alt })}
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            quality={100}
                            className="object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm uppercase tracking-wide bg-black/50 px-4 py-2">
                              Click to enlarge
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            if (block.type === 'quote' && block.content) {
              return (
                <div key={index} className="py-24 px-8 border-t border-zinc-800">
                  <div className="max-w-3xl mx-auto">
                    <blockquote className="relative p-12 bg-gradient-to-br from-lime-400/10 to-green-500/10 border-l-4 border-lime-400">
                      <div className="text-lime-400 text-6xl mb-6 opacity-50">"</div>
                      <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed italic mb-6">
                        {block.content}
                      </p>
                      <div className="text-lime-400 text-6xl text-right opacity-50">"</div>
                    </blockquote>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </section>
      )}

      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={!!lightboxImage}
        imageSrc={lightboxImage?.src || ''}
        imageAlt={lightboxImage?.alt || ''}
        onClose={() => setLightboxImage(null)}
      />
    </>
  );
}

