import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('pqube-cookie-consent')) {
      setVisible(true);
    }
    const handler = () => setVisible(true);
    window.addEventListener('pqube-show-cookie-banner', handler);
    return () => window.removeEventListener('pqube-show-cookie-banner', handler);
  }, []);

  const accept = (type) => {
    localStorage.setItem('pqube-cookie-consent', type);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[var(--pqube-gray-200)] shadow-lg" role="dialog" aria-label="Cookie consent">
      <div className="container-page py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-[var(--pqube-ink)]">
              <span className="font-semibold">Cookie Notice:</span> We use cookies to enhance your experience, analyze traffic, and serve tailored content.{' '}
              <a href="/privacy" className="text-[var(--pqube-navy)] hover:text-[var(--pqube-blue)] underline transition-colors">Learn more</a>
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => accept('essential')} className="px-4 py-2 text-xs font-semibold text-[var(--pqube-gray-500)] border border-[var(--pqube-gray-200)] rounded-lg hover:bg-[var(--pqube-gray-50)] transition-colors">
              Essential Only
            </button>
            <button onClick={() => accept('all')} className="px-5 py-2 text-xs font-semibold text-white bg-[var(--pqube-navy)] hover:bg-[var(--pqube-blue)] rounded-lg transition-colors">
              Accept All
            </button>
            <button onClick={() => accept('essential')} className="p-2 rounded-lg hover:bg-[var(--pqube-gray-50)] transition-colors" aria-label="Dismiss">
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
