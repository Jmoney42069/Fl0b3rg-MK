import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { TeamSection } from "@/components/team/TeamSection";
import { ReviewsSlider } from "@/components/reviews/ReviewsSlider";
import { TrustBarFull } from "@/components/trust/TrustBar";
import { StatCounter } from "@/components/trust/StatCounter";

import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  pageTitle: "Ons Team",
  pageDescription:
    "Ontmoet de makelaars van Floberg Makelaardij — NVM-gecertificeerd, lokaal geworteld in het Gooi en gefocust op uw succes.",
  pagePath: "/over-ons",
});

/* ── Framer variants ─────────────────────────────────────────── */

export default function OverOnsPage() {
  return (
    <>
      {/* ── 1. PAGE HERO ──────────────────────────────────── */}
      <section className="relative h-64 md:h-80 flex items-end bg-[#0F1B2D]">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
          alt="Luchtfoto Gooi regio"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-white/60 text-xs font-body mb-3"
          >
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-white">Over ons</span>
          </nav>

          <div>
            <h1 className="font-display font-bold text-white text-3xl md:text-5xl leading-tight mb-2">
              Ons Team
            </h1>
            <p className="font-body text-white/70 text-lg italic">
              Persoonlijk, betrokken en altijd bereikbaar — dat is Floberg
            </p>
</div>
        </div>
      </section>

      {/* ── 2. INTRO TEKST BLOK ───────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-0.5 w-16 bg-[#C9A96E] mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display font-bold text-[#1A1A1A] text-2xl leading-snug">
                Floberg — Fanatiek, energiek en midden in uw markt.
              </h2>
            </div>
            <div>
              <p className="font-body text-[#6B7280] leading-relaxed text-base">
                Floberg Makelaardij is al meer dan 25 jaar actief in Huizen, Bussum en de
                wijde omgeving van het Gooi. Als NVM-gecertificeerd kantoor kennen wij elke
                wijk, elk type woning en elke marktbeweging in de regio. Wij geloven in
                persoonlijk contact, eerlijk advies en resultaat dat echt telt — voor verkopers
                én kopers.
              </p>
              <p className="font-body text-[#6B7280] leading-relaxed text-base mt-4">
                Onze Trustoo-score van{" "}
                <span className="font-semibold text-[#C9A96E]">9.1</span> is het bewijs dat
                klanten onze aanpak waarderen. Geen callcenters, geen onbekende gezichten —
                alleen ervaren makelaars die u van begin tot einde begeleiden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. STAT COUNTERS ──────────────────────────────── */}
      <StatCounter />

      {/* ── 4. TEAM SECTIE ────────────────────────────────── */}
      <TeamSection />

      {/* ── 5. TRUST BAR ──────────────────────────────────── */}
      <TrustBarFull />

      {/* ── 6. REVIEWS SLIDER ─────────────────────────────── */}
      <ReviewsSlider />

      {/* ── 7. CTA SECTIE ─────────────────────────────────── */}
      <section
        className="py-20"
        style={{
          background: "linear-gradient(135deg, #1B3A5C 0%, #2A5280 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              <p className="font-body text-[#C9A96E] text-sm font-semibold tracking-widest uppercase mb-3">
                Samenwerken
              </p>
              <h2 className="font-display font-bold text-white text-3xl md:text-4xl leading-tight mb-4">
                Klaar om samen te werken?
              </h2>
              <p className="font-body text-white/70 text-lg leading-relaxed">
                Of u nu wilt verkopen, aankopen of een taxatie nodig heeft — neem vandaag nog
                contact op met een van onze makelaars.
              </p>
            </div>

            {/* Right */}
            <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
              <Link
                href="/afspraak"
                className="inline-flex items-center justify-center rounded-full bg-white text-[#1B3A5C] font-body font-semibold text-sm px-8 py-4 hover:bg-[#F8F7F4] transition-colors"
              >
                Maak een afspraak
              </Link>
              <Link
                href="/aanbod"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/40 text-white font-body font-semibold text-sm px-8 py-4 hover:bg-white/10 transition-colors"
              >
                Bekijk ons aanbod
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
