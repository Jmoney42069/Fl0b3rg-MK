import type { Metadata } from "next";
import { VerkopHero } from "@/components/verkopen/VerkopHero";
import { VerkopStats } from "@/components/verkopen/VerkopStats";
import { VerkopStappenplan } from "@/components/verkopen/VerkopStappenplan";
import { VerkopUSPs } from "@/components/verkopen/VerkopUSPs";
import { VerkopWaardebepalingCTA } from "@/components/verkopen/VerkopWaardebepalingCTA";
import { VerkopGetuigenissen } from "@/components/verkopen/VerkopGetuigenissen";
import { VerkopKennismakingCTA } from "@/components/verkopen/VerkopKennismakingCTA";

import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  pageTitle: "Woning Verkopen",
  pageDescription:
    "Verkoop uw woning voor de maximale prijs met Floberg Makelaardij. Lokale specialist in het Gooi — Huizen, Bussum en omgeving. Persoonlijk advies, bewezen resultaten.",
  pagePath: "/verkopen",
});

export default function VerkopenPage() {
  return (
    <>
      <VerkopHero />
      <VerkopStats />
      <VerkopStappenplan />
      <VerkopUSPs />
      <VerkopWaardebepalingCTA />
      <VerkopGetuigenissen />
      <VerkopKennismakingCTA />
    </>
  );
}
