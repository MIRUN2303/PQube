import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';
import ShinyText from '../components/ShinyText';
import BlurReveal from '../components/BlurReveal';
import { pressReleases } from '../data/pressReleases';

const BANNER_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80';

export default function PressReleases() {
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
    <main className="bg-[var(--pqube-gray-50)]">
      <section className="relative h-[340px] md:h-[420px] overflow-hidden bg-black">
        <img
          src={BANNER_IMAGE}
          alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.2}px) scale(1.08)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-[var(--pqube-gray-50)]" />

        <div
          className="container-page relative z-10 h-full flex items-center justify-center text-center pt-24 pb-10"
          style={{ opacity: fade, transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div>
            <ShinyText text="Press Releases" color="#D4A017" shineColor="#F0C75E" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="PQube in the News" className="text-3xl md:text-4xl font-extrabold text-white mb-4" blur={12} y={24} rotate={5} stagger={0.12} />
            <p className="text-white/70 max-w-2xl mx-auto">
              Milestones and announcements from PQube — from our rebranding to Microsoft competency achievements and global expansion.
            </p>
          </div>
        </div>
      </section>

      <ScrollStack
        useWindowScroll
        itemDistance={140}
        itemStackDistance={42}
        itemScale={0.04}
        baseScale={0.9}
        stackPosition="33%"
        scaleEndPosition="8%"
        rotationAmount={0}
        blurAmount={2}
        className="pt-4"
      >
        {pressReleases.map((release) => (
          <ScrollStackItem key={release.id}>
            <div className="h-full flex flex-col md:flex-row gap-6 md:gap-10">
              <div className="md:w-48 shrink-0">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#D4A017] bg-[#D4A017]/10 border border-[#D4A017]/25 px-3 py-1.5 rounded-full">
                  {release.date}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-extrabold text-[var(--pqube-navy)] mb-3 leading-snug">
                  {release.title}
                </h3>
                <p className="text-sm md:text-base text-[var(--pqube-gray-500)] leading-relaxed mb-4">
                  {release.excerpt}
                </p>

                {release.quote && (
                  <blockquote className="border-l-4 border-[#D4A017] pl-4 mb-4">
                    <p className="text-sm italic text-[var(--pqube-navy)]/80 leading-relaxed">
                      &ldquo;{release.quote}&rdquo;
                    </p>
                    <footer className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#D4A017]">
                      — {release.author}
                    </footer>
                  </blockquote>
                )}

                {release.link ? (
                  <a
                    href={release.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4A017] hover:text-[#F0C75E] transition-colors group"
                  >
                    Read Press Release
                    <ExternalLink size={14} className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4A017]">
                    Read Press Release
                  </span>
                )}
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </main>
  );
}
