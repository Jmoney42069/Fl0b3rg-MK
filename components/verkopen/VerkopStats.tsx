"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

/* ── Types ─────────────────────────────────────────────────────── */
interface StatConfig {
  target: number;
  decimals: number;
  suffix: string;
  label: string;
}

const STATS: StatConfig[] = [
  { target: 98,  decimals: 0, suffix: "%",      label: "Van de vraagprijs gerealiseerd" },
  { target: 37,  decimals: 0, suffix: " dagen",  label: "Gemiddelde verkooptijd" },
  { target: 500, decimals: 0, suffix: "+",       label: "Woningen verkocht in de regio" },
  { target: 9.2, decimals: 1, suffix: "",        label: "Gemiddelde klantbeoordeling" },
];

/* ── Count-up hook ─────────────────────────────────────────────── */
function useCountUp(target: number, decimals: number, isInView: boolean): string {
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (!isInView) return;
    const DURATION = 1800;
    const startTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay((target * eased).toFixed(decimals));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, decimals]);

  return display;
}

/* ── Stat item ─────────────────────────────────────────────────── */
function StatItem({ target, decimals, suffix, label, isInView }: StatConfig & { isInView: boolean }) {
  const display = useCountUp(target, decimals, isInView);

  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="h-px w-16 bg-[#C9A84C] mb-4" aria-hidden="true" />
      <p
        className="font-display font-bold text-[#0F1B2D] leading-none"
        style={{ fontSize: "52px" }}
        aria-live="polite"
      >
        {display}
        <span className="text-4xl">{suffix}</span>
      </p>
      <p className="font-body text-sm text-[#0F1B2D]/60 mt-2 max-w-[120px]">{label}</p>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────── */
export function VerkopStats() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 divide-x-0 lg:divide-x lg:divide-[#0F1B2D]/10">
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
