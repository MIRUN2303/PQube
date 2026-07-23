'use client';
import { useRef, useState, useCallback } from 'react';

interface MagicBentoProps {
  children: React.ReactNode;
  className?: string;
  glowSize?: number;
  glowColor?: string;
}

export default function MagicBento({ children, className = '', glowSize = 300, glowColor = 'rgba(4, 107, 210, 0.08)' }: MagicBentoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPos({ x: -9999, y: -9999 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="absolute pointer-events-none transition-opacity duration-500"
        style={{
          width: glowSize,
          height: glowSize,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 60%)`,
          left: pos.x - glowSize / 2,
          top: pos.y - glowSize / 2,
          opacity: pos.x > 0 ? 1 : 0,
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
