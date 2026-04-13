"use client";

import { useState, useEffect } from "react";

/** Return value of the useScrollPosition hook */
export interface ScrollPosition {
  /** Current vertical scroll offset in pixels */
  scrollY: number;
  /** True once the page has scrolled past 80px */
  isScrolled: boolean;
}

const SCROLL_THRESHOLD = 80;

/**
 * Tracks the window scroll position with a passive event listener.
 * The listener is cleaned up automatically on component unmount.
 */
export function useScrollPosition(): ScrollPosition {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Sync initial position (e.g. after hard refresh mid-page)
    setScrollY(window.scrollY);

    function handleScroll() {
      setScrollY(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollY, isScrolled: scrollY > SCROLL_THRESHOLD };
}
