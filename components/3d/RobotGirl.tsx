'use client';

import { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAssetLoader } from '@/lib/hooks/useAssetLoader';

interface RobotGirlProps {
  scrollProgress: number;
}

export default function RobotGirl({ scrollProgress: rawScrollProgress }: RobotGirlProps) {
  const group = useRef<THREE.Group>(null);
  const { setAssetLoaded } = useAssetLoader();
  const [isModelReady, setIsModelReady] = useState(false);
  
  // Load the GLTF model
  const { scene, animations } = useGLTF('/models/robot-girl/scene.gltf');
  
  // Use animations with the scene directly (don't clone to preserve animation references)
  const { actions, mixer } = useAnimations(animations, scene);

  // Report when model is loaded and ready
  useEffect(() => {
    if (scene && !isModelReady) {
      setIsModelReady(true);
      setAssetLoaded('robot-girl-model');
      console.log('✅ Robot Girl model loaded');
    }
  }, [scene, setAssetLoaded, isModelReady]);

  // Play animations when available
  useEffect(() => {
    console.log('🎬 Available animations:', animations.map(a => a.name));
    console.log('🎮 Actions available:', Object.keys(actions));
    
    if (actions && Object.keys(actions).length > 0) {
      // Play all animations
      Object.entries(actions).forEach(([name, action]) => {
        if (action) {
          console.log(`▶️ Playing animation: ${name}`);
          action.reset();
          action.setEffectiveTimeScale(1);
          action.setEffectiveWeight(1);
          action.setLoop(THREE.LoopRepeat, Infinity);
          action.play();
        }
      });
    } else {
      console.log('⚠️ No animations found in the model');
    }
    
    return () => {
      // Stop all animations on cleanup
      Object.values(actions).forEach(action => action?.stop());
    };
  }, [actions, animations]);

  // Optimize materials for better performance
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Disable frustum culling to prevent glitching when camera is close
        child.frustumCulled = false;
        
        // Optimize materials
        if (child.material) {
          const material = child.material as THREE.MeshStandardMaterial;
          
          // Reduce quality on mobile
          if (typeof window !== 'undefined' && window.innerWidth < 768) {
            material.roughness = 0.8;
            material.metalness = 0.5;
          }
        }
      }
    });
  }, [scene]);

  // Animate based on scroll progress with cinematic movements
  useFrame((state) => {
    if (group.current) {
      // Get scroll offset (0 to 1)
      const scrollProgress = THREE.MathUtils.clamp(rawScrollProgress, 0, 1);
      const sceneSize = 1 / 6;
      
      // Cinematic rotation based on scroll sections
      let targetRotation = 0;
      let targetY = -1;
      let targetX = 0;
      let targetScale = 1.5;
      
      if (scrollProgress < sceneSize) {
        // Scene 1: Initial welcoming pose
        const t = scrollProgress / sceneSize;
        targetRotation = THREE.MathUtils.lerp(0.2, 0, t);
        targetY = THREE.MathUtils.lerp(-1, -0.9, t);
        targetX = 0;
        targetScale = 1.5;
      } 
      else if (scrollProgress < sceneSize * 2) {
        // Scene 2: Face camera directly for intimate close-up
        const t = (scrollProgress - sceneSize) / sceneSize;
        targetRotation = THREE.MathUtils.lerp(0, -0.05, t);
        targetY = THREE.MathUtils.lerp(-0.9, -0.8, t);
        targetX = THREE.MathUtils.lerp(0, -0.2, t); // Slight shift for composition
        targetScale = THREE.MathUtils.lerp(1.5, 1.5, t); // Keep same scale, camera zooms
      } 
      else if (scrollProgress < sceneSize * 3) {
        // Scene 3: Turn slightly to show profile
        const t = (scrollProgress - sceneSize * 2) / sceneSize;
        targetRotation = THREE.MathUtils.lerp(-0.05, -0.6, t);
        targetY = THREE.MathUtils.lerp(-0.8, -0.85, t);
        targetX = THREE.MathUtils.lerp(-0.2, 0, t);
        targetScale = 1.5;
      }
      else if (scrollProgress < sceneSize * 4) {
        // Scene 4: Shift right so work panel has space
        const t = (scrollProgress - sceneSize * 3) / sceneSize;
        targetRotation = THREE.MathUtils.lerp(-0.6, -1.0, t);
        targetY = THREE.MathUtils.lerp(-0.85, -0.9, t);
        targetX = THREE.MathUtils.lerp(0, 1.2, t); // Move right
        targetScale = THREE.MathUtils.lerp(1.5, 1.4, t);
      }
      else if (scrollProgress < sceneSize * 5) {
        // Scene 5: Shift left for skills panel
        const t = (scrollProgress - sceneSize * 4) / sceneSize;
        targetRotation = THREE.MathUtils.lerp(-1.0, -1.5, t);
        targetY = THREE.MathUtils.lerp(-0.9, -0.95, t);
        targetX = THREE.MathUtils.lerp(1.2, -1.0, t); // Move left
        targetScale = THREE.MathUtils.lerp(1.4, 1.3, t);
      }
      else {
        // Scene 6: Return to center for final reveal
        const t = (scrollProgress - sceneSize * 5) / sceneSize;
        targetRotation = THREE.MathUtils.lerp(-1.5, -2.0, t);
        targetY = THREE.MathUtils.lerp(-0.95, -1.0, t);
        targetX = THREE.MathUtils.lerp(-1.0, 0, t); // Return to center
        targetScale = THREE.MathUtils.lerp(1.3, 1.4, t);
      }
      
      // Add subtle breathing/idle movement
      const breathe = Math.sin(state.clock.elapsedTime * 0.8) * 0.015;
      
      // Apply smooth transformations
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetRotation,
        0.05
      );
      
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        targetY + breathe,
        0.05
      );
      
      group.current.position.x = THREE.MathUtils.lerp(
        group.current.position.x,
        targetX,
        0.05
      );
      
      const newScale = THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.05);
      group.current.scale.set(newScale, newScale, newScale);
    }
  });

  return (
    <group ref={group}>
      <primitive 
        object={scene} 
        scale={1.5} 
        position={[0, -1, 0]} 
        dispose={null}
      />
    </group>
  );
}

// Preload the model for better initial load performance
useGLTF.preload('/models/robot-girl/scene.gltf');

