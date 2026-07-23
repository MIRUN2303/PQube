import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-pqube-dark via-[#0f1f3d] to-[#1a2a4a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="section-container section-padding relative z-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="heading-section text-white mt-4 mb-6">TERMS OF USE</h1>
        </div>
      </section>

      <section className="section-padding section-spacing bg-white">
        <div className="section-container max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <p className="body-large text-pqube-text">
              These terms govern your use of the PQube Business Solutions website. By accessing this site, you agree to these terms in full.
            </p>
            <h2 className="heading-subsection text-pqube-dark mt-10 mb-4">1. Use of Content</h2>
            <p className="body-regular text-pqube-text">
              All content on this website is for informational purposes only. You may not reproduce, distribute, or modify any content without prior written permission from PQube Business Solutions.
            </p>
            <h2 className="heading-subsection text-pqube-dark mt-10 mb-4">2. Intellectual Property</h2>
            <p className="body-regular text-pqube-text">
              All trademarks, service marks, and intellectual property displayed on this site are the property of their respective owners.
            </p>
            <h2 className="heading-subsection text-pqube-dark mt-10 mb-4">3. Limitation of Liability</h2>
            <p className="body-regular text-pqube-text">
              PQube Business Solutions shall not be liable for any damages arising from the use of or inability to use this website or the services provided.
            </p>
            <h2 className="heading-subsection text-pqube-dark mt-10 mb-4">4. Changes</h2>
            <p className="body-regular text-pqube-text">
              We reserve the right to update these terms at any time without notice. Continued use of the site constitutes acceptance of any changes.
            </p>
            <p className="body-regular text-pqube-text-light mt-12">
              Last updated: January 2026. For questions, <Link href="/contact" className="text-pqube-primary hover:underline">contact us</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
