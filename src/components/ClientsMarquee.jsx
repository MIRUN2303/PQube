import { useRef, useEffect } from 'react';
import { clients } from '../data/clients';
import ShinyText from './ShinyText';
import BlurReveal from './BlurReveal';

const rowA = clients.filter((_, i) => i % 2 === 0);
const rowB = clients.filter((_, i) => i % 2 === 1);

export default function ClientsMarquee() {
  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="text-center mb-12">
          <ShinyText text="Our Clients" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
          <BlurReveal text="Trusted by Industry Leaders" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)] mb-4" blur={12} y={24} rotate={5} stagger={0.12} />
          <p className="text-[var(--pqube-gray-500)] max-w-xl mx-auto">
            We are proud to partner with organizations across sectors — from pharma and manufacturing to retail and fintech.
          </p>
        </div>

        <div className="space-y-12">
          <MarqueeRow items={rowA} reverse={false} />
          <MarqueeRow items={rowB} reverse />
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

function MarqueeRow({ items, reverse }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const repeated = [...items, ...items, ...items, ...items];

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    let raf = 0;
    let current = 1; // playback rate
    let target = 1;

    const apply = () => {
      // Only the track's own marquee animation — never the logos' hover
      // transitions, otherwise the tick pokes their playbackRate and they
      // freeze/stutter mid-fade ("logo suddenly stands still" glitch).
      track.getAnimations().forEach((a) => {
        const name = a.animationName || '';
        if (name === 'marquee-4x' || name === 'marquee-4x-reverse') {
          a.playbackRate = current;
        }
      });
    };

    // Exponential easing toward target → gradual slow-down / speed-up
    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) < 0.005) {
        current = target;
        apply();
        raf = 0;
        return;
      }
      current += diff * 0.09;
      apply();
      raf = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      target = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      target = 1;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    wrap.addEventListener('mouseenter', onEnter);
    wrap.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener('mouseenter', onEnter);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="overflow-hidden">
      <div ref={trackRef} className={`flex w-max ${reverse ? 'animate-marquee-4x-reverse' : 'animate-marquee-4x'}`}>
        {repeated.map((c, idx) => (
          <a key={`${c.slug}-${idx}`} href={c.link} className="flex items-center justify-center shrink-0 h-16 px-2 mr-16" aria-label={c.name}>
            <img
              src={c.logo}
              alt={`${c.name} logo`}
              className="max-h-14 w-auto max-w-[160px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              loading={idx < items.length ? 'eager' : 'lazy'}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
