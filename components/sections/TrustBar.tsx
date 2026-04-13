"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Award,
  Star,
  FileCheck,
  Home,
  type LucideIcon,
} from "lucide-react";
import { staggerContainer, fadeIn } from "@/lib/animations";

/** A single trust badge */
interface TrustBadge {
  icon: LucideIcon;
  label: string;
}

const BADGES: TrustBadge[] = [
  { icon: Shield, label: "NVM Aangesloten" },
  { icon: Award, label: "40+ Jaar Ervaring" },
  { icon: Star, label: "9.3 Klantbeoordeling" },
  { icon: FileCheck, label: "Register Taxateurs" },
  { icon: Home, label: "500+ Woningen Verkocht" },
];

/** Trust-badge strip displayed directly below the hero */
export const TrustBar = () => {
  return (
    <section
      className="bg-primary py-5"
      aria-label="Keurmerken en prestaties"
    >
      <div className="container-custom">
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-2 gap-y-6 sm:grid-cols-3 md:grid-cols-5"
          role="list"
        >
          {BADGES.map(({ icon: Icon, label }, index) => (
            <motion.li
              key={label}
              variants={fadeIn}
              role="listitem"
              className={[
                "flex flex-col items-center gap-2 px-4 text-center",
                // Separator between items on md+, not after last
                index < BADGES.length - 1
                  ? "md:border-r md:border-white/10"
                  : "",
                // Center lone last item in 2-column grid on mobile
                index === BADGES.length - 1 && BADGES.length % 2 !== 0
                  ? "col-span-2 sm:col-span-1"
                  : "",
              ].join(" ")}
            >
              <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
              <span className="font-body text-sm font-medium text-white leading-tight">
                {label}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};
