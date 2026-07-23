"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Phone, Calendar, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { services, clients, siteConfig } from "@/data/site-data";

const iconMap: Record<string, React.ElementType> = {
  Cloud: require("lucide-react").Cloud,
  Globe: require("lucide-react").Globe,
  Code: require("lucide-react").Code,
  Settings: require("lucide-react").Settings,
  Smartphone: require("lucide-react").Smartphone,
  ShoppingCart: require("lucide-react").ShoppingCart,
  BarChart3: require("lucide-react").BarChart3,
  Megaphone: require("lucide-react").Megaphone,
  Layers: require("lucide-react").Layers,
  RefreshCw: require("lucide-react").RefreshCw,
  Server: require("lucide-react").Server,
  Database: require("lucide-react").Database,
};

const navItems = [
  { label: "HOME", href: "/" },
  {
    label: "WHAT WE DO",
    children: services.map((s) => ({ label: s.title, href: s.href })),
    megaMenu: true,
  },
  {
    label: "OUR CLIENTS",
    children: clients.map((c) => ({
      label: c.name,
      href: `/clients/${c.name.toLowerCase().replace(/\s+/g, "-")}`,
    })),
  },
  { label: "BLOG", href: "/blog" },
  {
    label: "ABOUT US",
    children: [
      { label: "Our Portfolio", href: "/portfolio" },
      { label: "Our History", href: "/about" },
      { label: "Press Releases", href: "/about/press-releases" },
    ],
  },
  { label: "CONTACT", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const toggleDropdown = useCallback((label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  }, []);

  const isWhatWeDo = openDropdown === "WHAT WE DO";
  const isOurClients = openDropdown === "OUR CLIENTS";
  const isAboutUs = openDropdown === "ABOUT US";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          : "bg-transparent"
      )}
    >
      {/* Scroll progress gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-[60]">
        <div
          className="h-full transition-[width] duration-100 ease-out"
          style={{
            width: `${scrollProgress * 100}%`,
            background: "linear-gradient(90deg, #046bd2, #d4a030)",
          }}
        />
      </div>
      {/* Top utility bar */}
      <div
        className={cn(
          "hidden lg:flex items-center justify-between px-6 xl:px-16 transition-all duration-300",
          isScrolled ? "h-0 overflow-hidden opacity-0" : "h-10 opacity-100 border-b border-white/10"
        )}
      >
        <div className="flex items-center gap-4">
          <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors">
            <Phone className="w-3 h-3" />
            {siteConfig.phone}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="Facebook">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
          </a>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="LinkedIn">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href={siteConfig.social.glassdoor} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="Glassdoor">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.144 18.6c0-2.242-1.354-4.17-3.29-5.022C12.25 12.74 11.487 12 11.487 11c0-.828.714-1.5 1.595-1.5.882 0 1.596.672 1.596 1.5h3.06c0-2.485-2.09-4.5-4.66-4.5-2.573 0-4.66 2.015-4.66 4.5 0 2.162 1.345 4.057 3.184 4.93 1.742.825 2.395 1.57 2.395 2.57 0 .828-.714 1.5-1.596 1.5-.881 0-1.595-.672-1.595-1.5h-3.06c0 2.485 2.09 4.5 4.66 4.5 2.572 0 4.66-2.015 4.66-4.5z"/></svg>
          </a>
          <span className="w-px h-3 bg-white/20" />
          <a href="/sitemap.xml" className="text-[10px] text-white/60 hover:text-white transition-colors uppercase tracking-wider">Sitemap</a>
        </div>
      </div>

      {/* Main nav */}
      <div className={cn(
        "flex items-center justify-between px-6 xl:px-16 transition-all duration-300",
        isScrolled ? "h-16 md:h-20" : "h-16 md:h-20 lg:h-24"
      )}>
        {/* Logo */}
        <Link href="/" className="relative z-50 flex items-center shrink-0">
          <Image
            src="/images/pqube-logo.png"
            alt="PQube Business Solutions"
            width={180}
            height={50}
            className={cn(
              "h-8 md:h-10 w-auto transition-all duration-300",
              isScrolled ? "" : "drop-shadow-[0_0_12px_rgba(0,0,0,0.6)] drop-shadow-[0_0_4px_rgba(0,0,0,0.4)]"
            )}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => item.children && setOpenDropdown(null)}
            >
              {item.children ? (
                <button
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors",
                    isScrolled
                      ? "text-pqube-dark hover:text-pqube-primary hover:bg-pqube-muted"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                  aria-expanded={openDropdown === item.label}
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200",
                    openDropdown === item.label && "rotate-180"
                  )} />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-semibold rounded-lg transition-colors",
                    isScrolled
                      ? "text-pqube-dark hover:text-pqube-primary hover:bg-pqube-muted"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                </Link>
              )}

              {/* Mega Menu - What We Do */}
              {item.megaMenu && (
                <div
                  className={cn(
                    "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] bg-white rounded-2xl shadow-[var(--shadow-dropdown)] border border-pqube-border overflow-hidden transition-all duration-200",
                    isWhatWeDo
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-3 pointer-events-none"
                  )}
                >
                  <div className="p-6">
                    <div className="text-xs font-semibold uppercase tracking-[0.12em] text-pqube-text-light mb-4">
                      Our Services
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {services.map((service) => {
                        const Icon = iconMap[service.icon] || null;
                        return (
                          <Link
                            key={service.title}
                            href={service.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-pqube-muted transition-colors group"
                          >
                            {Icon && (
                              <div className="w-9 h-9 rounded-lg bg-pqube-primary-light flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-pqube-primary/20 transition-colors">
                                <Icon className="w-4 h-4 text-pqube-primary" />
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-semibold text-pqube-dark group-hover:text-pqube-primary transition-colors">
                                {service.title}
                              </div>
                              <div className="text-xs text-pqube-text-light mt-0.5 line-clamp-1">
                                {service.description.slice(0, 80)}...
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Regular dropdowns - Our Clients / About Us */}
              {item.children && !item.megaMenu && (
                <div
                  className={cn(
                    "absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-[var(--shadow-dropdown)] border border-pqube-border overflow-hidden transition-all duration-200",
                    (item.label === "OUR CLIENTS" && isOurClients) || (item.label === "ABOUT US" && isAboutUs)
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-3 pointer-events-none"
                  )}
                >
                  <div className="py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-pqube-text hover:text-pqube-primary hover:bg-pqube-muted transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* CTA */}
          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm bg-pqube-primary text-white hover:bg-pqube-primary-dark hover:shadow-md"
          >
            <Calendar className="w-4 h-4" />
            SCHEDULE FREE DEMO
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={cn(
            "relative z-50 lg:hidden p-2 rounded-lg transition-colors",
            isScrolled || isMobileOpen ? "text-pqube-dark" : "text-white"
          )}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-sm bg-white z-40 lg:hidden overflow-y-auto transition-transform duration-300 shadow-2xl",
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="pt-24 px-6 pb-8">
          <nav className="flex flex-col gap-1" role="navigation" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-pqube-dark hover:text-pqube-primary rounded-lg hover:bg-pqube-muted transition-colors"
                    >
                      {item.label}
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        openDropdown === item.label && "rotate-180"
                      )} />
                    </button>
                    <div className={cn(
                      "overflow-hidden transition-all duration-200",
                      openDropdown === item.label ? "max-h-[600px]" : "max-h-0"
                    )}>
                      <div className="pl-4 pb-2 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setIsMobileOpen(false)}
                            className="block px-4 py-2 text-sm text-pqube-text-light hover:text-pqube-primary rounded-lg hover:bg-pqube-muted transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-3 text-sm font-semibold text-pqube-dark hover:text-pqube-primary rounded-lg hover:bg-pqube-muted transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t border-pqube-border">
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold text-white bg-pqube-primary hover:bg-pqube-primary-dark rounded-xl transition-colors"
            >
              <Calendar className="w-4 h-4" />
              SCHEDULE FREE DEMO
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center justify-center gap-2 w-full mt-3 px-5 py-3 text-sm font-semibold text-pqube-primary border border-pqube-primary rounded-xl hover:bg-pqube-primary-light transition-colors"
            >
              <Phone className="w-4 h-4" />
              {siteConfig.phone}
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-pqube-text-light hover:text-pqube-primary transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
            </a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-pqube-text-light hover:text-pqube-primary transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href={siteConfig.social.glassdoor} target="_blank" rel="noopener noreferrer" className="text-pqube-text-light hover:text-pqube-primary transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.144 18.6c0-2.242-1.354-4.17-3.29-5.022C12.25 12.74 11.487 12 11.487 11c0-.828.714-1.5 1.595-1.5.882 0 1.596.672 1.596 1.5h3.06c0-2.485-2.09-4.5-4.66-4.5-2.573 0-4.66 2.015-4.66 4.5 0 2.162 1.345 4.057 3.184 4.93 1.742.825 2.395 1.57 2.395 2.57 0 .828-.714 1.5-1.596 1.5-.881 0-1.595-.672-1.595-1.5h-3.06c0 2.485 2.09 4.5 4.66 4.5 2.572 0 4.66-2.015 4.66-4.5z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
