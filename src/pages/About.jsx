import { useState, useRef, useEffect, useCallback, Suspense, lazy } from 'react';
import { Clock, Users, ShieldCheck, ArrowRight, Mail, Phone, ChevronLeft, ChevronRight, X, Globe, Star, Award, MapPin, ChevronDown, CheckCircle2, BarChart3, Code2, Server, Workflow, Sparkles, Smartphone, ShoppingCart, Megaphone, Database, Heart, Cloud, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PageHero from '../components/PageHero';
import ShinyText from '../components/ShinyText';
import BlurReveal from '../components/BlurReveal';
import SpecularButton from '../components/SpecularButton';
import Cubes from '../components/reactbits/Cubes';

const Lanyard = lazy(() => import('../components/reactbits/Lanyard'));

import { valueTabs } from '../data/values';
import { pqubeFormula, journey, team, accreditations, portfolioStats } from '../data/portfolio';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80';

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: 'People First',
    text: 'We invest in building people who transform businesses. Great teams build great solutions — so we grow ours intentionally.',
  },
  {
    icon: Users,
    title: 'Built on Principles',
    text: 'Integrity, transparency and accountability anchor every engagement. Honesty is the first thing many clients say convinced them.',
  },
  {
    icon: Clock,
    title: 'Built to Last',
    text: 'From a two-person firm in 2013 to a global team, our partnerships run in years, not projects. Prosperity follows focus.',
  },
];

