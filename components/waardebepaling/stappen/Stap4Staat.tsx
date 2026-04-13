"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stap4Schema, type Stap4Data } from "@/lib/waardebepalingSchema";
import type { Onderhoudsstaat, Energielabel, WaardebepalingFormData } from "@/types/waardebepaling";
import { KeuzeKaart } from "@/components/ui/KeuzeKaart";
import { NavigatieKnoppen } from "@/components/waardebepaling/NavigatieKnoppen";

const ONDERHOUDSSTATEN: {
  staat: Onderhoudsstaat;
  emoji: string;
  sublabel: string;
}[] = [
  { staat: "Opknapper", emoji: "🏚️", sublabel: "Vereist renovatie" },
  { staat: "Redelijk", emoji: "🔨", sublabel: "Hier en daar onderhoud nodig" },
  { staat: "Goed", emoji: "🏠", sublabel: "Normaal onderhouden" },
  { staat: "Uitstekend", emoji: "✨", sublabel: "Instapklaar, recent gerenoveerd" },
  { staat: "Nieuwbouwstaat", emoji: "🌟", sublabel: "Nieuw of als nieuw" },
];

const ENERGIELABELS: Energielabel[] = [
  "A+++",
  "A++",
  "A+",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "Onbekend",
];

interface Stap4StaatProps {
  defaultValues: Partial<WaardebepalingFormData>;
  onVolgende: (data: Stap4Data) => void;
  onVorige?: () => void;
}

/** Step 4 — Condition and energy label */
export const Stap4Staat = ({
  defaultValues,
  onVolgende,
  onVorige,
}: Stap4StaatProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Stap4Data>({
    resolver: zodResolver(stap4Schema),
    defaultValues: {
      onderhoudsstaat: defaultValues.onderhoudsstaat,
      energielabel: defaultValues.energielabel,
    },
  });

  return (
    <form onSubmit={handleSubmit(onVolgende)} noValidate>
      <div className="mb-8">
        <h2 className="mb-2 font-display text-2xl font-semibold text-[#1A2B4A]">
          Hoe is de staat van de woning?
        </h2>
      </div>

      {/* Onderhoudsstaat */}
      <div className="mb-7">
        <p
          id="onderhoudsstaat-label"
          className="mb-3 font-body text-sm font-medium text-[#1A2B4A]"
        >
          Onderhoudsstaat
        </p>
        <Controller
          name="onderhoudsstaat"
          control={control}
          render={({ field }) => (
            <div
              className="grid grid-cols-2 gap-3 sm:grid-cols-3"
              role="group"
              aria-labelledby="onderhoudsstaat-label"
            >
              {ONDERHOUDSSTATEN.map(({ staat, emoji, sublabel }) => (
                <KeuzeKaart
                  key={staat}
                  selected={field.value === staat}
                  onClick={() => field.onChange(staat)}
                  emoji={emoji}
                  label={staat}
                  sublabel={sublabel}
                />
              ))}
            </div>
          )}
        />
        {errors.onderhoudsstaat && (
          <p role="alert" className="mt-2 font-body text-xs text-red-600">
            {errors.onderhoudsstaat.message}
          </p>
        )}
      </div>

      {/* Energielabel */}
      <div>
        <label
          htmlFor="energielabel"
          className="mb-1.5 block font-body text-sm font-medium text-[#1A2B4A]"
        >
          Energielabel
        </label>
        <select
          id="energielabel"
          {...register("energielabel")}
          aria-describedby="energielabel-help"
          className={[
            "w-full max-w-xs rounded-xl border bg-white px-4 py-3 font-body text-sm text-[#1A1A1A]",
            "transition-colors duration-200 focus:outline-none focus:ring-2",
            errors.energielabel
              ? "border-red-500 focus:ring-red-300"
              : "border-[#E5E0D8] focus:border-[#C9A84C] focus:ring-[#C9A84C]/30",
          ].join(" ")}
        >
          <option value="">— Selecteer een label —</option>
          {ENERGIELABELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <p id="energielabel-help" className="mt-1.5 font-body text-xs text-[#6B7280]">
          Het energielabel vindt u op uw energieprestatiecertificaat of via
          ep-online.nl
        </p>
        {errors.energielabel && (
          <p role="alert" className="mt-1 font-body text-xs text-red-600">
            {errors.energielabel.message}
          </p>
        )}
      </div>

      <NavigatieKnoppen onVorige={onVorige} />
    </form>
  );
};
