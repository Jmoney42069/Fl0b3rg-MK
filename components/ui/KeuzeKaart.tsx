"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

/** Props for the KeuzeKaart component */
export interface KeuzeKaartProps {
  /** Whether this card is currently selected */
  selected: boolean;
  /** Click handler */
  onClick: () => void;
  /** Optional Lucide icon node */
  icon?: ReactNode;
  /** Optional emoji displayed above the label */
  emoji?: string;
  /** Main card label */
  label: string;
  /** Optional secondary descriptor below the label */
  sublabel?: string;
  /** Additional CSS classes */
  className?: string;
}

/** Selectable card for housing type and condition pickers */
export const KeuzeKaart = ({
  selected,
  onClick,
  icon,
  emoji,
  label,
  sublabel,
  className = "",
}: KeuzeKaartProps) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      aria-pressed={selected}
      className={[
        "relative flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-4 text-center",
        "transition-all duration-200 motion-reduce:transition-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2",
        selected
          ? "border-[#C9A84C] bg-[rgba(201,168,76,0.08)] text-[#1A2B4A]"
          : "border-[#E5E0D8] bg-white text-[#6B7280] hover:border-[#C9A84C]/50",
        className,
      ].join(" ")}
    >
      {emoji && (
        <span className="text-2xl leading-none" aria-hidden="true">
          {emoji}
        </span>
      )}
      {icon && (
        <span
          className={selected ? "text-[#C9A84C]" : "text-[#6B7280]"}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}

      <span className="font-body text-sm font-semibold leading-tight">
        {label}
      </span>

      {sublabel && (
        <span className="font-body text-xs leading-snug text-[#6B7280]">
          {sublabel}
        </span>
      )}

      {/* Selection dot */}
      {selected && (
        <span
          className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#C9A84C]"
          aria-hidden="true"
        />
      )}
    </motion.button>
  );
};
