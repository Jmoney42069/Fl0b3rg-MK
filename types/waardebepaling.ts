export interface WaardebepalingFormData {
  // Stap 1
  straat: string;
  huisnummer: string;
  postcode: string;
  plaatsnaam: Plaatsnaam;

  // Stap 2
  woningtype: Woningtype;
  bouwjaar: number;

  // Stap 3
  oppervlak: number;
  aantalKamers: number;
  aantalBadkamers: number;
  heeftTuin: boolean;
  tuinLigging?: TuinLigging;
  heeftGarage: boolean;

  // Stap 4
  onderhoudsstaat: Onderhoudsstaat;
  energielabel: Energielabel;

  // Stap 5
  voornaam: string;
  achternaam: string;
  email: string;
  telefoon: string;
  reden: VerkoopReden;
  privacyAkkoord: boolean;
}

export type Plaatsnaam =
  | "Huizen"
  | "Bussum"
  | "Naarden"
  | "Muiden"
  | "Weesp"
  | "Hilversum"
  | "Laren"
  | "Blaricum"
  | "Anders";

export type Woningtype =
  | "Tussenwoning"
  | "Hoekwoning"
  | "2-onder-1-kap"
  | "Vrijstaand"
  | "Appartement"
  | "Anders";

export type Onderhoudsstaat =
  | "Opknapper"
  | "Redelijk"
  | "Goed"
  | "Uitstekend"
  | "Nieuwbouwstaat";

export type Energielabel =
  | "A+++"
  | "A++"
  | "A+"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "Onbekend";

export type TuinLigging =
  | "Zuid"
  | "Noord"
  | "Oost"
  | "West"
  | "Meerdere richtingen";

export type VerkoopReden =
  | "Ik overweeg te verkopen"
  | "Ik wil mijn hypotheek verhogen"
  | "Scheidingsboedel / nalatenschap"
  | "Puur informatief";

export interface WaardeResultaat {
  min: number;
  max: number;
  plaatsnaam: string;
  berekendeWaarde: number;
}
