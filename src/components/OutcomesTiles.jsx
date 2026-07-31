import { outcomes } from '../data/services';
import ShinyText from './ShinyText';
import BlurReveal from './BlurReveal';

export default function OutcomesTiles() {
  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="text-center mb-12">
          <ShinyText text="Outcomes" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
          <BlurReveal text="Why Our Business Solutions" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {outcomes.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="group bg-white border border-[var(--pqube-gray-200)] rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                </div>
                <div className="p-8">
                  <div className="w-12 h-12 rounded-full bg-[var(--pqube-blue)]/10 flex items-center justify-center mb-5">
                    <Icon size={22} className="text-[var(--pqube-blue)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--pqube-navy)] mb-3">{item.title}</h3>
                  <p className="text-sm text-[var(--pqube-gray-500)] leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
