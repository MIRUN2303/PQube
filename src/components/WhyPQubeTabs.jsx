import { useState, useEffect, useRef, useCallback } from 'react';
import { valueTabs } from '../data/values';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import SpecularButton from './SpecularButton';
import ShinyText from './ShinyText';

const INTERVAL = 6000;

export default function WhyPQubeTabs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const timerRef = useRef(null);
  const rafRef = useRef(null);
  const animStartRef = useRef(null);

  const total = valueTabs.length;

  const goTo = useCallback((idx) => {
    setPrevIdx(activeIdx);
    setActiveIdx(idx);
    setPlaying(true);
    progressRef.current = 0;
    setProgress(0);
  }, [activeIdx]);

  const next = useCallback(() => goTo((activeIdx + 1) % total), [activeIdx, total, goTo]);
  const prev = useCallback(() => goTo((activeIdx - 1 + total) % total), [activeIdx, total, goTo]);
  const togglePlay = () => setPlaying((p) => !p);

  useEffect(() => {
    if (!playing) {
      clearInterval(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    animStartRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - animStartRef.current;
      const pct = Math.min(elapsed / INTERVAL, 1);
      progressRef.current = pct;
      setProgress(pct);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    timerRef.current = setInterval(() => {
      next();
      animStartRef.current = performance.now();
      progressRef.current = 0;
      setProgress(0);
    }, INTERVAL);

    return () => {
      clearInterval(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, next]);

  return (
    <section className="section-padding bg-[var(--pqube-gray-50)] relative overflow-hidden">
      <div className="container-page">
        <div className="text-center mb-8 md:mb-10">
          <ShinyText text="Why PQube" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]">What Drives Us</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Tab pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-6" role="tablist">
            {valueTabs.map((t, idx) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={activeIdx === idx}
                onClick={() => goTo(idx)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeIdx === idx
                    ? 'bg-[var(--pqube-navy)] text-white shadow-sm'
                    : 'bg-white text-[var(--pqube-gray-500)] hover:bg-[var(--pqube-gray-200)] border border-[var(--pqube-gray-200)]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Fixed-size slide container */}
          <div className="relative bg-white rounded-2xl shadow-lg border border-[var(--pqube-gray-200)] overflow-hidden" style={{ height: '480px' }}>
            {/* Auto-advance timer bar — clipped to container's rounded top */}
            <div className="absolute top-0 left-0 right-0 h-1 z-30 bg-[var(--pqube-gray-200)]">
              <div
                className="h-full bg-gradient-to-r from-[var(--pqube-cyan)] to-[var(--pqube-blue)] transition-none"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="relative w-full h-full" style={{ perspective: '1500px' }}>
              {valueTabs.map((t, idx) => {
                const isActive = activeIdx === idx;
                const isPrev = prevIdx === idx;

                let animName = '';
                if (isActive && prevIdx !== null) {
                  animName = 'page-enter';
                } else if (isPrev) {
                  animName = 'page-exit';
                }

                return (
                  <div
                    key={t.id}
                    role="tabpanel"
                    aria-hidden={!isActive}
                    className={`absolute inset-0 ${isActive || isPrev ? '' : 'hidden'} ${isActive ? 'z-20' : 'z-10'}`}
                    style={{
                      animation: animName ? `${animName} 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards` : undefined,
                      transformOrigin: 'left center',
                    }}
                  >
                    <div className="flex flex-col h-full">
                      <div className="relative h-48 md:h-56 shrink-0 overflow-hidden">
                        <img
                          src={t.image}
                          alt=""
                          className="w-full h-full object-cover"
                          loading={idx === 0 ? 'eager' : 'lazy'}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none" />
                      </div>
                      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                        <h3 className="text-xl md:text-2xl font-bold text-[var(--pqube-navy)] mb-3">{t.label}</h3>
                        <div className="text-[var(--pqube-gray-500)] leading-relaxed whitespace-pre-line text-sm md:text-base">
                          {t.content}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls — fixed outside container */}
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2" role="tablist" aria-label="Slide indicators">
                {valueTabs.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    role="tab"
                    aria-selected={activeIdx === idx}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIdx === idx ? 'bg-[var(--pqube-navy)] w-5' : 'bg-[var(--pqube-gray-200)] w-2 hover:bg-[var(--pqube-gray-500)]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-[var(--pqube-gray-500)] font-medium tabular-nums">
                {activeIdx + 1} / {total}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7">
                <svg className="w-7 h-7 -rotate-90" viewBox="0 0 28 28">
                  <circle cx="14" cy="14" r="11" fill="none" stroke="var(--pqube-gray-200)" strokeWidth="2.5" />
                  <circle
                    cx="14" cy="14" r="11"
                    fill="none"
                    stroke="var(--pqube-cyan)"
                    strokeWidth="2.5"
                    strokeDasharray={Math.PI * 22}
                    strokeDashoffset={Math.PI * 22 * (1 - progress)}
                    strokeLinecap="round"
                    className="transition-none"
                  />
                </svg>
              </div>

              <button
                onClick={togglePlay}
                className="w-7 h-7 rounded-full bg-[var(--pqube-gray-100)] hover:bg-[var(--pqube-gray-200)] flex items-center justify-center text-[var(--pqube-navy)] transition-colors"
                aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
              >
                {playing ? <Pause size={11} /> : <Play size={11} />}
              </button>

              <button
                onClick={prev}
                className="w-7 h-7 rounded-full bg-[var(--pqube-gray-100)] hover:bg-[var(--pqube-gray-200)] flex items-center justify-center text-[var(--pqube-navy)] transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft size={13} />
              </button>
              <button
                onClick={next}
                className="w-7 h-7 rounded-full bg-[var(--pqube-gray-100)] hover:bg-[var(--pqube-gray-200)] flex items-center justify-center text-[var(--pqube-navy)] transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* CTA — fixed outside container, centered */}
        <div className="mt-6 text-center">
          <SpecularButton href="/about" size="md" radius={10} baseColor="#1B2A6B" lineColor="#29ABE2" textColor="#FFFFFF" intensity={1.3}>
            Learn More About PQube &rarr;
          </SpecularButton>
        </div>
      </div>
    </section>
  );
}
