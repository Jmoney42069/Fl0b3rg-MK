"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTestimonialSlider } from "@/hooks/useTestimonialSlider";

/* ── Testimonials data ───────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: "Familie Van der Berg",
    location: "Bussum",
    rating: 5,
    text: "Floberg heeft onze woning in 3 weken verkocht voor meer dan de vraagprijs. De communicatie was uitstekend en we voelden ons altijd goed geïnformeerd.",
  },
  {
    name: "M. Janssen",
    location: "Naarden",
    rating: 5,
    text: "Na een teleurstellende ervaring met een andere makelaar was Floberg een verademing. Persoonlijk, professioneel en resultaatgericht.",
  },
  {
    name: "Familie Pieterse",
    location: "Muiden",
    rating: 5,
    text: "De waardebepaling was verrassend accuraat en het verkoopproces verliep soepeler dan we hadden verwacht. Zeer tevreden!",
  },
  {
    name: "R. de Groot",
    location: "Bussum",
    rating: 5,
    text: "Uitstekende begeleiding bij de aankoop van onze nieuwe woning. Floberg dacht mee, onderhandelde scherp en was altijd bereikbaar.",
  },
  {
    name: "Familie Smits",
    location: "Laren",
    rating: 4,
    text: "Professioneel team met echte kennis van de lokale markt. Wij zijn zeer tevreden over de snelle verkoop en de behaalde prijs.",
  },
] as const;

const TOTAL = TESTIMONIALS.length;

/* ── Helpers ─────────────────────────────────────────────────────── */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : parts[0][0].toUpperCase();
}

function useVisibleCount(): number {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setCount(3);
      else if (window.innerWidth >= 640) setCount(2);
      else setCount(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return count;
}

/* ── Section ─────────────────────────────────────────────────────── */
export function VerkopGetuigenissen() {
  const visibleCount = useVisibleCount();
  const maxActive = Math.max(0, TOTAL - visibleCount);
  const {
    activeIndex: active,
    setActiveIndex: setActive,
    pauseAutoAdvance,
    resumeAutoAdvance,
  } = useTestimonialSlider(maxActive + 1, 4000);

  // Derived slide values
  const trackWidth = `${(TOTAL * 100) / visibleCount}%`;
  const trackX = `-${(active * 100) / TOTAL}%`;

  return (
    <section className="py-24 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-body text-xs font-semibold tracking-widest uppercase text-[#0F1B2D]/50 mb-3">
            Ervaringen
          </p>
          <h2
            className="font-display font-bold text-[#0F1B2D]"
            style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
          >
            Wat onze klanten zeggen
          </h2>
        </div>

        {/* Slider track */}
        <div
          className="overflow-hidden"
          onMouseEnter={pauseAutoAdvance}
          onMouseLeave={resumeAutoAdvance}
        >
          <motion.div
            className="flex"
            animate={{ x: trackX }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ width: trackWidth }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                style={{ width: `${100 / TOTAL}%` }}
                className="px-2.5 sm:px-3"
              >
                <div className="bg-white border border-[#0F1B2D]/[0.08] rounded-sm p-8 shadow-md h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`h-4 w-4 ${j < t.rating ? "text-[#C9A84C] fill-[#C9A84C]" : "text-[#C9A84C]/20 fill-[#C9A84C]/20"}`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="font-body text-[15px] text-[#0F1B2D]/75 italic leading-relaxed mt-3 flex-1">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-6">
                    <div
                      className="h-10 w-10 rounded-full bg-[#0F1B2D] flex items-center justify-center text-white font-body font-bold text-sm shrink-0"
                      aria-hidden="true"
                    >
                      {getInitials(t.name)}
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold text-[#0F1B2D]">{t.name}</p>
                      <p className="font-body text-xs text-[#0F1B2D]/50">{t.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dot navigation */}
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Testimonials">
          {Array.from({ length: maxActive + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Ga naar beoordeling ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] ${
                i === active
                  ? "w-6 bg-[#C9A84C]"
                  : "w-2 bg-[#0F1B2D]/20 hover:bg-[#0F1B2D]/40"
              }`}
            />
          ))}
        </div>

        <p className="font-body text-[13px] text-[#0F1B2D]/50 text-center mt-8">
          Beoordelingen via Funda en Trustoo &middot; Gemiddeld 9.2 uit 10
        </p>
      </div>
    </section>
  );
}
