import PageHero from '../components/PageHero';
import ShinyText from '../components/ShinyText';
import BlurReveal from '../components/BlurReveal';
import { contactInfo } from '../data/portfolio';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80';

export default function Privacy() {
  return (
    <main className="bg-[var(--pqube-gray-50)]">
      <PageHero
        overline="Legal"
        title="Privacy Policy"
        subtitle="How PQube collects, uses, and protects your personal information. Your privacy matters to us."
        image={HERO_IMAGE}
      />

      <section className="section-padding bg-white">
        <div className="container-page max-w-3xl">
          <article className="space-y-8">
            <div>
              <ShinyText text="1. Information We Collect" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
              <p className="text-[var(--pqube-gray-700)] leading-relaxed mb-3">
                We collect information you provide directly: name, email, phone, company, and message content when you submit forms, request demos, or contact us. We also collect automatic data: IP address, browser type, pages visited, referral source, and interaction data via cookies and analytics.
              </p>
            </div>

            <div>
              <ShinyText text="2. How We Use Your Data" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
              <ul className="list-disc list-inside space-y-2 text-[var(--pqube-gray-700)] leading-relaxed">
                <li>Respond to enquiries and provide requested information</li>
                <li>Schedule and conduct discovery calls or demos</li>
                <li>Send relevant service updates, insights, or marketing (with consent)</li>
                <li>Improve our website, content, and user experience</li>
                <li>Comply with legal obligations and enforce our Terms</li>
              </ul>
            </div>

            <div>
              <ShinyText text="3. Lawful Basis (GDPR)" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
              <p className="text-[var(--pqube-gray-700)] leading-relaxed mb-3">
                We process personal data on the basis of: (a) your consent for marketing communications; (b) legitimate interest to respond to business enquiries and improve our services; (c) contractual necessity when you engage our services; (d) legal obligation where applicable.
              </p>
            </div>

            <div>
              <ShinyText text="4. Data Sharing" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
              <p className="text-[var(--pqube-gray-700)] leading-relaxed mb-3">
                We do not sell your data. We may share data with: (a) trusted subprocessors (cloud hosting, analytics, CRM) under data processing agreements; (b) legal authorities if required by law; (c) potential acquirers in a merger/sale (with notice). All subprocessors are vetted for security and compliance.
              </p>
            </div>

            <div>
              <ShinyText text="5. International Transfers" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
              <p className="text-[var(--pqube-gray-700)] leading-relaxed mb-3">
                PQube operates from India (Bengaluru) and the USA (Delaware). Your data may be processed in either jurisdiction. We rely on standard contractual clauses and adequacy decisions where applicable to safeguard transfers.
              </p>
            </div>

            <div>
              <ShinyText text="6. Data Retention" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
              <p className="text-[var(--pqube-gray-700)] leading-relaxed mb-3">
                Enquiry data: retained for 24 months after last interaction unless you request deletion. Client project data: retained per MSA terms and applicable law. Analytics data: aggregated/anonymized after 14 months.
              </p>
            </div>

            <div>
              <ShinyText text="7. Your Rights" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
              <p className="text-[var(--pqube-gray-700)] leading-relaxed mb-3">
                You may request: access, rectification, erasure, restriction, portability, or objection to processing. To exercise these rights, email <a href={`mailto:${contactInfo.email}`} className="text-[var(--pqube-blue)] hover:underline">{contactInfo.email}</a>. We respond within 30 days.
              </p>
            </div>

            <div>
              <ShinyText text="8. Cookies & Analytics" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
              <p className="text-[var(--pqube-gray-700)] leading-relaxed mb-3">
                We use essential, analytics, and marketing cookies. You can manage preferences via the cookie banner on first visit or browser settings. Blocking essential cookies may break site functionality.
              </p>
            </div>

            <div>
              <ShinyText text="9. Security" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
              <p className="text-[var(--pqube-gray-700)] leading-relaxed mb-3">
                We implement appropriate technical and organizational measures: TLS encryption, access controls, regular security reviews, and staff training. No internet transmission is 100% secure; we strive to protect your data but cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <ShinyText text="10. Contact" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
              <p className="text-[var(--pqube-gray-700)] leading-relaxed">
                Privacy questions or requests? Contact our Data Protection Officer at <a href={`mailto:${contactInfo.email}`} className="text-[var(--pqube-blue)] hover:underline">{contactInfo.email}</a> or write to the address in our <a href="/contact" className="text-[var(--pqube-blue)] hover:underline">Contact</a> page.
              </p>
            </div>

            <div className="pt-6 border-t border-[var(--pqube-gray-200)]">
              <p className="text-sm text-[var(--pqube-gray-500)]">
                Last updated: August 2026
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}