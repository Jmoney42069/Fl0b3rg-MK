"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useTestimonialSlider } from "@/hooks/useTestimonialSlider";

/* ── Data ───────────────────────────────────────────────────── */
interface Testimonial {
  naam: string;
  locatie: string;
  rating: number;
  quote: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    naam: "Thomas & Lisa van der Berg",
    locatie: "Gekocht in Amstelveen",
    rating: 5,
    quote:
      "Dankzij Floberg konden we een woning kopen die nooit op Funda heeft gestaan. Hun netwerk is fenomenaal. En de onderhandeling leverde ons ruim € 20.000 op.",
    initials: "TL",
  },
  {
    naam: "Marieke Smit",
    locatie: "Gekocht in Amsterdam-Zuid",
    rating: 5,
    quote:
      "Als eerste koper wist ik niet wat ik kon verwachten. Floberg nam mij bij de hand door elk stapje. Superhelder, fijn en echt professioneel.",
    initials: "MS",
  },
  {
    naam: "Pieter & Sophie Jansen",
    locatie: "Gekocht in Aalsmeer",
    rating: 5,
    quote:
      "We waren sceptisch over een aankoopmakelaar, maar na de eerste bezichtiging waren we om. Ze zagen gebreken die wij volledig over het hoofd hadden gezien.",
    initials: "PS",
  },
  {
    naam: "Robert Oudermans",
    locatie: "Gekocht in Uithoorn",
    rating: 5,
    quote:
      "Van eerste bezichtiging tot sleuteloverdracht: altijd bereikbaar, altijd scherp. Ik zou nooit meer zonder aankoopmakelaar kopen.",
    initials: "RO",
  },
  {
    naam: "Anna & Kees de Boer",
    locatie: "Gekocht in Diemen",
    rating: 5,
    quote:
      "In een krappe woningmarkt hebben zij voor ons het onmogelijke mogelijk gemaakt. Binnen zes weken hadden we ons droomhuis. Geweldig!",
    initials: "AK",
  },
];

const TOTAL = TESTIMONIALS.length;
const VISIBLE_DESKTOP = 3;
const VISIBLE_MOBILE = 1;

/* ── Animation ───────────────────────────────────────────────── */
const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir < 0 ? 60 : -60,
    opacity: 0,
  }),
};

/* ── Section ─────────────────────────────────────────────────── */
export function AankoopGetuigenissen() {
  const [visibleCount, setVisibleCount] = useState(VISIBLE_DESKTOP);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const update = () =>
      setVisibleCount(window.innerWidth >= 1024 ? VISIBLE_DESKTOP : VISIBLE_MOBILE);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxActive = Math.max(0, TOTAL - visibleCount);
  const { activeIndex: active, setActiveIndex: setActive, pauseAutoAdvance, resumeAutoAdvance } =
    useTestimonialSlider(maxActive + 1, 5000);

  const navigate = (dir: number) => {
    setDirection(dir);
    setActive(Math.max(0, Math.min(maxActive, active + dir)));
  };

  const visible = TESTIMONIALS.slice(active, active + visibleCount);

  return (
    <section className="py-20 bg-[#0F1B2D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <p className="font-body text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3">
              Ervaringen
            </p>
            <h2 className="font-display font-bold text-white text-4xl leading-tight mb-2">
              Wat onze kopers zeggen
            </h2>
            <p className="font-body text-white/50 text-base">
              Van eerste woning tot exclusieve klantenkring — altijd dezelfde kwaliteit.
            </p>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={active === 0}
              aria-label="Vorige"
              className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => navigate(1)}
              disabled={active >= maxActive}
              aria-label="Volgende"
              className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={pauseAutoAdvance}
          onMouseLeave={resumeAutoAdvance}
        >
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            <motion.div
              key={active}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {visible.map((t) => (
                <div
                  key={t.naam}
                  className="rounded-2xl bg-white/8 border border-white/10 p-7 flex flex-col"
                >
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-[#C9A84C] text-[#C9A84C]"
                      />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="font-body text-white/80 text-base leading-relaxed italic flex-1 mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C9A84C]/20 text-[#C9A84C] font-body font-bold text-sm">
                      {t.initials}
                    </span>
                    <div>
                      <p className="font-body font-semibold text-white text-sm">
                        {t.naam}
                      </p>
                      <p className="font-body text-white/40 text-xs">{t.locatie}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxActive + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setDirection(i > active ? 1 : -1);
                setActive(i);
              }}
              aria-label={`Ga naar slide ${i + 1}`}
              className={`rounded-full transition-all ${
                i === active
                  ? "w-6 h-2 bg-[#C9A84C]"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
