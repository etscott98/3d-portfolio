'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

interface ProjectModelProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  projectName: string;
  color?: string;
}

export default function ProjectModel({ 
  position, 
  rotation = [0, 0, 0],
  projectName,
  color = '#06b6d4'
}: ProjectModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating rotation
      groupRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      
      // Scale on hover
      const targetScale = hovered ? 1.1 : 1;
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Device Frame (Laptop/Phone style) */}
      <RoundedBox
        args={[2, 1.2, 0.1]}
        radius={0.05}
        smoothness={4}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? color : '#1a1a1a'}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          roughness={0.3}
          metalness={0.7}
        />
      </RoundedBox>

      {/* Screen/Display area */}
      <Box args={[1.8, 1, 0.01]} position={[0, 0, 0.06]}>
        <meshStandardMaterial
          color="#0a0a0a"
          emissive={color}
          emissiveIntensity={0.8}
        />
      </Box>

      {/* Project name (only visible on hover) */}
      {hovered && (
        <Text
          position={[0, 0, 0.2]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {projectName}
        </Text>
      )}

      {/* Glow effect */}
      {hovered && (
        <pointLight
          position={[0, 0, 0.5]}
          intensity={2}
          distance={3}
          color={color}
        />
      )}
    </group>
  );
}