export default function About() {
  const [active, setActive] = useState(valueTabs[0]);
  const [activeMember, setActiveMember] = useState(team[0]);
  const [teamInView, setTeamInView] = useState(false);
  const [activeJourney, setActiveJourney] = useState(null);
  const [journeyHover, setJourneyHover] = useState(false);
  const teamStageRef = useRef(null);
  const teamObserverRef = useRef(null);

  useEffect(() => {
    if (journeyHover) return;
    const timer = setInterval(() => {
      setActiveJourney((idx) => (idx === null ? 0 : (idx + 1) % journey.length));
    }, 3000);
    return () => clearInterval(timer);
  }, [journeyHover]);

  useEffect(() => {
    if (!teamStageRef.current) return;
    teamObserverRef.current = new IntersectionObserver(
      ([e]) => setTeamInView(e.isIntersecting),
      { rootMargin: '0px 0px -100px 0px' }
    );
    teamObserverRef.current.observe(teamStageRef.current);
    return () => teamObserverRef.current?.disconnect();
  }, []);

  const forwardToCubes = useCallback((type, e) => {
    if (type === 'pointermove') {
      const rect = teamStageRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      window.dispatchEvent(new CustomEvent('team-cubes-pointermove', { detail: { x, y, width: rect.width, height: rect.height } }));
    } else if (type === 'pointerleave') {
      window.dispatchEvent(new CustomEvent('team-cubes-pointerleave'));
    } else if (type === 'click') {
      window.dispatchEvent(new CustomEvent('team-cubes-click'));
    }
  }, []);

  // The cube grid sits behind the 3D badge (pointer-events-none), so the stage
  // forwards pointer events here; re-dispatch them natively on the Cubes scene.
  const lastPointerRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const scene = () => teamStageRef.current?.querySelector('.default-animation--scene');
    const onMove = (evt) => {
      const el = scene();
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const d = evt.detail;
      lastPointerRef.current = {
        x: rect.left + (d.x / d.width) * rect.width,
        y: rect.top + (d.y / d.height) * rect.height
      };
      el.dispatchEvent(new PointerEvent('pointermove', { clientX: lastPointerRef.current.x, clientY: lastPointerRef.current.y }));
    };
    const onLeave = () => scene()?.dispatchEvent(new PointerEvent('pointerleave'));
    const onClick = () => {
      const el = scene();
      if (!el) return;
      const { x, y } = lastPointerRef.current;
      el.dispatchEvent(new PointerEvent('click', { clientX: x, clientY: y }));
    };
    window.addEventListener('team-cubes-pointermove', onMove);
    window.addEventListener('team-cubes-pointerleave', onLeave);
    window.addEventListener('team-cubes-click', onClick);
    return () => {
      window.removeEventListener('team-cubes-pointermove', onMove);
      window.removeEventListener('team-cubes-pointerleave', onLeave);
      window.removeEventListener('team-cubes-click', onClick);
    };
  }, []);

  return (
    <main className="bg-[var(--pqube-gray-50)]">
      <PageHero
        overline="About PQube"
        title="Build People to Build Business"
        subtitle="We are a Bengaluru-born digital platform company — people, principles and prosperity engineered into technology that scales, from Delaware to Delhi."
        image={HERO_IMAGE}
      >
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <SpecularButton href="/portfolio" size="md" radius={10} baseColor="#29ABE2" lineColor="#FFFFFF" textColor="#0B1233" intensity={1.3}>
            View Our Portfolio <ArrowRight size={16} />
          </SpecularButton>
          <SpecularButton href="/contact" size="md" radius={10} baseColor="#FFFFFF" lineColor="#29ABE2" textColor="#1B2A6B" tintOpacity={0.12} intensity={1.1}>
            Work With Us
          </SpecularButton>
        </div>
      </PageHero>

      {/* Formula */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <ShinyText text="What is PQube" color="#D4A017" shineColor="#F0C75E" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="P × P × P = Q" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
            <p className="text-[var(--pqube-gray-500)] max-w-xl mx-auto mt-4">
              Two equations govern everything we do — one for the quality we deliver, one for the quantum of the business we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {Object.entries(pqubeFormula).map(([key, formula]) => (
              <div key={key} className="bg-[var(--pqube-gray-50)] border border-[var(--pqube-gray-200)] rounded-2xl p-6 md:p-8 hover:shadow-lg hover:shadow-[#D4A017]/10 transition-shadow">
                <div className="flex items-center justify-center gap-2.5 md:gap-3 mb-4">
                  {formula.terms.map((t, i) => (
                    <div key={t.word} className="flex items-center gap-2.5 md:gap-3">
                      {i > 0 && <span className="text-lg font-bold text-[#D4A017]">+</span>}
                      <div className="text-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--pqube-blue)] to-[var(--pqube-cyan)] flex items-center justify-center text-white font-extrabold text-lg mb-1">
                          {t.letter}
                        </div>
                        <div className="text-xs font-semibold text-[var(--pqube-navy)]">{t.word}</div>
                      </div>
                    </div>
                  ))}
                  <span className="text-xl font-extrabold text-[#D4A017]">=</span>
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

      {/* Principles */}
      <section className="section-padding bg-[var(--pqube-gray-50)]">
        <div className="container-page">
          <div className="text-center mb-12">
            <ShinyText text="Why We Exist" color="#D4A017" shineColor="#F0C75E" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="Three Things That Anchor Us" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="bg-white border border-[var(--pqube-gray-200)] rounded-2xl p-6 hover:border-[#D4A017]/50 hover:shadow-lg hover:shadow-[#D4A017]/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--pqube-blue)] to-[var(--pqube-cyan)] text-white flex items-center justify-center mb-4">
                  <p.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-[var(--pqube-navy)] mb-2">{p.title}</h3>
                <p className="text-sm text-[var(--pqube-gray-500)] leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values tabs */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <ShinyText text="Values & Purpose" color="#D4A017" shineColor="#F0C75E" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="What We Stand For" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 space-y-2.5">
              {valueTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab)}
                  className={`w-full text-left rounded-2xl px-5 py-4 border transition-all duration-300 ${
                    active.id === tab.id
                      ? 'bg-[var(--pqube-navy)] border-[var(--pqube-blue)] text-white shadow-lg shadow-[var(--pqube-blue)]/20'
                      : 'bg-[var(--pqube-gray-50)] border-[var(--pqube-gray-200)] text-[var(--pqube-navy)] hover:border-[#D4A017]/50'
                  }`}
                >
                  <span className="text-sm font-bold">{tab.label}</span>
                </button>
              ))}
            </div>
            <div className="lg:col-span-8">
              <div className="relative aspect-[16/9] max-h-[420px] rounded-2xl overflow-hidden border border-[var(--pqube-gray-200)]">
                <img src={active.image} alt={active.label} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--pqube-navy)]/95 via-[var(--pqube-navy)]/55 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--pqube-cyan)] mb-2">{active.label}</p>
                  <div className="text-sm md:text-base text-white/90 leading-relaxed whitespace-pre-line">{active.content}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
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

      {/* Journey */}
      <section className="section-padding bg-[#1A1A1A]">
        <div className="container-page">
          <div className="text-center mb-12">
            <ShinyText text="Our Journey" color="#D4A017" shineColor="#F0C75E" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="From 2013 to Today" className="text-3xl md:text-4xl font-extrabold text-white" blur={12} y={24} rotate={5} stagger={0.12} />
            <span className="block w-16 h-1 rounded-full mx-auto mt-4 bg-gradient-to-r from-[#B8722C] via-[#D4A017] to-[#F0C75E]" aria-hidden="true" />
          </div>

          <div className="max-w-4xl mx-auto pt-56 md:pt-52">
            {/* horizontal timeline */}
            <div
              className="relative"
              onMouseEnter={() => setJourneyHover(true)}
              onMouseLeave={() => setJourneyHover(false)}
            >
              <div className="absolute top-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D4A017] via-[#F0C75E] to-[#D4A017]/30" />
              <div className="flex items-start justify-between">
                {journey.map((m, idx) => {
                  const active = activeJourney === idx;
                  return (
                    <button
                      key={m.year}
                      onClick={() => setActiveJourney(active ? null : idx)}
                      className="group relative flex flex-col items-center pt-4 w-16 md:w-24 shrink-0"
                      aria-label={m.title}
                    >
                      {/* detail card anchored above this cube */}
                      <AnimatePresence>
                        {active && (
                          <motion.div
                            key={m.year}
                            initial={{ opacity: 0, y: 14, scale: 0.94 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-60 md:w-72 bg-[#242424] border border-[#D4A017]/30 rounded-2xl p-4 shadow-xl shadow-black/40 text-left"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Clock size={12} className="text-[#D4A017]" />
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F0C75E]">{m.year}</span>
                            </div>
                            <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">{m.title}</h3>
                            <p className="text-xs text-white/90 leading-relaxed">{m.detail}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <span className={`absolute top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-[3px] border-2 border-white bg-gradient-to-br from-[#D4A017] to-[#F0C75E] transition-all duration-300 ${
                        active ? 'w-4 h-4 rotate-45 ring-4 ring-[#D4A017]/30 scale-110' : 'w-3 h-3 rotate-45 group-hover:scale-125'
                      }`} />
                      <div className="flex flex-col items-center justify-end h-16">
                        <span className={`text-[10px] md:text-xs font-bold transition-colors ${
                          active ? 'text-[#F0C75E]' : 'text-[var(--pqube-gray-400)] group-hover:text-[#D4A017]'
                        }`}>
                          {m.year}
                        </span>
                        <span className="mt-1 text-[10px] md:text-[11px] font-medium leading-snug text-center text-white/50 group-hover:text-white/80 transition-colors w-full line-clamp-2">
                          {m.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="section-padding bg-gradient-to-br from-[var(--pqube-blue)] to-[var(--pqube-cyan)]">
        <div className="container-page">
          <div className="text-center mb-12">
            <ShinyText text="Certified & Recognized" color="#ffffff" shineColor="#29ABE2" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="The Credentials Behind the Work" className="text-3xl md:text-4xl font-extrabold text-white" blur={12} y={24} rotate={5} stagger={0.12} />
          </div>

          <div className="overflow-hidden">
            <div className="flex w-max animate-marquee" style={{ animationDuration: '60s' }}>
              {[...accreditations, ...accreditations].map((a, idx) => (
                <div key={`cert-${idx}`} className="flex flex-col items-center justify-center shrink-0 bg-white/10 border border-white/20 rounded-2xl px-10 py-7 mr-8 w-56">
                  <img src={a.image} alt={a.label} className="h-20 w-auto max-w-[150px] object-contain mb-4" loading="lazy" />
                  <span className="text-base font-semibold text-white text-center leading-snug">{a.label.split(' — ')[0].split(' · ')[0]}</span>
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
            <ShinyText text="The Team" color="#D4A017" shineColor="#F0C75E" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="Select a Profile" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
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

                {/* lanyard ID card with drag/swing physics — single persistent
                    instance; switching profiles only swaps the card photos so the
                    physics world/GLB/shaders are never rebuilt */}
                <div className="absolute inset-0 z-10">
                  <Suspense fallback={null}>
                    <Lanyard
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
                          : 'bg-white border-[var(--pqube-gray-200)] hover:border-[#D4A017]/50 hover:shadow-md'
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
                        <span className={`text-[#D4A017] transition-transform duration-300 ${active ? 'rotate-90' : ''}`}>
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

      {/* CTA */}
      <section className="bg-[#1A1A1A] py-16">
        <div className="container-page text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Let&apos;s Build What&apos;s Next</h2>
          <span className="block w-16 h-1 rounded-full mx-auto mb-6 bg-gradient-to-r from-[#B8722C] via-[#D4A017] to-[#F0C75E]" aria-hidden="true" />
          <p className="text-white/80 max-w-xl mx-auto mb-8">Tell us about your platform, your problem, or your curiosity. We&apos;ll come back within 24 hours.</p>
          <a href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-[#B8722C] via-[#D4A017] to-[#F0C75E] rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[#B8722C]/30">
            Get a Free Consultation <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}