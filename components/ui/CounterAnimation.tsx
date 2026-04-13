"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, animate } from "framer-motion";

/** Props for CounterAnimation */
export interface CounterAnimationProps {
  /** The numeric end value to count up to */
  to: number;
  /** Optional suffix appended after the number (e.g. "+" or "%") */
  suffix?: string;
  /** Optional prefix before the number (e.g. "€") */
  prefix?: string;
  /** Animation duration in seconds (default: 1.5) */
  duration?: number;
  /** Additional CSS classes on the wrapping span */
  className?: string;
}

/**
 * Animates a number from 0 to `to` when it enters the viewport.
 * Uses Framer Motion's spring for a natural easing feel.
 * Respects prefers-reduced-motion: skips the animation and shows the final value immediately.
 */
export const CounterAnimation = ({
  to,
  suffix = "",
  prefix = "",
  duration = 1.5,
  className = "",
}: CounterAnimationProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      if (ref.current) ref.current.textContent = `${prefix}${to}${suffix}`;
      return;
    }

    if (isInView) {
      motionValue.set(0);
      animate(motionValue, to, { duration, ease: "easeOut" });
    }
  }, [isInView, to, duration, motionValue, suffix, prefix]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
  }, [spring, prefix, suffix]);

  return (
    <span ref={ref} className={className} aria-live="polite">
      {prefix}0{suffix}
    </span>
  );
};
