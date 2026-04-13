import type { Metadata } from "next";
import { AankoopHero } from "@/components/aankopen/AankoopHero";
import { AankoopStats } from "@/components/aankopen/AankoopStats";
import { AankoopStappenplan } from "@/components/aankopen/AankoopStappenplan";
import { AankoopZoekopdracht } from "@/components/aankopen/AankoopZoekopdracht";
import { AankoopUSPs } from "@/components/aankopen/AankoopUSPs";
import { AankoopGetuigenissen } from "@/components/aankopen/AankoopGetuigenissen";
import { AankoopKennismakingCTA } from "@/components/aankopen/AankoopKennismakingCTA";

import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  pageTitle: "Woning Kopen",
  pageDescription:
    "Koop uw droomwoning met de aankoopbegeleiding van Floberg Makelaardij. Lokale expertise en persoonlijke begeleiding in het Gooi.",
  pagePath: "/kopen",
});

export default function AankopenPage() {
  return (
    <>
      <AankoopHero />
      <AankoopStats />
      <AankoopStappenplan />
      <AankoopZoekopdracht />
      <AankoopUSPs />
      <AankoopGetuigenissen />
      <AankoopKennismakingCTA />
    </>
  );
}
