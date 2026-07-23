import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-pqube-dark via-[#0f1f3d] to-[#1a2a4a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="section-container section-padding relative z-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="heading-section text-white mt-4 mb-6">PRIVACY POLICY</h1>
        </div>
      </section>

      <section className="section-padding section-spacing bg-white">
        <div className="section-container max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <p className="body-large text-pqube-text">
              PQube Business Solutions respects your privacy. This policy outlines how we collect, use, and protect your personal information.
            </p>
            <h2 className="heading-subsection text-pqube-dark mt-10 mb-4">1. Information We Collect</h2>
            <p className="body-regular text-pqube-text">
              We collect information you provide directly, such as your name, email address, phone number, and company details when you fill out contact forms or request consultations.
            </p>
            <h2 className="heading-subsection text-pqube-dark mt-10 mb-4">2. How We Use Your Information</h2>
            <p className="body-regular text-pqube-text">
              We use your information to respond to inquiries, provide services, improve our website, and send relevant communications. We do not sell your personal data to third parties.
            </p>
            <h2 className="heading-subsection text-pqube-dark mt-10 mb-4">3. Data Security</h2>
            <p className="body-regular text-pqube-text">
              We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse.
            </p>
            <h2 className="heading-subsection text-pqube-dark mt-10 mb-4">4. Contact</h2>
            <p className="body-regular text-pqube-text">
              To access, correct, or delete your personal data, <Link href="/contact" className="text-pqube-primary hover:underline">contact us</Link>.
            </p>
            <p className="body-regular text-pqube-text-light mt-12">
              Last updated: January 2026.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
