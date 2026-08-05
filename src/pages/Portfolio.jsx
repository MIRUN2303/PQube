import { lazy, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Award, Check, ChevronLeft, ChevronRight, Download, FileText, MapPin, Star, Users, X, Globe, Phone, Mail } from 'lucide-react';
import ShinyText from '../components/ShinyText';
import BlurReveal from '../components/BlurReveal';
import SpecularButton from '../components/SpecularButton';
import Stack from '../components/reactbits/Stack';
import {
  pqubeFormula, portfolioStats, portfolioServices, portfolioIndustries,
  accreditations, mediaMentions, portfolioClients,
  caseStudies, testimonials, reviewSummary, stackLogos, deckSlides, contactInfo,
  team,
} from '../data/portfolio';

const SLIDE_BASE = '/images/portfolio/slides';

const SERVICE_IMAGES = [
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&h=600&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=600&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&h=600&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&h=600&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&h=600&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=600&q=80',
];

const INDUSTRY_IMAGES = [
  'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
];

const flowingMenuItems = portfolioIndustries.map((text, idx) => ({
  link: '#industries',
  text,
  image: INDUSTRY_IMAGES[idx],
}));

import CardSwap, { Card } from '../components/reactbits/CardSwap';
import FlowingMenu from '../components/reactbits/FlowingMenu';

const TESTIMONIAL_INTERVAL = 5000;

const PORTRAIT_IMAGES = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&h=350&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=350&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&h=350&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&h=350&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=350&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&h=350&q=80',
];

const portfolioTestimonialCards = testimonials.map((t, idx) => ({
  text: t.quote,
  name: 'Clutch Client',
  position: `${t.case} · ${t.date}`,
  avatar: PORTRAIT_IMAGES[idx % PORTRAIT_IMAGES.length],
}));

