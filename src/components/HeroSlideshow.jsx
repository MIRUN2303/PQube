import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { heroSlides } from '../data/heroSlides';
import ShinyText from './ShinyText';
import SplitText from './reactbits/SplitText';
import FadeContent from './reactbits/FadeContent';
import SpecularButton from './SpecularButton';

const SLIDE_H = 'h-[360px] md:h-[410px] lg:h-[440px]';

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

  return (
    <section
      ref={containerRef}
      className={`relative overflow-hidden flex flex-col ${SLIDE_H}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured slides"
    >
      {/* Slides container */}
      <div className="relative flex-1 w-full overflow-hidden">
        {heroSlides.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 w-full transition-opacity duration-700 ease-in-out ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            aria-hidden={idx !== current}
          >
            {/* Background image */}
            <img
              src={s.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />

            {/* Black tint overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
            {s.darken && <div className="absolute inset-0 bg-black/55" />}

            {/* Animated ambient glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
              <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#F0C75E]/10 blur-3xl animate-pulse-slow" />
              <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-[#D4A017]/15 blur-3xl animate-pulse-slower" />
            </div>

            {/* Content */}
            <div className="container-page relative z-10 h-full flex items-center">
              <div className="w-full py-6 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">
                <div className="max-w-xl text-center md:text-left mx-auto md:mx-0">
                  <div className="mb-3 flex md:block justify-center">
                    <ShinyText
                      text={s.kicker}
                      speed={3}
                      color="#F0C75E"
                      shineColor="#FFF6D8"
                      className="text-xs font-semibold uppercase tracking-[0.15em]"
                    />
                  </div>
                  <SplitText
                    text={s.headline}
                    tag="h1"
                    className="text-[clamp(1.5rem,4vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight text-white max-w-3xl mb-3"
                    textAlign="left"
                    delay={20}
                    duration={0.9}
                    from={{ opacity: 0, y: 26 }}
                    threshold={0.2}
                  />
                  <FadeContent blur duration={900} delay={250} threshold={0.2}>
                    <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-xl mx-auto md:mx-0 mb-5">
                      {s.supporting}
                    </p>
                  </FadeContent>
                  <FadeContent duration={600} delay={450} threshold={0.2}>
                    <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3 md:gap-4">
                      <SpecularButton href={s.cta.primary} size="lg" radius={12} baseColor="linear-gradient(135deg, #B8722C 0%, #D4A017 50%, #F0C75E 100%)" lineColor="#FFF6D8" textColor="#1B2A6B" intensity={1.5} followMouse proximity={250}>
                        {s.ctaPrimaryLabel}
                      </SpecularButton>
                      <SpecularButton href={s.cta.secondary} size="lg" radius={12} baseColor="#FFFFFF" lineColor="#FFFFFF" textColor="#1B2A6B" intensity={1.2} followMouse proximity={250}>
                        {s.ctaSecondaryLabel}
                      </SpecularButton>
                    </div>
                  </FadeContent>
                </div>
                {s.logo && (
                  <div className="relative hidden lg:flex items-center justify-center">
                    <div className="absolute w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(240,199,94,0.28)_0%,rgba(240,199,94,0.1)_45%,transparent_70%)]" />
                    <img
                      src={s.logo}
                      alt="PQube"
                      className="relative h-[170px] w-auto lg:mr-8 [filter:drop-shadow(0_0_18px_rgba(255,255,255,0.45))_drop-shadow(0_0_4px_rgba(255,255,255,0.35))]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button
          onClick={() => { prev(); handleInteraction(); }}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white hover:shadow-lg hover:shadow-[#D4A017]/25 transition-all z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => { next(); handleInteraction(); }}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white hover:shadow-lg hover:shadow-[#D4A017]/25 transition-all z-20"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Bottom controls */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label="Slide indicators">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { goTo(idx); handleInteraction(); }}
                role="tab"
                aria-selected={current === idx}
                aria-label={`Go to slide ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  current === idx ? 'bg-[#D4A017] w-6' : 'bg-white/30 hover:bg-white/50'
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
      </div>
    </section>
  );
}
