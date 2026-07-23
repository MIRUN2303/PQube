"use client";

import { useRef, useState, type ReactNode } from "react";

interface TiltedCardProps {
  children: ReactNode;
  className?: string;
  tiltDegree?: number;
}

export default function TiltedCard({ children, className = "", tiltDegree = 4 }: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(-((y - centerY) / centerY) * tiltDegree);
    setRotateY(((x - centerX) / centerX) * tiltDegree);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transition-transform duration-200 ease-out h-full"
      style={{
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
    >
      <div className={`h-full ${className}`}>{children}</div>
    </div>
  );
}
