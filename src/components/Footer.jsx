import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { services } from '../data/services';

const CERT_ITEMS = [
  { src: '/images/footer/tawk-partner.png', alt: 'tawk.to Official Partner', label: 'tawk.to Partner', bg: 'bg-white' },
  { src: '/images/footer/peopleshost.png', alt: 'PeoplesHost Certified Partner', label: 'PeoplesHost Partner', bg: 'bg-[#0D1B2A]' },
  { src: '/images/footer/microsoft-partner.png', alt: 'Microsoft Partner', label: 'Microsoft Partner', bg: 'bg-black' },
  { src: '/images/footer/iso-2015.png', alt: 'ISO 2015 certified', label: 'ISO 2015', bg: 'bg-white' },
  { src: '/images/footer/iso-9001-cert.jpg', alt: 'ISO 9001:2015 certificate', label: 'ISO 9001:2015 Certificate', bg: 'bg-[#0D1B2A]' },
];

export default function Footer() {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % CERT_ITEMS.length);
      if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + CERT_ITEMS.length) % CERT_ITEMS.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  return (
    <footer className="bg-[var(--pqube-navy)] text-white" role="contentinfo">

      {/* ── Notch bar ──────────────────────────────────────────────────────────
          Wrapped in container-page so the logo left-edge aligns perfectly
          with the first column of the footer grid below.
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="container-page">
        <div
          className="bg-white rounded-b-[28px] inline-flex items-center px-6 md:px-8 py-2.5"
          aria-label="PQube logo"
        >
          <img src="/logo/3.png" alt="PQube" className="h-20 md:h-[84px] w-auto" />
        </div>
      </div>

      {/* ── Main grid ─────────────────────────────────────────────────────── */}
      <div className="container-page pt-4 pb-10 md:pt-6 md:pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Build People to Build Business<sup>&reg;</sup>
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { href: 'https://www.facebook.com/pqube.in', label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { href: 'https://www.linkedin.com/company/pqube', label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                { href: '#', label: 'Glassdoor', isText: true },
              ].map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--pqube-cyan)] hover:ring-2 hover:ring-[var(--pqube-cyan)]/40 transition-all"
                  aria-label={social.label}>
                  {social.isText ? (
                    <span className="text-[9px] font-bold">GD</span>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d={social.path} /></svg>
                  )}
                </a>
              ))}
            </div>

            {/* Review us on Clutch */}
            <a
              href="https://clutch.co/profile/pqube-business-solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2.5 bg-white rounded-xl px-4 py-2.5 hover:bg-[var(--pqube-gray-50)] shadow-md hover:shadow-lg transition-all"
            >
              <img src="/images/footer/clutch-icon.png" alt="Clutch" className="w-6 h-6 object-contain" />
              <span className="text-xs font-bold text-[var(--pqube-navy)]">Review us on Clutch</span>
            </a>
          </div>

          {/* Column 2: What We Do */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-white/70">What We Do</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <a href={s.link} className="text-sm text-white/50 hover:text-white transition-colors inline-flex items-center gap-1 group">
                    {s.title}
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">&#8250;</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-white/70">Company</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Our History', href: '/about' },
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'Press Releases', href: '/press-releases' },
                { label: 'Our Clients', href: '/clients' },
                { label: 'Insights', href: '/insights' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get In Touch */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-white/70">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-white/30 shrink-0" />
                <a href="https://maps.app.goo.gl/LZXzMktEGX8Wr7S56" target="_blank" rel="noopener noreferrer" className="group">
                  <p className="text-sm font-medium text-white/70 group-hover:text-[var(--pqube-cyan)] transition-colors">Bengaluru, India (HQ)</p>
                  <p className="text-xs text-white/40 mt-0.5">Karnataka, India</p>
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-white/30 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white/70">Delaware, USA</p>
                  <p className="text-xs text-white/40 mt-0.5">United States</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-white/30 shrink-0" />
                <a href="tel:+919731249009" className="text-sm text-white/50 hover:text-white transition-colors">+91 97312 49009</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-white/30 shrink-0" />
                <a href="mailto:info@pqube.in" className="text-sm text-white/50 hover:text-white transition-colors">info@pqube.in</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Certifications & partnerships strip ───────────────────────────────
          Uniform white tiles keep wildly different badge ratios (square,
          landscape, portrait) reading as one consistent row.
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="container-page py-8 md:py-12">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-white/40">
            Certifications &amp; Partnerships
          </p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 max-w-4xl mx-auto">
            {CERT_ITEMS.map((cert, i) => (
              <button
                key={cert.src}
                onClick={() => setLightbox(i)}
                className={`h-16 md:h-20 rounded-xl flex items-center justify-center p-2 hover:opacity-90 hover:ring-2 hover:ring-[var(--pqube-cyan)]/50 transition-all ${cert.bg}`}
                title={cert.label}
              >
                <img src={cert.src} alt={cert.alt} className="max-h-full max-w-full object-contain" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between py-5 gap-3">
          <p className="text-xs text-white/30">&copy; 2019&ndash;2026 PQube Business Solutions. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <a href="/terms" className="hover:text-white/70 transition-colors">Terms</a>
            <span>|</span>
            <a href="/privacy" className="hover:text-white/70 transition-colors">Privacy</a>
            <span>|</span>
            <button onClick={() => window.dispatchEvent(new CustomEvent('pqube-show-cookie-banner'))} className="hover:text-white/70 transition-colors">
              Cookie Settings
            </button>
          </div>
        </div>
      </div>

      {/* ── Certificate lightbox ─────────────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[var(--pqube-navy)]/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={CERT_ITEMS[lightbox].label}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-5 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[var(--pqube-gray-100)] hover:bg-[var(--pqube-gray-200)] flex items-center justify-center text-[var(--pqube-navy)] transition-colors"
              aria-label="Close certificate viewer"
            >
              <X size={16} />
            </button>

            <div className="flex items-baseline justify-between mb-5 pr-12">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--pqube-gray-500)]">
                Certificate {lightbox + 1} of {CERT_ITEMS.length}
              </p>
              <h3 className="text-sm font-bold text-[var(--pqube-navy)]">{CERT_ITEMS[lightbox].label}</h3>
            </div>

            <div className="flex flex-col md:flex-row gap-5 md:gap-6">
              {/* main image */}
              <div className={`relative flex-1 rounded-2xl flex items-center justify-center min-h-[320px] p-6 ${CERT_ITEMS[lightbox].bg}`}>
                <img
                  src={CERT_ITEMS[lightbox].src}
                  alt={CERT_ITEMS[lightbox].alt}
                  className="max-h-[60vh] w-auto max-w-full object-contain"
                />
                <button
                  onClick={() => setLightbox((lightbox - 1 + CERT_ITEMS.length) % CERT_ITEMS.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-[var(--pqube-gray-200)] shadow-md flex items-center justify-center text-[var(--pqube-navy)] hover:border-[var(--pqube-cyan)] transition-colors"
                  aria-label="Previous certificate"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setLightbox((lightbox + 1) % CERT_ITEMS.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-[var(--pqube-gray-200)] shadow-md flex items-center justify-center text-[var(--pqube-navy)] hover:border-[var(--pqube-cyan)] transition-colors"
                  aria-label="Next certificate"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* side thumbnails — switch certificates */}
              <div className="flex md:flex-col gap-2.5 justify-center md:justify-start md:w-24 shrink-0">
                {CERT_ITEMS.map((cert, i) => (
                  <button
                    key={cert.src}
                    onClick={() => setLightbox(i)}
                    className={`w-16 md:w-full h-14 md:h-16 rounded-xl border flex items-center justify-center p-1.5 transition-all ${
                      i === lightbox
                        ? 'border-[var(--pqube-cyan)] ring-2 ring-[var(--pqube-cyan)]/30 bg-white'
                        : 'border-[var(--pqube-gray-200)] bg-white hover:border-[var(--pqube-cyan)]/50'
                    } ${i === 2 ? '!bg-black' : ''}`}
                    aria-label={`View ${cert.label}`}
                  >
                    <img src={cert.src} alt="" className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
