"use client";

import { type ReactNode, forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-light focus-visible:ring-accent",
  secondary:
    "bg-neutral-light text-primary hover:bg-accent-light focus-visible:ring-accent",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-accent",
  ghost:
    "text-primary hover:bg-primary/5 focus-visible:ring-accent",
  gold:
    "bg-accent text-white hover:bg-accent/90 shadow-gold focus-visible:ring-accent",
} as const;

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3.5 text-lg",
} as const;

/** Props for the Button component */
export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  /** Visual style variant */
  variant?: keyof typeof variants;
  /** Button size */
  size?: keyof typeof sizes;
  /** Shows a loading spinner and disables the button */
  loading?: boolean;
  /** Optional icon rendered before children */
  icon?: ReactNode;
  /** Stretch to full container width */
  fullWidth?: boolean;
  children: ReactNode;
}

/** Animated button with multiple style variants and loading state */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      fullWidth = false,
      className = "",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        disabled={disabled || loading}
        className={[
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
          "transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          fullWidth ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : icon ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
