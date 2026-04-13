"use client";

import React, { useState } from "react";
import { BookingModal } from "@/components/booking/BookingModal";

interface BookingButtonProps {
  label?: string;
  variant?: "gold" | "outline";
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

/**
 * Reusable trigger button for the appointment booking modal.
 *
 * Usage (self-contained):
 *   <BookingButton />
 *
 * Usage (controlled from parent):
 *   <BookingButton isOpen={open} setIsOpen={setOpen} />
 */
export function BookingButton({
  label = "Maak een afspraak",
  variant = "gold",
  isOpen: isOpenProp,
  setIsOpen: setIsOpenProp,
}: BookingButtonProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  // Prefer controlled props when provided
  const isOpen = isOpenProp ?? internalOpen;
  const setIsOpen = setIsOpenProp ?? setInternalOpen;

  const baseClass =
    "rounded-sm px-8 py-3 font-body font-semibold text-sm transition-all duration-200 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1B2D]";

  const variantClass =
    variant === "gold"
      ? "bg-[#C9A84C] text-[#0F1B2D] hover:bg-[#B8972E]"
      : "border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10";

  return (
    <>
      <button
        type="button"
        className={`${baseClass} ${variantClass}`}
        onClick={() => setIsOpen(true)}
      >
        {label}
      </button>

      <BookingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
