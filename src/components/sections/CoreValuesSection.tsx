import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { coreValues } from "@/data/site-data";
import ScrollReveal from "@/components/react-bits/ScrollReveal";

export default function CoreValuesSection() {
  return (
    <section className="section-padding section-spacing bg-white">
      <div className="section-container">
        <div className="space-y-20 md:space-y-28">
          {coreValues.map((value, index) => (
            <ScrollReveal key={value.title} delay={index * 100}>
            <div
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"
            >
              {/* Label column */}
              <div className="lg:col-span-4 lg:sticky lg:top-32">
                <div className="inline-block border-t-2 border-pqube-primary pt-4 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-pqube-primary">
                    {index === 0 ? "01" : index === 1 ? "02" : index === 2 ? "03" : index === 3 ? "04" : "05"}
                  </span>
                </div>
                <h2 className="heading-section text-pqube-dark">
                  {value.title}
                </h2>
                {value.subtitle && (
                  <p className="text-sm font-medium text-pqube-primary mt-3 leading-relaxed">
                    {value.subtitle}
                  </p>
                )}
              </div>

              {/* Content column */}
              <div className="lg:col-span-7 lg:col-start-6">
                <p className="body-large text-pqube-text">
                  {value.content}
                </p>
                <div className="mt-8">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-pqube-primary hover:text-pqube-primary-dark transition-colors group"
                  >
                    LEARN MORE
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
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
