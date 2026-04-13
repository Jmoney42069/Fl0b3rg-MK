"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";

/** Props for the SectionHeader component */
export interface SectionHeaderProps {
  /** Small uppercase label above the title */
  eyebrow?: string;
  /** Main section heading (H2) */
  title: string;
  /** Supporting description text */
  subtitle?: string;
  /** Text alignment and eyebrow line decoration */
  align?: "left" | "center";
}

/** Section header with eyebrow, title, subtitle, and scroll-triggered fade-up animation */
export const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionHeaderProps) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className={[
        "mb-12 max-w-3xl",
        align === "center" ? "mx-auto text-center" : "",
      ].join(" ")}
    >
      {eyebrow && (
        <div
          className={[
            "mb-4 flex items-center gap-3",
            align === "center" ? "justify-center" : "",
          ].join(" ")}
        >
          {align === "center" && (
            <span className="block h-px w-8 bg-accent" aria-hidden="true" />
          )}
          <span className="font-body text-xs font-medium uppercase tracking-[0.1em] text-accent">
            {eyebrow}
          </span>
          {align === "center" && (
            <span className="block h-px w-8 bg-accent" aria-hidden="true" />
          )}
        </div>
      )}

      <h2 className="font-display text-[32px] font-semibold leading-tight text-primary">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 font-body text-base leading-[1.7] text-neutral-mid">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
