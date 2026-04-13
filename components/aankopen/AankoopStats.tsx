"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

/* ── Stat config ─────────────────────────────────────────────── */
interface StatConfig {
  target: number;
  decimals: number;
  format: (value: number) => string;
  label: string;
}

const STATS: StatConfig[] = [
  {
    target: 500,
    decimals: 0,
    format: (n) => `${Math.round(n)}+`,
    label: "Aankopen begeleid in de regio",
  },
  {
    target: 15000,
    decimals: 0,
    format: (n) =>
      "€\u00a0" + Math.round(n).toLocaleString("nl-NL"),
    label: "Gemiddelde besparing per aankoop",
  },
  {
    target: 48,
    decimals: 0,
    format: (n) => `${Math.round(n)} uur`,
    label: "Gemiddeld eerste bezichtiging na opdracht",
  },
  {
    target: 9.4,
    decimals: 1,
    format: (n) => n.toFixed(1),
    label: "Klanttevredenheid aankoop",
  },
];

/* ── Count-up hook ───────────────────────────────────────────── */
function useCountUp(target: number, decimals: number, isInView: boolean): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const DURATION = 1800;
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(parseFloat((target * eased).toFixed(decimals)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, decimals]);

  return value;
}

/* ── Stat item ───────────────────────────────────────────────── */
function StatItem({
  target,
  decimals,
  format,
  label,
  isInView,
}: StatConfig & { isInView: boolean }) {
  const animated = useCountUp(target, decimals, isInView);

  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="h-px w-16 bg-[#F5F0E8]/20 mb-4" aria-hidden="true" />
      <p
        className="font-display font-bold text-[#C9A84C] leading-none"
        style={{ fontSize: "52px" }}
        aria-live="polite"
      >
        {format(animated)}
      </p>
      <p className="font-body text-sm text-white/50 mt-2 max-w-[130px]">{label}</p>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────── */
export function AankoopStats() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-100px",
  });

  return (
    <section ref={ref} className="py-16 bg-[#0F1B2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 divide-x-0 lg:divide-x lg:divide-white/10">
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
