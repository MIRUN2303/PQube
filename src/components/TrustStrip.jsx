export default function TrustStrip() {
  const badges = [
    { name: 'Microsoft Partner', initials: 'MP' },
    { name: 'ISO 2015 Certified', initials: 'IS' },
    { name: 'MSME Registered', initials: 'MS' },
    { name: '20+ Years Experience', initials: '20' },
    { name: 'D&B Registered', initials: 'DB' },
  ];

  return (
    <section className="border-b border-[var(--pqube-gray-200)] bg-white">
      <div className="container-page py-4">
        <div className="flex items-center gap-6 md:gap-10 overflow-x-auto justify-center">
          {badges.map((b) => (
            <div key={b.name} className="flex items-center gap-2 text-[var(--pqube-gray-500)] hover:text-[var(--pqube-navy)] transition-colors shrink-0 group">
              <div className="w-8 h-8 rounded-lg bg-[var(--pqube-gray-50)] flex items-center justify-center text-[10px] font-bold text-[var(--pqube-gray-500)] group-hover:bg-[var(--pqube-cyan)]/10 group-hover:text-[var(--pqube-cyan)] transition-all">
                {b.initials}
              </div>
              <span className="text-xs font-medium whitespace-nowrap">{b.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
