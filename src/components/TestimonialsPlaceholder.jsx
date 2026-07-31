import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import ShinyText from './ShinyText';
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
      className="card-blur-in flex flex-col md:flex-row gap-6 md:gap-10 p-5 md:p-[30px] md:pl-[65px] rounded-[30px] h-full"
      style={{
        background: 'linear-gradient(108.44deg, rgba(255,255,255,0.12) 20.99%, rgba(255,255,255,0.05) 84.05%)',
        border: '2px solid rgba(255,255,255,0.16)',
        boxShadow: '0px 30px 60px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(8px) saturate(120%)',
        WebkitBackdropFilter: 'blur(8px) saturate(120%)',
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
  const [playing, setPlaying] = useState(true);
  const count = testimonials.length;

  const next = () => setIdx((i) => (i + 1) % count);
  const prev = () => setIdx((i) => (i - 1 + count) % count);
  const running = playing && !paused;

  // Auto-advance; pauses while hovered or toggled off
  useEffect(() => {
    if (!running) return;
    const t = setInterval(next, INTERVAL);
    return () => clearInterval(t);
  }, [running, idx]);

  return (
    <section className="section-padding">
      <div className="container-page">
        {/* Section title — centered with shiny eyebrow, same style as the rest of the site */}
        <div className="text-center mb-12">
          <ShinyText
            text="Testimonials"
            color="#29ABE2"
            shineColor="#ffffff"
            speed={3}
            spread={120}
            className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3"
          />
          <BlurReveal
            text="Kind Words from our Customers"
            className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]"
            blur={12}
            y={24}
            rotate={5}
            stagger={0.12}
          />
        </div>

        {/* Rounded panel — grainy dark-blue texture blended with the PQube theme gradient.
            Fixed height: arrows on top, card fills the remaining space (constant size per slide) */}
        <div
          className="relative overflow-hidden rounded-[40px] md:rounded-[60px] px-5 md:px-14 pt-10 pb-6 md:pt-12 md:pb-8 h-[480px] md:h-[540px] lg:h-[560px] flex flex-col"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
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

          {/* Decorative curvy heading-style watermark inside the panel background */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 text-center pointer-events-none select-none"
            aria-hidden="true"
          >
            <span
              className="italic text-white/[0.06] leading-none whitespace-nowrap text-[7rem] md:text-[13rem]"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Kind Words
            </span>
          </div>

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
          <div className="relative flex-1 min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                className="h-full"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <ReviewCard t={testimonials[idx]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide indicator dots + play/pause toggle */}
          <div className="relative flex justify-center gap-2.5 pt-4 md:pt-5 shrink-0">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === idx ? 'w-8 bg-[var(--pqube-cyan)]' : 'w-2.5 bg-white/25 hover:bg-white/50'
                }`}
              />
            ))}

            {/* Play/pause toggle — "voice meter": equalizer bars dance while autoplay
                runs, settle when paused; the cyan line beneath counts down the 5s cycle */}
            <button
              onClick={() => setPlaying((p) => !p)}
              aria-label={running ? 'Pause autoplay' : 'Play autoplay'}
              title={running ? 'Pause autoplay' : 'Play autoplay'}
              className="absolute right-0 top-[65%] -translate-y-1/2 w-9 h-9 rounded-full bg-white/5 border border-white/20 hover:border-white/40 hover:bg-white/10 transition-colors flex items-center justify-center overflow-hidden"
            >
              {/* Equalizer bars */}
              <div className="flex items-center gap-[3px] h-3.5">
                {[0, 1, 2, 3].map((i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] h-3.5 rounded-full"
                    style={{ background: running ? 'var(--pqube-cyan)' : 'rgba(255,255,255,0.35)' }}
                    animate={
                      running
                        ? { scaleY: [0.3, 1, 0.45, 0.8, 0.3], opacity: [0.6, 1, 0.7, 1, 0.6] }
                        : { scaleY: 0.25, opacity: 0.5 }
                    }
                    transition={
                      running
                        ? { duration: 0.9 + i * 0.18, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }
                        : { duration: 0.3 }
                    }
                  />
                ))}
              </div>

              {/* 5s countdown sweep */}
              <div className="absolute bottom-[5px] left-[7px] right-[7px] h-[2px] rounded-full bg-white/10">
                {running && (
                  <motion.div
                    key={idx}
                    className="h-full rounded-full origin-left bg-[var(--pqube-cyan)]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
                  />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
