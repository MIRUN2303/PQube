import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import SpecularButton from './SpecularButton';
import ShinyText from './ShinyText';
import BlurReveal from './BlurReveal';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="section-padding bg-white" id="contact">
      <div className="container-page">
        <div className="text-center mb-12">
          <ShinyText text="Contact" color="#D4A017" shineColor="#F0C75E" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
          <BlurReveal text="Get a Free Consultation" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
          <p className="text-[var(--pqube-gray-500)] max-w-xl mx-auto mt-4">
            Tell us about your project and we&apos;ll get back to you within 24 hours with a no-obligation assessment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="bg-[var(--pqube-gray-50)] border border-[var(--pqube-gray-200)] rounded-xl p-6 md:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Send size={28} className="text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-[var(--pqube-navy)] mb-2">Message Sent!</h3>
                <p className="text-sm text-[var(--pqube-gray-500)]">Thank you. We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--pqube-ink)] mb-1.5">Name <span className="text-red-400">*</span></label>
                    <input type="text" id="name" name="name" required value={form.name} onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-[var(--pqube-gray-200)] rounded-lg text-sm text-[var(--pqube-ink)] placeholder-[var(--pqube-gray-500)] focus:outline-none focus:ring-2 focus:ring-[var(--pqube-blue)] focus:border-transparent transition-all"
                      placeholder="Your full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--pqube-ink)] mb-1.5">Email <span className="text-red-400">*</span></label>
                    <input type="email" id="email" name="email" required value={form.email} onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-[var(--pqube-gray-200)] rounded-lg text-sm text-[var(--pqube-ink)] placeholder-[var(--pqube-gray-500)] focus:outline-none focus:ring-2 focus:ring-[var(--pqube-blue)] focus:border-transparent transition-all"
                      placeholder="you@company.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[var(--pqube-ink)] mb-1.5">Phone Number <span className="text-red-400">*</span></label>
                  <input type="tel" id="phone" name="phone" required value={form.phone} onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-[var(--pqube-gray-200)] rounded-lg text-sm text-[var(--pqube-ink)] placeholder-[var(--pqube-gray-500)] focus:outline-none focus:ring-2 focus:ring-[var(--pqube-blue)] focus:border-transparent transition-all"
                    placeholder="+91 97312 49009" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[var(--pqube-ink)] mb-1.5">Subject</label>
                  <input type="text" id="subject" name="subject" value={form.subject} onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-[var(--pqube-gray-200)] rounded-lg text-sm text-[var(--pqube-ink)] placeholder-[var(--pqube-gray-500)] focus:outline-none focus:ring-2 focus:ring-[var(--pqube-blue)] focus:border-transparent transition-all"
                    placeholder="How can we help?" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--pqube-ink)] mb-1.5">Message <span className="text-red-400">*</span></label>
                  <textarea id="message" name="message" required rows={4} value={form.message} onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-[var(--pqube-gray-200)] rounded-lg text-sm text-[var(--pqube-ink)] placeholder-[var(--pqube-gray-500)] focus:outline-none focus:ring-2 focus:ring-[var(--pqube-blue)] focus:border-transparent transition-all resize-y"
                    placeholder="Tell us about your project..." />
                </div>
                <SpecularButton type="submit" size="md" radius={10} tint="#1B2A6B" tintOpacity={1} baseColor="#1B2A6B" lineColor="#29ABE2" textColor="#FFFFFF" intensity={1.3} className="w-full justify-center group">
                  <Send
                    size={16}
                    className="transition-all duration-300 ease-out group-hover:translate-x-1.5 group-hover:-translate-y-1 group-hover:rotate-[-20deg] group-hover:scale-110"
                  />
                  Send Message
                </SpecularButton>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-[var(--pqube-gray-50)] border border-[var(--pqube-gray-200)] rounded-xl p-6">
              <div className="flex items-start gap-4 group">
                <MapPin size={20} className="text-[#D4A017] mt-1 shrink-0 group-hover:text-[#F0C75E] transition-colors" />
                <div>
                  <h3 className="text-sm font-bold text-[var(--pqube-navy)] group-hover:text-[var(--pqube-blue)] transition-colors mb-1">Bengaluru, India (HQ)</h3>
                  <p className="text-sm text-[var(--pqube-gray-500)] leading-relaxed">PQube Business Solutions<br />Bengaluru, Karnataka, India</p>
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <Phone size={14} className="text-[var(--pqube-gray-500)]" />
                    <a href="tel:+919731249009" className="text-[var(--pqube-navy)] hover:text-[var(--pqube-blue)] transition-colors font-medium">+91 97312 49009</a>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-sm">
                    <Mail size={14} className="text-[var(--pqube-gray-500)]" />
                    <a href="mailto:info@pqube.in" className="text-[var(--pqube-navy)] hover:text-[var(--pqube-blue)] transition-colors font-medium">info@pqube.in</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--pqube-gray-50)] border border-[var(--pqube-gray-200)] rounded-xl p-6">
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-[#D4A017] mt-1 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-[var(--pqube-navy)] mb-1">Delaware, USA</h3>
                  <p className="text-sm text-[var(--pqube-gray-500)] leading-relaxed">PQube Business Solutions<br />Delaware, United States</p>
                </div>
              </div>
            </div>

            <a href="https://wa.me/919731249009" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-[#25D366]/5 border border-[#25D366]/20 rounded-xl p-5 hover:bg-[#25D366]/10 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[var(--pqube-ink)]">Chat on WhatsApp</div>
                <div className="text-xs text-[var(--pqube-gray-500)]">Quick replies within minutes</div>
              </div>
              <span className="text-sm group-hover:translate-x-1 transition-transform" aria-hidden="true">&rarr;</span>
            </a>

            <a href="https://maps.app.goo.gl/LZXzMktEGX8Wr7S56" target="_blank" rel="noopener noreferrer" className="block h-48 rounded-xl overflow-hidden border border-[var(--pqube-gray-200)] group">
              <iframe
                src="https://www.google.com/maps?q=PQube+Business+Solutions+Bengaluru&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="PQube Bengaluru Office Location"
                className="pointer-events-none group-hover:opacity-90 transition-opacity"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
