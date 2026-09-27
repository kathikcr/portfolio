import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Group, MathUtils } from 'three';
import type { GLTF } from 'three-stdlib';

interface FloatingModelProps {
  src: string;
  scale?: number | [number, number, number];
  position?: [number, number, number];
  floatAmplitude?: number;
  floatSpeed?: number;
  rotationSpeed?: number;
  parallaxX?: number;
  parallaxY?: number;
}

export function FloatingModel({
  src,
  scale = 1,
  position = [0, 0, 0],
  floatAmplitude = 0.08,
  floatSpeed = 0.6,
  rotationSpeed = 0.15,
  parallaxX = 0,
  parallaxY = 0,
}: FloatingModelProps) {
  const group = useRef<Group>(null);
  const gltf = useGLTF(src) as GLTF & { scene: THREE.Group };
  const time = useRef(Math.random() * Math.PI * 2);

  const s = Array.isArray(scale) ? scale : [scale, scale, scale];

  useFrame((_, delta) => {
    if (!group.current) return;
    time.current += delta;

    // Gentle float
    group.current.position.y =
      position[1] + Math.sin(time.current * floatSpeed) * floatAmplitude;

    // Slow controlled rotation
    group.current.rotation.y += delta * rotationSpeed;

    // Mouse parallax — smooth lerp toward target
    group.current.position.x = MathUtils.lerp(
      group.current.position.x,
      position[0] + parallaxX * 1.5,
      0.04
    );
    group.current.position.z = MathUtils.lerp(
      group.current.position.z,
      position[2] + parallaxY * 0.5,
      0.04
    );
  });

  return (
    <group
      ref={group}
      position={position}
      scale={s as [number, number, number]}
    >
      <primitive object={gltf.scene.clone(true)} />
    </group>
  );
}
