"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { Check } from "lucide-react";
import { BookingButton } from "@/components/booking/BookingButton";

/* ── Mini count-up ───────────────────────────────────────────── */
function useMiniCountUp(
  target: number,
  decimals: number,
  isInView: boolean
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const DURATION = 1600;
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

/* ── Mini stats data ─────────────────────────────────────────── */
interface MiniStat {
  target: number;
  decimals: number;
  format: (n: number) => string;
  label: string;
}

const MINI_STATS: MiniStat[] = [
  { target: 500, decimals: 0, format: (n) => `${Math.round(n)}+`, label: "Aankopen begeleid" },
  { target: 9.4, decimals: 1, format: (n) => n.toFixed(1), label: "Klanttevredenheid" },
  { target: 35, decimals: 0, format: (n) => `${Math.round(n)}+`, label: "Jaar ervaring" },
  { target: 48, decimals: 0, format: (n) => `${Math.round(n)}u`, label: "Tot eerste bezichtiging" },
];

/* ── Mini stat item ──────────────────────────────────────────── */
function MiniStatItem({ stat, isInView }: { stat: MiniStat; isInView: boolean }) {
  const value = useMiniCountUp(stat.target, stat.decimals, isInView);
  return (
    <div className="flex flex-col items-center text-center p-4">
      <p className="font-display font-bold text-[#C9A84C] leading-none mb-1" style={{ fontSize: "32px" }}>
        {stat.format(value)}
      </p>
      <p className="font-body text-white/45 text-xs">{stat.label}</p>
    </div>
  );
}

/* ── Checklist items ─────────────────────────────────────────── */
const CHECKLIST = [
  "Exclusieve toegang tot off-market woningaanbod",
  "Scherpste onderhandeling voor de laagste prijs",
  "Bouwtechnisch advies bij elke bezichtiging",
  "Volledig juridisch koopcontractonderzoek",
  "Persoonlijke begeleiding van A tot notaris",
  "No cure, no pay op maat mogelijk",
];

/* ── Section ─────────────────────────────────────────────────── */
export function AankoopKennismakingCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef as React.RefObject<Element>, {
    once: true,
    margin: "-80px",
  });
  const isStatsInView = useInView(statsRef as React.RefObject<Element>, {
    once: true,
    margin: "-80px",
  });

  return (
    <section ref={sectionRef} className="py-20 bg-[#F5F0E8]">
      {/* Gold gradient top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#0F1B2D]/30 to-transparent mb-0 -mt-px" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — text + checklist */}
          <div>
            <p className="font-body text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-4">
              Gratis kennismaking
            </p>
            <h2 className="font-display font-bold text-[#0F1B2D] text-4xl leading-tight mb-5">
              Plan een vrijblijvend<br />
              gesprek in
            </h2>
            <p className="font-body text-[#0F1B2D]/65 text-lg mb-8 leading-relaxed">
              In een kosteloos gesprek bespreken wij uw woonwensen, budget en wat wij voor u kunnen betekenen. Zonder verplichtingen.
            </p>

            {/* Checklist */}
            <ul className="space-y-3 mb-10">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0F1B2D] text-white">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span className="font-body text-[#0F1B2D]/70 text-base">{item}</span>
                </li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <BookingButton label="Plan gratis kennismaking" variant="gold" />
              <a
                href="#zoekopdracht"
                className="inline-flex items-center gap-2 rounded-full border border-[#0F1B2D]/25 bg-transparent text-[#0F1B2D] font-body font-semibold text-base px-8 py-3.5 hover:bg-[#0F1B2D]/6 transition-colors"
              >
                Zoekopdracht insturen
              </a>
            </div>
          </div>

          {/* RIGHT — dark stats card */}
          <div
            ref={statsRef}
            className="rounded-2xl bg-[#0F1B2D] p-8 lg:p-10"
          >
            <p className="font-body text-white/40 text-[10px] tracking-widest uppercase font-semibold mb-6">
              Floberg in cijfers
            </p>

            <div className="grid grid-cols-2 gap-2 mb-8">
              {MINI_STATS.map((stat) => (
                <MiniStatItem key={stat.label} stat={stat} isInView={isStatsInView} />
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/8 mb-6" />

            {/* Trust signal */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C9A84C]/15 text-[#C9A84C]">
                <Check size={18} strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-display font-semibold text-white text-sm mb-0.5">
                  Gecertificeerd NVM-makelaar
                </p>
                <p className="font-body text-white/45 text-xs leading-relaxed">
                  Wij zijn aangesloten bij de NVM en voldoen aan alle kwaliteitsnormen voor gecertificeerde makelaardij.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
