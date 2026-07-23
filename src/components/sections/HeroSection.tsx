"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import ShapeBlur from "@/components/react-bits/ShapeBlur";
import ShinyText from "@/components/react-bits/ShinyText";

const slides = [
  {
    title: "Business IT Solutions",
    subtitle: "20+ Years of Excellence",
    description: "Enterprise-grade technology solutions that transform businesses. From cloud infrastructure to digital marketing — we deliver quality at scale.",
    cta: "SCHEDULE FREE DEMO",
    ctaUrl: "https://outlook.office365.com/owa/calendar/PQubeBusinessSolutions@pqube.in/bookings/",
    image: "/images/hero/hero-tech-desk.jpg",
  },
  {
    title: "Build People to Build Business\u00AE",
    subtitle: "Our Passion",
    description: "Engaging Talent, Empowering Minds & Enriching Lifestyles. We transform businesses by investing in people first.",
    cta: "Learn More",
    ctaUrl: "/about",
    image: "/images/hero/hero-developer.jpg",
  },
  {
    title: "Global Digital Transformation Partner",
    subtitle: "Trusted Worldwide",
    description: "Trusted by Fortune 500 companies and growing businesses across the globe. Your success is our mission.",
    cta: "Explore Services",
    ctaUrl: "/services",
    image: "/images/hero/hero-office-desk.jpg",
  },
  {
    title: "Quality is Our Emphasis",
    subtitle: "Different by Design",
    description: "Every solution we deliver is backed by passion, precision, and ownership. We don't just meet expectations — we exceed them.",
    cta: "Contact Us",
    ctaUrl: "/contact",
    image: "/images/hero/hero-collaboration.jpg",
  },
  {
    title: "Innovating for Tomorrow",
    subtitle: "Future Ready",
    description: "We help businesses scale with cutting-edge technology, skilled talent, and a passion for excellence that sets us apart.",
    cta: "Our Approach",
    ctaUrl: "/about",
    image: "/images/hero/hero-innovation.jpg",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const DURATION = 900;

  const transitionTo = useCallback((index: number) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setLeaving(current);
    requestAnimationFrame(() => {
      setCurrent(index);
      setTimeout(() => {
        setLeaving(null);
        setIsTransitioning(false);
      }, DURATION);
    });
  }, [current, isTransitioning]);

  const next = useCallback(() => transitionTo((current + 1) % slides.length), [current, transitionTo]);
  const prev = useCallback(() => transitionTo((current - 1 + slides.length) % slides.length), [current, transitionTo]);

  useEffect(() => {
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [next]);

  const getSlideStyle = (i: number): React.CSSProperties => {
    if (i === current && !isTransitioning) return { opacity: 1, zIndex: 2 };
    if (i === current && isTransitioning) return { opacity: 1, zIndex: 2, transition: "opacity 0.9s ease-out" };
    if (leaving === i) return { opacity: 0, zIndex: 1, transition: "opacity 0.9s ease-out" };
    return { opacity: 0, zIndex: 0, pointerEvents: "none" as const };
  };

  const getImageClass = (i: number): string => {
    if (i === current) return "w-full h-full object-cover hero-ken-current";
    if (leaving === i) return "w-full h-full object-cover hero-ken-leaving";
    return "w-full h-full object-cover";
  };

  const getContentStyle = (i: number): React.CSSProperties => {
    const entering = i === current && isTransitioning;
    const exiting = leaving === i;
    if (entering) return { opacity: 1, transform: "translateY(0)", transition: "opacity 0.8s ease-out 0.1s, transform 0.8s ease-out 0.1s" };
    if (exiting) return { opacity: 0, transform: "translateY(-16px)", transition: "opacity 0.5s ease-out, transform 0.5s ease-out" };
    if (i === current && !isTransitioning) return { opacity: 1, transform: "translateY(0)" };
    return { opacity: 0, transform: "translateY(16px)" };
  };

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-pqube-dark-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-pqube-dark-bg via-[#0f1f3d] to-[#1a2a4a]" />

      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <ShapeBlur color="#046bd2" size={500} className="absolute inset-0 z-[1]" intensity={0.04} />

      <div className="relative z-[2] h-full">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-center"
            style={getSlideStyle(i)}
            aria-hidden={i !== current && leaving !== i}
          >
            {slide.image ? (
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={slide.image}
                  alt=""
                  className={getImageClass(i)}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-pqube-dark-bg/95 via-pqube-dark-bg/80 to-pqube-dark-bg/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-pqube-dark-bg/60 via-transparent to-transparent" />
              </div>
            ) : (
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-pqube-dark-bg via-[#0f1f3d] to-[#1a2a4a]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(4,107,210,0.15),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,160,48,0.08),transparent_50%)]" />
              </div>
            )}
            <div className="section-container w-full relative">
              <div className="max-w-3xl" style={getContentStyle(i)}>
                {i === 0 && current === i ? (
                  <ShinyText text={slide.subtitle} />
                ) : (
                  <span className="eyebrow-light text-pqube-accent">{slide.subtitle}</span>
                )}
                <h1 className="heading-hero text-white mt-4 mb-6">
                  {slide.title}
                </h1>
                <p className="text-base md:text-lg text-white/70 max-w-2xl leading-relaxed mb-8">
                  {slide.description}
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href={slide.ctaUrl}
                    target={slide.ctaUrl.startsWith("http") ? "_blank" : undefined}
                    rel={slide.ctaUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="btn-primary text-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    {slide.cta}
                  </a>
                  <Link href="/services" className="btn-outline text-sm">
                    View All Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-[3] h-0.5 bg-white/5">
        <div
          className="h-full transition-all duration-[7000ms] ease-linear"
          style={{
            width: isTransitioning ? "0%" : "100%",
            background: "linear-gradient(90deg, #046bd2, #d4a030)",
          }}
        />
      </div>

      <div className="absolute bottom-12 right-12 z-[3] hidden md:flex items-center gap-3">
        <button onClick={prev} className="w-10 h-10 rounded-full border border-white/20 hover:border-white/50 text-white/60 hover:text-white flex items-center justify-center transition-all duration-200" aria-label="Previous slide">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={next} className="w-10 h-10 rounded-full border border-white/20 hover:border-white/50 text-white/60 hover:text-white flex items-center justify-center transition-all duration-200" aria-label="Next slide">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute bottom-12 left-12 z-[3] flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => transitionTo(i)}
            className={`relative rounded-full transition-all duration-500 ${
              i === current
                ? "w-16 h-1.5 bg-white/15"
                : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          >
            {i === current && (
              <div
                key={current}
                className="absolute inset-0 rounded-full hero-dot-progress"
                style={{ background: "linear-gradient(90deg, #046bd2, #d4a030)" }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
