'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import RobotGirl from '@/components/3d/RobotGirl';
import * as THREE from 'three';

interface ScrollAnimated3DBackgroundProps {
  scrollProgress: number;
}

function AnimatedCamera({ scrollProgress }: { scrollProgress: number }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(() => {
    if (cameraRef.current) {
      const offset = THREE.MathUtils.clamp(scrollProgress, 0, 1); // 0 to 1
      
      // Create a cinematic journey through 6 scenes
      let cameraPos = new THREE.Vector3();
      let lookAtPos = new THREE.Vector3();
      let fov = 50;
      
      const sceneSize = 1 / 6; // ~16.67% per scene
      
      if (offset < sceneSize) {
        // Scene 1 (0-16.67%): Wide shot - Full body intro
        const t = offset / sceneSize;
        cameraPos.set(
          THREE.MathUtils.lerp(-2, -0.5, t),
          THREE.MathUtils.lerp(0, 0.5, t),
          THREE.MathUtils.lerp(7, 5.5, t)
        );
        lookAtPos.set(0, 0.2, 0); // Look at upper chest/face area
        fov = THREE.MathUtils.lerp(55, 45, t);
      } 
      else if (offset < sceneSize * 2) {
        // Scene 2 (16.67-33.33%): ZOOM INTO FACE - Portrait close-up
        const t = (offset - sceneSize) / sceneSize;
        cameraPos.set(
          THREE.MathUtils.lerp(-0.5, 0.3, t),
          THREE.MathUtils.lerp(0.5, 1.2, t),  // Higher to focus on face
          THREE.MathUtils.lerp(5.5, 3.2, t)   // Closer but not too close (was 2.5)
        );
        lookAtPos.set(
          THREE.MathUtils.lerp(0, 0, t),
          THREE.MathUtils.lerp(0.2, 1.0, t),  // Look directly at face height
          0
        );
        fov = THREE.MathUtils.lerp(45, 38, t); // Adjust FOV to compensate (was 35)
      } 
      else if (offset < sceneSize * 3) {
        // Scene 3 (33.33-50%): Orbit around face to profile
        const t = (offset - sceneSize * 2) / sceneSize;
        const angle = Math.PI * 0.4 * t; // 0 to 72 degrees
        const radius = 3.5; // Increased from 2.8 to prevent clipping
        cameraPos.set(
          Math.sin(angle) * radius,
          THREE.MathUtils.lerp(1.2, 0.9, t),  // Stay at face level
          Math.cos(angle) * radius
        );
        lookAtPos.set(0, 0.9, 0); // Keep looking at face
        fov = THREE.MathUtils.lerp(38, 42, t); // Adjust FOV to compensate
      } 
      else if (offset < sceneSize * 4) {
        // Scene 4 (50-66.67%): Pull back and shift to show work panel
        const t = (offset - sceneSize * 3) / sceneSize;
        const angle = Math.PI * 0.4 + (Math.PI * 0.2 * t);
        const radius = THREE.MathUtils.lerp(3.5, 5, t); // Start from 3.5 instead of 2.8
        cameraPos.set(
          Math.sin(angle) * radius,
          THREE.MathUtils.lerp(0.9, 0.3, t),
          Math.cos(angle) * radius
        );
        lookAtPos.set(
          THREE.MathUtils.lerp(0, -0.8, t),  // Shift look-at left
          THREE.MathUtils.lerp(0.9, 0.2, t),
          0
        );
        fov = THREE.MathUtils.lerp(42, 48, t); // Adjust FOV slightly
      }
      else if (offset < sceneSize * 5) {
        // Scene 5 (66.67-83.33%): Continue orbit to show skills panel
        const t = (offset - sceneSize * 4) / sceneSize;
        const angle = Math.PI * 0.6 + (Math.PI * 0.3 * t);
        const radius = 5;
        cameraPos.set(
          Math.sin(angle) * radius,
          THREE.MathUtils.lerp(0.3, 0, t),
          Math.cos(angle) * radius
        );
        lookAtPos.set(
          THREE.MathUtils.lerp(-0.8, 0.8, t),  // Shift look-at from left to right
          0.2,
          0
        );
        fov = THREE.MathUtils.lerp(48, 50, t);
      }
      else {
        // Scene 6 (83.33-100%): Final reveal with chat
        const t = (offset - sceneSize * 5) / sceneSize;
        const angle = Math.PI * 0.9 + (Math.PI * 0.2 * t);
        const radius = THREE.MathUtils.lerp(5, 6, t);
        cameraPos.set(
          Math.sin(angle) * radius,
          THREE.MathUtils.lerp(0, -0.2, t),
          Math.cos(angle) * radius
        );
        lookAtPos.set(0, 0, 0);  // Look at center
        fov = THREE.MathUtils.lerp(50, 52, t);
      }
      
      // Smooth camera movement
      cameraRef.current.position.lerp(cameraPos, 0.1);
      cameraRef.current.fov = THREE.MathUtils.lerp(cameraRef.current.fov, fov, 0.1);
      cameraRef.current.updateProjectionMatrix();
      
      // Look at target with smooth transition
      const currentLookAt = new THREE.Vector3();
      cameraRef.current.getWorldDirection(currentLookAt);
      currentLookAt.multiplyScalar(10).add(cameraRef.current.position);
      currentLookAt.lerp(lookAtPos, 0.1);
      cameraRef.current.lookAt(currentLookAt);
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 8]}
      fov={60}
      near={0.5}
      far={100}
    />
  );
}

