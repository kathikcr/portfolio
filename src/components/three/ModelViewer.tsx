import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Bounds, Center, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import type { Group } from 'three';
import type { GLTF } from 'three-stdlib';
import { ErrorBoundary } from '../ui/ErrorBoundary';

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
      <primitive object={gltf.scene.clone(true)} />
    </group>
  );
}

/* ── Fallback while loading ─────────────────────────────── */
function ModelFallback() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ padding: '0.55rem 0.8rem', border: '1px solid rgba(79,142,247,.3)', borderRadius: '999px', background: 'rgba(8,13,22,.88)', color: '#aab5ca', whiteSpace: 'nowrap', font: '11px ui-monospace, monospace', letterSpacing: '.04em' }}>
        Loading 3D model · {Math.round(progress)}%
      </div>
    </Html>
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
    <ErrorBoundary
      fallback={(
        <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', padding: '1rem', color: '#aab5ca', background: '#080d16', textAlign: 'center', fontSize: '0.85rem' }}>
          This 3D preview could not load. Switch to Blueprint to view the project architecture.
        </div>
      )}
    >
      <Canvas
        className={className}
        style={{ background: 'transparent', ...style }}
        camera={{ position: cameraPosition, fov }}
        dpr={[1, 1.2]}
        frameloop="demand"
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} castShadow={false} />
        <directionalLight position={[-5, -2, -5]} intensity={0.3} color="#4f8ef7" />

        <Suspense fallback={<ModelFallback />}>
          <Bounds fit clip margin={1.35}>
            <Center>
              <GLBModel
                src={src}
                scale={scale}
                position={position}
                rotation={rotation}
                onLoaded={onLoaded}
              />
            </Center>
            {children}
          </Bounds>
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
    </ErrorBoundary>
  );
}

/* Preload helper */
export function preloadModel(src: string) {
  useGLTF.preload(src);
}
