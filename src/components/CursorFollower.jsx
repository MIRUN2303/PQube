import { useEffect, useRef } from 'react';

export default function CursorFollower() {
  const dotRef = useRef(null);

  useEffect(() => {
    // Only on desktop with fine pointer, and only if prefers-reduced-motion is not set
    const mql = window.matchMedia('(pointer: fine)');
    const rql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mql.matches || rql.matches) return;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    Object.assign(dot.style, {
      position: 'fixed',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: 'var(--pqube-cyan)',
      pointerEvents: 'none',
      zIndex: '9999',
      opacity: '0',
      transform: 'translate(-50%, -50%)',
      transition: 'opacity 200ms ease, transform 150ms ease',
      willChange: 'transform',
    });
    document.body.appendChild(dot);
    dotRef.current = dot;

    let rafId = null;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Show dot over hero, buttons, cards
      const target = e.target;
      const isOverArea =
        target.closest('[class*="HeroSlideshow"]') ||
        target.closest('.magnetic-btn') ||
        target.closest('[class*="ServiceCard"]') ||
        target.closest('button')?.closest('[class*="HeroSlideshow"]');

      dot.style.opacity = isOverArea ? '1' : '0';

      // Magnetic effect on buttons/cards
      const magneticBtn = target.closest('.magnetic-btn');
      if (magneticBtn) {
        const rect = magneticBtn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        magneticBtn.style.transform = `translate(${dx * 6}px, ${dy * 6}px)`;
        magneticBtn.style.transition = 'transform 200ms ease';
      } else {
        document.querySelectorAll('.magnetic-btn').forEach((el) => {
          el.style.transform = '';
        });
      }
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      dot.style.transform = `translate(${currentX - 5}px, ${currentY - 5}px)`;
      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
      document.body.removeChild(dot);
    };
  }, []);

  return null;
}
