export type ReviewSource = "Funda" | "Trustoo" | "Google";
export type TransactionType = "verkoop" | "aankoop" | "taxatie";

export interface Review {
  id: string;
  author: string;
  rating: number;
  source: ReviewSource;
  date: string;
  title: string;
  text: string;
  transactionType: TransactionType;
  city: string;
}

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Thomas B.",
    rating: 10.0,
    source: "Funda",
    date: "2026-03-10",
    title: "Razendsnel verkocht boven vraagprijs",
    text: "Marc van der Berg heeft onze woning aan de Kerklaan in Huizen binnen negen dagen verkocht — en dat 6% boven de vraagprijs. Zijn voorbereiding was tot in de puntjes verzorgd, van professionele fotografie tot een strakke verkoopstrategie. We hadden geen moment het gevoel dat we er alleen voor stonden. Hartelijk aanbevolen!",
    transactionType: "verkoop",
    city: "Huizen",
  },
  {
    id: "r2",
    author: "Marieke V.",
    rating: 9.5,
    source: "Trustoo",
    date: "2026-02-14",
    title: "Sophie vond onze droomwoning in Bussum",
    text: "Via Sophie Floberg kregen we als eerste toegang tot een woning die nooit op Funda heeft gestaan. Ze kende de verkopers persoonlijk en regelde een bezichtiging nog voordat het pand officieel op de markt was. De hele begeleiding van eerste gesprek tot sleuteloverdracht was professioneel en warm. We zijn enorm blij.",
    transactionType: "aankoop",
    city: "Bussum",
  },
  {
    id: "r3",
    author: "Robert D.",
    rating: 9.0,
    source: "Google",
    date: "2026-01-28",
    title: "Eerlijk advies en snelle afhandeling",
    text: "Wat ik waardeer aan Marc is dat hij niet zegt wat je wil horen, maar wat je moet horen. Zijn marktanalyse voor onze hoekwoning in Huizen was realistisch en kloppend — we hebben exact de prijs gekregen die hij had voorspeld. De administratieve afhandeling via Henk Visser verliep bovendien vlekkeloos.",
    transactionType: "verkoop",
    city: "Huizen",
  },
  {
    id: "r4",
    author: "Anna K.",
    rating: 9.5,
    source: "Trustoo",
    date: "2025-12-05",
    title: "Perfect begeleid als starter op de woningmarkt",
    text: "Als eerste koper wist ik echt niet waar ik moest beginnen. Sophie nam alle tijd om me alles uit te leggen, mee te nemen naar bezichtigingen en scherp te onderhandelen. Uiteindelijk kochten we een appartement in het centrum van Bussum ruim onder de vraagprijs. Zonder Sophie had ik dit nooit kunnen doen.",
    transactionType: "aankoop",
    city: "Bussum",
  },
  {
    id: "r5",
    author: "Peter S.",
    rating: 8.5,
    source: "Funda",
    date: "2025-11-19",
    title: "Nauwkeurige taxatie, snel geregeld",
    text: "Pieter van Dijk heeft onze vrijstaande woning in Naarden getaxeerd voor de bank. Hij was goed voorbereid, kende de lokale markt uitstekend en leverde het rapport binnen twee werkdagen op. De waarde die hij vastlegde klopte precies met wat ons later ook uit de verkoop bleek. Efficiënt en betrouwbaar.",
    transactionType: "taxatie",
    city: "Naarden",
  },
  {
    id: "r6",
    author: "Claudia M.",
    rating: 10.0,
    source: "Trustoo",
    date: "2025-10-22",
    title: "Lisa maakte van onze woning een plaatje",
    text: "Lisa de Groot heeft onze woning in Laren gestyled en gefotografeerd — en het verschil was indrukwekkend. De bezichtigings-agenda was binnen twee dagen vol en we kozen uiteindelijk uit zeven biedingen. Lisa was bereikbaar, enthousiast en dacht in mogelijkheden in plaats van problemen. Een fantastische ervaring!",
    transactionType: "verkoop",
    city: "Naarden",
  },
  {
    id: "r7",
    author: "Joost W.",
    rating: 9.0,
    source: "Google",
    date: "2025-09-30",
    title: "Topservice bij aankoop in Blaricum",
    text: "We wilden per se in Blaricum wonen, maar de markt daar is extreem krap. Marc van der Berg heeft ons wekenlang actief geïnformeerd over beschikbaar aanbod — inclusief woningen die nooit online kwamen. Zijn jarenlange netwerk maakte het verschil. Na vier maanden wonen we nu in ons droomhuis.",
    transactionType: "aankoop",
    city: "Naarden",
  },
  {
    id: "r8",
    author: "Sandra P.",
    rating: 9.5,
    source: "Funda",
    date: "2025-08-15",
    title: "Fijn dat alles zo transparant verliep",
    text: "Wat me het meest is bijgebleven is de transparantie van het hele team bij Floberg. Henk Visser hield ons altijd up-to-date over de voortgang van het dossier en als er iets onduidelijk was, belde hij zelf terug. De verkoop van onze twee-onder-één-kapwoning in Bussum verliep zonder één vervelende verrassing.",
    transactionType: "verkoop",
    city: "Bussum",
  },
];
