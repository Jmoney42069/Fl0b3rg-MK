"use client";

import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stap5Schema, type Stap5Data } from "@/lib/waardebepalingSchema";
import type { VerkoopReden, WaardebepalingFormData } from "@/types/waardebepaling";
import { NavigatieKnoppen } from "@/components/waardebepaling/NavigatieKnoppen";

const REDENEN: VerkoopReden[] = [
  "Ik overweeg te verkopen",
  "Ik wil mijn hypotheek verhogen",
  "Scheidingsboedel / nalatenschap",
  "Puur informatief",
];

interface Stap5ContactProps {
  defaultValues: Partial<WaardebepalingFormData>;
  onVolgende: (data: Stap5Data) => void;
  onVorige?: () => void;
  isLoading?: boolean;
}

const inputCls = (hasError: boolean) =>
  [
    "w-full rounded-xl border px-4 py-3 font-body text-sm text-[#1A1A1A] bg-white",
    "placeholder:text-[#6B7280]/60",
    "transition-colors duration-200 focus:outline-none focus:ring-2",
    hasError
      ? "border-red-500 focus:ring-red-300"
      : "border-[#E5E0D8] focus:border-[#C9A84C] focus:ring-[#C9A84C]/30",
  ].join(" ");

const errCls = "mt-1.5 font-body text-xs text-red-600";
const labelCls = "mb-1.5 block font-body text-sm font-medium text-[#1A2B4A]";

/** Step 5 — Contact details and submission */
export const Stap5Contact = ({
  defaultValues,
  onVolgende,
  onVorige,
  isLoading = false,
}: Stap5ContactProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Stap5Data>({
    resolver: zodResolver(stap5Schema),
    defaultValues: {
      voornaam: defaultValues.voornaam ?? "",
      achternaam: defaultValues.achternaam ?? "",
      email: defaultValues.email ?? "",
      telefoon: defaultValues.telefoon ?? "",
      reden: defaultValues.reden,
      privacyAkkoord: defaultValues.privacyAkkoord ?? false,
    },
  });

  return (
    <form onSubmit={handleSubmit(onVolgende)} noValidate>
      <div className="mb-8">
        <h2 className="mb-2 font-display text-2xl font-semibold text-[#1A2B4A]">
          Bijna klaar — waar mogen wij de uitslag naartoe sturen?
        </h2>
        <p className="font-body text-sm text-[#6B7280]">
          Uw gegevens worden uitsluitend gebruikt voor het toesturen van de
          waardeindicatie en worden nooit aan derden verstrekt.
        </p>
      </div>

      <div className="space-y-5">
        {/* Naam */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="voornaam" className={labelCls}>
              Voornaam
            </label>
            <input
              id="voornaam"
              {...register("voornaam")}
              placeholder="Jan"
              autoComplete="given-name"
              aria-describedby={errors.voornaam ? "voornaam-fout" : undefined}
              className={inputCls(!!errors.voornaam)}
            />
            {errors.voornaam && (
              <p id="voornaam-fout" role="alert" className={errCls}>
                {errors.voornaam.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="achternaam" className={labelCls}>
              Achternaam
            </label>
            <input
              id="achternaam"
              {...register("achternaam")}
              placeholder="de Vries"
              autoComplete="family-name"
              aria-describedby={errors.achternaam ? "achternaam-fout" : undefined}
              className={inputCls(!!errors.achternaam)}
            />
            {errors.achternaam && (
              <p id="achternaam-fout" role="alert" className={errCls}>
                {errors.achternaam.message}
              </p>
            )}
          </div>
        </div>

        {/* E-mail */}
        <div>
          <label htmlFor="email" className={labelCls}>
            E-mailadres
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="jan@voorbeeld.nl"
            autoComplete="email"
            aria-describedby={errors.email ? "email-fout" : undefined}
            className={inputCls(!!errors.email)}
          />
          {errors.email && (
            <p id="email-fout" role="alert" className={errCls}>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Telefoon */}
        <div>
          <label htmlFor="telefoon" className={labelCls}>
            Telefoonnummer
          </label>
          <input
            id="telefoon"
            type="tel"
            {...register("telefoon")}
            placeholder="0612345678"
            autoComplete="tel"
            aria-describedby={errors.telefoon ? "telefoon-fout" : undefined}
            className={inputCls(!!errors.telefoon)}
          />
          {errors.telefoon && (
            <p id="telefoon-fout" role="alert" className={errCls}>
              {errors.telefoon.message}
            </p>
          )}
        </div>

        {/* Reden */}
        <fieldset>
          <legend className="mb-3 font-body text-sm font-medium text-[#1A2B4A]">
            Reden waardebepaling
          </legend>
          <Controller
            name="reden"
            control={control}
            render={({ field }) => (
              <div className="space-y-2.5">
                {REDENEN.map((reden) => (
                  <label
                    key={reden}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#E5E0D8] px-4 py-3 transition-colors hover:border-[#C9A84C]/50 has-[:checked]:border-[#C9A84C] has-[:checked]:bg-[rgba(201,168,76,0.05)]"
                  >
                    <input
                      type="radio"
                      name="reden"
                      value={reden}
                      checked={field.value === reden}
                      onChange={() => field.onChange(reden)}
                      className="h-4 w-4 accent-[#C9A84C]"
                    />
                    <span className="font-body text-sm text-[#1A1A1A]">
                      {reden}
                    </span>
                  </label>
                ))}
              </div>
            )}
          />
          {errors.reden && (
            <p role="alert" className="mt-2 font-body text-xs text-red-600">
              {errors.reden.message}
            </p>
          )}
        </fieldset>

        {/* Privacy */}
        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              {...register("privacyAkkoord")}
              aria-describedby={errors.privacyAkkoord ? "privacy-fout" : undefined}
              className="mt-0.5 h-4 w-4 accent-[#C9A84C]"
            />
            <span className="font-body text-sm text-[#6B7280] leading-relaxed">
              Ik ga akkoord met de{" "}
              <Link
                href="/privacy"
                className="text-[#1A2B4A] underline underline-offset-2 hover:text-[#C9A84C]"
                target="_blank"
                rel="noopener noreferrer"
              >
                privacyverklaring
              </Link>{" "}
              van Floberg
            </span>
          </label>
          {errors.privacyAkkoord && (
            <p id="privacy-fout" role="alert" className={`${errCls} mt-1`}>
              {errors.privacyAkkoord.message}
            </p>
          )}
        </div>
      </div>

      <NavigatieKnoppen onVorige={onVorige} isLaatsteStap isLoading={isLoading} />
    </form>
  );
};
