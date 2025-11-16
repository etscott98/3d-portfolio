'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssetLoader } from '@/lib/hooks/useAssetLoader';

export default function LoadingScreen() {
  const { isLoading, progress } = useAssetLoader();
  const [shouldShow, setShouldShow] = useState(true);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  // Ensure loading screen shows for at least 1 second for smooth UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Hide loading screen when both conditions are met
  useEffect(() => {
    if (!isLoading && minTimeElapsed) {
      const timer = setTimeout(() => {
        setShouldShow(false);
      }, 300); // Small delay before exit animation

      return () => clearTimeout(timer);
    }
  }, [isLoading, minTimeElapsed]);

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
        >
          {/* Logo/Name */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight mb-12"
          >
            ERIN SCOTT
          </motion.h1>

          {/* Loading Progress */}
          <div className="w-64 md:w-96">
            {/* Progress Bar */}
            <div className="relative w-full h-1 bg-zinc-800 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-lime-400 to-green-500 shadow-[0_0_10px_rgba(163,230,53,0.6)]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>

            {/* Progress Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="text-center text-gray-400 text-sm mt-4 uppercase tracking-wider"
            >
              {progress < 100 ? `Loading ${Math.round(progress)}%` : 'Ready'}
            </motion.p>
          </div>

          {/* Subtle Animation Element */}
          <motion.div
            className="absolute bottom-12 w-2 h-2 bg-lime-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

