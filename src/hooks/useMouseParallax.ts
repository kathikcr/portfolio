import { useEffect, useRef, useState } from 'react';

export function useMouseParallax(strength = 0.02) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      // Normalise to -1 … +1 relative to viewport centre
      targetRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.06);
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.06);
      setOffset({
        x: currentRef.current.x * strength,
        y: currentRef.current.y * strength,
      });
      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [strength]);

  return offset;
}
