import { ArrowRight } from 'lucide-react';
import { insights } from '../data/insights';
import ShinyText from './ShinyText';

function InsightCard({ article }) {
  return (
    <a href={article.link} className="group block [perspective:900px] h-72 md:h-80">
      <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]">
        {/* Front: image */}
        <div className="absolute inset-0 rounded-xl overflow-hidden [backface-visibility:hidden]">
          <img
            src={article.image}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-wider text-white/90 bg-black/40 px-2 py-1 rounded">
            {article.category}
          </span>
        </div>

        {/* Back: text */}
        <div className="absolute inset-0 rounded-xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[var(--pqube-navy)] p-6 flex flex-col justify-center">
          <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[var(--pqube-cyan)] mb-3">
            {article.category}
          </span>
          <h3 className="text-sm md:text-base font-bold text-white leading-snug mb-4 line-clamp-5">
            {article.title}
          </h3>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--pqube-cyan)] mt-auto">
            Read more <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </a>
  );
}

export default function InsightsGrid() {
  const visible = insights.slice(0, 6);

  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="text-center mb-12">
          <ShinyText text="Insights" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)] mb-4">Latest News & Insights</h2>
          <p className="text-[var(--pqube-gray-500)] max-w-xl mx-auto">
            Thoughts on technology, business strategy, and digital transformation from the PQube team.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((article) => (
            <InsightCard key={article.id} article={article} />
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="/insights" className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-[var(--pqube-navy)] hover:bg-[var(--pqube-blue)] rounded-lg transition-all duration-200">
            View All Insights
          </a>
        </div>
      </div>
    </section>
  );
}
