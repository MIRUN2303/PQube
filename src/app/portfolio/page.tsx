import Link from "next/link";
import { ArrowLeft, FolderOpen } from "lucide-react";

export default function PortfolioPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-pqube-dark via-[#0f1f3d] to-[#1a2a4a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="section-container section-padding relative z-10">
          <Link href="/about" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to About
          </Link>
          <span className="label text-pqube-primary">Our Work</span>
          <h1 className="heading-section text-white mt-4 mb-6">OUR PORTFOLIO</h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Explore our portfolio of successful projects and digital transformations delivered for clients worldwide.
          </p>
        </div>
      </section>

      <section className="section-padding section-spacing bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <FolderOpen className="w-16 h-16 text-pqube-primary/30 mx-auto mb-6" />
            <h2 className="heading-subsection text-pqube-dark mb-4">Portfolio Showcase</h2>
            <p className="body-large text-pqube-text">
              Our portfolio is currently being updated. For a complete view of our work, please 
              <Link href="/contact" className="text-pqube-primary hover:underline mx-1">contact us</Link> 
              or schedule a free consultation to discuss how we can help transform your business.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
