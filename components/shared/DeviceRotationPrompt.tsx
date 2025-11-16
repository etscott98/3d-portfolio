'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw } from 'lucide-react';

export default function DeviceRotationPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Only show on mobile devices in landscape
      if (window.innerWidth < 768 && window.innerWidth > window.innerHeight) {
        setShowPrompt(true);
      } else {
        setShowPrompt(false);
      }
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] bg-black flex flex-col items-center justify-center p-8 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 90, 90, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="mb-8"
          >
            <div className="w-24 h-24 border-4 border-cyan-400 rounded-2xl flex items-center justify-center">
              <RotateCw size={48} className="text-cyan-400" />
            </div>
          </motion.div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            Please Rotate Your Device
          </h2>
          <p className="text-white/70 text-lg">
            This site is best experienced in portrait mode
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

