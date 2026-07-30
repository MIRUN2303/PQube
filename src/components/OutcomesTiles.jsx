import { outcomes } from '../data/services';
import ShinyText from './ShinyText';

export default function OutcomesTiles() {
  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="text-center mb-12">
          <ShinyText text="Outcomes" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]">Why Our Business Solutions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {outcomes.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-[var(--pqube-gray-50)] border border-[var(--pqube-gray-200)] rounded-xl p-8 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[var(--pqube-blue)]/10 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-[var(--pqube-blue)]" />
                </div>
                <h3 className="text-lg font-bold text-[var(--pqube-navy)] mb-3">{item.title}</h3>
                <p className="text-sm text-[var(--pqube-gray-500)] leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
