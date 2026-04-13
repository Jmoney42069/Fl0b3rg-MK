"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { BookingModal } from "@/components/booking/BookingModal";

export function VerkopWaardebepalingCTA() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-20 bg-[#0F1B2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="max-w-3xl mx-auto rounded-sm border border-[#C9A84C]/25 bg-gradient-to-br from-[#C9A84C]/15 to-transparent px-8 py-14 sm:px-12 text-center"
        >
          <Home className="h-8 w-8 text-[#C9A84C] mx-auto" aria-hidden="true" />

          <h2 className="font-display text-[36px] font-bold text-white mt-4 leading-tight">
            Wat is uw woning waard?
          </h2>

          <p className="font-body text-base text-white/65 mt-3 max-w-lg mx-auto leading-relaxed">
            Ontvang binnen 24 uur een vrijblijvende waardebepaling van een NVM-makelaar
            die de lokale markt als geen ander kent.
          </p>

          {/* Feature pills */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            {["✓ Gratis & vrijblijvend", "✓ Reactie binnen 24 uur", "✓ NVM gecertificeerd"].map(
              (pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-[#C9A84C]/30 px-4 py-1.5 font-body text-xs text-[#C9A84C]"
                >
                  {pill}
                </span>
              )
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="mt-8 rounded-sm bg-[#C9A84C] text-[#0F1B2D] font-body font-semibold text-sm px-8 py-3 hover:bg-[#B8972E] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1B2D]"
          >
            Gratis waardebepaling aanvragen
          </button>
        </motion.div>
      </div>

      <BookingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
}
