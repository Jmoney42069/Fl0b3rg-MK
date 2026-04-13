/** Floberg Makelaardij — bedrijfsinformatie */
export const FLOBERG_INFO = {
  naam: "Floberg Makelaardij",
  slogan: "Uw makelaar in het Gooi",
  adressen: [
    {
      vestiging: "Huizen",
      straat: "Naarderstraat 25",
      postcode: "1271 AA",
      plaats: "Huizen",
    },
    {
      vestiging: "Bussum",
      straat: "Brinklaan 12",
      postcode: "1404 EA",
      plaats: "Bussum",
    },
  ],
  telefoon: "+31 35 524 00 00",
  email: "info@flobergmakelaardij.nl",
  openingstijden: {
    maandag: "09:00 – 17:30",
    dinsdag: "09:00 – 17:30",
    woensdag: "09:00 – 17:30",
    donderdag: "09:00 – 17:30",
    vrijdag: "09:00 – 17:00",
    zaterdag: "10:00 – 14:00",
    zondag: "Gesloten",
  },
  nvmNummer: "NVM-12345",
  kvkNummer: "32123456",
  socialeMedia: {
    facebook: "https://facebook.com/flobergmakelaardij",
    instagram: "https://instagram.com/flobergmakelaardij",
    linkedin: "https://linkedin.com/company/flobergmakelaardij",
  },
} as const;

/** Alle diensten die Floberg aanbiedt */
export const DIENSTEN = [
  {
    id: "verkoop",
    naam: "Verkoop",
    icon: "Home",
    beschrijving:
      "Professionele begeleiding bij de verkoop van uw woning in het Gooi. Van waardebepaling tot sleuteloverdracht.",
    href: "/diensten/verkoop",
  },
  {
    id: "aankoop",
    naam: "Aankoop",
    icon: "Search",
    beschrijving:
      "Wij helpen u bij het vinden en aankopen van uw droomwoning. Persoonlijk advies en scherpe onderhandeling.",
    href: "/diensten/aankoop",
  },
  {
    id: "taxatie",
    naam: "Taxatie",
    icon: "FileText",
    beschrijving:
      "NWWI-gecertificeerde taxaties voor hypotheek, verkoop of echtscheiding. Snel en betrouwbaar.",
    href: "/diensten/taxatie",
  },
  {
    id: "verhuur",
    naam: "Verhuur",
    icon: "Key",
    beschrijving:
      "Verhuur van woningen en appartementen in het Gooi. Wij vinden de juiste huurder voor uw pand.",
    href: "/diensten/verhuur",
  },
  {
    id: "waardebepaling",
    naam: "Gratis waardebepaling",
    icon: "TrendingUp",
    beschrijving:
      "Benieuwd wat uw woning waard is? Vraag een gratis en vrijblijvende waardebepaling aan.",
    href: "/waardebepaling",
  },
  {
    id: "advies",
    naam: "Woningadvies",
    icon: "MessageSquare",
    beschrijving:
      "Onafhankelijk advies over de woningmarkt in het Gooi. Voor kopers, verkopers en investeerders.",
    href: "/diensten/advies",
  },
] as const;

/** Regio's waarin Floberg actief is */
export const REGIO_LIST = [
  "Huizen",
  "Bussum",
  "Naarden",
  "Hilversum",
  "Blaricum",
  "Laren",
  "Muiden",
  "Weesp",
  "Baarn",
] as const;
