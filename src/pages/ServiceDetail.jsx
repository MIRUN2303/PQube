import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import ShinyText from '../components/ShinyText';
import BlurReveal from '../components/BlurReveal';
import ClutchReviews from '../components/ClutchReviews';
import { services, serviceCategories, outcomes } from '../data/services';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.link.endsWith(slug)) || services[0];
  const otherServices = services.filter((s) => s.id !== service.id);
  const Icon = service.icon;

  return (
    <main className="bg-[var(--pqube-gray-50)]">
      <PageHero
        overline={`${service.category} · Service`}
        title={service.title}
        subtitle={service.description}
        image={service.image}
      >
        <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors mt-6">
          <ArrowLeft size={14} /> All Services
        </Link>
      </PageHero>

      <section className="section-padding bg-white">
        <div className="container-page max-w-4xl">
          <div className="mb-8 p-5 bg-[var(--pqube-gray-50)] border border-[var(--pqube-gray-200)] rounded-2xl text-center">
            <h1 className="text-xl md:text-2xl font-extrabold text-[var(--pqube-navy)]">{service.title}</h1>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--pqube-cyan)] mt-1">{service.category}</p>
          </div>

          <div className="space-y-10">
            {/* What We Deliver — featured intro */}
            <div className="relative overflow-hidden rounded-3xl border border-[var(--pqube-gray-200)] bg-gradient-to-br from-[var(--pqube-gray-50)] via-white to-[var(--pqube-gray-50)] p-8 md:p-10 text-center">
              <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[var(--pqube-cyan)]/10 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-[var(--pqube-blue)]/10 blur-2xl pointer-events-none" />
              <div className="relative">
                <div className="mx-auto mb-5 w-16 h-16 md:w-[72px] md:h-[72px] rounded-2xl bg-gradient-to-br from-[var(--pqube-blue)] to-[var(--pqube-cyan)] flex items-center justify-center text-white shadow-lg shadow-[var(--pqube-blue)]/25">
                  <Icon size={32} />
                </div>
                <ShinyText text="What We Deliver" color="#1B7FC4" shineColor="#29ABE2" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
                <p className="text-base md:text-lg text-[var(--pqube-gray-700)] leading-relaxed max-w-2xl mx-auto">{service.overview}</p>
              </div>
            </div>

            {/* Key Capabilities — card grid */}
            <div>
              <ShinyText text="Key Capabilities" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((f) => (
                  <div key={f} className="group flex items-start gap-3 p-4 md:p-5 bg-white border border-[var(--pqube-gray-200)] rounded-2xl hover:border-[var(--pqube-blue)]/40 hover:shadow-lg hover:shadow-[var(--pqube-blue)]/10 hover:-translate-y-0.5 transition-all">
                    <span className="shrink-0 mt-0.5 w-8 h-8 rounded-full bg-[var(--pqube-cyan)]/10 border border-[var(--pqube-cyan)]/25 text-[var(--pqube-cyan)] flex items-center justify-center group-hover:bg-[var(--pqube-cyan)] group-hover:text-white transition-colors">
                      <CheckCircle2 size={16} />
                    </span>
                    <span className="text-sm md:text-[15px] text-[var(--pqube-gray-700)] leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClutchReviews />

      <section className="section-padding -mt-2 bg-[#1A1A1A]">
        <div className="container-page">
          <div className="pt-6">
            <ShinyText text="Related Services" color="#D4A017" shineColor="#F0C75E" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherServices.slice(0, 6).map((s) => (
                <Link
                  key={s.id}
                  to={s.link}
                  className="group flex flex-col p-5 bg-white/10 border border-white/15 rounded-2xl hover:border-[#D4A017]/50 hover:shadow-lg hover:shadow-[#D4A017]/10 transition-all"
                >
                  <s.icon size={24} className="text-[#D4A017] mb-3 shrink-0" />
                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-[#F0C75E] transition-colors">{s.title}</h3>
                  <p className="text-sm text-white/60 flex-1">{s.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[var(--pqube-gray-50)]">
        <div className="container-page">
          <div className="text-center mb-12">
            <ShinyText text="Why PQube" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="Outcomes You Can Count On" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {outcomes.map((o) => (
              <Link
                key={o.title}
                to={service.link}
                className="group flex flex-col bg-white border border-[var(--pqube-gray-200)] rounded-2xl overflow-hidden hover:border-[var(--pqube-blue)]/40 hover:shadow-lg hover:shadow-[var(--pqube-blue)]/10 transition-all"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={o.image} alt="" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" loading="lazy" />
                  <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider text-white/90 bg-[var(--pqube-navy)]/70 px-2.5 py-1 rounded">{o.eyebrow}</span>
                  <span className="absolute bottom-3 left-3 text-[10px] font-bold text-white/90 bg-[var(--pqube-cyan)]/80 px-2.5 py-1 rounded">{o.badge}</span>
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {o.chips.map((c) => (
                      <span key={c} className="text-[10px] font-medium text-[var(--pqube-cyan)] bg-[var(--pqube-cyan)]/10 border border-[var(--pqube-cyan)]/25 px-2 py-1 rounded-full">{c}</span>
                    ))}
                  </div>
                  <h3 className="text-base font-bold text-[var(--pqube-navy)] leading-snug mb-2">{o.title}</h3>
                  <p className="text-sm text-[var(--pqube-gray-500)] leading-relaxed flex-1">{o.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1A1A1A] py-14">
        <div className="container-page text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Ready to start this journey?</h2>
          <span className="block w-16 h-1 rounded-full mx-auto mb-6 bg-gradient-to-r from-[#B8722C] via-[#D4A017] to-[#F0C75E]" aria-hidden="true" />
          <p className="text-white/80 max-w-xl mx-auto mb-7">Tell us the outcome you're after — we'll scope it, price it, and plan it together.</p>
          <a href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-[#B8722C] via-[#D4A017] to-[#F0C75E] rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[#B8722C]/30">
            Start a Conversation
          </a>
        </div>
      </section>
    </main>
  );
}