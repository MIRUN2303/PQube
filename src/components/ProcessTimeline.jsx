import { useRef, useEffect } from 'react';
import { processSteps } from '../data/processSteps';
import ShinyText from './ShinyText';

export default function ProcessTimeline() {
  return (
    <section className="section-padding bg-[var(--pqube-gray-50)] overflow-hidden">
      <div className="container-page">
        <div className="text-center mb-10 md:mb-14">
          <ShinyText
            text="How We Work"
            color="#29ABE2"
            shineColor="#ffffff"
            speed={3}
            spread={120}
            className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3"
          />
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]">
            Our Engagement Roadmap
          </h2>
          <p className="text-[var(--pqube-gray-500)] max-w-xl mx-auto mt-4">
            A proven methodology built on two decades of delivery experience.
          </p>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <MobileRoadmap />
        </div>

        {/* Desktop */}
        <div className="hidden md:block relative max-w-5xl mx-auto">
          <DesktopRoadmap />
        </div>
      </div>

      {/* Shared animation styles */}
      <style>{`
        /* ── Desktop items ── */
        .desk-dot,
        .desk-card {
          opacity: 0;
          transform: scale(0.55) translateY(20px);
          transition: opacity 0.55s cubic-bezier(0.34, 1.56, 0.64, 1),
                      transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
          will-change: opacity, transform;
        }
        .desk-dot.rm-show,
        .desk-card.rm-show {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        /* ── Mobile items ── */
        .mob-dot,
        .mob-card {
          opacity: 0;
          transform: translateX(-22px);
          transition: opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                      transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          will-change: opacity, transform;
        }
        .mob-dot.rm-show,
        .mob-card.rm-show {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </section>
  );
}

/* ─── Desktop Roadmap ─────────────────────────────────────────────────────── */
function DesktopRoadmap() {
  const n = processSteps.length;
  const offsetY = 8;
  const containerRef = useRef(null);
  const pathActiveRef = useRef(null);
  const triggered = useRef(false);

  const pathD = (() => {
    const segW = 100 / (n - 1);
    let d = `M 0,${50 + offsetY}`;
    for (let i = 1; i < n; i++) {
      const x1 = (i - 1) * segW;
      const y1 = 50 + ((i - 1) % 2 === 0 ? offsetY : -offsetY);
      const x2 = i * segW;
      const y2 = 50 + (i % 2 === 0 ? offsetY : -offsetY);
      const cpx = (x1 + x2) / 2;
      d += ` Q ${cpx},${y1 + (y2 - y1) * 0.3} ${x2},${y2}`;
    }
    return d;
  })();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          observer.disconnect();

          // 1. Draw the path
          const path = pathActiveRef.current;
          if (path) {
            path.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(0.4, 0, 0.2, 1)';
            path.style.strokeDashoffset = '0';
          }

          // 2. Stagger-reveal dots then cards, one step at a time
          const dots = container.querySelectorAll('.desk-dot');
          const cards = container.querySelectorAll('.desk-card');
          const STAGGER = 0.28; // seconds between each step

          dots.forEach((dot, i) => {
            dot.style.transitionDelay = `${i * STAGGER}s`;
            dot.classList.add('rm-show');
          });
          cards.forEach((card, i) => {
            card.style.transitionDelay = `${0.14 + i * STAGGER}s`;
            card.classList.add('rm-show');
          });
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative pt-8 pb-4">
      {/* SVG connecting path */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Grey baseline */}
        <path
          d={pathD}
          fill="none"
          stroke="var(--pqube-gray-200)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        {/* Animated gradient path */}
        <path
          ref={pathActiveRef}
          d={pathD}
          fill="none"
          stroke="url(#roadGrad)"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <defs>
          <linearGradient id="roadGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--pqube-cyan)" />
            <stop offset="100%" stopColor="var(--pqube-blue)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Step items row */}
      <div className="flex justify-between items-start relative z-10">
        {processSteps.map((step, idx) => {
          const Icon = step.icon;
          const isTop = idx % 2 === 0;

          return (
            <div key={step.id} className="flex flex-col items-center w-48 shrink-0">
              {/* Number dot */}
              <div className="desk-dot">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg bg-gradient-to-br from-[var(--pqube-cyan)] to-[var(--pqube-blue)]">
                  {idx + 1}
                </div>
              </div>

              {/* Vertical spacer alternates top/bottom cards */}
              {isTop ? <div className="mt-20" /> : <div className="mt-4" />}

              {/* Card */}
              <div className="desk-card">
                <div className="bg-white border border-[var(--pqube-gray-200)] rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--pqube-cyan)]">
                      Step {idx + 1}
                    </span>
                    <Icon size={14} className="text-[var(--pqube-navy)] shrink-0" />
                  </div>
                  <h3 className="text-base font-bold text-[var(--pqube-navy)] mb-1">{step.title}</h3>
                  <p className="text-xs text-[var(--pqube-gray-500)] leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Mobile Roadmap ──────────────────────────────────────────────────────── */
function MobileRoadmap() {
  const containerRef = useRef(null);
  const lineProgressRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dots = Array.from(container.querySelectorAll('.mob-dot'));
    const cards = Array.from(container.querySelectorAll('.mob-card'));
    const totalSteps = dots.length;
    let maxRevealed = 0;

    const observers = dots.map((dot, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Reveal dot first, then card with a small delay
            dot.classList.add('rm-show');
            setTimeout(() => cards[i]?.classList.add('rm-show'), 130);

            maxRevealed = Math.max(maxRevealed, i + 1);

            // Grow the colored vertical line
            const lineEl = lineProgressRef.current;
            if (lineEl) {
              const pct = Math.min((maxRevealed / totalSteps) * 100, 100);
              lineEl.style.height = `${pct}%`;
            }

            obs.disconnect();
          }
        },
        { threshold: 0.45, rootMargin: '0px 0px -30px 0px' }
      );
      obs.observe(dot);
      return obs;
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <div ref={containerRef} className="relative max-w-md mx-auto">
      {/* Grey track */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--pqube-gray-200)]" />
      {/* Animated gradient fill */}
      <div
        ref={lineProgressRef}
        className="absolute left-4 top-0 w-0.5 bg-gradient-to-b from-[var(--pqube-cyan)] to-[var(--pqube-blue)]"
        style={{ height: '0%', transition: 'height 0.65s ease-in-out' }}
      />

      <div className="relative space-y-8">
        {processSteps.map((step, idx) => (
          <MobileStep key={step.id} step={step} index={idx} />
        ))}
      </div>
    </div>
  );
}

function MobileStep({ step, index }) {
  const Icon = step.icon;
  return (
    <div className="relative flex items-start gap-4 pl-10">
      <div className="mob-dot absolute left-4 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md z-10 bg-gradient-to-br from-[var(--pqube-cyan)] to-[var(--pqube-blue)]">
        {index + 1}
      </div>
      <div className="mob-card flex-1">
        <div className="bg-white border border-[var(--pqube-gray-200)] rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--pqube-cyan)]">
              Step {index + 1}
            </span>
            <Icon size={14} className="text-[var(--pqube-navy)] shrink-0" />
          </div>
          <h3 className="text-base font-bold text-[var(--pqube-navy)] mb-1">{step.title}</h3>
          <p className="text-xs text-[var(--pqube-gray-500)] leading-relaxed">{step.description}</p>
        </div>
      </div>
    </div>
  );
}
