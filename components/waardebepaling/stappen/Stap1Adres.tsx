"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin } from "lucide-react";
import { stap1Schema, type Stap1Data } from "@/lib/waardebepalingSchema";
import type { Plaatsnaam, WaardebepalingFormData } from "@/types/waardebepaling";
import { NavigatieKnoppen } from "@/components/waardebepaling/NavigatieKnoppen";

const PLAATSEN: Plaatsnaam[] = [
  "Huizen",
  "Bussum",
  "Naarden",
  "Muiden",
  "Weesp",
  "Hilversum",
  "Laren",
  "Blaricum",
  "Anders",
];

interface Stap1AdresProps {
  defaultValues: Partial<WaardebepalingFormData>;
  onVolgende: (data: Stap1Data) => void;
}

const inputCls = (hasError: boolean) =>
  [
    "w-full rounded-xl border px-4 py-3 font-body text-sm text-[#1A1A1A]",
    "bg-white placeholder:text-[#6B7280]/60",
    "transition-colors duration-200 focus:outline-none focus:ring-2",
    hasError
      ? "border-red-500 focus:ring-red-300"
      : "border-[#E5E0D8] focus:border-[#C9A84C] focus:ring-[#C9A84C]/30",
  ].join(" ");

const errCls = "mt-1.5 font-body text-xs text-red-600";

/** Step 1 — Address details */
export const Stap1Adres = ({ defaultValues, onVolgende }: Stap1AdresProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Stap1Data>({
    resolver: zodResolver(stap1Schema),
    defaultValues: {
      straat: defaultValues.straat ?? "",
      huisnummer: defaultValues.huisnummer ?? "",
      postcode: defaultValues.postcode ?? "",
      plaatsnaam: defaultValues.plaatsnaam,
    },
  });

  return (
    <form onSubmit={handleSubmit(onVolgende)} noValidate>
      {/* Header */}
      <div className="mb-8 text-center">
        <MapPin
          className="mx-auto mb-3 h-8 w-8 text-[#C9A84C]"
          aria-hidden="true"
        />
        <h2 className="mb-2 font-display text-2xl font-semibold text-[#1A2B4A]">
          Over welke woning gaat het?
        </h2>
        <p className="mx-auto max-w-md font-body text-sm text-[#6B7280]">
          Vul het adres in zodat we een nauwkeurige schatting kunnen maken op
          basis van actuele marktdata in uw regio.
        </p>
      </div>

      <div className="space-y-5">
        {/* Straat + huisnummer */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <label
              htmlFor="straat"
              className="mb-1.5 block font-body text-sm font-medium text-[#1A2B4A]"
            >
              Straatnaam
            </label>
            <input
              id="straat"
              {...register("straat")}
              placeholder="Bijv. Naarderstraat"
              autoComplete="street-address"
              aria-describedby={errors.straat ? "straat-fout" : undefined}
              className={inputCls(!!errors.straat)}
            />
            {errors.straat && (
              <p id="straat-fout" role="alert" className={errCls}>
                {errors.straat.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="huisnummer"
              className="mb-1.5 block font-body text-sm font-medium text-[#1A2B4A]"
            >
              Nr.
            </label>
            <input
              id="huisnummer"
              {...register("huisnummer")}
              placeholder="25"
              aria-describedby={errors.huisnummer ? "huisnummer-fout" : undefined}
              className={inputCls(!!errors.huisnummer)}
            />
            {errors.huisnummer && (
              <p id="huisnummer-fout" role="alert" className={errCls}>
                {errors.huisnummer.message}
              </p>
            )}
          </div>
        </div>

        {/* Postcode */}
        <div>
          <label
            htmlFor="postcode"
            className="mb-1.5 block font-body text-sm font-medium text-[#1A2B4A]"
          >
            Postcode
          </label>
          <input
            id="postcode"
            {...register("postcode")}
            placeholder="1271 AA"
            autoComplete="postal-code"
            aria-describedby={errors.postcode ? "postcode-fout" : undefined}
            className={`${inputCls(!!errors.postcode)} uppercase`}
          />
          {errors.postcode && (
            <p id="postcode-fout" role="alert" className={errCls}>
              {errors.postcode.message}
            </p>
          )}
        </div>

        {/* Plaatsnaam */}
        <div>
          <label
            htmlFor="plaatsnaam"
            className="mb-1.5 block font-body text-sm font-medium text-[#1A2B4A]"
          >
            Plaatsnaam
          </label>
          <select
            id="plaatsnaam"
            {...register("plaatsnaam")}
            aria-describedby={errors.plaatsnaam ? "plaatsnaam-fout" : undefined}
            className={[
              "w-full rounded-xl border bg-white px-4 py-3 font-body text-sm text-[#1A1A1A]",
              "transition-colors duration-200 focus:outline-none focus:ring-2",
              errors.plaatsnaam
                ? "border-red-500 focus:ring-red-300"
                : "border-[#E5E0D8] focus:border-[#C9A84C] focus:ring-[#C9A84C]/30",
            ].join(" ")}
          >
            <option value="">— Selecteer een plaats —</option>
            {PLAATSEN.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {errors.plaatsnaam && (
            <p id="plaatsnaam-fout" role="alert" className={errCls}>
              {errors.plaatsnaam.message}
            </p>
          )}
        </div>
      </div>

      <NavigatieKnoppen />
    </form>
  );
};
