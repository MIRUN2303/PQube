import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import ShinyText from '../components/ShinyText';
import BlurReveal from '../components/BlurReveal';
import { clients } from '../data/clients';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80';

export default function Clients() {
  return (
    <main className="bg-[var(--pqube-gray-50)]">
      <PageHero
        overline="Our Clients"
        title="Brands That Build With Us"
        subtitle="From global pharma and Fortune 500 manufacturers to family businesses and startups — here are the organisations we partner with, and what we build for them."
        image={HERO_IMAGE}
      />

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <ShinyText text="Client Stories" color="#D4A017" shineColor="#F0C75E" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="What We Build, Together" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {clients.map((c) => (
              <Link
                key={c.slug}
                to={c.link}
                className="group flex flex-col bg-[var(--pqube-gray-50)] border border-[var(--pqube-gray-200)] rounded-2xl p-6 hover:border-[#D4A017]/50 hover:shadow-lg hover:shadow-[#D4A017]/10 transition-all"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center h-12 px-3 bg-white rounded-xl border border-[var(--pqube-gray-200)]">
                    <img src={c.logo} alt={`${c.name} logo`} className="max-h-8 w-auto max-w-[120px] object-contain grayscale group-hover:grayscale-0 transition-all duration-300" loading="lazy" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4A017] bg-[#D4A017]/10 border border-[#D4A017]/25 px-2.5 py-1 rounded-full">
                    {c.sector}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-[var(--pqube-navy)] mb-1">{c.name}</h3>
                <p className="text-xs text-[var(--pqube-gray-500)] mb-3">{c.desc}</p>
                <p className="text-sm text-[var(--pqube-gray-500)] leading-relaxed flex-1">{c.summary}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D4A017] mt-4">
                  Read their story
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--pqube-navy)] py-14">
        <div className="container-page text-center">
          <p className="text-white/70 max-w-xl mx-auto text-sm">
            These are a selection of the clients we work with. A broader set spans retail, manufacturing, healthcare, fintech, hospitality and edtech across India, the USA and Europe.
          </p>
        </div>
      </section>
    </main>
  );
}