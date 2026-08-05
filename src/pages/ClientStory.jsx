import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Package, Sparkles } from 'lucide-react';
import PageHero from '../components/PageHero';
import ShinyText from '../components/ShinyText';
import BlurReveal from '../components/BlurReveal';
import { clients } from '../data/clients';

export default function ClientStory() {
  const { slug } = useParams();
  const client = clients.find((c) => c.slug === slug) || clients[0];
  const others = clients.filter((c) => c.slug !== client.slug);

  return (
    <main className="bg-[var(--pqube-gray-50)]">
      <PageHero
        overline={`Client Story · ${client.sector}`}
        title={client.name}
        subtitle={client.desc}
        image="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&q=80"
      >
        <Link
          to="/clients"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors mt-6"
        >
          <ArrowLeft size={14} /> All Clients
        </Link>
      </PageHero>

      <section className="section-padding bg-white">
        <div className="container-page max-w-5xl">
          {/* Client identity card */}
          <div className="flex flex-col items-center text-center gap-5 p-6 md:p-10 bg-[var(--pqube-gray-50)] border border-[var(--pqube-gray-200)] rounded-2xl mb-12">
            <span className="shrink-0 w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-white border border-[var(--pqube-gray-200)] shadow-md shadow-[var(--pqube-blue)]/10 flex items-center justify-center p-5">
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                className="max-h-full w-auto max-w-full object-contain"
                loading="lazy"
              />
            </span>
            <div>
              <div className="flex items-center justify-center gap-3 mb-1.5">
                <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--pqube-navy)] tracking-tight">{client.name}</h1>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--pqube-blue)] mb-1">{client.sector} · {client.location}</p>
              <p className="text-sm text-[var(--pqube-gray-600)] leading-relaxed max-w-xl mx-auto">{client.desc}</p>
            </div>
          </div>

          {/* The Story — featured panel */}
          <div className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[var(--pqube-blue)] to-[var(--pqube-cyan)] shadow-xl shadow-[var(--pqube-blue)]/20 mb-12 overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/80 mb-4">
                <BookOpen size={13} /> The Story
              </span>
              <p className="text-base md:text-lg text-white leading-relaxed font-medium">{client.summary}</p>
            </div>
          </div>

          {/* What We Delivered — card grid */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <span className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--pqube-blue)] to-[var(--pqube-cyan)] text-white flex items-center justify-center shadow-lg shadow-[var(--pqube-blue)]/20">
                <Package size={18} />
              </span>
              <div className="flex-1">
                <ShinyText text="What We Delivered" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-1" />
                <div className="h-0.5 mt-1.5 w-24 rounded-full bg-gradient-to-r from-[var(--pqube-cyan)] to-transparent" />
              </div>
              <span className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-wider text-[var(--pqube-cyan)] bg-[var(--pqube-cyan)]/10 border border-[var(--pqube-cyan)]/25 px-3 py-1.5 rounded-full">
                {client.highlights.length} outcomes
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {client.highlights.map((h, i) => (
                <div
                  key={h}
                  className="group flex flex-col p-6 bg-[var(--pqube-gray-50)] border border-[var(--pqube-gray-200)] rounded-2xl hover:border-[var(--pqube-blue)]/40 hover:shadow-lg hover:shadow-[var(--pqube-blue)]/10 hover:-translate-y-1 transition-all"
                >
                  <span className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--pqube-blue)] to-[var(--pqube-cyan)] text-white flex items-center justify-center text-sm font-extrabold shadow-md shadow-[var(--pqube-blue)]/20 mb-5 transition-transform duration-300 group-hover:scale-105">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm text-[var(--pqube-gray-600)] leading-relaxed">{h}</p>
                </div>
              ))}
            </div>
          </div>

          {/* More Stories */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-8">
              <span className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--pqube-blue)] to-[var(--pqube-cyan)] text-white flex items-center justify-center shadow-lg shadow-[var(--pqube-blue)]/20">
                <Sparkles size={18} />
              </span>
              <div className="flex-1">
                <ShinyText text="Keep Exploring" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-1" />
                <div className="h-0.5 mt-1.5 w-24 rounded-full bg-gradient-to-r from-[var(--pqube-cyan)] to-transparent" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {others.slice(0, 6).map((o) => (
                <Link
                  key={o.slug}
                  to={o.link}
                  className="group flex items-center gap-4 p-5 bg-[var(--pqube-gray-50)] border border-[var(--pqube-gray-200)] rounded-2xl hover:border-[var(--pqube-blue)]/40 hover:shadow-lg hover:shadow-[var(--pqube-blue)]/10 hover:-translate-y-1 transition-all"
                >
                  <span className="shrink-0 w-14 h-14 rounded-xl bg-white border border-[var(--pqube-gray-200)] flex items-center justify-center p-2">
                    <img src={o.logo} alt={`${o.name} logo`} className="max-h-full w-auto max-w-full object-contain" loading="lazy" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-extrabold text-[var(--pqube-navy)] group-hover:text-[var(--pqube-blue)] transition-colors truncate">{o.name}</div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--pqube-gray-400)] mt-0.5">{o.sector}</div>
                  </div>
                  <ArrowRight size={15} className="shrink-0 text-[var(--pqube-cyan)] transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1A1A1A] py-14">
        <div className="container-page text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">A similar story could be yours</h2>
          <span className="block w-16 h-1 rounded-full mx-auto mb-6 bg-gradient-to-r from-[#B8722C] via-[#D4A017] to-[#F0C75E]" aria-hidden="true" />
          <p className="text-white/80 max-w-xl mx-auto mb-7">Tell us where your business is stuck or growing — we&apos;ll map a path in a free consultation.</p>
          <a href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-[#B8722C] via-[#D4A017] to-[#F0C75E] rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[#B8722C]/30">
            Start Your Story
          </a>
        </div>
      </section>
    </main>
  );
}
