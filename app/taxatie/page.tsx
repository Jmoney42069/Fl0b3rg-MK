import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, CheckCircle, Award, Clock, FileText, Home, TrendingUp } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema } from "@/lib/schema";

export const metadata: Metadata = generatePageMetadata({
  pageTitle: "Taxatie",
  pageDescription:
    "Professionele taxatie van uw woning door een NVM-gecertificeerd taxateur in het Gooi. Snel, betrouwbaar en erkend door geldverstrekkers. Bel 035-5262960.",
  pagePath: "/taxatie",
});

const TAXATIE_TYPES = [
  {
    Icon: Home,
    title: "Woningtaxatie",
    description:
      "Voor aan- of verkoop van uw woning. Erkend door alle grote geldverstrekkers en verzekeraars.",
  },
  {
    Icon: TrendingUp,
    title: "Herbouwwaarde taxatie",
    description:
      "Bepaal de herbouwwaarde voor uw opstalverzekering. Voorkomt onder- of oververzekering.",
  },
  {
    Icon: FileText,
    title: "Taxatie voor hypotheek",
    description:
      "Vereist door banken bij het aanvragen of oversluiten van een hypotheek. Erkend NWWI-rapport.",
  },
  {
    Icon: Award,
    title: "Taxatie bij scheiding",
    description:
      "Onafhankelijke waardebepaling bij echtscheiding of verdeling van boedel.",
  },
] as const;

const STEPS = [
  { nr: "01", title: "Aanvraag", text: "U vraagt online of telefonisch een taxatie aan." },
  { nr: "02", title: "Opname", text: "Onze taxateur bezoekt uw woning voor een grondige opname." },
  { nr: "03", title: "Rapport", text: "U ontvangt binnen 3 werkdagen een gecertificeerd taxatierapport." },
  { nr: "04", title: "Klaar", text: "Het rapport is direct bruikbaar voor bank, notaris of verzekeraar." },
] as const;

const FAQS = [
  {
    question: "Hoeveel kost een taxatie?",
    answer:
      "De kosten voor een woningtaxatie bij Floberg Makelaardij starten vanaf €395. De exacte prijs hangt af van het type woning en taxatiedoel. Vraag vrijblijvend een offerte aan.",
  },
  {
    question: "Hoe lang duurt een taxatie?",
    answer:
      "De opname duurt gemiddeld 30–60 minuten. Het officiële rapport ontvangt u binnen 3 werkdagen na de opname.",
  },
  {
    question: "Is het rapport erkend door mijn bank?",
    answer:
      "Ja. Onze taxateurs zijn gecertificeerd en het rapport voldoet aan de eisen van alle grote Nederlandse geldverstrekkers (NWWI-erkend).",
  },
  {
    question: "Verschilt een taxatiewaarde van een waardebepaling?",
    answer:
      "Ja. Een gratis waardebepaling is een indicatie voor verkoopsdoeleinden. Een taxatierapport is een officieel, gecertificeerd document dat wettelijk erkend wordt.",
  },
] as const;

export default function TaxatiePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative h-72 md:h-96 flex items-end bg-[#0F1B2D]">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80"
          alt="Taxatie woning het Gooi"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="text-[#C9A96E] text-sm font-semibold tracking-widest uppercase mb-3">
            NVM-gecertificeerd
          </p>
          <h1 className="font-display font-bold text-white text-3xl md:text-5xl lg:text-6xl leading-tight mb-3">
            Taxatie van uw woning
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            Snel, betrouwbaar en erkend door alle geldverstrekkers — in het Gooi en omgeving.
          </p>
        </div>
      </section>

      {/* ── INTRO + TYPES ──────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <div className="h-0.5 w-16 bg-[#C9A96E] mb-6" />
            <h2 className="font-display font-bold text-[#1A1A1A] text-2xl md:text-4xl mb-4">
              Wanneer heeft u een taxatie nodig?
            </h2>
            <p className="text-[#6B7280] leading-relaxed">
              Een officieel taxatierapport is verplicht bij hypotheekaanvragen, sommige
              verzekeringen en juridische procedures. Floberg taxateurs zijn NWWI-gecertificeerd
              en hun rapporten worden door alle banken geaccepteerd.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TAXATIE_TYPES.map(({ Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-[#F8F7F4] flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[#1B3A5C]" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] text-xl mb-2">{title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOE HET WERKT ──────────────────────────────────────── */}
      <section className="py-20 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C9A96E] text-sm font-semibold tracking-widest uppercase mb-3">
              Werkwijze
            </p>
            <h2 className="font-display font-bold text-[#1A1A1A] text-2xl md:text-4xl">
              Taxatie in 4 stappen
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map(({ nr, title, text }) => (
              <div key={nr} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#1B3A5C] text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {nr}
                </div>
                <h3 className="font-semibold text-[#1A1A1A] text-xl mb-2">{title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USP BAR ─────────────────────────────────────────────── */}
      <section className="py-12 bg-[#1B3A5C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            {[
              { Icon: CheckCircle, text: "NWWI-gecertificeerd rapport" },
              { Icon: Clock, text: "Rapport binnen 3 werkdagen" },
              { Icon: Award, text: "Erkend door alle geldverstrekkers" },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center justify-center sm:justify-start gap-3">
                <Icon size={20} className="text-[#C9A96E] shrink-0" />
                <span className="text-white font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-[#1A1A1A] text-2xl md:text-4xl mb-10 text-center">
            Veelgestelde vragen
          </h2>

          <div className="divide-y divide-gray-100">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="py-6">
                <h3 className="font-semibold text-[#1A1A1A] text-xl mb-2">{question}</h3>
                <p className="text-[#6B7280] leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #1B3A5C 0%, #2A5280 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#C9A96E] text-sm font-semibold tracking-widest uppercase mb-4">
            Taxatie aanvragen
          </p>
          <h2 className="font-display font-bold text-white text-3xl md:text-4xl mb-4">
            Wilt u uw woning laten taxeren?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Neem contact op voor een vrijblijvende offerte of plan direct een afspraak met
            een van onze gecertificeerde taxateurs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/afspraak"
              className="inline-flex items-center justify-center rounded-full bg-white text-[#1B3A5C] font-semibold text-sm px-8 py-4 hover:bg-[#F8F7F4] transition-colors min-w-[200px]"
            >
              Plan een afspraak
            </Link>
            <a
              href="tel:+31355262960"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 text-white font-semibold text-sm px-8 py-4 hover:bg-white/10 transition-colors min-w-[200px]"
            >
              <Phone size={16} />
              035-5262960
            </a>
          </div>
        </div>
      </section>

      {/* ── JSON-LD FAQ Schema ───────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(FAQS.map(f => ({ question: f.question, answer: f.answer })))),
        }}
      />
    </>
  );
}
