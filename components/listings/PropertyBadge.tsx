import type { PropertyStatus, EnergyLabel } from "@/types/property";

/* ── Status badge ─────────────────────────────────────────────── */
const STATUS_CONFIG: Record<
  PropertyStatus,
  { label: string; className: string }
> = {
  beschikbaar: {
    label: "Beschikbaar",
    className: "bg-green-100 text-green-800",
  },
  "onder-bod": {
    label: "Onder bod",
    className: "bg-orange-100 text-orange-800",
  },
  verkocht: {
    label: "Verkocht",
    className: "bg-gray-100 text-gray-600",
  },
  "open-huis": {
    label: "Open huis",
    className: "bg-blue-100 text-blue-800",
  },
};

export function PropertyBadge({ status }: { status: PropertyStatus }) {
  const { label, className } = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold font-body ${className}`}
    >
      {label}
    </span>
  );
}

/* ── Energy label badge ───────────────────────────────────────── */
const ENERGY_COLORS: Record<EnergyLabel, string> = {
  A: "#00A650",
  B: "#50B848",
  C: "#C8D400",
  D: "#FFD400",
  E: "#FFB400",
  F: "#FF7A00",
  G: "#E2001A",
};

export function EnergyBadge({ label }: { label: EnergyLabel }) {
  const bg = ENERGY_COLORS[label];
  const textColor =
    label === "C" || label === "D" ? "#1A1A1A" : label === "A" || label === "B" ? "#ffffff" : "#ffffff";
  return (
    <span
      className="inline-flex items-center justify-center rounded px-1.5 py-0.5 text-xs font-bold font-body w-7 h-7"
      style={{ backgroundColor: bg, color: textColor }}
      aria-label={`Energielabel ${label}`}
    >
      {label}
    </span>
  );
}
