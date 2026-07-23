"use client";

import { siteConfig } from "@/data/site-data";
import CardSwap from "@/components/react-bits/CardSwap";
import ScrollReveal from "@/components/react-bits/ScrollReveal";
import TrueFocus from "@/components/react-bits/TrueFocus";
import { ArrowRight } from "lucide-react";

const coreItems = [
  {
    id: "core-values",
    subtitle: "CORE VALUES",
    title: "People \u00D7 Principles \u00D7 Prosperity = Quantum",
    content: "We value our people and thrive in an environment that inspires them to be the best in their skills. We stand our ground on Honesty, Integrity, Loyalty, Trust & Transparency built on people. We invest in developing and building people.",
  },
  {
    id: "core-virtues",
    subtitle: "CORE VIRTUES",
    title: "Patience \u00D7 Perseverance \u00D7 Perfection = Quality",
    content: "Quality is measured as degree of excellence. To achieve quality in our technology solutions, we strive to understand the business in detail, plan & cover risks to the last mile and execute to perfection. Whether it is a brochure website or a complex eCommerce platform, the approach will be the same!",
  },
  {
    id: "our-passion",
    subtitle: "OUR PASSION",
    title: "Build People to Build Business\u00AE",
    content: '\u201CYou don\u2019t build a business. You build people, and people build the business.\u201D \u2013 Zig Ziglar. PQube believes in three steps \u2013 Engaging Talent, Empowering Minds & Enriching Lifestyles. With this balance in our people, we transform businesses and people, by leveraging our expertise in Technology, Automation and Process to execute our passion.',
  },
  {
    id: "our-vision",
    subtitle: "OUR VISION",
    title: "Global Digital Platform for Exponential Growth",
    content: "Our vision is to provide the right people to build technology solutions and help businesses transform to higher profitability and scalable growth. Our vast experience and proven processes will provide a global digital platform to assist every entrepreneurial business to evolve exponentially.",
  },
  {
    id: "our-mission",
    subtitle: "OUR MISSION",
    title: "Nuclear Fusion Team for Digital Excellence",
    content: "Our mission is to build a nuclear fusion team and develop digital solutions for enhanced visibility and transparency. We prioritize team and tool development to fulfill our passion for transforming individuals and enterprises. Our vision is executed by meeting the needs of our people and surpassing the expectations of businesses.",
  },
];

export default function CoreValuesModule() {
  return (
    <section className="section-spacing bg-white overflow-hidden">
      <div className="section-container">
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="eyebrow">Our Foundation</span>
            <h2 className="heading-section text-pqube-dark mb-4">
              What Drives Us
            </h2>
            <p className="body-large max-w-2xl">
              Our philosophy is built on a simple equation: invest in people, pursue perfection, and prosperity follows.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* CardSwap takes left 3 columns */}
          <div className="lg:col-span-3">
            <div className="relative min-h-[360px] md:min-h-[320px]">
              <CardSwap items={coreItems} autoRotateInterval={7000} />
            </div>
          </div>

          {/* Right panel - stats / highlight */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <ScrollReveal delay={200}>
              <div className="bg-pqube-surface rounded-2xl border border-pqube-border p-8 card-top-line">
                <div className="text-4xl font-bold text-pqube-primary mb-2">
                  <TrueFocus text="20+" />
                </div>
                <div className="text-sm font-semibold text-pqube-dark uppercase tracking-wide mb-6">
                  Years of Excellence
                </div>
                <div className="w-10 h-0.5 bg-pqube-accent mb-6" />
                <p className="body-small">
                  For two decades, PQube has delivered enterprise IT solutions that drive measurable business outcomes. Our proven processes, global ecosystem, and commitment to quality have made us a trusted partner for Fortune 500 companies and ambitious startups alike.
                </p>
                <a
                  href={siteConfig.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-pqube-primary hover:text-pqube-primary-dark transition-colors group"
                >
                  Schedule Free Demo
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
