"use client";

import Link from "next/link";
import { Building2, ArrowRight, Star, Quote } from "lucide-react";
import { clients, testimonials } from "@/data/site-data";
import ScrollReveal from "@/components/react-bits/ScrollReveal";
import MagicBento from "@/components/react-bits/MagicBento";
import TrueFocus from "@/components/react-bits/TrueFocus";

export function ClientsLogoSection() {
  // Duplicate clients array for continuous marquee feel
  const allLogos = [...clients, ...clients];

  return (
    <section className="section-spacing bg-white overflow-hidden">
      <div className="section-container">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <span className="eyebrow">Our Clients</span>
            <h2 className="heading-section text-pqube-dark mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="body-large text-pqube-text max-w-2xl mx-auto">
              We are trusted by organizations and businesses worldwide, from small,
              mid-sized, to Fortune 500 companies. PQube has had tremendous
              opportunities over the last 15 years, working with industry leading
              brands to many start-ups making their first online presence.
            </p>
            <div className="w-12 h-0.5 bg-pqube-accent mx-auto mt-8" />
          </div>
        </ScrollReveal>
      </div>

      {/* Auto-scrolling logo strip */}
      <div className="relative">
        <div className="flex overflow-hidden">
          <div className="flex logo-marquee gap-16 md:gap-24 items-center px-8">
            {allLogos.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="shrink-0 flex flex-col items-center gap-2 group cursor-default"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-pqube-surface border border-pqube-border flex items-center justify-center group-hover:border-pqube-primary/30 group-hover:bg-pqube-primary/[0.04] transition-all duration-300">
                  <Building2 className="w-6 h-6 md:w-7 md:h-7 text-pqube-text-light/40 group-hover:text-pqube-primary/60 transition-colors" />
                </div>
                <span className="text-xs font-semibold text-pqube-text-light whitespace-nowrap group-hover:text-pqube-primary transition-colors">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Why Pqube Stats Section ─── */
export function WhyPqubeSection() {
  return (
    <section className="section-spacing bg-pqube-dark-bg overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <ScrollReveal>
            <div>
              <span className="eyebrow-light">Why PQube</span>
              <h2 className="heading-section text-white mb-6">
                Why Our Business Solutions
              </h2>
              <p className="text-base md:text-lg text-pqube-dark-text leading-relaxed">
                We are IT Service providers with over <strong className="text-white">20+ years</strong> of hands-on
                experience. We work in the global ecosystem, and being native to India, we can align culturally,
                collaborate cohesively. PQube executes the vision to deliver excellence to our clients.
              </p>
              <p className="text-base text-pqube-dark-text leading-relaxed mt-4">
                We work with a high level of flexibility in different time zones to cater to our global clients
                in every corner of the world. Our expertise in using state of the art tools and processes ensures
                seamless communication and connect your people with our team. This guarantees that our deliverables
                are backed with quality, passion and ownership, which in turn helps businesses adapt &amp; grow exponentially.
              </p>
              <Link
                href={"/contact"}
                className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-pqube-accent hover:text-pqube-accent/80 transition-colors group"
              >
                Get Started <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Right stats */}
          <MagicBento glowColor="rgba(212, 160, 48, 0.1)" glowSize={250}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "20+", label: "Years of Experience", accent: true },
                { value: "15+", label: "Industry Verticals" },
                { value: "$10M+", label: "Revenue Generated", accent: true },
                { value: "9", label: "Fortune 500 Clients" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-2xl border p-6 md:p-8 transition-colors card-top-line ${
                    stat.accent
                      ? "bg-pqube-accent/10 border-pqube-accent/20"
                      : "bg-white/[0.04] border-pqube-dark-border"
                  }`}
                >
                  <div className={`text-3xl md:text-4xl font-bold ${
                    stat.accent ? "text-pqube-accent" : "text-white"
                  }`}>
                    <TrueFocus text={stat.value} />
                  </div>
                  <div className={`text-sm mt-2 font-medium ${
                    stat.accent ? "text-pqube-accent/80" : "text-pqube-dark-text"
                  }`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </MagicBento>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials Section ─── */
export function TestimonialsSection() {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="section-spacing bg-pqube-surface">
      <div className="section-container">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <span className="eyebrow">Testimonials</span>
            <h2 className="heading-section text-pqube-dark mb-6">
              What Our Clients Say
            </h2>
            <div className="w-12 h-0.5 bg-pqube-accent mx-auto mt-8" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-white rounded-2xl border border-pqube-border transition-all duration-300 p-6 md:p-8 relative h-full card-top-line">
                <Quote className="w-8 h-8 text-pqube-primary/10 absolute top-6 right-6" />
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-pqube-accent text-pqube-accent" />
                  ))}
                </div>
                <p className="body-small text-pqube-text mb-6 leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-pqube-border">
                  <div className="w-10 h-10 rounded-full bg-pqube-primary/10 flex items-center justify-center text-sm font-bold text-pqube-primary">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-pqube-dark">{t.name}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
