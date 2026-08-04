import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import MegaMenu from './MegaMenu';
import NavCard from './NavCard';
import MobileDrawer from './MobileDrawer';
import SpecularButton from './SpecularButton';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navItems = [
    { label: 'Home', to: '/', match: (p) => p === '/' },
    { label: 'What We Do', to: '#', mega: true, match: (p) => p.startsWith('/services') },
    { label: 'Our Clients', to: '/clients', match: (p) => p.startsWith('/clients') },
    { label: 'Insights', to: '/insights', match: (p) => p.startsWith('/insights') },
    {
      label: 'About Us', to: '/about', match: (p) => p.startsWith('/about') || p.startsWith('/portfolio') || p.startsWith('/press-releases'),
      dropdown: [
        { label: 'Our Story', to: '/about' },
        { label: 'Portfolio', to: '/portfolio' },
        { label: 'Press Releases', to: '/press-releases' },
      ],
    },
    { label: 'Contact', to: '/contact', match: (p) => p.startsWith('/contact') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Utility Bar */}
      <div className="hidden md:block bg-[var(--pqube-navy)] text-white/90 text-sm">
        <div className="container-page flex items-center justify-between h-[38px]">
          <a href="tel:+919731249009" className="flex items-center gap-1.5 hover:text-[var(--pqube-cyan)] transition-colors text-xs" aria-label="Call +91 97312 49009">
            <Phone size={13} />
            +91 97312 49009
          </a>
          <div className="flex items-center gap-3 text-[11px] text-white/60">
            <span>Bengaluru, India · Delaware, USA</span>
            <span className="w-px h-3 bg-white/20" />
            <a href="https://www.facebook.com/pqube.in" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--pqube-cyan)] transition-colors" aria-label="Facebook">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/pqube" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--pqube-cyan)] transition-colors" aria-label="LinkedIn">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 bg-white transition-all duration-200 ${
          scrolled ? 'shadow-sm border-b border-[var(--pqube-gray-200)]' : ''
        }`}
        style={{ top: scrolled ? '0' : '0' }}
      >
        <div className={`container-page flex items-center justify-between transition-all duration-200 ${scrolled ? 'h-14' : 'h-[72px]'}`}>
          {/* Logo */}
          <a href="/" className="flex items-center shrink-0">
            <img src="/logo/3.png" alt="PQube" className="h-16 w-auto" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {navItems.map((item) => (
              item.mega ? (
                <MegaMenu key={item.label} label={item.label} active={item.match(pathname)} />
              ) : item.dropdown ? (
                <div key={item.label} className="relative group">
                  <Link to={item.to} className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors relative after:absolute after:bottom-0.5 after:left-3 after:right-3 after:h-[2px] after:bg-[var(--pqube-blue)] after:scale-x-0 after:origin-left after:transition-transform after:duration-200 ${item.match(pathname) ? 'text-[var(--pqube-blue)] after:scale-x-100' : 'text-[var(--pqube-ink)] hover:text-[var(--pqube-blue)]'}`}>
                    {item.label}
                    <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
                  </Link>
                  <div className="absolute top-full left-0 mt-0 w-72 bg-white shadow-xl border border-[var(--pqube-gray-200)] rounded-xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <NavCard label="About PQube" bg="#1B2A6B" minHeight="190px" links={item.dropdown.map((sub) => ({ label: sub.label, to: sub.to }))} />
                  </div>
                </div>
              ) : (
                <Link key={item.label} to={item.to} className={`px-3 py-2 text-sm font-medium rounded-md transition-colors relative after:absolute after:bottom-0.5 after:left-3 after:right-3 after:h-[2px] after:bg-[var(--pqube-blue)] after:scale-x-0 after:origin-left after:transition-transform after:duration-200 ${item.match(pathname) ? 'text-[var(--pqube-blue)] after:scale-x-100' : 'text-[var(--pqube-ink)] hover:text-[var(--pqube-blue)]'}`}>
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Desktop CTA — specular highlight, the site's key conversion button */}
          <div className="hidden lg:flex items-center gap-3">
            <SpecularButton
              size="md"
              radius={10}
              tint="#1B2A6B"
              tintOpacity={1}
              baseColor="#1B2A6B"
              lineColor="#29ABE2"
              textColor="#FFFFFF"
              intensity={1.3}
              onClick={() => window.open('https://bookings.cloud.microsoft/book/PQubeBusinessSolutions@pqube.in/?ismsaljsauthenabled=true', '_blank', 'noopener,noreferrer')}
            >
              Schedule Free Demo
            </SpecularButton>
          </div>

          {/* Mobile Hamburger */}
          <button className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-[var(--pqube-gray-50)] transition-colors" onClick={() => setDrawerOpen(true)} aria-label="Open navigation menu" aria-expanded={drawerOpen}>
            <Menu size={22} className="text-[var(--pqube-navy)]" />
          </button>
        </div>
      </header>

      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
