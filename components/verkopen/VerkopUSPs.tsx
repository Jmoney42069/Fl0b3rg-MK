"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  MapPin,
  Clock,
  Shield,
  BarChart3,
} from "lucide-react";
import { Star } from "lucide-react";

/* ── USP data ────────────────────────────────────────────────────── */
const USPS = [
  {
    Icon: TrendingUp,
    title: "Maximale verkoopprijs",
    body: "Door slimme prijsstrategie en actieve onderhandeling realiseren wij gemiddeld 98% van de vraagprijs.",
  },
  {
    Icon: MapPin,
    title: "Diepgaande lokale kennis",
    body: "35 jaar ervaring in Bussum, Naarden, Muiden en de hele Gooi & Vechtstreek regio.",
  },
  {
    Icon: Clock,
    title: "Snelle doorlooptijd",
    body: "Gemiddeld 37 dagen van opdracht tot verkoop dankzij ons actieve koopersnetwerk.",
  },
  {
    Icon: Shield,
    title: "NVM Gecertificeerd",
    body: "Als NVM-makelaar werken wij volgens de strengste ethische en professionele normen.",
  },
  {
    Icon: BarChart3,
    title: "Transparante rapportage",
    body: "U ontvangt wekelijks een update over bezichtigingen, interesse en marktbewegingen.",
  },
  {
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
    title: "Persoonlijke begeleiding",
    body: "Eén vaste makelaar van begin tot eind. Altijd bereikbaar, altijd betrokken.",
  },
] as const;

const VIEWPORT = { once: true, margin: "-100px" } as const;

/* ── Section ─────────────────────────────────────────────────────── */
export function VerkopUSPs() {
  return (
    <section className="py-24 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — left-aligned */}
        <div className="mb-12">
          <p className="font-body text-xs font-semibold tracking-widest uppercase text-[#0F1B2D]/50 mb-3">
            Waarom Floberg
          </p>
          <h2
            className="font-display font-bold text-[#0F1B2D] leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
          >
            De lokale specialist met bewezen resultaten
          </h2>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* LEFT — decorative quote card (2/5) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="relative h-full rounded-sm bg-[#0F1B2D] p-8 overflow-hidden">
              {/* Diagonal SVG pattern */}
              <svg
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="verkoop-usp-diag"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <line
                      x1="0"
                      y1="20"
                      x2="20"
                      y2="0"
                      stroke="#C9A84C"
                      strokeWidth="0.5"
                      strokeOpacity="0.08"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#verkoop-usp-diag)" />
              </svg>

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-between h-full min-h-[280px]">
                <div>
                  <p className="font-display italic text-[22px] text-white leading-relaxed">
                    &ldquo;Wij verkopen niet alleen uw woning &mdash; wij verkopen uw verhaal.&rdquo;
                  </p>
                  <p className="font-body text-[13px] text-[#C9A84C] mt-4">
                    &mdash; Familie de Vries, Bussum
                  </p>
                  <div className="flex gap-1 mt-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-[#C9A84C] fill-[#C9A84C]" aria-hidden="true" />
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="font-body text-xs text-white/30 uppercase tracking-widest">
                    Floberg Makelaars · Bussum
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — 6 USP items (3/5) */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6 content-start">
            {USPS.map(({ Icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="flex items-start gap-3 mb-2">
                  <span className="shrink-0 rounded-sm bg-[#C9A84C]/10 p-2">
                    <Icon className="h-5 w-5 text-[#C9A84C]" aria-hidden="true" />
                  </span>
                  <h3 className="font-body text-[15px] font-semibold text-[#0F1B2D] self-center">
                    {title}
                  </h3>
                </div>
                <p className="font-body text-sm text-[#0F1B2D]/60 leading-relaxed pl-[44px]">
                  {body}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
