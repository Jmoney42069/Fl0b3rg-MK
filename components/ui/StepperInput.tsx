"use client";

import { Minus, Plus } from "lucide-react";

/** Props for the StepperInput component */
export interface StepperInputProps {
  /** Current value */
  value: number;
  /** Callback when value changes */
  onChange: (value: number) => void;
  /** Minimum allowed value (default: 1) */
  min?: number;
  /** Maximum allowed value (default: 12) */
  max?: number;
  /** Accessible label for the stepper */
  label: string;
  /** Unique id used for aria attributes */
  id: string;
}

/** Min/plus stepper input for numeric properties like rooms and bathrooms */
export const StepperInput = ({
  value,
  onChange,
  min = 1,
  max = 12,
  label,
  id,
}: StepperInputProps) => {
  return (
    <div className="flex items-center gap-3" role="group" aria-label={label}>
      <span id={`${id}-label`} className="sr-only">
        {label}
      </span>

      <button
        type="button"
        onClick={() => value > min && onChange(value - 1)}
        disabled={value <= min}
        aria-label={`${label} verminderen`}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E0D8] bg-white text-[#1A2B4A] transition-colors duration-200 hover:border-[#C9A84C] hover:text-[#C9A84C] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] motion-reduce:transition-none"
      >
        <Minus className="h-4 w-4" />
      </button>

      <span
        role="spinbutton"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-labelledby={`${id}-label`}
        className="w-8 text-center font-body text-lg font-semibold tabular-nums text-[#1A2B4A]"
      >
        {value}
      </span>

      <button
        type="button"
        onClick={() => value < max && onChange(value + 1)}
        disabled={value >= max}
        aria-label={`${label} verhogen`}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E0D8] bg-white text-[#1A2B4A] transition-colors duration-200 hover:border-[#C9A84C] hover:text-[#C9A84C] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] motion-reduce:transition-none"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};