function DynamicLights({ scrollProgress }: { scrollProgress: number }) {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const spotLightRef = useRef<THREE.SpotLight>(null);
  
  useFrame(() => {
    if (keyLightRef.current && rimLightRef.current && spotLightRef.current) {
      const offset = THREE.MathUtils.clamp(scrollProgress, 0, 1);
      const sceneSize = 1 / 6;
      
      // Adjust lighting based on scroll progress for dramatic effect
      if (offset < sceneSize) {
        // Scene 1: Bright and inviting
        keyLightRef.current.intensity = THREE.MathUtils.lerp(keyLightRef.current.intensity, 1.2, 0.1);
        rimLightRef.current.intensity = THREE.MathUtils.lerp(rimLightRef.current.intensity, 0.8, 0.1);
      } else if (offset < sceneSize * 2) {
        // Scene 2: Intensify for close-up
        keyLightRef.current.intensity = THREE.MathUtils.lerp(keyLightRef.current.intensity, 1.5, 0.1);
        rimLightRef.current.intensity = THREE.MathUtils.lerp(rimLightRef.current.intensity, 1.2, 0.1);
      } else if (offset < sceneSize * 3) {
        // Scene 3: Dramatic side lighting
        keyLightRef.current.intensity = THREE.MathUtils.lerp(keyLightRef.current.intensity, 0.8, 0.1);
        rimLightRef.current.intensity = THREE.MathUtils.lerp(rimLightRef.current.intensity, 1.5, 0.1);
      } else if (offset < sceneSize * 4) {
        // Scene 4: Balanced lighting for work
        keyLightRef.current.intensity = THREE.MathUtils.lerp(keyLightRef.current.intensity, 1.1, 0.1);
        rimLightRef.current.intensity = THREE.MathUtils.lerp(rimLightRef.current.intensity, 0.9, 0.1);
      } else if (offset < sceneSize * 5) {
        // Scene 5: Bright for skills
        keyLightRef.current.intensity = THREE.MathUtils.lerp(keyLightRef.current.intensity, 1.3, 0.1);
        rimLightRef.current.intensity = THREE.MathUtils.lerp(rimLightRef.current.intensity, 0.8, 0.1);
      } else {
        // Scene 6: Epic finale lighting
        keyLightRef.current.intensity = THREE.MathUtils.lerp(keyLightRef.current.intensity, 1.0, 0.1);
        rimLightRef.current.intensity = THREE.MathUtils.lerp(rimLightRef.current.intensity, 1.0, 0.1);
      }
      
      // Animate spotlight for dynamic feel
      spotLightRef.current.intensity = 0.6 + Math.sin(offset * Math.PI * 6) * 0.2;
    }
  });
  
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        ref={keyLightRef}
        position={[5, 5, 5]}
        intensity={1.2}
        castShadow
        color="#ffffff"
      />
      <directionalLight
        ref={rimLightRef}
        position={[-5, 3, -5]}
        intensity={0.8}
        color="#a3e635"
      />
      <pointLight
        position={[0, -2, 3]}
        intensity={0.5}
        color="#60a5fa"
      />
      <spotLight
        ref={spotLightRef}
        position={[0, 5, -5]}
        intensity={0.6}
        angle={0.6}
        penumbra={1}
        color="#a3e635"
      />
    </>
  );
}

function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <AnimatedCamera scrollProgress={scrollProgress} />
      <DynamicLights scrollProgress={scrollProgress} />
      
      {/* Environment for reflections */}
      <Environment preset="city" />
      
      {/* The robot girl model */}
      <RobotGirl scrollProgress={scrollProgress} />
      
      {/* Optional fog for depth */}
      <fog attach="fog" args={['#000000', 5, 15]} />
    </>
  );
}

export default function ScrollAnimated3DBackground({ scrollProgress }: ScrollAnimated3DBackgroundProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check for WebGL support
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        setHasWebGL(!!gl);
      } catch (e) {
        setHasWebGL(false);
      }
    };
    
    checkMobile();
    checkWebGL();
    
    // Simulate loading complete
    const timer = setTimeout(() => setIsLoading(false), 100);
    
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Fallback for no WebGL support
  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 w-full h-screen z-0 bg-gradient-to-b from-black via-zinc-900/50 to-black" />
    );
  }

  return (
    <div className="fixed inset-0 w-full h-screen z-0">
      <Canvas
        shadows={!isMobile}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        style={{ background: 'transparent' }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Scene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 pointer-events-none" />
    </div>
  );
}

