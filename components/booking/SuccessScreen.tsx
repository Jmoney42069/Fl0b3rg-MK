"use client";

import React from "react";
import { motion } from "framer-motion";

const NL_MONTHS = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december",
];
const NL_WEEKDAY = [
  "zondag", "maandag", "dinsdag", "woensdag",
  "donderdag", "vrijdag", "zaterdag",
];

function formatDate(d: Date): string {
  return `${NL_WEEKDAY[d.getDay()]} ${d.getDate()} ${NL_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

/** Generate and trigger download of a .ics calendar file. */
function downloadICS(params: {
  name: string;
  service: string;
  date: Date;
  slot: string;
}) {
  const { service, date, slot } = params;

  // Parse slot time "HH:MM"
  const [hours, minutes] = slot.split(":").map(Number);
  const start = new Date(date);
  start.setHours(hours, minutes, 0, 0);
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + 60); // 1 hour appointment

  const pad = (n: number) => String(n).padStart(2, "0");
  const icsDate = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

  const uid = `floberg-${Date.now()}@floberg.nl`;

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Floberg Makelaars//NL",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:Afspraak Floberg Makelaars – ${service}`,
    "LOCATION:Leeuwenlaan 12\\, Bussum",
    `DESCRIPTION:Afspraak voor ${service} bij Floberg Makelaars.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "afspraak-floberg.ics";
  a.click();
  URL.revokeObjectURL(url);
}

interface SuccessScreenProps {
  name: string;
  service: string;
  date: Date;
  slot: string;
  onClose: () => void;
}

export function SuccessScreen({
  name,
  service,
  date,
  slot,
  onClose,
}: SuccessScreenProps) {
  const formattedDate = formatDate(date);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 22, duration: 0.4 }}
      className="flex flex-col items-center text-center gap-6 py-4"
    >
      {/* Animated checkmark SVG */}
      <div className="relative h-20 w-20" aria-hidden="true">
        {/* Circle */}
        <svg
          className="absolute inset-0 h-full w-full -rotate-90"
          viewBox="0 0 80 80"
          fill="none"
        >
          <circle cx="40" cy="40" r="36" stroke="#C9A84C20" strokeWidth="4" />
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            stroke="#C9A84C"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 36}
            initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.1 }}
          />
        </svg>
        {/* Check mark */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 80 80"
          fill="none"
        >
          <motion.polyline
            points="24,42 35,53 56,30"
            stroke="#C9A84C"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="45"
            initial={{ strokeDashoffset: 45 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 1.4 }}
          />
        </svg>
      </div>

      <div>
        <h2 className="font-display text-[32px] font-semibold text-white leading-tight mb-3">
          Afspraak Ontvangen!
        </h2>
        <p className="font-body text-[15px] text-white/70 leading-relaxed max-w-sm mx-auto">
          Beste <span className="text-white font-semibold">{name}</span>, uw aanvraag
          voor <span className="text-[#C9A84C]">{service}</span> op{" "}
          <span className="text-white">{formattedDate}</span> om{" "}
          <span className="text-white">{slot}</span> is ontvangen.
          U ontvangt een bevestiging op uw e-mailadres.
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          type="button"
          onClick={() => downloadICS({ name, service, date, slot })}
          className="w-full h-12 rounded-sm bg-[#C9A84C] text-[#0F1B2D] font-body font-semibold text-sm hover:bg-[#B8972E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1B2D]"
        >
          Voeg toe aan agenda
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full h-12 rounded-sm border border-[#C9A84C] text-[#C9A84C] font-body font-semibold text-sm hover:bg-[#C9A84C]/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1B2D]"
        >
          Terug naar de website
        </button>
      </div>
    </motion.div>
  );
}
