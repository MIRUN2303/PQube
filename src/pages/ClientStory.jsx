import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import ShinyText from '../components/ShinyText';
import BlurReveal from '../components/BlurReveal';
import SpecularButton from '../components/SpecularButton';
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
        <div className="container-page max-w-4xl">
          <div className="flex items-center gap-4 mb-8 p-5 bg-[var(--pqube-gray-50)] border border-[var(--pqube-gray-200)] rounded-2xl">
            <img
              src={client.logo}
              alt={`${client.name} logo`}
              className="max-h-14 w-auto max-w-[160px] object-contain"
              loading="lazy"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-[var(--pqube-navy)]">{client.name}</h1>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--pqube-cyan)]">{client.sector} · {client.location}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <ShinyText text="The Story" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
              <p className="text-base md:text-lg text-[var(--pqube-gray-700)] leading-relaxed">{client.summary}</p>
            </div>

            <div>
              <ShinyText text="What We Delivered" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
              <ul className="space-y-3">
                {client.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm md:text-base text-[var(--pqube-gray-700)] leading-relaxed">
                    <CheckCircle2 size={18} className="text-[var(--pqube-cyan)] shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              <ShinyText text="More Stories" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-4" />
              <div className="flex flex-wrap gap-3">
                {others.slice(0, 5).map((o) => (
                  <Link
                    key={o.slug}
                    to={o.link}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--pqube-blue)] bg-[var(--pqube-gray-50)] border border-[var(--pqube-gray-200)] px-4 py-2 rounded-full hover:border-[var(--pqube-blue)]/40 hover:bg-white transition-colors"
                  >
                    {o.name} <ArrowRight size={13} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[var(--pqube-blue)] to-[var(--pqube-cyan)] py-14">
        <div className="container-page text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">A similar story could be yours</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-7">Tell us where your business is stuck or growing — we&apos;ll map a path in a free consultation.</p>
          <SpecularButton href="/contact" size="lg" radius={10} baseColor="#FFFFFF" lineColor="#1B2A6B" textColor="#1B2A6B" intensity={1.2}>
            Start Your Story
          </SpecularButton>
        </div>
      </section>
    </main>
  );
}