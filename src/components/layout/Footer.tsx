"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { services, siteConfig } from "@/data/site-data";

export default function Footer() {
  return (
    <footer className="bg-pqube-dark-bg border-t border-pqube-dark-border">
      {/* Main footer */}
      <div className="section-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Column 1: What We Do */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              What We Do
            </h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.title}>
                  <Link
                    href={service.href}
                    className="text-sm text-pqube-dark-text hover:text-pqube-accent transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-sm text-pqube-dark-text hover:text-pqube-accent transition-colors">Home</Link></li>
              <li><Link href="/services" className="text-sm text-pqube-dark-text hover:text-pqube-accent transition-colors">Services</Link></li>
              <li><Link href="/blog" className="text-sm text-pqube-dark-text hover:text-pqube-accent transition-colors">Blog</Link></li>
              <li><Link href="/about" className="text-sm text-pqube-dark-text hover:text-pqube-accent transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-pqube-dark-text hover:text-pqube-accent transition-colors">Contact</Link></li>
              <li><Link href="/portfolio" className="text-sm text-pqube-dark-text hover:text-pqube-accent transition-colors">Portfolio</Link></li>
            </ul>
          </div>

          {/* Column 3: Get In Touch */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Get In Touch
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-pqube-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-pqube-dark-text">Bengaluru, INDIA</p>
                  <p className="text-sm text-pqube-dark-text">Delaware, USA</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-pqube-accent shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="text-sm text-pqube-dark-text hover:text-pqube-accent transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-pqube-accent shrink-0" />
                <span className="text-sm text-pqube-dark-text">info[at]pqube[dot]in</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-pqube-dark-border flex flex-wrap gap-3">
              <Link href="/terms" className="text-xs text-pqube-dark-text hover:text-pqube-accent transition-colors">Terms</Link>
              <span className="text-xs text-pqube-dark-border">|</span>
              <Link href="/privacypolicy" className="text-xs text-pqube-dark-text hover:text-pqube-accent transition-colors">Privacy</Link>
            </div>
          </div>

          {/* Column 4: Social + Certifications */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Connect With Us
            </h4>
            <div className="flex items-center gap-3 mb-8">
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/[0.06] border border-pqube-dark-border flex items-center justify-center text-pqube-dark-text hover:text-pqube-accent hover:border-pqube-accent/30 transition-all" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/[0.06] border border-pqube-dark-border flex items-center justify-center text-pqube-dark-text hover:text-pqube-accent hover:border-pqube-accent/30 transition-all" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href={siteConfig.social.glassdoor} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/[0.06] border border-pqube-dark-border flex items-center justify-center text-pqube-dark-text hover:text-pqube-accent hover:border-pqube-accent/30 transition-all" aria-label="Glassdoor">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.144 18.6c0-2.242-1.354-4.17-3.29-5.022C12.25 12.74 11.487 12 11.487 11c0-.828.714-1.5 1.595-1.5.882 0 1.596.672 1.596 1.5h3.06c0-2.485-2.09-4.5-4.66-4.5-2.573 0-4.66 2.015-4.66 4.5 0 2.162 1.345 4.057 3.184 4.93 1.742.825 2.395 1.57 2.395 2.57 0 .828-.714 1.5-1.596 1.5-.881 0-1.595-.672-1.595-1.5h-3.06c0 2.485 2.09 4.5 4.66 4.5 2.572 0 4.66-2.015 4.66-4.5z"/></svg>
              </a>
            </div>

            {/* Certification badges */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider bg-white/[0.04] border border-pqube-dark-border rounded-lg text-pqube-dark-text">
                  Microsoft Partner
                </span>
                <span className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider bg-white/[0.04] border border-pqube-dark-border rounded-lg text-pqube-dark-text">
                  ISO Certified
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider bg-white/[0.04] border border-pqube-dark-border rounded-lg text-pqube-dark-text">
                  D&B Rated
                </span>
                <span className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider bg-white/[0.04] border border-pqube-dark-border rounded-lg text-pqube-dark-text">
                  PeoplesHost
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-pqube-dark-border">
        <div className="section-container py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-pqube-dark-text">
            Copyright &copy; 2019 - 2026 | PQube Business Solutions
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-xs text-pqube-dark-text hover:text-pqube-accent transition-colors">Terms</Link>
            <span className="text-xs text-pqube-dark-border">|</span>
            <Link href="/privacypolicy" className="text-xs text-pqube-dark-text hover:text-pqube-accent transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
