"use client";

import { useState, useEffect } from "react";

export interface UseTestimonialSliderReturn {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  pauseAutoAdvance: () => void;
  resumeAutoAdvance: () => void;
}

/**
 * Shared slider logic for testimonial carousels.
 * @param count          Number of dot positions (= TOTAL - visibleCards + 1)
 * @param autoAdvanceMs  Milliseconds between auto-advances
 */
export function useTestimonialSlider(
  count: number,
  autoAdvanceMs: number
): UseTestimonialSliderReturn {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Clamp when count changes (e.g. window resize changes visible card count)
  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, Math.max(0, count - 1)));
  }, [count]);

  // Auto-advance
  useEffect(() => {
    if (isPaused || count <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev >= count - 1 ? 0 : prev + 1));
    }, autoAdvanceMs);
    return () => clearInterval(id);
  }, [isPaused, count, autoAdvanceMs]);

  return {
    activeIndex,
    setActiveIndex,
    pauseAutoAdvance: () => setIsPaused(true),
    resumeAutoAdvance: () => setIsPaused(false),
  };
}
