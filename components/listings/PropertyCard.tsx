"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BedDouble, Ruler, CalendarDays, ArrowRight } from "lucide-react";
import type { Property } from "@/types/property";
import { PropertyBadge, EnergyBadge } from "@/components/listings/PropertyBadge";

/* ── Type label mapping ──────────────────────────────────────── */
const TYPE_LABELS: Record<string, string> = {
  appartement: "Appartement",
  tussenwoning: "Tussenwoning",
  hoekwoning: "Hoekwoning",
  "twee-onder-een-kap": "Twee-onder-één-kap",
  vrijstaand: "Vrijstaand",
};

/* ── Framer variants ─────────────────────────────────────────── */
export const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

/* ── Component ───────────────────────────────────────────────── */
export function PropertyCard({
  property,
  index = 0,
}: {
  property: Property;
  index?: number;
}) {
  const isSold = property.status === "verkocht";

  return (
    <motion.div
      custom={index}
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.25 }}
      className="group rounded-2xl bg-white border border-gray-100 overflow-hidden flex flex-col"
    >
      <Link href={`/aanbod/${property.slug}`} className="flex flex-col flex-1">
        {/* ── Image area ───────────────────────────────────── */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={property.images[0]}
            alt={`${property.address.street}, ${property.address.city}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
              isSold ? "opacity-70 grayscale" : ""
            }`}
          />

          {/* Sold overlay */}
          {isSold && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="font-display font-bold text-white text-2xl tracking-wider rotate-[-12deg] border-4 border-white/60 px-4 py-1 rounded">
                VERKOCHT
              </span>
            </div>
          )}

          {/* Status badge — top left */}
          <div className="absolute top-3 left-3">
            <PropertyBadge status={property.status} />
          </div>

          {/* Energy label — top right */}
          <div className="absolute top-3 right-3">
            <EnergyBadge label={property.energyLabel} />
          </div>
        </div>

        {/* ── Info area ─────────────────────────────────────── */}
        <div className="p-5 flex flex-col flex-1">
          {/* Type label */}
          <p className="font-body text-[10px] uppercase tracking-widest text-[#6B7280] mb-1">
            {TYPE_LABELS[property.type]}
          </p>

          {/* Address */}
          <h3 className="font-body font-semibold text-[#1A1A1A] text-base leading-snug mb-0.5">
            {property.address.street}
          </h3>
          <p className="font-body text-[#6B7280] text-sm mb-3">
            {property.address.postalCode} {property.address.city}
          </p>

          {/* Price */}
          <p className="font-display font-bold text-[#1B3A5C] text-xl mb-4">
            {property.priceLabel}
          </p>

          {/* Key stats */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-5">
            <span className="flex items-center gap-1.5 font-body text-sm text-[#6B7280]">
              <BedDouble size={15} className="text-[#C9A96E] shrink-0" />
              {property.bedrooms} slaapkamers
            </span>
            <span className="flex items-center gap-1.5 font-body text-sm text-[#6B7280]">
              <Ruler size={15} className="text-[#C9A96E] shrink-0" />
              {property.surfaceArea} m²
            </span>
            <span className="flex items-center gap-1.5 font-body text-sm text-[#6B7280]">
              <CalendarDays size={15} className="text-[#C9A96E] shrink-0" />
              {property.buildYear}
            </span>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Agent + CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
            {/* Agent */}
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-6 rounded-full overflow-hidden bg-gray-200 shrink-0">
                <Image
                  src={property.agent.photo}
                  alt={property.agent.name}
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </div>
              <span className="font-body text-xs text-[#6B7280]">
                {property.agent.name}
              </span>
            </div>

            {/* CTA — visible on hover */}
            <span className="inline-flex items-center gap-1 font-body text-xs font-semibold text-[#1B3A5C] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Bekijk woning
              <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
