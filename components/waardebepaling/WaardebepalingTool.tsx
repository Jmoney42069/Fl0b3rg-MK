"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { berekenWaarde } from "@/lib/waardeBerekeningAlgoritme";
import type { WaardebepalingFormData, WaardeResultaat } from "@/types/waardebepaling";
import type {
  Stap1Data,
  Stap2Data,
  Stap3Data,
  Stap4Data,
  Stap5Data,
} from "@/lib/waardebepalingSchema";
import { ProgressBar } from "@/components/waardebepaling/ProgressBar";
import { Stap1Adres } from "@/components/waardebepaling/stappen/Stap1Adres";
import { Stap2Type } from "@/components/waardebepaling/stappen/Stap2Type";
import { Stap3Kenmerken } from "@/components/waardebepaling/stappen/Stap3Kenmerken";
import { Stap4Staat } from "@/components/waardebepaling/stappen/Stap4Staat";
import { Stap5Contact } from "@/components/waardebepaling/stappen/Stap5Contact";
import { ResultaatScherm } from "@/components/waardebepaling/ResultaatScherm";

/* ---------- Loading screen ---------- */
const LoadingScherm = () => (
  <div
    className="flex min-h-[340px] flex-col items-center justify-center gap-6 py-16"
    role="status"
    aria-live="polite"
    aria-label="Woningwaarde wordt berekend"
  >
    <div className="flex items-center gap-2" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-3 w-3 rounded-full bg-[#C9A84C]"
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.22 }}
        />
      ))}
    </div>
    <p className="font-body text-sm text-[#6B7280]">
      Wij analyseren vergelijkbare woningen in uw regio…
    </p>
  </div>
);

/* ---------- Slide variants ---------- */
const makeVariants = (reduced: boolean) =>
  reduced
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1, transition: { duration: 0.25 } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
      }
    : {
        enter: (d: number) => ({
          x: d > 0 ? 56 : -56,
          opacity: 0,
        }),
        center: {
          x: 0,
          opacity: 1,
          transition: {
            duration: 0.35,
            ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
          },
        },
        exit: (d: number) => ({
          x: d < 0 ? 56 : -56,
          opacity: 0,
          transition: { duration: 0.22 },
        }),
      };

/* ---------- Main tool ---------- */
export const WaardebepalingTool = () => {
  const prefersReduced = useReducedMotion();
  const variants = makeVariants(!!prefersReduced);

  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1=forward, -1=backward
  const [formData, setFormData] = useState<Partial<WaardebepalingFormData>>({});
  const [resultaat, setResultaat] = useState<WaardeResultaat | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (data: Partial<WaardebepalingFormData>) =>
    setFormData((prev) => ({ ...prev, ...data }));

  const handleVolgende = (data: Partial<WaardebepalingFormData>) => {
    updateFormData(data);
    setDirection(1);
    setCurrentStep((prev) => prev + 1);
  };

  const handleVorige = () => {
    setDirection(-1);
    setCurrentStep((prev) => prev - 1);
  };

  const handleFinalSubmit = async (data: Stap5Data) => {
    updateFormData(data);
    setIsLoading(true);
    // Simulate server-side analysis delay for UX credibility
    await new Promise<void>((resolve) => setTimeout(resolve, 1800));
    const finalData = { ...formData, ...data };
    setResultaat(berekenWaarde(finalData));
    setIsLoading(false);
  };

  if (isLoading) return <div className="p-8"><LoadingScherm /></div>;

  if (resultaat) {
    return (
      <div className="p-6 sm:p-8">
        <ResultaatScherm resultaat={resultaat} />
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8">
      <ProgressBar huidigStap={currentStep} />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {currentStep === 1 && (
            <Stap1Adres
              defaultValues={formData}
              onVolgende={(data: Stap1Data) => handleVolgende(data)}
            />
          )}
          {currentStep === 2 && (
            <Stap2Type
              defaultValues={formData}
              onVolgende={(data: Stap2Data) => handleVolgende(data)}
              onVorige={handleVorige}
            />
          )}
          {currentStep === 3 && (
            <Stap3Kenmerken
              defaultValues={formData}
              onVolgende={(data: Stap3Data) => handleVolgende(data)}
              onVorige={handleVorige}
            />
          )}
          {currentStep === 4 && (
            <Stap4Staat
              defaultValues={formData}
              onVolgende={(data: Stap4Data) => handleVolgende(data)}
              onVorige={handleVorige}
            />
          )}
          {currentStep === 5 && (
            <Stap5Contact
              defaultValues={formData}
              onVolgende={handleFinalSubmit}
              onVorige={handleVorige}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
