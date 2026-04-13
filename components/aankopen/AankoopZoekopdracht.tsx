"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Check } from "lucide-react";

/* ── Constants ───────────────────────────────────────────────── */
const REGIONS = [
  "Amsterdam",
  "Amstelveen",
  "Aalsmeer",
  "Uithoorn",
  "Ouder-Amstel",
  "Diemen",
  "Landsmeer",
  "Purmerend",
  "Zaandam",
  "Haarlem",
];

const BUDGET_OPTIONS = [
  "€ 200.000",
  "€ 250.000",
  "€ 300.000",
  "€ 350.000",
  "€ 400.000",
  "€ 450.000",
  "€ 500.000",
  "€ 600.000",
  "€ 750.000",
  "€ 1.000.000",
  "€ 1.500.000",
  "€ 2.000.000+",
];

const WONINGTYPE_OPTIONS = [
  "Geen voorkeur",
  "Appartement",
  "Tussenwoning",
  "Hoekwoning",
  "Twee-onder-een-kap",
  "Vrijstaand",
  "Penthouse",
  "Villa",
];

const OPPERVLAK_OPTIONS = [
  "Geen minimum",
  "50 m²",
  "60 m²",
  "75 m²",
  "90 m²",
  "110 m²",
  "130 m²",
  "150 m²",
  "200 m²",
];

const SLAAPKAMERS_OPTIONS = [
  "Geen minimum",
  "1 slaapkamer",
  "2 slaapkamers",
  "3 slaapkamers",
  "4 slaapkamers",
  "5+ slaapkamers",
];

/* ── Types ───────────────────────────────────────────────────── */
interface FormState {
  voornaam: string;
  achternaam: string;
  email: string;
  telefoon: string;
  minBudget: string;
  maxBudget: string;
  woningtype: string;
  minOppervlak: string;
  minSlaapkamers: string;
  wensen: string;
  privacyAkkoord: boolean;
}

const INITIAL_FORM: FormState = {
  voornaam: "",
  achternaam: "",
  email: "",
  telefoon: "",
  minBudget: "",
  maxBudget: "",
  woningtype: "",
  minOppervlak: "",
  minSlaapkamers: "",
  wensen: "",
  privacyAkkoord: false,
};

/* ── Shared field styles ────────────────────────────────────── */
const INPUT_BASE =
  "w-full rounded-lg bg-white/8 border border-white/12 text-white placeholder-white/35 font-body text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/60 focus:border-transparent transition";
const LABEL_BASE = "block font-body text-sm text-white/60 mb-1.5";
const ERROR_BASE = "font-body text-xs text-red-400 mt-1";
const SELECT_BASE =
  "w-full rounded-lg bg-white/8 border border-white/12 text-white/80 font-body text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/60 focus:border-transparent transition appearance-none cursor-pointer";

/* ── Success animation ───────────────────────────────────────── */
function SuccessView() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="mb-6">
        <circle cx="36" cy="36" r="36" fill="#C9A84C" fillOpacity="0.15" />
        <motion.path
          d="M22 36 L32 46 L50 28"
          stroke="#C9A84C"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
        />
      </svg>
      <h3 className="font-display font-bold text-white text-2xl mb-3">
        Zoekopdracht ontvangen!
      </h3>
      <p className="font-body text-white/60 max-w-sm text-base">
        Wij nemen binnen één werkdag contact met u op om uw zoekopdracht te bespreken.
      </p>
    </motion.div>
  );
}

