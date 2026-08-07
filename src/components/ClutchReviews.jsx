import { useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import ShinyText from '../components/ShinyText';
import BlurReveal from '../components/BlurReveal';
import Carousel from './reactbits/Carousel';
import { testimonials, reviewSummary } from '../data/portfolio';

const renderStars = (rating) => (
  <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        size={13}
        className={i <= Math.round(rating) ? 'fill-[#FFCE5A] text-[#FFCE5A]' : 'fill-[#E2E8F0] text-[#E2E8F0]'}
      />
    ))}
  </div>
);

const stats = [
  { value: reviewSummary.average, suffix: '/5', label: 'Average Review Rating' },
  { value: Math.round(reviewSummary.total / 2), suffix: '', label: 'Clutch Reviews on This Page' },
  { value: '5.0', suffix: '/5', label: 'Average Referral Rating' },
  { value: '22+', suffix: '', label: 'Years of Combined Expertise' },
];

const distribution = [
  { stars: 5, pct: 86 },
  { stars: 4, pct: 12 },
  { stars: 3, pct: 2 },
];

export default function ClutchReviews() {
  const carouselRef = useRef(null);
  const carouselItems = testimonials.map((t, id) => ({
    id,
    icon: <Quote size={16} />,
    title: t.case,
    description: (
      <>
        <p className="carousel-item-quote">“{t.quote}”</p>
        <span className="carousel-item-date">{t.date}</span>
        <div className="carousel-item-rating">
          <div className="flex items-center gap-2">
            {renderStars(t.rating)}
            <span className="text-xs font-bold text-[var(--pqube-navy)]">{t.rating.toFixed(1)}</span>
          </div>
        </div>
      </>
    ),
  }));

  return (
    <section className="section-padding bg-[var(--pqube-gray-50)] overflow-hidden">
      <div className="container-page">
        <div className="text-center mb-12">
          <ShinyText text="Clutch Reviews" color="#D4A017" shineColor="#F0C75E" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
          <BlurReveal text="Rated by the Clients We Serve" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
          <p className="text-[var(--pqube-gray-500)] max-w-xl mx-auto mt-4">
            Our engagements are scored independently on Clutch. Here is how clients rate working with PQube.
          </p>
        </div>

        <div className="rounded-3xl bg-white border border-[var(--pqube-gray-200)] overflow-hidden shadow-xl shadow-[var(--pqube-blue)]/10">
          {/* Review slideshow */}
          <div className="relative py-8 flex justify-center" style={{ height: '420px' }}>
            <button
              type="button"
              onClick={() => carouselRef.current?.prev()}
              aria-label="Previous review"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-[var(--pqube-gray-200)] text-[var(--pqube-navy)] shadow-lg shadow-black/10 flex items-center justify-center hover:bg-[#D4A017] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4A017]/50"
            >
              <ChevronLeft size={22} />
            </button>
            <Carousel ref={carouselRef} items={carouselItems} baseWidth={720} autoplay autoplayDelay={3500} pauseOnHover loop />
            <button
              type="button"
              onClick={() => carouselRef.current?.next()}
              aria-label="Next review"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-[var(--pqube-gray-200)] text-[var(--pqube-navy)] shadow-lg shadow-black/10 flex items-center justify-center hover:bg-[#D4A017] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4A017]/50"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Clutch summary bar */}
          <div className="bg-gradient-to-br from-[var(--pqube-navy)] via-[var(--pqube-blue)] to-[var(--pqube-cyan)] px-6 md:px-10 py-7 text-white">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src="/images/portfolio/accreditations/clutch-awards.png"
                  alt="Clutch Top Company Bengaluru 2023"
                  className="h-18 w-auto object-contain bg-white rounded-lg p-2"
                  style={{ height: '72px' }}
                />
                <div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-extrabold leading-none">{reviewSummary.average}</span>
                    <span className="text-lg font-bold text-white mb-0.5">/ 5</span>
                    <div className="mb-0.5 ml-2">{renderStars(5)}</div>
                  </div>
                  <p className="mt-1.5 text-sm text-white/75">
                    {reviewSummary.ratingLabel} · {reviewSummary.total} verified Clutch reviews · Top Company '23
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto lg:min-w-[560px]">
                {stats.map((s) => (
                  <div key={s.label} className="text-center lg:text-left">
                    <div className="text-2xl font-extrabold">
                      {s.value}
                      {s.suffix && <span className="text-sm font-bold text-white">{s.suffix}</span>}
                    </div>
                    <div className="mt-1 text-[10px] font-medium text-white/70 uppercase tracking-wide leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 pt-6 border-t border-white/15 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-center">
              <div className="md:col-span-2 pr-2 md:pr-6">
                <div className="text-xs font-bold uppercase tracking-wider text-white/90 mb-4">Rating Distribution</div>
                <div className="space-y-4">
                  {distribution.map((d) => (
                    <div key={d.stars} className="flex items-center gap-4">
                      <div className="flex items-center gap-1 w-20 shrink-0">{renderStars(d.stars)}</div>
                      <div className="flex-1 h-2.5 rounded-full bg-white/15 overflow-hidden">
                        <div className="h-full rounded-full bg-[#FFCE5A]" style={{ width: `${d.pct}%` }} />
                      </div>
                      <span className="text-xs font-semibold tabular-nums text-white/90 w-10 text-right shrink-0">{d.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end text-center md:text-right md:border-l md:border-white/15 md:pl-8">
                <div className="text-3xl font-extrabold leading-none">100%</div>
                <div className="mt-2 text-[11px] text-white/70 uppercase tracking-wider max-w-[140px]">Clients who recommend PQube</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
