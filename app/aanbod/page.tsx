"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { PROPERTIES } from "@/lib/properties";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";
import { PropertyFilters } from "@/components/listings/PropertyFilters";
import { PropertyGrid } from "@/components/listings/PropertyGrid";

/* ── Simulate loading ────────────────────────────────────────── */
function useSimulatedLoading(ms = 500) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(t);
  }, [ms]);
  return loading;
}

/* ── Page ────────────────────────────────────────────────────── */
export default function AanbodPage() {
  const isLoading = useSimulatedLoading(500);
  const { filters, filtered, updateFilter, resetFilters, activeCount } =
    usePropertyFilters(PROPERTIES);

  return (
    <>
      {/* ── Page Hero ─────────────────────────────────────── */}
      <section className="relative h-52 md:h-64 flex items-end bg-[#0F1B2D]">
        <Image
          src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1600&q=80"
          alt="Luchtfoto van Huizen aan het Gooimeer"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-white/60 text-xs font-body mb-3">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-white">Aanbod</span>
          </nav>

          <h1 className="font-display font-bold text-white text-3xl md:text-4xl leading-tight mb-1">
            Ons Woningaanbod
          </h1>
          <p className="font-body text-white/70 text-base">
            Ontdek beschikbare woningen in Huizen, Bussum en het Gooi
          </p>
        </div>
      </section>

      {/* ── Sticky filter bar ─────────────────────────────── */}
      <PropertyFilters
        filters={filters}
        activeCount={activeCount}
        updateFilter={updateFilter}
        resetFilters={resetFilters}
      />

      {/* ── Grid ──────────────────────────────────────────── */}
      <main className="bg-[#F8F7F4] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <PropertyGrid
            properties={filtered}
            isLoading={isLoading}
            onResetFilters={resetFilters}
          />
        </div>

        {/* ── CTA Banner ──────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-[#1B3A5C] mx-4 sm:mx-6 lg:mx-8 max-w-7xl lg:mx-auto rounded-2xl p-8 md:p-12 mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div className="max-w-lg">
            <h2 className="font-display font-bold text-white text-2xl md:text-3xl mb-2">
              Staat uw woning er niet bij?
            </h2>
            <p className="font-body text-white/70 text-base">
              Neem contact op — wij hebben ook niet-gepubliceerd aanbod beschikbaar.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/contact"
              className="rounded-full bg-[#C9A96E] text-[#1B3A5C] font-body font-semibold text-sm px-7 py-3.5 hover:bg-[#d4b47a] transition-colors"
            >
              Neem contact op
            </Link>
            <Link
              href="/aankopen#zoekopdracht"
              className="rounded-full border border-white/30 text-white font-body font-semibold text-sm px-7 py-3.5 hover:bg-white/10 transition-colors"
            >
              Stel zoekopdracht in
            </Link>
          </div>
        </motion.section>
      </main>
    </>
  );
}
