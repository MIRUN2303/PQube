import { outcomes } from '../data/services';
import ShinyText from './ShinyText';
import BlurReveal from './BlurReveal';

// Per-card accent identity (kept in the blue/cyan brand family)
const ACCENTS = [
  {
    grad: 'from-[#29ABE2] to-[#1B6FD6]',
    chip: 'bg-[#D4A017]/10 text-[#B8722C] border-[#D4A017]/25',
    watermark: 'text-[#29ABE2]/10',
    blob: 'bg-[#29ABE2]/15',
  },
  {
    grad: 'from-[#1B6FD6] to-[#0B3A6E]',
    chip: 'bg-[#D4A017]/10 text-[#B8722C] border-[#D4A017]/25',
    watermark: 'text-[#1B6FD6]/10',
    blob: 'bg-[#1B6FD6]/15',
  },
  {
    grad: 'from-[#4C5BD4] to-[#29ABE2]',
    chip: 'bg-[#D4A017]/10 text-[#B8722C] border-[#D4A017]/25',
    watermark: 'text-[#4C5BD4]/10',
    blob: 'bg-[#4C5BD4]/15',
  },
];

export default function OutcomesTiles() {
  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="text-center mb-12">
          <ShinyText text="Outcomes" color="#D4A017" shineColor="#F0C75E" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
          <BlurReveal text="Why Our Business Solutions" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
        </div>

        <div className="space-y-10 md:space-y-16">
          {outcomes.map((item, idx) => {
            const Icon = item.icon;
            const flipped = idx % 2 === 1; // row 2: content left, image right
            const a = ACCENTS[idx % ACCENTS.length];

            return (
              <div
                key={item.title}
                className="group relative bg-white rounded-3xl border border-[var(--pqube-gray-200)] overflow-hidden shadow-[0_12px_40px_-16px_rgba(11,58,110,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_64px_-20px_rgba(11,58,110,0.28)]"
              >
                {/* Top gradient edge */}
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${a.grad} z-10`} />

                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Image */}
                  <div className={`relative h-64 md:h-auto md:min-h-[400px] overflow-hidden transition-transform duration-700 ease-out group-hover:scale-x-105 ${flipped ? 'md:order-2' : ''}`}>
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0B3A6E]/55 via-[#0B3A6E]/10 to-transparent" />

                    {/* Floating glass badge */}
                    <div className="absolute bottom-5 left-5 md:bottom-6 md:left-6 rounded-2xl bg-white/85 backdrop-blur-md border border-white/60 shadow-lg px-4 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--pqube-gray-500)]">{item.eyebrow}</p>
                      <p className="text-sm font-bold text-[var(--pqube-navy)] leading-tight">{item.badge}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`relative p-8 md:p-12 flex flex-col justify-center overflow-hidden ${flipped ? 'md:order-1' : ''}`}>
                    {/* Watermark number */}
                    <span className={`pointer-events-none absolute -top-8 text-[130px] font-extrabold leading-none select-none ${a.watermark} ${flipped ? 'md:-left-4' : 'right-0 md:-right-2'}`}>
                      0{idx + 1}
                    </span>
                    {/* Soft accent glow */}
                    <div className={`pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl ${a.blob} ${flipped ? '' : 'md:left-auto md:-right-20'}`} />

                    <div className="relative">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2B2B2B] to-[#101010] border border-[#D4A017]/40 flex items-center justify-center shadow-lg mb-6`}>
                        <Icon size={22} className="text-[#F0C75E]" />
                      </div>

                      <h3 className="text-xl md:text-2xl font-extrabold text-[var(--pqube-navy)] mb-4">{item.title}</h3>
                      <p className="text-sm md:text-base text-[var(--pqube-gray-500)] leading-relaxed max-w-lg">{item.description}</p>

                      <div className="flex flex-wrap gap-2 mt-7">
                        {item.chips.map((chip) => (
                          <span key={chip} className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border ${a.chip}`}>
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
