import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { services } from "@/data/site-data";

const iconMap: Record<string, string> = {
  Cloud: "Cloud Solutions",
  Globe: "Custom Web Solutions",
  Code: "Custom Development",
  Settings: "Business Process Automation",
  Smartphone: "Mobile Development",
  ShoppingCart: "Ecommerce Solutions",
  BarChart3: "Data Analytics",
  Megaphone: "Digital Marketing",
  Layers: "Dynamics 365",
  RefreshCw: "Digital Transformation",
  Server: "IT Infrastructure",
  Database: "Data Center & Hosting",
};

export function generateStaticParams() {
  return services.map((s) => ({
    slug: s.href.replace("/services/", ""),
  }));
}

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const service = services.find((s) => s.href === `/services/${slug}`);
  if (!service) notFound();

  const relatedServices = services.filter((s) => s.href !== service.href).slice(0, 3);

  return (
    <>
      {/* Banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-pqube-dark via-[#0f1f3d] to-[#1a2a4a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="section-container section-padding relative z-10">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <span className="label text-pqube-primary">Our Services</span>
          <h1 className="heading-section text-white mt-4 mb-6">{service.title}</h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            {service.description}
          </p>
          <a
            href="https://outlook.office365.com/owa/calendar/PQubeBusinessSolutions@pqube.in/bookings/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 mt-8 bg-pqube-primary hover:bg-pqube-primary-dark text-white font-semibold text-sm rounded-xl transition-all"
          >
            Get a Free Consultation <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Related Services */}
      <section className="section-padding section-spacing bg-pqube-surface">
        <div className="section-container">
          <h2 className="heading-section mb-12">Related Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rs) => (
              <Link key={rs.title} href={rs.href} className="group bg-white rounded-xl border border-pqube-border p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <h3 className="text-base font-semibold text-pqube-dark mb-2 group-hover:text-pqube-primary transition-colors">{rs.title}</h3>
                <p className="text-sm text-pqube-text-light line-clamp-3">{rs.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-pqube-primary mt-4 group/link">
                  Read More <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
