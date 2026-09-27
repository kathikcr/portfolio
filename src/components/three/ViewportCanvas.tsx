import { useState, useEffect } from 'react';
import type { ReactNode, ComponentProps } from 'react';
import { Canvas } from '@react-three/fiber';
import { ErrorBoundary } from '../ui/ErrorBoundary';

type CanvasProps = ComponentProps<typeof Canvas>;

interface ViewportCanvasProps extends Omit<CanvasProps, 'children'> {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function checkWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return Boolean(gl);
  } catch {
    return false;
  }
}

export function ViewportCanvas({
  children,
  fallback = null,
  className,
  style,
  camera = { position: [0, 0, 4.2], fov: 45 },
  gl,
  dpr = [1, 1.5],
  ...rest
}: ViewportCanvasProps) {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglSupported(checkWebGL());
  }, []);

  if (webglSupported === false) {
    return (
      <div className={className} style={{ width: '100%', height: '100%', position: 'relative', ...style }}>
        {fallback}
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{ width: '100%', height: '100%', position: 'relative', ...style }}
    >
      <ErrorBoundary fallback={fallback}>
        {webglSupported && (
          <Canvas
            camera={camera}
            dpr={dpr}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'default',
              failIfMajorPerformanceCaveat: false,
              ...gl,
            }}
            onCreated={({ gl: renderer }) => {
              renderer.domElement.addEventListener('webglcontextlost', (e) => {
                e.preventDefault();
                console.warn('[ViewportCanvas] WebGL context lost.');
              });
            }}
            {...rest}
          >
            {children}
          </Canvas>
        )}
      </ErrorBoundary>
    </div>
  );
}
