'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageLightbox from '@/components/shared/ImageLightbox';

interface HeroImageProps {
  src: string;
  alt: string;
}

export default function HeroImage({ src, alt }: HeroImageProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div 
        className="absolute inset-0 cursor-pointer group"
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
        <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm uppercase tracking-wide bg-black/50 px-4 py-2">
          Click to enlarge
        </div>
      </div>

      <ImageLightbox
        isOpen={lightboxOpen}
        imageSrc={src}
        imageAlt={alt}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}

