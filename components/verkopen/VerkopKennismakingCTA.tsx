"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, MapPin, Phone, Mail, Clock } from "lucide-react";
import { BookingModal } from "@/components/booking/BookingModal";

/* ── Data ────────────────────────────────────────────────────────── */
const CHECKLIST = [
  "Gratis en vrijblijvend",
  "Bij u thuis of op ons kantoor",
  "Inclusief marktanalyse en waardebepaling",
  "Binnen 2 werkdagen een afspraak",
] as const;

const CONTACT_ITEMS = [
  { Icon: MapPin, text: "Leeuwenlaan 12, 1402 AK Bussum" },
  { Icon: Phone,  text: "035 694 40 40" },
  { Icon: Mail,   text: "info@floberg.nl" },
  { Icon: Clock,  text: "Ma–Vr: 09:00–17:30 · Za: 10:00–14:00" },
] as const;

const VIEWPORT = { once: true, margin: "-100px" } as const;

/* ── Section ─────────────────────────────────────────────────────── */
export function VerkopKennismakingCTA() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative bg-[#0F1B2D] py-28">
      {/* Gold top border accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Text + checklist ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-xs font-semibold tracking-widest uppercase text-[#C9A84C] mb-4">
              Gratis kennismakingsgesprek
            </p>

            <h2
              className="font-display font-bold text-white leading-tight"
              style={{ fontSize: "clamp(32px, 4vw, 42px)" }}
            >
              Klaar om uw woning te verkopen?
            </h2>

            <p className="font-body text-base text-white/65 mt-4 leading-relaxed">
              Plan vandaag nog een gratis, vrijblijvend kennismakingsgesprek in. Wij komen
              bij u langs, bespreken de mogelijkheden en geven u een eerlijk beeld van de
              huidige marktwaarde van uw woning.
            </p>

            {/* Checklist */}
            <ul className="mt-8 space-y-3" aria-label="Voordelen">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40">
                    <Check className="h-3 w-3 text-[#C9A84C]" aria-hidden="true" />
                  </span>
                  <span className="font-body text-[15px] text-white/80">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA button */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="mt-10 inline-flex items-center rounded-sm bg-[#C9A84C] text-[#0F1B2D] font-body text-base font-semibold px-10 py-4 hover:bg-[#B8972E] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1B2D]"
            >
              Plan uw gratis gesprek in
            </button>
          </motion.div>

          {/* ── RIGHT: Contact card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="rounded-sm border border-white/10 bg-white/5 p-8">
              <p className="font-body text-base font-semibold text-white mb-6">
                Floberg Makelaars
              </p>

              {/* Contact items */}
              <ul className="space-y-4">
                {CONTACT_ITEMS.map(({ Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <Icon className="h-[18px] w-[18px] text-[#C9A84C] shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="font-body text-sm text-white/70 leading-snug">{text}</span>
                  </li>
                ))}
              </ul>

              <div className="my-6 border-t border-white/10" />

              <p className="font-body text-[13px] text-white/50 mb-3">Of bel ons direct:</p>
              <p className="font-display text-[28px] text-white leading-none">035 694 40 40</p>
              <div className="mt-2 h-0.5 w-16 bg-[#C9A84C]" aria-hidden="true" />
            </div>
          </motion.div>

        </div>
      </div>

      <BookingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
}
