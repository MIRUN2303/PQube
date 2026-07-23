import { ContactSection } from "@/components/sections/BlogContactSection";

export default function ContactPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-pqube-dark via-[#0f1f3d] to-[#1a2a4a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="section-container section-padding relative z-10">
          <span className="label text-pqube-primary">Contact</span>
          <h1 className="heading-section text-white mt-4 mb-6">CONTACT US</h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Have a project in mind? Let&apos;s discuss how PQube can help transform your business with enterprise-grade technology solutions.
          </p>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
