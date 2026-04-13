"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, Clock, MapPin, CheckCircle } from "lucide-react";

const CONTACT_ITEMS = [
  {
    Icon: Phone,
    label: "Telefoon",
    value: "035-5262960",
    href: "tel:+31355262960",
  },
  {
    Icon: Mail,
    label: "E-mail",
    value: "info@floberg.nl",
    href: "mailto:info@floberg.nl",
  },
  {
    Icon: MapPin,
    label: "Adres",
    value: "Achterbaan 40, 1271 TZ Huizen",
    href: "https://maps.google.com/?q=Achterbaan+40,+1271+TZ+Huizen",
    external: true,
  },
  {
    Icon: Clock,
    label: "Openingstijden",
    value: "Ma–vr 09:00–17:30 · Za op afspraak",
    href: null,
  },
] as const;

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Algemene vraag",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate send — replace with real API call if needed
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
  };

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="bg-[#1B3A5C] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#C9A96E] text-sm font-semibold tracking-widest uppercase mb-3">
            Neem contact op
          </p>
          <h1 className="font-display font-bold text-white text-3xl md:text-5xl lg:text-6xl leading-tight mb-4">
            Wij staan voor u klaar
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            Heeft u een vraag, wilt u een afspraak maken of zoekt u meer informatie? Vul het
            formulier in of bel ons direct.
          </p>
        </div>
      </section>

      {/* ── CONTENT ────────────────────────────────────────── */}
      <section className="py-20 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* ── LEFT: Contact info ─────────────────────── */}
            <div>
              <div className="h-0.5 w-16 bg-[#C9A96E] mb-8" />
              <h2 className="font-display font-bold text-[#1A1A1A] text-2xl md:text-3xl mb-6">
                Floberg Makelaardij
              </h2>

              <ul className="space-y-5 mb-10">
                {CONTACT_ITEMS.map(({ Icon, label, value, href, ...rest }) => {
                  const external = "external" in rest ? rest.external : false;
                  const inner = (
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#1B3A5C] flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-[#C9A96E]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#6B7280] uppercase tracking-wider font-medium mb-0.5">
                          {label}
                        </p>
                        <p className="text-[#1A1A1A] font-medium">{value}</p>
                      </div>
                    </div>
                  );

                  if (!href) return <li key={label}>{inner}</li>;
                  if (external)
                    return (
                      <li key={label}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-80 transition-opacity block"
                        >
                          {inner}
                        </a>
                      </li>
                    );
                  return (
                    <li key={label}>
                      <a href={href} className="hover:opacity-80 transition-opacity block">
                        {inner}
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/* Quick CTA */}
              <div className="rounded-xl bg-[#1B3A5C] p-6 text-white">
                <p className="font-semibold text-lg mb-2">Liever direct een afspraak?</p>
                <p className="text-white/70 text-sm mb-4">
                  Plan een gratis, vrijblijvend kennismakingsgesprek met een van onze makelaars.
                </p>
                <Link
                  href="/afspraak"
                  className="inline-flex items-center justify-center rounded-full bg-[#C9A96E] text-[#1B3A5C] font-semibold text-sm px-6 py-3 hover:bg-[#b8955f] transition-colors"
                >
                  Maak een afspraak
                </Link>
              </div>
            </div>

            {/* ── RIGHT: Contact form ────────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-display font-bold text-[#1A1A1A] text-xl mb-2">
                    Bericht verstuurd!
                  </h3>
                  <p className="text-[#6B7280] mb-6">
                    Wij nemen binnen 1 werkdag contact met u op.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm({ name: "", email: "", phone: "", subject: "Algemene vraag", message: "" });
                    }}
                    className="text-sm text-[#1B3A5C] underline hover:no-underline"
                  >
                    Nog een bericht sturen
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display font-bold text-[#1A1A1A] text-xl mb-2">
                    Stuur ons een bericht
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                        Naam <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]"
                        placeholder="Jan de Vries"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                        Telefoon
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]"
                        placeholder="06-12345678"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                      E-mail <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]"
                      placeholder="jan@voorbeeld.nl"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                      Onderwerp
                    </label>
                    <select
                      id="contact-subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A5C] bg-white"
                    >
                      <option>Algemene vraag</option>
                      <option>Woning verkopen</option>
                      <option>Woning kopen</option>
                      <option>Taxatie aanvragen</option>
                      <option>Waardebepaling</option>
                      <option>Afspraak maken</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                      Bericht <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A5C] resize-none"
                      placeholder="Uw bericht..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-[#1B3A5C] text-white font-semibold py-4 text-sm hover:bg-[#162E4A] transition-colors disabled:opacity-60"
                  >
                    {loading ? "Versturen..." : "Verstuur bericht"}
                  </button>

                  <p className="text-xs text-[#6B7280] text-center">
                    Wij reageren binnen 1 werkdag · Uw gegevens worden vertrouwelijk behandeld
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
