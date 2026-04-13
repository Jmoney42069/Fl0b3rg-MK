import type { Variants } from "framer-motion";

/** Shared viewport configuration — triggers once when 20% visible */
export const viewportConfig = { once: true, amount: 0.2 } as const;

/** Fade up from y:20 to y:0 with opacity transition */
export const fadeUp: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/** Simple opacity fade-in */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/** Container that staggers children by 0.1s */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

/** Slide in from the left */
export const slideInLeft: Variants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/** Slide in from the right */
export const slideInRight: Variants = {
  hidden: { x: 30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
