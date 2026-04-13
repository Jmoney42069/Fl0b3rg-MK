"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: "easeOut" as const }}
          onClick={scrollToTop}
          aria-label="Terug naar boven"
          className={[
            "fixed right-6 z-40",
            "bottom-6 md:bottom-6",
            "w-10 h-10 rounded-full",
            "flex items-center justify-center",
            "bg-[#1B3A5C] text-white",
            "shadow-lg",
            "hover:bg-[#C9A96E] transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]",
          ].join(" ")}
        >
          <ChevronUp size={20} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
