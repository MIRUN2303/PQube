import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Award, Clock, Mail, MapPin, Phone, Quote, Star, Users, X, Globe } from 'lucide-react';
import ShinyText from '../components/ShinyText';
import BlurReveal from '../components/BlurReveal';
import SpecularButton from '../components/SpecularButton';
import {
  pqubeFormula, portfolioStats, portfolioServices, portfolioIndustries,
  journey, team, accreditations, mediaMentions, portfolioClients,
  caseStudies, testimonials, reviewSummary, stackLogos, deckSlides, contactInfo,
} from '../data/portfolio';

const SLIDE_BASE = '/images/portfolio/slides';
const SERVICE_PICS = [2, 180, 48, 96, 60, 119];

import CardSwap, { Card } from '../components/reactbits/CardSwap';
import Cubes from '../components/reactbits/Cubes';

const Lanyard = lazy(() => import('../components/reactbits/Lanyard'));

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [activeService, setActiveService] = useState(0);
  const [activeMember, setActiveMember] = useState(team[0]);
  const [teamInView, setTeamInView] = useState(true);
  const rafRef = useRef(null);
  const teamStageRef = useRef(null);

  useEffect(() => {
    const el = teamStageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setTeamInView(entry.isIntersecting),
      { rootMargin: '150px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const forwardToCubes = (type, e) => {
    const scene = teamStageRef.current?.querySelector('.team-stage .default-animation--scene');
    if (!scene) return;
    scene.dispatchEvent(new PointerEvent(type, { clientX: e.clientX, clientY: e.clientY }));
  };

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
          src="/images/portfolio/cover.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.2}px) scale(1.08)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--pqube-navy)]/90 via-[var(--pqube-navy)]/75 to-[var(--pqube-gray-50)]" />

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
                <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap mb-4">
                  {formula.terms.map((t, i) => (
                    <div key={t.word} className="flex items-center gap-3 md:gap-4">
                      {i > 0 && <span className="text-xl font-bold text-[var(--pqube-cyan)]">+</span>}
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--pqube-blue)] to-[var(--pqube-cyan)] flex items-center justify-center text-white font-extrabold text-xl mb-1.5">
                          {t.letter}
                        </div>
                        <div className="text-xs font-semibold text-[var(--pqube-navy)]">{t.word}</div>
                      </div>
                    </div>
                  ))}
                  <span className="text-2xl font-extrabold text-[var(--pqube-cyan)]">=</span>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--pqube-navy)] flex items-center justify-center text-white font-extrabold text-xl mb-1.5">
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
      <section className="bg-[var(--pqube-navy)] py-14">
        <div className="container-page">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {portfolioStats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--pqube-cyan)] to-[#7FD4F5] mb-2">
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {accreditations.map((a) => (
              <div key={a.label} className="group bg-white border border-[var(--pqube-gray-200)] rounded-xl p-4 flex flex-col items-center justify-center gap-3 min-h-[120px] hover:border-[var(--pqube-cyan)]/50 hover:shadow-md transition-all" title={a.label}>
                <img src={a.image} alt={a.label} className="max-h-14 w-auto max-w-full object-contain" loading="lazy" />
                <span className="text-[10px] md:text-xs text-center text-[var(--pqube-gray-500)] leading-snug">{a.label}</span>
              </div>
            ))}

            {mediaMentions.map((m) => (
              <div key={m.title} className="bg-[var(--pqube-navy)] rounded-xl p-4 flex flex-col justify-center gap-2 min-h-[120px]">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
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
            <div className="order-1 lg:order-2 relative h-[460px] services-cardswap">
              <div className="absolute inset-0">
                <CardSwap
                  width={470}
                  height={320}
                  cardDistance={18}
                  verticalDistance={20}
                  delay={4500}
                  pauseOnHover
                  skewAmount={2}
                  easing="linear"
                  onCardClick={setActiveService}
                  onSwap={setActiveService}
                >
                  {portfolioServices.slice(0, 6).map((svc, idx) => (
                    <Card key={svc.id} customClass="overflow-hidden shadow-xl shadow-black/30">
                      <img
                        src={`https://picsum.photos/id/${SERVICE_PICS[idx]}/800/600`}
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

          <div className="mt-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--pqube-gray-400)]">Industries we serve</span>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {portfolioIndustries.map((ind) => (
                <span key={ind} className="px-4 py-1.5 text-sm font-medium text-gray-200 bg-white/5 border border-white/10 rounded-full">
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <ShinyText text="Our Journey" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="From 2013 to Today" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--pqube-cyan)] via-[var(--pqube-blue)] to-transparent md:-translate-x-px" />
            <div className="space-y-10">
              {journey.map((m, idx) => (
                <div key={m.year} className={`relative flex md:items-center gap-6 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="absolute left-4 -translate-x-1/2 md:left-1/2 top-1 w-3 h-3 rounded-full bg-[var(--pqube-cyan)] ring-4 ring-[var(--pqube-cyan)]/20 z-10" />
                  <div className="md:w-1/2 pl-12 md:pl-0">
                    <div className={`bg-[var(--pqube-gray-50)] border border-[var(--pqube-gray-200)] rounded-xl p-5 ${idx % 2 === 1 ? 'md:ml-8' : 'md:mr-8'} hover:border-[var(--pqube-cyan)]/40 hover:shadow-md transition-all`}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Clock size={13} className="text-[var(--pqube-cyan)]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[var(--pqube-blue)]">{m.year}</span>
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-[var(--pqube-navy)] mb-1">{m.title}</h3>
                      <p className="text-xs md:text-sm text-[var(--pqube-gray-500)] leading-relaxed">{m.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <ShinyText text="The Team" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="Select a Profile" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
            <p className="text-[var(--pqube-gray-500)] max-w-xl mx-auto mt-4">
              Pick a profile — their badge hangs from the strap and swings as you drag it, over a living cube-grid.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* ID card stage */}
            <div className="lg:col-span-6">
              <div
                ref={teamStageRef}
                onPointerMove={(e) => forwardToCubes('pointermove', e)}
                onPointerLeave={(e) => forwardToCubes('pointerleave', e)}
                onClick={(e) => forwardToCubes('click', e)}
                className="relative h-[480px] sm:h-[560px] lg:h-[640px] rounded-3xl overflow-hidden bg-[var(--pqube-navy)]"
              >
                {/* cubes background filling the whole container */}
                {/* cubes background filling the whole container (paused off-screen) */}
                {teamInView && (
                  <div className="team-stage absolute inset-0 z-0 opacity-30 pointer-events-none">
                    <Cubes
                      gridSize={10}
                      maxAngle={105}
                      radius={2}
                      borderStyle="3px solid #fff"
                      faceColor="#1a1a2e"
                      rippleColor="#29ABE2"
                      rippleSpeed={1.5}
                      autoAnimate
                      rippleOnClick
                    />
                  </div>
                )}
                <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[var(--pqube-navy)]/40 via-transparent to-[var(--pqube-navy)]/80 pointer-events-none" />

                {/* lanyard ID card with drag/swing physics */}
                <div className="absolute inset-0 z-10">
                  <Suspense fallback={null}>
                    <Lanyard
                      key={`${activeMember.name}-1.5-3-16`}
                      position={[1.5, 3, 16]}
                      frontImage={activeMember.photo}
                      backImage={activeMember.photo}
                      imageFit="cover"
                      lanyardWidth={0.85}
                    />
                  </Suspense>
                </div>

                {/* member details below the card */}
                <div className="absolute inset-x-0 bottom-0 z-20 pb-5 text-center pointer-events-none">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--pqube-cyan)]">{activeMember.role}</p>
                  <h3 className="text-xl font-extrabold text-white mt-1">{activeMember.name}</h3>
                  <p className="text-xs text-white/60 mt-0.5">{activeMember.phone}</p>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-[var(--pqube-gray-500)]">
                Drag the badge — it hangs and swings like a real ID card over a living cube-grid.
              </p>
            </div>

            {/* Profile selector */}
            <div className="lg:col-span-6">
              <div className="space-y-2.5">
                {team.map((member) => {
                  const active = member.name === activeMember.name;
                  return (
                    <button
                      key={member.name}
                      onClick={() => setActiveMember(member)}
                      className={`w-full text-left rounded-2xl px-4 py-3.5 border transition-all duration-300 ${
                        active
                          ? 'bg-[var(--pqube-gray-50)] border-[var(--pqube-blue)]/50 shadow-lg shadow-[var(--pqube-blue)]/10'
                          : 'bg-white border-[var(--pqube-gray-200)] hover:border-[var(--pqube-blue)]/40 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full overflow-hidden ring-2 transition-all duration-300 shrink-0 ${active ? 'ring-[var(--pqube-cyan)]' : 'ring-[var(--pqube-gray-200)]'}`}>
                          <img src={member.photo} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm font-bold ${active ? 'text-[var(--pqube-navy)]' : 'text-[var(--pqube-navy)]'}`}>{member.name}</p>
                          <p className={`text-[11px] font-semibold uppercase tracking-wider ${active ? 'text-[var(--pqube-cyan)]' : 'text-[var(--pqube-gray-400)]'}`}>{member.role}</p>
                          {active && (
                            <div className="mt-1.5 space-y-0.5">
                              <a href={`mailto:${member.email}`} className="flex items-center gap-1.5 text-[11px] text-[var(--pqube-gray-500)] hover:text-[var(--pqube-blue)] transition-colors">
                                <Mail size={11} className="shrink-0" /> {member.email}
                              </a>
                              <a href={`tel:${member.phone.replace(/-/g, '')}`} className="flex items-center gap-1.5 text-[11px] text-[var(--pqube-gray-500)] hover:text-[var(--pqube-blue)] transition-colors">
                                <Phone size={11} className="shrink-0" /> {member.phone}
                              </a>
                            </div>
                          )}
                        </div>
                        <span className={`text-[var(--pqube-cyan)] transition-transform duration-300 ${active ? 'rotate-90' : ''}`}>
                          <ArrowRight size={16} />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 bg-gradient-to-br from-[var(--pqube-blue)] to-[var(--pqube-cyan)] rounded-2xl p-5 flex items-center gap-4 text-white">
                <Users size={28} className="opacity-90 shrink-0" />
                <p className="text-sm font-bold leading-snug">And a 45+ strong delivery team behind every engagement.</p>
              </div>
            </div>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.quote} className="flex flex-col bg-white border border-[var(--pqube-gray-200)] rounded-2xl p-6 hover:border-[var(--pqube-cyan)]/40 hover:shadow-lg hover:shadow-[var(--pqube-cyan)]/10 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <Quote size={22} className="text-[var(--pqube-cyan)]" />
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} className={i < Math.round(t.rating) ? 'text-[#F5A623] fill-[#F5A623]' : 'text-[var(--pqube-gray-200)] fill-[var(--pqube-gray-200)]'} />
                    ))}
                    <span className="ml-1 text-xs font-bold text-[var(--pqube-navy)]">{t.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-sm text-[var(--pqube-ink)] leading-relaxed flex-1 mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="pt-3 border-t border-[var(--pqube-gray-200)]">
                  <p className="text-[11px] font-semibold text-[var(--pqube-navy)]">{t.case}</p>
                  <p className="text-[10px] text-[var(--pqube-gray-500)] mt-0.5">{t.date} · Clutch review</p>
                </div>
              </div>
            ))}

            <div className="flex flex-col items-center justify-center text-center bg-gradient-to-br from-[var(--pqube-navy)] to-[var(--pqube-blue)] rounded-2xl p-6 text-white">
              <div className="text-5xl font-extrabold mb-1">{reviewSummary.average}<span className="text-2xl text-white/70">/5</span></div>
              <div className="text-sm text-white/80 mb-4">{reviewSummary.total} verified reviews</div>
              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="text-[#F5A623] fill-[#F5A623]" />
                ))}
              </div>
              <a href="https://clutch.co/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white border border-white/25 rounded-full px-4 py-2 transition-colors">
                <Globe size={12} /> Read more on Clutch
              </a>
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

      {/* Full deck viewer */}
      <section id="deck" className="section-padding bg-[var(--pqube-navy)] relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[var(--pqube-cyan)]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[var(--pqube-blue)]/10 blur-3xl pointer-events-none" />

        <div className="container-page relative">
          <div className="text-center mb-12">
            <ShinyText text="Company Profile" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="The Full Deck" className="text-3xl md:text-4xl font-extrabold text-white" blur={12} y={24} rotate={5} stagger={0.12} />
            <p className="text-white/60 max-w-xl mx-auto mt-4">
              Our complete company profile, slide by slide — click any page to view it full screen.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {deckSlides.map((slide, idx) => (
              <button
                key={slide.file}
                onClick={() => setLightbox(idx)}
                className="group relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-[var(--pqube-cyan)]"
              >
                <img
                  src={`${SLIDE_BASE}/${slide.file}`}
                  alt={slide.label}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--pqube-navy)]/90 to-transparent px-3 pt-8 pb-2.5 text-left">
                  <span className="text-[10px] font-bold text-[var(--pqube-cyan)] mr-1.5">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-[11px] font-semibold text-white/90">{slide.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact band */}
      <section className="bg-gradient-to-br from-[var(--pqube-blue)] to-[var(--pqube-cyan)] py-16">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Thank You</h2>
            <p className="text-white/80">We look forward to working with you. Let&apos;s build what&apos;s next — together.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <a href={contactInfo.phoneHref} className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-colors">
              <Phone size={18} className="text-white shrink-0" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-0.5">Call us</div>
                <div className="text-sm font-semibold text-white">{contactInfo.phone}</div>
              </div>
            </a>
            <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-colors">
              <Mail size={18} className="text-white shrink-0" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-0.5">Email</div>
                <div className="text-sm font-semibold text-white">{contactInfo.email}</div>
              </div>
            </a>
            <a href="https://www.pqube.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-colors">
              <Globe size={18} className="text-white shrink-0" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-0.5">Website</div>
                <div className="text-sm font-semibold text-white">{contactInfo.web}</div>
              </div>
            </a>
            <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4">
              <MapPin size={18} className="text-white shrink-0" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-0.5">HQ</div>
                <div className="text-sm font-semibold text-white leading-snug">{contactInfo.address}</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <SpecularButton href="/contact" size="lg" radius={10} baseColor="#FFFFFF" lineColor="#1B2A6B" textColor="#1B2A6B" intensity={1.2}>
              Get a Free Consultation <ArrowRight size={16} />
            </SpecularButton>
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
