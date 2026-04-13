"use client";

import { motion } from "framer-motion";
import {
  Search,
  Camera,
  Users,
  KeyRound,
} from "lucide-react";
import { BookingButton } from "@/components/booking/BookingButton";

/* ── Step data ──────────────────────────────────────────────────── */
const STEPS = [
  {
    Icon: Search,
    title: "Waardebepaling",
    body: "Vrijblijvende waardebepaling bij u thuis. Wij analyseren de markt en bepalen de optimale vraagprijs.",
  },
  {
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      // Pen-on-file icon drawn manually to avoid icon name uncertainty
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    title: "Opdracht & Strategie",
    body: "Samen stellen we de verkoopstrategie op: prijspositionering, doelgroep en marketingplan.",
  },
  {
    Icon: Camera,
    title: "Presentatie & Marketing",
    body: "Professionele fotografie, plattegronden en publicatie op Funda, sociale media en ons eigen netwerk.",
  },
  {
    Icon: Users,
    title: "Bezichtigingen",
    body: "Wij plannen en begeleiden alle bezichtigingen en houden u dagelijks op de hoogte.",
  },
  {
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      // Handshake icon drawn manually
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
      </svg>
    ),
    title: "Onderhandelen",
    body: "Wij onderhandelen namens u voor de hoogst haalbare prijs en beste voorwaarden.",
  },
  {
    Icon: KeyRound,
    title: "Overdracht",
    body: "Begeleiding bij de notaris tot en met de sleuteloverdracht. Zorgeloos en compleet.",
  },
] as const;

const VIEWPORT = { once: true, margin: "-100px" } as const;

/* ── Section ─────────────────────────────────────────────────────── */
export function VerkopStappenplan() {
  return (
    <section className="py-24 bg-[#0F1B2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-body text-xs font-semibold tracking-widest uppercase text-[#C9A84C] mb-4">
            Het verkoopproces
          </p>
          <h2 className="font-display text-[40px] font-bold text-white leading-tight">
            Van eerste gesprek tot sleuteloverdracht
          </h2>
          <p className="font-body text-base text-white/60 max-w-xl mx-auto mt-4 leading-relaxed">
            Wij begeleiden u stap voor stap door het gehele verkoopproces.
            Transparant, persoonlijk en zonder verrassingen.
          </p>
        </div>

        {/* Steps container — flex-col mobile, grid-cols-6 desktop */}
        <div className="relative">
          {/* Desktop horizontal connector */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[18px] border-t border-dashed border-[#C9A84C]/30 z-0"
            style={{ left: "calc(100% / 12)", right: "calc(100% / 12)" }}
          />

          <div className="flex flex-col lg:grid lg:grid-cols-6 lg:gap-6">
            {STEPS.map(({ Icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-row gap-5 relative z-10 lg:flex-col lg:items-center lg:text-center lg:gap-0"
              >
                {/* Number badge + mobile timeline connector */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-9 h-9 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/15 flex items-center justify-center font-body font-bold text-[#C9A84C] text-sm">
                    {i + 1}
                  </div>
                  {/* Mobile: vertical line between steps */}
                  {i < STEPS.length - 1 && (
                    <div className="w-px bg-[#C9A84C]/20 mt-1 lg:hidden" style={{ minHeight: "40px", flex: "1 1 auto" }} />
                  )}
                </div>

                {/* Icon + title + body */}
                <div className="pb-8 lg:pb-0">
                  <Icon
                    className="h-[22px] w-[22px] text-[#C9A84C] mb-2 lg:mx-auto lg:mt-4 lg:mb-0"
                    aria-hidden="true"
                  />
                  <h3 className="font-body text-[15px] font-semibold text-white mt-0 lg:mt-3">{title}</h3>
                  <p className="font-body text-sm text-white/55 mt-2 leading-relaxed">{body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <BookingButton label="Start met een gratis gesprek" variant="gold" />
        </div>
      </div>
    </section>
  );
}
