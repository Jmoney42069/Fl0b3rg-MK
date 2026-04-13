import type { Metadata } from "next";
import { Shield, Star, Award } from "lucide-react";
import { WaardebepalingTool } from "@/components/waardebepaling/WaardebepalingTool";

import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  pageTitle: "Gratis Waardebepaling",
  pageDescription:
    "Wat is uw woning waard? Ontvang in 2 minuten een gratis waardeindicatie van uw woning in het Gooi. Gebaseerd op actuele verkoopdata in Huizen, Bussum, Naarden en omgeving.",
  pagePath: "/waardebepaling",
});

const TRUST_BADGES = [
  {
    icon: Shield,
    label: "NVM-makelaar",
    sublabel: "Gecertificeerd",
  },
  {
    icon: Star,
    label: "100% vrijblijvend",
    sublabel: "Geen verplichtingen",
  },
  {
    icon: Award,
    label: "Actuele marktdata",
    sublabel: "Bijgewerkt per kwartaal",
  },
] as const;

export default function WaardebepalingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#1A2B4A] pb-20 pt-32">
        <div className="container-custom text-center">
          <p className="mb-3 font-body text-sm font-medium uppercase tracking-widest text-[#C9A84C]">
            Gratis &amp; vrijblijvend
          </p>
          <h1 className="mb-4 font-display text-4xl font-bold text-white sm:text-5xl">
            Wat is uw woning waard?
          </h1>
          <p className="mx-auto mb-10 max-w-xl font-body text-base text-white/70">
            Vul in 2 minuten uw woninggegevens in en ontvang direct een
            nauwkeurige waardeindicatie op basis van actuele marktdata in{" "}
            Huizen, Bussum, Naarden en omgeving.
          </p>

          {/* Trust badges */}
          <ul
            className="mx-auto flex max-w-lg flex-col justify-center gap-4 sm:flex-row"
            aria-label="Kwaliteitskenmerken"
          >
            {TRUST_BADGES.map(({ icon: Icon, label, sublabel }) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <Icon
                  className="h-5 w-5 shrink-0 text-[#C9A84C]"
                  aria-hidden="true"
                />
                <div className="text-left">
                  <p className="font-body text-sm font-semibold text-white">
                    {label}
                  </p>
                  <p className="font-body text-xs text-white/60">{sublabel}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tool card — overlaps hero */}
      <section className="container-custom pb-24">
        <div className="-mt-12 mx-auto max-w-[720px] overflow-hidden rounded-[20px] bg-white shadow-[0_20px_60px_rgba(26,43,74,0.15)]">
          <WaardebepalingTool />
        </div>
      </section>
    </>
  );
}
