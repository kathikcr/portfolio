import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { Group } from 'three';
import type { GLTF } from 'three-stdlib';

/* ── Prop types ─────────────────────────────────────────── */
export interface ModelViewerProps {
  src: string;
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  enableControls?: boolean;
  cameraPosition?: [number, number, number];
  fov?: number;
  className?: string;
  style?: React.CSSProperties;
  onLoaded?: () => void;
  children?: React.ReactNode;
}

/* ── Inner model (preloaded via useGLTF) ────────────────── */
function GLBModel({
  src,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onLoaded,
}: Pick<ModelViewerProps, 'src' | 'scale' | 'position' | 'rotation' | 'onLoaded'>) {
  const group = useRef<Group>(null);
  const gltf = useGLTF(src) as GLTF & { scene: THREE.Group };

  useEffect(() => {
    if (gltf.scene && onLoaded) onLoaded();
  }, [gltf.scene, onLoaded]);

  const s = Array.isArray(scale) ? scale : [scale, scale, scale];

  return (
    <group ref={group} position={position} rotation={rotation} scale={s as [number,number,number]}>
      <primitive object={gltf.scene} />
    </group>
  );
}

/* ── Fallback while loading ─────────────────────────────── */
function ModelFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#1a1a24" wireframe />
    </mesh>
  );
}

/* ── Main exported component ────────────────────────────── */
export function ModelViewer({
  src,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = false,
  autoRotateSpeed = 0.5,
  enableControls = false,
  cameraPosition = [0, 0, 4],
  fov = 45,
  className,
  style,
  onLoaded,
  children,
}: ModelViewerProps) {
  return (
    <Canvas
      className={className}
      style={{ background: 'transparent', ...style }}
      camera={{ position: cameraPosition, fov }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow={false} />
      <directionalLight position={[-5, -2, -5]} intensity={0.2} color="#4f8ef7" />

      <Environment preset="studio" />

      <Suspense fallback={<ModelFallback />}>
        <GLBModel
          src={src}
          scale={scale}
          position={position}
          rotation={rotation}
          onLoaded={onLoaded}
        />
        {children}
      </Suspense>

      {enableControls && (
        <OrbitControls
          autoRotate={autoRotate}
          autoRotateSpeed={autoRotateSpeed}
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(Math.PI * 3) / 4}
        />
      )}
    </Canvas>
  );
}

/* Preload helper */
export function preloadModel(src: string) {
  useGLTF.preload(src);
}
