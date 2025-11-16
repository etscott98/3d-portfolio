'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';

interface Scene3DProps {
  children?: React.ReactNode;
  camera?: {
    position?: [number, number, number];
    fov?: number;
  };
  enableControls?: boolean;
  className?: string;
}

export default function Scene3D({ 
  children, 
  camera = { position: [0, 0, 5], fov: 75 },
  enableControls = false,
  className = ''
}: Scene3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <PerspectiveCamera
          makeDefault
          position={camera.position}
          fov={camera.fov}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#06b6d4" />
        <pointLight position={[10, 10, 5]} intensity={0.5} color="#8b5cf6" />
        
        {/* Content */}
        <Suspense fallback={null}>
          {children}
        </Suspense>
        
        {/* Controls */}
        {enableControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        )}
      </Canvas>
    </div>
  );
}

