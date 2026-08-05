import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import ShinyText from '../components/ShinyText';
import BlurReveal from '../components/BlurReveal';
import SpecularButton from '../components/SpecularButton';
import { contactInfo } from '../data/portfolio';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80';

export default function Contact() {
  return (
    <main className="bg-[var(--pqube-gray-50)]">
      <PageHero
        overline="Contact"
        title="Let's Build Something"
        subtitle="Every partnership starts with a conversation — tell us what you're solving for and we'll map the path."
        image={HERO_IMAGE}
      />

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form className="space-y-5" action="#" method="POST">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--pqube-navy)] mb-1">Full Name</label>
                    <input type="text" id="name" name="name" required className="w-full px-4 py-3 border border-[var(--pqube-gray-300)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--pqube-cyan)] focus:border-transparent transition-all" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--pqube-navy)] mb-1">Work Email</label>
                    <input type="email" id="email" name="email" required className="w-full px-4 py-3 border border-[var(--pqube-gray-300)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--pqube-cyan)] focus:border-transparent transition-all" placeholder="you@company.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-[var(--pqube-navy)] mb-1">Company</label>
                    <input type="text" id="company" name="company" className="w-full px-4 py-3 border border-[var(--pqube-gray-300)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--pqube-cyan)] focus:border-transparent transition-all" placeholder="Company name" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[var(--pqube-navy)] mb-1">Phone</label>
                    <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 border border-[var(--pqube-gray-300)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--pqube-cyan)] focus:border-transparent transition-all" placeholder="+91 97312 49009" />
                  </div>
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-[var(--pqube-navy)] mb-1">Service of Interest</label>
                  <select id="service" name="service" className="w-full px-4 py-3 border border-[var(--pqube-gray-300)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--pqube-cyan)] focus:border-transparent transition-all bg-white">
                    <option value="">Select a service…</option>
                    <option value="cloud-solutions">Cloud Solutions</option>
                    <option value="custom-web-solutions">Custom Web Solutions</option>
                    <option value="custom-development">Custom Development</option>
                    <option value="it-infrastructure">IT Infrastructure Services</option>
                    <option value="business-process-automation">Business Process Automation</option>
                    <option value="data-analytics">Data Analytics</option>
                    <option value="dynamics-365">Dynamics 365 Solutions</option>
                    <option value="digital-transformation">Digital Transformation</option>
                    <option value="mobile-development">Mobile Development</option>
                    <option value="ecommerce-solutions">Ecommerce Business Solutions</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="data-center-hosting">Data Center & Hosting</option>
                    <option value="other">Other / Not Sure</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--pqube-navy)] mb-1">Message</label>
                  <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 border border-[var(--pqube-gray-300)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--pqube-cyan)] focus:border-transparent transition-all resize-none" placeholder="Describe your challenge, timeline, budget range — anything that helps us prepare."></textarea>
                </div>
                <SpecularButton type="submit" size="lg" radius={10} baseColor="#1B2A6B" lineColor="#29ABE2" textColor="#FFFFFF" intensity={1.3} className="w-full md:w-auto">
                  <span className="flex items-center gap-2">Submit Enquiry <ArrowRight size={18} /></span>
                </SpecularButton>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-[var(--pqube-navy)] text-white rounded-2xl p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-extrabold mb-4">Direct Contact</h3>
                <div className="space-y-4">
                  <a href={contactInfo.phoneHref} className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                    <Phone size={20} className="text-[var(--pqube-cyan)]" />
                    <div>
                      <p className="text-xs text-[var(--pqube-cyan)] uppercase tracking-wider">Call Us</p>
                      <p className="font-medium">{contactInfo.phone}</p>
                    </div>
                  </a>
                  <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                    <Mail size={20} className="text-[var(--pqube-cyan)]" />
                    <div>
                      <p className="text-xs text-[var(--pqube-cyan)] uppercase tracking-wider">Email Us</p>
                      <p className="font-medium">{contactInfo.email}</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3 text-white/80">
                    <MapPin size={20} className="text-[var(--pqube-cyan)] mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-[var(--pqube-cyan)] uppercase tracking-wider">Visit Us</p>
                      <p className="font-medium leading-snug">{contactInfo.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--pqube-gray-50)] border border-[var(--pqube-gray-200)] rounded-2xl p-6">
                <h3 className="text-lg font-extrabold text-[var(--pqube-navy)] mb-3">Quick Actions</h3>
                <div className="space-y-3">
                  <Link to="/services" className="flex items-center gap-3 px-4 py-3 bg-white border border-[var(--pqube-gray-200)] rounded-xl hover:border-[var(--pqube-blue)]/40 hover:shadow-lg transition-all">
                    <span className="text-sm font-semibold text-[var(--pqube-navy)]">Explore All Services</span>
                    <ArrowRight size={16} className="text-[var(--pqube-blue)] shrink-0" />
                  </Link>
                  <Link to="/clients" className="flex items-center gap-3 px-4 py-3 bg-white border border-[var(--pqube-gray-200)] rounded-xl hover:border-[var(--pqube-blue)]/40 hover:shadow-lg transition-all">
                    <span className="text-sm font-semibold text-[var(--pqube-navy)]">View Client Stories</span>
                    <ArrowRight size={16} className="text-[var(--pqube-blue)] shrink-0" />
                  </Link>
                  <Link to="/insights" className="flex items-center gap-3 px-4 py-3 bg-white border border-[var(--pqube-gray-200)] rounded-xl hover:border-[var(--pqube-blue)]/40 hover:shadow-lg transition-all">
                    <span className="text-sm font-semibold text-[var(--pqube-navy)]">Read Latest Insights</span>
                    <ArrowRight size={16} className="text-[var(--pqube-blue)] shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1A1A1A] py-16">
        <div className="container-page text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Prefer a direct conversation?</h2>
          <span className="block w-16 h-1 rounded-full mx-auto mb-6 bg-gradient-to-r from-[#B8722C] via-[#D4A017] to-[#F0C75E]" aria-hidden="true" />
          <p className="text-white/80 max-w-xl mx-auto mb-7">Book a free 30-minute discovery call — no pitch, just a clear path forward.</p>
          <a href="https://bookings.cloud.microsoft/book/PQubeBusinessSolutions@pqube.in/?ismsaljsauthenabled=true" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-[#B8722C] via-[#D4A017] to-[#F0C75E] rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[#B8722C]/30">
            Schedule Free Demo
          </a>
        </div>
      </section>
    </main>
  );
}