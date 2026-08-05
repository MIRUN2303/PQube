import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { insights } from '../data/insights';
import ShinyText from './ShinyText';
import BlurReveal from './BlurReveal';

const SPEED = 0.05; // px per ms (~50px/s) — marquee cruise speed

/**
 * NewsCard — "newspaper" card: top half = image, bottom half = text sheet.
 * On hover the bottom text sheet folds down (rotateX, origin top) like a
 * newspaper page opening, revealing a "Read More" back panel underneath.
 */
function NewsCard({ article }) {
  const [folded, setFolded] = useState(false);

  return (
    <a
      href={article.link}
      aria-label={article.title}
      onMouseEnter={() => setFolded(true)}
      onMouseLeave={() => setFolded(false)}
      className="group relative block w-72 md:w-80 h-72 md:h-80 shrink-0 mr-6"
      style={{ perspective: '900px' }}
    >
      {/* Top half — image (stays fixed) */}
      <div className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden rounded-t-xl">
        <img
          src={article.image}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute bottom-2.5 left-3 text-[10px] font-semibold uppercase tracking-wider text-white/90 bg-black/40 px-2 py-1 rounded">
          {article.category}
        </span>
      </div>

      {/* Back panel — revealed when the text sheet folds down */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 rounded-b-xl bg-gradient-to-br from-[var(--pqube-navy)] to-[#141e4a] p-5 flex flex-col items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-white">
          Read More <ArrowRight size={15} className="text-[#D4A017]" />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D4A017]">
          {article.category}
        </span>
      </div>

      {/* Bottom half — foldable text sheet */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 rounded-b-xl bg-white border border-[var(--pqube-gray-200)] border-t-0 p-5 flex flex-col justify-between"
        style={{
          transformOrigin: 'center top',
          transform: folded ? 'rotateX(90deg)' : 'rotateX(0deg)',
          transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
          backfaceVisibility: 'hidden',
          willChange: 'transform',
        }}
      >
        <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[#D4A017]">
          {article.category}
        </span>
        <h3 className="text-sm md:text-base font-bold text-[var(--pqube-navy)] leading-snug line-clamp-3">
          {article.title}
        </h3>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--pqube-navy)]">
          Read more <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}

export default function InsightsGrid() {
  const visible = insights.slice(0, 6);

  // --- Infinite right-to-left marquee with smooth stop/start ---
  const trackRef = useRef(null);
  const hoveredRef = useRef(false);
  const halfWidthRef = useRef(0);
  const speedRef = useRef(1); // current velocity multiplier 0..1
  const x = useMotionValue(0);

  const setHovered = useCallback(h => {
    hoveredRef.current = h;
  }, []);

  // Measure one full copy of the track (two copies in DOM) for seamless wrap
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) halfWidthRef.current = trackRef.current.scrollWidth / 2;
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Frame-rate independent: ease velocity toward target (0 on hover, 1 on leave)
  useAnimationFrame((_, delta) => {
    const target = hoveredRef.current ? 0 : 1;
    const k = 1 - Math.exp(-delta * 0.0035);
    speedRef.current += (target - speedRef.current) * k;

    let nx = x.get() - SPEED * speedRef.current * delta;
    const half = halfWidthRef.current;
    if (half > 0 && nx < -half) nx += half;
    x.set(nx);
  });

  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="text-center mb-12">
          <ShinyText text="Insights" color="#D4A017" shineColor="#F0C75E" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
          <BlurReveal text="Latest News & Insights" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)] mb-4" blur={12} y={24} rotate={5} stagger={0.12} />
          <p className="text-[var(--pqube-gray-500)] max-w-xl mx-auto">
            Thoughts on technology, business strategy, and digital transformation from the PQube team.
          </p>
        </div>

        {/* Marquee strip */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 z-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 z-10 bg-gradient-to-l from-white to-transparent" />

          <motion.div ref={trackRef} className="flex w-max will-change-transform" style={{ x }}>
            {[...visible, ...visible].map((article, i) => (
              <NewsCard key={`${article.id}-${i}`} article={article} />
            ))}
          </motion.div>
        </div>

        <div className="text-center mt-10">
          <a href="/insights" className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-[var(--pqube-navy)] hover:bg-[var(--pqube-blue)] rounded-lg transition-all duration-200">
            View All Insights
          </a>
        </div>
      </div>
    </section>
  );
}
