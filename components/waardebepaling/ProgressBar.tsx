"use client";

const STAP_NAMEN: Record<number, string> = {
  1: "Adresgegevens",
  2: "Woningtype",
  3: "Kenmerken",
  4: "Staat & Energie",
  5: "Uw gegevens",
};

/** Props for ProgressBar */
export interface ProgressBarProps {
  huidigStap: number;
  totaalStappen?: number;
}

/** Branded progress bar showing the current step and percentage */
export const ProgressBar = ({
  huidigStap,
  totaalStappen = 5,
}: ProgressBarProps) => {
  const percentage = Math.round((huidigStap / totaalStappen) * 100);

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-body text-[0.85rem] text-[#6B7280]">
          Stap {huidigStap} van {totaalStappen}
          <span className="ml-1 font-medium text-[#1A2B4A]">
            — {STAP_NAMEN[huidigStap]}
          </span>
        </p>
        <span className="font-body text-[0.85rem] font-semibold text-[#C9A84C]">
          {percentage}%
        </span>
      </div>

      <div
        className="h-2 w-full overflow-hidden rounded-full bg-[#E5E0D8]"
        role="progressbar"
        aria-valuenow={huidigStap}
        aria-valuemin={1}
        aria-valuemax={totaalStappen}
        aria-label={`Stap ${huidigStap} van ${totaalStappen}: ${STAP_NAMEN[huidigStap]}`}
      >
        <div
          className="h-full rounded-full bg-[#C9A84C] transition-all duration-500 ease-out motion-reduce:transition-none"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
