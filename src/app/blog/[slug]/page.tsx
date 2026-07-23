import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";

const allPosts: Record<string, { title: string; date: string; content: string }> = {
  "digital-marketing-spa": {
    title: "Why Digital Marketing Is Essential for Spa Businesses in Bangalore",
    date: "May 2026",
    content: "Digital marketing has become an essential tool for spa businesses in Bangalore to reach new clients, build brand awareness, and drive bookings. In today's competitive landscape, a strong online presence is no longer optional — it's a necessity.",
  },
  "dynamics-365-benefits": {
    title: "Microsoft Dynamics 365 ERP Implementation Benefits",
    date: "March 2026",
    content: "Microsoft Dynamics 365 ERP helps growing businesses streamline operations, improve decision-making, and achieve scalable growth. From financial management to supply chain optimization, Dynamics 365 provides a unified platform for enterprise success.",
  },
  "real-estate-landowners": {
    title: "There Is No Single System for Landowners Managing Real Estate Projects",
    date: "February 2026",
    content: "Landowners managing real estate projects face unique challenges when it comes to coordinating multiple stakeholders, tracking project milestones, and maintaining financial oversight. A fragmented technology landscape often compounds these difficulties.",
  },
  "ai-in-education": {
    title: "AI in Education: How Schools Use AI for Smarter Administration",
    date: "January 2026",
    content: "Artificial intelligence is transforming school administration, enabling educators to automate routine tasks, personalize learning experiences, and make data-driven decisions that improve student outcomes.",
  },
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const post = allPosts[slug];
  if (!post) notFound();

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-pqube-dark via-[#0f1f3d] to-[#1a2a4a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="section-container section-padding relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="flex items-center gap-2 text-sm text-white/50 mb-4">
            <CalendarDays className="w-4 h-4" />
            {post.date}
          </div>
          <h1 className="heading-section text-white mt-2 mb-6">{post.title}</h1>
        </div>
      </section>

      <article className="section-padding section-spacing bg-white">
        <div className="section-container max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="body-large text-pqube-text leading-relaxed">{post.content}</p>
            <p className="body-regular text-pqube-text-light mt-8">
              At PQube Business Solutions, we help businesses leverage technology to achieve their goals. 
              <Link href="/contact" className="text-pqube-primary hover:underline ml-1">Contact us</Link> to learn more.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
