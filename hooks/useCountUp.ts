"use client";

import { useEffect, useState } from "react";

/**
 * Animates a number from 0 to `target` over `duration` ms using ease-out cubic.
 * Starts when `active` becomes true.
 */
export function useCountUp(
  target: number,
  decimals: number,
  active: boolean,
  duration = 2000
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min(now - start, duration);
      const progress = elapsed / duration;
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(parseFloat((target * eased).toFixed(decimals)));
      if (elapsed < duration) {
        raf = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, decimals, duration]);

  return value;
}
