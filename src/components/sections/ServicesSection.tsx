"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Cloud, Globe, Code, Settings, Smartphone, ShoppingCart,
  BarChart3, Megaphone, Layers, RefreshCw, Server, Database,
} from "lucide-react";
import { services } from "@/data/site-data";
import ScrollReveal from "@/components/react-bits/ScrollReveal";
import BorderGlow from "@/components/react-bits/BorderGlow";
import TiltedCard from "@/components/react-bits/TiltedCard";
import GlareHover from "@/components/react-bits/GlareHover";

const iconMap: Record<string, React.ElementType> = {
  Cloud, Globe, Code, Settings, Smartphone, ShoppingCart,
  BarChart3, Megaphone, Layers, RefreshCw, Server, Database,
};

export default function ServicesSection() {
  return (
    <section className="section-spacing bg-pqube-surface">
      <div className="section-container">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <span className="eyebrow">What We Deliver</span>
            <h2 className="heading-section text-pqube-dark mb-6">
              Business IT Solutions We Offer
            </h2>
            <p className="body-large text-pqube-text max-w-2xl mx-auto">
              As a business solution provider, PQube covers maximum space in offering
              Business Solutions in India. It helps your business or organization to
              find quick and quality growth in various sectors.
            </p>
            <div className="w-12 h-0.5 bg-pqube-accent mx-auto mt-8" />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-4xl mx-auto mb-16">
            <p className="body-regular text-center text-pqube-text-light">
              Business solution companies are in plenty, and all are about numbers.
              PQube takes a different approach &ndash; quality is our emphasis while
              providing IT solutions. Hence we serve only the best. We incorporate
              specific insights into business concepts and provide real-world ideas
              and integrations with rapid developments. It ensures our customers
              achieve over and above their desired business goals.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <ScrollReveal key={service.title} delay={index * 80}>
                <TiltedCard tiltDegree={3} className="h-full">
                  <BorderGlow className="h-full">
                    <GlareHover className="h-full">
                      <Link
                        href={service.href}
                        className="group block bg-white rounded-2xl border border-pqube-border p-8 transition-all duration-300 h-full card-top-line"
                      >
                        <div className="w-12 h-12 rounded-xl bg-pqube-primary-light flex items-center justify-center mb-5 group-hover:bg-pqube-primary/15 transition-colors">
                          <Icon className="w-6 h-6 text-pqube-primary" />
                        </div>
                        <h3 className="heading-card mb-3 text-pqube-dark">{service.title}</h3>
                        <p className="body-small line-clamp-3 mb-5">{service.description}</p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-pqube-primary group/link transition-colors">
                          Read More
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                        </span>
                      </Link>
                    </GlareHover>
                  </BorderGlow>
                </TiltedCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
