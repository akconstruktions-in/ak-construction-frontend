import { useEffect, useRef } from 'react';

/**
 * Intersection-observer hook that adds "visible" class
 * to .reveal elements when they scroll into view.
 * Respects prefers-reduced-motion by marking visible immediately.
 */
export default function useReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = containerRef.current || document;
    const els = root.querySelectorAll('.reveal');

    if (prefersReduced) {
      els.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });

  return containerRef;
}
