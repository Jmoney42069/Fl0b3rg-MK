"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  PiggyBank,
  Bell,
  ShieldCheck,
  Lightbulb,
  Zap,
  Award,
} from "lucide-react";

/* ── Data ───────────────────────────────────────────────────── */
interface UspItem {
  icon: React.ReactNode;
  title: string;
  body: string;
  highlight?: boolean;
}

const USPS: UspItem[] = [
  {
    icon: <PiggyBank size={24} />,
    title: "Gemiddeld € 15.000 bespaard",
    body: "Onze onderhandelingsexpertise levert u aantoonbaar meer op dan onze courtage. U koopt slimmer.",
    highlight: true,
  },
  {
    icon: <Bell size={24} />,
    title: "Off-market aanbod",
    body: "Ons netwerk geeft u als eerste toegang tot woningen die nooit op Funda verschijnen.",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Volledige juridische begeleiding",
    body: "Van koopcontract tot notarispassering — wij controleren elk document op uw belang.",
  },
  {
    icon: <Lightbulb size={24} />,
    title: "Bouwtechnisch inzicht",
    body: "Wij signaleren verborgen gebreken en risico's voordat u een bod uitbrengt.",
  },
  {
    icon: <Zap size={24} />,
    title: "Snel van start",
    body: "Binnen 48 uur na uw opdracht worden de eerste bezichtigingen ingepland.",
  },
  {
    icon: <Award size={24} />,
    title: "9.4 klanttevredenheid",
    body: "Aantoonbaar tevreden klanten — bewezen door honderden succesvolle aankopen.",
  },
];

/* ── Animation ───────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

/* ── Section ─────────────────────────────────────────────────── */
export function AankoopUSPs() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-80px",
  });

  return (
    <section ref={ref} className="py-20 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-xl mb-12">
          <p className="font-body text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3">
            Waarom Floberg?
          </p>
          <h2 className="font-display font-bold text-[#0F1B2D] text-4xl leading-tight mb-4">
            Uw belang staat voorop
          </h2>
          <p className="font-body text-[#0F1B2D]/60 text-lg">
            Als aankoopmakelaar werken wij uitsluitend voor u — nooit voor de verkoper.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {USPS.map((usp) =>
            usp.highlight ? (
              /* Highlight card */
              <motion.div
                key={usp.title}
                variants={cardVariants}
                className="relative rounded-2xl bg-[#0F1B2D] p-7 flex flex-col"
              >
                {/* Badge */}
                <span className="absolute top-4 right-4 inline-flex items-center rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-[10px] font-body font-semibold tracking-widest uppercase px-2.5 py-1">
                  Meest gekozen
                </span>
                {/* Icon */}
                <span className="inline-flex items-center justify-center rounded-full h-12 w-12 bg-[#C9A84C]/15 text-[#C9A84C] mb-5">
                  {usp.icon}
                </span>
                <h3 className="font-display font-semibold text-white text-lg mb-2">
                  {usp.title}
                </h3>
                <p className="font-body text-white/60 text-sm leading-relaxed">
                  {usp.body}
                </p>
              </motion.div>
            ) : (
              /* Regular card */
              <motion.div
                key={usp.title}
                variants={cardVariants}
                className="rounded-2xl bg-white border border-[#0F1B2D]/8 p-7 flex flex-col hover:shadow-md transition-shadow"
              >
                <span className="inline-flex items-center justify-center rounded-full h-12 w-12 bg-[#C9A84C]/12 text-[#C9A84C] mb-5">
                  {usp.icon}
                </span>
                <h3 className="font-display font-semibold text-[#0F1B2D] text-lg mb-2">
                  {usp.title}
                </h3>
                <p className="font-body text-[#0F1B2D]/60 text-sm leading-relaxed">
                  {usp.body}
                </p>
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
