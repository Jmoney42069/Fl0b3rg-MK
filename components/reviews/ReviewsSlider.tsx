"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type TouchEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { REVIEWS } from "@/lib/reviews";
import { ReviewCard } from "@/components/reviews/ReviewCard";

const AUTO_PLAY_MS = 5000;

/* ── Slide variants ──────────────────────────────────────────── */
const slideVariants = {
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

/* ── Helper ──────────────────────────────────────────────────── */
function useVisibleCount() {
  const [count, setCount] = useState(3);
  useEffect(() => {
    const sync = () => {
      if (window.innerWidth < 640) setCount(1);
      else if (window.innerWidth < 1024) setCount(2);
      else setCount(3);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);
  return count;
}

/* ── Component ───────────────────────────────────────────────── */
export function ReviewsSlider() {
  const visibleCount = useVisibleCount();
  const maxIndex = Math.max(0, REVIEWS.length - visibleCount);

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const avg =
    Math.round(
      (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length) * 10
    ) / 10;

  const navigate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((i) => Math.max(0, Math.min(maxIndex, i + dir)));
    },
    [maxIndex]
  );

  /* Auto-play */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, AUTO_PLAY_MS);
    return () => clearInterval(id);
  }, [paused, maxIndex]);

  /* Clamp index when visibleCount changes on resize */
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  /* Touch handlers */
  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) navigate(delta > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const visible = REVIEWS.slice(index, index + visibleCount);

  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="font-body text-[#C9A96E] text-sm font-semibold tracking-widest uppercase mb-3">
              Klantbeoordelingen
            </p>
            <h2 className="font-display font-bold text-[#1A1A1A] text-4xl leading-tight mb-2">
              Wat onze klanten zeggen
            </h2>
            <p className="font-body text-[#6B7280] text-base">
              Meer dan 200 tevreden klanten gingen u voor
            </p>
          </div>

          {/* Avg score */}
          <div className="flex flex-col items-center md:items-end shrink-0">
            <span
              className="font-display font-bold leading-none"
              style={{ fontSize: "64px", color: "#C9A96E" }}
            >
              {avg.toFixed(1)}
            </span>
            <div className="flex gap-1 my-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="fill-[#C9A96E] text-[#C9A96E]" />
              ))}
            </div>
            <p className="font-body text-xs text-[#6B7280] text-center md:text-right">
              Gebaseerd op Funda & Trustoo
            </p>
          </div>
        </div>

        {/* Slider */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Prev */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={index === 0}
            aria-label="Vorige reviews"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-10 w-10 rounded-full border border-[#E5E7EB] bg-white shadow-sm flex items-center justify-center text-[#6B7280] hover:text-[#1B3A5C] hover:border-[#1B3A5C]/40 transition disabled:opacity-30 disabled:cursor-not-allowed hidden md:flex"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Cards */}
          <div className="overflow-hidden">
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {visible.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={() => navigate(1)}
            disabled={index >= maxIndex}
            aria-label="Volgende reviews"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-10 w-10 rounded-full border border-[#E5E7EB] bg-white shadow-sm flex items-center justify-center text-[#6B7280] hover:text-[#1B3A5C] hover:border-[#1B3A5C]/40 transition disabled:opacity-30 disabled:cursor-not-allowed hidden md:flex"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`Ga naar review positie ${i + 1}`}
              className={`rounded-full transition-all ${
                i === index
                  ? "w-6 h-2 bg-[#C9A96E]"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
