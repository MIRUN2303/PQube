import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { heroSlides } from '../data/heroSlides';
import SpecularButton from './SpecularButton';

const SLIDE_H = 'h-[580px] md:h-[650px] lg:h-[680px]';

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef(null);
  const containerRef = useRef(null);

  const total = heroSlides.length;

  const goTo = useCallback((idx) => {
    setCurrent(idx);
    setPlaying(true);
  }, []);

  const next = useCallback(() => goTo((current + 1) % total), [current, total, goTo]);
  const prev = useCallback(() => goTo((current - 1 + total) % total), [current, total, goTo]);

  const togglePlay = () => setPlaying((p) => !p);

  useEffect(() => {
    if (!playing) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(next, 3000);
    return () => clearInterval(timerRef.current);
  }, [playing, next]);

  const handleInteraction = () => {
    setPlaying(true);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 3000);
  };

  const touchX = useRef(null);
  const handleTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (!touchX.current) return;
    const diff = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(diff) > 50) {
      diff > 0 ? prev() : next();
      handleInteraction();
    }
    touchX.current = null;
  };

  const slide = heroSlides[current];

  return (
    <section
      ref={containerRef}
      className={`relative overflow-hidden ${SLIDE_H}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured slides"
    >
      {/* Slides container */}
      <div className={`relative ${SLIDE_H} w-full`}>
        {heroSlides.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 ${SLIDE_H} w-full transition-opacity duration-700 ease-in-out ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            aria-hidden={idx !== current}
          >
            {/* Background image */}
            <img
              src={s.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />

            {/* Blue tint overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--pqube-navy)]/90 via-[var(--pqube-navy)]/70 to-[var(--pqube-blue)]/50" />
            {s.darken && <div className="absolute inset-0 bg-[var(--pqube-navy)]/50" />}

            {/* Subtle geometric accents on top */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
              <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/[0.03]" />
              <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/[0.02]" />
              <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-white/[0.04] rounded-3xl rotate-45" />
            </div>

            {/* Content */}
            <div className="container-page relative z-10 h-full flex items-center">
              <div className="w-full py-16 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
                <div className="max-w-2xl">
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[#D4A017] mb-5 opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                  {s.kicker}
                </span>
                <h1 className="text-[clamp(1.75rem,5vw,3.75rem)] font-extrabold leading-[1.1] tracking-tight text-white max-w-3xl mb-5 opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                  {s.headline}
                </h1>
                <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  {s.supporting}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                  <SpecularButton href={s.cta.primary} size="lg" radius={12} baseColor="#1B2A6B" lineColor="#29ABE2" textColor="#FFFFFF" intensity={1.5} className="magnetic-btn">
                    {s.ctaPrimaryLabel}
                  </SpecularButton>
                  <SpecularButton href={s.cta.secondary} size="lg" radius={12} baseColor="#FFFFFF" lineColor="#FFFFFF" textColor="#1B2A6B" intensity={1.2} className="magnetic-btn">
                    {s.ctaSecondaryLabel}
                  </SpecularButton>
                </div>
                </div>
                {s.logo && (
                  <div className="relative hidden md:flex items-center justify-center">
                    <div className="absolute w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(41,171,226,0.28)_0%,rgba(41,171,226,0.1)_45%,transparent_70%)]" />
                    <img
                      src={s.logo}
                      alt="PQube"
                      className="relative h-28 md:h-[410px] w-auto md:mr-8 lg:mr-12 opacity-0 animate-fade-in-up [filter:drop-shadow(0_0_18px_rgba(255,255,255,0.45))_drop-shadow(0_0_4px_rgba(255,255,255,0.35))]"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => { prev(); handleInteraction(); }}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--pqube-navy)]/80 hover:bg-[var(--pqube-navy)] flex items-center justify-center text-white hover:shadow-lg hover:shadow-[var(--pqube-cyan)]/20 transition-all z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => { next(); handleInteraction(); }}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--pqube-navy)]/80 hover:bg-[var(--pqube-navy)] flex items-center justify-center text-white hover:shadow-lg hover:shadow-[var(--pqube-cyan)]/20 transition-all z-20"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Bottom controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <div className="flex items-center gap-2" role="tablist" aria-label="Slide indicators">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { goTo(idx); handleInteraction(); }}
              role="tab"
              aria-selected={current === idx}
              aria-label={`Go to slide ${idx + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                current === idx ? 'bg-[var(--pqube-cyan)] w-6' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
        >
          {playing ? <Pause size={12} /> : <Play size={12} />}
        </button>
      </div>
    </section>
  );
}
