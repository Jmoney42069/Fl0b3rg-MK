"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAvailableSlots, isBlocked } from "@/lib/available-slots";

/* ── helpers ─────────────────────────────────────────────────── */

const NL_DAYS_SHORT = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

// Dutch day names (long) for display — week starts Monday (ISO)
const NL_MONTHS = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december",
];

const NL_WEEKDAY_LONG = [
  "zondag", "maandag", "dinsdag", "woensdag",
  "donderdag", "vrijdag", "zaterdag",
];

function formatSelectedDate(d: Date): string {
  return `${NL_WEEKDAY_LONG[d.getDay()]} ${d.getDate()} ${NL_MONTHS[d.getMonth()]}`;
}

/** Returns the Mon-indexed day (0=Mon … 6=Sun) for grid placement. */
function isoDay(d: Date): number {
  return (d.getDay() + 6) % 7;
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/* ── component ───────────────────────────────────────────────── */

interface StepTwoProps {
  selectedDate: Date | null;
  setSelectedDate: (d: Date | null) => void;
  selectedSlot: string;
  setSelectedSlot: (s: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepTwo({
  selectedDate,
  setSelectedDate,
  selectedSlot,
  setSelectedSlot,
  onNext,
  onBack,
}: StepTwoProps) {
  const today = startOfDay(new Date());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  /* calendar grid ------------------------------------------------ */
  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const startOffset = isoDay(firstOfMonth); // blank cells before day 1

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const selectDate = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    setSelectedDate(d);
    setSelectedSlot(""); // reset slot when date changes
  };

  /* time slots ---------------------------------------------------- */
  const slots = selectedDate ? getAvailableSlots(selectedDate) : [];

  /* can navigate to previous month? (don't go before current month) */
  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  const canGoNext = true; // no upper limit in mock

  /* day cell class ------------------------------------------------- */
  const dayClass = (day: number): { cls: string; disabled: boolean } => {
    const d = new Date(viewYear, viewMonth, day);
    const isPast = startOfDay(d) < today;
    const blocked = isBlocked(d);
    const isSun = d.getDay() === 0;
    const isSelected = !!selectedDate && isSameDay(d, selectedDate);

    if (isSelected) {
      return {
        cls: "bg-[#C9A84C] text-[#0F1B2D] font-bold rounded-sm",
        disabled: false,
      };
    }
    if (isPast || isSun) {
      return { cls: "opacity-20 cursor-not-allowed", disabled: true };
    }
    if (blocked) {
      return {
        cls: "line-through bg-red-900/20 text-red-400/70 cursor-not-allowed rounded-sm",
        disabled: true,
      };
    }
    return {
      cls: "hover:bg-white/10 cursor-pointer rounded-sm transition-colors duration-150",
      disabled: false,
    };
  };

  const canProceed = !!selectedDate && !!selectedSlot;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-[28px] font-semibold text-white leading-tight">
          Kies een datum en tijdstip
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* ── Calendar ── */}
        <div>
          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={prevMonth}
              disabled={!canGoPrev}
              aria-label="Vorige maand"
              className="p-1.5 rounded-sm text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-body text-sm font-semibold text-white capitalize">
              {NL_MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              disabled={!canGoNext}
              aria-label="Volgende maand"
              className="p-1.5 rounded-sm text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {NL_DAYS_SHORT.map((d) => (
              <div
                key={d}
                className="h-8 flex items-center justify-center font-body text-[11px] font-semibold text-white/30 uppercase tracking-wide"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-px">
            {/* blank offset cells */}
            {Array.from({ length: startOffset }).map((_, i) => (
              <div key={`blank-${i}`} className="h-9 w-9" />
            ))}
            {/* day buttons */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const { cls, disabled } = dayClass(day);
              return (
                <button
                  key={day}
                  type="button"
                  disabled={disabled}
                  onClick={() => !disabled && selectDate(day)}
                  aria-label={`${day} ${NL_MONTHS[viewMonth]} ${viewYear}`}
                  className={[
                    "h-9 w-9 flex items-center justify-center font-body text-xs text-white",
                    cls,
                  ].join(" ")}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Time slots ── */}
        <div>
          {selectedDate ? (
            <>
              <p className="font-body text-xs font-semibold text-white/50 uppercase tracking-wide mb-3">
                Beschikbare tijden op{" "}
                <span className="text-white normal-case font-medium">
                  {formatSelectedDate(selectedDate)}
                </span>
              </p>
              {slots.length === 0 ? (
                <p className="font-body text-sm text-[#C9A84C] italic text-center mt-8">
                  Geen beschikbaarheid op deze dag
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {slots.map((slot) => {
                    const active = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={[
                          "py-2 px-3 rounded-sm border font-body text-sm transition-all duration-150",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]",
                          active
                            ? "bg-[#C9A84C] border-[#C9A84C] text-[#0F1B2D] font-bold"
                            : "bg-white/5 border-white/10 text-white hover:bg-white/10",
                        ].join(" ")}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="font-body text-sm text-white/30 text-center">
                Selecteer eerst een datum
              </p>
            </div>
          )}
        </div>
      </div>

      {/* nav buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="font-body text-sm text-white/60 hover:text-white transition-colors underline underline-offset-4"
        >
          Vorige
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className={[
            "h-11 px-8 rounded-sm font-body text-sm font-semibold transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1B2D]",
            canProceed
              ? "bg-[#C9A84C] text-[#0F1B2D] hover:bg-[#B8972E]"
              : "bg-[#C9A84C]/30 text-[#0F1B2D]/50 opacity-40 cursor-not-allowed",
          ].join(" ")}
        >
          Volgende stap →
        </button>
      </div>
    </div>
  );
}
