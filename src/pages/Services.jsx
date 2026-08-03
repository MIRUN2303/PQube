import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import ShinyText from '../components/ShinyText';
import BlurReveal from '../components/BlurReveal';
import { services, serviceCategories } from '../data/services';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80';

export default function Services() {
  return (
    <main className="bg-[var(--pqube-gray-50)]">
      <PageHero
        overline="Services"
        title="What We Do"
        subtitle="Three pillars — Build & Modernize, Automate & Analyze, Grow & Support — covering the full technology lifecycle."
        image={HERO_IMAGE}
      />

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <ShinyText text="Our Capabilities" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="Services by Category" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
            <p className="text-[var(--pqube-gray-500)] max-w-xl mx-auto mt-4">
              Each service is backed by two decades of delivery experience, certified expertise, and a culture of ownership.
            </p>
          </div>

          {serviceCategories.map((cat, ci) => (
            <div key={cat.name} className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <span className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--pqube-blue)] to-[var(--pqube-cyan)] text-white flex items-center justify-center text-sm font-extrabold shadow-lg shadow-[var(--pqube-blue)]/20">
                  {String(ci + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <div className="text-lg font-extrabold text-[var(--pqube-navy)] tracking-tight">{cat.name}</div>
                  <div className="h-0.5 mt-1.5 w-24 rounded-full bg-gradient-to-r from-[var(--pqube-cyan)] to-transparent" />
                </div>
                <span className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-wider text-[var(--pqube-cyan)] bg-[var(--pqube-cyan)]/10 border border-[var(--pqube-cyan)]/25 px-3 py-1.5 rounded-full">
                  {services.filter((s) => s.category === cat.name).length} services
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {services.filter((s) => s.category === cat.name).map((s) => {
                  const Icon = s.icon;
                  return (
                    <Link
                      key={s.id}
                      to={s.link}
                      className="group flex flex-col p-6 bg-[var(--pqube-gray-50)] border border-[var(--pqube-gray-200)] rounded-2xl hover:border-[var(--pqube-blue)]/40 hover:shadow-lg hover:shadow-[var(--pqube-blue)]/10 hover:-translate-y-1 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <span className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--pqube-blue)] to-[var(--pqube-cyan)] text-white flex items-center justify-center shadow-md shadow-[var(--pqube-blue)]/20 transition-transform duration-300 group-hover:scale-105">
                          <Icon size={22} />
                        </span>
                        {s.tag && <span className="text-[9px] font-bold uppercase tracking-wider bg-[var(--pqube-cyan)]/10 text-[var(--pqube-cyan)] border border-[var(--pqube-cyan)]/25 px-2.5 py-1 rounded-full">{s.tag}</span>}
                      </div>
                      <h3 className="text-lg font-extrabold text-[var(--pqube-navy)] mb-2 group-hover:text-[var(--pqube-blue)] transition-colors">{s.title}</h3>
                      <p className="text-sm text-[var(--pqube-gray-500)] leading-relaxed flex-1 mb-5">{s.description}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--pqube-blue)] mt-auto pt-4 border-t border-[var(--pqube-gray-200)]/70">
                        View Details <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-[var(--pqube-blue)] to-[var(--pqube-cyan)] py-14">
        <div className="container-page text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Not sure where to start?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-7">Tell us your challenge — we'll map the right services and a clear path forward in a free consultation.</p>
          <a href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-[var(--pqube-navy)] bg-white rounded-xl hover:bg-[var(--pqube-gray-50)] transition-all shadow-lg">
            Schedule Free Demo <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}