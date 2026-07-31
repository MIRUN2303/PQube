import { services } from '../data/services';
import ServiceCard from './ServiceCard';
import ShinyText from './ShinyText';
import BlurReveal from './BlurReveal';

export default function ServicesGrid() {
  return (
    <section className="section-padding bg-[var(--pqube-gray-50)]" id="what-we-do">
      <div className="container-page">
        <div className="text-center mb-12">
          <ShinyText text="What We Do" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
          <BlurReveal text="Business IT Solutions We Offer" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)] mb-4" blur={12} y={24} rotate={5} stagger={0.12} />
          <p className="text-[var(--pqube-gray-500)] max-w-2xl mx-auto">
            From cloud infrastructure to digital marketing — we deliver end-to-end technology solutions that help businesses operate smarter, scale faster, and compete stronger.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      </div>
    </section>
  );
}
