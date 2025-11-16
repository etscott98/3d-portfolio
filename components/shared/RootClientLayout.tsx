'use client';

import { ReactNode } from 'react';
import SmoothScroll from './SmoothScroll';
import LoadingScreen from './LoadingScreen';
import Navigation from './Navigation';
import CustomCursor from './CustomCursor';
import DeviceRotationPrompt from './DeviceRotationPrompt';
import Footer from './Footer';
import { LoadingProvider } from '@/lib/hooks/useAssetLoader';

export default function RootClientLayout({ children }: { children: ReactNode }) {
  return (
    <LoadingProvider>
      <LoadingScreen />
      <CustomCursor />
      <DeviceRotationPrompt />
      <SmoothScroll>
        <Navigation />
        <main className="relative">
          {children}
        </main>
        <Footer />
      </SmoothScroll>
    </LoadingProvider>
  );
}

