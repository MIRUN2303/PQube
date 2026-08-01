import { useState, useEffect, useRef, useCallback } from 'react';
import { valueTabs } from '../data/values';
import { ChevronLeft, ChevronRight, Play, Pause, Quote, Users, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';
import SpecularButton from './SpecularButton';
import ShinyText from './ShinyText';
import BlurReveal from './BlurReveal';

const INTERVAL = 6000;
const total = valueTabs.length;

export default function WhyPQubeTabs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const timerRef = useRef(null);
  const rafRef = useRef(null);
  const animStartRef = useRef(null);

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
      {/* Ambient background orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[var(--pqube-cyan)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[var(--pqube-blue)]/10 blur-3xl" />

      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-8">
        <div className="text-center mb-8 md:mb-10">
          <ShinyText text="Why PQube" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
          <BlurReveal text="What Drives Us" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
        </div>

        <div className="xl:grid xl:grid-cols-[11rem_minmax(0,64rem)_11rem] xl:justify-center xl:items-center xl:gap-6">
          {/* ── Formula card — aligned beside the slideshow (left) ── */}
          <div className="hidden xl:flex justify-end">
            <aside className="w-full -rotate-6 hover:rotate-0 hover:-translate-y-1.5 transition-transform duration-500">
              <div className="rounded-2xl bg-white/95 backdrop-blur-md border border-[var(--pqube-gray-200)] shadow-[0_18px_44px_-16px_rgba(11,58,110,0.25)] p-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--pqube-cyan)] mb-4">The PQube Formula</p>
                <ul className="space-y-2.5">
                  <li className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#29ABE2]/10 text-[#0e6ab3] flex items-center justify-center"><Users size={13} /></span>
                    <span className="text-sm font-semibold text-[var(--pqube-navy)]">People</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#1B6FD6]/10 text-[#12539f] flex items-center justify-center"><ShieldCheck size={13} /></span>
                    <span className="text-sm font-semibold text-[var(--pqube-navy)]">Principles</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#4C5BD4]/10 text-[#3b4bc0] flex items-center justify-center"><TrendingUp size={13} /></span>
                    <span className="text-sm font-semibold text-[var(--pqube-navy)]">Prosperity</span>
                  </li>
                </ul>
                <div className="mt-4 pt-3.5 border-t border-dashed border-[var(--pqube-gray-200)] flex items-center justify-between">
                  <span className="text-sm font-extrabold text-[var(--pqube-navy)]">= Quantum</span>
                  <Sparkles size={14} className="text-[var(--pqube-cyan)]" />
                </div>
              </div>
            </aside>
          </div>

          <div className="relative max-w-5xl mx-auto w-full">
            <div className="relative bg-white rounded-3xl shadow-[0_24px_70px_-24px_rgba(11,58,110,0.25)] border border-[var(--pqube-gray-200)] overflow-hidden flex flex-col" style={{ height: '540px' }}>
            {/* Tab pills — inside container top */}
            <div className="relative z-20 flex flex-wrap justify-center gap-2 px-4 pt-6 pb-4" role="tablist">
              {valueTabs.map((t, idx) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={activeIdx === idx}
                  onClick={() => goTo(idx)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    activeIdx === idx
                      ? 'bg-gradient-to-r from-[#29ABE2] to-[#1B6FD6] text-white shadow-md shadow-[#29ABE2]/30 scale-105'
                      : 'bg-[var(--pqube-gray-50)] text-[var(--pqube-gray-500)] hover:bg-[var(--pqube-gray-200)] border border-[var(--pqube-gray-200)]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Auto-advance timer — doubles as the divider */}
            <div className="h-1 z-30 bg-[var(--pqube-gray-200)] shrink-0">
              <div
                className="h-full bg-gradient-to-r from-[var(--pqube-cyan)] to-[var(--pqube-blue)] transition-none"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            {/* Slides */}
            <div className="relative flex-1 min-h-0" style={{ perspective: '1500px' }}>
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
                    {/* Full-bleed image */}
                    <img
                      src={t.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B3A6E]/75 via-[#0B3A6E]/45 to-[#0B3A6E]/15" />
                    {/* Dotted pattern */}
                    <div
                      className="absolute inset-0 opacity-20 mix-blend-overlay"
                      style={{
                        backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                      }}
                    />

                    {/* Desktop index chip (image side) */}
                    <div className="hidden md:flex absolute bottom-5 left-5 items-center gap-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 px-4 py-2.5 shadow-lg">
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-white/80">Chapter</span>
                      <span className="text-lg font-extrabold text-white leading-none">0{idx + 1}<span className="text-white/60 text-sm">/{total}</span></span>
                    </div>

                    {/* Frosted glass content panel */}
                    <div className="absolute inset-x-3 bottom-3 md:inset-y-4 md:right-4 md:left-auto md:w-[46%] bg-white/85 backdrop-blur-xl rounded-2xl border border-white/60 shadow-xl p-6 md:p-8 overflow-y-auto">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#29ABE2] to-[#1B6FD6] flex items-center justify-center shadow-lg shadow-[#29ABE2]/30 shrink-0">
                          <Quote size={16} className="text-white" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[var(--pqube-cyan)] bg-[var(--pqube-cyan)]/10 rounded-full px-2.5 py-1">
                          0{idx + 1} / 0{total}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-extrabold text-[var(--pqube-navy)] mb-4">{t.label}</h3>
                      <div className="text-[var(--pqube-gray-600)] leading-relaxed whitespace-pre-line text-sm md:text-[15px]">
                        {t.content}
                      </div>

                      {/* Decorative accent line */}
                      <div className="mt-6 h-px w-16 bg-gradient-to-r from-[#29ABE2] to-transparent" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          </div>

          {/* ── Philosophy card — aligned beside the slideshow (right) ── */}
          <div className="hidden xl:flex justify-start">
            <aside className="w-full rotate-6 hover:rotate-0 hover:-translate-y-1.5 transition-transform duration-500">
              <div className="rounded-2xl bg-gradient-to-br from-[#1B2A6B] to-[#0B3A6E] text-white shadow-[0_18px_44px_-16px_rgba(11,58,110,0.5)] p-5">
                <Quote size={16} className="text-[#29ABE2]" />
                <p className="mt-3 text-sm font-bold leading-snug">"Build People to Build Business®"</p>
                <p className="mt-1 text-[11px] text-white/60">Our operating philosophy since day one.</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-white/10 border border-white/15 py-2.5 text-center">
                    <div className="text-lg font-extrabold leading-none">20+</div>
                    <div className="mt-1 text-[9px] uppercase tracking-wider text-white/60">Years</div>
                  </div>
                  <div className="rounded-xl bg-white/10 border border-white/15 py-2.5 text-center">
                    <div className="text-lg font-extrabold leading-none">2</div>
                    <div className="mt-1 text-[9px] uppercase tracking-wider text-white/60">Continents</div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          </div>

          {/* Controls — fixed outside container */}
          <div className="max-w-5xl mx-auto flex items-center justify-between mt-5">            <div className="flex items-center gap-3">
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

        {/* CTA — fixed outside container, centered */}
        <div className="max-w-5xl mx-auto mt-6 text-center">
          <SpecularButton href="/about" size="md" radius={10} baseColor="#1B2A6B" lineColor="#29ABE2" textColor="#FFFFFF" intensity={1.3}>
            Learn More About PQube &rarr;
          </SpecularButton>
        </div>
      </div>
    </section>
  );
}
