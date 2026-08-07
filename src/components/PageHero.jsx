import { useEffect, useRef, useState } from 'react';
import ShinyText from './ShinyText';
import BlurReveal from './BlurReveal';

export default function PageHero({ overline, title, subtitle, image, children, height = 'h-[340px] md:h-[420px]' }) {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafRef.current = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const fade = Math.max(0, 1 - scrollY / 320);

  return (
    <section className={`relative ${height} overflow-hidden bg-black`}>
      {image && (
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.2}px) scale(1.08)` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-[var(--pqube-gray-50)]" />

      <div
        className="container-page relative z-10 h-full flex flex-col items-center justify-center text-center pt-24 pb-10"
        style={{ opacity: fade, transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <ShinyText
          text={overline}
          color="#F0C75E"
          shineColor="#FFF6D8"
          speed={3}
          spread={120}
          className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3"
        />
        <BlurReveal text={title} className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4" blur={12} y={24} rotate={5} stagger={0.12} />
        {subtitle && <p className="text-white/70 max-w-2xl mx-auto">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}