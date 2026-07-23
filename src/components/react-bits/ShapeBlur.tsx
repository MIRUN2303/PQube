'use client';
import { useRef, useState, useCallback, useEffect } from 'react';

interface ShapeBlurProps {
  color?: string;
  size?: number;
  className?: string;
  intensity?: number;
}

export default function ShapeBlur({ color = '#046bd2', size = 400, className = '', intensity = 0.03 }: ShapeBlurProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div ref={ref} className={`pointer-events-none ${className}`} aria-hidden="true">
      <div
        className="absolute rounded-full blur-3xl opacity-20 transition-transform duration-1000 ease-out"
        style={{
          width: size,
          height: size,
          background: color,
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transform: `translate(-50%, -50%) translate(${(pos.x - 50) * intensity * 2}px, ${(pos.y - 50) * intensity * 2}px)`,
          willChange: 'transform',
        }}
      />
    </div>
  );
}
