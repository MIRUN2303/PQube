import { useState } from 'react';
import { ArrowRight, Check, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import ShinyText from '../components/ShinyText';
import BlurReveal from '../components/BlurReveal';
import { insights } from '../data/insights';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80';

export default function Insights() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 6000);
  };

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

      {/* Subscribe */}
      <section className="section-padding bg-[var(--pqube-gray-50)]">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-[#1A1A1A] px-6 py-14 md:py-20 text-center shadow-[0_30px_80px_-30px_rgba(184,114,44,0.25)]">
            {/* decorative orbs */}
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#B8722C]/25 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#F0C75E]/15 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute top-10 right-10 border border-white/[0.06] rounded-3xl w-40 h-40 rotate-45 pointer-events-none" aria-hidden="true" />

            <div className="relative max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#D4A017] bg-[#D4A017]/10 border border-[#D4A017]/30 rounded-full px-4 py-1.5 mb-5">
                <Mail size={13} /> Newsletter
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Subscribe to Our Insights</h2>
              <span className="block w-16 h-1 rounded-full mx-auto mb-6 bg-gradient-to-r from-[#B8722C] via-[#D4A017] to-[#F0C75E]" aria-hidden="true" />
              <p className="text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
                One thoughtful email a month — ideas on technology, business strategy and digital transformation, practical enough to act on today.
              </p>

              {subscribed ? (
                <div className="flex flex-col items-center justify-center gap-3 py-4">
                  <div className="w-14 h-14 rounded-full bg-[#D4A017]/15 border border-[#D4A017]/30 flex items-center justify-center">
                    <Check size={24} className="text-[#D4A017]" />
                  </div>
                  <p className="text-white font-semibold">You&apos;re subscribed!</p>
                  <p className="text-sm text-white/50">Watch your inbox for the next edition.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" noValidate>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your work email"
                    aria-label="Email address"
                    className="flex-1 min-w-0 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent transition-all"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#B8722C] via-[#D4A017] to-[#F0C75E] text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-[#B8722C]/30"
                  >
                    Subscribe
                  </button>
                </form>
              )}

              <p className="mt-5 text-xs text-white/40">No spam, no fluff — unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}