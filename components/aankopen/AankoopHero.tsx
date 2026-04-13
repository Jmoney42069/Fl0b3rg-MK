"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookingButton } from "@/components/booking/BookingButton";

export function AankoopHero() {
  return (
    <section
      className="relative min-h-screen bg-[#F5F0E8] flex items-center overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle, #0F1B2D 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        backgroundPosition: "0 0",
      }}
    >
      {/* Blob decoration top-left */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="absolute -top-32 -left-32 w-[600px] h-[500px]"
          viewBox="0 0 600 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "blur(100px)" }}
        >
          <path
            d="M300 50 C420 50 520 150 520 250 C520 380 400 450 280 430 C140 410 60 310 80 180 C100 60 200 50 300 50Z"
            fill="#0F1B2D"
            opacity="0.05"
          />
        </svg>
        {/* Repeat dot grid on top for 4% global overlay matching color */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #0F1B2D 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        {/* flex-col-reverse: text (DOM second) appears on top on mobile */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">

          {/* LEFT — property cards (40%) */}
          <motion.div
            className="w-full lg:w-2/5 flex justify-center"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative w-64 sm:w-72 scale-[0.85] sm:scale-100">

              {/* Notification badge */}
              <div className="absolute -top-4 -right-4 z-20 bg-[#0F1B2D] rounded-sm px-4 py-3 shadow-lg">
                <p className="font-body text-xs font-medium text-white">
                  🔔 Nieuwe woning beschikbaar
                </p>
                <p className="font-body text-[11px] text-[#C9A84C]/80 mt-0.5">
                  Nog niet op Funda
                </p>
              </div>

              {/* Card 1 — back */}
              <div
                className="absolute top-6 left-4 bg-white shadow-xl rounded-sm p-5 w-64"
                style={{ transform: "rotate(-3deg)" }}
                aria-hidden="true"
              >
                <div className="aspect-video rounded-sm overflow-hidden bg-gradient-to-br from-[#e8e0d0] to-[#d4c9b5] relative">
                  <span className="absolute top-2 left-2 bg-[#C9A84C] text-[#0F1B2D] text-[10px] font-bold px-2 py-0.5 rounded-sm">
                    Beschikbaar
                  </span>
                </div>
                <p className="font-body text-[13px] font-medium text-[#0F1B2D] mt-3">
                  Brediusweg 42, Bussum
                </p>
                <p className="font-body text-sm font-bold text-[#0F1B2D]">
                  € 625.000 k.k.
                </p>
              </div>

              {/* Card 2 — front */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", repeatType: "loop" }}
                className="relative z-10 bg-white shadow-2xl rounded-sm p-5 w-64 mt-16 ml-8"
              >
                <div className="aspect-video rounded-sm overflow-hidden bg-gradient-to-br from-[#e8e0d0] to-[#d4c9b5] relative">
                  <span className="absolute top-2 left-2 bg-[#0F1B2D] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                    Nieuw
                  </span>
                </div>
                <p className="font-body text-[13px] font-medium text-[#0F1B2D] mt-3">
                  Componistenlaan 8, Naarden
                </p>
                <p className="font-body text-sm font-bold text-[#0F1B2D]">
                  € 785.000 k.k.
                </p>
                <p className="font-body text-[12px] text-[#0F1B2D]/50 mt-1">
                  4 kamers · 142 m²
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT — text (60%) */}
          <motion.div
            className="w-full lg:w-3/5"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="font-body text-xs font-semibold tracking-widest uppercase text-[#C9A84C] mb-5">
              Aankoopbegeleiding in de Gooi &amp; Vechtstreek
            </p>

            <h1
              className="font-display font-bold text-[#0F1B2D] leading-tight mb-6"
              style={{ fontSize: "clamp(42px, 6vw, 72px)" }}
            >
              Vind uw droomwoning.
              <br />
              Met een specialist
              <br />
              aan uw zijde.
            </h1>

            <p className="font-body text-[17px] text-[#0F1B2D]/65 max-w-lg leading-relaxed mt-6">
              Als aankoopmakelaar onderhandelen wij namens u, signaleren wij kansen vóór ze
              op Funda verschijnen en beschermen wij uw belangen van eerste bezichtiging tot
              sleuteloverdracht.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <BookingButton label="Gratis kennismakingsgesprek" variant="gold" />
              <a
                href="#zoekopdracht"
                className="inline-flex items-center rounded-sm border border-[#0F1B2D] text-[#0F1B2D] px-8 py-3 font-body font-semibold text-sm hover:bg-[#0F1B2D]/5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1B2D] focus-visible:ring-offset-2"
              >
                Geef uw zoekopdracht op
              </a>
            </div>

            {/* Trust signals */}
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <span className="font-body text-[13px] text-[#0F1B2D]/55">🔑 500+ aankopen begeleid</span>
              <span className="w-px h-4 bg-[#0F1B2D]/20" aria-hidden="true" />
              <span className="font-body text-[13px] text-[#0F1B2D]/55">NVM gecertificeerd</span>
              <span className="w-px h-4 bg-[#0F1B2D]/20" aria-hidden="true" />
              <span className="font-body text-[13px] text-[#0F1B2D]/55">No cure, no pay mogelijk</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
