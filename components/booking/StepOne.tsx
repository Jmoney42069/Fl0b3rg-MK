"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, Key, FileText, MessageCircle } from "lucide-react";

const SERVICES = [
  {
    icon: Home,
    title: "Woning Verkopen",
    sub: "Gratis waardebepaling inbegrepen",
  },
  {
    icon: Key,
    title: "Woning Aankopen",
    sub: "Persoonlijke aankoopbegeleiding",
  },
  {
    icon: FileText,
    title: "Taxatie Aanvragen",
    sub: "Officieel NVM-taxatierapport",
  },
  {
    icon: MessageCircle,
    title: "Kennismakingsgesprek",
    sub: "Vrijblijvend adviesgesprek",
  },
] as const;

interface StepOneProps {
  selectedService: string;
  setSelectedService: (s: string) => void;
  onNext: () => void;
}

export function StepOne({ selectedService, setSelectedService, onNext }: StepOneProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-[28px] font-semibold text-white leading-tight mb-2">
          Waarmee kunnen wij u helpen?
        </h2>
        <p className="font-body text-sm text-[#C9A84C]/70">
          Kies de dienst die aansluit bij uw situatie
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {SERVICES.map(({ icon: Icon, title, sub }, i) => {
          const selected = selectedService === title;
          return (
            <motion.button
              key={title}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              onClick={() => setSelectedService(title)}
              className={[
                "rounded-sm border p-6 text-left transition-all duration-200 cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]",
                selected
                  ? "bg-[#C9A84C]/10 border-[#C9A84C] text-white"
                  : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20",
              ].join(" ")}
            >
              <Icon
                className={[
                  "h-6 w-6 mb-3 transition-colors duration-200",
                  selected ? "text-[#C9A84C]" : "text-white/60",
                ].join(" ")}
                aria-hidden="true"
              />
              <p className="font-body text-sm font-semibold leading-tight mb-1">
                {title}
              </p>
              <p className={[
                "font-body text-xs leading-snug transition-colors duration-200",
                selected ? "text-[#C9A84C]/80" : "text-white/40",
              ].join(" ")}>
                {sub}
              </p>
            </motion.button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!selectedService}
        className={[
          "w-full h-12 rounded-sm font-body text-sm font-semibold transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1B2D]",
          selectedService
            ? "bg-[#C9A84C] text-[#0F1B2D] hover:bg-[#B8972E]"
            : "bg-[#C9A84C]/40 text-[#0F1B2D]/60 opacity-40 cursor-not-allowed",
        ].join(" ")}
      >
        Volgende stap →
      </button>
    </div>
  );
}
