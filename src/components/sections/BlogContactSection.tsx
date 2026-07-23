"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, Send, Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site-data";
import ScrollReveal from "@/components/react-bits/ScrollReveal";
import Magnetic from "@/components/react-bits/Magnetic";

const blogPosts = [
  { title: "Why Digital Marketing Is Essential for Spa Businesses in Bangalore", date: "May 2026", href: "/blog/digital-marketing-spa" },
  { title: "Microsoft Dynamics 365 ERP Implementation Benefits", date: "March 2026", href: "/blog/dynamics-365-benefits" },
  { title: "There Is No Single System for Landowners Managing Real Estate Projects", date: "February 2026", href: "/blog/real-estate-landowners" },
  { title: "AI in Education: How Schools Use AI for Smarter Administration", date: "January 2026", href: "/blog/ai-in-education" },
];

export default function BlogContactSection() {
  return (
    <>
      <BlogSection />
      <ContactSection />
    </>
  );
}

/* ─── Blog / Insights Section ─── */
export function BlogSection() {
  return (
    <section className="section-spacing bg-white">
      <div className="section-container">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <span className="eyebrow">Insights</span>
            <h2 className="heading-section text-pqube-dark mb-6">
              Latest News &amp; Insights
            </h2>
            <div className="w-12 h-0.5 bg-pqube-accent mx-auto mt-8" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post, i) => (
            <ScrollReveal key={post.title} delay={i * 80}>
              <Link
                href={post.href}
                className="group block bg-white rounded-2xl border border-pqube-border transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] overflow-hidden h-full card-top-line"
              >
                <div className="h-44 bg-gradient-to-br from-pqube-primary/[0.06] to-pqube-primary/[0.02] flex items-center justify-center">
                  <CalendarDays className="w-8 h-8 text-pqube-primary/30 group-hover:text-pqube-primary/50 transition-colors" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-pqube-text-light uppercase tracking-wider">
                    {post.date}
                  </span>
                  <h3 className="text-sm font-semibold text-pqube-dark mt-2 line-clamp-3 group-hover:text-pqube-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Section ─── */
export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="section-spacing bg-pqube-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />
      <div className="section-container relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <span className="eyebrow-light">Get In Touch</span>
            <h2 className="heading-section text-white mb-6">
              Get a Free Consultation
            </h2>
            <div className="w-12 h-0.5 bg-pqube-accent mx-auto mt-8" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Contact info */}
          <ScrollReveal className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-pqube-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-pqube-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">Bengaluru, INDIA</h4>
                  <p className="text-sm text-pqube-dark-text">7J4VWJ74+XF</p>
                  <p className="text-sm text-pqube-dark-text mt-1">Delaware, USA</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-pqube-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-pqube-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">Phone</h4>
                  <a href={`tel:${siteConfig.phone}`} className="text-sm text-pqube-dark-text hover:text-pqube-accent transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-pqube-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-pqube-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">Email</h4>
                  <a href={`mailto:${siteConfig.email}`} className="text-sm text-pqube-dark-text hover:text-pqube-accent transition-colors">
                    info[at]pqube[dot]in
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal delay={150} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white/[0.04] border border-pqube-dark-border rounded-2xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/[0.06] border border-pqube-dark-border rounded-xl text-sm text-white placeholder-pqube-dark-text focus:outline-none focus:border-pqube-accent/50 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/[0.06] border border-pqube-dark-border rounded-xl text-sm text-white placeholder-pqube-dark-text focus:outline-none focus:border-pqube-accent/50 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white/[0.06] border border-pqube-dark-border rounded-xl text-sm text-white placeholder-pqube-dark-text focus:outline-none focus:border-pqube-accent/50 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-white/[0.06] border border-pqube-dark-border rounded-xl text-sm text-white placeholder-pqube-dark-text focus:outline-none focus:border-pqube-accent/50 transition-colors"
                />
              </div>
              <textarea
                placeholder="Message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full mt-4 px-4 py-3 bg-white/[0.06] border border-pqube-dark-border rounded-xl text-sm text-white placeholder-pqube-dark-text focus:outline-none focus:border-pqube-accent/50 transition-colors resize-none"
              />
              <div className="mt-4 flex items-center gap-4">
                <Magnetic>
                  <button
                    type="submit"
                    className={`inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm ${
                      submitted
                        ? "bg-pqube-success text-white"
                        : "bg-pqube-accent text-white hover:bg-pqube-accent/90"
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    {submitted ? "Sent!" : "Send Message"}
                  </button>
                </Magnetic>
                <p className="text-xs text-pqube-dark-text">
                  We'll get back within 24 hours
                </p>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
