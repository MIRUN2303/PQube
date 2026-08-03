import { useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { services } from '../data/services';
import NavCard from './NavCard';

/**
 * What We Do dropdown — styled like React Bits' CardNav:
 * dark nav cards in a row, each with a big label on top and
 * arrow-up-right links stacked at the bottom.
 */
const cardStyles = [
  { name: 'Build & Modernize', bg: '#16214f' },
  { name: 'Automate & Analyze', bg: '#1B2A6B' },
  { name: 'Grow & Support', bg: '#22348a' },
];

export default function MegaMenu({ label, active = false }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={close}>
      <button
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors relative after:absolute after:bottom-0.5 after:left-3 after:right-3 after:h-[2px] after:bg-[var(--pqube-blue)] after:scale-x-0 after:origin-left after:transition-transform after:duration-200 ${active ? 'text-[var(--pqube-blue)] after:scale-x-100' : 'text-[var(--pqube-ink)] hover:text-[var(--pqube-blue)]'}`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 w-[760px] bg-white shadow-xl border border-[var(--pqube-gray-200)] rounded-xl p-3 transition-all duration-200 ${
          open ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        <div className="grid grid-cols-3 gap-3">
          {cardStyles.map((cat) => (
            <NavCard
              key={cat.name}
              label={cat.name}
              bg={cat.bg}
              onLinkClick={close}
              links={services
                .filter((s) => s.category === cat.name)
                .map((s) => ({ label: s.title, to: s.link }))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
