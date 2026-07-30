import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-lg bg-[var(--pqube-navy)] text-white flex items-center justify-center shadow-lg hover:bg-[var(--pqube-blue)] hover:shadow-xl hover:scale-105 transition-all duration-200"
      aria-label="Scroll to top">
      <ArrowUp size={20} />
    </button>
  );
}
