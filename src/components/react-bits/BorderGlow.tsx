"use client";

import { useRef, useState, type ReactNode } from "react";

interface BorderGlowProps {
  children: ReactNode;
  className?: string;
}

export default function BorderGlow({ children, className = "" }: BorderGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        <div
          className="absolute -inset-4"
          style={{
            background: `radial-gradient(200px circle at ${position.x}px ${position.y}px, rgba(4, 107, 210, 0.15), transparent 60%)`,
          }}
        />
      </div>
      {children}
    </div>
  );
}
