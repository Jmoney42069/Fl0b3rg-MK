import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import DienstenSection from "@/components/sections/DienstenSection";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  pageTitle: "Makelaar Huizen & Bussum",
  pageDescription:
    "Floberg Makelaardij verzorgt de verkoop, aankoop en taxatie van woningen in het Gooi. NVM-gecertificeerd, lokaal geworteld in Huizen en Bussum. Vraag vandaag een gratis waardebepaling aan.",
  pagePath: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <DienstenSection />
    </>
  );
}
