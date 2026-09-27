import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MathUtils } from 'three';

interface BLESignalProps {
  center?: [number, number, number];
  rings?: number;
  color?: string;
}

export function BLESignalRings({
  center = [0, -0.2, 0],
  rings = 3,
  color = '#4f8ef7',
}: BLESignalProps) {
  const groupRef = useRef<THREE.Group>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;
  });

  const ringRadii = Array.from({ length: rings }, (_, i) => 0.7 + i * 0.5);

  return (
    <group ref={groupRef} position={center} rotation={[-Math.PI / 2, 0, 0]}>
      {ringRadii.map((r, i) => (
        <mesh key={i}>
          <ringGeometry args={[r - 0.015, r + 0.015, 48]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={MathUtils.clamp(
              0.2 + Math.sin(time.current * 1.5 - i * 0.9) * 0.2,
              0.05,
              0.4
            )}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* Animated data packet travelling between two points */
interface PacketProps {
  from: [number, number, number];
  to: [number, number, number];
  speed?: number;
  color?: string;
  offset?: number;
}

export function DataPacket({ from, to, speed = 1.2, color = '#4f8ef7', offset = 0 }: PacketProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(offset);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    time.current = (time.current + delta * speed) % 1;
    const t = time.current;
    meshRef.current.position.set(
      MathUtils.lerp(from[0], to[0], t),
      MathUtils.lerp(from[1], to[1], t),
      MathUtils.lerp(from[2], to[2], t)
    );
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.04, 12, 12]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}
