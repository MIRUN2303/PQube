'use client';
import { useRef, useState, useCallback } from 'react';

interface GlareHoverProps {
  children: React.ReactNode;
  className?: string;
  glareOpacity?: number;
  glareColor?: string;
}

export default function GlareHover({ children, className = '', glareOpacity = 0.12, glareColor = '255,255,255' }: GlareHoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setStyle({
      background: `radial-gradient(circle at ${x}% ${y}%, rgba(${glareColor}, ${glareOpacity}) 0%, transparent 60%)`,
    });
  }, [glareColor, glareOpacity]);

  const handleMouseLeave = useCallback(() => {
    setStyle({});
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-300" style={style} />
      {children}
    </div>
  );
}
