import Link from "next/link";
import { ArrowLeft, Newspaper } from "lucide-react";

const releases = [
  { title: "PQube Announces Strategic Expansion into ERP Solutions", date: "February 2026", description: "PQube Business Solutions announces expanded service offerings in Microsoft Dynamics 365 ERP implementation and consulting across the Asia-Pacific region." },
  { title: "PQube Celebrates 20 Years of Digital Excellence", date: "January 2026", description: "PQube marks two decades of delivering enterprise IT solutions to Fortune 500 companies and growing businesses worldwide." },
  { title: "PQube Launches New Data Analytics Division", date: "November 2025", description: "New division focuses on AI-powered business intelligence and predictive analytics solutions for enterprise clients." },
];

export default function PressReleasesPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-pqube-dark via-[#0f1f3d] to-[#1a2a4a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="section-container section-padding relative z-10">
          <Link href="/about" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to About
          </Link>
          <span className="label text-pqube-primary">Media</span>
          <h1 className="heading-section text-white mt-4 mb-6">PRESS RELEASES</h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">News and announcements from PQube Business Solutions.</p>
        </div>
      </section>

      <section className="section-padding section-spacing bg-pqube-surface">
        <div className="section-container max-w-4xl">
          <div className="space-y-6">
            {releases.map((r) => (
              <div key={r.title} className="bg-white rounded-xl border border-pqube-border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-pqube-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <Newspaper className="w-5 h-5 text-pqube-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-pqube-text-light">{r.date}</span>
                    <h3 className="text-base font-semibold text-pqube-dark mt-1">{r.title}</h3>
                    <p className="text-sm text-pqube-text mt-2 leading-relaxed">{r.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
