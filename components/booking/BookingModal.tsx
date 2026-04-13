"use client";

import React, { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { StepOne } from "@/components/booking/StepOne";
import { StepTwo } from "@/components/booking/StepTwo";
import { StepThree, type StepThreeFormData } from "@/components/booking/StepThree";
import { SuccessScreen } from "@/components/booking/SuccessScreen";

/* ── Step slide variants ─────────────────────────────────────── */
const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" as const },
  }),
};

/* ── Progress bar ────────────────────────────────────────────── */
const STEPS = ["Dienst", "Datum & Tijd", "Gegevens"] as const;

function ProgressBar({ current }: { current: number }) {
  return (
    <div className="flex gap-2 mb-8" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={3}>
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const done = stepNum < current;
        const active = stepNum === current;
        return (
          <div key={label} className="flex-1 flex flex-col gap-1.5">
            <div
              className={[
                "h-1 rounded-full transition-all duration-500",
                done || active ? "bg-[#C9A84C]" : "bg-white/10",
              ].join(" ")}
            />
            <span
              className={[
                "font-body text-[10px] uppercase tracking-wide font-medium",
                active ? "text-[#C9A84C]" : done ? "text-[#C9A84C]/60" : "text-white/25",
              ].join(" ")}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Modal inner ─────────────────────────────────────────────── */
interface BookingModalInnerProps {
  onClose: () => void;
}

function BookingModalInner({ onClose }: BookingModalInnerProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);

  // Step 1
  const [selectedService, setSelectedService] = useState("");

  // Step 2
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState("");

  // Step 3
  const [formData, setFormData] = useState<StepThreeFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const goTo = useCallback((step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  }, [currentStep]);

  // Format date for API
  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("nl-NL", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          service: selectedService,
          date: formattedDate,
          slot: selectedSlot,
        }),
      });
      if (res.ok) {
        setIsSuccess(true);
      }
    } catch {
      // silently fail — in production, show an error toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-2xl bg-[#0F1B2D] border border-[#C9A84C]/20 rounded-sm shadow-[0_32px_80px_rgba(0,0,0,0.7)] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Afspraak maken"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-sm text-white/40 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
          aria-label="Sluit"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8 overflow-y-auto max-h-[90vh]">
          {isSuccess && selectedDate ? (
            <SuccessScreen
              name={formData.name}
              service={selectedService}
              date={selectedDate}
              slot={selectedSlot}
              onClose={onClose}
            />
          ) : (
            <>
              <ProgressBar current={currentStep} />

              {/* Step content */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {currentStep === 1 && (
                    <StepOne
                      selectedService={selectedService}
                      setSelectedService={setSelectedService}
                      onNext={() => goTo(2)}
                    />
                  )}
                  {currentStep === 2 && (
                    <StepTwo
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                      selectedSlot={selectedSlot}
                      setSelectedSlot={setSelectedSlot}
                      onNext={() => goTo(3)}
                      onBack={() => goTo(1)}
                    />
                  )}
                  {currentStep === 3 && (
                    <StepThree
                      formData={formData}
                      setFormData={setFormData}
                      onSubmit={handleSubmit}
                      isLoading={isLoading}
                      selectedService={selectedService}
                      selectedDate={selectedDate}
                      selectedSlot={selectedSlot}
                      onBack={() => goTo(2)}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Step counter */}
              <p className="mt-6 text-center font-body text-xs text-white/25">
                Stap {currentStep} van 3
              </p>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Portal wrapper ──────────────────────────────────────────── */
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  if (typeof document === "undefined") return null; // SSR guard

  return createPortal(
    <AnimatePresence>
      {isOpen && <BookingModalInner onClose={onClose} />}
    </AnimatePresence>,
    document.body
  );
}
