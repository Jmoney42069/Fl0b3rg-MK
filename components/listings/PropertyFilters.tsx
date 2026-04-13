"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import type { PropertyFilters, PropertyType, PropertyRegion, PriceRange, SortOption } from "@/types/property";

/* ── Constants ───────────────────────────────────────────────── */
const PRICE_RANGES: { value: PriceRange; label: string }[] = [
  { value: "all", label: "Alle prijzen" },
  { value: "to-400", label: "Tot € 400.000" },
  { value: "400-600", label: "€ 400k – € 600k" },
  { value: "600-800", label: "€ 600k – € 800k" },
  { value: "800-1000", label: "€ 800k – € 1.000k" },
  { value: "above-1000", label: "Boven € 1.000k" },
];

const TYPES: { value: PropertyType; label: string }[] = [
  { value: "appartement", label: "Appartement" },
  { value: "tussenwoning", label: "Tussenwoning" },
  { value: "hoekwoning", label: "Hoekwoning" },
  { value: "twee-onder-een-kap", label: "Twee-onder-één-kap" },
  { value: "vrijstaand", label: "Vrijstaand" },
];

const REGIONS: { value: PropertyRegion | "all"; label: string }[] = [
  { value: "all", label: "Alle regio's" },
  { value: "Huizen", label: "Huizen" },
  { value: "Bussum", label: "Bussum" },
  { value: "Naarden", label: "Naarden" },
  { value: "Blaricum", label: "Blaricum" },
  { value: "Laren", label: "Laren" },
  { value: "Hilversum", label: "Hilversum" },
];

const BEDROOM_OPTIONS: { value: number | null; label: string }[] = [
  { value: null, label: "Alle" },
  { value: 2, label: "2+" },
  { value: 3, label: "3+" },
  { value: 4, label: "4+" },
  { value: 5, label: "5+" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Nieuwste eerst" },
  { value: "price-asc", label: "Prijs oplopend" },
  { value: "price-desc", label: "Prijs aflopend" },
  { value: "surface-desc", label: "Oppervlakte" },
];

/* ── Shared select style ─────────────────────────────────────── */
const SELECT_CLS =
  "appearance-none bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 pr-8 text-sm font-body text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/30 cursor-pointer";

/* ── Props ───────────────────────────────────────────────────── */
interface PropertyFiltersProps {
  filters: PropertyFilters;
  activeCount: number;
  updateFilter: <K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) => void;
  resetFilters: () => void;
}

/* ── Filter row content (reused desktop + mobile) ───────────── */
function FiltersContent({
  filters,
  updateFilter,
  resetFilters,
  activeCount,
}: PropertyFiltersProps) {
  const toggleType = (type: PropertyType) => {
    const current = filters.types;
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    updateFilter("types", updated);
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Prijs */}
      <div className="relative">
        <select
          aria-label="Prijsfilter"
          value={filters.priceRange}
          onChange={(e) => updateFilter("priceRange", e.target.value as PriceRange)}
          className={SELECT_CLS}
        >
          {PRICE_RANGES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B7280]" />
      </div>

      {/* Woningtype pills */}
      <div className="flex flex-wrap gap-1.5">
        {TYPES.map((t) => {
          const active = filters.types.includes(t.value);
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => toggleType(t.value)}
              className={`rounded-full px-3 py-1.5 text-xs font-body font-medium transition border ${
                active
                  ? "bg-[#1B3A5C] text-white border-[#1B3A5C]"
                  : "bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#1B3A5C]/40"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Regio */}
      <div className="relative">
        <select
          aria-label="Regiofilter"
          value={filters.region}
          onChange={(e) => updateFilter("region", e.target.value as PropertyRegion | "all")}
          className={SELECT_CLS}
        >
          {REGIONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B7280]" />
      </div>

      {/* Kamers */}
      <div className="flex items-center gap-1 bg-white border border-[#E5E7EB] rounded-lg px-1.5 py-1.5">
        {BEDROOM_OPTIONS.map((b) => {
          const active = filters.minBedrooms === b.value;
          return (
            <button
              key={String(b.value)}
              type="button"
              onClick={() => updateFilter("minBedrooms", b.value)}
              className={`rounded-md px-2.5 py-1 text-xs font-body font-medium transition ${
                active
                  ? "bg-[#1B3A5C] text-white"
                  : "text-[#6B7280] hover:bg-gray-100"
              }`}
            >
              {b.label}
            </button>
          );
        })}
      </div>

      {/* Reset */}
      {activeCount > 0 && (
        <button
          type="button"
          onClick={resetFilters}
          className="flex items-center gap-1 text-xs font-body text-[#6B7280] hover:text-[#1B3A5C] transition"
        >
          <X size={13} />
          Wissen
        </button>
      )}

      {/* Sort — pushed to right on desktop */}
      <div className="relative ml-auto">
        <select
          aria-label="Sorteren"
          value={filters.sort}
          onChange={(e) => updateFilter("sort", e.target.value as SortOption)}
          className={SELECT_CLS}
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B7280]" />
      </div>
    </div>
  );
}

/* ── Main export ─────────────────────────────────────────────── */
export function PropertyFilters(props: PropertyFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Desktop / tablet filter bar ─────────────────── */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" as const }}
        className="sticky top-[64px] z-30 hidden md:block bg-white border-b border-[#E5E7EB] shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <FiltersContent {...props} />
        </div>
      </motion.div>

      {/* ── Mobile filter toggle ─────────────────────────── */}
      <div className="md:hidden sticky top-[64px] z-30 bg-white border-b border-[#E5E7EB] shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex items-center gap-2 text-sm font-body font-medium text-[#1A1A1A]"
          >
            <SlidersHorizontal size={16} className="text-[#1B3A5C]" />
            Filters
            {props.activeCount > 0 && (
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#1B3A5C] text-white text-[10px] font-bold">
                {props.activeCount}
              </span>
            )}
          </button>

          {/* Mobile sort */}
          <div className="relative">
            <select
              aria-label="Sorteren"
              value={props.filters.sort}
              onChange={(e) => props.updateFilter("sort", e.target.value as SortOption)}
              className={SELECT_CLS}
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown size={12} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#6B7280]" />
          </div>
        </div>
      </div>

      {/* ── Mobile bottom sheet ───────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Scrim */}
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
            />

            {/* Sheet */}
            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
              className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white rounded-t-2xl shadow-2xl"
            >
              {/* Handle */}
              <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#E5E7EB]">
                <h3 className="font-body font-semibold text-[#1A1A1A]">Filters</h3>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Sluit filters"
                >
                  <X size={20} className="text-[#6B7280]" />
                </button>
              </div>

              <div className="px-5 py-5">
                <FiltersContent {...props} />
              </div>

              <div className="px-5 pb-6">
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="w-full rounded-xl bg-[#1B3A5C] text-white font-body font-semibold py-3.5 text-sm"
                >
                  Resultaten tonen
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
