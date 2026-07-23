import Link from "next/link";
import { ArrowRight, Building2, History, Users, Target, Eye } from "lucide-react";
import { aboutContent, coreValues, testimonials } from "@/data/site-data";
import { WhyPqubeSection, TestimonialsSection } from "@/components/sections/ClientsSection";

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-pqube-dark via-[#0f1f3d] to-[#1a2a4a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="section-container section-padding relative z-10">
          <span className="label text-pqube-primary">About Us</span>
          <h1 className="heading-section text-white mt-4 mb-6">ABOUT US</h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            {aboutContent.intro}
          </p>
        </div>
      </section>

      {/* History */}
      <section className="section-padding section-spacing bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
            <div>
              <span className="label">Our Journey</span>
              <h2 className="heading-section mt-4 mb-8">{aboutContent.history.title}</h2>
              <div className="space-y-5">
                {aboutContent.history.paragraphs.map((p, i) => (
                  <p key={i} className="body-regular">{p}</p>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-pqube-primary/10 via-pqube-primary/5 to-pqube-muted flex items-center justify-center">
                <History className="w-20 h-20 text-pqube-primary/30" />
              </div>
              {/* Timeline dots */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6">
                {[2013, 2019, 2024].map((year) => (
                  <div key={year} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-pqube-primary" />
                    <span className="text-xs font-semibold text-pqube-primary">{year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Today */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-pqube-muted flex items-center justify-center">
                <Building2 className="w-20 h-20 text-emerald-500/30" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="label">Present</span>
              <h2 className="heading-section mt-4 mb-8">{aboutContent.today.title}</h2>
              {aboutContent.today.paragraphs.map((p, i) => (
                <p key={i} className="body-regular">{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="section-padding section-spacing bg-pqube-surface">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "OUR VISION", icon: Eye, desc: coreValues[3].content.split(".")[0] + "." },
              { title: "OUR MISSION", icon: Target, desc: coreValues[4].content.split(".")[0] + "." },
              { title: "CORE VALUES", icon: Users, desc: coreValues[0].content.split(".")[0] + "." },
              { title: "CORE VIRTUES", icon: Target, desc: coreValues[1].content.split(".")[0] + "." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white rounded-xl border border-pqube-border p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <Icon className="w-8 h-8 text-pqube-primary mb-4" />
                  <h3 className="text-base font-semibold text-pqube-dark mb-3">{item.title}</h3>
                  <p className="text-sm text-pqube-text-light leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <WhyPqubeSection />
      <TestimonialsSection />
    </>
  );
}
