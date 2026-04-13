"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MessageCircle,
  Search,
  Eye,
  Calculator,
  FileCheck,
  DollarSign,
} from "lucide-react";
import { BookingButton } from "@/components/booking/BookingButton";

/* ── Steps data ─────────────────────────────────────────────── */
const STEPS = [
  {
    num: "01",
    icon: <MessageCircle size={22} />,
    title: "Kennismaking & intake",
    body: "We bespreken uw woonwensen, budget en tijdlijn in een vrijblijvend gesprek.",
  },
  {
    num: "02",
    icon: <Search size={22} />,
    title: "Actief zoeken",
    body: "We zetten uw zoekopdracht uit in ons netwerk én MLS – inclusief off-market woningen.",
  },
  {
    num: "03",
    icon: <Eye size={22} />,
    title: "Bezichtigingen",
    body: "We begeleiden alle bezichtigingen en signaleren bouwtechnische aandachtspunten.",
  },
  {
    num: "04",
    icon: <Calculator size={22} />,
    title: "Waardebepaling",
    body: "Op basis van vergelijkbare verkopen stellen we een onderbouwde marktwaarde vast.",
  },
  {
    num: "05",
    icon: <DollarSign size={22} />,
    title: "Onderhandelen",
    body: "We onderhandelen namens u over prijs én voorwaarden om het optimale resultaat te behalen.",
  },
  {
    num: "06",
    icon: <FileCheck size={22} />,
    title: "Overdracht",
    body: "We begeleiden u tot en met de notaris – inclusief controle van het koopcontract.",
  },
];

/* ── Animation variants ─────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

/* ── Section ─────────────────────────────────────────────────── */
export function AankoopStappenplan() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-80px",
  });

  return (
    <section ref={ref} className="py-20 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-xl mb-14">
          <p className="font-body text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3">
            Zo werken wij
          </p>
          <h2 className="font-display font-bold text-[#0F1B2D] text-4xl leading-tight mb-4">
            Van wens tot sleuteloverdracht
          </h2>
          <p className="font-body text-[#0F1B2D]/60 text-lg">
            In zes heldere stappen begeleiden wij u door het volledige aankoopproces.
          </p>
        </div>

        {/* Mobile timeline */}
        <motion.div
          className="lg:hidden flex flex-col border-l-2 border-[#C9A84C]/40 ml-5 space-y-0"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {STEPS.map((step) => (
            <motion.div key={step.num} variants={itemVariants} className="relative pl-8 pb-8">
              {/* Dot */}
              <span className="absolute -left-[9px] top-0 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#C9A84C] ring-2 ring-[#F5F0E8]" />
              {/* Card */}
              <div className="bg-white border border-[#0F1B2D]/8 shadow-sm rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center justify-center rounded-full h-8 w-8 bg-[#C9A84C]/15 border border-[#C9A84C]/50 text-[#C9A84C] text-xs font-bold font-body">
                    {step.num}
                  </span>
                  <span className="text-[#C9A84C]">{step.icon}</span>
                </div>
                <h3 className="font-display font-semibold text-[#0F1B2D] text-base mb-1">
                  {step.title}
                </h3>
                <p className="font-body text-[#0F1B2D]/60 text-sm">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop grid */}
        <motion.div
          className="hidden lg:grid lg:grid-cols-6 gap-0"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {STEPS.map((step, i) => (
            <motion.div key={step.num} variants={itemVariants} className="relative px-3">
              {/* Connector */}
              {i < STEPS.length - 1 && (
                <div className="absolute top-5 left-1/2 w-full border-t border-dashed border-[#0F1B2D]/15 z-0" />
              )}
              {/* Card */}
              <div className="relative z-10 bg-white border border-[#0F1B2D]/8 shadow-sm rounded-xl p-5 h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center rounded-full h-9 w-9 bg-[#C9A84C]/15 border border-[#C9A84C]/50 text-[#C9A84C] text-xs font-bold font-body shrink-0">
                    {step.num}
                  </span>
                  <span className="text-[#C9A84C]">{step.icon}</span>
                </div>
                <h3 className="font-display font-semibold text-[#0F1B2D] text-sm mb-1">
                  {step.title}
                </h3>
                <p className="font-body text-[#0F1B2D]/60 text-xs leading-relaxed">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <BookingButton label="Start uw zoektocht vandaag" variant="gold" />
        </div>
      </div>
    </section>
  );
}
