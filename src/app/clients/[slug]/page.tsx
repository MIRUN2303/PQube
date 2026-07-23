import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";
import { clients } from "@/data/site-data";

export function generateStaticParams() {
  return clients.map((c) => ({
    slug: c.name.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export default function ClientPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const client = clients.find((c) => c.name.toLowerCase().replace(/\s+/g, "-") === slug);
  if (!client) notFound();

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-pqube-dark via-[#0f1f3d] to-[#1a2a4a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="section-container section-padding relative z-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <span className="label text-pqube-primary">Our Client</span>
          <h1 className="heading-section text-white mt-4 mb-4 flex items-center gap-4">
            <Building2 className="w-10 h-10 text-pqube-primary" />
            {client.name}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            PQube is proud to partner with {client.name}, delivering enterprise-grade technology solutions.
          </p>
        </div>
      </section>

      <section className="section-padding section-spacing bg-white">
        <div className="section-container">
          <div className="max-w-3xl">
            <h2 className="heading-section text-pqube-dark mb-6">Our Partnership</h2>
            <p className="body-large text-pqube-text">
              PQube has had the privilege of working with {client.name} as part of our commitment to delivering 
              quality-focused business IT solutions. Our partnership reflects our dedication to understanding 
              each client&apos;s unique business needs and providing tailored technology solutions that drive 
              measurable results.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
