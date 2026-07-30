import { processSteps } from '../data/services';

export default function ProcessSteps() {
  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)] mb-3">
            How We Work
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)]">
            Our Engagement Process
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto mt-4">
            A proven methodology built on two decades of delivery experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-[var(--color-border)] -z-0" aria-hidden="true" />

          {processSteps.map((step, idx) => (
            <div key={step.step} className="relative text-center lg:text-left">
              {/* Step number */}
              <div className="relative z-10 mx-auto lg:mx-0 w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-lg font-bold mb-5 shadow-md">
                {step.step}
              </div>

              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
