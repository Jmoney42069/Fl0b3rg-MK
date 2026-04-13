"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Phone, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { berekenWaarde, formateerValuta } from "@/lib/waardeBerekeningAlgoritme";
import type { WaardeResultaat } from "@/types/waardebepaling";
import { FLOBERG_INFO } from "@/lib/constants";

interface ResultaatSchermProps {
  resultaat: WaardeResultaat;
}

/** Animates from 0 to `target` and renders as formatted currency */
const AnimatedCurrency = ({ target }: { target: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const timeout = setTimeout(() => raw.set(target), 80);
    return () => clearTimeout(timeout);
  }, [target, raw]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = formateerValuta(
          Math.round(latest / 1000) * 1000
        );
      }
    });
  }, [spring]);

  return (
    <span
      ref={ref}
      className="tabular-nums"
      aria-live="polite"
      aria-label={`Geschatte waarde: ${formateerValuta(target)}`}
    >
      {formateerValuta(0)}
    </span>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  }),
};

export const ResultaatScherm = ({ resultaat }: ResultaatSchermProps) => {
  const { min, max, plaatsnaam } = resultaat;

  return (
    <div className="pb-2">
      {/* Result banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
        className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A2B4A] to-[#243860] p-8 text-white"
      >
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-2 font-body text-sm font-medium uppercase tracking-widest text-[#C9A84C]"
        >
          Uw woningwaardeindicatie
        </motion.p>

        <motion.div
          custom={0.15}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-1 font-display text-4xl font-bold text-[#C9A84C] sm:text-5xl"
        >
          <AnimatedCurrency target={min} />
          <span className="mx-3 text-2xl text-white/40 sm:text-3xl">—</span>
          <AnimatedCurrency target={max} />
        </motion.div>

        <motion.p
          custom={0.3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-body text-sm text-white/70"
        >
          Waardebepaling op basis van actuele marktdata in{" "}
          <span className="font-semibold text-white">{plaatsnaam}</span> en omgeving.
          Dit is een indicatie — geen officieel taxatierapport.
        </motion.p>
      </motion.div>

      {/* Verified badges */}
      <motion.ul
        custom={0.4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
        aria-label="Kwaliteitskenmerken"
      >
        {[
          "Gebaseerd op 12 maanden verkoopdata",
          "Gecorrigeerd voor locatie en type",
          "Vrijblijvend & zonder verplichtingen",
        ].map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 rounded-xl border border-[#E5E0D8] bg-white px-4 py-3"
          >
            <CheckCircle2
              className="h-4 w-4 shrink-0 text-[#C9A84C]"
              aria-hidden="true"
            />
            <span className="font-body text-xs text-[#1A1A1A]">{item}</span>
          </li>
        ))}
      </motion.ul>

      {/* CTAs */}
      <motion.div
        custom={0.5}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="grid gap-4 sm:grid-cols-2"
      >
        {/* CTA 1 — schedule appraisal */}
        <div className="rounded-2xl border border-[#E5E0D8] bg-white p-6">
          <Calendar
            className="mb-3 h-7 w-7 text-[#C9A84C]"
            aria-hidden="true"
          />
          <h3 className="mb-1 font-display text-lg font-semibold text-[#1A2B4A]">
            Bevestig uw waardebepaling
          </h3>
          <p className="mb-4 font-body text-sm text-[#6B7280]">
            Onze NVM-makelaar bezoekt uw woning voor een officieel taxatierapport.
            Vrijblijvend kennismaking.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-xl bg-[#1A2B4A] px-5 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-[#243860] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2"
          >
            Maak een afspraak
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* CTA 2 — call directly */}
        <div className="rounded-2xl bg-[#F8F6F1] p-6">
          <Phone
            className="mb-3 h-7 w-7 text-[#C9A84C]"
            aria-hidden="true"
          />
          <h3 className="mb-1 font-display text-lg font-semibold text-[#1A2B4A]">
            Liever direct bellen?
          </h3>
          <p className="mb-4 font-body text-sm text-[#6B7280]">
            Spreek direct met een van onze makelaars over uw situatie en de
            mogelijkheden.
          </p>
          <a
            href={`tel:${FLOBERG_INFO.telefoon.replace(/\s/g, "")}`}
            className="group inline-flex items-center gap-2 rounded-xl border border-[#1A2B4A] px-5 py-2.5 font-body text-sm font-semibold text-[#1A2B4A] transition-colors hover:bg-[#1A2B4A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2"
          >
            {FLOBERG_INFO.telefoon}
            <Phone
              className="h-4 w-4"
              aria-hidden="true"
            />
          </a>
        </div>
      </motion.div>

      <motion.p
        custom={0.6}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-6 text-center font-body text-xs text-[#6B7280]"
      >
        * Dit is een automatische indicatie en geen officieel taxatierapport.
        Floberg Makelaardij geeft geen garanties aan de genoemde waarden.
      </motion.p>
    </div>
  );
};