/** Avatar image with initials fallback if the image fails to load (Home-style) */
function PortfolioAvatar({ t, className = '', initialsClass = '', radius = '20px' }) {
  const [err, setErr] = useState(false);

  if (err || !t.avatar) {
    return (
      <div
        className={`bg-gradient-to-br from-[var(--pqube-cyan)] to-[var(--pqube-blue)] flex items-center justify-center font-bold text-white shrink-0 ${className} ${initialsClass}`}
        style={{ borderRadius: radius }}
        aria-hidden="true"
      >
        {t.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
      </div>
    );
  }

  return (
    <img
      src={t.avatar}
      alt={t.name}
      loading="lazy"
      onError={() => setErr(true)}
      className={`object-cover shrink-0 ${className}`}
      style={{ borderRadius: radius }}
    />
  );
}

function PortfolioReviewCard({ t }) {
  return (
    <div
      className="card-blur-in flex flex-col md:flex-row gap-6 md:gap-10 p-5 md:p-[30px] md:pl-[65px] rounded-[30px] h-full"
      style={{
        background: 'linear-gradient(108.44deg, rgba(255,255,255,0.12) 20.99%, rgba(255,255,255,0.05) 84.05%)',
        border: '2px solid rgba(255,255,255,0.16)',
        boxShadow: '0px 30px 60px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(8px) saturate(120%)',
        WebkitBackdropFilter: 'blur(8px) saturate(120%)',
      }}
    >
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex gap-1.5 mb-4 md:mb-5 shrink-0" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={18} className="fill-[#FFCE5A] text-[#FFCE5A]" aria-hidden="true" />
          ))}
        </div>

        <p className="flex-1 overflow-hidden text-white font-semibold text-base md:text-[22px] lg:text-[26px] leading-snug md:leading-[36px] md:pr-[60px] line-clamp-7 md:line-clamp-5">
          &ldquo;{t.text}&rdquo;
        </p>

        <div className="mt-5 md:mt-6 flex items-center gap-5 shrink-0">
          <PortfolioAvatar t={t} className="md:hidden w-[60px] h-[60px]" initialsClass="text-base" radius="10px" />
          <div>
            <p className="font-bold text-lg text-white">{t.name}</p>
            <p className="text-sm md:text-base text-white/60 mt-1">{t.position}</p>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center shrink-0">
        <PortfolioAvatar t={t} className="w-40 lg:w-44 h-44 lg:h-52" initialsClass="text-5xl" />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [activeService, setActiveService] = useState(0);
  const [tIdx, setTIdx] = useState(0);
  const [tPaused, setTPaused] = useState(false);
  const [tPlaying, setTPlaying] = useState(true);
  const deckSlideCards = useMemo(
    () =>
      deckSlides.map((slide, idx) => (
        <img
          key={slide.file}
          src={`${SLIDE_BASE}/${slide.file}`}
          alt={`${idx + 1}. ${slide.label}`}
          className="card-image"
          loading="lazy"
        />
      )),
    []
  );
  const rafRef = useRef(null);
  const servicesSwapRef = useRef(null);

  const tCount = testimonials.length;
  const tNext = () => setTIdx((i) => (i + 1) % tCount);
  const tPrev = () => setTIdx((i) => (i - 1 + tCount) % tCount);
  const tRunning = tPlaying && !tPaused;

  useEffect(() => {
    if (!tRunning) return;
    const t = setInterval(tNext, TESTIMONIAL_INTERVAL);
    return () => clearInterval(t);
  }, [tRunning, tIdx]);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafRef.current = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((s) => (s + 1) % deckSlides.length);
      if (e.key === 'ArrowLeft') setLightbox((s) => (s - 1 + deckSlides.length) % deckSlides.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox]);

  const fade = Math.max(0, 1 - scrollY / 320);
  const doubledStack = [...stackLogos, ...stackLogos];
  const doubledClients = [...portfolioClients, ...portfolioClients];

  return (
    <main className="bg-[var(--pqube-gray-50)]">
      {/* Hero banner */}
      <section className="relative h-[420px] md:h-[500px] overflow-hidden bg-[var(--pqube-navy)]">
        <img
          src="https://img.magnific.com/free-vector/flat-illustration-social-media-day-celebration_23-2150340632.jpg?semt=ais_hybrid&w=740&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.2}px) scale(1.08)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--pqube-navy)]/85 via-[var(--pqube-navy)]/65 to-[var(--pqube-gray-50)]" />

        <div
          className="container-page relative z-10 h-full flex flex-col items-center justify-center text-center pt-28 pb-12"
          style={{ opacity: fade, transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <ShinyText text="Our Portfolio" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
          <BlurReveal text="Work That Delivers" className="text-4xl md:text-5xl font-extrabold text-white mb-4" blur={12} y={24} rotate={5} stagger={0.12} />
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Three decades of building people, platforms and businesses — from 1.4-million-SKU commerce to enterprise ERP, across retail, manufacturing, healthcare, fintech and beyond.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <SpecularButton href="#deck" size="md" radius={10} baseColor="#29ABE2" lineColor="#FFFFFF" textColor="#0B1233" intensity={1.3}>
              Browse the Full Deck <ArrowRight size={16} />
            </SpecularButton>
            <SpecularButton href="/contact" size="md" radius={10} baseColor="#FFFFFF" lineColor="#29ABE2" textColor="#1B2A6B" tintOpacity={0.12} intensity={1.1}>
              Start a Project
            </SpecularButton>
          </div>
        </div>
      </section>

      {/* The PQube formula */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <ShinyText text="What is PQube" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="P × P × P = Q" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
            <p className="text-[var(--pqube-gray-500)] max-w-xl mx-auto mt-4">
              We invest in building people who transform businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {Object.entries(pqubeFormula).map(([key, formula]) => (
              <div key={key} className="bg-[var(--pqube-gray-50)] border border-[var(--pqube-gray-200)] rounded-2xl p-6 md:p-8 hover:shadow-lg hover:shadow-[var(--pqube-blue)]/10 transition-shadow">
                <div className="flex items-center justify-center gap-2.5 md:gap-3 mb-4">
                  {formula.terms.map((t, i) => (
                    <div key={t.word} className="flex items-center gap-2.5 md:gap-3">
                      {i > 0 && <span className="text-lg font-bold text-[var(--pqube-cyan)]">+</span>}
                      <div className="text-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--pqube-blue)] to-[var(--pqube-cyan)] flex items-center justify-center text-white font-extrabold text-lg mb-1">
                          {t.letter}
                        </div>
                        <div className="text-xs font-semibold text-[var(--pqube-navy)]">{t.word}</div>
                      </div>
                    </div>
                  ))}
                  <span className="text-xl font-extrabold text-[var(--pqube-cyan)]">=</span>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-xl bg-[var(--pqube-navy)] flex items-center justify-center text-white font-extrabold text-lg mb-1">
                      {formula.result}
                    </div>
                    <div className="text-xs font-semibold text-[var(--pqube-navy)]">{formula.label}</div>
                  </div>
                </div>
                <p className="text-sm text-[var(--pqube-gray-500)] text-center leading-relaxed">{formula.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-[#1A1A1A] py-14">
        <div className="container-page">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {portfolioStats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#B8722C] via-[#D4A017] to-[#F0C75E] mb-2">
                  {s.value}
                </div>
                <div className="text-xs md:text-sm text-white/70 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="section-padding bg-[var(--pqube-gray-50)]">
        <div className="container-page">
          <div className="text-center mb-12">
            <ShinyText text="Accreditations" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="Recognized & Certified" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {accreditations.map((a) => (
              <div key={a.label} className="group w-full sm:w-[calc(25%-12px)] md:w-[calc(20%-13px)] bg-white border border-[var(--pqube-gray-200)] rounded-xl p-4 flex flex-col items-center justify-center gap-3 min-h-[120px] hover:border-[var(--pqube-cyan)]/50 hover:shadow-md transition-all" title={a.label}>
                <img src={a.image} alt={a.label} className="max-h-14 w-auto max-w-full object-contain" loading="lazy" />
                <span className="text-[10px] md:text-xs text-center text-[var(--pqube-gray-500)] leading-snug">{a.label}</span>
              </div>
            ))}

            {mediaMentions.map((m) => (
              <div key={m.title} className="w-full sm:w-[calc(25%-12px)] md:w-[calc(25%-13px)] bg-[var(--pqube-navy)] rounded-xl p-4 flex flex-col justify-center gap-2 min-h-[120px]">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--pqube-cyan)]">
                  <Award size={11} /> {m.date}
                </span>
                <p className="text-[11px] md:text-xs text-white/85 leading-snug">{m.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-[var(--pqube-navy)] relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[var(--pqube-cyan)]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[var(--pqube-blue)]/20 blur-3xl pointer-events-none" />
        <div className="container-page">
          <div className="text-center mb-12">
            <ShinyText text="Services" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="What We Deliver" className="text-3xl md:text-4xl font-extrabold text-white" blur={12} y={24} rotate={5} stagger={0.12} />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center lg:pl-16 lg:pr-16">
            <button
              onClick={() => servicesSwapRef.current?.prev()}
              aria-label="Previous service"
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white text-[var(--pqube-navy)] border border-[var(--pqube-gray-200)] shadow-lg shadow-black/20 items-center justify-center hover:bg-[var(--pqube-cyan)] hover:text-white transition-colors z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => servicesSwapRef.current?.next()}
              aria-label="Next service"
              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white text-[var(--pqube-navy)] border border-[var(--pqube-gray-200)] shadow-lg shadow-black/20 items-center justify-center hover:bg-[var(--pqube-cyan)] hover:text-white transition-colors z-10"
            >
              <ChevronRight size={20} />
            </button>

            {/* Mobile/tablet arrows: anchored to the image stack row (grid starts with it on small screens) */}
            <button
              onClick={() => servicesSwapRef.current?.prev()}
              aria-label="Previous service"
              className="lg:hidden absolute left-0 top-[230px] -translate-y-1/2 w-10 h-10 rounded-full bg-white text-[var(--pqube-navy)] border border-[var(--pqube-gray-200)] shadow-lg shadow-black/20 flex items-center justify-center hover:bg-[var(--pqube-cyan)] hover:text-white transition-colors z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => servicesSwapRef.current?.next()}
              aria-label="Next service"
              className="lg:hidden absolute right-0 top-[230px] -translate-y-1/2 w-10 h-10 rounded-full bg-white text-[var(--pqube-navy)] border border-[var(--pqube-gray-200)] shadow-lg shadow-black/20 flex items-center justify-center hover:bg-[var(--pqube-cyan)] hover:text-white transition-colors z-10"
            >
              <ChevronRight size={20} />
            </button>

            {/* Left: single detailed text, slides with the card stack */}
            <div className="order-2 lg:order-1 h-[460px]">
              <div className="relative h-full rounded-3xl bg-white border border-white/10 shadow-xl shadow-black/30 p-7 sm:p-9 overflow-hidden flex flex-col justify-center">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[var(--pqube-cyan)]/10 blur-2xl pointer-events-none" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService}
                    initial={{ x: 48, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -48, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--pqube-blue)] to-[var(--pqube-cyan)] text-white flex items-center justify-center shrink-0">
                        {(() => { const Icon = portfolioServices[activeService].icon; return <Icon size={20} />; })()}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold tabular-nums tracking-[0.2em] text-[var(--pqube-cyan)]">
                          {String(activeService + 1).padStart(2, '0')} / {String(portfolioServices.slice(0, 6).length).padStart(2, '0')}
                        </p>
                        <h3 className="text-xl font-extrabold text-[var(--pqube-navy)]">{portfolioServices[activeService].title}</h3>
                      </div>
                    </div>
                    <p className="text-sm sm:text-[15px] leading-relaxed text-[var(--pqube-gray-500)]">
                      {portfolioServices[activeService].detail}
                    </p>
                    <div className="flex gap-1.5 mt-7">
                      {portfolioServices.slice(0, 6).map((_, idx) => (
                        <span
                          key={idx}
                          className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeService ? 'w-8 bg-[var(--pqube-cyan)]' : 'w-3 bg-[var(--pqube-gray-200)]'}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right: landscape image stack */}
            <div className="order-1 lg:order-2 relative h-[460px] services-cardswap mx-10 lg:mx-0">
              <div className="absolute inset-0">
                <CardSwap
                  width={470}
                  height={320}
                  cardDistance={18}
                  verticalDistance={20}
                  delay={4500}
                  skewAmount={2}
                  easing="linear"
                  controlRef={servicesSwapRef}
                  onSwap={setActiveService}
                >
                  {portfolioServices.slice(0, 6).map((svc, idx) => (
                    <Card key={svc.id} customClass="overflow-hidden shadow-xl shadow-black/30">
                      <img
                        src={SERVICE_IMAGES[idx]}
                        alt={svc.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-4 pb-3.5 pt-10">
                        <p className="text-xs font-bold text-white">{svc.title}</p>
                      </div>
                    </Card>
                  ))}
                </CardSwap>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Industries we serve */}
      <section id="industries" className="section-padding bg-white">
        <div className="container-page">
          <div className="text-center mb-10">
            <ShinyText text="Industries We Serve" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="Across the Sectors That Matter" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
          </div>

          <div className="h-[540px]">
            <FlowingMenu
              items={flowingMenuItems}
              speed={14}
              textColor="#120F17"
              bgColor="#ffffff"
              marqueeBgColor="#ffffff"
              marqueeTextColor="#120F17"
              borderColor="rgba(18, 15, 23, 0.14)"
            />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <ShinyText text="The People" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="The Team Behind PQube" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
            <p className="text-[var(--pqube-gray-500)] max-w-xl mx-auto mt-4">
              A leadership core in Bengaluru, backed by a 45+ strong delivery team across every engagement.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {team.map((m) => (
              <div key={m.name} className="bg-white border border-[var(--pqube-gray-200)] rounded-2xl p-4 text-center hover:border-[var(--pqube-blue)]/40 hover:shadow-lg hover:shadow-[var(--pqube-blue)]/10 transition-all">
                <img src={m.photo} alt={m.name} className="w-20 h-20 mx-auto rounded-full object-cover ring-2 ring-[var(--pqube-gray-200)] mb-3" loading="lazy" />
                <h3 className="text-sm font-bold text-[var(--pqube-navy)]">{m.name}</h3>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--pqube-cyan)] mt-0.5">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="section-padding bg-[var(--pqube-gray-50)]">
        <div className="container-page">
          <div className="text-center mb-12">
            <ShinyText text="Our Clients" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="Trusted Across Industries" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
            <p className="text-[var(--pqube-gray-500)] max-w-xl mx-auto mt-4">
              From global pharma and Fortune 500 manufacturers to ambitious startups — these brands have trusted PQube with their platforms.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {portfolioClients.map((c) => (
              <div key={c.file} className="group bg-white border border-[var(--pqube-gray-200)] rounded-xl p-4 flex flex-col items-center justify-center gap-2 min-h-[104px] hover:border-[var(--pqube-cyan)]/50 hover:shadow-md transition-all" title={c.name}>
                <img
                  src={`/images/portfolio/clients/${c.file}`}
                  alt={`${c.name} logo`}
                  className="max-h-12 w-auto max-w-[140px] object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                />
                <span className="text-[10px] font-medium text-[var(--pqube-gray-500)] group-hover:text-[var(--pqube-navy)] transition-colors">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <ShinyText text="Case Studies" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="Proof, Not Promises" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {caseStudies.map((cs) => (
              <div key={cs.title} className="group flex flex-col bg-[var(--pqube-gray-50)] border border-[var(--pqube-gray-200)] rounded-2xl p-5 hover:border-[var(--pqube-blue)]/40 hover:shadow-lg hover:shadow-[var(--pqube-blue)]/10 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[var(--pqube-blue)] to-[var(--pqube-cyan)] px-2.5 py-1 rounded-full">{cs.industry}</span>
                  <span className="text-[10px] font-medium text-[var(--pqube-gray-500)]">{cs.period}</span>
                </div>
                <h3 className="text-sm font-bold text-[var(--pqube-navy)] mb-2 leading-snug">{cs.title}</h3>
                <p className="text-xs text-[var(--pqube-gray-500)] leading-relaxed flex-1 mb-4">{cs.description}</p>
                <div className="flex items-center gap-2 pt-3 border-t border-[var(--pqube-gray-200)]">
                  <Users size={13} className="text-[var(--pqube-cyan)]" />
                  <span className="text-xs font-semibold text-[var(--pqube-navy)]">Team of {cs.team}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-[var(--pqube-gray-50)]">
        <div className="container-page">
          <div className="text-center mb-12">
            <ShinyText text="Testimonials" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="In Their Own Words" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
            <p className="text-sm text-[var(--pqube-gray-500)] mt-4">
              {reviewSummary.average}/5 average rating · {reviewSummary.total} verified reviews on Clutch
            </p>
          </div>

          <div
            className="relative overflow-hidden rounded-[40px] md:rounded-[60px] px-5 md:px-14 pt-10 pb-6 md:pt-12 md:pb-8 h-[480px] md:h-[540px] lg:h-[560px] flex flex-col"
            onMouseEnter={() => setTPaused(true)}
            onMouseLeave={() => setTPaused(false)}
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(16,26,66,0.94) 0%, rgba(27,42,107,0.88) 45%, rgba(34,52,138,0.82) 100%), url('/images/grainy-gradient-bg.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[var(--pqube-cyan)]/15 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute -bottom-28 -right-20 w-[420px] h-[420px] rounded-full bg-[var(--pqube-blue)]/20 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-3xl border border-white/5 rotate-45 pointer-events-none" aria-hidden="true" />

            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 text-center pointer-events-none select-none"
              aria-hidden="true"
            >
              <span
                className="italic text-white/[0.06] leading-none whitespace-nowrap text-[7rem] md:text-[13rem]"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                Client Words
              </span>
            </div>

            <div className="absolute top-5 left-5 md:top-7 md:left-7 pointer-events-none select-none" aria-hidden="true">
              <img
                src="/images/portfolio/clutch-logo.jpg"
                alt="Clutch"
                loading="lazy"
                className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white object-cover shadow-lg shadow-black/30"
              />
            </div>

            <div className="relative flex justify-end gap-2.5 mb-5 md:mb-6 shrink-0">
              {[
                { icon: ChevronLeft, label: 'Previous testimonial', action: tPrev },
                { icon: ChevronRight, label: 'Next testimonial', action: tNext },
              ].map(({ icon: Icon, label, action }) => (
                <button
                  key={label}
                  onClick={action}
                  aria-label={label}
                  className="w-[46px] h-[46px] md:w-[54px] md:h-[54px] rounded-full text-white border-2 border-white/15 hover:bg-white hover:text-[#111] hover:scale-110 transition-all duration-300 flex items-center justify-center"
                >
                  <Icon size={26} />
                </button>
              ))}
            </div>

            <div className="relative flex-1 min-h-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tIdx}
                  className="h-full"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <PortfolioReviewCard t={portfolioTestimonialCards[tIdx]} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative flex justify-center gap-2.5 pt-4 md:pt-5 shrink-0">
              {portfolioTestimonialCards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTIdx(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === tIdx ? 'w-8 bg-[var(--pqube-cyan)]' : 'w-2.5 bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}

              <button
                onClick={() => setTPlaying((p) => !p)}
                aria-label={tRunning ? 'Pause autoplay' : 'Play autoplay'}
                title={tRunning ? 'Pause autoplay' : 'Play autoplay'}
                className="absolute right-0 top-[65%] -translate-y-1/2 w-9 h-9 rounded-full bg-white/5 border border-white/20 hover:border-white/40 hover:bg-white/10 transition-colors flex items-center justify-center overflow-hidden"
              >
                <div className="flex items-center gap-[3px] h-3.5">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.span
                      key={i}
                      className="w-[3px] h-3.5 rounded-full"
                      style={{ background: tRunning ? 'var(--pqube-cyan)' : 'rgba(255,255,255,0.35)' }}
                      animate={
                        tRunning
                          ? { scaleY: [0.3, 1, 0.45, 0.8, 0.3], opacity: [0.6, 1, 0.7, 1, 0.6] }
                          : { scaleY: 0.25, opacity: 0.5 }
                      }
                      transition={
                        tRunning
                          ? { duration: 0.9 + i * 0.18, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }
                          : { duration: 0.3 }
                      }
                    />
                  ))}
                </div>

                <div className="absolute bottom-[5px] left-[7px] right-[7px] h-[2px] rounded-full bg-white/10">
                  {tRunning && (
                    <motion.div
                      key={tIdx}
                      className="h-full rounded-full origin-left bg-[var(--pqube-cyan)]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: TESTIMONIAL_INTERVAL / 1000, ease: 'linear' }}
                    />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack marquee */}
      <section className="py-14 bg-white overflow-hidden">
        <div className="text-center mb-8">
          <ShinyText text="Technology Stack" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em]" />
        </div>
        <div className="group">
          <div className="flex gap-12 items-center animate-marquee w-max group-hover:[animation-play-state:paused]">
            {doubledStack.map((s, idx) => (
              <div key={`${s.file}-${idx}`} className="flex items-center justify-center shrink-0 h-14" title={s.name}>
                <img src={`/images/portfolio/stack/${s.file}`} alt={s.name} className="max-h-11 w-auto max-w-[150px] object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full deck — booklet */}
      <section id="deck" className="section-padding bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#D4A017]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#F0C75E]/10 blur-3xl pointer-events-none" />

        <div className="container-page relative">
          <div className="text-center mb-10">
            <ShinyText text="Company Profile" color="#D4A017" shineColor="#F0C75E" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="The Full Deck" className="text-3xl md:text-4xl font-extrabold text-white" blur={12} y={24} rotate={5} stagger={0.12} />
            <p className="text-white/60 max-w-xl mx-auto mt-4">
              Flip through the booklet — drag a page or click to send it to the back.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
            <div className="w-full max-w-[540px] p-6 md:p-8 justify-self-center">
              <div className="aspect-[16/10]">
                <Stack
                  cards={deckSlideCards}
                  randomRotation={true}
                  sensitivity={180}
                  sendToBackOnClick={true}
                  autoplay={true}
                  autoplayDelay={2600}
                  pauseOnHover={true}
                  mobileClickOnly={true}
                />
              </div>
            </div>

            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#D4A017]/10 border border-[#D4A017]/30 rounded-full px-4 py-1.5 text-xs font-semibold text-[#D4A017] mb-5">
                <FileText size={14} /> 14-page brochure · PDF
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                One Booklet, <span className="bg-gradient-to-r from-[#D4A017] to-[#F0C75E] bg-clip-text text-transparent">Everything PQube</span>
              </h3>
              <p className="text-white/60 mb-6 leading-relaxed">
                Who we are, why clients choose us, our services, journey, accreditations, team,
                clients, testimonials and case studies — all in a single shareable deck.
              </p>
              <ul className="text-left space-y-2.5 mb-8">
                {['Autoplay flips pages for you', 'Full-screen view on any page'].map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-sm text-white/80">
                    <span className="w-5 h-5 rounded-full bg-[#D4A017]/15 text-[#D4A017] flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href="/images/portfolio/PQube-Company-Profile.pdf"
                  download="PQube-Company-Profile.pdf"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4A017] to-[#F0C75E] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  <Download size={16} /> Download Brochure (PDF)
                </a>
                <button
                  onClick={() => setLightbox(0)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  Browse All Pages <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact band */}
      <section className="bg-[#1A1A1A] py-16">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Thank You</h2>
            <span className="block w-16 h-1 rounded-full mx-auto mb-6 bg-gradient-to-r from-[#B8722C] via-[#D4A017] to-[#F0C75E]" aria-hidden="true" />
            <p className="text-white/80">We look forward to working with you. Let&apos;s build what&apos;s next — together.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <a href={contactInfo.phoneHref} className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-colors">
              <Phone size={18} className="text-[#D4A017] shrink-0" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-0.5">Call us</div>
                <div className="text-sm font-semibold text-white">{contactInfo.phone}</div>
              </div>
            </a>
            <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-colors">
              <Mail size={18} className="text-[#D4A017] shrink-0" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-0.5">Email</div>
                <div className="text-sm font-semibold text-white">{contactInfo.email}</div>
              </div>
            </a>
            <a href="https://www.pqube.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-colors">
              <Globe size={18} className="text-[#D4A017] shrink-0" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-0.5">Website</div>
                <div className="text-sm font-semibold text-white">{contactInfo.web}</div>
              </div>
            </a>
            <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4">
              <MapPin size={18} className="text-[#D4A017] shrink-0" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-0.5">HQ</div>
                <div className="text-sm font-semibold text-white leading-snug">{contactInfo.address}</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <a href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-[#B8722C] via-[#D4A017] to-[#F0C75E] rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[#B8722C]/30">
              Get a Free Consultation <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={deckSlides[lightbox].label}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((s) => (s - 1 + deckSlides.length) % deckSlides.length); }}
            className="absolute left-3 md:left-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Previous slide"
          >
            <span className="text-lg">&larr;</span>
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={`${SLIDE_BASE}/${deckSlides[lightbox].file}`}
              alt={deckSlides[lightbox].label}
              className="w-full rounded-lg shadow-2xl"
            />
            <div className="flex items-center justify-between mt-4 text-white/80">
              <p className="text-sm font-medium">{deckSlides[lightbox].label}</p>
              <p className="text-xs tabular-nums">{lightbox + 1} / {deckSlides.length}</p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((s) => (s + 1) % deckSlides.length); }}
            className="absolute right-3 md:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Next slide"
          >
            <span className="text-lg">&rarr;</span>
          </button>
        </div>
      )}
    </main>
  );
}
