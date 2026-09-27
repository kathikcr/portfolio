import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { Vector3 } from 'three';

interface NodeData {
  position: [number, number, number];
  size?: number;
}

interface ConnectionLine {
  from: number;
  to: number;
}

interface NetworkVisualizerProps {
  nodes?: NodeData[];
  connections?: ConnectionLine[];
  nodeColor?: string;
  lineColor?: string;
  animated?: boolean;
  scale?: number;
}

const DEFAULT_NODES: NodeData[] = [
  { position: [0, 0, 0], size: 0.08 },
  { position: [1.2, 0.5, 0], size: 0.06 },
  { position: [-1.1, 0.7, 0.2], size: 0.06 },
  { position: [0.3, -1.2, 0.1], size: 0.05 },
  { position: [-0.8, -0.6, -0.2], size: 0.05 },
  { position: [1.5, -0.4, -0.1], size: 0.04 },
  { position: [-1.5, -0.2, 0.3], size: 0.04 },
  { position: [0.6, 1.3, -0.1], size: 0.05 },
];

const DEFAULT_CONNECTIONS: ConnectionLine[] = [
  { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 },
  { from: 0, to: 4 }, { from: 1, to: 5 }, { from: 2, to: 6 },
  { from: 3, to: 5 }, { from: 4, to: 6 }, { from: 1, to: 7 },
  { from: 2, to: 7 }, { from: 3, to: 4 },
];

export function NetworkVisualizer({
  nodes = DEFAULT_NODES,
  connections = DEFAULT_CONNECTIONS,
  nodeColor = '#4f8ef7',
  lineColor = '#2a3f6a',
  animated = true,
  scale = 1,
}: NetworkVisualizerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (!animated || !groupRef.current) return;
    time.current += delta;
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x = Math.sin(time.current * 0.2) * 0.05;
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* Connection lines */}
      {connections.map((conn, i) => {
        const a = nodes[conn.from]?.position;
        const b = nodes[conn.to]?.position;
        if (!a || !b) return null;
        return (
          <Line
            key={`line-${i}`}
            points={[new Vector3(...a), new Vector3(...b)]}
            color={lineColor}
            lineWidth={0.5}
            transparent
            opacity={0.4}
          />
        );
      })}
      {/* Nodes */}
      {nodes.map((node, i) => (
        <mesh key={`node-${i}`} position={node.position}>
          <sphereGeometry args={[node.size ?? 0.06, 12, 12]} />
          <meshStandardMaterial
            color={nodeColor}
            emissive={nodeColor}
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}
