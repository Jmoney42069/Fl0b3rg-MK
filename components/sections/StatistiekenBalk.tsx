"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CounterAnimation } from "@/components/ui/CounterAnimation";

/** A single statistic item */
export interface StatItem {
  /** Display value — shown verbatim when non-numeric (e.g. "NVM") */
  value: string;
  /** If provided, CounterAnimation counts up to this number */
  numericValue?: number;
  /** Suffix appended after numericValue (e.g. "+") */
  suffix?: string;
  /** Descriptive label below the value */
  label: string;
}

const STATS: StatItem[] = [
  { value: "500+", numericValue: 500, suffix: "+", label: "Woningen verkocht" },
  { value: "9.4", numericValue: 9, suffix: ".4", label: "Gemiddeld klantcijfer" },
  { value: "25+", numericValue: 25, suffix: "+", label: "Jaar ervaring in het Gooi" },
  { value: "NVM", label: "Gecertificeerd makelaarskantoor" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/** Dark-blue statistics bar shown below the service cards */
export const StatistiekenBalk = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div
      ref={ref}
      className="rounded-[20px] bg-primary px-8 py-12"
      aria-label="Floberg in cijfers"
    >
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-2 gap-y-10 md:grid-cols-4"
        role="list"
      >
        {STATS.map((stat, index) => (
          <motion.li
            key={stat.label}
            variants={itemVariants}
            role="listitem"
            className={[
              "flex flex-col items-center gap-1 text-center px-4",
              index < STATS.length - 1 ? "md:border-r md:border-white/10" : "",
            ].join(" ")}
          >
            {/* Numeric counter or static text */}
            {stat.numericValue !== undefined ? (
              <span
                className="font-display text-[2.8rem] font-bold leading-none text-accent"
                aria-label={stat.value}
              >
                <CounterAnimation
                  to={stat.numericValue}
                  suffix={stat.suffix ?? ""}
                  duration={1.5}
                />
              </span>
            ) : (
              <span className="font-display text-[2.8rem] font-bold leading-none text-accent">
                {stat.value}
              </span>
            )}

            <span className="font-body text-[0.85rem] text-white/70 leading-snug max-w-[120px]">
              {stat.label}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};
