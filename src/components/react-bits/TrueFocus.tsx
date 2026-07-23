"use client";

import { useRef, useEffect, useState } from "react";

interface TrueFocusProps {
  text?: string;
  value?: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function TrueFocus({ text, value, suffix = "", duration = 2000, className = "" }: TrueFocusProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  // Parse number from string if text is provided (e.g., "20+" -> 20, "+" -> suffix)
  let numValue: number;
  let numSuffix: string;
  if (text !== undefined) {
    const match = text.match(/^([\d.]+)(.*)$/);
    numValue = match ? parseFloat(match[1]) : 0;
    numSuffix = match ? match[2] : "";
  } else {
    numValue = value ?? 0;
    numSuffix = suffix;
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.floor(eased * numValue));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numValue, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}{numSuffix}
    </span>
  );
}
