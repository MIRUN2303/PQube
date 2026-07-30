export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-[var(--color-bg)] to-[var(--color-bg-alt)]">
      {/* Background abstract shape */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[var(--color-success)]/5 to-[var(--color-primary)]/5 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="container-page relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 py-16 md:py-24 lg:py-32">
          {/* Left: Content */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)] mb-5">
              Business IT Solutions · Bangalore, India
            </span>

            <h1 className="text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.1] tracking-tight text-[var(--color-primary)] mb-6">
              Business IT Solutions That{' '}
              <span className="text-[var(--color-accent)]">Build People</span>
              {' '}— and Businesses.
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              Quality-first IT and software solutions helping businesses across
              sectors scale with confidence. From cloud infrastructure to
              custom platforms — we deliver outcomes, not just code.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Schedule Free Demo
              </a>
              <a
                href="#what-we-do"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-[var(--color-primary)] border-2 border-[var(--color-primary)] rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200"
              >
                See What We Do
              </a>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="flex-1 max-w-lg lg:max-w-none">
            <div className="relative">
              {/* Animated gradient shape */}
              <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-accent)] opacity-90 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center text-white">
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Trusted by 9+ enterprises
                    </div>
                    <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                      {['Cloud', 'Web', 'Mobile', 'AI'].map((tag) => (
                        <div key={tag} className="px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-sm font-medium">
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
