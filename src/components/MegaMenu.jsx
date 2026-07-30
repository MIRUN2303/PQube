import { useState, useCallback } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { services } from '../data/services';

const categoryIcons = {
  'Build & Modernize': null,
  'Automate & Analyze': null,
  'Grow & Support': null,
};

export default function MegaMenu({ label }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={close}>
      <button
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--pqube-ink)] hover:text-[var(--pqube-blue)] rounded-md transition-colors relative after:absolute after:bottom-0.5 after:left-3 after:right-3 after:h-[2px] after:bg-[var(--pqube-blue)] after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:after:scale-x-100"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white shadow-xl border border-[var(--pqube-gray-200)] rounded-xl p-6 transition-all duration-200 ${
          open ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        <div className="grid grid-cols-3 gap-5">
          {[
            { name: 'Build & Modernize', color: 'var(--pqube-cyan)' },
            { name: 'Automate & Analyze', color: 'var(--pqube-blue)' },
            { name: 'Grow & Support', color: 'var(--pqube-navy)' },
          ].map((cat) => (
            <div key={cat.name}>
              <h3
                className="text-[11px] font-bold uppercase tracking-[0.1em] mb-3"
                style={{ color: cat.color }}
              >
                {cat.name}
              </h3>
              <ul className="space-y-1">
                {services
                  .filter((s) => s.category === cat.name)
                  .map((s) => {
                    const Icon = s.icon;
                    return (
                      <li key={s.id}>
                        <a href={s.link} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-[var(--pqube-gray-50)] group transition-colors" onClick={close}>
                          <Icon size={15} className="text-[var(--pqube-blue)] group-hover:text-[var(--pqube-navy)] transition-colors shrink-0" />
                          <span className="text-sm text-[var(--pqube-ink)] group-hover:text-[var(--pqube-blue)] transition-colors">{s.title}</span>
                          {s.tag && (
                            <span className="ml-auto text-[9px] uppercase tracking-wider bg-[var(--pqube-cyan)]/10 text-[var(--pqube-cyan)] px-1.5 py-0.5 rounded shrink-0">{s.tag}</span>
                          )}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>
        {/* Promo tile */}
        <a href="/services/digital-transformation" className="mt-4 flex items-center justify-between px-4 py-3 rounded-lg bg-gradient-to-r from-[var(--pqube-cyan)]/5 to-[var(--pqube-blue)]/5 border border-[var(--pqube-cyan)]/10 group" onClick={close}>
          <div>
            <span className="text-xs font-semibold text-[var(--pqube-navy)]">New: Digital Transformation Services</span>
            <span className="text-[11px] text-[var(--pqube-gray-500)] ml-2">Explore ePharmacy solutions →</span>
          </div>
          <ArrowRight size={16} className="text-[var(--pqube-cyan)] group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}
