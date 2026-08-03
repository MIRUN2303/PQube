import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * NavCard — a single CardNav-style card:
 * dark background, big label on top, arrow-up-right links at the bottom.
 * Shared by the "What We Do" and "About Us" dropdowns.
 */
const NavCard = ({ label, bg, links, onLinkClick, minHeight = '210px' }) => (
  <div className="rounded-lg flex flex-col p-4 select-none" style={{ backgroundColor: bg, minHeight }}>
    <span className="text-[22px] tracking-tight text-white">{label}</span>

    <div className="mt-auto flex flex-col gap-0.5 pt-4">
      {links.map((l) => (
        <Link
          key={l.label}
          to={l.to}
          onClick={onLinkClick}
          className="flex items-center gap-1.5 py-1 text-sm text-white/80 hover:text-white transition-opacity duration-300"
        >
          <ArrowUpRight size={14} className="text-[var(--pqube-cyan)] shrink-0" />
          {l.label}
        </Link>
      ))}
    </div>
  </div>
);

export default NavCard;
