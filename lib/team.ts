export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  phone: string;
  email: string;
  photo: string;
  specialisms: string[];
  yearsExperience: number;
  soldThisYear: number;
  linkedIn: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "marc-van-der-berg",
    name: "Marc van der Berg",
    role: "Register Makelaar",
    bio: "Marc is al meer dan 22 jaar het gezicht van Floberg in Huizen en kent elke straat, elk type woning en elke marktbeweging in het Gooi. Hij onderhandelt scherp, denkt mee met zijn klanten en is altijd eerlijk — ook als het nieuws minder goed is.",
    phone: "06-12 34 56 78",
    email: "marc@floberg.nl",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    specialisms: ["Huizen Noord", "Vrijstaande woningen", "Luxe segment"],
    yearsExperience: 22,
    soldThisYear: 28,
    linkedIn: "https://linkedin.com/in/marc-van-der-berg-floberg",
  },
  {
    id: "sophie-floberg",
    name: "Sophie Floberg",
    role: "Aankoopmakelaar",
    bio: "Sophie heeft een talent voor het vinden van woningen die officieel niet eens te koop staan. Haar netwerk in Bussum en omgeving is ongeëvenaard en haar enthousiasme werkt aanstekelijk op iedereen die met haar samenwerkt.",
    phone: "06-23 45 67 89",
    email: "sophie@floberg.nl",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    specialisms: ["Bussum centrum", "Eerste kopers", "Off-market aanbod"],
    yearsExperience: 11,
    soldThisYear: 21,
    linkedIn: "https://linkedin.com/in/sophie-floberg-makelaar",
  },
  {
    id: "pieter-van-dijk",
    name: "Pieter van Dijk",
    role: "Taxateur",
    bio: "Pieter combineert zijn technische achtergrond als bouwkundige met jarenlange taxatie-ervaring om elke woning tot op de euro nauwkeurig te waarderen. Hij werkt voor particulieren, notarissen en banken in de gehele Gooi-regio.",
    phone: "06-34 56 78 90",
    email: "pieter@floberg.nl",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    specialisms: ["Taxaties", "Bouwkundige keuring", "Naarden & Bussum"],
    yearsExperience: 15,
    soldThisYear: 14,
    linkedIn: "https://linkedin.com/in/pieter-van-dijk-taxateur",
  },
  {
    id: "lisa-de-groot",
    name: "Lisa de Groot",
    role: "Verkoopmakelaar",
    bio: "Lisa heeft een oog voor presentatie en weet precies hoe een woning het beste tot zijn recht komt — van de fotografie tot de Open Huis dag. In Laren en Blaricum is zij inmiddels een bekend en gewaardeerd gezicht.",
    phone: "06-45 67 89 01",
    email: "lisa@floberg.nl",
    photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80",
    specialisms: ["Laren & Blaricum", "Woningstyling", "Gezinswoningen"],
    yearsExperience: 8,
    soldThisYear: 19,
    linkedIn: "https://linkedin.com/in/lisa-de-groot-floberg",
  },
  {
    id: "henk-visser",
    name: "Henk Visser",
    role: "Kantoormanager",
    bio: "Henk is de stille kracht achter de organisatie: hij zorgt dat elk dossier klopt, iedere afspraak soepel verloopt en niemand door de cracks valt. Zijn 18 jaar ervaring in de sector betekent dat vrijwel elke situatie hem vertrouwd voorkomt.",
    phone: "06-56 78 90 12",
    email: "henk@floberg.nl",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
    specialisms: ["Dossierbehandeling", "Notariszaken", "Verhuur"],
    yearsExperience: 18,
    soldThisYear: 17,
    linkedIn: "https://linkedin.com/in/henk-visser-floberg",
  },
];
