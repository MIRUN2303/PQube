import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageHero from '../components/PageHero';
import ShinyText from '../components/ShinyText';
import BlurReveal from '../components/BlurReveal';
import SpecularButton from '../components/SpecularButton';
import { insights } from '../data/insights';

export default function InsightArticle() {
  const { slug } = useParams();
  const article = insights.find((a) => a.link.endsWith(slug)) || insights[0];
  const more = insights.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <main className="bg-[var(--pqube-gray-50)]">
      <PageHero
        overline={`${article.category} · ${article.readTime}`}
        title={article.title}
        image={article.image}
        subtitle={article.excerpt}
      >
        <p className="text-white/60 text-sm mt-4">{article.date}</p>
      </PageHero>

      <article className="section-padding bg-white">
        <div className="container-page max-w-3xl">
          <Link to="/insights" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--pqube-navy)] hover:text-[var(--pqube-blue)] transition-colors mb-8">
            <ArrowLeft size={14} /> All Insights
          </Link>

          <div className="space-y-10">
            {article.sections.map((section, i) => (
              <div key={i}>
                <div className="flex items-start gap-4 mb-3">
                  <span className="text-[10px] font-extrabold tabular-nums text-[#D4A017] pt-1.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-xl md:text-2xl font-extrabold text-[var(--pqube-navy)]">{section.heading}</h2>
                </div>
                <div className="space-y-4 pl-0 md:pl-8">
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="text-[15px] leading-7 text-[var(--pqube-gray-700)]">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-[var(--pqube-gray-200)]">
            <p className="text-sm text-[var(--pqube-gray-500)] mb-6">
              Want to put these ideas to work in your business? We&apos;re one message away.
            </p>
            <div className="flex flex-wrap gap-4">
              <SpecularButton href="/contact" size="md" radius={10} baseColor="#1B2A6B" lineColor="#29ABE2" textColor="#FFFFFF" intensity={1.2}>
                Talk to Our Team
              </SpecularButton>
              <SpecularButton href="/services" size="md" radius={10} baseColor="#FFFFFF" lineColor="#1B2A6B" textColor="#1B2A6B" tintOpacity={0.12} intensity={1.1}>
                Explore Services
              </SpecularButton>
            </div>
          </div>
        </div>
      </article>

      <section className="section-padding bg-[var(--pqube-gray-50)]">
        <div className="container-page">
          <div className="text-center mb-10">
            <ShinyText text="More Reading" color="#D4A017" shineColor="#F0C75E" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
            <BlurReveal text="Keep Exploring" className="text-2xl md:text-3xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {more.map((m) => (
              <Link
                key={m.id}
                to={m.link}
                className="group flex flex-col bg-white border border-[var(--pqube-gray-200)] rounded-2xl overflow-hidden hover:border-[#D4A017]/50 hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={m.image} alt="" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" loading="lazy" />
                  <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider text-white bg-[var(--pqube-navy)]/70 px-2.5 py-1 rounded">{m.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-bold text-[var(--pqube-navy)] leading-snug line-clamp-2">{m.title}</h3>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D4A017] mt-3">
                    Read article <ArrowLeft size={13} className="rotate-180 transition-transform duration-200 group-hover:translate-x-1" />
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