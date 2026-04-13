import type {
  WaardebepalingFormData,
  WaardeResultaat,
  Plaatsnaam,
  Woningtype,
  Onderhoudsstaat,
  Energielabel,
} from "@/types/waardebepaling";

const basePrijsPerM2: Record<Plaatsnaam, number> = {
  Huizen: 4800,
  Bussum: 5200,
  Naarden: 5600,
  Muiden: 5000,
  Weesp: 4600,
  Hilversum: 4900,
  Laren: 7500,
  Blaricum: 8200,
  Anders: 4500,
};

const typeMultiplier: Record<Woningtype, number> = {
  Tussenwoning: 1.0,
  Hoekwoning: 1.08,
  "2-onder-1-kap": 1.15,
  Vrijstaand: 1.35,
  Appartement: 0.92,
  Anders: 1.0,
};

const conditieMultiplier: Record<Onderhoudsstaat, number> = {
  Opknapper: 0.82,
  Redelijk: 0.93,
  Goed: 1.0,
  Uitstekend: 1.08,
  Nieuwbouwstaat: 1.15,
};

const energieMultiplier: Record<Energielabel, number> = {
  "A+++": 1.06,
  "A++": 1.05,
  "A+": 1.04,
  A: 1.03,
  B: 1.01,
  C: 1.0,
  D: 0.98,
  E: 0.96,
  F: 0.94,
  G: 0.92,
  Onbekend: 0.99,
};

/** Calculates an indicative property value range based on form data. */
export function berekenWaarde(
  data: Partial<WaardebepalingFormData>
): WaardeResultaat {
  const {
    plaatsnaam = "Anders",
    woningtype = "Tussenwoning",
    oppervlak = 80,
    onderhoudsstaat = "Goed",
    energielabel = "C",
    heeftTuin = false,
    tuinLigging,
  } = data;

  const tuinBonus =
    heeftTuin && tuinLigging === "Zuid"
      ? 1.04
      : heeftTuin
      ? 1.02
      : 1.0;

  const basisWaarde =
    oppervlak *
    basePrijsPerM2[plaatsnaam] *
    typeMultiplier[woningtype] *
    conditieMultiplier[onderhoudsstaat] *
    energieMultiplier[energielabel] *
    tuinBonus;

  const min = Math.round((basisWaarde * 0.93) / 1000) * 1000;
  const max = Math.round((basisWaarde * 1.07) / 1000) * 1000;

  return { min, max, plaatsnaam, berekendeWaarde: basisWaarde };
}

/** Formats a number as Dutch currency (no decimals). */
export function formateerValuta(bedrag: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(bedrag);
}
