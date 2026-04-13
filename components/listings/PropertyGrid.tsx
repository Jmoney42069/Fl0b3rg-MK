"use client";

import { useState } from "react";
import { Home } from "lucide-react";
import type { Property } from "@/types/property";
import { PropertyCard } from "@/components/listings/PropertyCard";

const PAGE_SIZE = 6;

/* ── Skeleton card ───────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-6 bg-gray-200 rounded w-2/5 mt-2" />
        <div className="flex gap-4 mt-3">
          <div className="h-3 bg-gray-200 rounded w-24" />
          <div className="h-3 bg-gray-200 rounded w-16" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>
        <div className="h-px bg-gray-100 mt-3" />
        <div className="h-3 bg-gray-200 rounded w-1/3 mt-2" />
      </div>
    </div>
  );
}

/* ── Empty state ─────────────────────────────────────────────── */
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <Home size={56} className="text-gray-300 mb-4" />
      <h3 className="font-display font-semibold text-[#1A1A1A] text-xl mb-2">
        Geen woningen gevonden
      </h3>
      <p className="font-body text-[#6B7280] text-base mb-6 max-w-xs">
        Pas je filters aan of bekijk al ons aanbod
      </p>
      <button
        type="button"
        onClick={onReset}
        className="rounded-full bg-[#1B3A5C] text-white font-body font-semibold px-8 py-3 text-sm hover:bg-[#162f4a] transition-colors"
      >
        Filters wissen
      </button>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────── */
interface PropertyGridProps {
  properties: Property[];
  isLoading?: boolean;
  onResetFilters: () => void;
}

export function PropertyGrid({
  properties,
  isLoading = false,
  onResetFilters,
}: PropertyGridProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visible = properties.slice(0, visibleCount);
  const hasMore = properties.length > visibleCount;

  return (
    <div>
      {/* Result count */}
      {!isLoading && (
        <p className="font-body text-sm text-[#6B7280] mb-6">
          {properties.length === 0
            ? "Geen resultaten"
            : `${properties.length} ${properties.length === 1 ? "woning" : "woningen"} gevonden`}
        </p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {isLoading
          ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : properties.length === 0
          ? <EmptyState onReset={onResetFilters} />
          : visible.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
      </div>

      {/* Load more */}
      {!isLoading && hasMore && (
        <div className="flex justify-center mt-12">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="rounded-full border-2 border-[#1B3A5C] text-[#1B3A5C] font-body font-semibold px-10 py-3 text-sm hover:bg-[#1B3A5C] hover:text-white transition-colors"
          >
            Laad meer woningen ({properties.length - visibleCount} resterend)
          </button>
        </div>
      )}
    </div>
  );
}
