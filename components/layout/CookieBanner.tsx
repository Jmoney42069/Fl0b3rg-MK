"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "floberg-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage not available (SSR guard)
    }
  }, []);

  const accept = (value: "all" | "necessary") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.35, ease: "easeOut" as const }}
          role="dialog"
          aria-live="polite"
          aria-label="Cookie-instelling"
          className={[
            "fixed bottom-0 left-0 right-0 z-50",
            "bg-white border-t border-gray-200 shadow-lg",
            "px-4 py-4 sm:px-6 sm:py-5",
          ].join(" ")}
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="flex-1 text-sm text-gray-700 leading-relaxed">
              Wij gebruiken cookies om uw ervaring te verbeteren. Door verder
              te gaan gaat u akkoord met ons{" "}
              <Link
                href="/privacy"
                className="underline text-[#1B3A5C] hover:text-[#C9A96E] transition-colors"
              >
                Privacybeleid
              </Link>
              .
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:shrink-0">
              <button
                onClick={() => accept("necessary")}
                className={[
                  "px-4 py-2 text-sm font-medium rounded-md",
                  "border border-[#1B3A5C] text-[#1B3A5C]",
                  "hover:bg-gray-50 transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A5C]",
                ].join(" ")}
              >
                Alleen noodzakelijk
              </button>
              <button
                onClick={() => accept("all")}
                className={[
                  "px-4 py-2 text-sm font-medium rounded-md",
                  "bg-[#1B3A5C] text-white",
                  "hover:bg-[#162E4A] transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A5C]",
                ].join(" ")}
              >
                Accepteren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
