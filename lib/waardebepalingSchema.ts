import { z } from "zod";

export const stap1Schema = z.object({
  straat: z.string().min(1, "Straatnaam is verplicht"),
  huisnummer: z.string().min(1, "Huisnummer is verplicht"),
  postcode: z
    .string()
    .regex(
      /^[1-9][0-9]{3}\s?[A-Z]{2}$/,
      "Vul een geldige postcode in (bijv. 1271 AA)"
    ),
  plaatsnaam: z.enum(
    [
      "Huizen",
      "Bussum",
      "Naarden",
      "Muiden",
      "Weesp",
      "Hilversum",
      "Laren",
      "Blaricum",
      "Anders",
    ],
    { message: "Selecteer een plaatsnaam" }
  ),
});

export const stap2Schema = z.object({
  woningtype: z.enum(
    ["Tussenwoning", "Hoekwoning", "2-onder-1-kap", "Vrijstaand", "Appartement", "Anders"],
    { message: "Selecteer een woningtype" }
  ),
  bouwjaar: z
    .number()
    .refine((n) => !Number.isNaN(n), "Vul een geldig bouwjaar in")
    .refine((n) => n >= 1850 && n <= 2025, "Vul een geldig bouwjaar in tussen 1850 en 2025"),
});

export const stap3Schema = z
  .object({
    oppervlak: z
      .number()
      .refine((n) => !Number.isNaN(n), "Vul een geldig oppervlak in")
      .min(20, "Woonoppervlak moet minimaal 20 m² zijn")
      .max(500, "Woonoppervlak mag maximaal 500 m² zijn"),
    aantalKamers: z.number().min(1).max(12),
    aantalBadkamers: z.number().min(1).max(5),
    heeftTuin: z.boolean(),
    tuinLigging: z
      .enum(["Zuid", "Noord", "Oost", "West", "Meerdere richtingen"])
      .optional(),
    heeftGarage: z.boolean(),
  })
  .refine((data) => !data.heeftTuin || data.tuinLigging !== undefined, {
    message: "Selecteer de ligging van de tuin",
    path: ["tuinLigging"],
  });

export const stap4Schema = z.object({
  onderhoudsstaat: z.enum(
    ["Opknapper", "Redelijk", "Goed", "Uitstekend", "Nieuwbouwstaat"],
    { message: "Selecteer de onderhoudsstaat" }
  ),
  energielabel: z.enum(
    ["A+++", "A++", "A+", "A", "B", "C", "D", "E", "F", "G", "Onbekend"],
    { message: "Selecteer het energielabel" }
  ),
});

export const stap5Schema = z.object({
  voornaam: z.string().min(1, "Voornaam is verplicht"),
  achternaam: z.string().min(1, "Achternaam is verplicht"),
  email: z.string().email("Vul een geldig e-mailadres in"),
  telefoon: z
    .string()
    .regex(
      /^(\+31|0031|0)[1-9][0-9]{8}$/,
      "Vul een geldig Nederlands telefoonnummer in"
    ),
  reden: z.enum(
    [
      "Ik overweeg te verkopen",
      "Ik wil mijn hypotheek verhogen",
      "Scheidingsboedel / nalatenschap",
      "Puur informatief",
    ],
    { message: "Selecteer uw reden" }
  ),
  privacyAkkoord: z
    .boolean()
    .refine(
      (val) => val === true,
      "U moet akkoord gaan met de privacyverklaring"
    ),
});

export type Stap1Data = z.infer<typeof stap1Schema>;
export type Stap2Data = z.infer<typeof stap2Schema>;
export type Stap3Data = z.infer<typeof stap3Schema>;
export type Stap4Data = z.infer<typeof stap4Schema>;
export type Stap5Data = z.infer<typeof stap5Schema>;
