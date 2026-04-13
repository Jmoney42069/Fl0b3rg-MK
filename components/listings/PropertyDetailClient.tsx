"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BedDouble,
  Bath,
  Ruler,
  CalendarDays,
  MapPin,
  Phone,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  ExternalLink,
} from "lucide-react";
import type { Property } from "@/types/property";
import { PropertyBadge, EnergyBadge } from "@/components/listings/PropertyBadge";
import { PropertyCard } from "@/components/listings/PropertyCard";

/* ── Type label mapping ──────────────────────────────────────── */
const TYPE_LABEL: Record<string, string> = {
  appartement: "Appartement",
  tussenwoning: "Tussenwoning",
  hoekwoning: "Hoekwoning",
  "twee-onder-een-kap": "Twee-onder-één-kap",
  vrijstaand: "Vrijstaand",
};

const STATUS_LABEL: Record<string, string> = {
  beschikbaar: "Beschikbaar",
  "onder-bod": "Onder bod",
  verkocht: "Verkocht",
  "open-huis": "Open huis",
};

/* ── Lightbox ─────────────────────────────────────────────────── */
function Lightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(initialIndex);

  const prev = useCallback(
    () => setIdx((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setIdx((i) => (i + 1) % images.length),
    [images.length]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Sluiten"
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
      >
        <X size={22} />
      </button>

      {/* Prev */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); prev(); }}
        aria-label="Vorige foto"
        className="absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Image */}
      <div
        className="relative w-full max-w-4xl mx-16 aspect-[4/3]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[idx]}
          alt={`Foto ${idx + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 896px"
          className="object-contain"
        />
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); next(); }}
        aria-label="Volgende foto"
        className="absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
      >
        <ChevronRight size={28} />
      </button>

      {/* Counter */}
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-body">
        {idx + 1} / {images.length}
      </span>
    </motion.div>
  );
}

/* ── Gallery ──────────────────────────────────────────────────── */
function Gallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <>
      {/* Desktop: main + 2 thumbnails */}
      <div className="hidden md:grid grid-cols-[2fr_1fr] gap-2 h-[420px] rounded-2xl overflow-hidden cursor-pointer">
        <div
          className="relative"
          onClick={() => setLightboxIdx(0)}
          title="Klik om te vergroten"
        >
          <Image
            src={images[0]}
            alt={title}
            fill
            priority
            sizes="(max-width: 1280px) 60vw, 768px"
            className="object-cover hover:opacity-95 transition"
          />
          <span className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 text-white text-xs font-body rounded px-2 py-1">
            <ExternalLink size={11} />
            Alle foto's
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {images.slice(1, 3).map((src, i) => (
            <div
              key={i}
              className="relative flex-1 cursor-pointer"
              onClick={() => setLightboxIdx(i + 1)}
            >
              <Image
                src={src}
                alt={`${title} foto ${i + 2}`}
                fill
                sizes="200px"
                className="object-cover hover:opacity-95 transition"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: horizontal scroll strip */}
      <div className="md:hidden flex overflow-x-auto gap-3 pb-1 snap-x snap-mandatory -mx-4 px-4">
        {images.map((src, i) => (
          <div
            key={i}
            className="relative shrink-0 w-[80vw] h-56 snap-start rounded-xl overflow-hidden cursor-pointer"
            onClick={() => setLightboxIdx(i)}
          >
            <Image
              src={src}
              alt={`${title} foto ${i + 1}`}
              fill
              sizes="80vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            images={images}
            initialIndex={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Mini contact form sidebar ───────────────────────────────── */
function ContactForm({ property }: { property: Property }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-[#F8F7F4] rounded-2xl p-6 border border-[#E5E7EB]">
      <h3 className="font-body font-semibold text-[#1A1A1A] text-base mb-4">
        Stel een vraag over deze woning
      </h3>

      {sent ? (
        <div className="flex flex-col items-center py-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700 mb-3">
            <Check size={22} />
          </div>
          <p className="font-body font-semibold text-[#1A1A1A] text-sm mb-1">
            Bericht ontvangen!
          </p>
          <p className="font-body text-[#6B7280] text-xs">
            Wij nemen binnen één werkdag contact op.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Uw naam"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm font-body text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/30"
          />
          <input
            type="email"
            placeholder="E-mailadres"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm font-body text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/30"
          />
          <input
            type="tel"
            placeholder="Telefoonnummer"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm font-body text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/30"
          />
          <textarea
            placeholder={`Ik ben geïnteresseerd in ${property.address.street}…`}
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm font-body text-[#1A1A1A] placeholder-[#9CA3AF] resize-none focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/30"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-[#1B3A5C] text-white font-body font-semibold py-3 text-sm hover:bg-[#162f4a] transition-colors"
          >
            Verstuur bericht
          </button>
        </form>
      )}
    </div>
  );
}

/* ── Main client component ───────────────────────────────────── */
export function PropertyDetailClient({
  property,
  related,
}: {
  property: Property;
  related: Property[];
}) {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${property.address.street} – Floberg Makelaars`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="bg-[#F8F7F4]">
      {/* ── Breadcrumb ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <nav className="flex items-center gap-1.5 text-[#6B7280] text-xs font-body">
          <Link href="/" className="hover:text-[#1B3A5C] transition">Home</Link>
          <ChevronRight size={12} />
          <Link href="/aanbod" className="hover:text-[#1B3A5C] transition">Aanbod</Link>
          <ChevronRight size={12} />
          <span className="text-[#1A1A1A]">{property.address.street}</span>
        </nav>
      </div>

      {/* ── Gallery ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Gallery images={property.images} title={property.title} />
      </div>

      {/* ── Header ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <PropertyBadge status={property.status} />
              <EnergyBadge label={property.energyLabel} />
            </div>
            <h1 className="font-display font-bold text-[#1A1A1A] text-2xl md:text-3xl mb-1">
              {property.address.street}
            </h1>
            <p className="flex items-center gap-1 font-body text-[#6B7280] text-base">
              <MapPin size={14} />
              {property.address.postalCode} {property.address.city}
            </p>
            <p className="font-display font-bold text-[#1B3A5C] text-3xl mt-3">
              {property.priceLabel}
            </p>

            {/* Key stats */}
            <div className="flex flex-wrap gap-5 mt-4">
              <span className="flex items-center gap-1.5 font-body text-sm text-[#6B7280]">
                <Ruler size={16} className="text-[#C9A96E]" />
                {property.surfaceArea} m² wonen
              </span>
              <span className="flex items-center gap-1.5 font-body text-sm text-[#6B7280]">
                <BedDouble size={16} className="text-[#C9A96E]" />
                {property.bedrooms} slaapkamers
              </span>
              <span className="flex items-center gap-1.5 font-body text-sm text-[#6B7280]">
                <Bath size={16} className="text-[#C9A96E]" />
                {property.bathrooms} badkamers
              </span>
              <span className="flex items-center gap-1.5 font-body text-sm text-[#6B7280]">
                <CalendarDays size={16} className="text-[#C9A96E]" />
                Bouwjaar {property.buildYear}
              </span>
            </div>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex flex-col gap-3 shrink-0">
            <Link
              href="/afspraak"
              className="rounded-full bg-[#1B3A5C] text-white font-body font-semibold text-sm px-8 py-3.5 hover:bg-[#162f4a] transition-colors text-center"
            >
              Plan een bezichtiging
            </Link>
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center justify-center gap-2 rounded-full border border-[#E5E7EB] text-[#1A1A1A] font-body font-semibold text-sm px-8 py-3 hover:bg-gray-50 transition-colors"
            >
              <Share2 size={16} />
              Deel deze woning
            </button>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* LEFT — 2/3 */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <section>
              <h2 className="font-display font-bold text-[#1A1A1A] text-xl mb-4">
                Over deze woning
              </h2>
              <p className="font-body text-[#1A1A1A] leading-relaxed text-base">
                {property.description}
              </p>
            </section>

            {/* Features */}
            <section>
              <h2 className="font-display font-bold text-[#1A1A1A] text-xl mb-4">
                Kenmerken
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-8">
                {property.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 font-body text-sm text-[#1A1A1A]">
                    <Check size={15} className="text-[#C9A96E] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            {/* Details table */}
            <section>
              <h2 className="font-display font-bold text-[#1A1A1A] text-xl mb-4">
                Details
              </h2>
              <div className="rounded-2xl border border-[#E5E7EB] overflow-hidden bg-white">
                {[
                  ["Type woning", TYPE_LABEL[property.type]],
                  ["Bouwjaar", String(property.buildYear)],
                  [
                    "Perceeloppervlak",
                    property.plotSize > 0 ? `${property.plotSize} m²` : "n.v.t.",
                  ],
                  ["Woonoppervlak", `${property.surfaceArea} m²`],
                  ["Slaapkamers", String(property.bedrooms)],
                  ["Badkamers", String(property.bathrooms)],
                  ["Energielabel", property.energyLabel],
                  ["Status", STATUS_LABEL[property.status]],
                  ["Regio", property.address.region],
                  ["Postcode", property.address.postalCode],
                ].map(([key, value], i) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between px-5 py-3 font-body text-sm ${
                      i % 2 === 0 ? "bg-white" : "bg-[#F8F7F4]"
                    }`}
                  >
                    <span className="text-[#6B7280]">{key}</span>
                    <span className="font-medium text-[#1A1A1A]">{value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT sticky sidebar — 1/3 */}
          <div className="space-y-6 lg:sticky lg:top-[80px] self-start">
            {/* Agent card */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
              <p className="font-body text-xs uppercase tracking-widest text-[#6B7280] mb-3">
                Uw makelaar
              </p>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                  <Image
                    src={property.agent.photo}
                    alt={property.agent.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-body font-semibold text-[#1A1A1A] text-sm">
                    {property.agent.name}
                  </p>
                  <p className="font-body text-xs text-[#6B7280]">
                    Floberg Makelaars
                  </p>
                </div>
              </div>
              <a
                href={`tel:${property.agent.phone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#1B3A5C] text-white font-body font-semibold text-sm py-3 hover:bg-[#162f4a] transition-colors"
              >
                <Phone size={15} />
                Bel direct — {property.agent.phone}
              </a>

              {/* NVM */}
              <div className="mt-4 flex items-center gap-2 pt-4 border-t border-[#E5E7EB]">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-[#1B3A5C] text-white font-bold text-xs shrink-0">
                  NVM
                </div>
                <span className="font-body text-xs text-[#6B7280]">
                  NVM gecertificeerd makelaar
                </span>
              </div>
            </div>

            {/* Contact form */}
            <ContactForm property={property} />
          </div>
        </div>
      </div>

      {/* ── Related properties ───────────────────────────── */}
      {related.length > 0 && (
        <div className="bg-white border-t border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <h2 className="font-display font-bold text-[#1A1A1A] text-2xl mb-8">
              Bekijk ook deze woningen
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile sticky bottom bar ─────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E7EB] px-4 py-3 flex gap-3">
        <Link
          href="/afspraak"
          className="flex-1 rounded-xl bg-[#1B3A5C] text-white font-body font-semibold text-sm py-3.5 text-center hover:bg-[#162f4a] transition-colors"
        >
          Plan bezichtiging
        </Link>
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center justify-center h-12 w-12 rounded-xl border border-[#E5E7EB] text-[#6B7280] hover:bg-gray-50 transition-colors shrink-0"
          aria-label="Deel"
        >
          <Share2 size={18} />
        </button>
      </div>

      {/* Bottom padding on mobile for the sticky bar */}
      <div className="md:hidden h-20" />
    </div>
  );
}
