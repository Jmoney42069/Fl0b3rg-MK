"use client";

import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

/* ── Stat config ─────────────────────────────────────────────── */
interface StatConfig {
  target: number;
  decimals: number;
  prefix: string;
  suffix: string;
  label: string;
}

const STATS: StatConfig[] = [
  { target: 200, decimals: 0, prefix: "", suffix: "+", label: "Tevreden klanten" },
  { target: 9.1, decimals: 1, prefix: "", suffix: "", label: "Gemiddelde beoordeling" },
  { target: 25, decimals: 0, prefix: "", suffix: "+", label: "Jaar ervaring" },
  { target: 95, decimals: 0, prefix: "", suffix: "%", label: "Verkoopt boven vraagprijs" },
];

/* ── Single stat ─────────────────────────────────────────────── */
function Stat({ config, active }: { config: StatConfig; active: boolean }) {
  const value = useCountUp(config.target, config.decimals, active);
  const display =
    config.decimals > 0 ? value.toFixed(config.decimals) : Math.round(value).toString();

  return (
    <div className="flex flex-col items-center text-center p-6 bg-white border border-[#E5E7EB] rounded-2xl">
      <p className="font-display font-bold text-[#1B3A5C] leading-none mb-1" style={{ fontSize: "48px" }}>
        {config.prefix}
        {display}
        <span className="text-[#C9A96E]">{config.suffix}</span>
      </p>
      <p className="font-body text-[#6B7280] text-sm mt-2">{config.label}</p>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────── */
export function StatCounter() {
  const [ref, inView] = useInView(0.4, true);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-16 bg-stone-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <Stat key={stat.label} config={stat} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
