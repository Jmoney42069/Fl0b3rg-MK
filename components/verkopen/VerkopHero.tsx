"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { BookingButton } from "@/components/booking/BookingButton";

export function VerkopHero() {
  return (
    <section className="relative min-h-screen bg-[#0F1B2D] flex items-center overflow-hidden">
      {/* ── Background decoration ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -bottom-32 -right-32 h-[500px] w-[700px]"
          style={{
            background: "#C9A84C",
            opacity: 0.06,
            filter: "blur(80px)",
            transform: "rotate(15deg)",
          }}
        />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">

          {/* LEFT — text (60%) */}
          <motion.div
            className="w-full lg:w-3/5"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="font-body text-xs font-semibold tracking-widest uppercase text-[#C9A84C] mb-5">
              Makelaars in Bussum sinds 1987
            </p>

            <h1
              className="font-display font-bold text-white leading-tight mb-6"
              style={{ fontSize: "clamp(42px, 6vw, 72px)" }}
            >
              Verkoop uw woning.
              <br />
              Zonder zorgen,
              <br />
              voor de beste prijs.
            </h1>

            <p className="font-body text-[17px] text-white/65 max-w-lg leading-relaxed">
              Floberg Makelaars begeleidt u van waardebepaling tot sleuteloverdracht.
              Met diepgaande kennis van de lokale markt in Bussum, Naarden en omgeving
              realiseren wij structureel betere verkoopprijzen.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <BookingButton label="Gratis kennismakingsgesprek" variant="gold" />
              <Link
                href="/waardebepaling"
                className="inline-flex items-center rounded-sm border border-[#C9A84C] text-[#C9A84C] px-8 py-3 font-body font-semibold text-sm hover:bg-[#C9A84C]/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1B2D]"
              >
                Wat is mijn woning waard?
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <span className="font-body text-[13px] text-white/60">⭐ 9.2 gemiddeld</span>
              <span className="w-px h-4 bg-white/20" aria-hidden="true" />
              <span className="font-body text-[13px] text-white/60">NVM gecertificeerd</span>
              <span className="w-px h-4 bg-white/20" aria-hidden="true" />
              <span className="font-body text-[13px] text-white/60">35+ jaar lokale expertise</span>
            </div>
          </motion.div>

          {/* RIGHT — property card (40%) */}
          <motion.div
            className="w-full lg:w-2/5"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative aspect-[3/4] max-w-[360px] mx-auto rounded-sm overflow-hidden bg-gradient-to-br from-[#1a2d45] to-[#0F1B2D] flex items-center justify-center shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
              <Home className="h-20 w-20 text-white opacity-10" aria-hidden="true" />

              {/* Sold badge */}
              <div className="absolute bottom-4 left-4 bg-white rounded-sm px-4 py-3 shadow-xl">
                <p className="font-body text-[10px] font-bold text-[#C9A84C] uppercase tracking-widest">
                  Verkocht
                </p>
                <p className="font-display text-lg font-bold text-[#0F1B2D] leading-tight mt-0.5">
                  € 847.500
                </p>
              </div>

              {/* Bids badge */}
              <div className="absolute top-4 right-4 bg-[#C9A84C] rounded-sm px-3 py-1">
                <p className="font-body text-xs font-bold text-[#0F1B2D]">5 BIEDINGEN</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
