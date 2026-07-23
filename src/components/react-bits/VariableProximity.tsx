'use client';
import { useRef, useCallback, useEffect, useState } from 'react';

interface VariableProximityProps {
  text: string;
  className?: string;
  radius?: number;
}

export default function VariableProximity({ text, className = '', radius = 120 }: VariableProximityProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [weights, setWeights] = useState<number[]>(() => text.split('').map(() => 400));

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll('span');
    const newWeights: number[] = [];
    chars.forEach((char) => {
      const rect = char.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);
      const weight = Math.max(400, Math.min(800, 800 - (dist / radius) * 400));
      newWeights.push(Math.round(weight));
    });
    setWeights(newWeights);
  }, [radius]);

  const handleMouseLeave = useCallback(() => {
    setWeights(text.split('').map(() => 400));
  }, [text]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const prefersReduced = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReduced.current = mq.matches;
  }, []);

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          style={{
            fontWeight: prefersReduced.current ? 400 : weights[i],
            transition: 'font-weight 0.15s ease-out',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
