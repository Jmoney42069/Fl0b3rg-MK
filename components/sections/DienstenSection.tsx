"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Home, Key, ClipboardList, Calculator } from "lucide-react";
import { DienstCard, type DienstItem } from "@/components/sections/DienstCard";
import { StatistiekenBalk } from "@/components/sections/StatistiekenBalk";

/** All Floberg services */
const DIENSTEN: DienstItem[] = [
  {
    id: "verkopen",
    icon: Home,
    title: "Woning Verkopen",
    subtitle: "Maximale opbrengst, minimale stress",
    description:
      "Floberg begeleidt u van A tot Z bij de verkoop van uw woning. Met strategische marktpositionering, professionele fotografie en ons uitgebreide netwerk in het Gooi bereiken wij samen de best mogelijke verkoopprijs.",
    features: [
      "Gratis vrijblijvend waardegesprek",
      "Professionele fotografie & plattegronden",
      "Actieve marketing via Funda + social media",
      "Volledige onderhandeling & juridische afhandeling",
    ],
    ctaLabel: "Meer over verkopen",
    ctaHref: "/verkopen",
  },
  {
    id: "aankopen",
    icon: Key,
    title: "Woning Aankopen",
    subtitle: "De juiste woning, op het juiste moment",
    description:
      "Op een krappe woningmarkt als het Gooi is een ervaren aankoopmakelaar geen luxe maar een noodzaak. Floberg kent elke straat, elke wijk en elke verborgen kans in Huizen, Bussum en omgeving.",
    features: [
      "Persoonlijk zoekprofiel op maat",
      "Vroege toegang tot woningen vóór Funda",
      "Scherpe bod-strategie & onderhandeling",
      "Bouwkundige keuring & hypotheekadvies netwerk",
    ],
    ctaLabel: "Meer over aankopen",
    ctaHref: "/aankopen",
  },
  {
    id: "taxatie",
    icon: ClipboardList,
    title: "Taxatie",
    subtitle: "Officieel, snel en betrouwbaar",
    description:
      "Of u nu een hypotheek aanvraagt, uw nalatenschap regelt of gewoon wilt weten wat uw woning waard is — onze gecertificeerde Register Taxateurs leveren een NWWI-gevalideerd rapport.",
    features: [
      "NWWI-gevalideerde taxatierapporten",
      "Erkend door alle hypotheekverstrekkers",
      "Gemiddelde doorlooptijd: 5 werkdagen",
      "Desktoptaxatie ook mogelijk",
    ],
    ctaLabel: "Taxatie aanvragen",
    ctaHref: "/taxatie",
  },
  {
    id: "hypotheek",
    icon: Calculator,
    badge: "Partner dienst",
    title: "Hypotheek & Financiering",
    subtitle: "De beste deal voor uw situatie",
    description:
      "Via ons netwerk van gecertificeerde hypotheekadviseurs zorgen wij dat u niet alleen de beste woning vindt, maar ook de meest passende financiering. Wij maken de warme introductie.",
    features: [
      "Onafhankelijk hypotheekadvies",
      "Vergelijking 30+ geldverstrekkers",
      "Gecombineerde afspraak mogelijk",
      "Geheel vrijblijvend eerste gesprek",
    ],
    ctaLabel: "Meer informatie",
    ctaHref: "/hypotheek",
  },
];

/** Section header animation */
const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

/** Cards container — triggers staggered children */
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/**
 * Full "Onze Diensten" section — section header, 2×2 service card grid,
 * and a statistics bar. Scroll-triggered via Framer Motion useInView.
 */
export const DienstenSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

  return (
    <section
      className="section-padding bg-[#F8F6F1]"
      aria-label="Onze diensten"
    >
      <div className="container-custom">
        {/* ── Section header ─────────────────────────── */}
        <motion.div
          ref={headerRef}
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="mb-14 text-center"
        >
          <p className="mb-3 font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-accent">
            Wat wij voor u doen
          </p>
          <h2 className="font-display font-semibold text-primary leading-tight mb-4 text-[1.8rem] md:text-[2.5rem]">
            Uw woning, onze expertise
          </h2>
          <p className="mx-auto max-w-[600px] font-body text-[0.9375rem] leading-[1.7] text-neutral-mid">
            Van eerste ori&euml;ntatie tot sleuteloverdracht &mdash; Floberg begeleidt
            u bij elke stap in het koop- of verkoopproces met persoonlijke
            aandacht en diepgaande kennis van de Gooische markt.
          </p>
        </motion.div>

        {/* ── Diensten grid ──────────────────────────── */}
        <motion.div
          ref={gridRef}
          variants={gridVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {DIENSTEN.map((dienst, index) => (
            <DienstCard key={dienst.id} dienst={dienst} index={index} />
          ))}
        </motion.div>

        {/* ── Statistieken balk ──────────────────────── */}
        <StatistiekenBalk />
      </div>
    </section>
  );
};

export default DienstenSection;
