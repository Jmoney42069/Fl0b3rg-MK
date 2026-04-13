"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stap3Schema, type Stap3Data } from "@/lib/waardebepalingSchema";
import type { TuinLigging, WaardebepalingFormData } from "@/types/waardebepaling";
import { StepperInput } from "@/components/ui/StepperInput";
import { NavigatieKnoppen } from "@/components/waardebepaling/NavigatieKnoppen";

const TUIN_LIGGINGEN: TuinLigging[] = [
  "Zuid",
  "Noord",
  "Oost",
  "West",
  "Meerdere richtingen",
];

interface Stap3KenmerkenProps {
  defaultValues: Partial<WaardebepalingFormData>;
  onVolgende: (data: Stap3Data) => void;
  onVorige?: () => void;
}

/** Accessible toggle switch */
const Toggle = ({
  checked,
  onChange,
  id,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  id: string;
  label: string;
}) => (
  <button
    type="button"
    role="switch"
    id={id}
    aria-checked={checked}
    aria-label={label}
    onClick={() => onChange(!checked)}
    className={[
      "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full",
      "transition-colors duration-200 motion-reduce:transition-none",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2",
      checked ? "bg-[#C9A84C]" : "bg-[#E5E0D8]",
    ].join(" ")}
  >
    <span
      className={[
        "inline-block h-4 w-4 rounded-full bg-white shadow-sm",
        "transition-transform duration-200 motion-reduce:transition-none",
        checked ? "translate-x-6" : "translate-x-1",
      ].join(" ")}
    />
  </button>
);

const sectionLabel = "mb-3 font-body text-sm font-medium text-[#1A2B4A]";
const errCls = "mt-1.5 font-body text-xs text-red-600";

/** Step 3 — Property characteristics */
export const Stap3Kenmerken = ({
  defaultValues,
  onVolgende,
  onVorige,
}: Stap3KenmerkenProps) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Stap3Data>({
    resolver: zodResolver(stap3Schema),
    defaultValues: {
      oppervlak: defaultValues.oppervlak ?? 100,
      aantalKamers: defaultValues.aantalKamers ?? 4,
      aantalBadkamers: defaultValues.aantalBadkamers ?? 1,
      heeftTuin: defaultValues.heeftTuin ?? false,
      tuinLigging: defaultValues.tuinLigging,
      heeftGarage: defaultValues.heeftGarage ?? false,
    },
  });

  const heeftTuin = watch("heeftTuin");

  return (
    <form onSubmit={handleSubmit(onVolgende)} noValidate>
      <div className="mb-8">
        <h2 className="mb-2 font-display text-2xl font-semibold text-[#1A2B4A]">
          Vertel ons meer over de woning
        </h2>
      </div>

      <div className="space-y-7">
        {/* Woonoppervlak */}
        <div>
          <p className={sectionLabel}>Woonoppervlak (m²)</p>
          <Controller
            name="oppervlak"
            control={control}
            render={({ field }) => (
              <div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={20}
                    max={500}
                    step={5}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="flex-1 accent-[#C9A84C]"
                    aria-label="Woonoppervlak in vierkante meter"
                    aria-valuenow={field.value}
                    aria-valuemin={20}
                    aria-valuemax={500}
                    aria-valuetext={`${field.value} vierkante meter`}
                  />
                  <input
                    type="number"
                    min={20}
                    max={500}
                    value={field.value}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (v >= 20 && v <= 500) field.onChange(v);
                    }}
                    aria-label="Woonoppervlak exact invoeren"
                    className="w-20 rounded-xl border border-[#E5E0D8] px-3 py-2 text-center font-body text-sm text-[#1A1A1A] focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                  />
                </div>
                <p className="mt-2 font-body text-sm text-[#6B7280]">
                  U heeft{" "}
                  <span className="font-semibold text-[#1A2B4A]">
                    {field.value} m²
                  </span>{" "}
                  ingevuld
                </p>
              </div>
            )}
          />
          {errors.oppervlak && (
            <p role="alert" className={errCls}>
              {errors.oppervlak.message}
            </p>
          )}
        </div>

        {/* Aantal kamers */}
        <div>
          <p className={sectionLabel} id="kamers-label">
            Aantal kamers
          </p>
          <Controller
            name="aantalKamers"
            control={control}
            render={({ field }) => (
              <StepperInput
                id="aantalKamers"
                label="Aantal kamers"
                value={field.value}
                onChange={field.onChange}
                min={1}
                max={12}
              />
            )}
          />
        </div>

        {/* Aantal badkamers */}
        <div>
          <p className={sectionLabel} id="badkamers-label">
            Aantal badkamers
          </p>
          <Controller
            name="aantalBadkamers"
            control={control}
            render={({ field }) => (
              <StepperInput
                id="aantalBadkamers"
                label="Aantal badkamers"
                value={field.value}
                onChange={field.onChange}
                min={1}
                max={5}
              />
            )}
          />
        </div>

        {/* Tuin */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="heeftTuin"
              className="font-body text-sm font-medium text-[#1A2B4A]"
            >
              Heeft de woning een tuin?
            </label>
            <Controller
              name="heeftTuin"
              control={control}
              render={({ field }) => (
                <Toggle
                  id="heeftTuin"
                  label="Heeft de woning een tuin"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          {heeftTuin && (
            <div className="mt-3">
              <label
                htmlFor="tuinLigging"
                className="mb-1.5 block font-body text-sm font-medium text-[#1A2B4A]"
              >
                Ligging tuin
              </label>
              <Controller
                name="tuinLigging"
                control={control}
                render={({ field }) => (
                  <select
                    id="tuinLigging"
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(e.target.value as TuinLigging || undefined)
                    }
                    aria-describedby={
                      errors.tuinLigging ? "tuinligging-fout" : undefined
                    }
                    className={[
                      "w-full max-w-xs rounded-xl border bg-white px-4 py-3 font-body text-sm text-[#1A1A1A]",
                      "transition-colors duration-200 focus:outline-none focus:ring-2",
                      errors.tuinLigging
                        ? "border-red-500 focus:ring-red-300"
                        : "border-[#E5E0D8] focus:border-[#C9A84C] focus:ring-[#C9A84C]/30",
                    ].join(" ")}
                  >
                    <option value="">— Selecteer ligging —</option>
                    {TUIN_LIGGINGEN.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.tuinLigging && (
                <p id="tuinligging-fout" role="alert" className={errCls}>
                  {errors.tuinLigging.message}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Garage */}
        <div className="flex items-center justify-between">
          <label
            htmlFor="heeftGarage"
            className="font-body text-sm font-medium text-[#1A2B4A]"
          >
            Heeft de woning een garage of oprit?
          </label>
          <Controller
            name="heeftGarage"
            control={control}
            render={({ field }) => (
              <Toggle
                id="heeftGarage"
                label="Heeft de woning een garage of oprit"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>

      <NavigatieKnoppen onVorige={onVorige} />
    </form>
  );
};
