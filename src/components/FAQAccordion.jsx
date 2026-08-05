import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '../data/faq';
import ShinyText from './ShinyText';
import BlurReveal from './BlurReveal';

function AccordionItem({ item, isOpen, onClick }) {
  return (
    <div className={`border border-[var(--pqube-gray-200)] rounded-xl overflow-hidden transition-all duration-200 ${isOpen ? 'border-l-[3px] border-l-[var(--pqube-cyan)]' : ''}`}>
      <button
        className="flex items-center justify-between w-full px-5 py-4 text-left bg-white hover:bg-[var(--pqube-gray-50)] transition-colors"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-[var(--pqube-ink)] pr-4">{item.question}</span>
        <ChevronDown size={18} className={`shrink-0 text-[var(--pqube-gray-500)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
        <div className="px-5 pb-4 text-sm text-[var(--pqube-gray-500)] leading-relaxed bg-white">{item.answer}</div>
      </div>
    </div>
  );
}

export default function FAQAccordion() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section-padding bg-[var(--pqube-gray-50)]">
      <div className="container-page">
        <div className="text-center mb-12">
          <ShinyText text="FAQ" color="#D4A017" shineColor="#F0C75E" speed={3} spread={120} className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3" />
          <BlurReveal text="Frequently Asked Questions" className="text-3xl md:text-4xl font-extrabold text-[var(--pqube-navy)]" blur={12} y={24} rotate={5} stagger={0.12} />
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqItems.map((item, idx) => (
            <AccordionItem key={idx} item={item} isOpen={open === idx} onClick={() => setOpen(open === idx ? null : idx)} />
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-[var(--pqube-gray-500)]">
            Still have questions?{' '}
            <a href="/contact" className="font-semibold text-[var(--pqube-navy)] hover:text-[var(--pqube-blue)] transition-colors">Get in touch</a>
          </p>
        </div>
      </div>
    </section>
  );
}
