import ShinyText from './ShinyText';

export default function TestimonialsPlaceholder() {
  return (
    <section className="section-padding bg-[var(--pqube-gray-50)]">
      <div className="container-page">
        <div className="text-center mb-12">
          <ShinyText text="Testimonials" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]">What Our Clients Say</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white border-2 border-dashed border-[var(--pqube-gray-200)] rounded-xl p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--pqube-gray-50)] flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-[var(--pqube-gray-500)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--pqube-navy)] mb-2">Client Testimonials Coming Soon</h3>
            <p className="text-sm text-[var(--pqube-gray-500)] leading-relaxed max-w-md mx-auto">
              We are collecting feedback from our clients to share their experiences working with PQube. This section will feature real quotes with name, title, company, and optional headshots.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[var(--pqube-cyan)]/5 text-[var(--pqube-cyan)] text-xs font-semibold uppercase tracking-wider rounded-full">
              Placeholder — awaiting client quotes
            </div>
          </div>

          <details className="max-w-2xl mx-auto mt-8 group">
            <summary className="text-xs text-[var(--pqube-gray-500)] cursor-pointer hover:text-[var(--pqube-gray-500)] transition-colors">
              Expected data structure (developer reference)
            </summary>
            <pre className="mt-2 p-4 bg-white border border-[var(--pqube-gray-200)] rounded-lg text-xs text-[var(--pqube-gray-500)] overflow-x-auto">
{`{
  quote: "string",
  name: "string",
  title: "string",
  company: "string",
  headshot?: "image URL"
}`}
            </pre>
          </details>
        </div>
      </div>
    </section>
  );
}
