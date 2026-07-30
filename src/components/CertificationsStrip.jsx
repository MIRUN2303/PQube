import { certifications } from '../data/clients';

export default function CertificationsStrip() {
  return (
    <section className="border-t border-[var(--pqube-gray-200)] bg-white">
      <div className="container-page py-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-[var(--pqube-gray-500)] mb-5">Certifications & Accreditations</p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {certifications.map((cert) => (
            <div key={cert.slug} className="flex items-center gap-2 text-[var(--pqube-gray-500)] hover:text-[var(--pqube-navy)] transition-colors group">
              <div className="w-10 h-10 rounded-full bg-[var(--pqube-gray-50)] flex items-center justify-center text-[10px] font-bold text-[var(--pqube-gray-500)] group-hover:bg-[var(--pqube-cyan)]/10 group-hover:text-[var(--pqube-cyan)] transition-all">
                {cert.name.slice(0, 2)}
              </div>
              <span className="text-xs font-medium">{cert.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