/* ── Section ─────────────────────────────────────────────────── */
export function AankoopZoekopdracht() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [regionsOpen, setRegionsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const regionsRef = useRef<HTMLDivElement>(null);

  /* Close regions dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (regionsRef.current && !regionsRef.current.contains(e.target as Node)) {
        setRegionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Helpers */
  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleRegion = (r: string) =>
    setSelectedRegions((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );

  const removeRegion = (r: string) =>
    setSelectedRegions((prev) => prev.filter((x) => x !== r));

  /* Validation */
  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.voornaam.trim()) errs.voornaam = "Voornaam is verplicht";
    if (!form.achternaam.trim()) errs.achternaam = "Achternaam is verplicht";
    if (!form.email.trim()) errs.email = "E-mailadres is verplicht";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Ongeldig e-mailadres";
    if (!form.telefoon.trim()) errs.telefoon = "Telefoonnummer is verplicht";
    if (!form.privacyAkkoord)
      errs.privacyAkkoord = "U moet akkoord gaan met de privacyverklaring";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* Submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/submit-zoekopdracht", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, regio: selectedRegions }),
      });
      if (!res.ok) throw new Error("Fout bij verzenden");
      setIsSuccess(true);
    } catch {
      setErrors({ form: "Er is iets misgegaan. Probeer het opnieuw." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="zoekopdracht" className="py-20 bg-[#0F1B2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-xl mb-12">
          <p className="font-body text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3">
            Uw zoekopdracht
          </p>
          <h2 className="font-display font-bold text-white text-4xl leading-tight mb-4">
            Vertel ons wat u zoekt
          </h2>
          <p className="font-body text-white/60 text-lg">
            Wij zetten uw zoekopdracht direct in ons netwerk – inclusief woningen die nooit openbaar worden aangeboden.
          </p>
        </div>

        {/* Form card */}
        <div className="max-w-3xl bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <SuccessView key="success" />
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
              >
                {/* Row 1 — Naam */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="voornaam" className={LABEL_BASE}>
                      Voornaam <span className="text-[#C9A84C]">*</span>
                    </label>
                    <input
                      id="voornaam"
                      type="text"
                      autoComplete="given-name"
                      value={form.voornaam}
                      onChange={(e) => updateField("voornaam", e.target.value)}
                      className={INPUT_BASE}
                      placeholder="Jan"
                    />
                    {errors.voornaam && (
                      <p className={ERROR_BASE}>{errors.voornaam}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="achternaam" className={LABEL_BASE}>
                      Achternaam <span className="text-[#C9A84C]">*</span>
                    </label>
                    <input
                      id="achternaam"
                      type="text"
                      autoComplete="family-name"
                      value={form.achternaam}
                      onChange={(e) => updateField("achternaam", e.target.value)}
                      className={INPUT_BASE}
                      placeholder="de Vries"
                    />
                    {errors.achternaam && (
                      <p className={ERROR_BASE}>{errors.achternaam}</p>
                    )}
                  </div>
                </div>

                {/* Row 2 — Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className={LABEL_BASE}>
                      E-mailadres <span className="text-[#C9A84C]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className={INPUT_BASE}
                      placeholder="jan@voorbeeld.nl"
                    />
                    {errors.email && <p className={ERROR_BASE}>{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="telefoon" className={LABEL_BASE}>
                      Telefoonnummer <span className="text-[#C9A84C]">*</span>
                    </label>
                    <input
                      id="telefoon"
                      type="tel"
                      autoComplete="tel"
                      value={form.telefoon}
                      onChange={(e) => updateField("telefoon", e.target.value)}
                      className={INPUT_BASE}
                      placeholder="06 12 34 56 78"
                    />
                    {errors.telefoon && (
                      <p className={ERROR_BASE}>{errors.telefoon}</p>
                    )}
                  </div>
                </div>

                {/* Row 3 — Budget + Regio */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Min budget */}
                  <div className="relative">
                    <label htmlFor="minBudget" className={LABEL_BASE}>
                      Budget vanaf
                    </label>
                    <select
                      id="minBudget"
                      value={form.minBudget}
                      onChange={(e) => updateField("minBudget", e.target.value)}
                      className={SELECT_BASE}
                    >
                      <option value="">Selecteer minimum</option>
                      {BUDGET_OPTIONS.map((o) => (
                        <option key={o} value={o} className="bg-[#0F1B2D]">
                          {o}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-[38px] text-white/40"
                    />
                  </div>

                  {/* Max budget */}
                  <div className="relative">
                    <label htmlFor="maxBudget" className={LABEL_BASE}>
                      Budget tot
                    </label>
                    <select
                      id="maxBudget"
                      value={form.maxBudget}
                      onChange={(e) => updateField("maxBudget", e.target.value)}
                      className={SELECT_BASE}
                    >
                      <option value="">Selecteer maximum</option>
                      {BUDGET_OPTIONS.map((o) => (
                        <option key={o} value={o} className="bg-[#0F1B2D]">
                          {o}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-[38px] text-white/40"
                    />
                  </div>

                  {/* Regio multi-select */}
                  <div ref={regionsRef} className="relative">
                    <label className={LABEL_BASE}>Gewenste regio('s)</label>
                    <button
                      type="button"
                      onClick={() => setRegionsOpen((o) => !o)}
                      className={`${INPUT_BASE} flex items-center justify-between text-left`}
                    >
                      <span
                        className={
                          selectedRegions.length === 0 ? "text-white/35" : "text-white"
                        }
                      >
                        {selectedRegions.length === 0
                          ? "Kies regio('s)"
                          : `${selectedRegions.length} geselecteerd`}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-white/40 shrink-0 transition-transform ${regionsOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {regionsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-20 top-full left-0 right-0 mt-1 bg-[#162436] border border-white/12 rounded-lg shadow-xl overflow-hidden max-h-52 overflow-y-auto"
                        >
                          {REGIONS.map((r) => {
                            const checked = selectedRegions.includes(r);
                            return (
                              <button
                                key={r}
                                type="button"
                                onClick={() => toggleRegion(r)}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-body text-white/80 hover:bg-white/8 transition text-left"
                              >
                                <span
                                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                                    checked
                                      ? "bg-[#C9A84C] border-[#C9A84C]"
                                      : "border-white/30"
                                  }`}
                                >
                                  {checked && <Check size={10} strokeWidth={3} className="text-[#0F1B2D]" />}
                                </span>
                                {r}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Selected pills */}
                    {selectedRegions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {selectedRegions.map((r) => (
                          <span
                            key={r}
                            className="inline-flex items-center gap-1 text-xs font-body bg-[#C9A84C]/15 border border-[#C9A84C]/40 text-[#C9A84C] rounded-full px-2.5 py-1"
                          >
                            {r}
                            <button
                              type="button"
                              onClick={() => removeRegion(r)}
                              className="hover:text-white transition ml-0.5"
                              aria-label={`${r} verwijderen`}
                            >
                              <X size={10} strokeWidth={2.5} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Row 4 — Woningtype, Oppervlak, Slaapkamers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="relative">
                    <label htmlFor="woningtype" className={LABEL_BASE}>
                      Type woning
                    </label>
                    <select
                      id="woningtype"
                      value={form.woningtype}
                      onChange={(e) => updateField("woningtype", e.target.value)}
                      className={SELECT_BASE}
                    >
                      <option value="">Selecteer type</option>
                      {WONINGTYPE_OPTIONS.map((o) => (
                        <option key={o} value={o} className="bg-[#0F1B2D]">
                          {o}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-[38px] text-white/40"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="minOppervlak" className={LABEL_BASE}>
                      Minimale woonoppervlakte
                    </label>
                    <select
                      id="minOppervlak"
                      value={form.minOppervlak}
                      onChange={(e) => updateField("minOppervlak", e.target.value)}
                      className={SELECT_BASE}
                    >
                      <option value="">Selecteer oppervlak</option>
                      {OPPERVLAK_OPTIONS.map((o) => (
                        <option key={o} value={o} className="bg-[#0F1B2D]">
                          {o}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-[38px] text-white/40"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="minSlaapkamers" className={LABEL_BASE}>
                      Minimaal aantal slaapkamers
                    </label>
                    <select
                      id="minSlaapkamers"
                      value={form.minSlaapkamers}
                      onChange={(e) => updateField("minSlaapkamers", e.target.value)}
                      className={SELECT_BASE}
                    >
                      <option value="">Selecteer aantal</option>
                      {SLAAPKAMERS_OPTIONS.map((o) => (
                        <option key={o} value={o} className="bg-[#0F1B2D]">
                          {o}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-[38px] text-white/40"
                    />
                  </div>
                </div>

                {/* Row 5 — Wensen */}
                <div>
                  <label htmlFor="wensen" className={LABEL_BASE}>
                    Aanvullende wensen of opmerkingen
                  </label>
                  <textarea
                    id="wensen"
                    value={form.wensen}
                    onChange={(e) => updateField("wensen", e.target.value)}
                    className={`${INPUT_BASE} resize-none`}
                    rows={4}
                    placeholder="Bijv. tuin op het zuiden, rustige straat, nabij openbaar vervoer…"
                  />
                </div>

                {/* Row 6 — Privacy */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={form.privacyAkkoord}
                      onClick={() =>
                        updateField("privacyAkkoord", !form.privacyAkkoord)
                      }
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/60 ${
                        form.privacyAkkoord
                          ? "bg-[#C9A84C] border-[#C9A84C]"
                          : "bg-white/8 border-white/25 group-hover:border-white/40"
                      }`}
                    >
                      {form.privacyAkkoord && (
                        <Check size={11} strokeWidth={3} className="text-[#0F1B2D]" />
                      )}
                    </button>
                    <span className="font-body text-sm text-white/60">
                      Ik ga akkoord met de{" "}
                      <a
                        href="/privacyverklaring"
                        className="text-[#C9A84C] underline underline-offset-2 hover:text-white transition"
                      >
                        privacyverklaring
                      </a>{" "}
                      en geef toestemming voor contact over mijn zoekopdracht.
                    </span>
                  </label>
                  {errors.privacyAkkoord && (
                    <p className={`${ERROR_BASE} pl-8`}>{errors.privacyAkkoord}</p>
                  )}
                </div>

                {/* General error */}
                {errors.form && (
                  <p className="font-body text-sm text-red-400">{errors.form}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A84C] text-[#0F1B2D] font-body font-semibold text-base px-10 py-4 hover:bg-[#d4b460] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Verzenden…
                    </>
                  ) : (
                    "Zoekopdracht insturen"
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
