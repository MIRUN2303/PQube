import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import BlurReveal from './BlurReveal';
import { testimonials } from '../data/testimonials';

const INTERVAL = 5000;

/** Avatar image with initials fallback if the image fails to load */
function Avatar({ t, className = '', initialsClass = '', radius = '20px' }) {
  const [err, setErr] = useState(false);

  if (err) {
    return (
      <div
        className={`bg-gradient-to-br from-[var(--pqube-cyan)] to-[var(--pqube-blue)] flex items-center justify-center font-bold text-white shrink-0 ${className} ${initialsClass}`}
        style={{ borderRadius: radius }}
        aria-hidden="true"
      >
        {t.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
      </div>
    );
  }

  return (
    <img
      src={t.avatar}
      alt={t.name}
      loading="lazy"
      onError={() => setErr(true)}
      className={`object-cover shrink-0 ${className}`}
      style={{ borderRadius: radius }}
    />
  );
}

function ReviewCard({ t }) {
  return (
    <div
      className="flex flex-col md:flex-row gap-6 md:gap-10 p-5 md:p-[30px] md:pl-[65px] rounded-[30px] h-full"
      style={{
        background: 'linear-gradient(108.44deg, rgba(255,255,255,0.10) 20.99%, rgba(255,255,255,0.025) 84.05%)',
        border: '2px solid rgba(255,255,255,0.14)',
        boxShadow: '0px 30px 60px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      {/* Left: stars + quote + author */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex gap-1.5 mb-4 md:mb-5 shrink-0" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={18} className="fill-[#FFCE5A] text-[#FFCE5A]" aria-hidden="true" />
          ))}
        </div>

        <p className="flex-1 overflow-hidden text-white font-semibold text-base md:text-[22px] lg:text-[26px] leading-snug md:leading-[36px] md:pr-[60px] line-clamp-7 md:line-clamp-5">
          &ldquo;{t.text}&rdquo;
        </p>

        <div className="mt-5 md:mt-6 flex items-center gap-5 shrink-0">
          <Avatar t={t} className="md:hidden w-[60px] h-[60px]" initialsClass="text-base" radius="10px" />
          <div>
            <p className="font-bold text-lg text-white">{t.name}</p>
            <p className="text-sm md:text-base text-white/60 mt-1">{t.position}</p>
          </div>
        </div>
      </div>

      {/* Right: large avatar (desktop) */}
      <div className="hidden md:flex items-center shrink-0">
        <Avatar t={t} className="w-40 lg:w-44 h-44 lg:h-52" initialsClass="text-5xl" />
      </div>
    </div>
  );
}

export default function TestimonialsPlaceholder() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const next = () => setIdx((i) => (i + 1) % count);
  const prev = () => setIdx((i) => (i - 1 + count) % count);

  // Auto-advance; pauses while hovered
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, INTERVAL);
    return () => clearInterval(t);
  }, [paused, idx]);

  return (
    <section className="section-padding">
      <div className="container-page">
        {/* Section title — same style as the rest of the site, above the container */}
        <BlurReveal
          text="Kind Words from our Customers"
          className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)] mb-8 md:mb-12"
          blur={12}
          y={24}
          rotate={5}
          stagger={0.12}
        />

        {/* Rounded panel — grainy dark-blue texture blended with the PQube theme gradient.
            Fixed height: arrows on top, card fills the remaining space (constant size per slide) */}
        <div
          className="relative overflow-hidden rounded-[40px] md:rounded-[60px] px-5 md:px-14 pt-10 pb-8 md:pt-12 md:pb-10 h-[460px] md:h-[520px] lg:h-[540px] flex flex-col"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(16,26,66,0.94) 0%, rgba(27,42,107,0.88) 45%, rgba(34,52,138,0.82) 100%), url('/images/grainy-gradient-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Theme glow blobs */}
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[var(--pqube-cyan)]/15 blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute -bottom-28 -right-20 w-[420px] h-[420px] rounded-full bg-[var(--pqube-blue)]/20 blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-3xl border border-white/5 rotate-45 pointer-events-none" aria-hidden="true" />

          {/* Arrow controls, top-right inside the panel */}
          <div className="relative flex justify-end gap-2.5 mb-5 md:mb-6 shrink-0">
            {[
              { icon: ChevronLeft, label: 'Previous testimonial', action: prev },
              { icon: ChevronRight, label: 'Next testimonial', action: next },
            ].map(({ icon: Icon, label, action }) => (
              <button
                key={label}
                onClick={action}
                aria-label={label}
                className="w-[46px] h-[46px] md:w-[54px] md:h-[54px] rounded-full text-white border-2 border-white/15 hover:bg-white hover:text-[#111] hover:scale-110 transition-all duration-300 flex items-center justify-center"
              >
                <Icon size={26} />
              </button>
            ))}
          </div>

          {/* Carousel — fills remaining space; card keeps a constant size */}
          <div className="relative flex-1 min-h-0" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                className="h-full"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              >
                <ReviewCard t={testimonials[idx]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
