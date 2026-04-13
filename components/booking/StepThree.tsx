"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export interface StepThreeFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface StepThreeProps {
  formData: StepThreeFormData;
  setFormData: React.Dispatch<React.SetStateAction<StepThreeFormData>>;
  onSubmit: () => void;
  isLoading: boolean;
  selectedService: string;
  selectedDate: Date | null;
  selectedSlot: string;
  onBack: () => void;
}

const NL_MONTHS = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december",
];

const NL_WEEKDAY = [
  "zondag", "maandag", "dinsdag", "woensdag",
  "donderdag", "vrijdag", "zaterdag",
];

function formatDate(d: Date): string {
  return `${NL_WEEKDAY[d.getDay()]} ${d.getDate()} ${NL_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

const inputCls =
  "w-full h-11 px-4 rounded-sm border border-white/15 bg-white/5 text-white " +
  "placeholder:text-white/30 font-body text-sm " +
  "focus:outline-none focus:border-[#C9A84C] focus:bg-white/8 transition-colors duration-150";

export function StepThree({
  formData,
  setFormData,
  onSubmit,
  isLoading,
  selectedService,
  selectedDate,
  selectedSlot,
  onBack,
}: StepThreeProps) {
  const set = (field: keyof StepThreeFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const canSubmit =
    !isLoading &&
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "";

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-[28px] font-semibold text-white leading-tight mb-1">
          Uw gegevens
        </h2>
        <p className="font-body text-sm text-white/50">
          Wij nemen binnen 1 werkdag contact met u op ter bevestiging
        </p>
      </div>

      {/* Summary card */}
      {selectedDate && (
        <div className="rounded-sm border border-[#C9A84C]/30 bg-white/5 p-4 font-body text-sm text-white/80 leading-relaxed">
          📋 <span className="font-semibold text-white">{selectedService}</span>{" "}
          &nbsp;·&nbsp; 📅{" "}
          <span className="text-white">{formatDate(selectedDate)}</span>{" "}
          &nbsp;·&nbsp; 🕐{" "}
          <span className="text-white">{selectedSlot}</span>
        </div>
      )}

      {/* Form */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="b-name" className="font-body text-xs text-white/50 uppercase tracking-wide">
            Volledige naam <span className="text-[#C9A84C]">*</span>
          </label>
          <input
            id="b-name"
            type="text"
            autoComplete="name"
            required
            value={formData.name}
            onChange={set("name")}
            placeholder="Jan de Vries"
            className={inputCls}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="b-email" className="font-body text-xs text-white/50 uppercase tracking-wide">
            E-mailadres <span className="text-[#C9A84C]">*</span>
          </label>
          <input
            id="b-email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={set("email")}
            placeholder="jan@voorbeeld.nl"
            className={inputCls}
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="b-phone" className="font-body text-xs text-white/50 uppercase tracking-wide">
            Telefoonnummer <span className="text-[#C9A84C]">*</span>
          </label>
          <input
            id="b-phone"
            type="tel"
            autoComplete="tel"
            required
            value={formData.phone}
            onChange={set("phone")}
            placeholder="06 12 34 56 78"
            className={inputCls}
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="b-message" className="font-body text-xs text-white/50 uppercase tracking-wide">
            Bericht / Toelichting
          </label>
          <textarea
            id="b-message"
            rows={4}
            value={formData.message}
            onChange={set("message")}
            placeholder="Eventuele opmerkingen of vragen..."
            className={[
              inputCls,
              "h-auto resize-none py-3 leading-relaxed",
            ].join(" ")}
          />
        </div>
      </div>

      {/* Privacy checkbox */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <span className="relative mt-0.5 h-5 w-5 shrink-0">
          <input
            type="checkbox"
            id="privacy"
            required
            className="peer absolute inset-0 opacity-0 cursor-pointer"
            onChange={() => {}} // controlled via form submit validation
          />
          <span className="absolute inset-0 rounded-sm border border-white/20 bg-white/5 peer-checked:bg-[#C9A84C] peer-checked:border-[#C9A84C] transition-colors duration-150" />
          <svg
            className="absolute inset-0 w-5 h-5 text-[#0F1B2D] opacity-0 peer-checked:opacity-100 transition-opacity duration-150"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <polyline points="4 10 8 14 16 6" />
          </svg>
        </span>
        <span className="font-body text-sm text-white/70 leading-relaxed">
          Ik ga akkoord met de privacyverklaring en het opslaan van mijn gegevens
        </span>
      </label>

      {/* Submit */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={!canSubmit}
        className={[
          "w-full h-12 rounded-sm font-body text-base font-semibold",
          "flex items-center justify-center gap-2",
          "transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1B2D]",
          canSubmit
            ? "bg-[#C9A84C] text-[#0F1B2D] hover:bg-[#B8972E]"
            : "bg-[#C9A84C]/30 text-[#0F1B2D]/50 opacity-40 cursor-not-allowed",
        ].join(" ")}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Versturen…
          </>
        ) : (
          "Afspraak Bevestigen"
        )}
      </button>

      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        disabled={isLoading}
        className="font-body text-sm text-white/60 hover:text-white transition-colors underline underline-offset-4 self-start"
      >
        Vorige
      </button>
    </div>
  );
}
