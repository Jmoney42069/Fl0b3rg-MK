"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";

/** A single dienst (service) item */
export interface DienstItem {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  /** Optional badge label shown above the title (e.g. "Partner dienst") */
  badge?: string;
}

/** Props for DienstCard */
export interface DienstCardProps {
  dienst: DienstItem;
  /** Stagger index used to compute animation delay */
  index: number;
}

/** Animation variants for a single service card */
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.12,
      ease: "easeOut" as const,
    },
  }),
};

/** Icon container hover animation */
const iconVariants = {
  rest: { rotate: 0, scale: 1 },
  hover: {
    rotate: 10,
    scale: 1.1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

/**
 * Reusable service card for the DienstenSection.
 * Animates in on scroll and provides hover/focus interactions.
 */
export const DienstCard = ({ dienst, index }: DienstCardProps) => {
  const { icon: Icon, title, subtitle, description, features, ctaLabel, ctaHref, badge } = dienst;

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      className={[
        "group relative flex flex-col rounded-2xl bg-white p-8",
        "border border-[#E5E0D8]",
        "shadow-[0_2px_12px_rgba(0,0,0,0.06)]",
        "transition-all duration-300 motion-reduce:transition-none",
        "hover:border-accent hover:shadow-[0_8px_32px_rgba(201,169,110,0.15)] hover:-translate-y-1",
        "focus-within:border-accent focus-within:shadow-[0_8px_32px_rgba(201,169,110,0.15)]",
        "motion-reduce:hover:translate-y-0",
      ].join(" ")}
      aria-label={`Dienst: ${title}`}
    >
      {/* Optional badge */}
      {badge && (
        <span className="mb-4 inline-block self-start rounded px-2 py-0.5 text-[0.7rem] font-medium uppercase tracking-widest bg-[#F0EDE6] text-neutral-mid">
          {badge}
        </span>
      )}

      {/* Icon container */}
      <motion.div
        variants={iconVariants}
        initial="rest"
        whileHover="hover"
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10"
        aria-hidden="true"
      >
        <Icon className="h-7 w-7 text-accent" strokeWidth={1.75} />
      </motion.div>

      {/* Title + subtitle */}
      <h3 className="mb-1 font-display text-[1.4rem] font-semibold leading-snug text-primary">
        {title}
      </h3>
      <p className="mb-4 font-body text-[0.85rem] font-medium text-neutral-mid uppercase tracking-wide">
        {subtitle}
      </p>

      {/* Description */}
      <p className="mb-6 font-body text-[0.9375rem] leading-[1.7] text-neutral-mid">
        {description}
      </p>

      {/* Feature list */}
      <ul className="mb-8 flex flex-col gap-2" role="list">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-accent"
              aria-hidden="true"
            />
            <span className="font-body text-sm text-neutral-mid">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA link — pushed to bottom */}
      <div className="mt-auto">
        <Link
          href={ctaHref}
          className={[
            "inline-flex items-center gap-1.5",
            "font-body text-sm font-semibold text-primary",
            "transition-colors duration-200 hover:text-accent",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded",
            "motion-reduce:transition-none",
          ].join(" ")}
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
        </Link>
      </div>
    </motion.article>
  );
};
