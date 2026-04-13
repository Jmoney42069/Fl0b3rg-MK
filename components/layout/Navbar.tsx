"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { FLOBERG_INFO } from "@/lib/constants";
import { fadeIn, staggerContainer } from "@/lib/animations";

/** Top-level navigation items */
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Verkopen", href: "/verkopen" },
  { label: "Kopen", href: "/kopen" },
  { label: "Taxatie", href: "/taxatie" },
  { label: "Aanbod", href: "/aanbod" },
  { label: "Over Ons", href: "/over-ons" },
  { label: "Contact", href: "/contact" },
] as const;

/** Mobile menu overlay animation variants */
const mobileOverlayVariants: Variants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: "0%",
    transition: { type: "tween" as const, duration: 0.3, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { type: "tween" as const, duration: 0.25, ease: "easeIn" as const },
  },
};

/** Individual mobile nav link animation */
const mobileLinkVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08, duration: 0.3, ease: "easeOut" as const },
  }),
};

/** Site-wide navigation bar with scroll-triggered glassmorphism effect */
export const Navbar = () => {
  const { isScrolled } = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Block body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        role="navigation"
        aria-label="Hoofdnavigatie"
        className={[
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-300 ease-in-out",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="container-custom flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            aria-label="Floberg Makelaardij — terug naar home"
          >
            <span
              className={[
                "font-display text-2xl font-bold tracking-tight transition-colors duration-300",
                isScrolled ? "text-primary" : "text-white",
              ].join(" ")}
            >
              Floberg
            </span>
            <span className="mb-0.5 ml-0.5 text-accent text-2xl leading-none select-none">
              ·
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Paginanavigatie">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={[
                  "group relative px-3 py-2 text-[15px] font-medium",
                  "transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded",
                  isActive(href)
                    ? "text-accent"
                    : isScrolled
                    ? "text-primary hover:text-accent"
                    : "text-white/90 hover:text-white",
                ].join(" ")}
              >
                {label}
                {/* Animated underline */}
                <span
                  className={[
                    "absolute bottom-0 left-3 right-3 h-0.5 bg-accent",
                    "origin-left transition-transform duration-300",
                    isActive(href)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100",
                  ].join(" ")}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link href="/waardebepaling" tabIndex={-1}>
              <Button variant="gold" size="sm">
                Gratis Waardebepaling
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Menu openen"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className={[
              "md:hidden rounded p-2",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              isScrolled ? "text-primary" : "text-white",
            ].join(" ")}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            variants={mobileOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[60] flex flex-col bg-primary"
          >
            {/* Header row inside overlay */}
            <div className="container-custom flex h-20 items-center justify-between">
              <span className="font-display text-2xl font-bold text-white tracking-tight">
                Floberg<span className="text-accent">·</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Menu sluiten"
                className="rounded p-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Nav links */}
            <motion.nav
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="container-custom flex flex-1 flex-col justify-center gap-2"
              aria-label="Mobiele navigatie"
            >
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  custom={i}
                  variants={mobileLinkVariants}
                >
                  <Link
                    href={href}
                    className={[
                      "block py-3 text-2xl font-medium",
                      "transition-colors duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded",
                      isActive(href)
                        ? "text-accent"
                        : "text-white hover:text-accent",
                    ].join(" ")}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                custom={NAV_LINKS.length}
                variants={mobileLinkVariants}
                className="mt-6"
              >
                <Link href="/waardebepaling" onClick={() => setMobileOpen(false)}>
                  <Button variant="gold" size="lg" fullWidth>
                    Gratis Waardebepaling
                  </Button>
                </Link>
              </motion.div>
            </motion.nav>

            {/* Contact info at bottom */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="container-custom pb-10 pt-4 border-t border-white/10"
            >
              <a
                href={`tel:${FLOBERG_INFO.telefoon.replace(/\s/g, "")}`}
                className="flex items-center gap-3 py-2 text-white/70 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-sm">{FLOBERG_INFO.telefoon}</span>
              </a>
              <a
                href={`mailto:${FLOBERG_INFO.email}`}
                className="flex items-center gap-3 py-2 text-white/70 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-sm">{FLOBERG_INFO.email}</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
