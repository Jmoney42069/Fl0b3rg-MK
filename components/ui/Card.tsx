"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

/** Props for the Card component */
export interface CardProps {
  /** Card contents */
  children: ReactNode;
  /** Enable hover shadow + lift animation */
  hover?: boolean;
  /** Show a subtle accent border */
  bordered?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/** Composable card container with optional hover animation and accent border */
export const Card = ({
  children,
  hover = false,
  bordered = false,
  className = "",
}: CardProps) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={[
        "rounded-2xl bg-white shadow-card",
        hover ? "hover:shadow-card-hover cursor-pointer" : "",
        bordered ? "border border-accent/20" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </motion.div>
  );
};
