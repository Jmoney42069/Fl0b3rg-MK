"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Home,
  Building2,
  Building,
  HelpCircle,
  Castle,
} from "lucide-react";
import { stap2Schema, type Stap2Data } from "@/lib/waardebepalingSchema";
import type { Woningtype, WaardebepalingFormData } from "@/types/waardebepaling";
import { KeuzeKaart } from "@/components/ui/KeuzeKaart";
import { NavigatieKnoppen } from "@/components/waardebepaling/NavigatieKnoppen";

const WONINGTYPES: { type: Woningtype; label: string; iconName: string }[] = [
  { type: "Tussenwoning", label: "Tussenwoning", iconName: "home" },
  { type: "Hoekwoning", label: "Hoekwoning", iconName: "home-flip" },
  { type: "2-onder-1-kap", label: "2-onder-1-kap", iconName: "building2" },
  { type: "Vrijstaand", label: "Vrijstaand", iconName: "castle" },
  { type: "Appartement", label: "Appartement", iconName: "building" },
  { type: "Anders", label: "Anders", iconName: "help" },
];

const getIcon = (iconName: string) => {
  const cls = "h-6 w-6";
  switch (iconName) {
    case "home":
      return <Home className={cls} />;
    case "home-flip":
      return <Home className={`${cls} -scale-x-100`} />;
    case "building2":
      return <Building2 className={cls} />;
    case "castle":
      return <Castle className={cls} />;
    case "building":
      return <Building className={cls} />;
    default:
      return <HelpCircle className={cls} />;
  }
};

interface Stap2TypeProps {
  defaultValues: Partial<WaardebepalingFormData>;
  onVolgende: (data: Stap2Data) => void;
  onVorige?: () => void;
}

const inputCls = (hasError: boolean) =>
  [
    "w-full rounded-xl border px-4 py-3 font-body text-sm text-[#1A1A1A] bg-white",
    "transition-colors duration-200 focus:outline-none focus:ring-2",
    hasError
      ? "border-red-500 focus:ring-red-300"
      : "border-[#E5E0D8] focus:border-[#C9A84C] focus:ring-[#C9A84C]/30",
  ].join(" ");

/** Step 2 — Housing type and year of construction */
export const Stap2Type = ({
  defaultValues,
  onVolgende,
  onVorige,
}: Stap2TypeProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Stap2Data>({
    resolver: zodResolver(stap2Schema),
    defaultValues: {
      woningtype: defaultValues.woningtype,
      bouwjaar: defaultValues.bouwjaar ?? undefined,
    },
  });

  return (
    <form onSubmit={handleSubmit(onVolgende)} noValidate>
      <div className="mb-8">
        <h2 className="mb-2 font-display text-2xl font-semibold text-[#1A2B4A]">
          Wat voor type woning is het?
        </h2>
      </div>

      {/* Woningtype grid */}
      <div className="mb-6">
        <p
          id="woningtype-label"
          className="mb-3 font-body text-sm font-medium text-[#1A2B4A]"
        >
          Woningtype
        </p>
        <Controller
          name="woningtype"
          control={control}
          render={({ field }) => (
            <div
              className="grid grid-cols-2 gap-3 sm:grid-cols-3"
              role="group"
              aria-labelledby="woningtype-label"
            >
              {WONINGTYPES.map(({ type, label, iconName }) => (
                <KeuzeKaart
                  key={type}
                  selected={field.value === type}
                  onClick={() => field.onChange(type)}
                  icon={getIcon(iconName)}
                  label={label}
                />
              ))}
            </div>
          )}
        />
        {errors.woningtype && (
          <p role="alert" className="mt-2 font-body text-xs text-red-600">
            {errors.woningtype.message}
          </p>
        )}
      </div>

      {/* Bouwjaar */}
      <div>
        <label
          htmlFor="bouwjaar"
          className="mb-1.5 block font-body text-sm font-medium text-[#1A2B4A]"
        >
          Bouwjaar
        </label>
        <input
          id="bouwjaar"
          type="number"
          min={1850}
          max={2025}
          placeholder="Bijv. 1985"
          {...register("bouwjaar", { valueAsNumber: true })}
          aria-describedby={errors.bouwjaar ? "bouwjaar-fout" : undefined}
          className={`${inputCls(!!errors.bouwjaar)} max-w-xs`}
        />
        {errors.bouwjaar && (
          <p id="bouwjaar-fout" role="alert" className="mt-1.5 font-body text-xs text-red-600">
            {errors.bouwjaar.message}
          </p>
        )}
      </div>

      <NavigatieKnoppen onVorige={onVorige} />
    </form>
  );
};
