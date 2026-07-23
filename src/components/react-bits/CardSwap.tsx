'use client';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CardSwapItem {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
}

interface CardSwapProps {
  items: CardSwapItem[];
  autoRotateInterval?: number;
  className?: string;
}

export default function CardSwap({ items, autoRotateInterval = 6000, className = '' }: CardSwapProps) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => setActive((a) => (a + 1) % items.length), [items.length]);
  const prev = useCallback(() => setActive((a) => (a - 1 + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const timer = setInterval(next, autoRotateInterval);
    return () => clearInterval(timer);
  }, [isPaused, next, autoRotateInterval, items.length]);

  return (
    <div className={'relative ' + className} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="overflow-hidden min-h-[340px]" role="region" aria-label="Card carousel">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="transition-all duration-500 ease-out"
            style={{
              opacity: i === active ? 1 : 0,
              transform: i === active ? 'translateY(0) scale(1)' : (i < active ? 'translateY(-8px) scale(0.97)' : 'translateY(8px) scale(0.97)'),
              position: i === active ? 'relative' : 'absolute',
              inset: 0,
              pointerEvents: i === active ? 'auto' : 'none',
            }}
            aria-hidden={i !== active}
          >
              <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-10 shadow-sm h-full card-top-line">
                {item.subtitle && (
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-pqube-primary mb-3 block">
                    {item.subtitle}
                  </span>
                )}
                <h3 className="text-2xl md:text-3xl font-semibold text-pqube-dark mb-4 leading-tight">
                  {item.title}
                </h3>
                <p className="text-base text-pqube-text leading-relaxed">{item.content}</p>
              </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-8">
        <button onClick={prev} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-pqube-primary hover:text-pqube-primary transition-colors" aria-label="Previous">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={'w-2 h-2 rounded-full transition-all duration-300 ' + (i === active ? 'w-6 bg-pqube-primary' : 'bg-gray-300 hover:bg-gray-400')}
              aria-label={'Go to card ' + (i + 1)}
            />
          ))}
        </div>
        <button onClick={next} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-pqube-primary hover:text-pqube-primary transition-colors" aria-label="Next">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
