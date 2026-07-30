import { useEffect, useRef, useState } from 'react';
import { X, ChevronDown, Phone } from 'lucide-react';
import { services } from '../data/services';

export default function MobileDrawer({ isOpen, onClose }) {
  const drawerRef = useRef(null);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      drawerRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const categories = ['Build & Modernize', 'Automate & Analyze', 'Grow & Support'];

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={onClose} aria-hidden="true" />}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl lg:hidden transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-[var(--pqube-gray-200)] shrink-0">
          <img src="/logo/1.png" alt="PQube" className="h-7 w-auto" />
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--pqube-gray-50)] transition-colors" aria-label="Close navigation menu">
            <X size={20} className="text-[var(--pqube-ink)]" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-5 py-4" aria-label="Mobile navigation">
          <NavLink href="/" onClick={onClose}>Home</NavLink>

          {/* Services accordion */}
          <div className="border-b border-[var(--pqube-gray-200)]">
            <button
              className="flex items-center justify-between w-full py-3 text-sm font-medium text-[var(--pqube-ink)] hover:text-[var(--pqube-blue)] transition-colors"
              onClick={() => setExpanded((p) => ({ ...p, services: !p.services }))}
              aria-expanded={expanded.services}
            >
              What We Do
              <ChevronDown size={16} className={`transition-transform duration-200 ${expanded.services ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${expanded.services ? 'max-h-[600px] pb-3' : 'max-h-0'}`}>
              {categories.map((cat) => (
                <div key={cat}>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--pqube-blue)] px-3 py-2 mt-1">{cat}</h4>
                  {services.filter((s) => s.category === cat).map((s) => {
                    const Icon = s.icon;
                    return (
                      <a key={s.id} href={s.link} className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-[var(--pqube-gray-50)] transition-colors" onClick={onClose}>
                        <Icon size={15} className="text-[var(--pqube-blue)] shrink-0" />
                        <span>{s.title}</span>
                        {s.tag && <span className="text-[9px] uppercase bg-[var(--pqube-cyan)]/10 text-[var(--pqube-cyan)] px-1.5 py-0.5 rounded">{s.tag}</span>}
                      </a>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <NavLink href="/clients" onClick={onClose}>Our Clients</NavLink>
          <NavLink href="/insights" onClick={onClose}>Insights</NavLink>

          {/* About accordion */}
          <div className="border-b border-[var(--pqube-gray-200)]">
            <button
              className="flex items-center justify-between w-full py-3 text-sm font-medium text-[var(--pqube-ink)] hover:text-[var(--pqube-blue)] transition-colors"
              onClick={() => setExpanded((p) => ({ ...p, about: !p.about }))}
              aria-expanded={expanded.about}
            >
              About Us
              <ChevronDown size={16} className={`transition-transform duration-200 ${expanded.about ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${expanded.about ? 'max-h-[200px] pb-3' : 'max-h-0'}`}>
              <SubLink href="/about" onClick={onClose}>Our Story</SubLink>
              <SubLink href="/portfolio" onClick={onClose}>Portfolio</SubLink>
              <SubLink href="/press-releases" onClick={onClose}>Press Releases</SubLink>
            </div>
          </div>

          <NavLink href="/contact" onClick={onClose}>Contact</NavLink>
        </nav>

        {/* Bottom CTA */}
        <div className="px-5 py-4 border-t border-[var(--pqube-gray-200)] shrink-0 space-y-2">
          <a href="/contact" onClick={onClose} className="flex items-center justify-center w-full px-5 py-3 text-sm font-semibold text-white bg-[var(--pqube-navy)] hover:bg-[var(--pqube-blue)] rounded-lg transition-all">
            Schedule Free Demo
          </a>
          <a href="tel:+919731249009" onClick={onClose} className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-medium text-[var(--pqube-navy)] border border-[var(--pqube-gray-200)] rounded-lg hover:bg-[var(--pqube-gray-50)] transition-colors">
            <Phone size={14} /> +91 97312 49009
          </a>
        </div>
      </div>
    </>
  );
}

function NavLink({ href, onClick, children }) {
  return (
    <a href={href} onClick={onClick} className="block py-3 text-sm font-medium text-[var(--pqube-ink)] hover:text-[var(--pqube-blue)] border-b border-[var(--pqube-gray-200)] transition-colors">
      {children}
    </a>
  );
}

function SubLink({ href, onClick, children }) {
  return (
    <a href={href} onClick={onClick} className="block px-3 py-2 text-sm rounded-lg hover:bg-[var(--pqube-gray-50)] text-[var(--pqube-ink)] hover:text-[var(--pqube-blue)] transition-colors">
      {children}
    </a>
  );
}
