'use client';
import { useState, useEffect } from 'react';

interface LineSidebarProps {
  sections: { id: string; label: string }[];
  className?: string;
}

export default function LineSidebar({ sections, className = '' }: LineSidebarProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const handleIntersect = (index: number) => (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveIndex(index);
        }
      });
    };

    sections.forEach((section, i) => {
      const el = document.getElementById(section.id);
      if (el) {
        const observer = new IntersectionObserver(handleIntersect(i), {
          rootMargin: '-20% 0px -20% 0px',
          threshold: 0,
        });
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 ${className}`} aria-label="Section navigation">
      <div className="relative flex flex-col items-center gap-3 py-3">
        <div className="absolute inset-y-0 w-px bg-gray-200" />
        {sections.map((section, i) => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className={`relative w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              i === activeIndex
                ? 'border-pqube-primary bg-pqube-primary scale-110'
                : 'border-gray-300 bg-white hover:border-pqube-primary/50'
            }`}
            aria-label={`Go to ${section.label}`}
            title={section.label}
          />
        ))}
      </div>
    </nav>
  );
}
