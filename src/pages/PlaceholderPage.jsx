import { useLocation } from 'react-router-dom';

export default function PlaceholderPage({ title }) {
  const location = useLocation();
  const pageTitle = title || location.pathname.replace('/', '').replace(/-/g, ' ') || 'Page';

  return (
    <main className="section-padding">
      <div className="container-page">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl bg-[var(--color-primary)]/5 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] capitalize mb-4">
            {pageTitle}
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-8">
            This page is under development. Please check back soon or{' '}
            <a href="/contact" className="text-[var(--color-primary)] hover:text-[var(--color-accent)] underline transition-colors">
              contact us
            </a>{' '}
            for more information.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded-full transition-all"
          >
            Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
