import { useRef } from 'react';
import type { MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MathUtils } from 'three';

interface BLESignalProps {
  center?: [number, number, number];
  rings?: number;
  color?: string;
}

export function BLESignalRings({
  center = [0, 0.1, -0.1],
  rings = 3,
  color = '#4f8ef7',
}: BLESignalProps) {
  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);

  return (
    <group position={center}>
      {Array.from({ length: rings }, (_, i) => (
        <mesh key={i} ref={(mesh) => { ringRefs.current[i] = mesh; }}>
          <ringGeometry args={[0.88, 0.92, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <SignalAnimator ringRefs={ringRefs} rings={rings} />
    </group>
  );
}

function SignalAnimator({ ringRefs, rings }: { ringRefs: MutableRefObject<(THREE.Mesh | null)[]>; rings: number }) {
  const time = useRef(0);
  useFrame((_, delta) => {
    time.current = (time.current + delta * 0.52) % 1;
    ringRefs.current.forEach((ring, index) => {
      if (!ring) return;
      const phase = (time.current + index / rings) % 1;
      const scale = 0.16 + phase * 1.15;
      ring.scale.setScalar(scale);
      (ring.material as THREE.MeshBasicMaterial).opacity = (1 - phase) * 0.72;
    });
  });
  return null;
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
