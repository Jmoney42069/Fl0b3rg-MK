"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, TrendingUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeUp, fadeIn, staggerContainer } from "@/lib/animations";
import { useScrollPosition } from "@/hooks/useScrollPosition";

/** Full-viewport hero section for Floberg Makelaardij */
export const Hero = () => {
  const { isScrolled } = useScrollPosition();

  return (
    <section
      className="relative min-h-screen flex items-center"
      aria-label="Hero — Floberg Makelaardij"
    >
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80"
        alt="Luxe woning in het Gooi — Floberg Makelaardij"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(27,43,75,0.85) 0%, rgba(27,43,75,0.5) 60%, rgba(27,43,75,0.3) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container-custom relative z-10 pt-[120px] pb-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Eyebrow badge */}
          <motion.span
            variants={fadeIn}
            custom={0.2}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent text-sm font-medium mb-6"
          >
            ✦ NVM Makelaar · Het Gooi
          </motion.span>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-bold text-white leading-tight mb-6 text-[36px] md:text-[52px]"
          >
            Uw woning verkopen of kopen in het{" "}
            <span className="text-accent">Gooi</span>?
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="font-body text-lg text-white/85 max-w-lg mb-10 leading-[1.7]"
          >
            Al meer dan 40 jaar de vertrouwde NVM-makelaar in Huizen en
            Bussum. Persoonlijk, deskundig en altijd bereikbaar.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-4 mb-8"
          >
            <Link href="/afspraak" tabIndex={-1}>
              <Button variant="gold" size="lg" icon={<Calendar className="h-5 w-5" />}>
                Plan een gratis gesprek
              </Button>
            </Link>

            <Link
              href="/waardebepaling"
              className={[
                "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
                "border-2 border-white text-white",
                "px-8 py-3.5 text-lg",
                "transition-all duration-200",
                "hover:bg-white hover:text-primary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              ].join(" ")}
            >
              <TrendingUp className="h-5 w-5 shrink-0" />
              Bereken woningwaarde
            </Link>
          </motion.div>

          {/* Social proof micro-text */}
          <motion.p
            variants={fadeIn}
            className="font-body text-[13px] text-white/60 italic"
          >
            ✓ Kosteloos en vrijblijvend &nbsp;·&nbsp; ✓ Binnen 24u reactie
            &nbsp;·&nbsp; ✓ Ervaren Register Makelaars
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {!isScrolled && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <ChevronDown
            className="h-8 w-8 text-white animate-bounce"
            aria-hidden="true"
          />
        </div>
      )}
    </section>
  );
};
