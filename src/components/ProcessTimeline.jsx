import { useRef, useEffect } from 'react';
import { processSteps } from '../data/processSteps';
import ShinyText from './ShinyText';

const STEP_COUNT = processSteps.length;

export default function ProcessTimeline() {
  return (
    <section className="section-padding bg-[var(--pqube-gray-50)] overflow-hidden">
      <div className="container-page">
        <div className="text-center mb-10 md:mb-14">
          <ShinyText text="How We Work" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]">
            Our Engagement Roadmap
          </h2>
          <p className="text-[var(--pqube-gray-500)] max-w-xl mx-auto mt-4">
            A proven methodology built on two decades of delivery experience.
          </p>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden relative max-w-md mx-auto">
          <MobileRoadmap />
        </div>

        {/* Desktop layout */}
        <div className="hidden md:block relative max-w-5xl mx-auto">
          <DesktopRoadmap />
        </div>
      </div>
    </section>
  );
}

/* ─── Desktop Roadmap ─────────────────────────────────────────────────────── */
function DesktopRoadmap() {
  const n = processSteps.length;
  const offsetY = 8;
  const containerRef = useRef(null);
  const pathActiveRef = useRef(null);
  const revealedCount = useRef(0);

  const pathD = (() => {
    const segW = 100 / (n - 1);
    let d = `M 0,${50 + (0 % 2 === 0 ? offsetY : -offsetY)}`;
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

  // Update the path draw progress based on how many steps are revealed
  const updatePath = (count) => {
    const path = pathActiveRef.current;
    if (!path) return;
    // Each step draws 1/n of the total path
    const progress = Math.min(count / (n - 1), 1);
    const total = 1000;
    path.style.strokeDashoffset = total * (1 - progress);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dots = container.querySelectorAll('.rm-dot');
    const cards = container.querySelectorAll('.rm-card');

    const observers = [];

    dots.forEach((dot, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Small stagger between dot and card
            dot.classList.add('rm-visible');
            setTimeout(() => {
              cards[i]?.classList.add('rm-visible');
            }, 150);

            revealedCount.current = Math.max(revealedCount.current, i + 1);
            updatePath(revealedCount.current);
            obs.disconnect();
          }
        },
        { threshold: 0.4, rootMargin: '0px 0px -60px 0px' }
      );
      obs.observe(dot);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <div ref={containerRef} className="relative pt-8 pb-4">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Gray baseline path */}
        <path
          d={pathD}
          fill="none"
          stroke="var(--pqube-gray-200)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        {/* Active gradient path — drawn as cards reveal */}
        <path
          ref={pathActiveRef}
          d={pathD}
          fill="none"
          stroke="url(#roadGrad)"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          style={{ transition: 'stroke-dashoffset 0.6s ease-in-out' }}
        />
        <defs>
          <linearGradient id="roadGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--pqube-cyan)" />
            <stop offset="100%" stopColor="var(--pqube-blue)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex justify-between items-start relative z-10">
        {processSteps.map((step, idx) => {
          const Icon = step.icon;
          const isTop = idx % 2 === 0;

          return (
            <div key={step.id} className="flex flex-col items-center w-48 shrink-0">
              {/* Dot */}
              <div className="rm-dot rm-hidden">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md bg-[var(--pqube-cyan)]">
                  {idx + 1}
                </div>
              </div>

              {isTop ? <div className="mt-20" /> : <div className="mt-4" />}

              {/* Card */}
              <div className="rm-card rm-hidden">
                <div className="bg-white border border-[var(--pqube-gray-200)] rounded-xl p-4 shadow-sm">
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

      <style>{`
        .rm-hidden {
          opacity: 0;
          transform: scale(0.6) translateY(16px);
          transition: opacity 0.55s cubic-bezier(0.34, 1.56, 0.64, 1),
                      transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .rm-visible.rm-hidden {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      `}</style>
    </div>
  );
}

/* ─── Mobile Roadmap ──────────────────────────────────────────────────────── */
function MobileRoadmap() {
  const containerRef = useRef(null);
  const lineProgressRef = useRef(null);
  const revealedCount = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dots = container.querySelectorAll('.rm-dot');
    const cards = container.querySelectorAll('.rm-card');
    const totalSteps = dots.length;

    const observers = [];

    dots.forEach((dot, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            dot.classList.add('rm-visible');
            setTimeout(() => {
              cards[i]?.classList.add('rm-visible');
            }, 150);

            revealedCount.current = Math.max(revealedCount.current, i + 1);

            // Update vertical line progress
            const lineEl = lineProgressRef.current;
            if (lineEl) {
              const pct = Math.min((revealedCount.current / totalSteps) * 100, 100);
              lineEl.style.height = `${pct}%`;
            }

            obs.disconnect();
          }
        },
        { threshold: 0.5, rootMargin: '0px 0px -40px 0px' }
      );
      obs.observe(dot);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <div ref={containerRef} className="relative max-w-md mx-auto">
      {/* Gray vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--pqube-gray-200)]" />
      {/* Active vertical line progress */}
      <div
        ref={lineProgressRef}
        className="absolute left-4 top-0 w-0.5 bg-gradient-to-b from-[var(--pqube-cyan)] to-[var(--pqube-blue)]"
        style={{ height: '0%', transition: 'height 0.6s ease-in-out' }}
      />

      <div className="relative space-y-8">
        {processSteps.map((step, idx) => (
          <MobileStep key={step.id} step={step} index={idx} />
        ))}
      </div>

      <style>{`
        .rm-hidden {
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.55s cubic-bezier(0.34, 1.56, 0.64, 1),
                      transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .rm-visible.rm-hidden {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </div>
  );
}

function MobileStep({ step, index }) {
  const Icon = step.icon;

  return (
    <div className="relative flex items-start gap-4 pl-10">
      <div className="rm-dot rm-hidden absolute left-4 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md z-10 bg-[var(--pqube-cyan)]">
        {index + 1}
      </div>
      <div className="rm-card rm-hidden flex-1">
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
