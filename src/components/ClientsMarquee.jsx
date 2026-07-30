import { clients } from '../data/clients';
import ShinyText from './ShinyText';

export default function ClientsMarquee() {
  const doubled = [...clients, ...clients];

  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="text-center mb-12">
          <ShinyText text="Our Clients" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)] mb-4">Trusted by Industry Leaders</h2>
          <p className="text-[var(--pqube-gray-500)] max-w-xl mx-auto">
            We are proud to partner with organizations across sectors — from pharma and manufacturing to retail and fintech.
          </p>
        </div>

        <div className="overflow-hidden group">
          <div className="flex gap-16 animate-marquee w-max group-hover:[animation-play-state:paused]">
            {doubled.map((c, idx) => (
              <a key={`${c.slug}-${idx}`} href={c.link} className="flex items-center justify-center shrink-0 h-16 px-2" aria-label={c.name}>
                <img
                  src={c.logo}
                  alt={`${c.name} logo`}
                  className="max-h-14 w-auto max-w-[160px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  loading={idx < clients.length ? 'eager' : 'lazy'}
                />
              </a>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <a href="/clients" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--pqube-navy)] hover:text-[var(--pqube-blue)] transition-colors">
            View All Client Stories <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
