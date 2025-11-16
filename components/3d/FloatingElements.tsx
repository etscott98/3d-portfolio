'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingElementProps {
  position: [number, number, number];
  scale?: number;
  color?: string;
  type?: 'sphere' | 'box' | 'torus' | 'octahedron';
}

function FloatingElement({ position, scale = 1, color = '#06b6d4', type = 'sphere' }: FloatingElementProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
      
      // Subtle floating movement
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  const material = (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={0.3}
      roughness={0.2}
      metalness={0.8}
      transparent
      opacity={0.6}
    />
  );

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        {type === 'sphere' && <Sphere args={[1, 32, 32]}>{material}</Sphere>}
        {type === 'box' && <Box args={[1, 1, 1]}>{material}</Box>}
        {type === 'torus' && <Torus args={[1, 0.3, 16, 32]}>{material}</Torus>}
        {type === 'octahedron' && <Octahedron args={[1]}>{material}</Octahedron>}
      </mesh>
    </Float>
  );
}

export default function FloatingElements() {
  return (
    <>
      {/* Cyan elements */}
      <FloatingElement position={[-3, 2, -2]} scale={0.8} color="#06b6d4" type="sphere" />
      <FloatingElement position={[3, 1, -3]} scale={0.6} color="#06b6d4" type="octahedron" />
      
      {/* Blue elements */}
      <FloatingElement position={[-2, -1, -1]} scale={0.7} color="#3b82f6" type="torus" />
      <FloatingElement position={[4, -2, -2]} scale={0.5} color="#3b82f6" type="box" />
      
      {/* Purple elements */}
      <FloatingElement position={[2, 3, -4]} scale={0.9} color="#8b5cf6" type="sphere" />
      <FloatingElement position={[-4, -1.5, -3]} scale={0.6} color="#8b5cf6" type="octahedron" />
      
      {/* Pink accent */}
      <FloatingElement position={[0, -2.5, -2]} scale={0.5} color="#ec4899" type="torus" />
    </>
  );
}

