import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import ShinyText from '../components/ShinyText';
import BlurReveal from '../components/BlurReveal';
import { insights } from '../data/insights';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80';

export default function Insights() {
  return (
    <main className="bg-[var(--pqube-gray-50)]">
      <PageHero
        overline="Insights"
        title="Ideas & Insight"
        subtitle="Thoughts on technology, business strategy and digital transformation from the PQube team — practical enough to act on today."
        image={HERO_IMAGE}
      />

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <ShinyText text="Latest Articles" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="All Insights" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((article) => (
              <Link
                key={article.id}
                to={article.link}
                className="group flex flex-col bg-[var(--pqube-gray-50)] border border-[var(--pqube-gray-200)] rounded-2xl overflow-hidden hover:border-[var(--pqube-blue)]/40 hover:shadow-lg hover:shadow-[var(--pqube-blue)]/10 transition-all"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={article.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider text-white/90 bg-[var(--pqube-navy)]/70 px-2.5 py-1 rounded">
                    {article.category}
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center gap-3 text-[11px] text-[var(--pqube-gray-500)] mb-2.5">
                    <span className="font-medium">{article.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--pqube-navy)] leading-snug mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-[var(--pqube-gray-500)] leading-relaxed flex-1 line-clamp-3">{article.excerpt}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--pqube-blue)] mt-4">
                    Read article
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}