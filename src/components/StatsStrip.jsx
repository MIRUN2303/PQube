import { useEffect, useState, useRef } from 'react';

function AnimatedCounter({ end, suffix, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done.current) {
          done.current = true;
          const start = Date.now();
          const dur = 2000;
          const tick = () => {
            const p = Math.min((Date.now() - start) / dur, 1);
            setCount(Math.floor(p * (2 - p) * end));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#B8722C] via-[#D4A017] to-[#F0C75E] mb-1">{count}{suffix}</div>
      <div className="text-sm text-white/60">{label}</div>
    </div>
  );
}

export default function StatsStrip() {
  const stats = [
    { end: 20, suffix: '+', label: 'Years Experience' },
    { end: 9, suffix: '+', label: 'Marquee Clients Served' },
    { end: 12, suffix: '', label: 'Service Lines' },
    { end: 2, suffix: '', label: 'Global Delivery Hubs' },
  ];

  return (
    <section className="bg-[#1A1A1A] py-12 md:py-16">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => <AnimatedCounter key={s.label} {...s} />)}
        </div>
      </div>
    </section>
  );
}
