import Link from "next/link";
import { CalendarDays } from "lucide-react";

const allPosts = [
  { title: "Why Digital Marketing Is Essential for Spa Businesses in Bangalore", date: "May 2026", slug: "digital-marketing-spa", gradient: "from-violet-500/10 to-fuchsia-500/5" },
  { title: "Microsoft Dynamics 365 ERP Implementation Benefits", date: "March 2026", slug: "dynamics-365-benefits", gradient: "from-pqube-primary/10 to-blue-500/5" },
  { title: "There Is No Single System for Landowners Managing Real Estate Projects", date: "February 2026", slug: "real-estate-landowners", gradient: "from-emerald-500/10 to-teal-500/5" },
  { title: "AI in Education: How Schools Use AI for Smarter Administration", date: "January 2026", slug: "ai-in-education", gradient: "from-amber-500/10 to-orange-500/5" },
];

export default function BlogPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-pqube-dark via-[#0f1f3d] to-[#1a2a4a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="section-container section-padding relative z-10">
          <span className="label text-pqube-primary">Insights</span>
          <h1 className="heading-section text-white mt-4 mb-6">BLOG</h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">Latest news, insights, and thought leadership from PQube.</p>
        </div>
      </section>

      <section className="section-padding section-spacing bg-pqube-surface">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-xl border border-pqube-border overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className={`h-48 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                  <div className="w-12 h-12 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center">
                    <CalendarDays className="w-6 h-6 text-pqube-primary" />
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-pqube-text-light">{post.date}</span>
                  <h3 className="text-sm font-semibold text-pqube-dark mt-2 line-clamp-3 group-hover:text-pqube-primary transition-colors leading-snug">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
