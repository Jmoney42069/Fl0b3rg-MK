"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns true once the element has entered the viewport by `threshold` (0–1).
 * Uses a single IntersectionObserver per element. Triggers once by default.
 */
export function useInView(
  threshold = 0.4,
  triggerOnce = true
): [React.RefObject<HTMLElement>, boolean] {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) observer.unobserve(el);
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return [ref, inView];
}
