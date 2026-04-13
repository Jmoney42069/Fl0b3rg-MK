"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Phone,
  Mail,
  Clock,
  ExternalLink,
  ChevronRight,
  MapPin,
} from "lucide-react";

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const colVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// ─── Data ────────────────────────────────────────────────────────────────────

const DIENSTEN_LINKS = [
  { label: "Woning Verkopen", href: "/verkopen" },
  { label: "Woning Kopen", href: "/kopen" },
  { label: "Taxatie", href: "/taxatie" },
  { label: "Verhuur", href: "/verhuur" },
  { label: "Waardebepaling", href: "/waardebepaling" },
  { label: "Nieuwbouw", href: "/nieuwbouw" },
] as const;

const AANBOD_LINKS = [
  { label: "Alle woningen", href: "/aanbod" },
  { label: "Huizen", href: "/aanbod?regio=Huizen" },
  { label: "Bussum", href: "/aanbod?regio=Bussum" },
  { label: "Naarden", href: "/aanbod?regio=Naarden" },
  { label: "Blaricum", href: "/aanbod?regio=Blaricum" },
  { label: "Laren", href: "/aanbod?regio=Laren" },
] as const;

const OVER_ONS_LINKS = [
  { label: "Ons Team", href: "/over-ons" },
  { label: "Werkwijze", href: "/werkwijze" },
  { label: "NVM Keurmerk", href: "/nvm" },
  { label: "Reviews", href: "/over-ons#reviews" },
  { label: "Nieuws", href: "/nieuws" },
  { label: "Contact", href: "/contact" },
] as const;

// ─── Sub-components ──────────────────────────────────────────────────────────

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[#C9A96E] uppercase tracking-wider text-xs font-semibold mb-5">
      {children}
    </h3>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-1 text-sm text-white/70 hover:text-[#C9A96E] transition-colors duration-200"
      >
        <ChevronRight
          size={12}
          className="shrink-0 text-white/30 group-hover:text-[#C9A96E] transition-colors"
        />
        {children}
      </Link>
    </li>
  );
}

// ─── Main Footer ─────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer aria-label="Sitefooter" className="bg-[#1B3A5C]">
      {/* ── Map / Visit bar ─────────────────────────────────────────────── */}
      <div className="bg-[#162E4A] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Text side */}
          <div>
            <p className="text-lg font-semibold text-white mb-1">
              Bezoek ons kantoor
            </p>
            <p className="text-sm text-white/60 flex items-center gap-1.5">
              <MapPin size={14} className="text-[#C9A96E] shrink-0" />
              Achterbaan 40, 1271 TZ Huizen
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Map placeholder */}
            <div
              className="hidden sm:flex relative w-[280px] h-[100px] rounded-lg overflow-hidden bg-[#1E3D60] items-center justify-center border border-white/10"
              aria-label="Kaartlocatie kantoor Floberg"
            >
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg,transparent,transparent 24px,rgba(255,255,255,.15) 24px,rgba(255,255,255,.15) 25px),repeating-linear-gradient(90deg,transparent,transparent 24px,rgba(255,255,255,.15) 24px,rgba(255,255,255,.15) 25px)",
                }}
              />
              <div className="relative flex flex-col items-center gap-1">
                <MapPin size={28} className="text-[#C9A96E]" />
                <span className="text-xs text-white/60">
                  Achterbaan 40, Huizen
                </span>
              </div>
            </div>

            {/* Route button */}
            <a
              href="https://maps.google.com/?q=Achterbaan+40,+1271+TZ+Huizen"
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium",
                "border border-white/40 text-white",
                "hover:border-white hover:bg-white/10 transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]",
              ].join(" ")}
            >
              Route plannen
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Main 4-column footer ─────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* ── Kolom 1: Branding ─────────────────────────────────────── */}
          <motion.div variants={colVariants} className="lg:pr-4">
            {/* Logo */}
            <Link href="/" aria-label="Floberg Makelaardij — homepage">
              <div className="mb-4">
                <span className="block text-2xl font-bold text-white tracking-tight">
                  FLOBERG
                </span>
                <span className="block text-xs font-semibold tracking-widest text-[#C9A96E] uppercase">
                  Makelaardij
                </span>
              </div>
            </Link>

            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Fanatiek, energiek en midden in uw markt.
            </p>

            {/* Contact info */}
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin size={15} className="shrink-0 mt-0.5 text-[#C9A96E]" />
                <span>Achterbaan 40<br />1271 TZ Huizen</span>
              </li>
              <li>
                <a
                  href="tel:+31355262960"
                  className="flex items-center gap-2.5 text-sm text-white/70 hover:text-[#C9A96E] transition-colors duration-200"
                >
                  <Phone size={15} className="shrink-0 text-[#C9A96E]" />
                  035-5262960
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@floberg.nl"
                  className="flex items-center gap-2.5 text-sm text-white/70 hover:text-[#C9A96E] transition-colors duration-200"
                >
                  <Mail size={15} className="shrink-0 text-[#C9A96E]" />
                  info@floberg.nl
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <Clock size={15} className="shrink-0 mt-0.5 text-[#C9A96E]" />
                <span>
                  Ma–vr 09:00–17:30
                  <br />
                  Za op afspraak
                </span>
              </li>
            </ul>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                {
                  href: "https://facebook.com/flobergmakelaardij",
                  label: "Facebook",
                  Icon: ExternalLink,
                },
                {
                  href: "https://instagram.com/flobergmakelaardij",
                  label: "Instagram",
                  Icon: ExternalLink,
                },
                {
                  href: "https://linkedin.com/company/floberg-makelaardij",
                  label: "LinkedIn",
                  Icon: ExternalLink,
                },
              ].map(({ href, label, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.15 }}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-[#C9A96E] hover:border-[#C9A96E] transition-colors duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Kolom 2: Diensten ─────────────────────────────────────── */}
          <motion.div variants={colVariants}>
            <FooterHeading>Diensten</FooterHeading>
            <ul className="space-y-2.5">
              {DIENSTEN_LINKS.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </motion.div>

          {/* ── Kolom 3: Aanbod ───────────────────────────────────────── */}
          <motion.div variants={colVariants}>
            <FooterHeading>Aanbod</FooterHeading>
            <ul className="space-y-2.5">
              {AANBOD_LINKS.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
            <div className="mt-5">
              <Link
                href="/aanbod"
                className="text-sm text-[#C9A96E] hover:underline font-medium"
              >
                Stel zoekopdracht in →
              </Link>
            </div>
          </motion.div>

          {/* ── Kolom 4: Over Floberg ─────────────────────────────────── */}
          <motion.div variants={colVariants}>
            <FooterHeading>Over ons</FooterHeading>
            <ul className="space-y-2.5">
              {OVER_ONS_LINKS.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>

            {/* NVM badge */}
            <div className="mt-6">
              <div
                className="inline-flex items-center justify-center w-[60px] h-[28px] bg-white rounded-md"
                aria-label="NVM gecertificeerd makelaar"
              >
                <span className="text-[#1B3A5C] text-sm font-bold tracking-wide">
                  NVM
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Sub-footer ───────────────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40 text-center sm:text-left">
            © {new Date().getFullYear()} Floberg Makelaardij B.V. · KvK 12345678 ·
            Alle rechten voorbehouden
          </p>
          <nav
            aria-label="Juridische links"
            className="flex items-center gap-4 flex-wrap justify-center"
          >
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Algemene Voorwaarden", href: "/voorwaarden" },
              { label: "Cookie Instellingen", href: "/cookies" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-xs text-white/40 hover:text-white/70 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
