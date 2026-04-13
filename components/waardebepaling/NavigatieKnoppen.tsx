"use client";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

/** Props for NavigatieKnoppen */
export interface NavigatieKnoppenProps {
  /** Callback for "Vorige" — if undefined the button is hidden */
  onVorige?: () => void;
  /** Shows submit-specific label and spinner on the primary button */
  isLaatsteStap?: boolean;
  /** Disables the next button and shows a loading spinner */
  isLoading?: boolean;
}

/** Previous / Next navigation buttons used at the bottom of each form step */
export const NavigatieKnoppen = ({
  onVorige,
  isLaatsteStap = false,
  isLoading = false,
}: NavigatieKnoppenProps) => {
  return (
    <div className="mt-8 flex items-center justify-between">
      {/* Vorige */}
      {onVorige ? (
        <button
          type="button"
          onClick={onVorige}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-body text-sm font-medium text-[#6B7280] transition-colors duration-200 hover:text-[#1A2B4A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] motion-reduce:transition-none"
        >
          <ArrowLeft className="h-4 w-4" />
          Vorige
        </button>
      ) : (
        <div aria-hidden="true" />
      )}

      {/* Volgende / Bereken */}
      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center gap-2 rounded-xl bg-[#1A2B4A] px-6 py-3 font-body text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#243860] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2 motion-reduce:transition-none"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Berekenen...
          </>
        ) : isLaatsteStap ? (
          <>
            Bereken mijn woningwaarde
            <ArrowRight className="h-4 w-4" />
          </>
        ) : (
          <>
            Volgende
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </div>
  );
};
