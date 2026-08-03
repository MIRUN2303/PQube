import PageHero from '../components/PageHero';
import ShinyText from '../components/ShinyText';
import BlurReveal from '../components/BlurReveal';
import { contactInfo } from '../data/portfolio';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80';

export default function Terms() {
  return (
    <main className="bg-[var(--pqube-gray-50)]">
      <PageHero
        overline="Legal"
        title="Terms of Service"
        subtitle="The terms governing your use of PQube's website and services. Please read carefully."
        image={HERO_IMAGE}
      />

      <section className="section-padding bg-white">
        <div className="container-page max-w-3xl">
          <article className="space-y-8">
            <div>
              <ShinyText text="1. Acceptance of Terms" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
              <p className="text-[var(--pqube-gray-700)] leading-relaxed">
                By accessing or using the PQube website ("Site") or engaging our services ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please do not use the Site or Services.
              </p>
            </div>

            <div>
              <ShinyText text="2. Services" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
              <p className="text-[var(--pqube-gray-700)] leading-relaxed mb-3">
                PQube provides technology consulting, software development, cloud solutions, digital transformation, and managed services as described in our service offerings. Specific deliverables, timelines, and fees are governed by a separate Master Services Agreement (MSA) or Statement of Work (SOW) executed between the parties.
              </p>
            </div>

            <div>
              <ShinyText text="3. Intellectual Property" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
              <p className="text-[var(--pqube-gray-700)] leading-relaxed mb-3">
                All content, trademarks, logos, and intellectual property on this Site are owned by PQube or its licensors. You may not reproduce, distribute, or create derivative works without prior written consent. Client deliverables produced under a signed SOW are typically assigned to the client per the MSA terms.
              </p>
            </div>

            <div>
              <ShinyText text="4. Confidentiality" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
              <p className="text-[var(--pqube-gray-700)] leading-relaxed mb-3">
                Both parties agree to protect confidential information exchanged during the engagement. Confidential information includes business plans, technical data, trade secrets, and any information marked or reasonably understood to be confidential.
              </p>
            </div>

            <div>
              <ShinyText text="5. Limitation of Liability" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
              <p className="text-[var(--pqube-gray-700)] leading-relaxed mb-3">
                To the maximum extent permitted by law, PQube shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities. Our aggregate liability shall not exceed the fees paid by the client in the twelve (12) months preceding the claim.
              </p>
            </div>

            <div>
              <ShinyText text="6. Governing Law" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
              <p className="text-[var(--pqube-gray-700)] leading-relaxed mb-3">
                These Terms are governed by the laws of the Republic of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka.
              </p>
            </div>

            <div>
              <ShinyText text="7. Changes to Terms" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
              <p className="text-[var(--pqube-gray-700)] leading-relaxed mb-3">
                We may update these Terms from time to time. Material changes will be communicated via the Site or email. Continued use after changes constitutes acceptance.
              </p>
            </div>

            <div>
              <ShinyText text="8. Contact" color="#29ABE2" shineColor="#ffffff" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
              <p className="text-[var(--pqube-gray-700)] leading-relaxed">
                Questions about these Terms? Contact us at <a href={`mailto:${contactInfo.email}`} className="text-[var(--pqube-blue)] hover:underline">{contactInfo.email}</a> or <a href="tel:+919731249009" className="text-[var(--pqube-blue)] hover:underline">{contactInfo.phone}</a>.
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